/**
* @providesModule DetailComponent
* @flow
*/

import React, { Component, PureComponent } from 'react'
import './App.css'
import { getPrice } from './Helpers';


class DetailComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      subscriptionLength: 7,
      price: 0
    };
  }

  componentDidMount() {
      console.log("DetailComponent componentDidMount");
      this.fetchPrice()
  }

  componentWillReceiveProps(next) {
    console.log("DetailComponent componentWillReceiveProps", next);
    this.fetchPrice(next)
  }

  fetchPrice = (props = this.props, sl = this.state.subscriptionLength) => {
    let params = {
        vin: props.selected.vin,
        subscriptionLength: sl
    }

    getPrice(params).then(price => {
        console.log("price", price);
        this.setState(price);
    })
  }

  setSubscriptionLength = (subscriptionLength) => () => {
    this.fetchPrice(this.props, subscriptionLength);
    this.setState({
        subscriptionLength: subscriptionLength
    });

    this.props.sunFn && this.props.sunFn(subscriptionLength)
  }

  render() {
    const { selected } = this.props;
    const { price } = this.state;
    return (
        <div className="card-deck mb-3 text-center">
            <div className="card mb-4 box-shadow">
            <div className="card-header">
                <h4 className="my-0 font-weight-normal">{selected.name}</h4>
            </div>
            <img className="card-img-top" height={150} src={selected.image} alt="Image Loading..."/>
            <div className="card-body">
                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    <label className="btn btn-secondary active" onClick={this.setSubscriptionLength(7)}>
                        <input type="radio" name="options" id="option1" autoComplete="off" defaultChecked/> 7 days
                    </label>
                    <label className="btn btn-secondary" onClick={this.setSubscriptionLength(28)}>
                        <input type="radio" name="options" id="option2" autoComplete="off"/> 28 days
                    </label>
                </div>
                <h1 className="card-title pricing-card-title">${price} <small className="text-muted"> total</small></h1>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Odometer: <small className="text-muted">{selected.odometer}</small></li>
                    <li className="list-group-item">About the Car: <small className="text-muted">{selected.description}</small></li>
                </ul>
                <a className="btn btn-lg btn-block btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    Get started
                </a>
            </div>
            </div>
        </div>
    )
  }
}

export default DetailComponent
