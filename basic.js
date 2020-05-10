const redux = require('redux');
// Step 1 : create redux store object 
const createStore = redux.createStore;

// Step 2: define initail state
const initialState = {
    numOfCakes: 20
}

// step 3: define action creator
const BUY_CAKE = 'BUY_CAKE';
const buyCake = () => {
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

// step 4 : define reducer
const reducer = (state = initialState, action) => {

    switch(action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        default:
            return state
    }
}

// step 5 : map reducer to createStore
const store = createStore(reducer);
console.log('Initial state', store.getState())
const unsubscribe =  store.subscribe(() => {
    console.log('Update state', store.getState())
})

// step 6: call dispatch action
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
unsubscribe()
