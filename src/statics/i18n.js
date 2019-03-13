const messages = {
  it: {
    dialog: {
      ok: 'Ok',
      yes: 'Si',
      no: 'No',
      delete: 'Elimina',
      cancel: 'Annulla',
      msg: {
        titledeleteTask: 'Elimina Task',
        deleteTask: "Vuoi Eliminare {mytodo}?"
      }
    },
    comp: {
      Conta: "Conta",
    },
    msg: {
      hello: 'Buongiorno',
      myAppName: 'FreePlanet',
      underconstruction: 'App in costruzione...',
      myDescriz: '',
      sottoTitoloApp: 'Il primo Vero Social',
      sottoTitoloApp2: 'Libero, Equo e Solidale',
      sottoTitoloApp3: 'dove Vive Consapevolezza e Aiuto Comunitario',
      sottoTitoloApp4: 'Gratuito e senza Pubblicità',
    },
    homepage: {
      descrapp_title1: 'Uniti per Evolvere e Sperimentare',
      descrapp_pag1: 'Riscopri come il valore della <strong>Condivisione</strong> e della <strong>Cooperazione</strong>, possa aiutarci a ritrovare il profondo ' +
        'senso della <strong>Vita</strong>, perduto in questa società consumista, e riporti quei <strong>Sani Pricìpi Naturali</strong> ed Umani di <strong>Fratellanza</strong>' +
        ' che intere popolazioni antiche conoscevano bene.',
      descrapp_pag2: 'E\' giunta l\'ora di utilizzare i nuovi strumenti <strong>Tecnologici</strong> a nostro <strong>favore</strong>, per <strong>Liberarci</strong> ' +
        'così piano piano dalla <strong>schiavitù</strong> del <strong>"Lavoro per generare Denaro"</strong> e trasformando le nostre <strong>Capacitá</strong> in ' +
        '<strong>Risorse Umane</strong> per poterci sostenere e vivere in <strong>Armonia</strong> con gli altri.',
      freesocial: {
        title: 'Free Social',
        descr: 'Una Community organizzata per <strong>Categorie</strong>, dove potrai unirti a <strong>Gruppi Tematici</strong>, ' +
          'Condividere <strong>Esperienze</strong> e unire Competenze per organizzare e sostenere <strong>Progetti Innovativi</strong> per il Popolo. ' +
          'Verranno evidenziati sviluppi <strong>Etici</strong> come l\'<strong>Auto-Produzione</strong>, la <strong>Sostenibilitá</strong>, ' +
          'la Buona <strong>Salute Naturale</strong> e il <strong>Rispetto per l\'Ambiente</strong> e per tutti gli <strong>Esseri Viventi</strong> di questo ' +
          '<strong>Pianeta</strong>. Chiunque potrá esprimere il proprio <strong>Consenso o Dissenso</strong> partecipando a <strong>Sondaggi Interattivi</strong>' +
          ' e realizzare insieme i <strong>Cambiamenti</strong> necessari alla nostra Società.',
      },
      freetalent: {
        title: 'Free Talent',
        descr: 'Condividi i tuoi <strong>Talenti</strong> e <strong>Abilità</strong>, ' +
          'al posto del denaro guadagnagnerai <strong>Tempo</strong>.<br> ' +
          '<strong>"1 ora"</strong> diventa moneta di scambio, uguale per tutti, per adulti ed anziani, uomini e donne.<br>' +
          'Potrai utilizzare questi tuoi <strong>"Crediti Tempo"</strong> per soddisfare le tue necessità, cercando nelle <strong>Competenze Disponibili</strong>.<br>' +
          'Nel Dare e Ricevere, si creeranno così legami di <strong>Amicizia, Solidarietà e Cooperazione</strong> di cui l\'Essere Umano ha bisogno per potersi esprimere ' +
          'pienamente.<br><br>' +
          'Questo progetto vuole diffondere, in maniera informatizzata, questa realtà che gia esiste da tanti anni, e viene chiamata <strong>"Banca del Tempo"</strong>. ' +
          'Le <strong>segreterie</strong> sparse in tutto il mondo, serviranno a dare maggiore <strong>affidabilità</strong> e <strong>fiducia</strong> negli scambi di talenti tra persone sconosciute. ' +
          'Creeremo così una <strong>rete di fiducia</strong> nel vicinato, come giá viene praticato in numerosi <strong>Ecovillaggi</strong> e Comunità del mondo. ',
      },
      freegas: {
        title: 'Free G.A.S.',
        descr: 'Ti piacerebbe utilizzare una App che ti permetta facilmente di acquistare Prodotti Locali direttamente dal <strong>Produttore</strong>?<br>' +
          'Con i <strong>Gruppi di Acquisto Solidale</strong> si evitano intermediazioni inutili, ottenendo parecchi benefici tra cui:<br>' +
          '<ul class="mylist" style="padding-left: 20px;"><li><strong>Qualitá Superiore</strong> del prodotto</li>' +
          '<li>Le <strong>Recensioni</strong> dei consumatori favoriranno i Produttori con Sani Intenti</li>' +
          '<li>Possiblità d\'interagire con il Produttore</li>' +
          '<li>Apertura alle Relazioni tra persone, condividendo <strong>Ricette</strong> e <strong>Consigli</strong> preziosi</li>' +
          '<li><strong>Risparmio</strong> di soldi (prezzi all\'Ingrosso)</li>' +
          '<li>Valorizzare il <strong>Territorio</strong> e l\'Economia <strong>Locale</strong></li>' +
          '<li>Condizioni <strong>Eque</strong> per i Lavoratori</li>' +
          '<li>Ridotto <strong>Impatto Ambientale</strong></ul>',
      },
      freeliving: {
        title: 'Free Living',
        descr: 'Una soluzione meravigliosa per unire 2 realtà:<br>' +
          '1) Il <strong>Vivere soli</strong> in una casa grande.<br>' +
          '2) l\'avere bisogno di un <strong>alloggio</strong> temporaneo.<br>' +
          'Tante persone <strong>Anziane</strong> (e non) abitano da sole e vorrebbero continuare a vivere nella propria abitazione, ma hanno difficoltà a farlo.<br>' +
          'Altre persone invece hanno bisogno di una <strong>stanza</strong>, per scelta o per necessita, ed in cambio sono disponibili a ' +
          '<strong>contribuire alle spese</strong> per le utenze domestiche o magari <strong>aiutare</strong> la persona anziana a <strong>fare la spesa</strong>, cucinare, <strong>pulire casa</strong> oppure offrendogli semplicemente <strong>compagnia</strong>.<br>' +
          'Tramite questo strumento, le persone potranno mettersi in contatto e decidere in che forma <strong>co-abitare</strong>. Le <strong>recensioni</strong> rilasciate ed il <strong>dettaglio</strong> dei profili utenti, ' +
          'aiuterà nella scelta della persona più in <strong>sintonia</strong>.'

      },
      freecollabora: {
        title: 'Chi può Collaborare con Noi?',
        descr: 'Tutti coloro che sono in linea con <strong>Princìpi Etici</strong> e ricerca del <strong>Benessere Globale del Pianeta</strong><br>' +
          'Sono i benvenuti:' +
          '<ul class="mylist" style="padding-left: 20px;">' +
          '<li><strong>Associazioni, Ecovillaggi, Comunità</strong></li>' +
          '<li>Gruppi che intendono promuovere <strong>Progetti Sociali Innovativi</strong> per una <strong>Decrescita Felice</strong></li>' +
          '<li>Chi gestisce un <strong>Gruppo di Acquisto Solidale (G.A.S.) </strong></li>' +
          '<li>Chi gestisce una <strong>Banca del Tempo</strong></li>' +
          '<li><strong>Chiunque voglia aiutare</strong>, nella forma che ritiene più opportuna.</li>' +
          '</ul>',
      },
      freesostieni: {
        title: 'Come Sostenere il progetto?',
        descr: '<ul class="mylist" style="padding-left: 20px;">' +
          '<li><strong>Condividendo</strong> il progetto a Gruppi, Comunità, Associazioni No-profit, G.A.S.</li>' +
          '<li>Rispondendo attivamente ai <strong>Sondaggi Popolari</strong> e lasciando <strong>Feedback</strong></li>' +
          '<li>Effettuando piccole <strong>donazioni</strong> (<strong>anche 1€</strong>) per le spese di gestione dei Server.<br>' +
          '</ul>',
      },
      multiplatform: {
        title: 'Multi-piattaforma',
        descr: 'E\' Compatibile con Google Chrome, Firefox, Safari, iOS, Android e PC. L\'Applicazione s\'installa facilmente, senza passare dallo store. ' +
          'basta condividere il nome del sito <strong>www.freeplanet.app</strong>',
      },
      free: {
        title: 'Gratuita, Open Source e Niente Pubblicità',
        descr: 'Vedo un <strong>futuro</strong> dove non si utilizzerà più denaro. Dove le persone si <strong>aiuteranno</strong> a vicenda e non avranno bisogno di "possedere" cose, ma le <strong>condivideranno</strong> con gli altri.<br>' +
          'Questa App <strong>non è in vendita</strong>, non ha scopi commerciali, <strong>non ha prezzo</strong> ed appartiene al <strong>Popolo del Nuovo Mondo</strong>. A me il compito di gestirla e proteggerla. ' +
          'Verranno accettate solo donazioni Libere di privati ed Associazioni no-profit, in linea con i Principi, che serviranno per coprire le spese. <strong>Grazie a Tutti per il sostegno</strong>. '
      },
    },
    pages: {
      home: 'Principale',
      SignUp: 'Registrazione',
      SignIn: 'Login',
      vreg: 'Verifica Reg',
      Test: 'Test',
      Category: 'Categorie',
      Todo: 'Todo',
      personal: 'Personale',
      work: 'Lavoro',
      shopping: 'Spesa',
      Admin: 'Admin',
      Test1: 'Test1',
      Test2: 'Test2',
    },
    components: {
      authentication: {
        login: {
          facebook: 'Facebook'
        },
        email_verification: {
          title: 'Inizia la tua registrazione',
          introduce_email: 'inserisci la tua email',
          email: 'Email',
          invalid_email: 'La tua email è invalida',
          verify_email: 'Verifica la tua email',
          go_login: 'Torna al Login',
          incorrect_input: 'Inserimento incorretto.',
          link_sent: 'Per confermare la Registrazione, leggi la tua casella di posta e Clicca su "Verifica Email".\nSe non la trovi, cerca nella cartella Spam.'
        }
      }
    },
    fetch: {
      errore_generico: 'Errore Generico',
      errore_server: 'Impossibile accedere al Server. Riprovare Grazie',
      error_doppiologin: 'Rieseguire il Login. Accesso aperto da un altro dispositivo.',
    },
    user: {
      notregistered: 'Devi registrarti al servizio prima di porter memorizzare i dati'
    },
    reg: {
      incorso: 'Registrazione in corso...',
      richiesto: 'Campo Richiesto',
      email: 'Email',
      username: 'Nome Utente',
      username_login: 'Nome Utente o email',
      password: 'Password',
      repeatPassword: 'Ripeti password',
      terms: "Accetto i termini e le condizioni",
      submit: "Registrati",
      title_verif_reg: "Verifica Registrazione",
      verificato: "Verificato",
      non_verificato: "Non Verificato",
      forgetpassword: "Password dimenticata?",
      err: {
        required: 'è richiesto',
        email: 'inserire una email valida',
        errore_generico: 'Si prega di compilare correttamente i campi',
        atleast: 'dev\'essere lungo almeno di',
        complexity: 'deve contenere almeno 1 minuscola, 1 maiuscola e 1 cifra',
        notmore: 'non dev\'essere lungo più di',
        char: 'caratteri',
        terms: 'Devi accettare le condizioni, per continuare.',
        duplicate_email: 'l\'Email è già stata registrata',
        duplicate_username: 'L\'Username è stato già utilizzato',
        sameaspassword: 'Le password devono essere identiche',
      },
      tips: {
        email: 'inserisci la tua email',
        username: 'username lunga almeno 6 caratteri',
        password: 'deve contenere 1 minuscola, 1 maiuscola e 1 cifra',
        repeatpassword: 'ripetere la password',

      }
    },
    login: {
      incorso: 'Login in corso',
      enter: 'Login',
      errato: "Username o password errata. Riprovare",
      completato: 'Login effettuato!',
    },
    reset: {
      title_reset_pwd: "Reimposta la tua Password",
      send_reset_pwd: 'Invia Reimposta la password',
      incorso: 'Richiesta Nuova Email...',
      email_sent: 'Email inviata',
      check_email: 'Controlla la tua email, ti arriverà un messaggio con un link per reimpostare la tua password. Questo link, per sicurezza, scadrà dopo 4 ore.',
      title_update_pwd: 'Aggiorna la tua password',
      update_password: 'Aggiorna Password',
    },
    logout: {
      uscito: 'Sei Uscito',
    },
    errors: {
      graphql: {
        undefined: 'non definito'
      }
    },
    todo: {
      titleprioritymenu: 'Priorità:',
      inserttop: 'Inserisci il Task in cima',
      insertbottom: 'Inserisci il Task in basso',
      edit: 'Descrizione Task:',
      completed: 'Ultimi Completati',
      usernotdefined: 'Attenzione, occorre essere Loggati per poter aggiungere un Todo'
    },
    notification: {
      status: 'Stato',
      ask: 'Attiva le Notifiche',
      waitingconfirm: 'Conferma la richiesta di Notifica',
      confirmed: 'Notifiche Attivate!',
      denied: 'Notifiche Disabilitate! Attenzione così non vedrai arrivarti i messaggi. Riabilitali per vederli.',
      titlegranted: 'Permesso Notifiche Abilitato!',
      statusnot: 'Stato Notifiche',
      titledenied: 'Permesso Notifiche Disabilitato!',
      title_subscribed: 'Sottoscrizione a FreePlanet.app!',
      subscribed: 'Ora potrai ricevere i messaggi e le notifiche.',
      newVersionAvailable: 'Nuova Versione!'
    },
    connection: 'Connessione',
  },
  'es': {
    dialog: {
      ok: 'Vale',
      yes: 'Sí',
      no: 'No',
      delete: 'Borrar',
      cancel: 'Cancelar',
      msg: {
        titledeleteTask: 'Borrar Tarea',
        deleteTask: 'Quieres borrar {mytodo}?'
      }
    },
    comp: {
      Conta: "Conta",
    },
    msg: {
      hello: 'Buenos Días',
      myAppName: 'FreePlanet',
      underconstruction: 'App en construcción...',
      myDescriz: '',
      sottoTitoloApp: 'El primer Verdadero Social',
      sottoTitoloApp2: 'Libre, justo y Solidario',
      sottoTitoloApp3: 'Donde vive Conciencia y Ayuda comunitaria'
    },
    pages: {
      home: 'Principal',
      SignUp: 'Nueva Cuenta',
      SignIn: 'Entrar',
      vreg: 'Verifica Reg',
      Test: 'Test',
      Category: 'Categorías',
      Todo: 'Tareas',
      personal: 'Personal',
      work: 'Trabajo',
      shopping: 'Compras',
      Admin: 'Administración',
      Test1: 'Test1',
      Test2: 'Test2',
    },
    components: {
      authentication: {
        login: {
          facebook: 'Facebook'
        },
        email_verification: {
          title: 'Crea una cuenta',
          introduce_email: 'ingrese su dirección de correo electrónico',
          email: 'Email',
          invalid_email: 'Tu correo electrónico no es válido',
          verify_email: 'Revisa tu email',
          go_login: 'Vuelve al Login',
          incorrect_input: 'Entrada correcta.',
          link_sent: 'Para confirmar el registro, lea su buzón y haga clic en "Verificar correo electrónico".\n' + 'Si no lo encuentras, busca en la carpeta Spam.'
        }
      }
    },
    fetch: {
      errore_generico: 'Error genérico',
      errore_server: 'No se puede acceder al Servidor. Inténtalo de nuevo, Gracias',
      error_doppiologin: 'Vuelva a iniciar sesión. Acceso abierto por otro dispositivo.',
    },
    user: {
      notregistered: 'Debe registrarse en el servicio antes de poder almacenar los datos'
    },
    reg: {
      incorso: 'Registro en curso...',
      richiesto: 'Campo requerido',
      email: 'Email',
      username: 'Nombre usuario',
      username_login: 'Nombre usuario o email',
      password: 'contraseña',
      repeatPassword: 'Repetir contraseña',
      terms: "Acepto los términos y condiciones",
      submit: "Registrarse",
      title_verif_reg: "Verifica registro",
      verificato: "Verificado",
      non_verificato: "No Verificado",
      forgetpassword: "¿Olvidaste tu contraseña?",
      err: {
        required: 'se requiere',
        email: 'Debe ser una email válida.',
        errore_generico: 'Por favor, rellene los campos correctamente',
        atleast: 'debe ser al menos largo',
        complexity: 'debe contener al menos 1 minúscula, 1 mayúscula y 1 dígito',
        notmore: 'no tiene que ser más largo que',
        char: 'caracteres',
        terms: 'Debes aceptar las condiciones, para continuar..',
        duplicate_email: 'La email ya ha sido registrada',
        duplicate_username: 'El nombre de usuario ya ha sido utilizado',
        sameaspassword: 'Las contraseñas deben ser idénticas',
      }
    },
    login: {
      incorso: 'Login en curso',
      enter: 'Entra',
      errato: "Nombre de usuario, correo o contraseña incorrectos. inténtelo de nuevo",
      completato: 'Login realizado!',
    },
    reset: {
      title_reset_pwd: "Restablece tu contraseña",
      send_reset_pwd: 'Enviar restablecer contraseña',
      incorso: 'Solicitar nueva Email...',
      email_sent: 'Email enviada',
      check_email: 'Revise su correo electrónico, recibirá un mensaje con un enlace para restablecer su contraseña. Este enlace, por razones de seguridad, expirará después de 4 horas.',
      title_update_pwd: 'Actualiza tu contraseña',
      update_password: 'Actualizar contraseña',
    },
    logout: {
      uscito: 'Estás desconectado',
    },
    errors: {
      graphql: {
        undefined: 'no definido'
      }
    },
    todo: {
      titleprioritymenu: 'Prioridad:',
      inserttop: 'Ingrese una nueva Tarea arriba',
      insertbottom: 'Ingrese una nueva Tarea abajo',
      edit: 'Descripción Tarea:',
      completed: 'Ultimos Completados',
      usernotdefined: 'Atención, debes iniciar sesión para agregar una Tarea'
    },
    notification: {
      status: 'Estado',
      ask: 'Activar notificaciones',
      waitingconfirm: 'Confirmar la solicitud de notificación.',
      confirmed: 'Notificaciones activadas!',
      denied: 'Notificaciones deshabilitadas! Ten cuidado, así no verás llegar los mensajes. Rehabilítalos para verlos.',
      titlegranted: 'Notificaciones permitidas habilitadas!',
      statusnot: 'Estado Notificaciones',
      titledenied: 'Notificaciones permitidas deshabilitadas!',
      title_subscribed: 'Suscripción a FreePlanet.app!',
      subscribed: 'Ahora puedes recibir mensajes y notificaciones.',
      newVersionAvailable: 'Nueva Versión!'
    },
    connection: 'Connection',
  },
  'enUs': {
    dialog: {
      ok: 'Ok',
      yes: 'Yes',
      no: 'No',
      delete: 'Delete',
      cancel: 'Cancel',
      msg: {
        titledeleteTask: 'Delete Task',
        deleteTask: 'Delete Task {mytodo}?'
      }
    },
    comp: {
      Conta: "Count",
    },
    msg: {
      hello: 'Hello!',
      myAppName: 'FreePlanet',
      underconstruction: 'App in constuction...',
      myDescriz: '',
      sottoTitoloApp: 'The first Real Social',
      sottoTitoloApp2: 'Free, Fair and solidarity',
      sottoTitoloApp3: 'Where the conscience and community help live'
    },
    pages: {
      home: 'Dashboard',
      SignUp: 'SignUp',
      SignIn: 'SignIn',
      vreg: 'Verify Reg',
      Test: 'Test',
      Category: 'Category',
      Todo: 'Todo',
      personal: 'Personal',
      work: 'Work',
      shopping: 'Shopping',
      Admin: 'Admin',
      Test1: 'Test1',
      Test2: 'Test2',
    },
    components: {
      authentication: {
        login: {
          facebook: 'Facebook'
        },
        email_verification: {
          title: 'Begin your registration',
          introduce_email: 'Enter your email',
          email: 'Email',
          invalid_email: 'Your email is invalid',
          verify_email: 'Verify your email',
          go_login: 'Back to Login',
          incorrect_input: 'Incorrect input.',
          link_sent: 'To confirm the Registration, read your mailbox and click on "Verify email".\nIf you can not find it check your junk mail or spam.'
        }
      }
    },
    fetch: {
      errore_generico: 'Generic Error',
      errore_server: 'Unable to access to the Server. Retry. Thank you.',
      error_doppiologin: 'Signup again. Another access was made with another device.',
    },
    user: {
      notregistered: 'You need first to SignUp before storing data'
    },
    reg: {
      incorso: 'Registration please wait...',
      richiesto: 'Field Required',
      email: 'Email',
      username_login: 'Username or email',
      username: 'Username',
      password: 'Password',
      repeatPassword: 'Repeat password',
      terms: "I agree with the terms and conditions",
      submit: "Submit",
      title_verif_reg: "Verify Registration",
      verificato: "Verified",
      non_verificato: "Not Verified",
      forgetpassword: "Forget Password?",
      err: {
        required: 'is required',
        email: 'must be a valid email',
        errore_generico: 'Please review fields again',
        atleast: 'must be at least',
        complexity: 'must contains at least 1 lowercase letter, 1 uppercase letter, and 1 digit',
        notmore: 'must not be more than',
        char: 'characters long',
        terms: 'You need to agree with the terms & conditions.',
        duplicate_email: 'Email was already registered',
        duplicate_username: 'Username is already taken',
        sameaspassword: 'Passwords must be identical',
      }
    },
    login: {
      incorso: 'Login...',
      enter: 'Login',
      errato: "Username or password wrong. Please retry again",
      completato: 'Login successfully!',
    },
    reset: {
      title_reset_pwd: "Reset your Password",
      send_reset_pwd: 'Send password request',
      incorso: 'Request New Email...',
      email_sent: 'Email sent',
      check_email: 'Check your email for a message with a link to update your password. This link will expire in 4 hours for security reasons.',
      title_update_pwd: 'Update your password',
      update_password: 'Update Password',
    },
    logout: {
      uscito: 'Logout successfully',
    },
    errors: {
      graphql: {
        undefined: 'undefined'
      }
    },
    todo: {
      titleprioritymenu: 'Priority:',
      inserttop: 'Insert Task at the top',
      insertbottom: 'Insert Task at the bottom',
      edit: 'Task Description:',
      completed: 'Lasts Completed',
      usernotdefined: 'Attention, you need to be Signed In to add a new Task'
    },
    notification: {
      status: 'Status',
      ask: 'Enable Notification',
      waitingconfirm: 'Confirm the Request Notification',
      confirmed: 'Notifications Enabled!',
      denied: 'Notifications Disabled! Attention, you will not see your messages incoming. Reenable it for see it',
      titlegranted: 'Notification Permission Granted!',
      statusnot: 'status Notification',
      titledenied: 'Notification Permission Denied!',
      title_subscribed: 'Subscribed to FreePlanet.app!',
      subscribed: 'You can now receive Notification and Messages.',
      newVersionAvailable: 'New Version!'
    },
    connection: 'Conexión',
  },
};

export default messages;
