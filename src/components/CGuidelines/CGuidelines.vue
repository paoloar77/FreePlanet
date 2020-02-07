<template>
  <div>

    <CTitleBanner title="AYNI GIFT*ECOnomy"></CTitleBanner>
    <CImgText src="">
      <p class="cltexth3 text-green-8 q-ma-sm"><span class="boldhigh">Movimento di ECOnomia Solidale</span></p>
      <p>
        Ayni è un movimento di economia solidale. Si basa sul concetto del <strong>regalo</strong>: <strong>io
        regalo</strong> e ricevo in modo libero
        ed abbondante. È una struttura pensata e creata per permettere alle persone di aiutarsi e sostenersi fra di
        loro, in modo da realizzare i propri sogni. È un progetto serio che richiede, a chi ne fa parte, di
        comprendere che questo non è un sistema per guadagnare o un classico fondo di investimento, ma un modo per
        recuperare quel fattore umano di aiuto reciproco attraverso il continuo sostegno dei nuovi membri supportati
        da chi ha già fatto esperienza in movimenti di Economia Solidale, che la civiltà moderna capitalista
        (occidentale) ci sta facendo perdere.</p>

      <p class="text-center"><strong>Strumenti necessari per far parte di AYNI</strong></p>
      <ul class="lista">
        <li>Cellulare e/o computer</li>
        <li>App Telegram</li>
        <li>App Zoom (per Video Conferenze)</li>
      </ul>
      <p class="cltexth3 text-red q-ma-lg">Cosa devi fare per poter entrare in Ayni?</p>
      <p class="cltexth3 text-blue q-ma-lg">Fase 1: Accoglienza</p>
      <ul class="lista">
        <li>Qualcuno ti ha invitato e ti ha dato il link di accesso al sito <strong>AYNI GIFT*ECOnomy.</strong></li>
        <li>Entri nella chat Telegram <strong>PowerList</strong>, che ti supporterà nella ricerca degli invitati,
          attraverso
          l’esperienza e l’aiuto di chi ha già fatto il cammino.
        </li>
        <li>Quando avrai trovato i tuoi invitati, potrai a tua volta sostenere i nuovi arrivati in chat.</li>
        <li>Entri nella chat Telegram <strong>Ayni-BiblioBacheca</strong> che è una chat di informazioni in cui verranno
          postate
          giornalmente notizie e novità sul movimento.
        </li>
        <li>Nella chat Telegram <strong>Ayni Help & Support</strong> potrai entrare ogni volta che avrai domande o
          dubbi, troverai lo
          Staff di Ayni ad aiutarti.
        </li>
      </ul>

      <p class="cltexth3 text-blue q-ma-lg">Fase 2: Completamento dei requisiti richiesti</p>
      <ol class="lista">
        <li>Leggere le Linee Guida ed accettare tutte le condizioni richieste.</li>
        <li>Vedere i Video Introduttivi al Movimento.</li>
        <li>Assistere ad uno <strong>Zoom di Benvenuto</strong> in cui potrai parlare direttamente con gli
          Amministratori e porre
          tutte le tue domande.
        </li>
        <li>Scrivere <strong>il tuo Sogno</strong> per il quale sei entrato in Ayni e che desideri realizzare.</li>
        <li>Attivare almeno <strong>2 metodi di pagamento</strong>, uno per il tuo paese di residenza ed uno per
          transazioni
          all’estero.<br>
          PayPal è obbiligatorio, il trasferimento e gratuito e si possono collegare carte e conti correnti.<br>
          Sono consigliati il Conto Revolut o N26 per le transazioni estere.
        </li>
        <li>Trovare a tua volta <strong>almeno 2 invitati</strong> (<strong>consigliati 3</strong>) invitando più
          persone ad assistere agli Zoom di
          Benvenuto ed assisterli nella registrazione sul sito <strong>AYNI GIFT*ECOnomy</strong>.
        </li>
      </ol>

      <p class="cltexth3 text-blue q-ma-lg">Fase 3: Programmazione della Billettera</p>

      <p>Ti verrà comunicato con anticipo la data in cui entrerai nella tua Billettera, il nominativo del Sognatore
        a cui dovrai versare il tuo dono di 33€ ed i suoi estremi di pagamento.</p>
      <br>
      <p class="cltexth3 text-green-8 q-ma-lg"><span class="boldhigh">Ora il tuo viaggio comincia !!!</span></p>

      <p class="text-center"><strong>Com’è composta strutturalmente una Billettera AYNI?</strong></p>
      <p>La sequenza dei passaggi in AYNI è programmata in anticipo, così da</p>
      <ul class="lista">
        <li>garantire che tutto il processo si svolga nei 3 passi previsti</li>
        <li>fare in modo di realizzare il processo in maniera semplice e automatizzata.</li>
      </ul>


      <p class="cltexth4 text-blue q-ma-lg">I 3 passi</p>

      <p>Dal momento in cui conosco il giorno della partenza della mia bigliettera, i seguenti passi da compiere
        saranno questi:</p>

      <p class="step">Passo 1:</p>
      <p class="grass">Entro nella chat Telegram come Donatore:</p>
      <p>Il mio compito è fare il dono di 33€ al Sognatore.</p>
      <p class="step">Passo 2:</p>
      <p class="grass">Apro una chat Telegram e divento Mediatore:</p>
      <p>il mio compito è quello di assicurarmi che tutti i Donatori facciano il Dono al Sognatore.
        Il sistema invierà in automatico le istruzioni per fare il Dono, il Mediatore interverrà se ci saranno
        eventuali problematiche con i metodi di pagamento scelti.</p>
      <p class="step">Passo 3:</p>
      <p class="grass">Apro una chat Telegram e divento Sognatore:</p>
      <p>Il mio compito è quello di ricevere i Doni da tutti i Donatori, aprirmi all’abbondanza e celebrare.
      </p>
      <br>

      <p style="font-size: 1rem;"><strong>Donatore</strong>: Colui che effettua il Dono di 33€.<br>
        <strong>Mediatore</strong>: E’ l’intermediario tra i Donatori e il Sognatore.<br>
        <strong>Sognatore</strong>: Colui che riceve i Doni.<br>
      </p>

      <div v-if="showconditions">
        <p>&nbsp;</p>
        <CTitleBanner title="Condizioni da Accettare:"></CTitleBanner>
        <ul class="lista">
          <li>dichiaro di aver letto e ben compreso le linee guida del movimento AYNI</li>

          <li>dichiaro di aver ben compreso gli impegni che prendo iscrivendomi a AYNI (portare 2 persone, ragalo 33 €) e di
            aver compreso che senza non verrò inserito in programmazione.
          </li>

          <li>dichiaro di aver ben compreso che <strong>non è un fondo di investimento e che il mio regalo è a fondo perduto</strong>
          </li>

          <li>dichiaro di aver ben compreso che devo <strong>partecipare almeno ad uno ZOOM</strong> (Video-Conferenza On Line)</li>

          <li>dichiaro di aver ben compreso che per la mia sicurezza devo aprire un <strong>conto Paypal</strong> per consegnare il regalo.
          </li>
        </ul>

        <q-checkbox
          class="bg-grey-4"
          v-model="accetta_guideline"
          color="primary"
          :label="$t('steps.read_guidelines')">

        </q-checkbox>

      </div>


    </CImgText>
  </div>
</template>

<script lang="ts" src="./CGuidelines.ts">
</script>

<style lang="scss" scoped>
  @import './CGuidelines';
</style>
