import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chats: [],
  selectedChat: null,
  notification: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats(state, action) {
      state.chats = action.payload;
    },
    setSelectedChat(state, action) {
      state.selectedChat = action.payload;
    },
    setNotification(state, action) {
      state.notification = action.payload;
    },
    addNotification(state, action) {
      state.notification.push(action.payload);
    },
    removeNotification(state, action) {
      state.notification = state.notification.filter(n => n !== action.payload);
    }, addChat(state, action) {
      state.chats.unshift(action.payload);
    }, updateSelectedChat(state, action) {
      state.selectedChat = { ...state.selectedChat, ...action.payload };
    },
  },
});

export const {
  updateSelectedChat,
  addChat,
  setChats,
  setSelectedChat,
  setNotification,
  addNotification,
  removeNotification,
} = chatSlice.actions;

export default chatSlice.reducer;
