const publicVapidKey =
  'BFtiMT4WL2R3NLZUhmAx6VVB7u1Cdyiuk9qfYCKqniRSDbaNjSxPHL59heV6Ov0ayhUjd14Zy_Bu3p16nNoG4lM';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

//check if the serveice worker can work in the current browser
if ('serviceWorker' in navigator) {
  send().catch((err) => console.error(err));
}

//register the service worker, register our push api, send the notification
async function send() {
  //register service worker
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/',
  });

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });

  await fetch('/api/push/subscribe', {
    method: 'POST',
    body: JSON.stringify({
      ...subscription.toJSON(),
      client: navigator.userAgent,
    }),
    headers: {
      'content-type': 'application/json',
    },
  });
}
