
// The bad numbers have the following meaning:
//  0: Badge is clear.
// -1: Badge is a flag.
// >0: Badge is an integer value.
badgeCount = 0;
timerFunc = undefined;

function $(id) {
  return document.getElementById(id);
}

function readBadgeCount() {
  badgeCount = localStorage.getItem('badge-count');
}

function writeBadgeCount() {
  localStorage.setItem('badge-count', badgeCount);
}

function setStatus(tag_id, status) {
  $(tag_id).innerHTML = status;
}

function call(func, status_id, success_status) {
  try {
    func().then( () => {
      setStatus(status_id, success_status);
    }, (error) => {
      setStatus(status_id, error);
    });
  } catch (e) {
    setStatus(status_id, e);
  }
}

function updateBadges() {
  var value = badgeCount;
  if (value == -1) {
    value = undefined;
  }
  call( () => {return navigator.setAppBadge(value);}, "app_status", value);
  call( () => {return navigator.setClientBadge(value);}, "client_status", value);
}

function incrementBadge() {
  if (badgeCount == 0) {
    badgeCount = -1;
  } else if (badgeCount == -1) {
    badgeCount = 1;
  } else {
    badgeCount++;
    if (badgeCount > 150) {
      badgeCount = 0;
    }
  }
  writeBadgeCount();
  updateBadges();
}

// Called by HTML button.
function updateBadge() {
  incrementBadge();
  if (timerFunc) {
    clearInterval(timerFunc);
    timerFunc = undefined;
  }
  timerFunc = setInterval(incrementBadge, 100);
}

function clearBadge() {
  if (timerFunc) {
    clearInterval(timerFunc);
    timerFunc = undefined;
  }
  badgeCount = 0;
  writeBadgeCount();
  call( () => {return navigator.clearAppBadge();}, "app_status", "cleared");
  call( () => {return navigator.clearClientBadge();}, "client_status", "cleared");
}

window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }

  readBadgeCount();
  console.log(`Initial badge count: ${badgeCount}`);
  updateBadges();
}
