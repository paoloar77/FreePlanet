// Start Open Web Analytics Tracker
export default ({ app, router, store, Vue }) => {
  console.log('Track 1')
  function geturl() {
    const miaurl = document.location.href

    if (miaurl.includes('test.')) {
      return 'https://test.freeplanet.app/'
    } else {
      if (miaurl.includes('localhost')) {
        return 'http://localhost:8080/'
      } else {
        return 'https://freeplanet.app/'
      }
    }
  }

  let owa_cmds

  if (owa_cmds) {
    owa_cmds = owa_cmds || []
  }
  else {
    owa_cmds = []
  }

  let idsite = ''
  if (process.env.PROD) {
    idsite = '9853abef079fc8330ab188a9cbf07a0c'
  } else {
    // TEST
    idsite = '4c40a07bc88a9c50c9b70dc9c5cd8e2e'
  }

  owa_cmds.push(['setSiteId', idsite])
  owa_cmds.push(['trackPageView'])
  owa_cmds.push(['trackClicks'])

  const owa_baseUrl = geturl() + 'owa/'
  console.log('*******  setTrack', 'owa_baseUrl:', owa_baseUrl)
  const _owa = document.createElement('script')
  _owa.type = 'text/javascript'
  _owa.async = true

  // owa_baseUrl = ('https:' === document.location.protocol ? window.owa_baseSecUrl || owa_baseUrl.replace(/http:/, 'https:') : owa_baseUrl)

  _owa.src = owa_baseUrl + 'modules/base/js/owa.tracker-combined-min.js'
  const _owa_s = document.getElementsByTagName('script')[0]
  _owa_s.parentNode.insertBefore(_owa, _owa_s)
}
