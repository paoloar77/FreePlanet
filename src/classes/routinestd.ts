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
