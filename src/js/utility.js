console.log('utility.js')

// var dbPromise = idb.open('mydb1', 1, function (db) {
//   console.log('OPEN MYDB')
//   if (!db.objectStoreNames.contains('todos')) {
//     db.createObjectStore('todos', { keyPath: '_id' });
//   }
//   if (!db.objectStoreNames.contains('config')) {
//     db.createObjectStore('config', { keyPath: '_id' });
//   }
// });


// function readAllData(st) {
//   console.log('readAllData', st);
//   return dbPromise
//     .then(function (db) {
//       var tx = db.transaction(st, 'readonly');
//       var store = tx.objectStore(st);
//       return store.getAll();
//     });
// }

// function clearAllData(st) {
//   console.log('clearAllData', st);
//   return dbPromise
//     .then(function (db) {
//       var tx = db.transaction(st, 'readwrite');
//       var store = tx.objectStore(st);
//       store.clear();
//       return tx.complete;
//     });
// }

// function deleteItemFromData(st, id) {
//   console.log('deleteItemFromData', st, 'ID:', id);
//   dbPromise
//     .then(function (db) {
//
//       var tx = db.transaction(st, 'readwrite');
//       var store = tx.objectStore(st);
//
//       try {
//         store.delete(id);
//         return tx.complete;
//       } catch (e) {
//         return false;
//       }
//     })
//     .then(function (res) {
//       if (res)
//         console.log('Item deleted!');
//     });
// }

function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  var blob = new Blob([ab], { type: mimeString });
  return blob;
}
