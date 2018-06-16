import React, { Component } from 'react'
import './App.css'
import { getAvailableVehicles } from './Helpers';
import cx from "classnames";
import { isEmpty } from 'lodash';
import DetailComponent from './DetailComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selected: {},
      vehicles: []
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

  renderSelected = () => {
    const { selected } = this.state;

    if(isEmpty(selected)) return <span>Select a car!</span>
    return <DetailComponent selected={selected} />
  }

  render() {
    console.log("render", this.state);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sign Up for a Subscription!</h1>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <ul className="list-group">
                {this.renderVehicles()}
              </ul>
            </div>
            <div className="col-md-6">
              {this.renderSelected()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
