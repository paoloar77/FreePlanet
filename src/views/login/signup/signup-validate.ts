import { ISignupOptions } from '@/model'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import { ValidationRuleset } from 'vuelidate'
import { complexity, registered } from '@/validation'

export type TSignup = { signup: ISignupOptions, validationGroup: string[] }

export const validations = {
    signup: {
       repeatPassword: {
            required,
            sameAsPassword: sameAs('password')
        },
        password: {
            required,
            complexity
        },
        username: {
            required,
            registered
        },
        email: {
          required,
          email
        },
        terms: {
         required
        }
    }
}
