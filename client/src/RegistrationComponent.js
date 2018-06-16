/**
* @providesModule RegistrationComponent
* @flow
*/

import React, { Component, PureComponent } from 'react'
import './App.css'
import { startSubscription } from './Helpers';
import { isEmpty, merge } from 'lodash';


class RegistrationComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        subscriptionPrice: props.subscriptionPrice || 0,
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
    this.setState(merge({}, this.state, next));
  }

  onChange = (val) => (evt) => {
      this.setState({
          [val]: evt.target.value
      })
  }

  onSubscribe = () => {
      const { name, email, dob, subscriptionLength, vehicle } = this.state;
      let params = {
          name, email, dob,
          length: subscriptionLength,
          vin: vehicle.vin
      };
      startSubscription(params).then(ret => {
          console.log(ret);
          this.props.onSubscribedFn && this.props.onSubscribedFn(ret);
      });

  }

  render() {
    const { name, email, dob, vehicle, subscriptionLength, subscriptionPrice } = this.state;
    return (
        <div className="collapse" id="collapseExample">
            <div className="card card-body">
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Name</label>
                        <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="name" value={name || ""} onChange={this.onChange("name")} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput2">Email address</label>
                        <input type="email" className="form-control" id="exampleFormControlInput2" placeholder="name@example.com" value={email || ""} onChange={this.onChange("email")} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput3">Date of Birth</label>
                        <input type="text" className="form-control" id="exampleFormControlInput3" placeholder="MM/DD/YYYY" value={dob || ""} onChange={this.onChange("dob")} />
                    </div>
                    
                    <button type="button" className="btn btn-primary" onClick={this.onSubscribe} >Subscribe for ${subscriptionPrice}!</button>
                </form>
            </div>
        </div>

    )
  }
}

export default RegistrationComponent
