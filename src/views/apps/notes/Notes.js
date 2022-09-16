import { Card, CardBody } from 'reactstrap';
import NoteDetail from '../../../components/apps/notes/NoteDetail';
import NoteList from '../../../components/apps/notes/NoteList';
import NoteSearch from '../../../components/apps/notes/NoteSearch';
import TwoColumn from '../../../components/twoColumn/TwoColumn';
import './notes.scss';

const Notes = () => {
  return (
    <>
      <Card>
        <CardBody>
          <TwoColumn
            leftContent={
              <>
                <NoteSearch />
                <NoteList />
              </>
            }
            rightContent={<NoteDetail />}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default Notes;
