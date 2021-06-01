import * as React from 'react';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import Select from 'app/components/Elements/Select';

export function TermsAndConditionConsent() {
  const [language, setLanguage] = React.useState('English');

  return (
    <ProtectedContent>
      <Box
        title="Terms and Conditions"
        titleBorder
        withPadding
        titleAction={
          <Select
            style={{ borderColor: 'transparent' }}
            value={language}
            onChange={e => {
              setLanguage(e.currentTarget.value);
            }}
          >
            <option value="English">English</option>
            <option value="Filipino">Filipino</option>
          </Select>
        }
      >
        {{
          Filipino: (
            <>
              <p>
                Ang Kasunduan sa mga Tuntunin ng Serbisyo (ang “Kasunduan) ay
                naglalarawan sa mga tuntunin at kundisyon kung saan ang Squidpay
                (“Squidpay, “kami” o “ang kumpanya”) ay magbibigay ng serbisyo
                (na itutukoy sa baba) sa User o ikaw (“User” o “ikaw”). Sa
                pagrehistro para o sa paggamit ng mga serbisyo ng Squidpay, ikaw
                ay sumasang-ayon sa mga sumusunod na mga tuntunin at kundisyon,
                ikaw man ay rehistradong miyembro ng Squidpay o hindi. Ang
                paggamit mo ng serbisyo ng Squidpay ay maari ring sakop ng
                Patakaran sa Privacy/Privacy Policy ng Squidpay at iba pang mga
                kasunduan na naangkop sa isang particular na serbisyo ng
                Squidpay at isinama sa sa kasunduang ito. Pinapanatatili namin
                ang karapatan naming tanggihan ang sinuman na gumamit ng aming
                serbisyo sa kahit anong oras o rason, kabilang ngunit hindi
                limitado, sa paglabag ng anumang tuntunin ng Kasunduang ito.
              </p>
              <p>Para sa layunin ng Kasunduang ito:</p>
              <p>
                (a) Ang ibig sabihin ng “User” o “ikaw” ay isang indibidwal o
                korporasyon (kasama rito ang mga empleyado at kinatawan) na
                gumagamit o nakarehistro na gumamit ng mga serbisyo o ang nag-
                access o nag-browse ng mobile application;
              </p>
              <p>
                (b) Ang ibig sabihin ng “Serbisyo ng Squidpay” o “mga serbisyo”
                ay mga electronic o interactive na mga serbisyo na inaalok ng
                Squidpay.
              </p>
              <p>
                PAKIBASA NANG MABUTI ANG MGA TUNTUNIN AT KUNDISYON SAPAGKAT
                NAGLALAMAN ANG MGA ITO NG MGA IMPORTANTENG IMPORMASYON PATUNGKOL
                SA IYONG MGA KARAPATAN SA ILALIM NG BATAS, MGA REMEDYO, AT
                OBLIGASYON:
              </p>
              <p>
                <b>
                  I. Mga Katangiang Angkop para Makagamit ng Serbisyo ng
                  Squidpay
                </b>
              </p>
              <p>
                Ang aming serbisyo ay magagamit ng mga indibidwal na
                labingwalong gulang pataas lamang at mga korporasyon or iba pang
                mga negosyo (kasama ngunit hindi limitado sa mga negosyong isa
                lang ang may- ari) na may magandang kalagayang ligal at may
                kakayahang pumasok sa mga kasunduan at maaring mag- subscribe at
                mag-access ng aming mga serbisyo ayon sa naangkop na batas.
              </p>
              <p>
                Tinitiyak at pinangangatawanan ng User na isa siyang indibidwal
                na labing-walong gulang pataas. Ang isang menor de edad na
                nagnanais na gumamit ng serbisyo ng Squidpay ay kailangang
                magbigay ng dokumento na nagpapahayag ng pahintulot ng kanyang
                mga magulang o tagapangalaga. Tinitiyak at pinangangatawanan ng
                isang User na negosyo or korporasyon na ito ay may lisensya
                upang magnegosyo at may kalagayang ligal sa mga lugar na maari
                siyang magnegosyo (sa panahon ng kasunduang ito), na hindi
                kakumpetensiya ng Squidpay, at ang taong papasok sa Kasunduang
                ito para sa User ay labing-walong taong gulang pataas at may
                kakayahan at awtoridad na pumasok sa mga kasunduan at lahat ng
                isasagawang transaksyon para sa User. Pagkarehistro sa Squidpay
                App, kinakailangan na magbigay ang User ng kumpletong pangalan,
                kasalukuyan o palagiang tirahan, araw ng kapanganakan,
                nasyonalidad, pagkukunan ng pondo, kanyang larawan at lagda at
                ito ay naayon sa mga kinakailangan ng Know-Your-Customer “KYC”
                ng Bangko Sentral ng Pilipinas.
              </p>
              <p>
                <b>II. Mga Kahulugan</b>
              </p>
              <p>
                Ang mga kahulugan na makikita sa Kasunduan ay magkakaroon ng mga
                kahulugan na inilaan sa kanila sa ibaba.
              </p>
              <p>
                Ang “Squidpay” ay ang Squidpay Technology, Inc., isang
                institusyon na pampinansyal na hindi bangko na nasa kontrol ng
                Bangko Sentral ng Pilipinas.
              </p>
              <p>
                Ang “Squid” ay isang anyo ng e-money na pinapayagan ang mga
                awtorisadong gumamit na magpadala at tumanggap ng pera, magbayad
                ng mga bayarin at i-reload ang kanilang mga prepaid mobile
                numbers.
              </p>
              <p>
                Ang “Squidpay App” ay ang Squidpay Mobile App na maaring
                ma-download at magamit sa mga mobile device kung saan maaring
                makita ng User ang kanyang mga load credits, top-up, magpadala
                at makatanggap ng pera at suriin ang kanilang mga transaksyon.
              </p>
              <p>
                Ang “Squidpay Account” ay isang account na nagiimbak ng
                Philippine Peso value at maaring i-link sa Squidpay App.
              </p>
              <p>
                Ang “Squidpay Card” ay isang NFC prepaid card na binigay sa mga
                rehistradong User na maari nilang gamitin upang bumili at
                mag-withdraw galing sa mga Squidpay Partner Merchants.
              </p>
              <p>
                Ang “Squidpay Partner Merchants” ay ang mga negosyo na
                tumatanggap ng Squidpay bilang bayad para sa pagbili ng mga
                gamit at serbisyo. Ang mga negosyong ito ay maaari ring
                tumanggap ng Cash-in at Cash-out na transaksyon ng SquidPay.
              </p>
              <p>
                Ang “Airtime” ay ang oras na sinusukat ng mga operator ng mobile
                phone (o mga carrier) kapag sinusukat nila ang paggamit. Ito ay
                karaniwang sinusukat sa mga minuto sa pagtawag pero maari ring
                sukatin ang text at data usage.
              </p>
              <p>
                Ang “Biller” ay ang mga utility company at mga katulad nito na
                accredited ng Squidpay na tinatanggap ang SquidPay bilang bayad.
              </p>
              <p>
                Ang “Know Your Customer” or “KYC” ay ang proseso sa pagkilala ng
                User na ayon sa BSP o tinatawag ding Customer Verification.
              </p>
              <p>
                Ang “Two-Factor Authentication” ay tumutukoy sa apat (4) na
                numero na personal identification number (PIN) na pinili ng User
                na maaring gamitin sa authentication.
              </p>
              <p>
                <b>III. Mga Serbisyo ng SquidPay</b>
              </p>
              <p>
                Nagbibigay ang SquidPay sa kostumer ng isang maginhawang paraan
                ng pagbayad sa pamasahe gamit ang stored value card o mobile
                application kung saan ang mga gumagamit nito ay maaring magload
                ng ride credits para bayaran ang kanyang pamasahe at kung saan
                ang mga drayber at operator naman ay kokolekta ng bayad dito.
                Pinapayagan ng Squidpay Mobile App ang mga User na tingnan ang
                kanilang load credits, top-up, magpadala at tumanggap ng pera at
                suriin ang kanilang mga transakyon. Maaring dagdagan ng mga User
                ang kanilang load credits sa pamamagitan ng pag-load ng kanyang
                account gamit ang iba-ibang paraan ng pagbayad.
              </p>
              <p>
                Ang mga Squidpay Stored Value Cards ay maaring gamitin ng mga
                gumagamit ng tradisyonal na paraan ng transportasyon at sa mga
                Partner Merchants na maaring makita sa http://www.squidpay.ph.
              </p>
              <p>
                <b>SquidPay Cash In/Out</b>
              </p>
              <p>
                Ang SquidPay Cash-In ay ang proseso ng pagpalit ng pisikal na
                pera sa Squid sa pamamagitan ng mga paraan ng pababayad na
                tinatanggap ng Squidpay. Maaring magCash-In sa pamamagitan ng
                (a) Mobile Banking Service o “MBS” , kung saan maari ilipat ng
                User ang kanyang pera o Philippine Peso amount galing sa
                kwalipikadong bank account sa kanyang SquidPay Account gamit ang
                defined functions sa SquidPay Mobile App, o (b) SquidPay
                Partnered Merchants kung saan ang User ang personal na
                magbibigay ng kanyang pera o Philippine Peso amount para sa
                halaga na ilalagay sa kanyang SquidPay Account, o (c)
                Account-to-Account transfer kung saan pinapayagan ang User na
                ilipat ang load credits ng isang Squidpay Account sa ibang
                SquidPay account.
              </p>
              <p>
                Ang Cash Out ay ang proseso ng pag-withdraw ng pisikal na pera
                galing sa Squid. Maari itong gawin sa pamamagitan ng mga
                SquidPay Partnered Merchants, kung saan mayroong pinakamababa at
                pinakamataas na halaga na maaring i-cash-out na itatalaga ng
                SquidPay.
              </p>
              <p>
                Ang Squid ay hindi deposito at hindi sakop ng Philippine Deposit
                Insurance Corporation (PDIC). Hindi rin ito kumikita ng interes
                o monetary rewards at iba pang insentibo na maaring ipalit sa
                pera o halaga na maaring bilhin na may diskwento.
              </p>
              <p>
                Ang SquidPay ay napapailalim sa mga patakaran at regulasyon ng
                Bangko Sentral ng Pilipinas (BSP), Anti-Money Laundering Act
                (AMLA), ang Data Privacy Act, at iba pang naangkop na batas.
              </p>
              <p>
                <b>Pagbayad ng Bayarin</b>
              </p>
              <p>
                Maaring magbayad ng mga bayarin sa mga Billers na kinikilala ng
                Squidpay gamit ang “Bills Payment”
              </p>
              <p>Option na makikita sa SquidPay App.</p>
              <p>
                <b>Pagpapadala</b>
              </p>
              <p>
                Ang paglipat ng pera mula sa isang User sa isang kinikilala or
                kwalipikadong bank account ay maaring gawin ng User.
              </p>
              <p>
                Ang pagpadala o paglipat ng pera sa isang bank account ay
                mapoproseso lamang kapag ibinigay sa Squidpay ang personal na
                impormasyon ng User at ang personal na impormasyon ng tatanggap
                ng pera, numero ng kanyang account at ang mobile number at ang
                layunin ng transaksyon. Ang nakolektang impormasyon ay ipapasa
                ng SquidPay sa bangko ng tatanggap ng pera para sa hinihiling na
                pagpadala ng pera.
              </p>
              <p>
                <b>E-loading</b>
              </p>
              <p>
                Ang airtime load galing sa listahan ng mga SquidPay Partnered
                Merchants ay maaring bilhin mula sa SquidPay mobile app.
              </p>
              <p>Online and Offline Payment</p>
              <p>
                Ang mga Users ay maaring magbayad gamit ang SquidPay App o ang
                pisikal na SquidPay Card na may sapat na halaga sa mga SquidPay
                Partnered Merchants at mga affiliates.
              </p>
              <p>Prepaid Cards</p>
              <p>
                Sa pamamagitan ng SquidPay App, ang mga User ay maaring bumili
                ng Prepaid Cards mula sa SquidPay Partnered Merchants. Ang mga
                User ay pipili mula sa mga Prepaid Cards na nakalista at
                kailangan nila ilagay ang mga detalye ng tatanggap ng Prepaid
                Card. Ipapakita ang buong transaksyon, at kailangang kumpirmahin
                ng User ang pagbili nito. Sa pagkumpirma ng User, isang mensahe
                na kumikilala sa transaksyon ang matatanggap ng User.
              </p>
              <p>
                <b>IV. Bayad/Fee at iba pang mga Singil</b>
              </p>
              <p>
                Sumasang-ayon ang mga User na magbayad ng fee at iba pang mga
                singil sa paggamit ng Squidpay Account, na itatalaga ng
                SquidPay, kasama rito ngunit hindi limitado sa, Cash-In at
                Cash-Out fees. Ang mga dagdag na bayad o fees ay hindi maaring
                maibalik sa User kapag ito ay binayaran na. Kasama na sa mga
                dagdag na bayad o fees at iba pang mga singil, na maaring angkop
                sa transaksyon, ang mga naangkop na buwis at ibabawas ito sa
                SquidPay Account ng User o sisingilin agad.
              </p>
              <p>
                Ang bayad at iba pang mga singil ay naayon sa Listahan ng mga
                Dagdag na Bayad/Fees at Singil na makikita sa
                http://www.squidpay.ph, at ito ay pwedeng baguhin ng SquidPay
                ayon sa kanyang diskresyon at naayon sa batas, patakaran at
                regulasyon.
              </p>
              <p>
                <b>V. Ang Pagpapadala ng Account/Pahayag sa mga Transaksyon</b>
              </p>
              <p>
                Maaring humingi ang mga User ng kopya ng kanilang
                Account/Kasaysayan ng mga transakyon gamit ang electronic mail.
                Sisingilin ang User ng dagdag na fee para sa paghingi ng
                Account/Pahayag ng mga Transaksyon.
              </p>
              <p>
                <b>VI. Disputes at mga Maling Transaksyon</b>
              </p>
              <p>
                Ang mga User ay mayroong labinlimang (15) araw mula sa petsa ng
                transaksyon na nakalagay sa Account/Pahayag ng mga Transaksyon
                sa SquidPay App upang ipaalam sa SquidPay ang mga dispute. Kung
                walang nai-report sa SquidPay sa panahong ito, lahat ng mga
                transaksyon at tala sa Account/Pahayag ng mga Transaksyon ay
                ituturing na totoo at tama.
              </p>
              <p>
                Ang mga transaksyon na disputed ay maibabalik lamang sa User
                kapag ang claim/dispute ay naproseso nang maayos,
                naimbestigahan, at napatunayan sa pabor ng User. Ang mga maling
                transaksyon na ginawa ng User ay hindi na maaring maibalik sa
                kanya.
              </p>
              <p>
                <b>VII. Seguridad ng Phone/Telepono</b>
              </p>
              <p>
                Ang mga User ang responsable sa seguridad ng kanilang mga
                SquidPay enabled phones. Ang mga transaksyon gamit ang SquidPay
                account ay itinuturing na tiyak na ginawa na User.
              </p>
              <p>
                <b>VIII. Ang Pag-tanggal o Pagkansela ng SquidPay Account</b>
              </p>
              <p>
                Ang hindi pagtupad sa Kasunduang ito ay magiging batayan sa
                pagtanggal ng SquidPay Account ng User.
              </p>
              <p>
                <b>IX. Dormancy</b>
              </p>
              <p>
                Ituturing na hindi ginagamit o inaktibo ang iyong SquidPay
                Account kapag hindi ito ginamit ng User or walang
                client-initiated transactions sa loob ng isang (1) taon mula sa
                huling transaksyon o ang account ay zero. Ang SquidPay Account
                ay awtomatikong isasara.
              </p>
              <p>
                Ituturing ng SquidPay na dormant ang isang account o hindi
                ginagamit kung sa loob ng isang (1) taon mula sa abiso o babala
                ng Squidpay sa isang inaktibong account kapag may nangyari sa
                mga sumusunod:
              </p>
              <p>a. Ang Account ay nanatiling inaktibo;</p>
              <p>b. Ang Account ay hindi na-renew;</p>
              <p>c. Ang Account ay hindi tinanggal o pinasara;</p>
              <p>d. Ang Account holder ay hindi kinuha ang pera sa account.</p>
              <p>
                Maaring magpabayad ang SquidPay ng dormancy fee na hindi hihigit
                sa tatlumpung piso (Php 30.00) limang (5) taon pagkatapos ng
                huling pinansyal na transaksyon ng User. Magbibigay ng abiso ang
                Squidpay sa may hawak ng Account at ang posibleng pagpapabayad
                ng dormancy fee sa animnapung araw (60 days) bago ang:
              </p>
              <p>1. Dormancy ng account; at</p>
              <p>2. Pagpapabayad ng fee</p>
              <p>
                Kung ang account ay madeklarang dormant, ang naayon na
                bayad/fees ay kukunin sa account hanggang ito ay maging zero
                (0).
              </p>
              <p>
                <b>X. Mga Limitasyon sa Liabilidad</b>
              </p>
              <p>
                Hindi gumagawa ng kahit anong warranty, hayag o pagpapahiwatig,
                tungkol sa mga serbisyo ng Squidpay.
              </p>
              <p>
                Inaalok ang mga serbisyo ng Squidpay ng “As Is, “As Available”
                at walang kahit anumang warranty, maliban na lamang sa mga
                warranty na hindi maaring tanggalin, talikdan o limitahan ayon
                sa mga batas na naayon sa Kasunduan. Nang hindi nililimitahan
                ang pangkalahatang nabanggit sa Kasunduan, hindi gumagawa ang
                Squidpay ng warranty sa sumusunod: (1) hingil sa nilalaman,
                kwalidad o kawastuhan ng data o impormasyon na binigay ng
                SquidPay dito o tinanggap o pinadala gamit ang mga serbisyo ng
                Squidpay; (2) hingil sa anumang serbisyo o produkto na kinuha
                gamit ang mga serbisyo ng SquidPay; 3) na ang mga serbisyo ng
                SquidPay ay hindi magagambala o walang pagkakamali; o (4) na ang
                isang partikular na resulta ay makukuha.
              </p>
              <p>
                Walang pananagutan ang SquidPay sa kahit anong pagkawala,
                gastos, bayad, pinsala o liabilidad sa User o ibang tao na
                nagmumula sa, direkta o hindi direkta, o bilang isang resulta ng
                anuman o lahat ng mga sumusunod:
              </p>
              <p>
                a. pagtanggi ng SquidPay, anumang bangko, institusyong
                pampinansyal, ATM o Merchant establishment at mga katulad nito
                na payagan o tanggapin ang SquidPay;
              </p>
              <p>
                b. Ang Squidpay ay tinanggap ng anumang bangko, institusyong
                pampinansyal, ATM o Merchant establishment; subalit ang
                transaksyon ay hindi pinahintulutan, sa kahit anumang rason;
              </p>
              <p>
                c. Hindi maisagawa o makumpleto ng kostumer ng SquidPay ang
                transaksyon gamit ang kanyang mobile phone dahil sa serbisyo/
                sistema o hindi magamit ang linya;
              </p>
              <p>
                d. Anumang pagkaantala, pagkagambala o pagtapos ng transaksyon
                sa SquidPay, kung ito man ay dahil sa pagkakamali sa
                administrasyon, teknikal, mekanikal, elektrikal o elektronikong
                kamalian o kahirapan o anumang iba pang dahilan o pangyayari na
                lampas sa kontrol ng SquidPay (kasama ngunit hindi limitado sa
                mga gawa ng Diyos, welga, labor disputes, sunog , kaguluhan,
                pagkilos ng pamahalaan, kondisyon sa himpapawid, kidlat,
                panghihimasok o pinsala ng mga third party o anumang pagbabago
                sa batas);
              </p>
              <p>
                e. pagnanakaw o hindi pinahintulutang paggamit ng SquidPay
                account o anumang pagkawala, gastos, pinsala na babayaran ng
                User sa third-party
              </p>
              <p>
                f. maling paglalarawan o pandaraya ng o maling pangangasiwa ng
                anumang third party, tulad ng ngunit hindi limitado sa mga
                may-ari, empleyado o ahente ng SquidPay.
              </p>
              <p>
                Kapag ang isang transaksyon ay pinahintulutan at natupad o
                natapos, ang Squidpay ay hindi mananagot kapag hindi hinatid ang
                mga paninda o hindi ginawa ng mga serbisyo o kapag nagkaroon ng
                mga depekto o pinsala.
              </p>
              <p>
                <b>XI. Mga Ipinagbabawal na Kilos/Gawain</b>
              </p>
              <p>
                Bilang isang User, hindi ko gagamitin ang SquidPay App sa
                anumang paraan na maaring maglabag sa batas at/o mga regulasyon,
                kabilang ngunit hindi limitado sa:
              </p>
              <p>1. Pornograpiya o ipinagbabawal na material o aktibidad;</p>
              <p>2. Mga serbisyo ng escort</p>
              <p>
                3. Pagpapatakbo ng pagsusugal, kasama ang mga virtual casinos
              </p>
              <p>4. Mga baril, bala at eksplosibo</p>
              <p>
                5. Pagsali ng User sa mga operasyon na tumatanggap ng bayad nang
                maaga
              </p>
              <p>
                6. Pyramid Selling, Multi-Level Marketing at kumisyon (liban na
                lamang kung ito ay inaprubahan ng bangko o SquidPay Risk Team)
              </p>
              <p>
                <b>XII. Ang Lugar ng Pagdemanda</b>
              </p>
              <p>
                Ang anumang kaso o aksyon na nagmumula sa Kasunduang ito ay
                isasampa lamang ng ekslusibo sa mga korte ng Lungsod ng Pasig at
                hindi sa ibang korte.
              </p>
              <p>
                <b>XIII. Ang hindi pag-waive ng karapatan</b>
              </p>
              <p>
                Ang pagkabigo, pagkukulang, o pagkaantala sa parte ng SquidPay
                na gamitin ang karapatan nito o mga remedyo sa ilalim ng
                Kasunduan ay hindi waiver ng kanyang mga karapatan sa ilalim ng
                Kasunduan.
              </p>
              <p>
                <b>IV. Separability Clause</b>
              </p>
              <p>
                Kung ang anumang tuntunin o kundisyon sa Kasunduang ito ay
                mapawalang bisa, madeklarang iligal o hindi maipatupad sa ilalim
                ng anumang batas, ang bisa, legalidad, at pagpapatupad ng mga
                natitirang tuntunin at kundisyon ay hindi maaapektuhan nito.
              </p>
              <p>
                <b>XV. Mga Pagbabago</b>
              </p>
              <p>
                Maaring baguhin ng Squidpay sa kahit anong oras at sa kahit
                anong kadahilanan ang mga tuntunin at kundisyon sa Kasunduang
                ito at hindi kinakailangan ng karagdagang abiso. Responsibilidad
                ng User na suriin ang mga pagbabago sa Kasunduan. Ang patuloy na
                paggamit ng mga serbisyo ng Squidpay pagkatapos ng mga pagbabago
                ay nangangahulugang tinatanggap ng User ang bagong Kasunduan.
              </p>
              <p>
                <b>XVI. Kasunduan</b>
              </p>
              <p>
                Sumasang-ayon ang User na mabuklod ng mga tuntunin ng serbisyo
                at patakaran sa privacy/Privacy Policy na namamahala sa paggamit
                ng mga serbisyo ng SquidPay. Kapag hindi sumang-ayon ang User sa
                Kasunduan at ang Patakaran sa Privacy/Privacy Policy, dapat
                putulin at itapon ng User ang SquidPay Stored Value Card o
                tanggalin ang SquidPay App mula sa kanyang mobile device at
                tumawag o mabigay ng sulat na inaabisuhan ang Squidpay sa
                pagkansela sa Squidpay service hotline na nakalagay sa ibaba.
                Kung hindi ito gagawin ng User, siya ang magbabayad sa lahat ng
                mga singil na natamo sa paggamit ng mga serbisyo ng SquidPay.
              </p>
              <p>
                <b>XVII. Proseso ng Pag-aasikaso sa mga Reklamo</b>
              </p>
              <p>
                Ang SquidPay ay nakatuon sa pagaasikaso ng mga alalahanin ng mga
                User, katulad ng mga hiling, puna at mga kailangan ng kostumer
                at ito ay nanatiling pangunahing prayoridad ng SquidPay. Para sa
                mga tanong tungkol sa proseso o mga naranasang problema, maaring
                kontakin ang numero ng aming Customer Service: (02) 8521-7035
                local 220.
              </p>
              <p>
                Sinisigurado ng SquidPay na hahawakan namin ang mga reklamo o
                alalahanin ng User na may propesyonalismo at gagawin itong
                kumpidensyal, at sisikapin na solusyunan ito sa pinakamabisang
                paraan.
              </p>
              <p>
                Ang SquidPay ay ganap na makikipagtulungan sa Bangko Sentral ng
                Pilipinas sa pagasikaso ng mga reklamo at financial customer
                protection.
              </p>
              <p>
                Financial Consumer Protection Department of the Bangko Sentral
                ng Pilipinas (BSP): Tel. No.: (632) 8708.7325; Fax No.: (632)
                8708.7345).
              </p>
            </>
          ),
          English: (
            <>
              <p>
                This Terms of Service Agreement (the “Agreement”) describes the
                terms and conditions under which SquidPay (hereinafter
                “SquidPay”, “we” or “our company”) offer Services (as defined
                below) to you (“User” or “You”). By registering for or using
                SquidPay Services, you agree to be bound by the following terms
                and conditions whether or not you are a registered member of
                SquidPay. Your use of the SquidPay Services may also be governed
                by the SquidPay Privacy Policy and other agreements as may be
                applicable to a particular SquidPay Service, which are hereby
                incorporated by reference into this Agreement. We retain the
                right at our sole discretion to deny access to anyone of the
                services we offer, at any time and for any reason, including,
                but not limited to, violations of any terms of this Agreement.
              </p>
              <p>For the purposes of this Agreement:</p>
              <p>
                (a) “User” or “you” means the individual or business entity
                (including its employees and agents) that is using or
                registering to use the services or accessing or browsing the
                mobile application;
              </p>
              <p>
                (b) “SquidPay Services” or “services” means those electronic or
                interactive services offered by SquidPay.
              </p>
              <p>
                <b>
                  PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY AS THE
                  CONTAIN IMPORTATNT INFORMATION REGARDING YOUR LEGAL RIGHTS,
                  REMEDIES AND OBLIGATIONS
                </b>
              </p>
              <p>
                <b>I. Eligibility for SquidPay Services</b>
              </p>
              <p>
                Our services are available to individuals of at least eighteen
                (18) years old and business entities (including but not limited
                to sole proprietorships) in good legal standing that can form
                legally binding contracts and are entitled to subscribe to and
                access our services under applicable law.
              </p>
              <p>
                A User who is an individual hereby represents and warrants that
                he/she is at least eighteen years old. A minor who wishes to use
                Squidpay Services shall provide a consent from duly signed by
                parent/ guardian. A User which is a business entity hereby
                represents and warrants that it is duly licensed to do business
                and is in good legal standing in the jurisdictions in which it
                does business (during the term of this Agreement), that is not a
                competitor of SquidPay, and that the person agreeing to this
                Agreement for such User is at least eighteen years of age and
                otherwise capable of and authorized to enter binding contracts
                and all transactions conducted for such User.
              </p>
              <p>
                Upon registration with the SquidPay App, User will be asked to
                provide the complete name, present and/or permanent address,
                date of birth, nationality, source of funds, photo of yourself
                and signature, this is in compliance with the requirements of
                Know- Your-Customer “KYC” of the Banko Sentral ng Pilipinas.
              </p>
              <p>
                <b>II. Definitions</b>
              </p>
              <p>
                Definitions appearing in the Agreement shall have the meanings
                ascribed to them below.
              </p>
              <p>
                Squidpay shall refer to Squidpay Technology Inc., a non-bank
                financial institution regulated by the Bangko Sentral ng
                Pilipinas “BSP”.
              </p>
              <p>
                “Squid” is a form of e-money instrument which allows authorized
                users to send and receive money, pay bills, reload prepaid
                mobile numbers .
              </p>
              <p>
                “SquidPay App” shall refer to the SquidPay Mobile App that can
                be downloaded and run on mobile devices where users can check
                their load credits, top-up, transfer and receive money, and
                review their transaction history.
              </p>
              <p>
                “Squidpay Account” shall refer to an account that stores
                Philippine Peso value and linked to the Squidpay App.
              </p>
              <p>
                “SquidPay Card” shall refer to the NFC prepaid card issued to
                registered users of SquidPay which can be used for purchases and
                withdrawals from SquidPay partner merchants.
              </p>
              <p>
                “SquidPay Partner Merchants” shall refer to establishments that
                accepts SquidPay as payment for purchase of goods and services.
                The same establishments may or may not accept Cash-in and
                Cash-out SquidPay Transactions.
              </p>
              <p>
                “Airtime” shall refer to the time measured by mobile phone
                operators (or carriers) when they measure usage. It is typically
                measured in minutes for voice calls but can also cover text and
                data usage.
              </p>
              <p>
                “Biller” shall refer to utility company and the like, accredited
                by SquidPay to accept bills payment using SquidPay.
              </p>
              <p>
                “Know Your Customer” or “KYC” shall refer to the process of
                establishing the identity of the SquidPay User as required by
                the BSP, also known as Customer Verification
              </p>
              <p>
                “Two Factor Authentication” shall refer to the four (4)-digit
                security personal identification number (PIN) of, and nominated
                by, the SquidPay User that may be used for authentication
              </p>
              <p>
                <b>III. SquidPay Services</b>
              </p>
              <p>
                SquidPay provides the customer a convenient way of fare payment
                and collection using a stored value card or mobile application
                where its users can load ride credits for fare payments and the
                drivers/operators can collect payments. SquidPay Mobile App
                allows the users to check their load credits, top-up, transfer
                and receive money, and review their transaction history. Users
                may increase their load credits by loading up their accounts
                through different payment schemes available.
              </p>
              <p>
                SquidPay Stored Value Cards can be used by users of traditional
                modes of transportation and partner merchants enumerated in
                http://www.squidpay.ph/. SquidPay Cash In/Out
              </p>
              <p>
                SquidPay Cash-In refers to the process of exchanging physical
                cash to Squid by means of payment instruments we accept. It can
                be done through (a) Mobile Banking Service or “MBS” which means
                that you can transfer Philippines Peso amount from your
                qualified bank account in your SquidPay Account via defined
                functions on the SquidPay Mobile App, or (b) SquidPay Partnered
                Merchants where you may personally hand over Philippine Peso
                cash for the amount to be added to your SquidPay Account, or (c)
                Account-to-Account transfer allowing the user to transfer load
                credits from one SquidPay Account to another SquidPay Account
              </p>
              <p>
                Cash Out refers to the process of withdrawing your Squid to
                physical cash. It can be done through any of the SquidPay
                Partnered Merchants, subject to the minimum and maximum cash-out
                amounts as may be imposed by SquidPay.
              </p>
              <p>
                Squid are not deposits and not covered by Philippine Deposit
                Insurance Corporation (PDIC). It shall not earn any interest nor
                monetary rewards and other incentives convertible to cash nor
                monetary amount be purchased at a discount.
              </p>
              <p>
                SquidPay is subject to rules and regulations of the Bangko
                Sentral ng Pilipinas (BSP), Anti-Money Laundering Act (AMLA),
                the Data Privacy Act, and other applicable laws.
              </p>
              <p>Bills Payment</p>
              <p>
                You may pay your bills due to the Billers affiliated with
                SquidPay via the “Bills Payment” option available on the
                SquidPay App.
              </p>
              <p>Remittance</p>
              <p>
                SquidPay users can receive remittance locally and from abroad
                through the SquidPay App and claim the money through SquidPay
                Partnered Remittance centers or the received amount can be used
                for Squidpay services.
              </p>
              <p>Fund Transfer</p>
              <p>
                Transfer of funds from user to another affiliated bank account
                shall be available to the user.
              </p>
              <p>
                Sending money to a bank account shall be processed upon
                providing SquidPay with user’s personal information and the
                recipient’s personal information, account number, and recipients
                mobile number and purpose of the transaction. The same
                information will be forwarded to the recipient’s bank for the
                requested fund transfer.
              </p>
              <p>E-loading</p>
              <p>
                Airtime load from a list of SquidPay Partnered Merchants may be
                purchased from the SquidPay Mobile app.
              </p>
              <p>Online and Offline Payment</p>
              <p>
                Users can pay using the SquidPay App or the physical SquidPay
                Card with sufficient balance on any of the SquidPay Partnered
                Merchants and affiliates.
              </p>
              <p>Prepaid Cards</p>
              <p>
                Users through the SquidPay App can purchase Prepaid Cards from
                SquidPay Partnered Merchants. Users would choose from the
                available Prepaid cards and will need to provide the details of
                the recipient. A summary of the transaction will be displayed,
                and the user will need to confirm the purchase. Upon
                confirmation, a message acknowledging the transaction will be
                received.
              </p>
              <p>
                <b>IV. Fees, Rates, and Other Charges</b>
              </p>
              <p>
                Users agrees to pay a fee and charges related to the use of
                SquidPay Account, as may be imposed by SquidPay, including but
                not limited to, Cash-In and Cash-Out fees. All fees are
                non-refundable. Fees and other charges, as may be applicable,
                shall be inclusive of all applicable Philippine taxes and shall
                be debited from the user’s SquidPay Account or paid up front.
              </p>
              <p>
                Fees and other charges shall be in accordance with the Table of
                Fees and Charges http://www.squidpay.ph/which may be subject to
                changes upon discretion of Squidpay and with the law, rules and
                regulations.
              </p>
              <p>
                <b>V. Sending of Account / Transaction History Statement</b>
              </p>
              <p>
                Users may request from SquidPay a copy of their
                Account/Transaction History via electronic mail. A fee may be
                charged from the user for the request of the Account/Transaction
                History statement.
              </p>
              <p>
                <b>VI. Disputes and Erroneous Transactions</b>
              </p>
              <p>
                Users shall have fifteen (15) days from date of transaction as
                shown in the entries of Account/Transaction History in the
                SquidPay App to notify SquidPay of any disputes thereon. If no
                dispute is reported within the said period, all transactions and
                entries in the Account/Transaction History statement are
                considered conclusively true and correct.
              </p>
              <p>
                Disputed transactions shall only be credited back to the user
                once the claim/dispute has been properly processed,
                investigated, and proven to be in favor of the user. Erroneous
                transactions made by the user shall not be subject to reversal.
              </p>
              <p>
                <b>VII. Phone security</b>
              </p>
              <p>
                Users shall be responsible for the security of their SquidPay
                enabled phones. Transactions made using the SquidPay Account are
                conclusively presumed made by the user.
              </p>
              <p>
                <b>VIII. Termination / cancellation of SquidPay Account</b>
              </p>
              <p>
                Failure to comply with the foregoing Agreement shall be a basis
                for the termination of the SquidPay Account of the user.
              </p>
              <p>
                <b>IX. Dormancy</b>
              </p>
              <p>
                Your Squidpay Account will be considered inactive if there are
                no client initiated transactions for a period of one (1) year
                from the last transaction or the account remains zero. The
                Squidpay Account shall be closed automatically.
              </p>
              <p>
                SquidPay shall consider the account dormant when one (1) year
                after notification from SquidPay of an inactive account any of
                the below circumstances occur:
              </p>
              <p>a. Account continued to be inactive;</p>
              <p>b. Account is not renewed;</p>
              <p>c. Account is not terminated; or</p>
              <p>d. Account holder does not claim the money in the account</p>
              <p>
                SquidPay may impose a dormancy fee which shall not exceed thirty
                (Php30.00) pesos five (5) years after the last client-initiated
                financial transaction. SquidPay shall notify the Account holder
                and the possible imposition of a dormancy fee at least sixty
                (60) days prior to the:
              </p>
              <p>1. Dormancy of the account; and</p>
              <p>2. Imposition of the fee</p>
              <p>
                Should the account be declared dormant, applicable fees may be
                charged to the account until it becomes zero (0).
              </p>
              <p>
                <b>X. Limits on Liability</b>
              </p>
              <p>
                SquidPay makes no warranty, express or implied, regarding
                SquidPay Service.
              </p>
              <p>
                The SquidPay Service is offered on an “AS IS”, “AS AVAILABLE”
                basis without warranties of any kind, other than warranties that
                are incapable of exclusion, waiver or limitation under the laws
                applicable to this Agreement. Without limiting the generality of
                the foregoing, SquidPay makes no warranty: (1) as to the
                content, quality or accuracy of data or information provided by
                SquidPay hereunder or received or transmitted using the SquidPay
                Services; (2) as to any service or product obtained using the
                SquidPay Services;
              </p>
              <p>
                (3) that the SquidPay Services will be uninterrupted or
                error-free; or (4) that any particular result or information
                will be obtained.
              </p>
              <p>
                SquidPay shall not be liable for any loss, cost, compensation,
                damage or liability to you or third party arising from, directly
                or indirectly, or as a result of any or all of the following:
              </p>
              <p>
                a. refusal of SquidPay, any bank, financial institution, ATM or
                Merchant establishment and the like to allow, accept or honor
                SquidPay;
              </p>
              <p>
                b. SquidPay is honored by any bank, financial institution, ATM
                or Merchant establishment; however, payment transaction is not
                authorized, for any reason whatsoever;
              </p>
              <p>
                c. SquidPay Customer is unable to perform or complete any
                transaction through the use of mobile phone due to service/
                system/ line unavailability;
              </p>
              <p>
                d. any delay, interruption or termination of the SquidPay
                transaction whether caused by administrative error, technical,
                mechanical, electrical or electronic fault or difficulty or any
                other reason or circumstance beyond SquidPay’s control
                (including but not limited to acts of God, strike, labor
                disputes, fire, disturbance, action of government, atmospheric
                conditions, lightning, interference or damage by third parties
                or any change in legislation);
              </p>
              <p>
                e. theft or unauthorized use of SquidPay Account or any loss,
                costs, damages or payable to any third party by the user;
              </p>
              <p>
                f. any misrepresentation or fraud by or misconduct of any third
                party, such as but not limited to owners, employees or SquidPay
                agents.
              </p>
              <p>
                Once a transaction has been authorized and consummated, Squidpay
                shall not be liable for any undelivered goods or non-performance
                of services, defects, and damages.
              </p>
              <p>
                <b>XI. Prohibited acts</b>
              </p>
              <p>
                As a user, I undertake that I shall not use Squidpay App in any
                manner that will violate any existing laws and/or its
                regulations, including but not limited to:
                <p>
                  1. Pornographic or illicit material or activity of any type
                </p>
              </p>
              <p>2. Escort Services</p>
              <p>3. Gambling Operations, including virtual casinos</p>
              <p>4. Firemarms, Ammunitions and explosives</p>
              <p>
                5. User engages in “receipt of payment in advance” operations
              </p>
              <p>
                6. Pyramid Selling, Multi-level Marketing and commission (except
                if approved by Bank or Squidpay Risk Team
              </p>
              <p>
                <b>XII. Data Privacy</b>
              </p>
              <p>Data Collection</p>
              <p>
                A user availing of SquidPay Services is required to provide
                his/her information for such purpose and expressly consenting to
                the processing of his/her supplied customer data, as may be
                applicable.
              </p>
              <p>
                User may be required by SquidPay to update his information from
                time to time. Failure to provide the correct information when
                required may result to SquidPay being unable to provide its
                services. The user is afforded certain rights in relation to
                his/her personal data under the Data Privacy Act, including the
                right to object to processing, the right to access his/her data,
                the right to rectification of inaccurate data, and the right to
                erasure or blocking of data.
              </p>
              <p>Use of Customer Data</p>
              <p>
                User consents and authorizes SquidPay to store, process,
                disclose, exchange, and release his/her information to
                SquidPay’s associates, affiliates, subsidiaries, officers,
                employees, agents, lawyers, and other consultants,
                pre-paid/debit/credit bureaus or any such persons as required by
                law, rules or regulations or who SquidPay deems necessary. The
                disclosure to the enumerated persons is to facilitate SquidPay
                activities which includes the following, among others:
              </p>
              <p>
                a. For purposes of research and marketing initiatives, to create
                an account of the user that caters to his/her personal interest,
                preferences, travel patterns;
              </p>
              <p>
                b. For management of user’s account to assure the fair and
                lawful use of the products and services provided by SquidPay;
              </p>
              <p>
                c. For personalized and targeted commercial and promotional
                advertisements, rewards, offers, and surveys; and
              </p>
              <p>
                d. Disclosures that may be required by law, rules or
                regulations.
              </p>
              <p>
                The above enumerated consents and authorizations and User’s
                information shall be kept in the records of SquidPay for the
                duration of his/her availment of SquidPay Services, and when
                necessary for the purpose for which the information was
                obtained, including in the exercise of a legal right, legitimate
                business purposes, or as provided by law, rules, or regulations.
              </p>
              <p>
                <b>XIII. Venue of Litigation</b>
              </p>
              <p>
                Any action arising out of the Agreement shall be exclusively
                filed at Pasig Courts only to the exclusion of all other courts.
              </p>
              <p>
                <b>XIV. Non-waiver of rights</b>
              </p>
              <p>
                Failure, omission, or delay on the part of SquidPay to exercise
                its right or remedies under the Agreement shall not operate as a
                waiver.
              </p>
              <p>
                <b>XV. Separability Clause</b>
              </p>
              <p>
                Should any term or condition in this Agreement be rendered void,
                illegal or unenforceable in any respect under any law, the
                validity, legality, and enforceability of the remaining terms
                and conditions shall not be affected or impaired thereby.
              </p>
              <p>
                <b>XVI. Amendments</b>
              </p>
              <p>
                SquidPay may at any time and for whatever reason it may deem
                proper, amend, revise or modify these Terms and Conditions
                without further notice. It is the user’s responsibility to check
                any changes to the Agreement. Continued use of the SquidPay
                Services after such changes constitutes acceptance of the new
                Agreement.
              </p>
              <p>
                <b>XVII. Agreement</b>
              </p>
              <p>
                The user agrees to be bound by the Terms of Service and Privacy
                Policy governing the issuance and use of the SquidPay Services.
                Should the user disagree with the Agreement and the Privacy
                Policy, the user shall cut and dispose of the SquidPay Stored
                Value Card or delete the SquidPay App from his/her mobile
                device, and call or provide a written notice of cancellation to
                SquidPay service hotline indicated below, otherwise, the user
                shall continue to be liable for all charges incurred through the
                use of the SquidPay services.
              </p>
              <p>
                <b>XVIII. Complaints Handling Procedure</b>
              </p>
              <p>
                SquidPay is committed in handling the concerns of its users, as
                such, requests, feedbacks, and customer needs are top priority.
                For concerns about procedures or problems encountered, users may
                contact our Customer Service Number:
              </p>
              <p>(02)8521-7035 local 220.</p>
              <p>
                Rest assured we will handle concerns with utmost confidentiality
                and professionalism, striving to resolve them in the most
                efficient manner.
              </p>
              <p>
                SquidPay fully cooperates with the Banko Sentral ng Pilipinas in
                handling of complaints and financial consumer protection.
              </p>
              <p>
                <b>
                  Financial Consumer Protection Department of the Bangko Sentral
                  ng Pilipinas (BSP): Tel. No.: (632) 8708.7325; Fax No.: (632)
                  8708.7345).
                </b>
              </p>
            </>
          ),
        }[language] || (
          <>
            <p>
              This Terms of Service Agreement (the “Agreement”) describes the
              terms and conditions under which SquidPay (hereinafter “SquidPay”,
              “we” or “our company”) offer Services (as defined below) to you
              (“User” or “You”). By registering for or using SquidPay Services,
              you agree to be bound by the following terms and conditions
              whether or not you are a registered member of SquidPay. Your use
              of the SquidPay Services may also be governed by the SquidPay
              Privacy Policy and other agreements as may be applicable to a
              particular SquidPay Service, which are hereby incorporated by
              reference into this Agreement. We retain the right at our sole
              discretion to deny access to anyone of the services we offer, at
              any time and for any reason, including, but not limited to,
              violations of any terms of this Agreement.
            </p>
            <p>For the purposes of this Agreement:</p>
            <p>
              (a) “User” or “you” means the individual or business entity
              (including its employees and agents) that is using or registering
              to use the services or accessing or browsing the mobile
              application;
            </p>
            <p>
              (b) “SquidPay Services” or “services” means those electronic or
              interactive services offered by SquidPay.
            </p>
            <p>
              <b>
                PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY AS THE CONTAIN
                IMPORTATNT INFORMATION REGARDING YOUR LEGAL RIGHTS, REMEDIES AND
                OBLIGATIONS
              </b>
            </p>
            <p>
              <b>I. Eligibility for SquidPay Services</b>
            </p>
            <p>
              Our services are available to individuals of at least eighteen
              (18) years old and business entities (including but not limited to
              sole proprietorships) in good legal standing that can form legally
              binding contracts and are entitled to subscribe to and access our
              services under applicable law.
            </p>
            <p>
              A User who is an individual hereby represents and warrants that
              he/she is at least eighteen years old. A minor who wishes to use
              Squidpay Services shall provide a consent from duly signed by
              parent/ guardian. A User which is a business entity hereby
              represents and warrants that it is duly licensed to do business
              and is in good legal standing in the jurisdictions in which it
              does business (during the term of this Agreement), that is not a
              competitor of SquidPay, and that the person agreeing to this
              Agreement for such User is at least eighteen years of age and
              otherwise capable of and authorized to enter binding contracts and
              all transactions conducted for such User.
            </p>
            <p>
              Upon registration with the SquidPay App, User will be asked to
              provide the complete name, present and/or permanent address, date
              of birth, nationality, source of funds, photo of yourself and
              signature, this is in compliance with the requirements of Know-
              Your-Customer “KYC” of the Banko Sentral ng Pilipinas.
            </p>
            <p>
              <b>II. Definitions</b>
            </p>
            <p>
              Definitions appearing in the Agreement shall have the meanings
              ascribed to them below.
            </p>
            <p>
              Squidpay shall refer to Squidpay Technology Inc., a non-bank
              financial institution regulated by the Bangko Sentral ng Pilipinas
              “BSP”.
            </p>
            <p>
              “Squid” is a form of e-money instrument which allows authorized
              users to send and receive money, pay bills, reload prepaid mobile
              numbers .
            </p>
            <p>
              “SquidPay App” shall refer to the SquidPay Mobile App that can be
              downloaded and run on mobile devices where users can check their
              load credits, top-up, transfer and receive money, and review their
              transaction history.
            </p>
            <p>
              “Squidpay Account” shall refer to an account that stores
              Philippine Peso value and linked to the Squidpay App.
            </p>
            <p>
              “SquidPay Card” shall refer to the NFC prepaid card issued to
              registered users of SquidPay which can be used for purchases and
              withdrawals from SquidPay partner merchants.
            </p>
            <p>
              “SquidPay Partner Merchants” shall refer to establishments that
              accepts SquidPay as payment for purchase of goods and services.
              The same establishments may or may not accept Cash-in and Cash-out
              SquidPay Transactions.
            </p>
            <p>
              “Airtime” shall refer to the time measured by mobile phone
              operators (or carriers) when they measure usage. It is typically
              measured in minutes for voice calls but can also cover text and
              data usage.
            </p>
            <p>
              “Biller” shall refer to utility company and the like, accredited
              by SquidPay to accept bills payment using SquidPay.
            </p>
            <p>
              “Know Your Customer” or “KYC” shall refer to the process of
              establishing the identity of the SquidPay User as required by the
              BSP, also known as Customer Verification
            </p>
            <p>
              “Two Factor Authentication” shall refer to the four (4)-digit
              security personal identification number (PIN) of, and nominated
              by, the SquidPay User that may be used for authentication
            </p>
            <p>
              <b>III. SquidPay Services</b>
            </p>
            <p>
              SquidPay provides the customer a convenient way of fare payment
              and collection using a stored value card or mobile application
              where its users can load ride credits for fare payments and the
              drivers/operators can collect payments. SquidPay Mobile App allows
              the users to check their load credits, top-up, transfer and
              receive money, and review their transaction history. Users may
              increase their load credits by loading up their accounts through
              different payment schemes available.
            </p>
            <p>
              SquidPay Stored Value Cards can be used by users of traditional
              modes of transportation and partner merchants enumerated in
              http://www.squidpay.ph/. SquidPay Cash In/Out
            </p>
            <p>
              SquidPay Cash-In refers to the process of exchanging physical cash
              to Squid by means of payment instruments we accept. It can be done
              through (a) Mobile Banking Service or “MBS” which means that you
              can transfer Philippines Peso amount from your qualified bank
              account in your SquidPay Account via defined functions on the
              SquidPay Mobile App, or (b) SquidPay Partnered Merchants where you
              may personally hand over Philippine Peso cash for the amount to be
              added to your SquidPay Account, or (c) Account-to-Account transfer
              allowing the user to transfer load credits from one SquidPay
              Account to another SquidPay Account
            </p>
            <p>
              Cash Out refers to the process of withdrawing your Squid to
              physical cash. It can be done through any of the SquidPay
              Partnered Merchants, subject to the minimum and maximum cash-out
              amounts as may be imposed by SquidPay.
            </p>
            <p>
              Squid are not deposits and not covered by Philippine Deposit
              Insurance Corporation (PDIC). It shall not earn any interest nor
              monetary rewards and other incentives convertible to cash nor
              monetary amount be purchased at a discount.
            </p>
            <p>
              SquidPay is subject to rules and regulations of the Bangko Sentral
              ng Pilipinas (BSP), Anti-Money Laundering Act (AMLA), the Data
              Privacy Act, and other applicable laws.
            </p>
            <p>Bills Payment</p>
            <p>
              You may pay your bills due to the Billers affiliated with SquidPay
              via the “Bills Payment” option available on the SquidPay App.
            </p>
            <p>Remittance</p>
            <p>
              SquidPay users can receive remittance locally and from abroad
              through the SquidPay App and claim the money through SquidPay
              Partnered Remittance centers or the received amount can be used
              for Squidpay services.
            </p>
            <p>Fund Transfer</p>
            <p>
              Transfer of funds from user to another affiliated bank account
              shall be available to the user.
            </p>
            <p>
              Sending money to a bank account shall be processed upon providing
              SquidPay with user’s personal information and the recipient’s
              personal information, account number, and recipients mobile number
              and purpose of the transaction. The same information will be
              forwarded to the recipient’s bank for the requested fund transfer.
            </p>
            <p>E-loading</p>
            <p>
              Airtime load from a list of SquidPay Partnered Merchants may be
              purchased from the SquidPay Mobile app.
            </p>
            <p>Online and Offline Payment</p>
            <p>
              Users can pay using the SquidPay App or the physical SquidPay Card
              with sufficient balance on any of the SquidPay Partnered Merchants
              and affiliates.
            </p>
            <p>Prepaid Cards</p>
            <p>
              Users through the SquidPay App can purchase Prepaid Cards from
              SquidPay Partnered Merchants. Users would choose from the
              available Prepaid cards and will need to provide the details of
              the recipient. A summary of the transaction will be displayed, and
              the user will need to confirm the purchase. Upon confirmation, a
              message acknowledging the transaction will be received.
            </p>
            <p>
              <b>IV. Fees, Rates, and Other Charges</b>
            </p>
            <p>
              Users agrees to pay a fee and charges related to the use of
              SquidPay Account, as may be imposed by SquidPay, including but not
              limited to, Cash-In and Cash-Out fees. All fees are
              non-refundable. Fees and other charges, as may be applicable,
              shall be inclusive of all applicable Philippine taxes and shall be
              debited from the user’s SquidPay Account or paid up front.
            </p>
            <p>
              Fees and other charges shall be in accordance with the Table of
              Fees and Charges http://www.squidpay.ph/which may be subject to
              changes upon discretion of Squidpay and with the law, rules and
              regulations.
            </p>
            <p>
              <b>V. Sending of Account / Transaction History Statement</b>
            </p>
            <p>
              Users may request from SquidPay a copy of their
              Account/Transaction History via electronic mail. A fee may be
              charged from the user for the request of the Account/Transaction
              History statement.
            </p>
            <p>
              <b>VI. Disputes and Erroneous Transactions</b>
            </p>
            <p>
              Users shall have fifteen (15) days from date of transaction as
              shown in the entries of Account/Transaction History in the
              SquidPay App to notify SquidPay of any disputes thereon. If no
              dispute is reported within the said period, all transactions and
              entries in the Account/Transaction History statement are
              considered conclusively true and correct.
            </p>
            <p>
              Disputed transactions shall only be credited back to the user once
              the claim/dispute has been properly processed, investigated, and
              proven to be in favor of the user. Erroneous transactions made by
              the user shall not be subject to reversal.
            </p>
            <p>
              <b>VII. Phone security</b>
            </p>
            <p>
              Users shall be responsible for the security of their SquidPay
              enabled phones. Transactions made using the SquidPay Account are
              conclusively presumed made by the user.
            </p>
            <p>
              <b>VIII. Termination / cancellation of SquidPay Account</b>
            </p>
            <p>
              Failure to comply with the foregoing Agreement shall be a basis
              for the termination of the SquidPay Account of the user.
            </p>
            <p>
              <b>IX. Dormancy</b>
            </p>
            <p>
              Your Squidpay Account will be considered inactive if there are no
              client initiated transactions for a period of one (1) year from
              the last transaction or the account remains zero. The Squidpay
              Account shall be closed automatically.
            </p>
            <p>
              SquidPay shall consider the account dormant when one (1) year
              after notification from SquidPay of an inactive account any of the
              below circumstances occur:
            </p>
            <p>a. Account continued to be inactive;</p>
            <p>b. Account is not renewed;</p>
            <p>c. Account is not terminated; or</p>
            <p>d. Account holder does not claim the money in the account</p>
            <p>
              SquidPay may impose a dormancy fee which shall not exceed thirty
              (Php30.00) pesos five (5) years after the last client-initiated
              financial transaction. SquidPay shall notify the Account holder
              and the possible imposition of a dormancy fee at least sixty (60)
              days prior to the:
            </p>
            <p>1. Dormancy of the account; and</p>
            <p>2. Imposition of the fee</p>
            <p>
              Should the account be declared dormant, applicable fees may be
              charged to the account until it becomes zero (0).
            </p>
            <p>
              <b>X. Limits on Liability</b>
            </p>
            <p>
              SquidPay makes no warranty, express or implied, regarding SquidPay
              Service.
            </p>
            <p>
              The SquidPay Service is offered on an “AS IS”, “AS AVAILABLE”
              basis without warranties of any kind, other than warranties that
              are incapable of exclusion, waiver or limitation under the laws
              applicable to this Agreement. Without limiting the generality of
              the foregoing, SquidPay makes no warranty: (1) as to the content,
              quality or accuracy of data or information provided by SquidPay
              hereunder or received or transmitted using the SquidPay Services;
              (2) as to any service or product obtained using the SquidPay
              Services;
            </p>
            <p>
              (3) that the SquidPay Services will be uninterrupted or
              error-free; or (4) that any particular result or information will
              be obtained.
            </p>
            <p>
              SquidPay shall not be liable for any loss, cost, compensation,
              damage or liability to you or third party arising from, directly
              or indirectly, or as a result of any or all of the following:
            </p>
            <p>
              a. refusal of SquidPay, any bank, financial institution, ATM or
              Merchant establishment and the like to allow, accept or honor
              SquidPay;
            </p>
            <p>
              b. SquidPay is honored by any bank, financial institution, ATM or
              Merchant establishment; however, payment transaction is not
              authorized, for any reason whatsoever;
            </p>
            <p>
              c. SquidPay Customer is unable to perform or complete any
              transaction through the use of mobile phone due to service/
              system/ line unavailability;
            </p>
            <p>
              d. any delay, interruption or termination of the SquidPay
              transaction whether caused by administrative error, technical,
              mechanical, electrical or electronic fault or difficulty or any
              other reason or circumstance beyond SquidPay’s control (including
              but not limited to acts of God, strike, labor disputes, fire,
              disturbance, action of government, atmospheric conditions,
              lightning, interference or damage by third parties or any change
              in legislation);
            </p>
            <p>
              e. theft or unauthorized use of SquidPay Account or any loss,
              costs, damages or payable to any third party by the user;
            </p>
            <p>
              f. any misrepresentation or fraud by or misconduct of any third
              party, such as but not limited to owners, employees or SquidPay
              agents.
            </p>
            <p>
              Once a transaction has been authorized and consummated, Squidpay
              shall not be liable for any undelivered goods or non-performance
              of services, defects, and damages.
            </p>
            <p>
              <b>XI. Prohibited acts</b>
            </p>
            <p>
              As a user, I undertake that I shall not use Squidpay App in any
              manner that will violate any existing laws and/or its regulations,
              including but not limited to:
              <p>1. Pornographic or illicit material or activity of any type</p>
            </p>
            <p>2. Escort Services</p>
            <p>3. Gambling Operations, including virtual casinos</p>
            <p>4. Firemarms, Ammunitions and explosives</p>
            <p>5. User engages in “receipt of payment in advance” operations</p>
            <p>
              6. Pyramid Selling, Multi-level Marketing and commission (except
              if approved by Bank or Squidpay Risk Team
            </p>
            <p>
              <b>XII. Data Privacy</b>
            </p>
            <p>Data Collection</p>
            <p>
              A user availing of SquidPay Services is required to provide
              his/her information for such purpose and expressly consenting to
              the processing of his/her supplied customer data, as may be
              applicable.
            </p>
            <p>
              User may be required by SquidPay to update his information from
              time to time. Failure to provide the correct information when
              required may result to SquidPay being unable to provide its
              services. The user is afforded certain rights in relation to
              his/her personal data under the Data Privacy Act, including the
              right to object to processing, the right to access his/her data,
              the right to rectification of inaccurate data, and the right to
              erasure or blocking of data.
            </p>
            <p>Use of Customer Data</p>
            <p>
              User consents and authorizes SquidPay to store, process, disclose,
              exchange, and release his/her information to SquidPay’s
              associates, affiliates, subsidiaries, officers, employees, agents,
              lawyers, and other consultants, pre-paid/debit/credit bureaus or
              any such persons as required by law, rules or regulations or who
              SquidPay deems necessary. The disclosure to the enumerated persons
              is to facilitate SquidPay activities which includes the following,
              among others:
            </p>
            <p>
              a. For purposes of research and marketing initiatives, to create
              an account of the user that caters to his/her personal interest,
              preferences, travel patterns;
            </p>
            <p>
              b. For management of user’s account to assure the fair and lawful
              use of the products and services provided by SquidPay;
            </p>
            <p>
              c. For personalized and targeted commercial and promotional
              advertisements, rewards, offers, and surveys; and
            </p>
            <p>
              d. Disclosures that may be required by law, rules or regulations.
            </p>
            <p>
              The above enumerated consents and authorizations and User’s
              information shall be kept in the records of SquidPay for the
              duration of his/her availment of SquidPay Services, and when
              necessary for the purpose for which the information was obtained,
              including in the exercise of a legal right, legitimate business
              purposes, or as provided by law, rules, or regulations.
            </p>
            <p>
              <b>XIII. Venue of Litigation</b>
            </p>
            <p>
              Any action arising out of the Agreement shall be exclusively filed
              at Pasig Courts only to the exclusion of all other courts.
            </p>
            <p>
              <b>XIV. Non-waiver of rights</b>
            </p>
            <p>
              Failure, omission, or delay on the part of SquidPay to exercise
              its right or remedies under the Agreement shall not operate as a
              waiver.
            </p>
            <p>
              <b>XV. Separability Clause</b>
            </p>
            <p>
              Should any term or condition in this Agreement be rendered void,
              illegal or unenforceable in any respect under any law, the
              validity, legality, and enforceability of the remaining terms and
              conditions shall not be affected or impaired thereby.
            </p>
            <p>
              <b>XVI. Amendments</b>
            </p>
            <p>
              SquidPay may at any time and for whatever reason it may deem
              proper, amend, revise or modify these Terms and Conditions without
              further notice. It is the user’s responsibility to check any
              changes to the Agreement. Continued use of the SquidPay Services
              after such changes constitutes acceptance of the new Agreement.
            </p>
            <p>
              <b>XVII. Agreement</b>
            </p>
            <p>
              The user agrees to be bound by the Terms of Service and Privacy
              Policy governing the issuance and use of the SquidPay Services.
              Should the user disagree with the Agreement and the Privacy
              Policy, the user shall cut and dispose of the SquidPay Stored
              Value Card or delete the SquidPay App from his/her mobile device,
              and call or provide a written notice of cancellation to SquidPay
              service hotline indicated below, otherwise, the user shall
              continue to be liable for all charges incurred through the use of
              the SquidPay services.
            </p>
            <p>
              <b>XVIII. Complaints Handling Procedure</b>
            </p>
            <p>
              SquidPay is committed in handling the concerns of its users, as
              such, requests, feedbacks, and customer needs are top priority.
              For concerns about procedures or problems encountered, users may
              contact our Customer Service Number:
            </p>
            <p>(02)8521-7035 local 220.</p>
            <p>
              Rest assured we will handle concerns with utmost confidentiality
              and professionalism, striving to resolve them in the most
              efficient manner.
            </p>
            <p>
              SquidPay fully cooperates with the Banko Sentral ng Pilipinas in
              handling of complaints and financial consumer protection.
            </p>
            <p>
              <b>
                Financial Consumer Protection Department of the Bangko Sentral
                ng Pilipinas (BSP): Tel. No.: (632) 8708.7325; Fax No.: (632)
                8708.7345).
              </b>
            </p>
          </>
        )}
      </Box>
    </ProtectedContent>
  );
}
