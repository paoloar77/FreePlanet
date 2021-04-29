import * as ApiTables from '@src/store/Modules/ApiTables'

export let idbKeyval = (() => {
  let db;

  function getDB() {
    if (!db) {
      // console.log('CREO DB STORAGE JS !')
      db = new Promise((resolve, reject) => {
        // console.log('open mydb3')
        const openreq = indexedDB.open('mydb3', 12);

        openreq.onerror = () => {
          reject(openreq.error);
        };

        openreq.onupgradeneeded = () => {
          // First time setup: create an empty object store
          for (let mytab of ApiTables.MainTables) {
            openreq.result.createObjectStore(mytab, { keyPath: 'BOMID', autoIncrement: true });
            for (let mymeth of ApiTables.allMethod) {
              const tab = mymeth + mytab
              openreq.result.createObjectStore(tab, { keyPath: 'BOMID', autoIncrement: true });
            }
          }
          for (let mytab of ApiTables.OtherTables) {
            console.log('mytab', mytab);
            openreq.result.createObjectStore(mytab, { keyPath: 'BOMID', autoIncrement: true });
          }
        };

        openreq.onsuccess = () => {
          resolve(openreq.result);
        };
      });
    }
    return db;
  }

  async function withStore(type, table, callback,) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(table, type);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
      callback(transaction.objectStore(table));
    });
  }

  return {
    async get(key) {
      let req;
      await withStore('readonly', 'keyval', store => {
        req = store.get(key);
      });
      return req.result;
    },
    jsonCopy(src) {
      return JSON.parse(JSON.stringify(src));
    },

    async getdata(table, key) {
      let req;

      await withStore('readonly', table, store => {
        // console.log('getdata', table, key)
        req = store.get(key);
      });

      return req.result;
    },
    async getalldata(table) {
      let req;
      await withStore('readonly', table, store => {
        req = store.getAll();
      });
      return req.result;
    },
    async count(table) {
      let req;
      await withStore('readonly', table, store => {
        req = store.count();
      });
      return req.result;
    },
    async set(key, value) {
      let req;
      await withStore('readwrite', 'keyval', store => {
        req = store.put(value, key);
      });
      return req.result;
    },
    async setdata(table, value) {
      let req;

      // console.log('setdata', table, value)
      await withStore('readwrite', table, store => {
        req = store.put(value);
      });
      return req.result;
    },
    async delete(key) {
      return await withStore('readwrite', 'keyval', store => {
        store.delete(key);
      });
    },
    async deletedata(table, key) {
      return await withStore('readwrite', table, store => {
        store.delete(key);
      });
    },
    async clearalldata(table) {
      // console.log('clearalldata', table)
      return await withStore('readwrite', table, store => {
        store.clear();
      });
    }
  };
})();

// iOS add-to-homescreen is missing IDB, or at least it used to.
// I haven't tested this in a while.
if (!self.indexedDB) {
  idbKeyval = {
    get: key => Promise.resolve(localStorage.getItem(key)),
    set: (key, val) => Promise.resolve(localStorage.setItem(key, val)),
    delete: key => Promise.resolve(localStorage.removeItem(key))
  };
}
