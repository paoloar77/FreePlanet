import { ISigninOptions } from 'model'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'

export type TSignin = { signin: ISigninOptions, validationGroup: string[] }

export const validations = {
    signin: {
        password: {
            required,
            minLength: minLength(8)
        },
        username: {
            required,
            minLength: minLength(6)
        }
    }
}
