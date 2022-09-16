import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from 'reactstrap';
import NoteListItem from './NoteListItem';
import { fetchNotes, SelectNote, DeleteNote } from '../../../store/apps/notes/NotesSlice';

const NoteList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const filterNotes = (notes, noteSearch) => {
    if (noteSearch !== '')
      return notes.filter(
        (t) =>
          !t.deleted &&
          t.title.toLocaleLowerCase().concat(' ').includes(noteSearch.toLocaleLowerCase()),
      );
    return notes.filter((t) => !t.deleted);
  };

  const notes = useSelector((state) =>
    filterNotes(state.notesReducer.notes, state.notesReducer.noteSearch),
  );
  const active = useSelector((state) => state.notesReducer.notesContent);

  return (
    <Nav>
      {notes && notes.length
        ? notes.map((note) => (
            <NoteListItem
              key={note.id}
              {...note}
              active={active}
              onClick={() => dispatch(SelectNote(note.id))}
              onDeleteClick={() => dispatch(DeleteNote(note.id))}
              noteTitle={note.title}
              noteColor={note.color}
              noteDatef={new Date(note.datef).toLocaleDateString({
                weekday: 'short',
                year: 'numeric',
                month: 'short',
              })}
            />
          ))
        : 'no notes'}
    </Nav>
  );
};

export default NoteList;
