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

function getidtrack() {
  const miaurl = document.location.href

  if (miaurl.includes('test.') || miaurl.includes('localhost')) {
    return '4c40a07bc88a9c50c9b70dc9c5cd8e2e'
  } else {
    return '9853abef079fc8330ab188a9cbf07a0c'
  }
}


var owa_baseUrl = geturl() + 'owa/';
if (owa_cmds)
  var owa_cmds = [];
else
  var owa_cmds = owa_cmds || [];
owa_cmds.push(['setSiteId', getidtrack()]);
owa_cmds.push(['trackPageView']);
// owa_cmds.push(['trackClicks']);

(function () {
  var _owa = document.createElement('script');
  _owa.type = 'text/javascript';
  _owa.async = true;
  owa_baseUrl = ('https:' == document.location.protocol ? window.owa_baseSecUrl || owa_baseUrl.replace(/http:/, 'https:') : owa_baseUrl);
  _owa.src = owa_baseUrl + 'modules/base/js/owa.tracker-combined-min.js';
  var _owa_s = document.getElementsByTagName('script')[0];
  _owa_s.parentNode.insertBefore(_owa, _owa_s);
}());
