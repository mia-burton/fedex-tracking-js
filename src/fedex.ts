import axios, { AxiosResponse } from 'axios'

/**
 * Params interface
 * @param trackingNumber string - Mandatory, the tracking number to check
 * @param language string - Optional, preferred details info language
 */
interface Params {
  trackingNumber: string,
  language?: string,
}

export class FedEx {
  private readonly clientId: string
  private readonly clientSecret: string
  private readonly baseUrl: string
  private readonly version?: string

  /**
   * Create a FedEx object
   * @param clientId string - Api key from FedEx Api Developer panel
   * @param clientSecret string - Api secret from FedEx Api Developer panel
   * @param baseUrl string - Base url for requests (See FedEx API)
   * @param version string= - API version, optional, default is v1
   */
  constructor(clientId: string, clientSecret: string, baseUrl: string, version?: string) {
    this.clientId = clientId
    this.clientSecret = clientSecret
    this.baseUrl = baseUrl
    this.version = version || 'v1'
  }

  private async auth() : Promise<AxiosResponse> {
    try {
      const params = new URLSearchParams()
      params.append('grant_type', 'client_credentials')
      params.append('client_id', this.clientId)
      params.append('client_secret', this.clientSecret)
      const authUrl = `${this.baseUrl}/oauth/token`
      const response = await axios.post(authUrl, params, {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
        }
      })
      return response.data.access_token
    } catch(error) {
      return new Promise((_, reject) => reject(error.response))
    }
  }

  /**
   * Track using tracking number, return a Response
   * @param params Params - Interface of parameters
   */
  public async tracking(params : Params) :Promise<AxiosResponse> {
    try {
      const trackingUrl = `${this.baseUrl}/track/${this.version}/trackingnumbers`
      const bearer = await this.auth()
      const headers = {
        Authorization: `Bearer ${bearer}`,
        "Content-Type": 'application/json',
        'x-locale': params.language || 'en_US'
      }
      const data = {
        trackingInfo: [
          {
            trackingNumberInfo: {
              trackingNumber: params.trackingNumber
            }
          }
        ],
        includeDetailedScans: true
      }
      return axios.post(trackingUrl, data, { headers })
    } catch (error) {
      return new Promise((resolve) => resolve(error))
    }
  }
}