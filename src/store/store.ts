import { configureStore, combineReducers } from '@reduxjs/toolkit'
import skillsets from './skillsets'
import edit from './edit'

const rootReducers = combineReducers({
  skillsets,
  edit
})

export const store = configureStore({
  reducer: rootReducers
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch