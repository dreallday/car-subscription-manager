const { send, json } = require('micro')
const { router, post, get, options } = require('microrouter')


let subscriptions = {};

module.exports = router(
  options('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    send(res, 200);
  }),
  post('/', async (req, res) => {
    

    const subscription = await json(req)
    // TODO: "Save" subscription
    // TODO: Return response
    console.log("subscription", subscription);

    send(res, 200, { confirmation: "done did it" })

  }),
)
