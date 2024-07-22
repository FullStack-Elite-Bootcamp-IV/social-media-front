// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './services/usersApi';
import { authApi } from './services/authApi';
import { favouritesApi } from './services/favouritesApi';
import { postsApi } from './services/postsApi';
import { likesApi } from './services/likesApi';
import { messagesApi } from './services/messagesApi';
import { notificationsApi } from './services/notificationsApi';
import { followersApi } from './services/followersApi';
import { editProfileApi } from './services/editApi';
import { commentsApi } from './services/commentsApi';
import { socialMediaApi } from './services/search';
import { chatApi } from './services/chatApi';

const index = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [favouritesApi.reducerPath]: favouritesApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [likesApi.reducerPath]: likesApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
    [followersApi.reducerPath]: followersApi.reducer,
    [editProfileApi.reducerPath]: editProfileApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [socialMediaApi.reducerPath]: socialMediaApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(authApi.middleware)
      .concat(favouritesApi.middleware)
      .concat(postsApi.middleware)
      .concat(likesApi.middleware)
      .concat(messagesApi.middleware)
      .concat(notificationsApi.middleware)
      .concat(followersApi.middleware)
      .concat(editProfileApi.middleware)
      .concat(commentsApi.middleware)
      .concat(socialMediaApi.middleware)
      .concat(chatApi.middleware)
});

export default index;
