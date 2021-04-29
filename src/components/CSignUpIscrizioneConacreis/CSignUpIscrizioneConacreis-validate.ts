import { ISignupIscrizioneConacreisOptions } from 'model'
import { email, minLength, required, sameAs } from 'vuelidate/lib/validators'

export interface ISignupConacreis {
  signup: ISignupIscrizioneConacreisOptions,
  validationGroup: string[]
}

export const validations = {
  signup: {
    name: {
      required
    },
    surname: {
      required
    },
    email: {
      email,
      required
    },
    fiscalcode: {
      required,
      minLength: minLength(16)
    },
    residency_address: {
      required
    },
    residency_city: {
      required
    },
    residency_province: {
      required
    },
    residency_zipcode: {
      required
    },
    dateofbirth: {
      required
    },
    cell_phone: {
      required
    },
    terms: {
      required
    },
  }
}
