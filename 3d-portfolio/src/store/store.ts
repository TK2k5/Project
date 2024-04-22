import { configureStore } from '@reduxjs/toolkit'
import { experienceApi } from './services/experience.service'
import { projectApi } from './services/project.service'
import { setupListeners } from '@reduxjs/toolkit/query'

// ...
const middlewares = [projectApi.middleware, experienceApi.middleware]

export const store = configureStore({
  reducer: {
    [projectApi.reducerPath]: projectApi.reducer,
    [experienceApi.reducerPath]: experienceApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares)
})

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
