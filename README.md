# Link to Hyrule

1. [Inleiding](#inleiding)
2. [Screenshot](#screenshot)
3. [Benodigdheden](#benodigdheden)
4. [GitHub Repository](#github-repository)
5. [De applicatie draaien](#de-applicatie-draaien)
6. [Overige commando's](#overige-commandos)
7. [Testgebruikers](#testgebruikers)

## Inleiding

Tijdens het spelen van Zelda Breath of the Wild kom je heel veel monsters en andere wezens tegen.
Ook zijn er veel wapens en andere spullen te vinden die nuttig kunnen zijn.

Alles heeft zijn eigen specifieke eigenschapen die lastig allemaal te onthouden zijn.
Daarvoor is deze applicatie nu ontwikkeld.

In de applicatie kan een overzicht opgevraagd worden van alle wezens en spullen, deze filteren en de detail informatie opvragen.

Ook kan je in de applicatie je eigen kennis van Zelda Breath of the Wild testen in het Quiz scherm.

## Screenshot

![screenshot overview](src/assets/overview.png)

## Benodigdheden

Om de applicatie te kunnen draaien heb je nodig:
- Webstorm : om het project te laden
- node.js : om een webserver te starten waarop de applicatie te gebruiken is
- internet : voor verbinding met de authenticatie backend en de API met de data van Zelda Breath of the Wild
- de applicatie gebruikt de data van de [Hyrule Compendium API](https://gadhagod.github.io/Hyrule-Compendium-API/#/)

## GitHub Repository

De GitHub Repository van deze applicatie is te vinden op :

[https://github.com/MatthieuMosch/link-to-hyrule](https://github.com/MatthieuMosch/link-to-hyrule)

## De applicatie draaien

Om de applicatie te draaien dien je in de commando shell van Webstorm het volgende commando te geven:

    npm run dev

Hiermee wordt een server gestart welke te bereiken is op:

    http://localhost:5173


## Overige commando's

Om de webserver weer af te sluiten dien je Control-C in te drukken

## Testgebruikers

Een voorbeeld van een gebruiker met een correct e-mail adres en wachtwoord is:
- gebruikersnaam: Link
- e-mailadres: link@hyrule
- wachtwoord: Zelda<3

