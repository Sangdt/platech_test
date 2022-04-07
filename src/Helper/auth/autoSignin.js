import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '../auth/initFirebase'
import {
    removeUserCookie,
    setUserCookie,
    getUserFromCookie,
} from './userCookies'
import { mapUserData } from './mapUserData'


initFirebase()


const signinAnonymously =async () => {
   await firebase.auth().signInAnonymously().then(({user}) => {
        if (user) {
            //console.log("anonymousUser",user)
            const userData = mapUserData(user)
            console.log("anonymousUser",userData)

            setUserCookie(userData)
        }
    })
}

export default signinAnonymously;