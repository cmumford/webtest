async function setCookie() {
  // --enable-blink-features=CookieStore
  //await cookieStore.set({ name: 'worker', value: 'Worker Value' });
}
onmessage = function(e) {
  console.log('Message received from main script');
  var url = e.data[0];
  var async = e.data[1];


  var oReq = new XMLHttpRequest();
  oReq.onreadystatechange = function() {
    switch (oReq.readyState) {
      case XMLHttpRequest.UNSENT:
        break;
      case XMLHttpRequest.OPENED:
        break;
      case XMLHttpRequest.HEADERS_RECEIVED:
        break;
      case XMLHttpRequest.LOADING:
        break;
      case XMLHttpRequest.DONE:
        if (oReq.status === 200) {
          postMessage('Result: Success: ' + url);
          console.log('worker success.');
        } else {
          postMessage('Result: Error: ' + oReq.status);
          console.log('worker error.');
        }
        break;
    }
  };
  oReq.open("GET", url, async);
  setCookie()
  oReq.send();
  setCookie()
}
