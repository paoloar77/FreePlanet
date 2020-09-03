import { translation } from '@src/store/Modules/translation'
import { Privacy } from '@src/model'

export const shared_consts = {

  Accepted: {
    CHECK_READ_GUIDELINES: {
      value: 1,
      label: 'steps.linee_guida',
      icon: 'fas fa-user-shield',
      color: 'red'
    },
    CHECK_SEE_VIDEO_PRINCIPI: {
      value: 2,
      label: 'steps.video_intro',
      icon: 'fas fa-tools',
      color: 'green'
    },
  },

  ALL_SAW_AND_ACCEPTED: 3,

  FILTER_EXTRALIST_NOT_REGISTERED: 1,
  FILTER_EXTRALIST_NOT_CONTACTED: 2,
  FILTER_EXTRALIST_WITH_NOTE: 4,
  FILTER_USER_NO_ZOOM: 8,
  FILTER_USER_NO_INVITANTE: 16,
  FILTER_USER_NO_TELEGRAM_ID: 32,
  FILTER_USER_CODICE_AUTH_TELEGRAM: 64,
  FILTER_USER_NO_EMAIL_VERIFICATA: 128,
  FILTER_USER_NO_DREAM: 256,
  FILTER_EXTRALIST_DELETED: 512,
  FILTER_USER_TELEGRAM_BLOCKED: 1024,
  FILTER_ATTIVI: 2048,
  FILTER_NASCOSTI: 4096,
  FILTER_NAVI_NON_PRESENTI: 8192,
  FILTER_QUALIFIED: 16384,
  FILTER_ASK_ZOOM_VISTO: 32768,

  Permissions: {
    Admin: {
      value: 1,
      label: 'pages.Admin',
      icon: 'fas fa-user-shield',
      color: 'red'
    },
    Manager: {
      value: 2,
      label: 'otherpages.manage.manager',
      icon: 'fas fa-tools',
      color: 'green'
    },
    Teacher: {
      value: 4,
      label: 'event.teacher',
      icon: 'fas fa-user-tie',
      color: 'blue'
    },
    Tutor: {
      value: 8,
      label: 'dashboard.tutor',
      icon: 'fas fa-user-tie',
      color: 'fuchsia'
    },
    Traduttrici: {
      value: 16,
      label: 'dashboard.traduttrici',
      icon: 'fas fa-user-tie',
      color: 'orange'
    },
    Zoomeri: {
      value: 32,
      label: 'dashboard.zoomeri',
      icon: 'fas fa-user-tie',
      color: 'yellow'
    }
  },

  MessageOptions: {
    Notify_ByEmail: 2,
    Notify_ByPushNotification: 4
  },

  TypeMsg: {
    SEND_TO_ALL: 1,
  },

  TypeMsg_Actions: {
    NORMAL: 0,
    YESNO: 1,
    OPZ1_2: 2,
  },

  selectActions: [
    {
      id: 0,
      label: 'Normale',
      value: 0
    },
    {
      id: 1,
      label: 'Si / No',
      value: 1
    },
    {
      id: 2,
      label: 'Opzione 1 / Opzione 2',
      value: 2
    }
  ],

  fieldsUserToChange() {
    return ['_id', 'username', 'email', 'name', 'surname', 'perm', 'date_reg', 'verified_email', 'img', 'ipaddr', 'lasttimeonline', 'profile', 'news_on']
  }

}
