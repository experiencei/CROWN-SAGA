import { takeLatest, call, put , all} from 'redux-saga/effects';
import UserActionTypes from "./user.type";
import{ googleprovider , createDocument , signInWithGoogle , auth , getCurrentUser}from "../../firebase/firebase.utility";
import{  SignInSuccess, SignInFailure} from "./user.actions."

export function* onUserAuthchange(userAuth){
    try {
const userRef = yield call( createDocument ,userAuth);
const snapShot = yield userRef.get();
yield put(SignInSuccess({
   id : snapShot.id,
    ...snapShot.data()
}))
    } catch (error) {
        yield put(SignInFailure(error))
    }
}


export function* userSession(){
  try {
      const userAuth = yield getCurrentUser();
      if(!userAuth) return;
      yield onUserAuthchange(userAuth);
      
  } catch (error) {
      yield put(SignInFailure(error))
  }
}

export function* signInWithGooglepop() {
    try {
const { user } = yield auth.signInWithPopup(googleprovider);
 yield onUserAuthchange(user)
    } catch (error) {
        yield put(SignInFailure(error))
    }
}

export function* signInWithEmail({payload :{ email , password}}) {
    try {
    const { user } = yield auth.signInWithEmailAndPassword( email , password);
      yield onUserAuthchange(user)
    } catch (error) {
        yield put(SignInFailure(error))
    }
}
export function* onGooglesignin() {
    yield takeLatest(
        UserActionTypes.GOOGLE_SIGN_IN_START,
        signInWithGooglepop
    )
}
export function* onEmailsignin() {
    yield takeLatest(
        UserActionTypes.EMAIL_SIGN_IN_START,
        signInWithEmail
    )
}
export function* onCheckUsersession() {
    yield takeLatest(
        UserActionTypes.CHECK_USER_SESSION,
        userSession
    )
}

export function* userSagas() {
    yield all([call(onGooglesignin) , call(onEmailsignin) , call(onCheckUsersession)])
}