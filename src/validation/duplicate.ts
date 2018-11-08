type t = string | number
type fn = () => t[]

export function duplicate(matches: t[] | fn, ignoreCase: boolean = false): any {
  if (Array.isArray(matches)) return factory(matches, ignoreCase)

  return (value: any) => {
    let cb = factory(matches(), ignoreCase)
    return cb(value)
  }
}

function factory(values: t[], ignoreCase: boolean): any {
  return (value: any) => {
    if (value === undefined || value === null || values.length === 0)
      return true
    else {
      let flags = ignoreCase ? 'i' : ''
      let exp = new RegExp(`^(${value})$`, flags)
      return values.find(o => exp.test(o.toString())) === undefined
    }
  }
}
