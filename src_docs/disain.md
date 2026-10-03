# Fortu — disainijuhis

Mobiilirakendus rahatarkuse õppimiseks, eesti keeles. Kasutaja läbib teekonna, mis koosneb teemadest ja sammudest.

Kogu tekst ja sisu on failis `fortu_sisu.json`. See dokument kirjeldab, kuidas asjad välja näevad ja käituvad; JSON ütleb, mis seal kirjas on.

---

## 0. Mida MITTE teha

Need on teadlikud otsused, mitte puuduvad funktsioonid. Ära lisa neid, isegi kui need on õpirakendustes tavalised.

- **Ei ole seeriat** (streak). Päevade loendur „Päevi koos Fortuga" ainult kasvab ja ei nullu kunagi.
- **Ei ole punkte ega XP-d.** Ainus number, mida kasutajale näidatakse, on ABC skoor.
- **Ei ole elusid ega südameid**, mis otsa saaksid.
- **Ei ole kiitust.** Mitte „Tubli!", „Suurepärane!", „Väga hea!". Tagasiside on kirjeldav, mitte hinnanguline.
- **Ei ole tasemesilte** nagu ALUSTAJA, EDASIJÕUDNU. Need olid varem olemas ja eemaldati.
- **Ei ole teateid ega meeldetuletusi**, mis survestavad tagasi tulema.
- **Ei lubata rahalist tulemust.** Fortu õpetab, ta ei kasvata kellegi raha. Vt peatükk 8.

---

## 1. Värvid

```
--primary      #12332C   tume roheline: päis, ikoonid, aktiivsed olekud
--glow         #1E4A3F   gradiendi hele ots
--deep-low     #0A211C   gradiendi tume ots
--surface      #F1F7F4   hele pind: kaardid, vihjekastid
--border       #E2EBE6   piirjooned
--text         #16211E   põhitekst
--secondary    #5A6B63   abitekst
--mint         #9BE3B8   nupud
--mint-text    #0A2620   tekst mindi peal
--gold         #E8C46A   rõhutus tumedal
--gold-dark    #7A4A05   rõhutus heledal
--pink         #F5B8D0   süda tumedal
--pink-dark    #B03A6A   süda heledal
--on-deep-dim  #A9BFB4   abitekst tumedal
--ok           #1B5E2A   õige vastus
--ok-bg        #E4F2E6
--no           #B3261E   vale vastus
--no-bg        #FBEAE7
```

### Värvide rollid

| Värv | Roll | Kus |
|---|---|---|
| Tume roheline | Struktuur | Päis, ikoonid, aktiivsed olekud |
| Mint | Tegevus | **Ainult nupud** |
| Kuld | Rõhutus | Serif-lause rõhutatud osa, ABC skoor |
| Roosa | Soojus | **Ainult süda tulemuse ekraanil** |
| Roheline / punane | Verdikt | **Ainult ABC vastustel** |

Mint ei tohi esineda mujal kui nuppudel. Kui ta satub tekstile või ikoonile, kaob tähendus.

---

## 2. Tüpograafia

- **Inter** — kogu liides
- **Fraunces** — ainult Fortu kõne, serif, kaldkiri rõhutusel

| Tasand | Suurus | Kaal |
|---|---|---|
| Pealkiri | 28 px | 700 |
| Alapealkiri, küsimus | 20 px | 600 |
| Sisutekst | 16 px | 400 |
| Nupud, rea pealkirjad | 16 px | 600 |
| Abitekst, loendurid | 13–14 px | 400–600 |
| Fortu kõne (Fraunces) | 19–26 px | 400 |

**Serif tähendab, et Fortu räägib.** Ta esineb ühe korra ekraani kohta ja märgib täpselt selle lause, mis on kõige tähtsam. Rõhutatud osa on kuldne ja kaldkirjas. JSON-is on iga sellise lause juures väli `rohk`, mis ütleb, milline osa lausest on kuldne.

---

## 3. Mõõdud

```
kaardid, suured plokid   border-radius 24px
nupud                    border-radius 18px
valikud, väljad          border-radius 16px
vari                     0 6px 20px rgba(18,51,44,.07)
vahed                    16 / 24 / 32 px
ekraani külgvahe         24px
```

---

## 4. Tume ja hele

Kaks režiimi, mis vahelduvad tähenduslikult.

