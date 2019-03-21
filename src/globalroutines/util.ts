import { UserStore } from '../store/Modules'
import messages from '../statics/i18n'

function translate(params) {
  const msg = params.split('.')
  const lang = UserStore.state.lang

  const stringa = messages[lang]

  let ris = stringa
  if (!!ris) {
    msg.forEach((param) => {
      ris = ris[param]
    })
  } else {
    console.log('ERRORE IN TRANSLATE! ', params, ' NON ESISTE!')
    return params
  }

  return ris
}

export default translate
