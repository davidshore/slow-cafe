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
- förklara LCP, CLS och INP samt hur JavaScript som blockerar huvudtråden
  fördröjer sidans respons på klick och tryck
- identifiera vad som orsakar ett prestandaproblem
- förbättra bildladdning och resursprioritering
- förebygga oväntade layoutförflyttningar
- hitta och minska onödigt arbete på huvudtråden
- jämföra resultat från samma kontrollerade mätning

## Vad mäter vi – och varför?

Prestandamått hjälper oss att beskriva hur sidan upplevs i stället för att bara
säga att den känns snabb eller långsam. **Core Web Vitals** fokuserar på tre
viktiga delar av användarupplevelsen: laddning, respons och visuell stabilitet.

| Förkortning | Engelskt namn | Mäter | Bra nivå |
| --- | --- | --- | --- |
| **LCP** | Largest Contentful Paint | Tiden tills sidans största synliga innehåll, ofta en stor bild eller rubrik, har visats | ≤ 2,5 s |
| **INP** | Interaction to Next Paint | Tiden från ett klick, tryck eller tangentbordskommando tills webbläsaren visar nästa bildruta | ≤ 200 ms |
| **CLS** | Cumulative Layout Shift | Hur mycket synligt innehåll oväntat flyttar sig medan sidan används | ≤ 0,1 |

Ett lågt LCP-värde betyder att det viktigaste innehållet blir synligt snabbt.
Ett lågt INP-värde betyder att sidan svarar snabbt på interaktioner. Ett lågt
CLS-värde betyder att sidan är stabil och att innehåll inte hoppar omkring.

Gränsvärdena används främst för **fältdata** från riktiga besök. En sida räknas
som bra när minst 75 procent av besöken ligger inom gränsen. Läs mer i
[Googles beskrivning av Core Web Vitals](https://web.dev/articles/vitals).

Lighthouse visar också **TBT (Total Blocking Time)**. TBT uppskattar hur länge
webbläsarens huvudtråd blockeras av långa uppgifter under sidladdningen. Det är
ett användbart laboratoriemått, men det är inte samma sak som INP eftersom en
vanlig Lighthouse-körning inte innehåller verkliga användarinteraktioner.

Lighthouse-poängen är ett sammanvägt laboratorieresultat. Den är ett stöd för
felsökning, inte ett betyg och inte ett bevis på hur alla riktiga besökare
upplever sidan.

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

En baslinje visar hur startprojektet beter sig **innan** du förändrar koden.
Mät alltid före och efter under samma förhållanden. Annars vet du inte om det
var din förändring eller testmiljön som påverkade resultatet.

### A. Starta en produktionsversion lokalt

Stoppa utvecklingsservern och kör:

```bash
npm run build
npm run start
```

Mät inte med `npm run dev`. Utvecklingsläget innehåller verktyg och beteenden
som inte finns i den färdiga versionen.

### B. Undersök sidan i Performance-panelen

Performance-panelen är ditt huvudsakliga verktyg i den här uppgiften. Där kan
du följa både sidladdningen och vad som händer när du använder menyn.

1. Öppna ett privat Chrome-fönster och gå till
   [http://localhost:3000](http://localhost:3000).
2. Välj en smal mobil viewport och öppna DevTools-fliken **Performance**.
3. Öppna inspelningsinställningarna och välj **Slow 4G** för nätverket och
   **6× slowdown** för processorn.
4. Starta en inspelning och ladda om sidan.
5. Vänta tills sidan har stabiliserats. Byt sedan menyfilter flera gånger, till
   exempel mellan **Alla**, **Fika** och **Lunch**.
6. Stoppa inspelningen och undersök:

   - vilket element som blev LCP
   - vad som flyttades i den största CLS-gruppen
   - vilken menyinteraktion som gav högst lokal INP
   - vad huvudtråden gjorde under den långsammaste interaktionen

Performance-panelens lokala värden gäller just din körning och din dator. De
är särskilt användbara för att hitta **varför** ett problem uppstår. En lokal
INP uppstår först när du faktiskt interagerar med sidan.

Det är inte ett mätfel om exempelvis LCP eller CLS visas som grönt. Resultatet
påverkas av datorn, cachen och vald viewport. Uppgiften är inte att tvinga alla
värden över eller under en gräns, utan att identifiera orsaker och jämföra
samma test före och efter en förändring.

Fyll i Performance-resultaten:

| Lokal mätning | Före | Efter |
| --- | ---: | ---: |
| LCP |  |  |
| CLS |  |  |
| Långsammaste menyinteraktion, lokal INP |  |  |

### C. Ta en ögonblicksbild med Lighthouse

Lighthouse kompletterar Performance-panelen med en kontrollerad mätning av den
första sidladdningen och förslag på möjliga förbättringar.

1. Öppna DevTools-fliken **Lighthouse**.
2. Välj **Navigation**, **Mobile** och kategorin **Performance**.
3. Starta mätningen och vänta tills rapporten är färdig.
4. Kör mätningen tre gånger. Använd medianen, alltså det mittersta resultatet,
   i din jämförelse i stället för att välja den bästa körningen.

Lighthouse använder en egen simulerad mobilmiljö med en långsammare mobil och
Slow 4G. Använd samma Lighthouse-val före och efter. Lighthouse klickar inte
på menyfiltren och kan därför inte mäta lokal INP. TBT visar i stället hur
mycket huvudtråden blockerades under själva sidladdningen.

> En mycket hög Lighthouse-poäng, till exempel 99, betyder inte att uppgiften
> är klar. Den betyder att den första sidladdningen fungerade bra i just den
> simuleringen. Menyn kan fortfarande frysa när användaren försöker filtrera
> den.

Fyll i Lighthouse-resultaten:

| Lighthouse-mätning | Före | Efter |
| --- | ---: | ---: |
| Performance-poäng |  |  |
| LCP |  |  |
| CLS |  |  |
| TBT |  |  |

Skriv dessutom ner:

- vald mobil viewport
- att nätverket var inställt på Slow 4G och processorn på 6× slowdown i
  Performance-panelen
- vilket element som identifierades som LCP
- vilket innehåll som flyttades vid den största layoutförflyttningen
- vilken menyinteraktion som gav högst lokal INP

Lighthouse och Performance-panelen kan visa olika LCP- och CLS-värden eftersom
de gör två olika mätningar. Jämför därför Lighthouse före med Lighthouse efter,
och Performance före med Performance efter. Jämför inte ett värde från det ena
verktyget direkt med ett värde från det andra.

Om du även mäter en publicerad version ska du redovisa den separat. Jämför inte
en lokal föremätning med en publicerad eftermätning, eftersom nätverk och server
då har förändrats. Mät i samma miljö före och efter och använd den publicerade
versionen som en extra kontroll.

## 4. Diagnostisera

Skriv ner minst tre observationer. Använd gärna den här strukturen:

1. Vad visar mätverktyget?
2. Vilken resurs, komponent eller kod verkar vara inblandad?
3. Hur påverkas användaren?
4. Vilken förändring tror du kan hjälpa?

Besvara också frågan: **Hur kan Lighthouse visa en mycket hög poäng samtidigt
som menyfiltret får sidan att frysa?**

Titta på nätverksförfrågningar, tidslinjen, LCP-elementet, markeringarna för
layoutförflyttningar och JavaScript som blockerar huvudtråden. Försök följa vad
webbläsaren faktiskt gör i stället för att gissa utifrån Lighthouse-poängen.

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
