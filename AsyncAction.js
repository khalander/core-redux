const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
    loading: false,
    users: [],
    errors: ''   
}

const  FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
const  FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const  FETCH_USER_ERROR = 'FETCH_USER_ERROR';

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users
    }
}

const fetchUsersError = error => {
    return {
        type: FETCH_USER_ERROR,
        payload: error
    }
}

const fetchUsersRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USER_SUCCESS:
            return {
                loading: false,
                errors: '',
                users: action.payload
            }
        case FETCH_USER_ERROR:
            return {
                loading: false,
                errors: 'Somothing went wrong',
                users: []
            }
        default:
            return state
    }

}

const fetchUsers = () => {
    return dispatch => {
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                dispatch(fetchUsersSuccess(response.data))
            })
            .catch(error => {
                dispatch(fetchUsersError(error.message))
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => {
    console.log('update', store.getState())
})

store.dispatch(fetchUsers())