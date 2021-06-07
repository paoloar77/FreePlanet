import indexdb from './indexdb'
import { GlobalStore } from '../store/Modules'

export default async (context, cmd, table, data = null, id = '') => {
  // const descr = data !== null ? data.descr : ''
  // console.log('globalroutines', cmd, table, descr, id)
  return indexdb(context, cmd, table, data, id)
    .then((ris) => {
        // console.log('GlobalStore.state.connData', GlobalStore.state.connData)

        setTimeout(() => {
          GlobalStore.state.connData.uploading_indexeddb = 0
          GlobalStore.state.connData.downloading_indexeddb = 0
        }, 1000)
        return ris
      }
    ).catch((err) => {
      setTimeout(() => {
        GlobalStore.state.connData.uploading_indexeddb = (GlobalStore.state.connData.uploading_indexeddb === 1) ? -1 : GlobalStore.state.connData.uploading_indexeddb
        GlobalStore.state.connData.downloading_indexeddb = (GlobalStore.state.connData.downloading_indexeddb === 1) ? -1 : GlobalStore.state.connData.downloading_indexeddb
      }, 1000)

      console.log('ERROR INDEXEDDB: ', err)
    })
}
