import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

const EcoSidebar = () => {
  return (
    <div className="p-4">
      <h5 className="mb-4">Category</h5>
      <FormGroup>
        <Label className="cursor-pointer">
          <Input type="radio" name="radio1" className="me-2" /> Ice-cream
        </Label>
      </FormGroup>
      <FormGroup>
        <Label className="cursor-pointer">
          <Input type="radio" name="radio1" className="me-2" /> Vegitables
        </Label>
      </FormGroup>
      <FormGroup>
        <Label className="cursor-pointer">
          <Input type="radio" name="radio1" className="me-2" /> Toy
        </Label>
      </FormGroup>
      <FormGroup>
        <Label className="cursor-pointer">
          <Input type="radio" name="radio1" className="me-2" /> A to Z
        </Label>
      </FormGroup>
      <br />
      <h5 className="mb-4">Sort By</h5>
      <FormGroup>
        <Label className="cursor-pointer">
          <Input type="radio" name="radio2" className="me-2" /> Price Low- High
        </Label>
      </FormGroup>
      <FormGroup>
        <Label className="cursor-pointer">
          <Input type="radio" name="radio2" className="me-2" /> Price High - Low
        </Label>
      </FormGroup>
      <FormGroup>
        <Label className="cursor-pointer">
          <Input type="radio" name="radio2" className="me-2" /> Popular
        </Label>
      </FormGroup>
      <FormGroup>
        <Label className="cursor-pointer">
          <Input type="radio" name="radio2" className="me-2" /> Brand
        </Label>
      </FormGroup>
      <br />
      <h5 className="mb-4">Price Range</h5>
      <FormGroup>
        <Input id="exampleRange" name="range" type="range" />
      </FormGroup>
    </div>
  );
};

export default EcoSidebar;
