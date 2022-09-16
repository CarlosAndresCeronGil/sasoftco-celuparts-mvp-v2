import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const API_URL = '/api/data/notes/NotesData';

const initialState = {
  notes: [],
  notesContent: 1,
  noteSearch: '',
};

export const NotesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    getNotes: (state, action) => {
      state.notes = action.payload;
    },
    SearchNotes: (state, action) => {
      state.noteSearch = action.payload;
    },
    SelectNote: (state, action) => {
      state.notesContent = action.payload;
    },

    DeleteNote(state, action) {
      const index = state.notes.findIndex((note) => note.id === action.payload);
      state.notes.splice(index, 1);
    },

    UpdateNote: {
      reducer: (state, action) => {
        state.notes = state.notes.map((note) =>
          note.id === action.payload.id
            ? { ...note, [action.payload.field]: action.payload.value }
            : note,
        );
      },
      prepare: (id, field, value) => {
        return {
          payload: { id, field, value },
        };
      },
    },

    addNote: {
      reducer: (state, action) => {
        state.notes.push(action.payload);
      },
      prepare: (id, title, color) => {
        return { payload: { id, title, color, datef: new Date().toDateString(), deleted: false } };
      },
    },
  },
});

export const { SearchNotes, getNotes, SelectNote, DeleteNote, UpdateNote, addNote } =
  NotesSlice.actions;

export const fetchNotes = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getNotes(response.data));
  } catch (err) {
    throw new Error(err);
  }
};

export default NotesSlice.reducer;
