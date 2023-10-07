import { combineReducers, configureStore} from "@reduxjs/toolkit";

import { persistReducer,persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

import userStatusSliceReducer from "./users_data";



const persistConfig ={
    timeout:1000,
    key:'root',
    version:1,
    storage,
}


const reducer = combineReducers({
    userData:userStatusSliceReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer:persistedReducer,
    middleware:[thunk],
})

export const persistor = persistStore(store)
