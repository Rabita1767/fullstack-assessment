import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import storage from "redux-persist/lib/storage";
import { PERSIST, persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
});

// export default store;
export const persistor = persistStore(store);
