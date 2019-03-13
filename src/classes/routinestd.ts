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
    }).catch(() => {
      return false
    })
  } catch (e) {
    return false
  }
}
