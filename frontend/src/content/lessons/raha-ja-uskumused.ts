import type { Lesson } from "./types";

export const rahaJaUskumused: Lesson = {
  id: "raha-ja-uskumused",
  topicId: "raha-psuhholoogia",
  code: "1.3",
  name: "Raha ja uskumused",
  sections: [
    {
      kind: "text",
      id: "sissejuhatus",
      title: "Sissejuhatus",
      blocks: [
        {
          t: "p",
          text: "Eelmises sammus uurisime, millised tunded mõjutavad meie rahakäitumist. Täna vaatame veel sügavamale – millised uskumused neid tundeid toidavad.",
        },
        { t: "p", text: "Igaühel meist on alateadlikud laused, mida me iseendale rahast räägime:" },
        {
          t: "quote",
          items: [
            "Ma ei ole rahaga hea.",
            "Kui mul on rohkem raha, võtan selle kelleltki teiselt ära.",
            "Raha tuleb ainult raske tööga.",
          ],
        },
        {
          t: "p",
          text: "Need uskumused mõjutavad kõike – seda, kas me julgeme palka küsida, investeerida, säästa või üldse tunnistada, mida tahame.",
        },
        {
          t: "p",
          text: "Hea uudis on, et uskumused ei ole tõde – need on lihtsalt lood, mida oleme seni uskunud. Ja lugu saab muuta.",
        },
      ],
    },
    {
      kind: "text",
      id: "teooria",
      title: "Teooria",
      blocks: [
        { t: "h", text: "Mis on rahauskumused?" },
        {
          t: "p",
          text: "Rahauskumused on alateadlikud mõtted ja reeglid, mis juhivad meie rahakäitumist. Need tekivad varasest lapsepõlvest, ühiskondlikest sõnumitest ja isiklikest kogemustest. Sageli ei pruugi me neid endale teadvustada, kuni märkame korduvaid mustreid:",
        },
        {
          t: "list",
          items: [
            "töötad palju, aga raha ei jää kunagi alles,",
            "kardad investeerimist, sest „see pole minu jaoks“,",
            "tunned süüd, kui teenid rohkem kui teised,",
            "väldid oma kontojäägi vaatamist.",
          ],
        },
        { t: "h", text: "Piiravad uskumused" },
        { t: "p", text: "Need hoiavad meid väiksemana, kui me tegelikult oleme. Näiteks:" },
        {
          t: "quote",
          items: [
            "Ma ei saa rahas asju hästi ajada.",
            "Kui mul on rohkem raha, kaotan selle kindlasti.",
            "Rikas inimene on isekas.",
            "Pole viisakas rahast rääkida.",
          ],
        },
        { t: "h", text: "Toetavad uskumused" },
        { t: "p", text: "Need loovad võimalusi ja rahu. Näiteks:" },
        {
          t: "quote",
          items: [
            "Ma õpin iga päev rahaga paremini ümber käima.",
            "Raha on tööriist, mis aitab mul luua vabadust.",
            "Ma väärin rahalist kindlust ja rahu.",
            "Rikkus ja headus võivad käia käsikäes.",
          ],
        },
        { t: "note", text: "Kui soovid oma rahalisi tulemusi muuta, pead alustama mõtetest, mitte rahast." },
      ],
    },
    {
      kind: "sort",
      id: "kontroll",
      title: "Rahauskumuste peegel",
      lead: "Allpool on valik väiteid. Vali iga väite juures, kuidas see sinus kõlab. Siin pole õigeid ega valesid vastuseid.",
      categories: ["Tuttav", "Segadust tekitav", "Motiveeriv"],
      items: [
        { id: "v1", text: "Raha on midagi, mida tuleb alati karta kaotada." },
        { id: "v2", text: "Raha tuleb inimestele, kes on valmis õppima ja vastutama." },
        { id: "v3", text: "Raha tekitab tülisid, seega on parem sellest mitte rääkida." },
        { id: "v4", text: "Raha on energia, mida saab juhtida sama teadlikult nagu aega." },
        { id: "v5", text: "Kui ma teen vigu rahas, tähendab see, et ma pole piisavalt tark." },
        { id: "v6", text: "Raha võib tulla kergelt ja rõõmuga." },
      ],
      feedback: "Sa jagasid väited kolme rühma. Vaata üle, kuhu need sinu jaoks langesid.",
      reflection:
        "Millised väited tundusid sulle kõige „tõelisemad“? Kas need toetavad sind või piiravad? Mis oleks nende vastandmõte, mida sa võiksid proovida uskuda?",
    },
    {
      kind: "write",
      id: "tegevus",
      title: "Minu uus rahalugu",
      blocks: [
        {
          t: "p",
          text: "Kirjuta kolm lauset, mis sul alateadlikult rahaga seostuvad (näiteks: „Raha on alati mure“, „Mul lihtsalt ei jää midagi alles“, „Ma ei taha teistele kade tunduda“).",
        },
        {
          t: "p",
          text: "Vali neist üks lause, mis sind enim piirab, ja kirjuta see ümber toetavaks mõtteks. Näiteks:",
        },
        {
          t: "list",
          items: [
            "Piirav uskumus: „Ma ei saa rahas asju hästi ajada.“",
            "Uus mõte: „Ma õpin iga päev rahaga targemalt ümber käima.“",
          ],
        },
      ],
      fields: [
        { id: "lause1", label: "1. lause", placeholder: "Kirjuta siia…" },
        { id: "lause2", label: "2. lause", placeholder: "Kirjuta siia…" },
        { id: "lause3", label: "3. lause", placeholder: "Kirjuta siia…" },
        { id: "piirav", label: "Kõige piiravam lause", placeholder: "Vali üks ülaltoodud lausetest…" },
        { id: "uus", label: "Minu uus toetav mõte", placeholder: "Kirjuta ümber…" },
      ],
      after: [
        {
          t: "p",
          text: "Korda uut mõtet valjusti. Mõtle, kuidas see tundub sinu kehas – kas kerge või võõras? Kui võõras, on see märk, et vana uskumus on sügaval – ja just sealt algab muutus.",
        },
      ],
    },
    {
      kind: "summary",
      id: "kokkuvote",
      title: "Kokkuvõte",
      blocks: [
        {
          t: "p",
          text: "Rahauskumused on nagu nähtamatu tarkvara, mis juhib meie otsuseid. Me ei saa muuta oma rahalist olukorda, kui meie mõttemustrid jäävad samaks.",
        },
        {
          t: "p",
          text: "Teadlikkus neist uskumustest on esimene samm – ja uue mõtte valimine on teine. Raha on neutraalne, aga meie lugu rahast võib olla vabastav või piirav. Täna said sa võimaluse seda lugu teadlikult ümber kirjutada.",
        },
      ],
      teaser: {
        title: "Mis ootab ees?",
        text: "Järgmises sammus räägime sellest, kuidas rahalised otsused peegeldavad sinu väärtusi ja prioriteete – ehk miks mõnikord teeme otsuseid, mis ei vii meid tegelikult sinna, kuhu tahame jõuda.",
      },
    },
  ],
};
