import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const SHOPIFY_STORE_DOMAIN = 'ssduqq-wp.myshopify.com';
const SHOPIFY_API_VERSION = '2025-07';
const ADMIN_URL = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;

const CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer { id email }
      userErrors { field message code }
    }
  }
`;

const isValidEmail = (v: unknown): v is string =>
  typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) && v.length <= 255;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const jsonHeaders = { ...corsHeaders, 'Content-Type': 'application/json' };

  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: jsonHeaders });
    }

    const adminToken = Deno.env.get('SHOPIFY_ACCESS_TOKEN');
    if (!adminToken) {
      console.error('Missing SHOPIFY_ACCESS_TOKEN');
      return new Response(JSON.stringify({ error: 'Server not configured' }), { status: 500, headers: jsonHeaders });
    }

    const body = await req.json().catch(() => null);
    const email = body?.email?.trim?.().toLowerCase();
    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400, headers: jsonHeaders });
    }

    const shopifyRes = await fetch(ADMIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminToken,
      },
      body: JSON.stringify({
        query: CUSTOMER_CREATE_MUTATION,
        variables: {
          input: {
            email,
            tags: ['newsletter'],
            emailMarketingConsent: {
              marketingState: 'SUBSCRIBED',
              marketingOptInLevel: 'SINGLE_OPT_IN',
            },
          },
        },
      }),
    });

    if (!shopifyRes.ok) {
      const text = await shopifyRes.text();
      console.error(`Shopify admin error [${shopifyRes.status}]:`, text);
      return new Response(JSON.stringify({ error: 'Upstream error', status: shopifyRes.status }), {
        status: 502,
        headers: jsonHeaders,
      });
    }

    const data = await shopifyRes.json();
    const userErrors = data?.data?.customerCreate?.userErrors ?? [];

    // Treat "already taken" (already a customer / already subscribed) as success — idempotent from user POV.
    const isAlreadyTaken = userErrors.some(
      (e: { code?: string; message?: string }) =>
        e.code === 'TAKEN' || /taken|already/i.test(e.message ?? ''),
    );

    if (userErrors.length > 0 && !isAlreadyTaken) {
      console.error('customerCreate userErrors:', userErrors);
      return new Response(JSON.stringify({ error: 'Could not subscribe', details: userErrors }), {
        status: 400,
        headers: jsonHeaders,
      });
    }

    return new Response(JSON.stringify({ ok: true, alreadySubscribed: isAlreadyTaken }), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (err) {
    console.error('subscribe-newsletter error:', err);
    return new Response(JSON.stringify({ error: 'Unexpected error' }), { status: 500, headers: jsonHeaders });
  }
});
