import React, { useState } from 'react';
import { Button, ButtonGroup, Row, Col } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';

const Buttons = () => {
  const [cSelected, setCSelected] = useState([]);
  const [rSelected, setRSelected] = useState(null);

  const onRadioBtnClick = (vSelected) => {
    setRSelected(vSelected);
  };

  const onCheckboxBtnClick = (selected) => {
    const index = cSelected.indexOf(selected);
    if (index < 0) {
      cSelected.push(selected);
    } else {
      cSelected.splice(index, 1);
    }
    setCSelected([...cSelected]);
  };

  return (
    <div>
      <BreadCrumbs />
      {/* --------------------------------------------------------------------------------*/}
      {/* Start Inner Div*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
      <Row>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-1*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Buttons">
            <div className="button-group">
              <Button className="btn" color="primary">
                primary
              </Button>
              <Button className="btn" color="secondary">
                secondary
              </Button>
              <Button className="btn" color="success">
                success
              </Button>
              <Button className="btn" color="info">
                info
              </Button>
              <Button className="btn" color="warning">
                warning
              </Button>
              <Button className="btn" color="danger">
                danger
              </Button>
              <Button className="btn" color="link">
                link
              </Button>
            </div>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-2*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Outline Buttons">
            <div className="button-group">
              <Button className="btn" outline color="primary">
                primary
              </Button>
              <Button className="btn" outline color="secondary">
                secondary
              </Button>
              <Button className="btn" outline color="success">
                success
              </Button>
              <Button className="btn" outline color="info">
                info
              </Button>
              <Button className="btn" outline color="warning">
                warning
              </Button>
              <Button className="btn" outline color="danger">
                danger
              </Button>
            </div>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-3*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Large Size Buttons">
            <div className="button-group">
              <Button className="btn" color="primary" size="lg">
                Large Button
              </Button>
              <Button className="btn" color="secondary" size="lg">
                Large Button
              </Button>
            </div>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-4*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Small Size Buttons">
            <div className="button-group">
              <Button className="btn" color="primary" size="sm">
                Small Button
              </Button>
              <Button className="btn" color="secondary" size="sm">
                Small Button
              </Button>
            </div>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-6*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Active State Buttons">
            <div className="button-group">
              <Button className="btn" color="primary" size="lg" active>
                Primary link
              </Button>
              <Button className="btn" color="secondary" size="lg" active>
                Link
              </Button>
            </div>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-7*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Disabled State Buttons">
            <div className="button-group">
              <Button className="btn" color="primary" size="lg" disabled>
                Primary button
              </Button>
              <Button className="btn" color="secondary" size="lg" disabled>
                Button
              </Button>
            </div>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-5*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Block Buttons">
            <div className="button-group">
              <Button className="btn" color="primary" size="lg" block>
                Block level button
              </Button>
              <Button className="btn" color="secondary" size="lg" block>
                Block level button
              </Button>
            </div>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-6*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Checkbox(Stateful Buttons)">
            <h5>Checkbox Buttons</h5>
            <ButtonGroup>
              <Button
                color="primary"
                onClick={() => onCheckboxBtnClick(1)}
                active={cSelected.includes(1)}
              >
                One
              </Button>
              <Button
                color="primary"
                onClick={() => onCheckboxBtnClick(2)}
                active={cSelected.includes(2)}
              >
                Two
              </Button>
              <Button
                color="primary"
                onClick={() => onCheckboxBtnClick(3)}
                active={cSelected.includes(3)}
              >
                Three
              </Button>
            </ButtonGroup>
            <p className="mb-0">Selected: {JSON.stringify(cSelected)}</p>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-6*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Radio Buttons (Stateful Buttons)">
            <h5>Radio Buttons</h5>
            <ButtonGroup>
              <Button color="primary" onClick={() => onRadioBtnClick(1)} active={rSelected === 1}>
                One
              </Button>
              <Button color="primary" onClick={() => onRadioBtnClick(2)} active={rSelected === 2}>
                Two
              </Button>
              <Button color="primary" onClick={() => onRadioBtnClick(3)} active={rSelected === 3}>
                Three
              </Button>
            </ButtonGroup>
            <p className="mb-0">Selected: {rSelected}</p>
          </ComponentCard>
        </Col>
      </Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}

      {/* --------------------------------------------------------------------------------*/}
      {/* End Inner Div*/}
      {/* --------------------------------------------------------------------------------*/}
    </div>
  );
};

export default Buttons;
