export function getCookie(name: string) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // Check if this cookie name matches the requested name
    if (cookie.startsWith(name + '=')) {
      // Return the cookie value after removing the name=
      return cookie.substring(name.length + 1);
    }
  }
  return ''; // Return an empty string if cookie not found
}
