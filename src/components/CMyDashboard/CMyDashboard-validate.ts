import { ISignupOptions } from 'model'
import { email, minLength, required, sameAs } from 'vuelidate/lib/validators'
// import { ValidationRuleset } from 'vuelidate'
import { complexity, registeredemail, registereduser, aportadorexist } from '../../validation'

export const validations = {

  invitante_username: {
    aportadorexist,
    required
  }
}
