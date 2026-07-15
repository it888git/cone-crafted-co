## Ką padarysiu

Sujungsiu naujienlaiškio formą (footeryje ir „Join Our Community" sekcijoje) su tavo Shopify parduotuve, kad kiekvienas paliktas emailas atsirastų **Shopify Admin → Customers** sąraše su pažymėtu „Accepts email marketing" laukeliu.

## Kaip tai veiks

1. Vartotojas įveda emailą formoje ir paspaudžia „Subscribe" / „Join".
2. Frontend'as siunčia užklausą į saugią backend funkciją (Lovable Cloud edge function).
3. Edge funkcija kviečia Shopify Admin API ir sukuria/atnaujina customer įrašą su:
   - email
   - `emailMarketingConsent.marketingState = SUBSCRIBED`
   - tag'as `newsletter` (kad lengvai atfiltruotum Shopify admine)
4. Sėkmės atveju – toast „Thanks for subscribing! 🎉". Jei emailas jau buvo prenumeruotas – tiek pat draugiška žinutė (be klaidos).

## Kur juos matysi

Shopify Admin → **Customers** → filtras „Email subscribers" arba tag `newsletter`. Iš ten galėsi eksportuoti CSV arba tiesiai siųsti kampanijas per Shopify Email / bet kurią kitą marketing programėlę.

## Techninės detalės

- **Lovable Cloud** įjungimas (jei dar neįjungtas) – reikalingas edge funkcijai.
- Nauja edge funkcija `subscribe-newsletter` (Deno) – priima `{ email }`, validuoja formatu, kviečia Shopify Admin GraphQL `customerCreate` mutation. Jei grąžina „email has already been taken" – laikom kaip sėkmę (be klaidos vartotojui).
- Shopify Admin API tokenas saugomas kaip secret (`SHOPIFY_ADMIN_API_TOKEN`) – paprašysiu jo, kai atėjus laikas (reikės Custom App su `write_customers` scope tavo Shopify admine, arba galiu paruošti tikslią instrukciją, kaip jį gauti per 2 min).
- `SHOPIFY_STORE_DOMAIN` – imu iš esamų konstantų.
- **Frontend**: `src/components/NewsletterForm.tsx` – pakeičiu simuliaciją į realų `supabase.functions.invoke('subscribe-newsletter', ...)` iškvietimą. Zod validacija emailui (kaip diktuoja projekto saugumo taisyklės). Kitas UI nesikeičia.

## Ko nekeičiu

- Jokių dizaino/layoutų pakeitimų.
- Jokios naujos duomenų bazės lentelės (viskas keliauja tiesiai į Shopify – single source of truth).
- Jokių pakeitimų kituose puslapiuose.

## Ką reikės iš tavęs po patvirtinimo

1. Leisti įjungti Lovable Cloud (vienu paspaudimu).
2. Sukurti Shopify Custom App su `write_customers` teise ir įklijuoti Admin API access token'ą į saugią formą – parodysiu tikslius žingsnius.