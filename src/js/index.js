import { isEmpty, setCookie, getCookie } from './utils';
import { USER_ID, KEY_ENTER } from './const';
import { Datacenter, datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: 'dc6509e5-98bf-465c-a300-9527336d17c9',
    clientToken: 'pubbc27149433c49e8b9fb34fd70c4d3667',
    site: 'datadoghq.com',
    service: 'sendboard-app',
    env: 'heroku-demo',
    sampleRate: 100,
    trackInteractions:true,
});

const userIdEl = document.querySelector('#user_id');
const nicknameEl = document.querySelector('#user_nickname');
const buttonEl = document.querySelector('#login-button');

document.addEventListener('DOMContentLoaded', () => {
  const cookieUserId = getCookie(USER_ID);
  if (cookieUserId) {
    userIdEl.value = cookieUserId;
  }
});

nicknameEl.addEventListener('keydown', e => {
  if (e.which === KEY_ENTER) {
    login();
  }
});

buttonEl.addEventListener('click', () => {
  login();
});

const login = () => {
  const userId = userIdEl.value.trim();
  const nickname = nicknameEl.value.trim();
  if (isEmpty(nickname)) {
    alert('Please enter user nickname');
    return;
  }
  userIdEl.value = '';
  nicknameEl.value = '';
  setCookie(USER_ID, userId);
  window.location.href = `chat.html?userid=${encodeURIComponent(userId)}&nickname=${encodeURIComponent(nickname)}`;
};
