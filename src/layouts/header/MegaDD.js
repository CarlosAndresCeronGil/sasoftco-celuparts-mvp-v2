import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Row,
  Col,
  CardTitle,
  Button,
} from 'reactstrap';

import contact1 from '../../assets/images/users/user1.jpg';
import contact2 from '../../assets/images/users/user2.jpg';
import contact3 from '../../assets/images/users/user3.jpg';

const featureData = [
  {
    id: 1,
    color: 'primary',
    icon: 'chat-dots-fill',
    heading: 'Notifications',
    subtext: 'Real time notifications always keep you up to date.',
  },
  {
    id: 2,
    color: 'success',
    icon: 'file-earmark-text-fill',
    heading: 'Integrations',
    subtext: 'Get started by taking advantage of integrations with other servies.',
  },
  {
    id: 3,
    color: 'danger',
    icon: 'bar-chart-fill',
    heading: 'Analytics',
    subtext: 'Analyze your data to make more informed business decisions.',
  },
  {
    id: 4,
    color: 'info',
    icon: 'lock-fill',
    heading: 'Security',
    subtext: 'To ensure privacy, all information are encrypted and secure.',
  },
];

const contactData = [
  {
    id: 1,
    uimg: contact1,
    uname: 'James Anderson',
  },
  {
    id: 2,
    uimg: contact2,
    uname: 'Michael Jorden',
  },
  {
    id: 3,
    uimg: contact3,
    uname: 'Johnathan Doeting',
  },
];

const MegaDD = () => {
  return (
    <>
      <Row>
        <Col lg="8">
          <CardTitle tag="h4">Features</CardTitle>
          <Row className="mt-4">
            {featureData.map((fdata) => (
              <Col lg="6" key={fdata.id}>
                <ListGroup flush>
                  <ListGroupItem href="#" action tag="a" className="d-flex align-items-start p-3">
                    <Button className="border bg-transparent">
                      <i className={`fs-3 bi bi-${fdata.icon} text-${fdata.color}`}></i>
                    </Button>
                    <div className="ms-3">
                      <ListGroupItemHeading>{fdata.heading}</ListGroupItemHeading>
                      <ListGroupItemText className="text-muted mb-0">
                        {fdata.subtext}
                      </ListGroupItemText>
                    </div>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            ))}
          </Row>
        </Col>
        <Col lg="4">
          <CardTitle tag="h4"  className='mb-4'>Frequest Contacts</CardTitle>
          {contactData.map((cdata) => (
            <ListGroup flush key={cdata.id}>
              <ListGroupItem
                href="#"
                action
                tag="a"
                className="d-flex align-items-center px-3 py-2"
              >
                <img src={cdata.uimg} alt={cdata.uimg} className="rounded-circle" width="35" />
                <div className="ms-3">
                  <ListGroupItemHeading className="mb-0 fs-5">
                    {cdata.uname}
                  </ListGroupItemHeading>
                </div>
                <div className="ms-auto">
                  <span>
                      <i className='bi bi-clock-history fs-4 text-muted'></i>
                  </span>
                </div>
              </ListGroupItem>
            </ListGroup>
          ))}
          <div className="text-end mt-3">
            <Button color="primary">More Contacts</Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default MegaDD;
