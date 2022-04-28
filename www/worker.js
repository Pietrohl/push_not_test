self.addEventListener('push', (e) => {
  const data = e.data.json();
  self.registration.showNotification(
    data.title, // title of the notification
    data,
  );
});
