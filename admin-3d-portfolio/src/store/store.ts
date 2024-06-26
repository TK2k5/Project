import { certificateApi } from './services/certificate.service';
import certificateReducer from './slice/certificate.slice';
import { configureStore } from '@reduxjs/toolkit';
import { experienceApi } from './services/experience.service';
import experienceReducer from './slice/experience.slice';
import { projectApi } from './services/project.service';
import projectReducer from './slice/project.slice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { skillApi } from './services/skill.service';
import skillReducer from './slice/skill.slice';
import { socialApi } from './services/social.service';
import socialReducer from './slice/social.slice';

const middleware = [
  skillApi.middleware,
  projectApi.middleware,
  experienceApi.middleware,
  certificateApi.middleware,
  socialApi.middleware,
];

export const store = configureStore({
  reducer: {
    // skillApi
    [skillApi.reducerPath]: skillApi.reducer,
    skill: skillReducer,
    // projectApi
    [projectApi.reducerPath]: projectApi.reducer,
    project: projectReducer,
    // experienceApi
    [experienceApi.reducerPath]: experienceApi.reducer,
    experience: experienceReducer,

    [certificateApi.reducerPath]: certificateApi.reducer,
    certificate: certificateReducer,

    [socialApi.reducerPath]: socialApi.reducer,
    social: socialReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
