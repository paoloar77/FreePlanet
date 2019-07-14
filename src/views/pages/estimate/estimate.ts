import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { IEstimate } from '@src/model'
import { tools } from '@src/store/Modules/tools'

@Component({})
export default class Estimate extends Vue {
  public arrEstimate: IEstimate[] = []

  public features: IEstimate[] = [
    {
      title: '5 pagine principali: 1) Home principale con testo + slideshow di immagini, 2) Chi siamo, 3) Dove Siamo, 4) Contatti, 5) Servizi',
      icon: 'looks_5'
    },
    {
      title: 'Ottimizzato con tecnologia Responsive, visualizzabile su cellulare',
      icon: 'devices_other'
    },
    {
      title: 'Possibilità di modificare, in maniera autonoma, i testi delle pagine esistenti (Sito Dinamico)',
      icon: 'edit'
    },
    {
      title: 'Galleria d\'immagini Slideshow',
      icon: 'photo_album'
    },
    {
      title: 'Certificato SSL / HTTPS di sicurezza incluso',
      icon: 'https'
    },
    {
      title: 'GDPR privacy e cookie',
      icon: 'verified_user'
    },
    {
      title: 'Posizionamento motori di ricerca (Google)',
      icon: 'search'
    },
    {
      title: 'Statistica Visualizzazioni sito web (Google Analytics)',
      icon: 'search'
    }

    ]

  public arrEstimateit: IEstimate[] = [
    {
      id: 1,
      title: 'Pagina Web Base', description: '',
      price: 250,
      advanced: false,
      qta: 1,
      icon: 'web',
      numpag: 5,
      viewlist: null,
      checksel: true
    },
    {
      id: 9,
      title: 'Hosting Base Dominio WWW (Servizio Esterno)',
      description: 'Servizio di Hosting linux base + Database Mysql + Servizio Mail + Dominio',
      advanced: false,
      icon: 'home',
      price: 80,
      qta: 1,
      numpag: 0,
      viewlist: null,
      checksel: false
    },
    {
      id: 2,
      title: '+ 5 Pagine Aggiuntive',
      description: 'Inserisci il numero di pagine che si vuole creare',
      advanced: false,
      price: 50,
      qta: 1,
      numpag: 5,
      icon: 'description',
      viewlist: null,
      checksel: false
    },
    {
      id: 3,
      title: '+ 10 Pagine Aggiuntive',
      description: 'pagine aggiuntive da creare',
      price: 85,
      qta: 1,
      numpag: 10,
      icon: 'description',
      viewlist: null,
      checksel: false
    },
    {
      id: 4,
      title: '+ 20 Pagine Aggiuntive',
      description: 'pagine aggiuntive da creare',
      advanced: false,
      price: 140,
      qta: 1,
      numpag: 20,
      icon: 'description',
      viewlist: null,
      checksel: false
    },
    {
      id: tools.languageid,
      title: '+ 1 Lingua Aggiuntiva (con testi già tradotti)',
      description: 'Inserimento di 1 lingua straniera nel sito. Comprende le pagine selezionate',
      advanced: false,
      icon: 'language',
      price: 10,
      pricebase: 50,
      qta: 1,
      numpag: 0,
      viewlist: null,
      checksel: false
    },
    {
      id: 8,
      title: 'Gestione Newsletter integrata con MailChimp',
      advanced: true,
      description: 'All\'interno del sito l\'utente potrà lasciare la propria email e nome, e verrà inviata a MailChimp (Account Gratuito)',
      icon: 'contact_mail',
      price: 50,
      qta: 1,
      numpag: 0,
      viewlist: null,
      checksel: false
    },
    {
      id: 6,
      title: 'Calendario Eventi',
      advanced: true,
      description: 'Visualizzazione Mensile e Settimanale di un calendario Eventi Personalizzato',
      icon: 'event',
      price: 100,
      qta: 1,
      numpag: 0,
      viewlist: null,
      checksel: false
    },
    {
      id: 7,
      title: 'Galleria Immagini Personalizzata',
      advanced: true,
      description: 'Possibilità di aggiungere/eliminare foto autonomamente dalla galleria Immagini (Richiede Hosting Base)',
      icon: 'perm_media',
      price: 100,
      qta: 1,
      numpag: 0,
      viewlist: null,
      checksel: false
    }
    // {
    //   id: 7,
    //   title: 'Servizio di Assistenza e modifica pagine (dal 2° anno)',
    //   description: '',
    //   icon: 'perm_media',
    //   price: 100,
    //   qta: 1,
    //   numpag: 0,
    //   viewlist: null,
    //   checksel: false
    // },
  ]

  public mounted() {
    this.arrEstimate = this.arrEstimateit
  }

  public getPrice(rec: IEstimate) {
    let myprice = 0
    if (rec.id === tools.languageid) {
      myprice = (rec.price * this.getNumpagTotal()) + rec.pricebase
    } else {
      myprice = rec.price
    }

    return myprice
  }

  public getNumpagTotal() {
    let numpag = 0
    let rec: IEstimate = null

    for (rec of this.arrEstimateit) {
      if (rec.checksel) {
        numpag += rec.numpag
      }
    }

    return numpag
  }

  public getTotal() {
    let tot = 0
    let rec: IEstimate = null

    const numpagtot = this.getNumpagTotal()

    for (rec of this.arrEstimateit) {
      if (rec.checksel)
          tot += this.getPrice(rec) * rec.qta
    }

    return tot
  }

  public getColor(rec) {
    if (rec.advanced) {
      return 'red'
    } else {
      return 'blue'
    }
  }

}
