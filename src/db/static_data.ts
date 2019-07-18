import { Todos, Projects, UserStore } from '@store'
import globalroutines from '../globalroutines/index'

import Quasar, { date, Screen } from 'quasar'
import { IListRoutes, ILang, IMenuList, IProject, ITodo, Privacy, IPerson } from '../model/index'
import { RouteNames } from '../router/route-names'

const ds_operatori: IPerson[] = [
  {
    index: 0,
    name: 'Elisa Ghizzardi',
    sub1: 'Presidente',
    sub2: 'Reiki Master, Naturopata e Operatrice Olistica',
    img: '../../statics/images/direttivo/elisa.jpg',
    cell: '338-9344724',
    email: 'elisa.ghizzardi@yahoo.com',
    paginaweb: '',
    paginafb: '',
    intro: 'Il mio incontro con le discipline olistiche è iniziato nel 2000, in un momento di grossi cambiamenti che mi hanno spinta a pormi delle domande sull’esistenza e sul percorso di vita che tocca a ciascuno di noi... <br>',
    info: 'Il mio incontro con le discipline olistiche è iniziato nel 2000, in un momento di grossi cambiamenti che mi hanno spinta a pormi delle domande sull’esistenza e sul percorso di vita che tocca a ciascuno di noi.<br>' +
    'In mio aiuto sono arrivati i Fiori di Bach, che ho utilizzato per diverso tempo e grazie ai quali ho cominciato a prendere contatto con una parte di me che non conoscevo e che ha cominciato ad emergere sempre di più.<br><br>' +
    'Qualche anno dopo ho conosciuto la Via del Reiki, attraverso la quale ho compreso che l’essere umano ha un potenziale enorme, dimenticato, ma che può essere ritrovato ed alimentato grazie al collegamento con la potente Energia Universale, grazie al collegamento con la scintilla divina che alberga in ognuno di noi. Ho desiderato allora completare il percorso per diventare insegnante e poter far conoscere anche ad altri la magnifica via del Reiki per riscoprire questo grande dono che abbiamo dentro di noi e per ritrovare la connessione con l’Esistenza, l’Amore e la Gioia profonda.<br><br>' +
    'Grazie a delle meravigliose sincronicità ho incontrato persone con cui condividere il percorso, partecipare attivamente alla conduzione di un’associazione culturale per la divulgazione delle discipline olistiche e questo percorso che sempre più chiaramente si è mostrato essere “ciò che volevo fare da grande”. Gli interessi si sono così trasformati in percorsi formativi professionali per diventare Operatrice Olistica e Naturopata.<br><br>' +
    'Insieme a Cristina e Kathryna nel 2019 abbiamo deciso di fondare L’associazione SHEN per creare un centro di formazione sia per chi desidera intraprendere una professione in ambito olistico sia per chi desidera fare un percorso di crescita personale.<br><br>' +
    'E di certo il cammino non è ancora finito c’è così tanto da conoscere e sperimentare...<br><br>' +
    '<span class="citazione">I due giorni più importanti della vita sono quello in cui sei nato e quello in capisci perché. (Mark Twain)</span>',
  }]

const arrLangUsed = [
  'it',
  'enUs',
  'es'
]

const lang_available: ILang[] = [
  { label: 'Italiano', icon: 'fa-flag-it', value: 'it', image: '../statics/images/it.png', short: 'IT' },
  { label: 'English', icon: 'fa-flag-us', value: 'enUs', image: '../statics/images/gb.png', short: 'EN' },
  { label: 'Español', icon: 'fa-flag-es', value: 'es', image: '../statics/images/es.png', short: 'ES' }
  // { label: 'Français', icon: 'fa-facebook', value: 'fr', image: '../statics/images/fr.png', short: 'FR' }
  // { label: 'German', icon: 'fa-flag-de', value: 'de', image: '../statics/images/de.png', short: 'DE' },
]

export const static_data = {
  SHOW_IF_IS_SERVER_CONNECTION: false,
  ds_operatori,
  lang_available,
  arrLangUsed
}
