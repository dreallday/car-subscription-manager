const { send, json } = require('micro')
const { router, post, get, options } = require('microrouter')


let subscriptions = {};

module.exports = router(
  options('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept, *");
    send(res, 200);
  }),
  post('/', async (req, res) => {
    const subscription = await json(req)
    // TODO: "Save" subscription
    // TODO: Return response
    console.log("subscription", subscription, subscriptions);
    if(!subscription || !subscription.vin) {
      send(res, 400, { success: false, message: "Missing Parameters" });
    }

    let success = addSubscription(subscription);
    let resp = { success: success };
    resp["message"] = !success ? "Subscription Exists" : "ok";
    send(res, 200, resp)
  })
)


const hasSubscription = (subscription) => {
  return subscriptions.hasOwnProperty(subscription.vin)
}

// Add subscription by VIN
const addSubscription = (subscription) => {
  if(hasSubscription(subscription)) {
    return false;
  }
  subscriptions[subscription.vin] = subscription;
  return true;
}

