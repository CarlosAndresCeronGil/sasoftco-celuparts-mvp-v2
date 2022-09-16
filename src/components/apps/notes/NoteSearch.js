import React from 'react';
import { Form, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { SearchNotes } from '../../../store/apps/notes/NotesSlice';

const NoteSearch = () => {
  const searchTerm = useSelector((state) => state.notesReducer.noteSearch);

  const dispatch = useDispatch();

  return (
    <div className="p-3 border-bottom">
      <Form>
        <div className="position-relative has-icon-left">
          <Input
            className="form-control"
            id="searchNote"
            name="searchNote"
            type="text"
            onChange={(e) => dispatch(SearchNotes(e.target.value))}
            value={searchTerm}
            placeholder="Search Notes..."
          />
        </div>
      </Form>
    </div>
  );
};

export default NoteSearch;
