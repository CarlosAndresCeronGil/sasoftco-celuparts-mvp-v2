import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, FormGroup, Button, Label } from 'reactstrap';
import { UpdateNote, addNote } from '../../../store/apps/notes/NotesSlice';

const colorsBg = [
  {
    bg: 'primary',
  },
  {
    bg: 'success',
  },
  {
    bg: 'danger',
  },
  {
    bg: 'info',
  },
  {
    bg: 'warning',
  },
];

const NoteDetail = () => {
  const noteDetails = useSelector(
    (state) => state.notesReducer.notes[state.notesReducer.notesContent - 1],
  );
  const id = useSelector((state) => state.notesReducer.notes.length + 1);

  const dispatch = useDispatch();

  const handleNote = (e) => {
    e.preventDefault();
    dispatch(addNote(id, 'dummy Title', 'primary'));
  };

  return (
    <div>
      <div className="border-bottom p-3 text-end">
        <Button className="btn btn-success ms-auto" size="sm" onClick={handleNote}>
          Add New Note
        </Button>
      </div>
      {noteDetails && noteDetails.deleted === false ? (
        <div className="p-4">
          <FormGroup>
            <Label for="title1" tag="h5">
              Edit Note
            </Label>
            <Input
              id="title1"
              name="title1"
              type="textarea"
              rows="5"
              value={noteDetails.title}
              onChange={(e) => dispatch(UpdateNote(noteDetails.id, 'title', e.target.value))}
            />
          </FormGroup>
          <br />
          <h5>Change Note color</h5>
          <div className="button-group">
            {colorsBg.map((colorbg) => (
              <Button
                color={colorbg.bg}
                key={colorbg.bg}
                size="sm"
                onClick={() => dispatch(UpdateNote(noteDetails.id, 'color', `${colorbg.bg}`))}
              >
                {noteDetails.color === colorbg.bg ? (
                  <i className="bi bi-check" />
                ) : (
                  <i className="bi bi-circle" />
                )}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div className="d-flex mt-3 p-4 flex-column align-items-center justify-content-center">
          <i className="ti-agenda display-5" />
          <h4 className="mt-2">Please select a Note or Add Note.</h4>
        </div>
      )}
    </div>
  );
};

export default NoteDetail;
