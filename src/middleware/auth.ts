import { tools } from '../store/Modules/tools'

export default function auth({ next, router }) {
  const tok = tools.getItemLS(tools.localStorage.token)
  if (!tok) {
    return router.push({ name: 'login' })
  }

  return next()
}
