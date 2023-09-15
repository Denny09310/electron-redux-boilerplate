import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { createHashHistory } from 'history'
import { createReduxHistoryContext } from 'redux-first-history'

import { api } from './api'

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createHashHistory(),
})

export const store = configureStore({
  reducer: {
    router: routerReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([routerMiddleware, api.middleware]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)

export const history = createReduxHistory(store)
