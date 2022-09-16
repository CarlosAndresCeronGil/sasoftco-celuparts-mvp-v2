import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import SimpleBar from 'simplebar-react';

const TwoColumn = ({ leftContent, rightContent }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSubmit = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="d-lg-flex d-md-block border position-relative leftRightBox">
      <div className={`leftPart flex-shrink-0  bg-white border-end ${isOpen ? 'showLeftPart' : ''}`}>
        <Button className="d-lg-none d-md-block openCloseBtn" color="danger">
          <i className={`bi ${isOpen ? 'bi-x' : 'bi-list'}`} onClick={handleSubmit} />
        </Button>
        <SimpleBar style={{ height: 'calc(100vh - 200px)' }}>{leftContent}</SimpleBar>
      </div>
      <div className="rightPart">
        {rightContent}
        {isOpen ? <div className="contentOverlay" /> : ''}
      </div>
    </div>
  );
};

TwoColumn.propTypes = {
  leftContent: PropTypes.node,
  rightContent: PropTypes.node,
};

export default TwoColumn;
