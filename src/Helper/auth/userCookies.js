  
import Cookies from 'js-cookie'

export const getUserFromCookie = () => {
  const cookie = Cookies.get('auth');
  // console.log("JSON.parse(cookie)",JSON.parse(cookie))
  if (!cookie) {
    return
  }
  return JSON.parse(cookie)
}

export const setUserCookie = (user) => {
  // console.log("user",user)
  Cookies.set('auth', user, {
    // firebase id tokens expire in one hour
    // set cookie expiry to match
    expires: 1 / 24,
  })
}

export const removeUserCookie = () => Cookies.remove('auth')