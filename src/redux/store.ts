// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './services/usersApi';
import { authApi } from './services/authApi';

// Configura el store
const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(authApi.middleware), // Agrega el middleware de authApi
});

// Exporta el store para usar en tu aplicación
export default store;
