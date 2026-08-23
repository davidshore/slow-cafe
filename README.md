# Rädda den långsamma sidan – Slow Café

Slow Café är en liten fungerande **Next.js-app med TypeScript**. Sidan visar
ett café, öppettider och en meny som går att filtrera.

Den ser färdig ut, men upplevelsen är inte särskilt bra på en mobil enhet. Din
uppgift är att arbeta undersökande:

```txt
mäta → diagnostisera → förändra → mäta igen
```

Följ bevisen i Lighthouse och Chrome DevTools. Gör inte en förändring bara för
att den brukar vara bra för prestanda – försök först förklara vilket observerat
problem den ska lösa.

## Lärandemål

Efter uppgiften ska du kunna:

- mäta mobil prestanda med Lighthouse och Chrome DevTools
- förklara LCP, CLS och hur långsamt arbete påverkar interaktioner
- identifiera vad som orsakar ett prestandaproblem
- förbättra bildladdning och resursprioritering
- förebygga oväntade layoutförflyttningar
- hitta och minska onödigt arbete på huvudtråden
- jämföra resultat från samma kontrollerade mätning

## Core Web Vitals

| Metric | Mäter | God |
| --- | --- | --- |
| LCP | När sidans viktigaste synliga innehåll visas | ≤ 2,5 s |
| INP | Hur snabbt sidan svarar efter interaktioner | ≤ 200 ms |
| CLS | Oväntade förflyttningar i layouten | ≤ 0,1 |

För fältdata bedöms målen vid den 75:e percentilen av verkliga sidvisningar.
Läs mer i [Googles beskrivning av Core Web Vitals](https://web.dev/articles/vitals).

## 1. Starta uppgiften i Codington

1. Öppna uppgiften **Rädda den långsamma sidan – Slow Café** i Codington.
2. Anslut ditt GitHub-konto om Codington ber dig göra det.
3. Välj **Starta uppgift**. Codington skapar då ett privat repository åt dig i
   skolans GitHub-organisation.
4. Öppna repositoryt och acceptera GitHub-inbjudan om den visas.
5. Klona ditt repository till datorn.

Installera och starta projektet:

```bash
npm install
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000). Projektet använder
Node.js 20.9 eller senare. Node.js 22 rekommenderas.

> Skapa inte ett nytt repository med **Use this template**. Repositoryt som
> Codington skapar är ditt repository för uppgiften.

## 2. Kontrollera funktionen

Innan du mäter ska du kontrollera att du kan:

- se caféets startsida och meny
- hoppa till menyn från sidans översta del
- filtrera menyn med kategorierna Kaffe, Fika och Lunch
- återställa filtret med Alla

Funktionerna ska finnas kvar efter dina förbättringar.

## 3. Gör en baslinjemätning

Öppna sidan i Chrome och använd en mobil viewport. Kör Lighthouse med samma
inställningar varje gång så att före- och efterresultaten går att jämföra.

Fyll i kolumnen **Före**:

| Mätning | Före | Efter |
| --- | ---: | ---: |
| Lighthouse Performance |  |  |
| LCP |  |  |
| CLS |  |  |
| TBT |  |  |

Skriv också ner:

- vald enhet eller viewport
- CPU- och nätverksinställning
- vilket element som identifierades som LCP
- vilka layoutförflyttningar du observerade

Lighthouse ger inte en riktig fält-INP från en vanlig sidladdning. Spela därför
även in en interaktion i Chrome Performance-panelen: byt menyfilter några
gånger och undersök vad huvudtråden gör.

## 4. Diagnostisera

Skriv ner minst tre observationer. Använd gärna den här strukturen:

1. Vad visar mätverktyget?
2. Vilken resurs, komponent eller kod verkar vara inblandad?
3. Hur påverkas användaren?
4. Vilken förändring tror du kan hjälpa?

Titta på nätverksförfrågningar, tidslinjen, LCP-elementet, layout shifts och
långkörande arbete. Försök följa vad webbläsaren faktiskt gör i stället för att
gissa utifrån Lighthouse-poängen.

## 5. Förbättra och mät igen

Gör minst tre relevanta förbättringar som tillsammans berör:

- laddning och LCP
- layoutstabilitet och CLS
- den långsamma menyinteraktionen

Kör därefter samma mätning igen och fyll i kolumnen **Efter**. Lägg till en kort
förklaring av varje förändring:

- vad som orsakade problemet
- vad du ändrade
- hur mätningen eller användarupplevelsen förändrades

Du behöver inte nå poängen 100. Det viktiga är att du kan förklara sambandet
mellan bevis, förändring och resultat.

## 6. GitHub Actions och inlämning

Varje push kör automatiskt:

```bash
npm run lint
npm run test
npm run build
```

De funktionella testerna kontrollerar bland annat att menyn visas, att
kategorifiltreringen fungerar och att länken till menyn finns kvar. De mäter
inte Lighthouse och sätter inget betyg på din prestanda.

Ändra eller ta inte bort `.github/workflows/checks.yml`. Codington visar om
kontrollerna körs, har lyckats eller har misslyckats.

När du är klar:

1. Kör samma kontroller lokalt.
2. Pusha din senaste kod och kontrollera att GitHub Actions blir grön.
3. Färdigställ före/efter-tabellen och dina förklaringar i README.
4. Gå tillbaka till Codington och lämna in uppgiften.

Uppgiften är obetygsatt. Fokus ligger på arbetsflödet och på att kunna mäta,
diagnostisera och förklara dina förbättringar.
