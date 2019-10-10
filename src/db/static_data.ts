import { Todos, Projects, UserStore, GlobalStore } from '@store'
import globalroutines from '../globalroutines/index'

import Quasar, { date, Screen } from 'quasar'
import {
  IListRoutes,
  ILang,
  IMenuList,
  IProject,
  ITodo,
  Privacy,
  IPerson,
  IFunctionality,
  IPreloadImages
} from '../model/index'
import { RouteNames } from '../router/route-names'
import { tools } from '@src/store/Modules/tools'

// const SHOW_PROJINTHEMENU = false
//
// let arrlistafavourite = []
// let arrlistaprojtutti = []
// let arrlistaprojmiei = []
// if (SHOW_PROJINTHEMENU) {
//   arrlistaprojtutti = Projects.getters.listaprojects(RouteNames.projectsall)
//   arrlistaprojmiei = Projects.getters.listaprojects(RouteNames.myprojects)
//   arrlistafavourite = Projects.getters.listaprojects(RouteNames.favouriteprojects)
// }
// PROGETTI -> FAVORITI :

// if (arrlistafavourite.length > 0) {
//   arrMenu.push({
//     icon: 'favorite_border',
//     nametranslate: 'pages.' + RouteNames.favouriteprojects,
//     urlroute: RouteNames.favouriteprojects,
//     level_parent: 0.0,
//     level_child: 0.5,
//     routes2: arrlistafavourite,
//     idelem: ''
//   })
// }

const routes_todo: IListRoutes[] = []
const arrlista = [
  { nametranslate: 'personal', description: 'personal' },
  { nametranslate: 'work', description: 'work' },
  { nametranslate: 'shopping', description: 'shopping' }
]

arrlista.forEach((elem: IMenuList) => {
  routes_todo.push(
    {
      path: '/todo/:category',
      materialIcon: 'todo',
      urlroute: 'todo',
      name: elem.description,
      component: () => import('@/views/todo-list/todo-list.vue'),
      level_parent: 0,
      level_child: 0.5,
      inmenu: true,
      submenu: true,
      infooter: true,
      meta: {
        requiresAuth: true,
        async asyncData() {
          await Todos.actions.dbLoad({ checkPending: false })
        }
        // middleware: [auth]
      },
      idelem: elem.nametranslate,
    }
  )
})

const routes_projects: IListRoutes[] = [
  {
    // PROGETTI -> TUTTI :
    path: '/' + RouteNames.projectsall + '/:idProj',
    materialIcon: 'accessibility_new',
    name: RouteNames.projectsall,
    urlroute: RouteNames.projectsall,
    component: () => import('@/views/projects/proj-list/proj-list.vue'),
    inmenu: true,
    submenu: true,
    level_parent: 0.0,
    level_child: 0.5,
    infooter: true,
    meta: {
      requiresAuth: false,
      async asyncData() {
        // await Todos.actions.dbLoad({ checkPending: false })
        await Projects.actions.dbLoad({ checkPending: false, onlyiffirsttime: true })
      }
    },
    idelem: process.env.PROJECT_ID_MAIN
  },
  {
    // PROGETTI -> TUTTI :
    path: '/' + RouteNames.myprojects + '/:idProj',
    materialIcon: 'accessibility_new',
    name: RouteNames.myprojects,
    urlroute: RouteNames.myprojects,
    component: () => import('@/views/projects/proj-list/proj-list.vue'),
    inmenu: true,
    submenu: true,
    level_parent: 0.0,
    level_child: 0.5,
    infooter: true,
    meta: {
      requiresAuth: false,
      async asyncData() {
        // await Todos.actions.dbLoad({ checkPending: false })
        await Projects.actions.dbLoad({ checkPending: false, onlyiffirsttime: true })
      }
    },
    idelem: process.env.PROJECT_ID_MAIN
  },
  {
    // PROGETTI -> TUTTI :
    path: '/' + RouteNames.projectsshared + '/:idProj',
    materialIcon: 'accessibility_new',
    name: RouteNames.projectsshared,
    urlroute: RouteNames.projectsshared,
    component: () => import('@/views/projects/proj-list/proj-list.vue'),
    inmenu: true,
    submenu: true,
    level_parent: 0.0,
    level_child: 0.5,
    infooter: true,
    meta: {
      requiresAuth: false,
      async asyncData() {
        // await Todos.actions.dbLoad({ checkPending: false })
        await Projects.actions.dbLoad({ checkPending: false, onlyiffirsttime: true })
      }
    },
    idelem: process.env.PROJECT_ID_MAIN
  }
]

const routes: IListRoutes[] = [
  {
    path: '/',
    materialIcon: 'home',
    name: 'pages.home',
    component: () => import('@/root/home/home.vue'),
    reqauth: false,
    inmenu: true,
    infooter: true
  },
  {
    path: '',
    faIcon: 'fa fa-list-alt',
    materialIcon: 'format_list_numbered',
    name: 'pages.Todo',
    routes2: routes_todo,
    level_parent: 0,
    level_child: 0.5,
    inmenu: true,
    solotitle: true,
    infooter: true
  },
  ...routes_todo,
  {
    path: '',
    faIcon: 'fa fa-list-alt',
    materialIcon: 'next_week',
    name: 'pages.projects',
    routes2: routes_projects,
    level_parent: 0,
    level_child: 0.5,
    inmenu: true,
    solotitle: true,
    infooter: true
  },
  ...routes_projects,
  {
    path: '/category',
    materialIcon: 'list',
    name: 'pages.Category',
    component: () => import('@/views/categories/category/category.vue'),
    inmenu: true,
    infooter: true
  },
  {
    path: '/admin/testp1/:category',
    materialIcon: 'restore',
    name: 'pages.Test1',
    component: () => import('@/views/admin/testp1/testp1.vue'),
    inmenu: true,
    infooter: false,
    reqauth: true
  },

  // --- NOT IN MENU: ---
  { path: '/policy', name: 'pages.policy', component: () => import('@/root/policy/policy.vue') },
  {
    path: '/signup',
    materialIcon: 'how_to_reg',
    name: 'pages.SignUp',
    component: () => import('@/views/login/signup/signup.vue'),
    inmenu: true,
    infooter: true
  },
  {
    path: '/signin',
    materialIcon: 'account_circle',
    name: 'pages.SignIn',
    component: () => import('@/views/login/signin/signin.vue'),
    inmenu: true,
    infooter: true
  },
  { path: '/vreg', name: 'Verify Reg', component: () => import('@/views/login/vreg/vreg.vue') },
  {
    path: '/admin/cfgserv',
    name: 'cfgserv',
    component: () => import('@/views/admin/cfgServer/cfgServer.vue'),
    reqauth: true
  },
  { path: '/offline', name: 'Offline', component: () => import('@/views/offline/offline.vue') }

]

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
    '<span class="citazione">I due giorni più importanti della vita sono quello in cui sei nato e quello in capisci perché. (Mark Twain)</span>'
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

const functionality: IFunctionality = {
  SHOW_USER_MENU: true,
  SHOW_IF_IS_SERVER_CONNECTION: false,
  ENABLE_TODOS_LOADING: true,
  ENABLE_PROJECTS_LOADING: true,
  SHOW_NEWSLETTER: false,
  SHOW_ONLY_POLICY: false,
  EVENTS_CAN_BOOKING: false
}

export const static_data = {
  functionality,
  ds_operatori,
  lang_available,
  preLoadImages,
  arrLangUsed
}
