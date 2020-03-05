
badgeCount = 0;
timerFunc = undefined;

window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }
}

function $(id) {
  return document.getElementById(id);
}

function setStatus(tag_id, status) {
  $(tag_id).innerHTML = status;
}

function call(func, status_id, success_status) {
  try {
    func().then( (status) => {
      setStatus(status_id, success_status);
    }, (error) => {
      setStatus(status_id, error);
    });
  } catch (e) {
    setStatus(status_id, e);
  }
}

function incrementBadge() {
  badgeCount++;
  call( () => {return navigator.setAppBadge(badgeCount);}, "app_status", badgeCount);
  call( () => {return navigator.setClientBadge(badgeCount);}, "client_status", badgeCount);
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
  call( () => {return navigator.clearAppBadge(badgeCount);}, "app_status", "cleared");
  call( () => {return navigator.clearClientBadge(badgeCount);}, "client_status", "cleared");
  badgeCount = 0;
}
