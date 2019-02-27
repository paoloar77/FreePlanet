import { UserStore } from "../store/Modules";
import messages from "../assets/i18n";

function translate(params) {
  let msg = params.split('.')
  let lang = UserStore.state.lang

  let stringa = messages[lang]

  let ris = stringa
  if (ris !== undefined) {
    msg.forEach(param => {
      ris = ris[param]
    })
  } else {
    console.log('ERRORE IN TRANSLATE! ', params, ' NON ESISTE!')
    return params
  }

  return ris
}

export default translate
