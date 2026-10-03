// Interface strings that are NOT in fortu_sisu.json but are defined in
// fortu_disainijuhis.md (headers, accessibility) or fortu_prototuup.html (aria labels).

const ofWord: Record<number, string> = {
  2: "kahest",
  5: "viiest",
  7: "seitsmest",
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
};
