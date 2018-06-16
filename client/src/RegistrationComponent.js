/**
* @providesModule RegistrationComponent
* @flow
*/

import React, { Component, PureComponent } from 'react'
import './App.css'
import { getPrice } from './Helpers';
import cx from "classnames";
import { isEmpty } from 'lodash';


class RegistrationComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        subscriptionLength: props.sl || 7,
        name: null,
        email: null,
        dob: null,
        vehicle: props.vehicle || null
    };
  }

  componentDidMount() {
      console.log("RegistrationComponent componentDidMount");
  }

  componentWillReceiveProps(next) {
    console.log("RegistrationComponent componentWillReceiveProps", next);
  }

  onChange = (val) => (evt) => {
      console.log("name", evt.target.value);
      this.setState({
          [val]: evt.target.value
      })
  }

  render() {
    const { name, email, dob, vehicle, subscriptionLength } = this.state;
    return (
        <div className="collapse" id="collapseExample">
            <div className="card card-body">
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Email address</label>
                        <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="name" value={name || ""} onChange={this.onChange("name")} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput2">Email address</label>
                        <input type="email" className="form-control" id="exampleFormControlInput2" placeholder="name@example.com" value={email || ""} onChange={this.onChange("email")} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput3">Email address</label>
                        <input type="text" className="form-control" id="exampleFormControlInput3" placeholder="MM/DD/YYYY" value={dob || ""} onChange={this.onChange("dob")} />
                    </div>
                    <button type="button" class="btn btn-primary" onClick={() => {}} >Subscribe!</button>
                </form>
            </div>
        </div>

    )
  }
}

export default RegistrationComponent
