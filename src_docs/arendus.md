# Fortu — arendusjuhis

Selles dokumendis on **kaks liiki sisu** ja neid tuleb hoida lahus:

- **OTSUSTATUD** — kokku lepitud ja prototüübis töötav
- **ETTEPANEK** — ei ole otsustatud, vajab arendaja kinnitust või asendamist

Disain ja tekstid on failides `fortu_disainijuhis.md` ja `fortu_sisu.json`. Need on otsustatud tervikuna.

---

## 1. Mis on olemas ja mis mitte

| | Seis |
|---|---|
| 44 ekraanivaadet, 15 malli | Prototüübis töötab |
| Kogu tekst ja sisu | JSON-is |
| Disainisüsteem | Dokumenteeritud |
| **Andmete salvestamine** | **Puudub — kõik elab mälus** |
| **Autentimine** | **Puudub — nupud on kaunistus** |
| **Teemade 1–4 sisu** | **Puudub — 28 sammu** |
| **Profiil** | **Puudub** |
| **Vea- ja tühiseisundid** | **Puudub** |

Prototüüp on `fortu_prototuup.html` — üks fail, ilma sõltuvusteta. Ta ei ole lähtekood, vaid käitatav spetsifikatsioon.

---

## 2. Olek prototüübis

Praegu hoitakse oleku kolmes kohas, kõik mälus:

```js
window.fortuState = {
  t1Done:   false,   // eneseteadlikkus läbitud
  abcDone:  false,   // rahatarkuse ABC läbitud
  t2Done:   0        // teema 1 sammude arv (ei muutu, sest sisu puudub)
}
```

Lisaks moodulite sees, mida ei salvestata:
- eneseteadlikkuse vastused (`answers`), praegune küsimus (`idx`)
- ABC vastused (`vastused`), kontrollitud (`kontrollitud`), praegune mõiste (`idx`)
- sõnaraamatu eelmine ekraan (`__srFrom`)

Lehe värskendamisel kaob kõik.

---

## 3. ETTEPANEK: andmemudel

> Ei ole otsustatud. Allpool on minimaalne komplekt, mis katab praeguse funktsionaalsuse.

```
kasutaja
  id
  loodud                 esimene sisselogimine — vaja „Päevi koos Fortuga" jaoks
  viimati_nähtud         vaja sama näitaja jaoks, kui loetakse aktiivseid päevi

eneseteadlikkus
  vastused[5]            indeks 0–2 iga küsimuse kohta
  skoor                  summa, 0–10
  lõpetatud_aeg

rahatarkuse_abc
  vastused[15]           valitud variandi indeks
  skoor                  õigete arv, 0–15
  lõpetatud_aeg

edenemine
  teema_id
  samm_nr
  lõpetatud_aeg

aktiivsed_päevad         kuupäevade loend või loendur
```

### Küsimus 1: mida „Päevi koos Fortuga" täpselt loeb?

Kaks võimalust ja need annavad väga erineva arvu:

- **Kalendripäevi esimesest sisselogimisest.** Lihtne, üks kuupäev. Aga kasvab ka siis, kui kasutaja ei ava rakendust.
- **Päevi, mil rakendus avati.** Ausam, aga nõuab iga päeva salvestamist.

Teine on tõenäoliselt õigem, sest näitaja mõte on suhte kestus, mitte kalendri kulg. **Vajab otsust.**

### Küsimus 2: kas eneseteadlikkuse saab uuesti teha?

Praegu ei saa. Tulemuse ekraanile jõuab teekonna kaudu tagasi, aga vastuseid muuta ei saa.

Kui kunagi saab, siis: kas vana tulemus asendatakse või säilitatakse ajalugu? Vt ka disainijuhis — tasemesilt eemaldati osaliselt sellepärast, et korduvat hindamist ei plaanitud.

### Küsimus 3: kas skoorid salvestatakse igavesti?

ABC skoori näidatakse ka hiljem, kui kasutaja tuleb teekonna kaudu tagasi. See tähendab, et ta tuleb salvestada, mitte ainult mälus hoida.

---

## 4. ETTEPANEK: autentimine

> Ei ole otsustatud.

Prototüübis on avavaates kaks nuppu: **Jätka Google'iga** ja **Jätka Apple'iga**. Eraldi sisselogimisvaadet ei ole — samad nupud teevad nii kontot kui sisselogimist.

Ettepanek: OAuth mõlemaga, parooliga sisselogimist ei ole.

### Küsimus 4: mis juhtub, kui ligipääs kaob?

Kui kasutaja kaotab oma Google'i või Apple'i konto, ei ole rakendusel ühtegi viisi teda tuvastada. Tavaline lahendus on küsida e-posti aadress hiljem, näiteks pärast esimese teema läbimist.

**See on toote, mitte tehniline otsus.** Vt disainijuhis — praegu ei ole kuskil kohta, kus e-posti küsida.

### Küsimus 5: Apple'i nime varjamine

Apple lubab kasutajal nime varjata ja Google ei anna seda alati. Prototüüp kasutab seetõttu neutraalset „Tere!" ilma nimeta.

Kui nime hakatakse kasutama, vajab tühi juht eraldi käsitlemist.

### Küsimus 6: privaatsuslubadus

