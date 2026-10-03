import type { Lesson } from "./types";

export const kokkuvote: Lesson = {
  id: "kokkuvote",
  topicId: "raha-psuhholoogia",
  code: "1.7",
  name: "Kokkuvõte",
  sections: [
    {
      kind: "text",
      id: "sissejuhatus",
      title: "Sissejuhatus",
      blocks: [
        {
          t: "p",
          text: "Sa oled teinud suure töö – kuus päeva eneseavastust, ausust ja teadlikke mõtteid rahast. Oled uurinud, kust su hoiakud tulevad, millised tunded sind rahas juhivad, mis uskumused sind piiravad või toetavad, milliseid väärtusi su valikud peegeldavad, kuidas seada eesmärke ja miks sa üldse seda kõike teed.",
        },
        { t: "p", text: "Täna on aeg hetkeks peatuda ja vaadata tagasi:" },
        {
          t: "list",
          items: [
            "Kuidas on muutunud minu suhe rahaga?",
            "Mida olen enda kohta õppinud?",
            "Millist uut mõtteviisi tahan kaasa võtta edasi minnes?",
          ],
        },
      ],
    },
    {
      kind: "text",
      id: "teooria",
      title: "Teooria",
      blocks: [
        { t: "h", text: "Refleksioon kinnistab muutuse" },
        {
          t: "p",
          text: "Psühholoogid ütlevad, et tegelik areng toimub siis, kui me peatume ja mõtestame õpitu lahti. Refleksioon on nagu peegel, mis aitab märgata:",
        },
        {
          t: "list",
          items: [
            "mida oled õppinud endast ja oma rahamustritest",
            "millised tunded ja uskumused on hakanud muutuma",
            "mida sa tahad hoida ja mida maha jätta",
          ],
        },
        { t: "h", text: "Uus rahaline mõtteviis tähendab:" },
        {
          t: "list",
          items: [
            "Raha ei määra minu väärtust, vaid toetab mu väärtusi.",
            "Raha ei ole ainult arv, vaid tööriist teadliku elu loomiseks.",
            "Ma saan oma harjumusi ja mõtteid muuta.",
            "Ma oskan märgata, mis mind juhib – hirm, süü, vabadus või turvatunne – ja tegutseda teadlikult.",
          ],
        },
      ],
    },
    {
      kind: "profile",
      id: "kontroll",
      title: "Kontroll",
      lead: "Mini-test: kuidas mu mõtteviis on muutunud? Vasta, mis väide sulle praegu kõige lähem on. Siin pole õigeid ega valesid vastuseid.",
      questions: [
        {
          id: "q1",
          text: "Raha tundub mulle täna…",
          options: [
            { key: "a", text: "pingutav ja murettekitav" },
            { key: "b", text: "midagi, mida saan õppida juhtima" },
            { key: "c", text: "võimalus oma väärtusi ja unistusi ellu viia" },
          ],
        },
        {
          id: "q2",
          text: "Kui mõtlen rahale, siis tunnen…",
          options: [
            { key: "a", text: "ärevust" },
            { key: "b", text: "neutraalsust" },
            { key: "c", text: "rahu ja teadlikkust" },
          ],
        },
        {
          id: "q3",
          text: "Kui kulutan või säästan, siis…",
          options: [
            { key: "a", text: "toimin harjumusest" },
            { key: "b", text: "mõtlen, kas see toetab mu eesmärki" },
            { key: "c", text: "valin vastavalt oma väärtustele ja „miksile“" },
          ],
        },
      ],
      reflectionTitle: "Sinu vastuste peegeldus",
      reflections: [
        {
          key: "a",
          text: "Raha tekitab sinus veel pinget ja vanad mustrid annavad aeg-ajalt tunda. See on loomulik osa muutumisest – sinu teadlikkus kasvab ja mustrid vajavad aega muutumiseks.",
        },
        {
          key: "b",
          text: "Suhtud rahasse pigem neutraalselt ja näed seda millegina, mida saab õppida juhtima. Liigud teadliku ja rahuliku rahasuhtumise suunas.",
        },
        {
          key: "c",
          text: "Seostad raha oma väärtuste ja unistuste elluviimisega. Su suhe rahaga on rahulik ja teadlik.",
        },
      ],
    },
    {
      kind: "write",
      id: "tegevus",
      title: "Tegevus",
      blocks: [
        { t: "h", text: "Harjutus: minu uus rahaline mõtteviis" },
        {
          t: "p",
          text: "Kirjuta kolm lauset, mis kokku võtavad sinu uue rahasuhte. Kasuta vajadusel alltoodud lauseid juhisena.",
        },
      ],
      fields: [
        { id: "lause1", label: "Raha minu elus on nüüd…", placeholder: "Kirjuta siia…" },
        {
          id: "lause2",
          label: "Ma märkan, et minu tundeid ja otsuseid juhib pigem…",
          placeholder: "Kirjuta siia…",
        },
        {
          id: "lause3",
          label: "Edaspidi tahan rahaga käituda nii, et…",
          placeholder: "Kirjuta siia…",
        },
        {
          id: "lubadus",
          label: "Minu rahaline lubadus (üks lause)",
          placeholder: "nt: Ma juhin oma raha, mitte ei lase rahal end juhtida.",
        },
      ],
      after: [
        {
          t: "note",
          text: "„Rahaline lubadus“ on üks lihtne lause, mis meenutab sinu uut suhtumist, näiteks: „Ma kasutan raha teadlikult, et luua vabadust ja rahu, mitte hirmu.“",
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
          text: "Selle nädalaga oled loonud tugeva aluse. Oled märganud, et raha ei ole lihtsalt vahend – see on peegel sinu väärtustest, tunnetest ja valikutest. Uue teadlikkusega saad hakata ehitama rahalist elu, mis toetab sinu sisemist rahu ja suurt visiooni.",
        },
        { t: "h", text: "Pea meeles:" },
        {
          t: "list",
          items: [
            "Raha ja eneseteadlikkus käivad käsikäes.",
            "Väikesed muutused mõtetes ja harjumustes toovad pikaajalisi tulemusi.",
            "Raha võib olla vahend vabaduseks, mitte allikaks ärevusele.",
          ],
        },
      ],
      teaser: {
        title: "Mis ootab ees?",
        text: "Järgmisel nädalal liigume teooriast praktikasse ja võtame fookusesse raha igapäevase liikumise: kuhu su raha tegelikult kaob, kuidas kulutusi teadlikumalt juhtida ja kuidas luua eelarve, mis ei piira, vaid annab vabaduse.",
      },
    },
  ],
};
