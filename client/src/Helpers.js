/**
* @providesModule Helpers
* @flow
*/

 import axios from 'axios';

 import { API, VEHICLES, PRICING, SUBSCRIPTION } from "./Constants";


export const getAvailableVehicles = () => {
    const url = API + VEHICLES;
    return getAPI(url)
}


export const getPrice = (params) => {
    let keys = Object.keys(params);
    let url = API + PRICING;
    if(keys.length > 0) {
        url += "?"
    }
    keys.map(key => 
        url += `${key}=${params[key]}&`
    )
    console.log("getPrice", params, url);
    return getAPI(url)
}

export const startSubscription = (params) => {
    const url = API + SUBSCRIPTION;
    return postAPI(url)(params);
}

const getAPI = (url) => {
    return axios.get(url)
        .then(data => data.data) //parsing out data from axios response
        .catch((err) => {
            console.log("getAPI error", err);
            return [];
        });
}

const postAPI = (url) => (params) => {
    console.log('params', params);
    console.log('url', url);

    return axios.post(url, params)
        .then(data => data.data)
        .catch(err => {
            console.log("postAPI error", err);
            return;
        });
        
}