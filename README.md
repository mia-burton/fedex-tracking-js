# fedex-tracking-js

A Node.js module for tracking FedEx by tracking number

## Usage
First of all you need to register to [FedEx Develop portal](https://developer.fedex.com/) and register an App in order to get the **FedEx-API-Key** and **FedEx-API-Secret**.

### Javascript
```
var fedExTracking = require('@mia-burton/fedex-tracking-js')
var fedex = new fedExTracking(CLIENT_ID, CLIENT_SECRET, BASE_URL, VERSION?)

// Get tracking order information
fedex.tracking({
  trackingNumber: TRACKING_NUMBER,
  language: LANGUAGE?
})
```

### Typescript

```
import fedExTracking from '@mia-burton/fedex-tracking-js'
var fedex = new fedExTracking(CLIENT_ID, CLIENT_SECRET, BASE_URL, VERSION?)

// Get tracking order information
fedex.tracking({
  trackingNumber: TRACKING_NUMBER,
  language: LANGUAGE?
})
```

## Test
Add the .env file (following .env.sample and FedEx testing ENV documentation) and than call `yarn run test`