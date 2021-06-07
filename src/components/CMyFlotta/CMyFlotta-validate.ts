import { ISignupOptions } from 'model'
import { email, minLength, required, sameAs } from 'vuelidate/lib/validators'
// import { ValidationRuleset } from 'vuelidate'
import { aportadorexist } from '../../validation'

export const validations = {

  username_sostituire: {
    aportadorexist,
    required
  }
}
