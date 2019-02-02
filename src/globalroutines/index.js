import indexdb from './indexdb'

export default async (context, cmd, table, data, id = '') => {
  console.log('globalroutines', cmd, table, data, id)
  return await indexdb(context, cmd, table, data, id)
}
