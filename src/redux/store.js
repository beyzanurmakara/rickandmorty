import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import favoriteReducer from './favoriteSlice'
const reducer = combineReducers({
  favorites: favoriteReducer
})
const store = configureStore({
  reducer,
})
export default store;