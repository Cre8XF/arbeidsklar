# Arbeidsklar – TOOLS Norge

En statisk salgslandingsside for TOOLS Norges Arbeidsklar-konsept.
Siden er personalisert per selger via URL-parameter og inneholder en QR-kode for enkel deling.

---

## Prosjektstruktur

```
arbeidsklar/
├── index.html      # Landingsside (norsk, Tailwind CSS)
├── sellers.json    # Selgerkontakter
├── script.js       # URL-parameter + QR-kode-logikk
├── netlify.toml    # Netlify-konfigurasjon
└── README.md
```

---

## Eksempel-URLer

```
https://arbeidsklar.netlify.app/?id=roger
https://arbeidsklar.netlify.app/?id=ola
```

Hvert `?id=`-parameter peker på en nøkkel i `sellers.json`.
Siden viser selgerens navn, telefon, e-post og en QR-kode som peker tilbake til samme URL.

---

## Legge til ny selger

Åpne `sellers.json` og legg til en ny oppføring:

```json
{
  "roger": {
    "name": "Roger Sørqvist",
    "phone": "900 00 000",
    "email": "roger@tools.no"
  },
  "ola": {
    "name": "Ola Hansen",
    "phone": "901 23 456",
    "email": "ola.hansen@tools.no"
  },
  "kari": {
    "name": "Kari Nordmann",
    "phone": "902 34 567",
    "email": "kari.nordmann@tools.no"
  }
}
```

Nøkkelen (f.eks. `"kari"`) brukes direkte i URL-en: `?id=kari`
Nøkkelen er ikke case-sensitiv – `?id=Kari` og `?id=kari` gir samme resultat.

---

## Utskrift / PDF

Klikk **"Last ned / Skriv ut som PDF"** nederst på siden.
Knapper skjules automatisk ved utskrift, og QR-koden er synlig.

---

## Deploy på Netlify

### Alternativ 1 – Netlify Drop (enklest)

1. Gå til [app.netlify.com/drop](https://app.netlify.com/drop)
2. Dra prosjektmappen inn i nettleseren
3. Siden er live med en gang

### Alternativ 2 – Koble til GitHub

1. Push koden til GitHub (se under)
2. Gå til [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
3. Velg repo og branch (`main`)
4. Publish directory: `.`
5. Klikk **Deploy site**

Fremtidige push til `main` vil automatisk oppdatere siden.

---

## Git-oppsett

```bash
git init
git add .
git commit -m "Initial commit – Arbeidsklar landing page"
git branch -M main
git remote add origin https://github.com/Cre8XF/arbeidsklar.git
git push -u origin main
```
