self.addEventListener('install', event => {
  console.log('SW Installed');
});

self.addEventListener('activate', event => {
  console.log('SW activated');
});

self.addEventListener('message', function(event) {
  console.log('Handling message event:', event);
  const CACHE_NAME = 'test';
  var p = caches.open(CACHE_NAME).then(function(cache) {
    switch (event.data.command) {
      case 'add':
        var request = new Request(event.data.url, {mode: 'no-cors'});
        return fetch(request).then(function(response) {
          return cache.put(event.data.url, response);
        }).then(function() {
          event.ports[0].postMessage({
            error: null
          });
        });

      case 'delete':
        return cache.delete(event.data.url);

      case 'deleteCache':
        cache = undefined;
        return caches.delete(CACHE_NAME);

      default:
        // This will be handled by the outer .catch().
        throw Error('Unknown command: ' + event.data.command);
    }
  });

  // Beginning in Chrome 51, event is an ExtendableMessageEvent, which supports
  // the waitUntil() method for extending the lifetime of the event handler
  // until the promise is resolved.
  if ('waitUntil' in event) {
    event.waitUntil(p);
  }

  // Without support for waitUntil(), there's a chance that if the promise chain
  // takes "too long" to execute, the service worker might be automatically
  // stopped before it's complete.
});
