export async function askConfirm($q: any, mytitle, mytext, ok, cancel) {
  try {
    return await $q.dialog({
      title: mytitle,
      message: mytext,
      ok: ok,
      cancel: cancel
    }).then((ris) => {
      return true
      // this.$q.notify('Agreed!')
    }).catch(() => {
      return false
      // this.$q.notify('Disagreed...')
    })
  } catch (e) {
    return false
  }
}
