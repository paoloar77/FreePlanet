import { ISignupOptions } from 'model'
import { email, minLength, required, sameAs } from 'vuelidate/lib/validators'
// import { ValidationRuleset } from 'vuelidate'
import { complexity, registeredemail, registereduser } from '../../validation'

export interface TSignup { signup: ISignupOptions, validationGroup: string[] }

export const validations = {
    signup: {
       repeatPassword: {
            required,
            sameAsPassword: sameAs('password')
        },
        password: {
          complexity,
          required,
          minLength: minLength(8)
        },
        username: {
          registereduser,
          required,
          minLength: minLength(6)
        },
        name: {
          required
        },
        surname: {
          required
        },
        email: {
          email,
          registeredemail,
          required
        },
        terms: {
         required
        }
    }
}
