export async function askConfirm($q: any, mytitle, mytext, ok, cancel) {
  try {
    return await $q.dialog({
      cancel: {
        label: cancel
      },
      message: mytext,
      ok: {
        label: ok,
        push: true
      },
      title: mytitle
    }).onOk(() => {
      console.log('OK')
      return true
    }).onCancel(() => {
      console.log('CANCEL')
      return false
    })
  } catch (e) {
    return false
  }
}
