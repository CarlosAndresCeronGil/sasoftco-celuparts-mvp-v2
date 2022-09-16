import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const API_URL = '/api/data/chat/ChatData';

const initialState = {
  chats: [],
  chatContent: 1,
  chatSearch: '',
};

export const ChatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    getChats: (state, action) => {
      state.chats = action.payload;
    },
    SearchChat: (state, action) => {
      state.chatSearch = action.payload;
    },
    SelectChat: (state, action) => {
      state.chatContent = action.payload;
    },
    sendMsg: {
      reducer: (state, action) => {
        state.chats = state.chats.map((chat) =>
          chat.id === action.payload.id
            ? {
                ...chat,
                ...chat.chatHistory[0][1].to.push(action.payload.chatMsg),
              }
            : chat,
        );
      },

      prepare: (id, chatMsg) => {
        return {
          payload: { id, chatMsg },
        };
      },
    },
  },
});

export const { SearchChat, getChats, sendMsg, SelectChat } = ChatSlice.actions;

export const fetchChats = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getChats(response.data));
  } catch (err) {
    throw new Error(err);
  }
};

export default ChatSlice.reducer;
