function handleGoogleLoad() {
  setTimeout(showAuthWindow, 4000)
}
function showAuthWindow() {
  const clientId = '475065897388-gq0ldd5fgc6o3bhbvunnj3piur1psteq.apps.googleusercontent.com'
  google.accounts.id.initialize({
    client_id: clientId,
    callback: onGoogleSignedIn
  })
  google.accounts.id.prompt(notification => {
    console.log(notification)
  })
}

function onGoogleSignedIn(response) {
  const clientId = response.clientId
  const info = parseJwt(response.credential)
  const photo = info.picture
  const name = info.name
}

function parseJwt (token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}
