import { configureStore, combineReducers } from '@reduxjs/toolkit'
import skillsets from './skillsets'

const rootReducers = combineReducers({
  skillsets: skillsets
})

export const store = configureStore({
  reducer: rootReducers
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch