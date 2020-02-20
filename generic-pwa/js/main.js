
badgeCount = 1;

window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }
}

function incrementBadge() {
  try {
    navigator.setAppBadge(badgeCount);
    console.log(`Set the app badge to ${badgeCount}.`);
  } catch (e) {
    console.warn('Unable to set the app badge.');
  }

  try {
    navigator.setClientBadge(badgeCount);
    console.log(`Set the client badge to ${badgeCount}.`);
  } catch (e) {
    console.warn('Unable to set the client badge.');
  }
  badgeCount++;
}
