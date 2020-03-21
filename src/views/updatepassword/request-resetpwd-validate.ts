import { ISignupOptions } from 'model'
import { email, minLength, required, sameAs } from 'vuelidate/lib/validators'
// import { ValidationRuleset } from 'vuelidate'
import { complexity, registeredemail, registereduser, aportadorexist } from '../../validation'

export const validations = {
  form: {
    repeatPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    password: {
      required,
      minLength: minLength(8),
      complexity
    }
  }
}
