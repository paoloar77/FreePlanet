import { IUserProfile } from '@src/model/UserStore'

export interface ISignupOptions {
  email?: string
  username: string
  name?: string
  surname?: string
  password?: string
  lang?: string
  repeatPassword?: string
  terms?: boolean
  aportador_solidario?: string
  profile?: IUserProfile
  already_registered: boolean
}
