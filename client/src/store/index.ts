import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth";
import storage from "redux-persist/lib/storage";
import { PERSIST, persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
});

// export default store;
export const persistor = persistStore(store);
