import indexdb from './indexdb'

export default async (context, cmd, table, data = null) => {
  console.log('globalroutines', cmd, table, data)
  return await indexdb(context, cmd, table, data)
}
