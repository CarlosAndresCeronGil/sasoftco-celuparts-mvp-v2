import { Card, CardBody } from 'reactstrap';
import ThreeColumn from '../../../components/threeColumn/ThreeColumn';
import EmailList from '../../../components/apps/email/EmailList';
import EmailFilter from '../../../components/apps/email/EmailFilter';
import EmailSearch from '../../../components/apps/email/EmailSearch';
import EmailDetails from '../../../components/apps/email/EmailDetails';

const Email = () => {
  return (
    <Card>
      <CardBody>
        <ThreeColumn
          leftContent={<EmailFilter />}
          middleContent={
            <>
              <EmailSearch />
              <EmailList />
            </>
          }
          rightContent={<EmailDetails />}
        />
      </CardBody>
    </Card>
  );
};

export default Email;