Ekraanil „Miks valida Fortu" on rida: **„Sinu andmed on kaitstud ja säilivad ainult sinu jaoks."**

See on ainus lubadus rakenduses, mida disain ei saa kinnitada. Enne avaldamist peab keegi ütlema, mida see täpselt lubab — kas andmeid ei jagata kolmandatele, kas neid ei kasutata analüütikaks, kas neid saab kustutada.

---

## 5. ETTEPANEK: mida salvestada lokaalselt ja mida serveris

> Ei ole otsustatud.

| Andmed | Kus | Miks |
|---|---|---|
| Edenemine, skoorid, vastused | Server | Peab säilima seadmevahetusel |
| Sõnaraamatu eelmine ekraan | Mälu | Sessioonisisene |
| Poolelijäänud küsimustiku seis | Lokaalne + server | Kui kasutaja sulgeb äpi ABC keskel, peaks jätkama sealt |

### Küsimus 7: kas poolelijäänud küsimustik säilib äpi sulgemisel?

Prototüübis säilib ainult menüüs liikumisel, mitte lehe värskendamisel. Päris äpis on see päris küsimus: kui kasutaja sulgeb äpi kaheksanda ABC mõiste juures, kas ta jätkab sealt või algusest?

Ettepanek: jätkab sealt. Vastasel juhul võib kasutaja kaotada viis minutit tööd.

---

## 6. Loogika, mis on OTSUSTATUD

Need on prototüübis implementeeritud ja ei vaja arutamist.

### Teekonna avanemine

```
Teema 1 (Rahatarkuse algus) on läbitud, kui eneseteadlikkus JA ABC on mõlemad tehtud.
Teema 2 avaneb alles siis.
Teemad 3–5 avanevad eelmise läbimisel.
```

### Progressiriba

Loeb vastatud küsimusi, mitte ekraane. Eneseteadlikkuses 5, ABC-s 15. Vihjelehed ja pakisissejuhatused riba ei liiguta.

ARIA `aria-valuemax` tuleb seada iga voo jaoks eraldi, sest riba on jagatud element.

### Tagasinool

| Ekraan | Nool viib |
|---|---|
| Küsimus | Eelmisele küsimusele, vastus on alles |
| Esimene küsimus | Juhise ekraanile |
| Vihjeleht | Tagasi küsimusele |
| Tulemus (voost) | Viimasele küsimusele |
| Tulemus (teekonnalt) | Teekonnale |
| ABC mõiste | Eelmisele mõistele või pakisissejuhatusele |
| ABC lõpp (voost) | Viimasele mõistele |
| ABC lõpp (teekonnalt) | Teekonnale |
| Sõnaraamat | Sinna, kust tuldi |

### ABC vastamine

```
1. Kasutaja valib variandi            → nupp aktiveerub, silt „Kontrolli"
2. Kasutaja vajutab Kontrolli         → verdikt kuvatakse, valikud lukustuvad, silt „Jätka"
3. Kasutaja vajutab Jätka             → järgmine mõiste või pakisissejuhatus
```

Uuesti proovida ei saa. Skoor on õigete vastuste arv.

### Vastuste järjekord

JSON-is on õige vastus väljal `oige` ja valed väljal `valed`. Väli `kuvamisjarjekord` on kolmeelemendiline massiiv, mis ütleb indeksid massiivis `[õige, vale1, vale2]`.

Näiteks `[1,0,2]` tähendab: esimesena kuvatakse vale1, teisena õige, kolmandana vale2.

**See ei tohi olla juhuslik.** Järjekord on fikseeritud, et õige vastus jaotuks ühtlaselt kolme positsiooni vahel. Kui juhuslikustada, võib ta sattuda enamasti ühte kohta.

---

## 7. Teadaolevad piirangud prototüübis

Need ei ole vead, vaid kohad, kus sisu puudub.

- Teema kavas nupp „Alusta" ei vii kuhugi
- Teekonna sammuread viivad kõik teema kavasse
- Profiil kuvab teate „Profiili ei ole veel tehtud."
- `t2Done` ei muutu kunagi, sest teema 1 sisu puudub
- Koduekraani „Päevi koos Fortuga: 14" on kõvakodeeritud
- „Teemad läbitud: 0 / 5" loeb rahatarkuse alguse teemaks, aga teekonnas ei ole tal numbrit

Viimane on **päris vastuolu**, mitte puuduv sisu. Üks neist kahest peab muutuma.

---

## 8. Küsimused kokku

| Nr | Küsimus | Kelle otsus |
|---|---|---|
| 1 | Mida „Päevi koos Fortuga" loeb? | Toode |
| 2 | Kas eneseteadlikkuse saab uuesti teha? | Toode |
| 3 | Kas skoorid salvestatakse igavesti? | Arendus |
| 4 | Mis juhtub, kui Google'i või Apple'i ligipääs kaob? | Toode |
| 5 | Kuidas käsitleda varjatud nime? | Arendus |
| 6 | Mida privaatsuslubadus täpselt lubab? | Juriidika |
| 7 | Kas poolelijäänud küsimustik säilib äpi sulgemisel? | Toode |
| 8 | Kas rahatarkuse algus on teema või mitte? | Toode |

Küsimus 8 on viimane, aga mõjutab kahte kohta: koduekraani loendurit ja teekonna numeratsiooni.
