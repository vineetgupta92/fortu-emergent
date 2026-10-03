// Interface strings that are NOT in fortu_sisu.json but are defined in
// fortu_disainijuhis.md (headers, accessibility) or fortu_prototuup.html (aria labels).

const ofWord: Record<number, string> = {
  2: "kahest",
  3: "kolmest",
  4: "neljast",
  5: "viiest",
  6: "kuuest",
  7: "seitsmest",
  8: "kaheksast",
  9: "üheksast",
  10: "kümnest",
  11: "üheteistkümnest",
  12: "kaheteistkümnest",
  15: "viieteistkümnest",
};
const of = (n: number) => ofWord[n] ?? `${n}-st`;

export const ui = {
  titles: {
    why: "Miks valida Fortu",
    self: "Eneseteadlikkus",
    abc: "Rahatarkuse ABC",
    journey: "Sinu teekond",
    dictionary: "Sõnaraamat",
    profile: "Profiil",
  },
  screenLabels: {
    login: "Sisselogimine",
    home: "Kodu",
    instructions: "Enne alustamist",
    hint: "Vihje",
    result: "Sinu tulemus",
  },
  nav: {
    menu: "Peamenüü",
    home: "Kodu",
    journey: "Teekond",
    dictionary: "Sõnaraamat",
    profile: "Profiil",
  },
  back: "Tagasi",
  mascotLabel: "Fortu, rakenduse maskott",
  mascotPlaceholder: "maskott\nFORTU",
  verdict: { correct: "Õige vastus", wrong: "Sinu vastus, vale" },
  legalEmphasis: ["kasutustingimuste", "privaatsuspoliitikaga"],
  locked: "Lukus",
  stepsUnit: "sammu",
  stepState: { done: "Läbitud", current: "Käesolev", next: "Alustamata" },
  topicLabel: (n: number, name: string) => `Teema ${n}: ${name}`,
  stepA11y: (i: number, total: number, name: string, state: string) =>
    `Samm ${i} ${of(total)}: ${name}. ${state}.`,
  stepPrefix: (n: number) => `${n}. samm`,
  questionProgress: (i: number) => `Küsimus ${i} ${of(5)}`,
  conceptProgress: (i: number) => `Mõiste ${i} ${of(15)}`,
  lesson: {
    start: "Alusta",
    continue: "Jätka",
    check: "Kontrolli",
    reflection: "Vaata peegeldust",
    feedback: "Vaata tagasisidet",
    finish: "Päev lõpetatud!",
    done: "Samm läbitud",
    agendaTitle: "Mis sind ootab?",
    sectionProgress: (i: number, n: number) => `Osa ${i} ${of(n)}`,
    questionOf: (i: number, n: number) => `Küsimus ${i} ${of(n)}`,
    statementOf: (i: number, n: number) => `Väide ${i} ${of(n)}`,
    savedLocally: "Sinu vastused salvestuvad ainult sinu seadmesse.",
    yourGoal: "Sinu eesmärk",
    yourChoice: (category: string) => `Sinu valik: ${category}`,
  },
};
