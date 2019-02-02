const messages = {
  it: {
    dialog: {
      yes: 'Si',
      no: 'No',
      delete: 'Elimina',
      cancel: 'Annulla',
      msg: {
        titledeleteTask: 'Elimina Task',
        deleteTask: 'Vuoi Eliminare questo Task?'
      }
    },
    comp:{
      Conta: "Conta",
    },
    msg: {
      hello: 'Buongiorno',
      myAppName: 'FreePlanet',
      myDescriz: 'La prima App Libera'
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
    },
    components: {
      authentication:{
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
    reg: {
      incorso: 'Registrazione in corso...',
      richiesto: 'Campo Richiesto',
      email: 'Email',
      username : 'Nome Utente',
      password: 'Password',
      repeatPassword: 'Ripeti password',
      terms: "Accetto i termini e le condizioni",
      submit: "Registrati",
      title_verif_reg: "Verifica Registrazione",
      verificato: "Verificato",
      non_verificato: "Non Verificato",
      forgetpassword:"Password dimenticata?",
      err: {
        required: 'è richiesto',
        email: 'dev\'essere una email valida',
        errore_generico: 'Si prega di compilare correttamente i campi',
        atleast: 'dev\'essere lungo almeno di',
        complexity: 'deve contenere almeno 1 carattere minuscolo, 1 maiuscola e 1 cifra',
        notmore: 'non dev\'essere lungo più di',
        char: 'caratteri',
        terms: 'Devi accettare le condizioni, per continuare.',
        duplicate_email: 'l\'Email è già stata registrata',
        duplicate_username: 'L\'Username è stato già utilizzato',
        sameaspassword: 'Le password devono essere identiche',
      }
    },
    login:{
      incorso: 'Login in corso',
      enter: 'Login',
      errato: "Username o password errata. Riprovare",
      completato: 'Login effettuato!',
    },
    reset: {
      title_reset_pwd: "Reimposta la tua Password",
      send_reset_pwd: 'Invia Reimposta la password',
      incorso: 'Richiesta Nuova Email...',
      email_sent:'Email inviata',
      check_email: 'Controlla la tua email, ti arriverà un messaggio con un link per reimpostare la tua password. Questo link, per sicurezza, scadrà dopo 4 ore.',
      title_update_pwd: 'Aggiorna la tua password',
      update_password: 'Aggiorna Password',
    },
    logout:{
      uscito: 'Sei Uscito',
    },
    errors: {
      graphql: {
        undefined: 'non definito'
      }
    },
    todo: {
      titleprioritymenu: 'Priorità:',
      insert: 'Inserisci il Task',
      edit: 'Descrizione Task:',
      completed: 'Completati',
      usernotdefined: 'Attenzione, occorre essere Loggati per poter aggiungere un Todo'
    }
  },
  enUk: {
    dialog: {
      yes: 'Yes',
      no: 'No',
      delete: 'Delete',
      cancel: 'Cancel',
      msg: {
        titledeleteTask: 'Delete Task',
        deleteTask: 'Delete this Task?'
      }
    },
    comp:{
      Conta: "Count",
    },
    msg: {
      hello: 'Hello!',
      myAppName: 'FreePlanet',
      myDescriz: 'The first Free app'
    },
    pages: {
      home: 'Dashboard One',
      SignUp: 'SignUp',
      SignIn: 'SignIn',
      vreg: 'Verify Reg',
      Test: 'Test',
      Category: 'Category',
      Todo: 'Todo',
      personal: 'Personal',
      work: 'Work',
      shopping: 'Shopping',
    },
    components: {
      authentication:{
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
    reg: {
      incorso: 'Registration please wait...',
      richiesto: 'Field Required',
      email: 'Email',
      username : 'Username',
      password: 'Password',
      repeatPassword: 'Repeat password',
      terms: "I agree with the terms and conditions",
      submit: "Submit",
      title_verif_reg: "Verify Registration",
      verificato: "Verified",
      non_verificato: "Not Verified",
      forgetpassword:"Forget Password?",
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
    login:{
      incorso: 'Login...',
      enter: 'Login',
      errato: "Username or password wrong. Please retry again",
      completato: 'Login successfully!',
    },
    reset: {
      title_reset_pwd: "Reset your Password",
      send_reset_pwd: 'Send password request',
      incorso: 'Request New Email...',
      email_sent:'Email sent',
      check_email: 'Check your email for a message with a link to update your password. This link will expire in 4 hours for security reasons.',
      title_update_pwd: 'Update your password',
      update_password: 'Update Password',
    },
    logout:{
      uscito: 'Logout successfully',
    },
    errors: {
      graphql: {
        undefined: 'undefined'
      }
    },
    todo: {
      titleprioritymenu: 'Priority:',
      insert: 'Insert Task',
      edit: 'Task Description:',
      completed: 'Completed',
      usernotdefined: 'Attention, you need to be Signed In to add a new Task'
    }
  },
};

export default messages;
