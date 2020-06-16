import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import books from './ducks/books';
import { AppState } from './types';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ['books'],
  // Blacklist (Don't Save Specific Reducers)
  // blacklist: ['counterReducer'],
};

const rootReducer = combineReducers<AppState>({
  books,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);

export default store;
