import { configureStore } from '@reduxjs/toolkit';
import {authReducer,chatReducer} from '../src/components/features/auth/authSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,

    // Add more reducers as needed
  },
});
