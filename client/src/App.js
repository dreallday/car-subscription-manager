import React, { Component } from 'react'
import './App.css'
import { getAvailableVehicles } from './Helpers';
import cx from "classnames";
import { isEmpty } from 'lodash';
import DetailComponent from './DetailComponent';
import RegistrationComponent from './RegistrationComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selected: {},
      vehicles: [],
      subscriptionLength: 7,
      subscriptionPrice: 0,
      registered: false
    };
  }

  componentDidMount() {
    getAvailableVehicles().then(data => {
      this.setState({
        vehicles: data
      });
    });
  }

  componentWillReceiveProps(next) {
    console.log("componentWillReceiveProps", next)
  }

  renderVehicles = () => {
    const { vehicles } = this.state;
    return vehicles.map((vehicle, idx) => {
      return (
        <li key={`${vehicle.uuid}+${idx}`}
          className="list-group-item"
          onClick={this.onClick(vehicle)}>{vehicle.name}</li>
      )
    })
  }

  onClick = (vehicle) => () => {
    const { selected } = this.state;
    if(selected.hasOwnProperty("uuid") && selected.uuid == vehicle.uuid) return; //ignore click if uuid matches the selected
    console.log('vehicle', vehicle);
    this.setState({
      selected: vehicle
    })
  }

  saveLength = (length) => {
    console.log("length", length);
    this.setState({
      subscriptionLength: length
    })
  }

  savePrice = (price) => {
    console.log("price", price);
    this.setState({
      subscriptionPrice: price
    })
  }

  onSubscribed = (resp) => {
    console.log(resp);
    if(resp && resp.success && resp.vin) {
      this.setState({
        registered: true,
      })
    }
  }

  renderSelected = () => {
    const { selected } = this.state;

    if(isEmpty(selected)) return
    return <DetailComponent selected={selected} subFn={this.saveLength} onPriceFn={this.savePrice} />
  }

  renderRegistration = () => {
    const { selected, subscriptionLength, subscriptionPrice } = this.state;
    return <RegistrationComponent subscriptionLength={subscriptionLength} subscriptionPrice={subscriptionPrice} vehicle={selected} onSubscribedFn={this.onSubscribed} />
  }

  render() {
    console.log("render", this.state);
    const { registered, selected, subscriptionPrice, subscriptionLength } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sign Up for a Subscription!</h1>
        </header>
        <div className="container">
        { registered == true ? 
          <div className="row">
            <div className="col-md-3"/>
            <div className="col-md-6">
              <span>Successfully started a {subscriptionLength} day subscription of {selected.name} for ${subscriptionPrice}</span>
            </div>
            <div className="col-md-3"/>
          </div>
        :
          <div className="row">
            <div className="col-md-6">
              <ul className="list-group">
                {this.renderVehicles()}
              </ul>
            </div>
            <div className="col-md-6">
              {this.renderSelected()}
              {this.renderRegistration()}
            </div>
          </div>
          }
        </div>
      </div>
    )
  }
}

export default App
