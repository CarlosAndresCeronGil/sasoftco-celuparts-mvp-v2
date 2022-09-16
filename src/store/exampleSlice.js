import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: [],
  notesContent: 0,
  noteSearch: '',
};

export const NotesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    SearchNotes: (state, action) => {
      state.noteSearch = action.payload;
    },
    SelectNote: (state, action) => {
      state.notesContent = action.payload;
    },
  },
});

export const { SearchNotes } = NotesSlice.actions;

export default NotesSlice.reducer;
