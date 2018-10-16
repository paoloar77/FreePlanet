const messages = {
  it: {
    msg: {
      hello: 'Buongiorno!',
      myAppName: 'FreePlanet',
      myDescriz: 'La prima App Libera e per Tutti'
    },
    reg: {
      richiesto: '* Richiesto',
      email: 'Email',
      username : 'Nome Utente',
      password: 'Password',
      repeatPassword: 'Ripeti password',
      terms: "Accetti i termini e le condizioni?",
      submit: "Registrati",
      err: {
        required: 'è richiesto',
        email: 'dev\'essere una email valida',
        errore_generico: 'Si prega di compilare correttamente i campi',
        atleast: 'dev\'essere lungo almeno di',
        notmore: 'non dev\'essere lungo più di',
        char: 'caratteri',
        terms: 'Devi accettare le condizioni, per continuare.',
        duplicate_email: 'l\'Email è già stata registrata',
        duplicate_username: 'L\'Username è stato già utilizzato',
        sameaspassword: 'Le password devono essere identiche',
      }
    },
  },
  enUs: {
    msg: {
      hello: 'Hello!',
      myAppName: 'FreePlanet',
      myDescriz: 'The first Free app for Everyone'
    },
    reg: {
      richiesto: '* Required',
      email: 'Email',
      username : 'Username',
      password: 'Password',
      repeatPassword: 'Repeat password',
      terms: "Do you agree with the terms & conditions?",
      submit: "Submit",
      err: {
        required: 'is required',
        email: 'must be a valid email',
        errore_generico: 'Please review fields again',
        atleast: 'must be at least',
        notmore: 'must not be more than',
        char: 'characters long',
        terms: 'You need to agree with the terms & conditions.',
        duplicate_email: 'Email was already registered',
        duplicate_username: 'Username is already taken',
        sameaspassword: 'Passwords must be identical',
      }
    },
  },
};

export default messages;
