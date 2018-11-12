const messages = {
  it: {
    msg: {
      hello: 'Buongiorno',
      myAppName: 'FreePlanet',
      myDescriz: 'La prima App Libera e per Tutti'
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
  },
  enUs: {
    msg: {
      hello: 'Hello!',
      myAppName: 'FreePlanet',
      myDescriz: 'The first Free app for Everyone'
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
  },
};

export default messages;
