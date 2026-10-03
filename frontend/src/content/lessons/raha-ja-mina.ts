import type { Lesson } from "./types";

export const rahaJaMina: Lesson = {
  id: "raha-ja-mina",
  topicId: "raha-psuhholoogia",
  code: "1.1",
  name: "Raha ja mina",
  opening: {
    subtitle: "Avastame, kuidas sinu suhe rahaga on kujunenud ja mida see tänases päevas tähendab.",
    greeting: "Tere! Tore on koos sinuga raha teemasse sukelduda. Oled valmis alustama?",
    agenda: [
      { icon: "book", label: "Sissejuhatus", text: "Loome isikliku seose teemaga ja mõistame, miks see teema on oluline." },
      { icon: "bulb", label: "Teooria", text: "Miks me käitume rahaga just nii, nagu käitume?" },
      { icon: "clipboardList", label: "Test", text: "Vasta kolmele küsimusele!" },
      {
        icon: "clipboardCheck",
        label: "Tegevus",
        text: "Kirjuta kolm lauset, mis iseloomustavad sinu lapsepõlve sõnumeid rahast.",
      },
      { icon: "target", label: "Kokkuvõte", text: "Mida tänasest teemast kaasa võtta?" },
    ],
  },
  sections: [
    {
      kind: "text",
      id: "sissejuhatus",
      title: "Sissejuhatus",
      blocks: [
        {
          t: "p",
          text: "Kas oled märganud, et mõnel inimesel on alati raha ja ta tunneb end turvaliselt, samas kui teised tunnevad pidevalt, et raha pole kunagi piisavalt? Tegelikult pole see ainult numbrites kinni – see on seotud sellega, mida me rahast mõtleme ja tunneme.",
        },
        { t: "p", text: "Meie suhe rahaga hakkab kujunema juba lapsena. Kuuleme fraase nagu:" },
        {
          t: "quote",
          items: [
            "Raha ei kasva puu otsas.",
            "Tööd peab rügama, et ära elada.",
            "Rikas olla on häbiasi.",
            "Raha tuleb kulutada, elu on elamiseks.",
          ],
        },
        {
          t: "p",
          text: "Need ütlused jäävad meid alateadlikult saatma ja kujundavad seda, kuidas me täna rahaga ümber käime.",
        },
        { t: "p", text: "Raha ei ole pelgalt maksevahend. See peegeldab ka meie mõtteid, tundeid ja väärtusi." },
      ],
    },
    {
      kind: "text",
      id: "teooria",
      title: "Teooria",
      blocks: [
        { t: "h", text: "Raha psühholoogia" },
        {
          t: "p",
          text: "Miks me käitume rahaga just nii, nagu käitume? Raha psühholoogia uurib, kuidas tunded, mõtted ja kogemused mõjutavad rahaga seotud otsuseid. Kuigi me arvame, et rahaasjades oleme ratsionaalsed, juhivad meid sageli hoopis emotsioonid – hirm, uhkus, süütunne, rõõm, kadedus, turvatunde vajadus.",
        },
        { t: "p", text: "Näiteks:" },
        {
          t: "list",
          items: [
            "Kui nägid lapsena, et peres muretseti pidevalt arvete maksmise pärast, võib sul ka täna tekkida raha kulutades ärevus.",
            "Kui nägid, et raha kulutati kohe, kui see tuli, võib sul olla kalduvus rahaga impulsiivselt ümber käia.",
            "Kui rahast kodus ei räägitud, võib see olla täna teema, mida sa väldid või pead ebamugavaks.",
          ],
        },
        {
          t: "p",
          text: "Need varajased kogemused muutuvad hoiakuteks raha suhtes – alateadlikeks uskumusteks ja mustriteks, mis juhivad meie otsuseid.",
        },
        { t: "h", text: "Hoiakud raha suhtes" },
        { t: "p", text: "Millised on meie alateadlikud uskumused rahast? Mõned näited levinud hoiakutest:" },
        {
          t: "list",
          items: [
            "„Raha on halb“ → võin tunda süüd, kui mul on rohkem kui teistel.",
            "„Raha on võim“ → raha annab mulle väärtust ja kontrolli.",
            "„Raha on ebastabiilne“ → ma pean alati muretsema, et seda ei saa piisavalt.",
            "„Raha on vabadus“ → kui mul on piisavalt, tunnen end rahulikuna.",
          ],
        },
        {
          t: "p",
          text: "Ükski neist pole iseenesest hea ega halb. Oluline on märgata, milline neist sind kõige rohkem mõjutab. Kui oled sellest teadlik, saad oma käitumist ja otsuseid teadlikumalt suunata.",
        },
        { t: "h", text: "Väärtused ja raha" },
        { t: "p", text: "Raha on tihedalt seotud meie väärtustega – sellega, mis on meile päriselt oluline." },
        {
          t: "list",
          items: [
            "Kui väärtustad turvatunnet, on loomulik, et sa säästad ja planeerid.",
            "Kui väärtustad vabadust ja elamusi, siis tõenäoliselt suunad raha kergemini reisimisse või uutesse kogemustesse.",
          ],
        },
        {
          t: "p",
          text: "Sisemine pinge tekib siis, kui meie valikud ei lähe kokku sellega, mis on meile päriselt oluline. Näiteks kui kulutad palju lihtsalt teiste muljetamiseks, kuid tegelikult väärtustad rahulikku ja stabiilset elu, tunned sisemist konflikti.",
        },
        { t: "note", text: "Kas mu rahaga seotud valikud toetavad minu tegelikke väärtusi?" },
      ],
    },
    {
      kind: "profile",
      id: "test",
      title: "Test",
      lead: "Kuidas sa rahaga suhestud? See test aitab sul märgata oma hoiakuid ja mõttemustreid. Vali vastused, mis tunduvad sulle kõige tuttavamad – siin pole õigeid ega valesid vastuseid.",
      questions: [
        {
          id: "q1",
          text: "Kui mõtled rahale, siis tunne, mis kõige sagedamini esile tuleb, on…",
          options: [
            { key: "a", text: "Turvatunne – raha annab kindlustunde" },
            { key: "b", text: "Ärevus – kardan, et seda pole piisavalt" },
            { key: "c", text: "Vabadus – saan teha, mida soovin" },
            { key: "d", text: "Süütunne – nagu ei tohiks ma raha nautida" },
          ],
        },
        {
          id: "q2",
          text: "Kui sa saad raha (näiteks palgapäeval või kingitusena), siis tavaliselt…",
          options: [
            { key: "a", text: "Panen osa kohe kõrvale, et kindlam tunne oleks" },
            { key: "b", text: "Tunnen pinget – kas see ikka jätkub?" },
            { key: "c", text: "Tahan end premeerida, sest olen selle ära teeninud" },
            { key: "d", text: "Tunnen segadust – ei teagi, mida sellega teha" },
          ],
        },
        {
          id: "q3",
          text: "Kui pead rahast rääkima (nt sõbra, partneri või kolleegiga), siis…",
          options: [
            { key: "a", text: "Olen avatud ja saan sellest rahulikult rääkida" },
            { key: "b", text: "Tunnen ebamugavust või väldin teemat" },
            { key: "c", text: "Tahan näidata, et mul on asjad kontrolli all" },
            { key: "d", text: "Muretsen, et teised hindavad mind selle põhjal" },
          ],
        },
      ],
      reflectionTitle: "Sinu vastuste peegeldus",
      reflections: [
        {
          key: "a",
          text: "Sind juhib turvatunde vajadus. Rahast mõtlemine pakub sulle kindlust, kuid jälgi, et sa ei püüaks kõike liigselt kontrollida.",
        },
        { key: "b", text: "Raha tekitab sinus pigem ärevust. Tasub uurida, kust need hirmud alguse on saanud." },
        {
          key: "c",
          text: "Seostad raha vabaduse ja eneseteostusega. See on tugev motivaator, kuid jälgi, et impulssostud ei haaraks juhtohje.",
        },
        {
          key: "d",
          text: "Raha seostub sulle süü- või häbitundega. Endale väärtuse ja rahulolu lubamine on sinu suurim kasvukoht.",
        },
      ],
    },
    {
      kind: "write",
      id: "tegevus",
      title: "Tegevus",
      blocks: [
        { t: "p", text: "Kirjuta kolm lauset, mis iseloomustavad sinu lapsepõlve sõnumeid rahast." },
        {
          t: "list",
          items: [
            "Mida sa kuulsid vanematelt või õpetajatelt rahast rääkides?",
            "Mis tundega sa neid meenutad?",
            "Kuidas need uskumused mõjutavad sind täna?",
          ],
        },
      ],
      fields: [
        { id: "lause1", label: "1. lause", placeholder: "Kirjuta siia…" },
        { id: "lause2", label: "2. lause", placeholder: "Kirjuta siia…" },
        { id: "lause3", label: "3. lause", placeholder: "Kirjuta siia…" },
      ],
      after: [
        {
          t: "say",
          text: "Sa tegid just midagi väga olulist. Kui mõistad, kust sinu rahaga seotud mõtted pärinevad, on sul lihtsam neid vajadusel muuta.",
          rohk: "kust sinu rahaga seotud mõtted pärinevad",
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
          text: "Meie suhe rahaga on emotsionaalne peegel, mis näitab, mida me usume, kardame ja väärtustame. Seda ei saa muuta üleöö, kuid oma mustrite teadvustamine on esimene suur samm.",
        },
        {
          t: "p",
          text: "Kui raha tekitab sinus pinget või ärevust, ei tähenda see, et sa oleksid rahaasjades „halb“. See tähendab lihtsalt, et oled kujundanud harjumused ja mõttemustrid, mida saab teadlikult muuta.",
        },
        {
          t: "p",
          text: "Tänane samm on esimene samm mõistmaks, kust su hoiakud pärinevad ja millist suhet rahaga soovid endale luua.",
        },
        {
          t: "say",
          text: "Täna ei õppinud sa ainult rahatarkust, vaid õppisid tundma ka iseennast. See on väärt teadmine.",
          rohk: "õppisid tundma ka iseennast",
        },
      ],
      teaser: {
        title: "Mis ootab ees?",
        text: "Järgmises sammus sukeldume teemasse „Raha ja tunded“. Uurime, kuidas emotsioonid nagu hirm, süütunne ja uhkus mõjutavad meie rahaga seotud otsuseid ja käitumist.",
      },
    },
  ],
};
