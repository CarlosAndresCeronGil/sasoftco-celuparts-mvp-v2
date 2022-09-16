import React from 'react';
import { useSelector } from 'react-redux';
import { Badge, Button } from 'reactstrap';

const EmailDetails = () => {
  const emailDetail = useSelector(
    (state) => state.emailReducer.emails[state.emailReducer.emailContent - 1],
  );

  return (
    <>
      <div>
        {emailDetail ? (
          <>
            <div className="d-flex align-items-center p-3 border-bottom">
              <div className="">
                <img src={emailDetail.thumbnail} alt="user" className="rounded-circle" width="46" />
              </div>
              <div className="mx-3">
                <h5 className="mb-0">{emailDetail.from}</h5>
                <Badge
                  color={
                    (emailDetail.label === 'Promotional' ? 'warning' : '') +
                    (emailDetail.label === 'Social' ? 'success' : '') +
                    (emailDetail.label === 'Health' ? 'danger' : '')
                  }
                >
                  {emailDetail.label}
                </Badge>
                &nbsp;&nbsp;
                <small>To: {emailDetail.To}</small>
              </div>
            </div>
            <div className="p-4 border-bottom">
              <h5 className="mb-0 font-16 font-medium">{emailDetail.subject}</h5>
            </div>
            <div
              className="p-4 pb-3"
              dangerouslySetInnerHTML={{ __html: emailDetail.emailContent }}
            />
            <Button className="mx-4" color="primary" size="sm" outline>
              Reply
            </Button>
          </>
        ) : (
          'Please Select Email'
        )}
      </div>
    </>
  );
};

export default EmailDetails;
