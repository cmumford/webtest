window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }

  console.log('Adding an app badge.');
  navigator.setAppBadge(1);
  console.log('Added an app badge.');

  console.log('Adding a client badge.');
  navigator.setClientBadge(1);
  console.log('Added a client badge.');
}
