import { tools } from '../store/Modules/tools'

import { RouteNames } from '../router/route-names'

export default function auth({ next, router }) {
  const tok = tools.getItemLS(tools.localStorage.token)
  if (!tok) {
    return router.push({ name: RouteNames.login })
  }

  return next()
}
