import { configureStore, combineReducers } from '@reduxjs/toolkit'
import skillsets from './skillsets'
import update from './update'

const rootReducers = combineReducers({
  skillsets,
  update
})

export const store = configureStore({
  reducer: rootReducers
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch