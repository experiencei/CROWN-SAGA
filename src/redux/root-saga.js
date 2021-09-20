import { all , call} from "redux-saga/effects";

import { onFetchCollectionsStart } from "../redux/shop/shop.saga"
import{ userSagas }from "../redux/user/user.sagas"
export default function* rootSaga() {
    yield all([call(onFetchCollectionsStart) , call(userSagas)])
    
}