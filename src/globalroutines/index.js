import indexdb from './indexdb'

export default async (context, cmd, table, data = null, id = '') => {
  const descr = data !== null ? data.descr : ''
  // console.log('globalroutines', cmd, table, descr, id)
  return await indexdb(context, cmd, table, data, id)
}