| Tume — Fortu räägib | Hele — sina teed |
|---|---|
| Avavaade, kodu | Miks valida Fortu |
| Vihjelehed | Eneseteadlikkuse sissejuhatus |
| Eneseteadlikkuse juhis | Küsimused |
| Tulemus | ABC küsimused |
| ABC sissejuhatus, pakisissejuhatused, lõpp | Teekond, teema kava, sõnaraamat |

**Tume taust on radiaalne gradient:**
```css
radial-gradient(120% 62% at 50% 0%, var(--glow) 0%, var(--primary) 45%, var(--deep-low) 100%)
```

Tumedatel ekraanidel:
- Päis on läbipaistev, gradient jookseb selle taha
- Kaardid ja pinnad on `rgba(255,255,255,.07)`
- Nupp jääb samaks: mint täidis, tume tekst
- Tekstinupud on mint

---

## 5. Päis

Päis kannab kohta, mitte brändi. Sõna FORTU ei esine päises kunagi.

| Ekraan | Päis |
|---|---|
| Avavaade, kodu | Ainult lehemärk (ikoon) |
| Miks valida Fortu | „Miks valida Fortu" |
| Eneseteadlikkuse ekraanid | „Eneseteadlikkus" |
| ABC ekraanid | „Rahatarkuse ABC" |
| Teekond | „Sinu teekond" |
| Teema | Teema nimi ilma numbrita, nt „Raha psühholoogia" |
| Sõnaraamat | „Sõnaraamat" |

### Voo-režiim

Küsimuste, vihjete, tulemuse, ABC pakkide ja ABC lõpu ekraanidel on päises lisaks:
- **tagasinool vasakul**
- **progressiriba** terve laiuse ulatuses, pealkirja all

Progressiriba loeb küsimusi, mitte ekraane: eneseteadlikkuses 5, ABC-s 15. Vihjelehed ja pakisissejuhatused riba ei liiguta.

Sõnaraamatus on nool, aga riba ei ole.

---

## 6. Alumine menüü

Neli vahekaarti, ainult ikoonid: **Kodu · Teekond · Sõnaraamat · Profiil.**

Aktiivne on mint ja ikooni all on väike täpp — aktiivsust näitab nii värv kui kuju.

### Millal menüü on

| On | Ei ole |
|---|---|
| Küsimuseekraanid | Vihjelehed |
| Lõppekraanid (tulemus, ABC skoor) | Pakisissejuhatused |
| Kodu, teekond, teema kava, sõnaraamat | Eneseteadlikkuse juhis |
| ABC sissejuhatus | Avavaade |

**Reegel:** menüü on siis, kui ekraan on koht. Menüüd ei ole siis, kui ekraan on läbisõit.

---

## 7. Mallid

Ekraanivaateid on 44, aga malle on 15. Korduv sisu tuleb JSON-ist.

### 7.1 Küsimus (eneseteadlikkus) — 5 korda

Pealkiri (küsimus) · juhis · kolm valikut · nupp „Jätka".

- Valik on kaart raadionupuga teksti ees
- Valitud: 1,5 px raam primary-värvi, taust surface, raadionupp täidetud
- **Linnukest ei kasutata.** Linnuke tähendab „õige"; siin ei ole õigeid vastuseid
- Nupp on `disabled`, kuni valik on tehtud
- Vastust saab enne jätkamist muuta
- Tagasinool viib eelmise küsimuse juurde, vastus on alles

### 7.2 Vihjeleht — 5 korda

Tume. Üks lause keskel, Fraunces, rõhutatud osa kuldne. Nupp „Jätka".

Tuleb iga vastuse järel, enne järgmist küsimust.

### 7.3 Tulemus — 1 ekraan, 3 teksti

Tume. Ülevalt alla:

1. Maskott (144 px ring)
2. **Roosa täidetud süda**, 30 px — ainus täidetud ikoon kogu rakenduses
3. Juhtlause, Fraunces 23 px, **kuldne**
4. „Vaata oma vastuseid" — avatav, vaikimisi kinni
5. Selgitus, abiteksti värvi
6. Nupp „Jätka"

Juhtlause ja selgitus valitakse skoori järgi (0–3, 4–7, 8–10). Skoori ennast **ei näidata**. Punkt antakse valiku indeksi järgi: 0, 1 või 2.

