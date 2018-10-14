var sendRequest = function (url, method, body)
{
  const options = {
    method: method,
    mode: 'no-cors',
    headers: new Headers({'content-type': 'application/json'}),
    mode: 'no-cors'
  };

  options.body = JSON.stringify(body);

  return fetch(url, options);
}();
