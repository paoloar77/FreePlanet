import { Patterns } from '@/common'

export function complexity(password: string) {
    return Patterns.Password.test(password)
}
