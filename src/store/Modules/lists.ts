import { Todos, Projects, UserStore } from '@store'

export const lists = {
  MenuAction: {
    CUT: 71,
    PASTE: 72,
    DELETE: 100,
    TOGGLE_EXPIRING: 101,
    COMPLETED: 110,
    PROGRESS_BAR: 120,
    PRIORITY: 130,
    SHOW_TASK: 150,
    SHOW_POSIZ: 155,
    EDIT: 160,
    ADD_PROJECT: 200,
    THEME: 210,
    THEMEBG: 211,

    DELETE_RECTABLE: 300,
    DUPLICATE_RECTABLE: 310,
    DELETE_EVENT: 320,
    DELETE_EXTRALIST: 330,
    DELETE_USERLIST: 335,
    REGALA_INVITATO: 340,
    REGALA_INVITANTE: 342,
    SOSTITUISCI: 345,
    INVIA_MSG_A_DONATORI: 350,
    INVIA_MSG_A_FLOTTA: 352,
    INVIA_MSG_A_SINGOLO: 355,
    DONO_INVIATO: 360,
    DONO_RICEVUTO: 370,
    AGGIUNGI_NUOVO_IMBARCO: 380,
    CANCELLA_IMBARCO: 385,
    DAMMI_PRIMO_UTENTE_LIBERO: 390,

    CAN_EDIT_TABLE: 400,
    SHOW_PREV_REC: 401,
    ZOOM_GIA_PARTECIPATO: 510
  },

  selectTheme: [
    {
      id: 1,
      label: 'Theme 1',
      value: 'red'
    },
    {
      id: 2,
      label: 'Theme 2',
      value: 'pink'
    },
    {
      id: 3,
      label: 'Theme 3',
      value: 'purple'
    },
    {
      id: 4,
      label: 'Theme 4',
      value: 'deep-purple'
    },
    {
      id: 5,
      label: 'Theme 5',
      value: 'indigo'
    },
    {
      id: 6,
      label: 'Theme 6',
      value: 'blue'
    },
    {
      id: 7,
      label: 'Theme 7',
      value: 'green'
    },
    {
      id: 8,
      label: 'Theme 8',
      value: 'orange'
    },
    {
      id: 9,
      label: 'Theme 9',
      value: 'brown'
    },
    {
      id: 10,
      label: 'Theme 10',
      value: 'black'
    },
    {
      id: 11,
      label: 'Theme 11',
      value: 'white'
    }
  ],

  selectPriority: {
    it: [
      {
        id: 1,
        label: 'Alta',
        value: 2,
        icon: 'expand_less'
      },
      {
        id: 2,
        label: 'Normale',
        value: 1,
        icon: 'remove'
      },
      {
        id: 3,
        label: 'Bassa',
        value: 0,
        icon: 'expand_more'
      }],
    es:
      [
        {
          id: 1,
          label: 'Alta',
          value: 2,
          icon: 'expand_less'
        },
        {
          id: 2,
          label: 'Normal',
          value: 1,
          icon: 'remove'
        },
        {
          id: 3,
          label: 'Baja',
          value: 0,
          icon: 'expand_more'
        }],
    enUs:
      [
        {
          id: 1,
          label: 'High',
          value: 2,
          icon: 'expand_less'
        },
        {
          id: 2,
          label: 'Normal',
          value: 1,
          icon: 'remove'
        },
        {
          id: 3,
          label: 'Low',
          value: 0,
          icon: 'expand_more'
        }],
    de:
      [
        {
          id: 1,
          label: 'High',
          value: 2,
          icon: 'expand_less'
        },
        {
          id: 2,
          label: 'Normal',
          value: 1,
          icon: 'remove'
        },
        {
          id: 3,
          label: 'Low',
          value: 0,
          icon: 'expand_more'
        }]

  }

}
