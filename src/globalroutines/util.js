import { UserStore } from "../store/Modules";
import messages from "../statics/i18n";

function translate(params) {
  let msg = params.split('.')
  let lang = UserStore.state.lang

  let stringa = messages[lang]

  let ris = stringa
  msg.forEach(param => {
    ris = ris[param]
  })

  return ris
}

export default translate
