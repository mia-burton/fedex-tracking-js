import { FedEx } from '../fedex'
require("dotenv").config({ path: ".env" })

const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time)) // sleep time to reduce requests frequency
const maxTimeout = 10 * 1000 // test max timeout in ms
const timeout = 2 * 1000 // sleep timeout


const TEST_API_KEY = process.env.API_KEY || ''
const TEST_API_SECRET = process.env.API_SECRET || ''
const TEST_BASE_URL = 'https://apis-sandbox.fedex.com'

describe('FedEx tracking testing', function() {
  it('track with existing trackingNumber and valid API-Key', async function() {
    await sleep(timeout)
    const client = new FedEx(TEST_API_KEY, TEST_API_SECRET, TEST_BASE_URL)
    const response = await client.tracking({trackingNumber: '1111' })
    expect(response).not.toBeNull()
    expect(response.status).toBe(200)
    expect(response.data).not.toBeNull()
    expect(response.data.output).not.toBeNull()
    expect(response.data.output.completeTrackResults).not.toBeNull()
    expect(Array.isArray(response.data.output.completeTrackResults)).toBe(true)
    expect(response.data.output.completeTrackResults.length).toBeGreaterThanOrEqual(1)
    expect(response.data.output.completeTrackResults[0]).not.toBeNull()
    expect(response.data.output.completeTrackResults[0].trackResults).not.toBeNull()
    expect(Array.isArray(response.data.output.completeTrackResults[0].trackResults)).toBe(true)
    expect(response.data.output.completeTrackResults[0].trackResults.length).toBeGreaterThanOrEqual(1)
    expect(response.data.output.completeTrackResults[0].trackResults[0]).not.toBeNull()
    expect(response.data.output.completeTrackResults[0].trackResults[0]).toHaveProperty('trackingNumberInfo')
    expect(response.data.output.completeTrackResults[0].trackResults[0]).toHaveProperty('shipperInformation')
    expect(response.data.output.completeTrackResults[0].trackResults[0]).toHaveProperty('recipientInformation')
    expect(response.data.output.completeTrackResults[0].trackResults[0]).toHaveProperty('latestStatusDetail')
  }, maxTimeout)

  it('track passing a wrong API-Key', async function() {
    await sleep(timeout)
    const client = new FedEx('WRONG_API_KEY', TEST_API_SECRET, TEST_BASE_URL)
    const response = await client.tracking({trackingNumber: '1111' })
    expect(response).not.toBeNull()
    expect(response.status).toBe(401)
  }, maxTimeout)
})