Avatud kokkuvõttes on iga küsimuse teema ja kasutaja vastus. Hinnangut ei ole.

### 7.4 ABC pakisissejuhatus — 3 korda

Tume. Silt trükitähtedega (kuldne, tähevahe 1,5 px) · üks lause Fraunces, rõhutus kuldne · nupp „Jätka".

### 7.5 ABC küsimus — 15 korda

Pealkiri (mõiste) · juhis „Mida see mõiste tähendab?" · kolm valikut · nupp.

**Vastus kinnitatakse eraldi nupuga.**

| Olek | Nupp |
|---|---|
| Valikut ei ole | „Kontrolli", `disabled` |
| Valik tehtud | „Kontrolli", aktiivne |
| Kontrollitud | „Jätka" (viimasel „Vaata tulemust" ei ole — kõigil „Jätka") |

Pärast kontrollimist:
- Õige vastus: roheline raam ja täidis, linnuke paremal
- Kasutaja vale valik: punane raam ja täidis, ristike paremal
- Ülejäänud: läbipaistvus 45%
- Tekst ei muutu, valikud muutuvad `disabled`
- Uuesti proovida ei saa

**Vastuste järjekord on segatud.** JSON-is on õige vastus alati väljal `oige`, aga väli `kuvamisjarjekord` ütleb, mis järjekorras kolm varianti ekraanil on. Seda ei tohi juhuslikustada — järjekord on fikseeritud, et õige vastus ei oleks alati samas kohas.

### 7.6 Sõnaraamat

Hele, keritav. Ülal sissejuhatus oma pinnal (surface, 16 px raadius).

Seejärel mõisted tähestiku järjekorras, tähevahepealkirjadega (E, I, K, M, P, R, S, V).

**Eesti tähestik, mitte brauseri oma:**
```
a b c d e f g h i j k l m n o p r s š z ž t u v w õ ä ö ü x y
```
Õ, ä, ö ja ü tulevad pärast v-d. Näiteks „Sääst" on „Sissetuleku" järel ja „Võlg" on viimane.

Sisu: ABC 15 mõistet (õiged vastused) pluss `sonaraamat_lisaks` kirjed.

**Tagasitee:** päise nool viib sinna, kust tuldi. ABC keskelt sellesse küsimusse, kus pooleli jäi. Rakendus peab mäletama eelmist ekraani.

### 7.7 Teekond

Hele, keritav. Üks kaart teema kohta.

| Olek | Välimus | Käitumine |
|---|---|---|
| Lõpetatud | Valge, 1,5 px primary raam, täis loendur | Avaneb, näitab sammud linnukestega; samm viib oma tulemusele |
| Pooleli | Valge, primary raam, progressipunktid | Avaneb; käesolev samm viib sinna, kus pooleli |
| Alustamata | Valge raam, nupp „Alusta" | Nupp viib esimesse sammu |
| Lukus | Surface-taust, hall tekst, tabalukk | Vajutus näitab põhjuse (teksti all) |

**Progressipunktid:** tehtud = täidetud punkt, käesolev = **rõngas valge sisuga**, ees = hall punkt. Käesolev ei tohi olla täidetud — muidu näeb viimase sammu juures kogu riba lõpetatuna välja.

Sammude ridadel on kolm elementi: teemaikoon, nimi, oleku ikoon. **Numbreid ei ole.**

### 7.8 Kodu — kaks olekut

Vahetub selle järgi, kas teema 1 (Rahatarkuse algus) on täielikult läbitud.

**Uus kasutaja:** silt „Tere!" (kuldne) · pealkiri „Mina olen Fortu" · kehatekst · Fortu kõne serifis · maskott 184 px · nupp „Alusta" · link „Vaata, kuidas see töötab".

**Naasev kasutaja:** pealkiri „Tere taas!" · abitekst · maskott 124 px · jätkamise kaart · kaks näitajat kõrvuti · sõnum all kuldses serifis.

Jätkamise kaart: pealkiri „Jätka teekonda" · rida „N. samm · [sammu nimi]" (number mint) · progressiriba · loendur · ümmargune mint nupp noolega.

Kaart osutab sellele, mis on päriselt pooleli.

### 7.9 Ülejäänud üksikekraanid

