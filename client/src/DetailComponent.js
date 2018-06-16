/**
* @providesModule DetailComponent
* @flow
*/

import React, { Component, PureComponent } from 'react'
import './App.css'
import { getPrice } from './Helpers';
import cx from "classnames";
import { isEmpty } from 'lodash';


class DetailComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      subscription: 7,
      price: 0
    };
  }

  componentDidMount() {
      console.log("DetailComponent componentDidMount");
      this.price({
          vin: this.props.selected.vin,
          subscriptionLength: this.state.subscription
      })
  }

  componentWillReceiveProps(next) {
    console.log("DetailComponent componentWillReceiveProps", next);
    this.price({
        vin: next.selected.vin,
        subscriptionLength: this.state.subscription
    })
  }

  price = (params = {}) => {
    getPrice(params).then(price => {
        console.log("price", price);
        this.setState(price);
    })
  }

  render() {
    const { selected } = this.props;
    const { price, subscription } = this.state;
    return (
        <div className="card-deck mb-3 text-center">
            <div className="card mb-4 box-shadow">
            <div className="card-header">
                <h4 className="my-0 font-weight-normal">{selected.name}</h4>
            </div>
            <div className="card-body">
                <h1 className="card-title pricing-card-title">${price} <small className="text-muted">/ mo</small></h1>
                <ul className="list-unstyled mt-3 mb-4">
                <img height={150} width={150} src={selected.image} />
                <li>20 users included</li>
                <li>10 GB of storage</li>
                <li>Priority email support</li>
                <li>Help center access</li>
                </ul>
                <button type="button" className="btn btn-lg btn-block btn-primary">Get started</button>
            </div>
            </div>
        </div>
    )
  }
}

export default DetailComponent
