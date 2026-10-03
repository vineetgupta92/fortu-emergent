import type { Lesson } from "./types";

export const rahaJaTunded: Lesson = {
  id: "raha-ja-tunded",
  topicId: "raha-psuhholoogia",
  code: "1.2",
  name: "Raha ja tunded",
  opening: {
    subtitle:
      "Uurime, kuidas hirm, süütunne ja uhkus mõjutavad meie käitumist rahaga ning mida tunded meile õpetavad.",
    greeting: "Tere! Täna avastame koos, kuidas tunded juhivad meie rahaga seotud otsuseid. Oled valmis?",
    agenda: [
      { icon: "book", label: "Sissejuhatus", text: "Loome isikliku seose teemaga ja mõistame, miks see teema on oluline." },
      { icon: "bulb", label: "Teooria", text: "Miks me tunneme rahaga seotud tugevaid emotsioone ja mida need tähendavad?" },
      { icon: "clipboardList", label: "Test", text: "Vasta kolmele küsimusele!" },
      { icon: "clipboardCheck", label: "Tegevus", text: "Märka oma tundeid ja kirjelda kolme viimast rahalist otsust." },
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
          text: "Kas oled kunagi tundnud süütunnet, kui ostad midagi endale? Või hirmu, et raha saab otsa? Või uhkust, kui suudad endale midagi lubada? Raha puudutab meid emotsionaalselt palju sügavamalt, kui me arvame.",
        },
        {
          t: "p",
          text: "Iga kord, kui teeme rahalise otsuse – kas kulutada, säästa või keelduda – käivituvad tunded ja alateadlikud mustrid. Sellepärast pole rahaga seotud käitumine kunagi ainult loogiline. See on emotsionaalne keel, mida tasub õppida lugema.",
        },
        {
          t: "say",
          text: "Märka oma tundeid! Need toimivad kui sisemine kompass, mis suunab sinu valikuid.",
          rohk: "sisemine kompass",
        },
      ],
    },
    {
      kind: "text",
      id: "teooria",
      title: "Teooria",
      blocks: [
        { t: "p", text: "Miks me tunneme rahaga seotud tugevaid emotsioone ja mida need tähendavad?" },
        {
          t: "p",
          text: "Raha on küll number pangakontol, aga meie jaoks tähendab see palju enamat. Raha on lihtsalt vahend, kuid me anname sellele tähenduse: raha on turvatunne, vabadus, väärtus, armastus või võim. Just see tähendus paneb meid tundma tugevaid emotsioone.",
        },
        { t: "h", text: "Hirm" },
        {
          t: "p",
          text: "Hirm rahapuuduse ees võib panna meid ülemäära säästma või vältima riske, isegi kui need oleksid mõistlikud. Mõned inimesed hoiavad iga sendi alles, sest kardavad, et seda võib hiljem vaja minna. Teistel väljendub hirm vastupidiselt – hetkeemotsiooni ajel kulutamises, sest „täna vähemalt saan nautida“.",
        },
        { t: "h", text: "Süütunne" },
        {
          t: "p",
          text: "Süütunne võib tekkida siis, kui kulutame raha iseendale („Kas ma tõesti vajan seda?“) või kui meil on rohkem kui teistel. Süütunne paneb sageli oma vajadusi alla suruma ja rahaga seotud otsuseid tegemata jätma. Samas võib see sundida ka ülemäära heastama, andma liiga palju teistele või tegema otsuseid, et „olla hea inimene“.",
        },
        { t: "h", text: "Uhkuse- ja häbitunne" },
        {
          t: "p",
          text: "Raha võib anda uhkustunde, kui tunneme, et oleme midagi saavutanud. See on loomulik ja tervislik, kui seda saadab tänutunne, mitte üleolek. Häbi võib tekkida siis, kui arvame, et meil pole „piisavalt“ või kui oleme teinud rahalise vea. Häbitunne võib panna inimesi varjama oma rahalist seisu, vältima arutelusid ja kaotama kontrolli olukorra üle.",
        },
        {
          t: "p",
          text: "Need tunded ei ole halvad, vaid signaalid, mis näitavad, mis meie sees vajab tähelepanu ja tasakaalu.",
        },
        { t: "h", text: "Mida emotsioonid meile õpetavad" },
        { t: "p", text: "Emotsioonid räägivad meie sisemisest vajadusest:" },
        {
          t: "list",
          items: [
            "Hirm räägib turvatunde vajadusest.",
            "Süütunne võib viidata sellele, et oled unustanud enda vajadused või võtad liiga palju vastutust teiste eest.",
            "Uhkus räägib väärtustamisest ja saavutusvajadusest.",
          ],
        },
        {
          t: "p",
          text: "Kui me neid tundeid märkame ja mõistame, saame teha rahaga teadlikumaid otsuseid – mitte otsuseid hirmust või süüst, vaid väärtustest lähtudes.",
        },
      ],
    },
    {
      kind: "profile",
      id: "test",
      title: "Test",
      lead: "Millised tunded juhivad sinu käitumist rahaga? Rahaga seotud otsuseid tehes ei juhi meid ainult loogika. Märka, milline tunne kerkib esimesena.",
      questions: [
        {
          id: "q1",
          text: "Kui pead suurema ostu tegema, siis tavaliselt…",
          options: [
            { key: "a", text: "Tunnen hirmu – mis siis, kui hiljem kahetsen?" },
            { key: "b", text: "Tunnen süüd – kas see pole liiga isekas?" },
            { key: "c", text: "Tunnen rõõmu ja uhkust – olen selle ära teeninud" },
            { key: "d", text: "Tunnen rahu – otsus on läbimõeldud" },
          ],
        },
        {
          id: "q2",
          text: "Kui kuu lõpus raha hakkab otsa saama, siis…",
          options: [
            { key: "a", text: "Tekib ärevus ja vajadus kõike jälgida" },
            { key: "b", text: "Tunnen häbi, et jälle ei planeerinud paremini" },
            { key: "c", text: "Olen kindel, et küll tuleb juurde, pole hullu" },
            { key: "d", text: "Võtan rahulikult, sest mul on süsteem" },
          ],
        },
        {
          id: "q3",
          text: "Kui saad ootamatult lisaraha, siis…",
          options: [
            { key: "a", text: "Säästan, äkki kunagi võib vaja minna" },
            { key: "b", text: "Tunnen süüd, et mul läks paremini kui teistel" },
            { key: "c", text: "Kulutan ära, sest tahan rõõmu tunda" },
            { key: "d", text: "Jagan selle teadlikult – osa säästan, osa kasutan" },
          ],
        },
      ],
      reflectionTitle: "Sinu vastuste peegeldus",
      reflections: [
        {
          key: "a",
          text: "Sind juhib hirm – raha seostub pigem puuduse kui võimalusega. Väike turvapuhver või teadlik eelarve aitab ärevust vähendada.",
        },
        {
          key: "b",
          text: "Sind mõjutab süütunne – proovi lubada endale rohkem ilma hinnanguta. Raha ei määra su väärtust.",
        },
        {
          key: "c",
          text: "Sind juhib uhkus ja rõõm – need tunded annavad energiat, aga tasakaalusta neid teadliku planeerimisega.",
        },
        {
          key: "d",
          text: "Sa oled rahulik vaatleja – oled hakanud tundeid märkama ja nende järgi teadlikult tegutsema.",
        },
      ],
    },
    {
      kind: "write",
      id: "tegevus",
      title: "Tegevus",
      blocks: [
        { t: "p", text: "Märka oma tundeid ja kirjelda kolme viimast rahalist otsust." },
        { t: "p", text: "Iga otsuse juurde kirjuta, mis tunne sind sel hetkel saatis. Näiteks:" },
        {
          t: "list",
          items: [
            "Ostsin uued jalanõud. Tundsin süütunnet ja ka rõõmu.",
            "Maksin arve ära. Tundsin pinget.",
            "Tegin säästukonto. Tundsin seesmist rahu ja uhkust.",
          ],
        },
      ],
      fields: [
        { id: "otsus1", label: "1. otsus ja tunne", placeholder: "Kirjuta siia…" },
        { id: "otsus2", label: "2. otsus ja tunne", placeholder: "Kirjuta siia…" },
        { id: "otsus3", label: "3. otsus ja tunne", placeholder: "Kirjuta siia…" },
      ],
      after: [
        {
          t: "p",
          text: "Teadlikkus oma tunnetest on esimene samm tagamaks, et tunded ei juhiks sinu otsuseid, vaid hoopis toetaksid neid.",
        },
        {
          t: "say",
          text: "Iga kord, kui märkad oma tundeid, muutub sul lihtsamaks teha rahaga otsuseid, mis toetavad sinu eesmärke.",
          rohk: "märkad oma tundeid",
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
          text: "Raha puudutab meie sügavamaid vajadusi – turvatunnet, vabadust, väärtust. Kui me ei mõista oma tundeid rahaga seoses, juhivad need meid varjatult: me kas väldime, kulutame, peidame või pingutame üle. Aga kui me õpime neid tundeid teadvustama, mitte alla suruma, siis:",
        },
        {
          t: "list",
          items: [
            "hirmust saab mõistlik ettevaatus,",
            "süütundest saab tervislik vastutustunne,",
            "uhkusest saab enesekindlus ja rahulolu.",
          ],
        },
        {
          t: "p",
          text: "Tänane samm on kutse märgata, mitte hinnata. Rahaga seotud emotsioonid ei tee sind halvemaks, vaid need on justkui kompass, mis näitab, kuhu poole vaadata, et sinu suhe rahaga oleks teadlikum ja rahulikum.",
        },
        {
          t: "say",
          text: "Täna õppisid märkama midagi, mida paljud ei märka – oma tundeid. See oskus aitab sul teha rahulikumaid ja teadlikumaid rahalisi otsuseid.",
          rohk: "oma tundeid",
        },
      ],
      teaser: {
        title: "Mis ootab ees?",
        text: "Järgmises sammus liigume edasi teemaga „Raha ja uskumused“. Avastame, millised piiravad ja toetavad mõtted rahast meid juhivad ning kuidas neid ümber kujundada.",
      },
    },
  ],
};
