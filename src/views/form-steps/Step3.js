import React, { Component } from 'react';

import { Input, Label, FormGroup } from 'reactstrap';

export default class Step3 extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="step step3 mt-5">
        <div className="row justify-content-md-center">
          <div className="col-lg-8">
            <form>
              <div className="mb-3 row">
                <Label htmlFor="height" className="col-sm-2 col-form-Label">
                  Height
                </Label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" placeholder="Height (in cm)" />
                </div>
              </div>
              <div className="mb-3 row">
                <Label htmlFor="weight" className="col-sm-2 col-form-Label">
                  Weight
                </Label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" placeholder="Weight (in kg)" />
                </div>
              </div>
              <div className="mb-3 row">
                <Label htmlFor="chest" className="col-sm-2 col-form-Label">
                  Chest
                </Label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" placeholder="Chest (in inch)" />
                </div>
              </div>
              <div className="mb-3 row">
                <Label htmlFor="waist" className="col-sm-2 col-form-Label">
                  Waist
                </Label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" placeholder="Waist (in inch)" />
                </div>
              </div>
              <div className="mb-3 row">
                <Label htmlFor="arm" className="col-sm-2 col-form-Label">
                  Arm Length
                </Label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" placeholder="Arm Length (in cm)" />
                </div>
              </div>
              <div className="mb-3 row">
                <Label htmlFor="vision" className="col-sm-2 col-form-Label">
                  Vision
                </Label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Vision (ie. 6/6, 6/9, 6/12)"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <Label htmlFor="vision" className="col-sm-2 col-form-Label">
                  Any Major Disease/Surgery in Past 10 Years?
                </Label>
                <div className="col-sm-10">
                  <FormGroup check inline>
                    <Input type="radio" id="customRadioInline1" name="customRadioInline1" />
                    <Label check>No</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input type="radio" id="customRadioInline2" name="customRadioInline1" />
                    <Label check>Only Surgery</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input type="radio" id="customRadioInline3" name="customRadioInline1" />
                    <Label check>Only Disease</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input type="radio" id="customRadioInline4" name="customRadioInline1" />
                    <Label check>Both</Label>
                  </FormGroup>

                  {/* <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      id="customRadioInline4"
                      name="customRadioInline1"
                      className="custom-control-input"
                    />
                    <Label className="custom-control-Label" htmlFor="customRadioInline4">
                      Both
                    </Label>
                  </div> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
