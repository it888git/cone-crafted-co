import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.23.8';

const BodySchema = z.object({
  email: z.string().trim().toLowerCase().email().max(255),
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('OMNISEND_API_KEY');
    if (!apiKey) {
      console.error('OMNISEND_API_KEY missing');
      return new Response(JSON.stringify({ error: 'Server misconfigured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const { email } = parsed.data;

    const res = await fetch('https://api.omnisend.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify({
        identifiers: [
          {
            type: 'email',
            id: email,
            channels: {
              email: { status: 'subscribed', statusDate: new Date().toISOString() },
            },
          },
        ],
        tags: ['newsletter', 'website-signup'],
      }),
    });

    const text = await res.text();

    // Omnisend returns 409 (or similar) if contact already exists — handle gracefully
    if (!res.ok) {
      const alreadyExists = res.status === 409 || /already exists|duplicate/i.test(text);
      if (alreadyExists) {
        return new Response(JSON.stringify({ alreadySubscribed: true }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      console.error(`Omnisend error [${res.status}]: ${text}`);
      return new Response(
        JSON.stringify({ error: 'Provider request failed', status: res.status, details: text }),
        { status: res.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('subscribe-newsletter exception:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
