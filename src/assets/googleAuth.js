function handleGoogleLoad() {
  setTimeout(showAuthWindow, 4000)
}
function showAuthWindow() {
  const clientId = '475065897388-gq0ldd5fgc6o3bhbvunnj3piur1psteq.apps.googleusercontent.com'
  google.accounts.id.initialize({
    client_id: clientId
  })
  google.accounts.id.prompt(notification => {
    console.log(notification)
  })
}
