/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Label } from 'reactstrap';

export default class Step4 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      savedToCloud: props.getStore().savedToCloud,
    };
  }

  render() {
    return (
      <div className="step step4 mt-5">
        <div className="row justify-content-md-center">
          <div className="col-lg-8">
            <form id="Form" className="form-horizontal">
              <div className="form-group">
                <Label className="col-md-12 control-label">
                  {this.state.savedToCloud ? (
                    <div>
                      <h1>Thanks!</h1>
                      <h2>Data was successfully saved to cloud...</h2>
                    </div>
                  ) : (
                    <div>
                      <h1>Thanks</h1>
                      <h2>Data was successfully saved to cloud...</h2>
                      <span
                        className="btn btn-info text-white"
                        onClick={() => {
                          this.props.jumpToStep(4);
                        }}
                      >
                        Save
                      </span>
                    </div>
                  )}
                </Label>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
