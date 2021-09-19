import { UserActionTypes } from "./user.type";

const initialState = {
    currentuser : null
}


const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case UserActionTypes.SET_CURRENT_USER:
        return { ...state,
            currentuser:payload }
            
    default:
        return state
    }
}

export default userReducer;