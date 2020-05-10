import { toolsext } from '@src/store/Modules/toolsext'
import messages from '../statics/i18n'
import { tools } from '@src/store/Modules/tools'

function translate(params) {
  const msg = params.split('.')
  const lang = toolsext.getLocale()

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