Avavaade, Miks valida Fortu, eneseteadlikkuse sissejuhatus ja juhis, ABC sissejuhatus ja lõpp, teema kava, profiil. Tekstid JSON-is, võtmes `ekraanid`.

---

## 8. Tekst ja hääl

### Kes räägib

| Olukord | Hääl | Näide |
|---|---|---|
| Maskott on ekraanil | **Mina** | „Näitan sulle, kust raha tuleb" |
| Müügipind (avavaade, Miks valida Fortu) | **Fortu** | „Fortu on alati olemas" |
| Kõik muu | **Sina**, Fortut ei mainita | „Vasta viiele küsimusele" |
| Fortu ja kasutaja koos | **Meie** | „Enne kui hakkame koos" |

Kasutaja on alati „sina", väikese algustähega.

### Mida Fortu lubab

| Lubatud | Keelatud |
|---|---|
| Teadmine, oskus, harjumus, kindlustunne, selgus, rahu, järjepidevus | Rohkem raha, tootlus, kasv, rikkus, tulemused, sissetulek |

Fortu on hariduslik rakendus. Ta ei halda kellegi raha ega anna investeerimissoovitusi.

### Nupusõnad

**Alusta** — ainult seal, kus midagi päriselt algab (kodu, Miks valida Fortu, teema kava).
**Jätka** — kõikjal mujal.
**Kontrolli** — ainult ABC-s, vastuse kinnitamiseks.

### Kirjavahemärgid

- Pealkirjad ei lõpe punktiga
- Vastusevariandid ei lõpe punktiga
- Erand: ABC küsimus 2 pealkiri lõpeb kolme punktiga, sest vastus jätkab lauset

---

## 9. Ligipääsetavus

- Kõik värvipaarid läbivad WCAG AA. Gradiendil on kontrast mõõdetud kõige heledamas punktis.
- **Olek ei tohi sõltuda ainult värvist.** Menüü aktiivsel ikoonil on täpp, progressi käesolev punkt on rõngas, ABC verdikt on värv **ja** ikoon.
- Valikutel peab olema `role="radio"` ja `aria-checked`.
- ABC verdikt vajab ekraanilugejale eraldi teksti: õige vastuse juures „Õige vastus", kasutaja vale valiku juures „Sinu vastus, vale".
- Nupud peavad olema päriselt `disabled`, mitte ainult halliks värvitud.
- Ekraani vahetumisel tuleb fookus viia uuele ekraanile.
- Sammude ridadel aria-label kujul „Samm 3 seitsmest: Raha ja uskumused. Käesolev."

---

## 10. Kaks viktoriini, kaks reeglit

Rakenduses on kaks küsimustikku ja nad on tahtlikult vastandlikud.

| | Eneseteadlikkus | Rahatarkuse ABC |
|---|---|---|
| Mida mõõdab | Kus sa oled | Mida sa tead |
| Õigeid vastuseid | Ei ole | On |
| Kinnitamine | Kohe, ilma nuputa | Kontrolli-nupuga |
| Tagasiside | Ei ole, raam näitab valikut | Roheline või punane täidis |
| Vahepealne ekraan | Vihje iga vastuse järel | Pakisissejuhatus iga viie järel |
| Skoor lõpus | Ei näidata | Näidatakse |

**Valik näitab raamiga, hinnang näitab täidisega.** Eneseteadlikkuses on ainult raam, seega verdikti ei teki kunagi.

---

## 11. Maskott

Maskott on kährik rohelises pusas. **Pilti ei ole veel olemas** — prototüübis on hall ring tekstiga „maskott FORTU".

Ta ilmub neljas kohas: avavaade, kodu, eneseteadlikkuse sissejuhatus, tulemus. Piirang on tahtlik.

Ekraanilugejale: „Fortu, rakenduse maskott".

---

## 12. Mis puudub

Prototüübis ei ole ja tuleb juurde ehitada:

- **Teemade 1–4 sisu.** 28 sammu, millest ühtegi ei ole. Praegu lõpeb rakendus teema kavaga.
- **Profiil.** Vahekaart on olemas, sisu ei ole.
- **Vea- ja tühiseisundid.** Puudub internet, sisselogimine ebaõnnestus, sisu ei laadi.
- **Andmemudel ja autentimine.** Vt `fortu_arendusjuhis.md`.
