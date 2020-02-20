
badgeCount = 0;
timerFunc = undefined;

window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }
}

function incrementBadge() {
  badgeCount++;
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
}

function updateBadge() {
  incrementBadge();
  if (timerFunc) {
    clearInterval(timerFunc);
  }
  timerFunc = setInterval(incrementBadge, 100);
}

function clearBadge() {
  if (timerFunc) {
    clearInterval(timerFunc);
  }
  try {
    navigator.clearAppBadge();
    console.log("The app badge is cleared.");
  } catch (e) {
    console.warn('Unable to clear the app badge.');
  }

  try {
    navigator.setClientBadge(badgeCount);
    console.log("The client badge is cleared.");
  } catch (e) {
    console.warn('Unable to clear the client badge.');
  }
  badgeCount = 0;
}
