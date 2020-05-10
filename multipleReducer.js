const redux = require('redux');
const createStore = redux.createStore;
const combineReducer = redux.combineReducers

const initialCakeState = {
    numOfCakes: 20,}

const initialIceCreamState = {
    numOfIceCream: 30    
}

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICE_CREAM = 'BUY_ICE_CREAM';

const buyCake = () => {
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

const buyIceCream = () => {
    return {
        type: BUY_ICE_CREAM,
        info: 'Second redux action'
    }
}

const cakeReducer = (state = initialCakeState, action) => {

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

const iceCreamReducer = (state = initialIceCreamState, action) => {

    switch(action.type) { 
        case BUY_ICE_CREAM:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream - 1
            }
        default:
            return state
    }
}

const rootReducer = combineReducer({
    cake: cakeReducer, 
    iceCreme: iceCreamReducer
})

const store = createStore(rootReducer);
console.log('Initial state', store.getState())
const unsubscribe =  store.subscribe(() => {
    console.log('Update state', store.getState())
})

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()
