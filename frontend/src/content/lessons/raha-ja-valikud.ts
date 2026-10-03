import type { Lesson } from "./types";

export const rahaJaValikud: Lesson = {
  id: "raha-ja-valikud",
  topicId: "raha-psuhholoogia",
  code: "1.4",
  name: "Raha ja valikud",
  sections: [
    {
      kind: "text",
      id: "sissejuhatus",
      title: "Sissejuhatus",
      blocks: [
        {
          t: "p",
          text: "Kas oled märganud, et mõnikord on lihtne otsustada, millele raha kulutada – ja teinekord tundub iga valik raske? See pole juhus. Meie rahalised otsused peegeldavad meie väärtusi ja prioriteete – seda, mis on meile päriselt oluline. Isegi siis, kui me seda ei teadvusta.",
        },
        { t: "p", text: "Näiteks:" },
        {
          t: "list",
          items: [
            "Kui kulutad hea meelega lapse huvialadele, väärtustad arengut ja pere heaolu.",
            "Kui panustad investeeringutesse, väärtustad iseseisvust ja tulevikukindlust.",
            "Kui säästad, otsid turvatunnet.",
            "Kui reisid, otsid vabadust ja elamusi.",
          ],
        },
        { t: "p", text: "Meie rahalised valikud on nagu peegel – need näitavad, mis on meie elus esikohal." },
      ],
    },
    {
      kind: "text",
      id: "teooria",
      title: "Teooria",
      blocks: [
        { t: "h", text: "Väärtused on rahaliste otsuste juur" },
        {
          t: "p",
          text: "Väärtused on sisemised kompassid, mis juhivad meie käitumist ja valikuid, sageli alateadlikult. Kui meie rahakäitumine on kooskõlas väärtustega, tunneme rahulolu. Kui mitte, tekib sisemine pinge.",
        },
        { t: "p", text: "Näiteks:" },
        {
          t: "list",
          items: [
            "Kui väärtustad rahu ja kindlust, aga elad pidevas kulutamisspiraalis → stress.",
            "Kui väärtustad elamusi, aga keeldud igast „mittevajalikust“ ostust → rahulolematus.",
          ],
        },
        { t: "h", text: "Prioriteedid annavad väärtustele kuju" },
        {
          t: "p",
          text: "Prioriteet on see, kuidas sa oma aega ja raha tegelikult kasutad. Sageli ütleme, et „pere on kõige tähtsam“, aga siis avastame, et suurem osa ajast ja rahast läheb tööle või võlgadele. Teadlik prioriteetide seadmine aitab viia väärtused ja tegevused vastavusse.",
        },
        { t: "p", text: "Küsi endalt:" },
        {
          t: "list",
          items: [
            "Mille nimel ma hetkel raha kulutan? Kas see toetab minu väärtusi või lihtsalt harjumust?",
            "Kui peaksin täna loobuma ühest kulutusest, mille jätaksin alles ja miks?",
          ],
        },
      ],
    },
    {
      kind: "quiz",
      id: "kontroll",
      title: "Väärtuste sobitamine",
      lead: "Vali, millist väärtust see käitumine peegeldab.",
      items: [
        {
          id: "k1",
          text: "Ma maksan alati arved enne tähtaega.",
          options: ["Turvatunne", "Vabadus", "Rõõm"],
          correct: [0],
        },
        {
          id: "k2",
          text: "Kulutan pigem reisile kui uuele telefonile.",
          options: ["Areng", "Vabadus", "Stabiilsus"],
          correct: [0, 1],
        },
        {
          id: "k3",
          text: "Annan sõbrale laenu, kuigi ise pean kokku hoidma.",
          options: ["Suhted", "Eneseareng", "Tervis"],
          correct: [0],
        },
      ],
      closing: "Väärtuste tundmine aitab sul oma rahaga rohkem rahu sõlmida.",
    },
    {
      kind: "pick",
      id: "tegevus",
      title: "Valikmäng",
      lead: "Kujutle, et saad korraga 500 €. Kuhu sa selle paneksid?",
      options: [
        { id: "reis", text: "Reisimine", value: "vabadust" },
        { id: "investeering", text: "Investeering", value: "enesearengut" },
        { id: "arved", text: "Arvete tasumine", value: "turvatunnet" },
        { id: "kingitused", text: "Kingitused teistele", value: "suhteid" },
        { id: "saastud", text: "Säästukontole", value: "turvatunnet" },
      ],
      feedbackTemplate: "Sinu valik peegeldab, et väärtustad {v}.",
    },
    {
      kind: "summary",
      id: "kokkuvote",
      title: "Kokkuvõte",
      blocks: [
        {
          t: "p",
          text: "Meie rahalised otsused räägivad rohkem kui meie sõnad. Need näitavad, mida me tegelikult oluliseks peame – isegi siis, kui me endale seda ei tunnista.",
        },
        {
          t: "p",
          text: "Kui raha liigub kooskõlas väärtustega, tunneme rahu ja kindlust. Kui mitte, tunneme süütunnet, kahetsust või stressi.",
        },
        {
          t: "p",
          text: "Teadlikkus oma väärtustest on finantstarkuse tuum. See aitab mitte ainult paremini raha hallata, vaid ka elada kooskõlas sellega, mis on tõeliselt oluline.",
        },
      ],
      teaser: {
        title: "Mis ootab ees?",
        text: "Järgmises sammus liigume edasi: kuidas panna oma väärtused ja eesmärgid tööle SMART-põhimõtte abil. Õpid, kuidas sõnastada rahalisi eesmärke nii, et need oleksid selged, mõõdetavad ja päriselt saavutatavad.",
      },
    },
  ],
};
