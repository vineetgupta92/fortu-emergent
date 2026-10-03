import type { Lesson } from "./types";

export const minuMiksJaTulevikupilt: Lesson = {
  id: "minu-miks-ja-tulevikupilt",
  topicId: "raha-psuhholoogia",
  code: "1.6",
  name: "Minu miks ja tulevikupilt",
  sections: [
    {
      kind: "text",
      id: "sissejuhatus",
      title: "Sissejuhatus",
      blocks: [
        {
          t: "p",
          text: "Kui tead, miks sa midagi teed, muutub ka tee selgemaks. Eelmised päevad aitasid sul mõista, kuidas sinu väärtused, tunded ja uskumused mõjutavad rahaga käitumist. Täna paneme need tükid kokku ja vaatame suurt pilti: mille nimel sa tegelikult oma raha haldad?",
        },
        { t: "p", text: "Kas sinu eesmärk on:" },
        {
          t: "list",
          items: [
            "tunda end turvaliselt ja kindlalt,",
            "kogeda vabadust ja seiklusi,",
            "pakkuda oma perele paremat tulevikku,",
            "või saavutada unistus, mida oled ammu edasi lükanud?",
          ],
        },
        {
          t: "p",
          text: "Sinu „miks“ on sisemine jõud, mis annab rahalistele eesmärkidele tähenduse. Ilma selleta jääb isegi SMART-eesmärk tühjaks numbriks.",
        },
      ],
    },
    {
      kind: "text",
      id: "teooria",
      title: "Teooria",
      blocks: [
        { t: "h", text: "„Miks“ annab motivatsiooni ja suuna" },
        {
          t: "p",
          text: "Inimene ei säästa, investeeri või tööta lihtsalt raha pärast – ta teeb seda mingi tunde või väärtuse pärast. See võib olla rahu, vabadus, eneseteostus, kindlustunne või võimalus anda edasi.",
        },
        { t: "p", text: "Näited erinevatest „miksidest“:" },
        {
          t: "quote",
          items: [
            "Ma tahan finantsvabadust, sest soovin otsustada ise oma aja üle.",
            "Soovin turvatunnet, et ei peaks muretsema ootamatute olukordade pärast.",
            "Tahan oma lastele pakkuda haridust ja stabiilsust.",
            "Soovin endale lubada loomingulist elu ilma pideva rahamureta.",
          ],
        },
        {
          t: "p",
          text: "Kui su eesmärgid ja „miks“ on kooskõlas, tunned rahulolu. Kui mitte, tunned pingeid ja motivatsioon kaob.",
        },
        { t: "h", text: "Visioon aitab näha kaugemale tänasest" },
        {
          t: "p",
          text: "Visioon on pilt tulevikust – milline näeb välja sinu rahulik ja täidetud elu 5–10 aasta pärast? Kuidas sa elad, töötad, liigud, puhkad? Mida tunned, kui mõtled oma rahalisele olukorrale? Visioon ei pea olema täpne eelarve – see on tunne ja suund. Kui tead, kuhu tahad minna, oskad seada ka realistlikke samme sinna jõudmiseks.",
        },
      ],
    },
    {
      kind: "profile",
      id: "kontroll",
      title: "Kontroll",
      lead: "Mini-test: kas tead oma „miksi“? Vali iga väite puhul see, mis sulle kõige lähem on. Siin pole õigeid ega valesid vastuseid.",
      questions: [
        {
          id: "q1",
          text: "Kui ma mõtlen raha kogumisele, siis:",
          options: [
            { key: "a", text: "Ma ei tea täpselt, milleks ma seda teen." },
            { key: "b", text: "Tahan lihtsalt, et oleks „igaks juhuks“." },
            { key: "c", text: "Mul on konkreetne unistus või eesmärk silme ees." },
          ],
        },
        {
          id: "q2",
          text: "Kui mul tekib rahaline tagasilöök, siis:",
          options: [
            { key: "a", text: "Tunnen, et kõik mu pingutused olid asjatud." },
            { key: "b", text: "Otsin kohe uusi lahendusi." },
            { key: "c", text: "Tuletan endale meelde, miks ma seda teekonda alustasin." },
          ],
        },
        {
          id: "q3",
          text: "Kui keegi küsib, mis on minu rahaline visioon, siis:",
          options: [
            { key: "a", text: "Raske vastata." },
            { key: "b", text: "Mul on üldine pilt, aga mitte selgust." },
            { key: "c", text: "Oskan seda sõnadesse panna ja see motiveerib mind." },
          ],
        },
      ],
      reflectionTitle: "Sinu vastuste peegeldus",
      reflections: [
        {
          key: "a",
          text: "Sinu „miks“ on praegu veel ähmane ja raha kogumine toimub pigem ilma selge sihita. See on hea koht luua endale selgem rahaline visioon, mis annab suunatunde ja jõu.",
        },
        {
          key: "b",
          text: "Sul on üldine soov turvatunde järele, kuid täpne siht on veel sõnastamata. Konkreetsem rahaline visioon aitaks sul otsuseid kergemini teha.",
        },
        {
          key: "c",
          text: "Sul on konkreetne eesmärk ja „miks“ silme ees. See annab sinu rahalistele valikutele suuna ja tähenduse.",
        },
      ],
    },
    {
      kind: "write",
      id: "tegevus",
      title: "Tegevus",
      blocks: [
        { t: "h", text: "Harjutus: minu rahaline tulevikupilt" },
        {
          t: "p",
          text: "Sule silmad ja kujutle, et on 5 aastat hiljem. Kus sa elad? Kuidas sa end tunned rahaliselt? Mida raha sulle võimaldab? Kirjuta see lahti ühe lõiguna ja lisa kolm lauset alltoodud küsimuste kohta.",
        },
      ],
      fields: [
        {
          id: "loik",
          label: "Minu rahaline eluviis 5 aasta pärast on…",
          placeholder: "Kirjuta siia…",
        },
        { id: "lause1", label: "Miks see mulle oluline on?", placeholder: "Kirjuta siia…" },
        {
          id: "lause2",
          label: "Millised väärtused selles visioonis peegelduvad?",
          placeholder: "Kirjuta siia…",
        },
        {
          id: "lause3",
          label: "Milline üks väike samm viiks mind sellele lähemale?",
          placeholder: "Kirjuta siia…",
        },
      ],
      after: [
        {
          t: "note",
          text: "Soovi korral lisa pildid või märksõnad oma visioonitahvlile – seda saad kasutada järgmise nädala eesmärkide seadmisel.",
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
          text: "Sinu rahaline „miks“ on sügavam kui ükski arv pangakontol. See on tunne, mille poole sa liigud – rahu, vabadus, kindlus või tähendus. Kui tead, miks sa raha kogud, kulutad või investeerid, muutuvad otsused lihtsamaks.",
        },
        {
          t: "say",
          text: "Sa ei säästa enam hirmust, vaid usaldusest. Sa ei kuluta enam süüst, vaid teadlikkusest. Sa juhid oma raha, mitte ei lase rahal end juhtida.",
          rohk: "Sa juhid oma raha, mitte ei lase rahal end juhtida",
        },
      ],
      teaser: {
        title: "Mis ootab ees?",
        text: "Järgmises sammus võtame aja peatuda ja peegeldada: vaatame tagasi kõigile seitsmele päevale, kordame õpitut ja loome kokku pildi sinu uuest rahalisest mõtteviisist.",
      },
    },
  ],
};
