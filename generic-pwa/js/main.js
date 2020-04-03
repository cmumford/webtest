
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
  call( () => {return navigator.setAppBadge(badgeCount);}, "app_status", badgeCount);
  call( () => {return navigator.setClientBadge(badgeCount);}, "client_status", badgeCount);
}

function incrementBadge() {
  if (badgeCount === 0) {
    badgeCount = undefined;
  } else if (badgeCount === undefined) {
    badgeCount = 1;
  } else {
    badgeCount++;
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
  call( () => {return navigator.clearAppBadge(badgeCount);}, "app_status", "cleared");
  call( () => {return navigator.clearClientBadge(badgeCount);}, "client_status", "cleared");
  badgeCount = 0;
  writeBadgeCount();
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
