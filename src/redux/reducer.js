const initialState = {
    username: '',
    profilePic: ''
}

// ACTION STRINGS
const UPDATE_USER = 'UPDATE_USER';
const LOGOUT = 'LOGOUT'

// ACTION BUILDERS
export function updateUser(user){
    return {
        type: UPDATE_USER,
        payload: {
            username: user.username,
            profilePic: user.profilePic
        }
    }
}
export function logout(){
    return{
        type: LOGOUT
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case UPDATE_USER:
            const{ username, profilePic} = action.payload
            return {...state, username, profilePic}

        case LOGOUT:
            return {...state, username: '', profilePic: ''}
        default:
            return state
    }
}