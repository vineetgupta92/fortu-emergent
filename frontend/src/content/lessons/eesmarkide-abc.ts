import type { Lesson } from "./types";

export const eesmarkideAbc: Lesson = {
  id: "eesmarkide-abc",
  topicId: "raha-psuhholoogia",
  code: "1.5",
  name: "Eesmärkide ABC",
  sections: [
    {
      kind: "text",
      id: "sissejuhatus",
      title: "Sissejuhatus",
      blocks: [
        {
          t: "p",
          text: "Kas oled kunagi tahtnud raha koguda, aga eesmärk jäi udune ja lõpuks jäi ka säästmine pooleli? Paljud meist teevad vea, et seavad liiga üldisi või ebamääraseid soove: „Tahan rikkaks saada“ või „Tahan rohkem säästa“.",
        },
        {
          t: "p",
          text: "SMART-eesmärgid aitavad need soovid muuta konkreetseteks sammudeks, mida saad jälgida ja saavutada. Täna õpid, kuidas sõnastada eesmärke, mis on konkreetsed, mõõdetavad, saavutatavad, olulised ja ajaliselt piiritletud.",
        },
      ],
    },
    {
      kind: "text",
      id: "teooria",
      title: "SMART-mudel",
      blocks: [
        { t: "h", text: "S – konkreetne" },
        { t: "p", text: "Täpsusta, mida täpselt soovid saavutada. Näide: „Kogun 500 € puhkusereisiks“, mitte „Kogun raha“." },
        { t: "h", text: "M – mõõdetav" },
        { t: "p", text: "Sa tead, kas oled eesmärgini jõudnud. Näide: „500 €“ on selge summa, mida jälgida." },
        { t: "h", text: "A – saavutatav" },
        {
          t: "p",
          text: "Reaalne sinu olukorras. Näide: kui kuu eelarvest jääb 50 € üle, siis 3 kuu jooksul saab koguda 150 €.",
        },
        { t: "h", text: "R – oluline" },
        {
          t: "p",
          text: "Eesmärk peab olema sinu jaoks tähenduslik. Näide: „Soovin reisida, sest see annab mulle vabaduse ja uusi kogemusi.“",
        },
        { t: "h", text: "T – ajaliselt piiritletud" },
        { t: "p", text: "Määra tähtaeg. Näide: „3 kuu jooksul“." },
        {
          t: "note",
          text: "Kui eesmärk on SMART, on lihtsam seada prioriteete, jälgida kulutusi ja hoida motivatsiooni.",
        },
      ],
    },
    {
      kind: "sort",
      id: "kontroll",
      title: "Kontroll",
      lead: "Allpool on väited eesmärkide kohta. Vali iga väite juures kategooria, kuhu see sinu hinnangul kuulub.",
      categories: ["SMART", "Osaliselt SMART", "Ei ole SMART"],
      items: [
        { id: "e1", text: "„Soovin koguda 300 € järgmise 2 kuu jooksul hädaabifondi jaoks.“" },
        { id: "e2", text: "„Tahan olla rahaliselt vaba.“" },
        { id: "e3", text: "„Soovin koguda 50 € iga kuu, et osta uus arvuti 6 kuu pärast.“" },
        { id: "e4", text: "„Tahaks rohkem säästa.“" },
        { id: "e5", text: "„Soovin reisida Pariisi järgmise 4 kuu jooksul ja koguda selleks 800 €.“" },
      ],
      feedback:
        "Suudad eristada, millised eesmärgid on konkreetseteks sammudeks vormitud ja millised vajavad veel selgemaks tegemist. Kui kõik on SMART, tead täpselt, mida ja millal tegema pead!",
    },
    {
      kind: "generator",
      id: "tegevus",
      title: "SMART-eesmärgi generaator",
      lead: "Vasta neljale küsimusele ja Fortu paneb sinu eesmärgi ühte lausesse kokku.",
      fields: [
        { id: "eesmark", label: "Mida tahad saavutada?", placeholder: "nt puhkusereis Pariisi" },
        { id: "summa", label: "Kui palju see maksab?", placeholder: "nt 800 €" },
        { id: "aeg", label: "Mis ajaks tahad eesmärgi saavutada?", placeholder: "nt 4 kuu jooksul" },
        { id: "pohjus", label: "Miks see sulle oluline on?", placeholder: "nt see annab mulle uusi kogemusi" },
      ],
      scale: { id: "realistlikkus", label: "Kui realistlik see sinu eelarve ja rahavoo põhjal tundub?" },
      sentenceTemplate:
        "Sa soovid koguda {summa} {aeg}, et saavutada {eesmark}. See on sinu jaoks oluline, sest {pohjus}.",
      after: [],
    },
    {
      kind: "summary",
      id: "kokkuvote",
      title: "Kokkuvõte",
      blocks: [
        {
          t: "p",
          text: "SMART-eesmärgid muudavad udused soovid konkreetseteks, jälgitavateks ja motiveerivateks sammudeks. Kui tead, mida ja miks teha, on lihtsam oma rahavoo kontrolli alla saada ja saavutada tulevikueesmärke.",
        },
        {
          t: "note",
          text: "Isegi väike samm – näiteks 5 € säästmine või ühe kohvi loobumine – viib sind eesmärgile lähemale.",
        },
      ],
      teaser: {
        title: "Mis ootab ees?",
        text: "Järgmises sammus uurime teemat „Minu miks ja tulevikupilt“ – kuidas seada suurem rahaline siht (turvatunne, vabadus, unistus) ja siduda see sinu SMART-eesmärkidega.",
      },
    },
  ],
};
