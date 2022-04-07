import { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '../auth/initFirebase'
import {
  setUserCookie,
} from './userCookies'
import { mapUserData } from './mapUserData'

initFirebase()
export async function getAnonymousUser(callback) {
  let gotUser = false;
  firebase.auth().onIdTokenChanged((user) => {
    //console.log("onIdTokenChanged ", user)
    if (user) {
      const userData = mapUserData(user)
      setUserCookie(userData)
      callback && callback(userData)
      // console.log("Done");
      gotUser = true
    }
  })
  if (!gotUser) {
    // console.log("Kkk load user then")
    await firebase.auth().signInAnonymously().then(({user}) => {
      // console.log("signInAnonymously ", user)
      if (user) {
        const userData = mapUserData(user)
        setUserCookie(userData)
        callback && callback(userData)
      }
    })
  }
}
const useUser = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    getAnonymousUser((user) => {
      setUser(user)
    });
    // const userFromCookie = getUserFromCookie()
    // if (userFromCookie&&!(Object.keys(userFromCookie).length === 0 && userFromCookie.constructor === Object)) {
    //   getAnonymousUser((user) => {
    //     setUser(user)
    //   });
    //   return
    // }
    // setUser(userFromCookie)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { user }
}

export { useUser }