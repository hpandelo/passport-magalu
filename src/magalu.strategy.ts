import axios from "axios"
import OAuth2Strategy, {
  StrategyOptions,
  VerifyFunction,
} from "passport-oauth2"


export const MagaluUrls = {
  authorizationURL: "https://id.magalu.com/login",
  tokenURL: "https://id.magalu.com/oauth/token",
  sandboxApiUrl: "https://api-sandbox.magalu.com",
  apiURL: "https://id.magalu.com/users/me",

  profileURL: "/users/me",
  onboardingURL: "/v0/onboarding/signup",
}

export type MagaluVerifyFunction = VerifyFunction

export interface MagaluOptions extends Partial<StrategyOptions> {
  clientID: string
  clientSecret: string
  callbackURL: string
  useSandbox?: boolean
  // choose_tenants: boolean /* Not Implemented Yet */
}

export class MagaluStrategy extends OAuth2Strategy {
  constructor(options: MagaluOptions, verify: VerifyFunction) {
    super(
      {
        ...options,
        ...MagaluUrls,
      },
      verify
    )

    this.name = "magalu"

    this._oauth2.useAuthorizationHeaderforGET(true)
  }

  async userProfile(
    accessToken: string,
    done: (err?: Error | null, profile?: any) => void
  ): Promise<void> {
    try {
      const axiosClient = axios.create({
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })

      // Onboarding Magalu
      // https://developers.magalu.com/docs/Onboarding/setup/#criar-um-registro
      // await axiosClient.post(`${MagaluUrls.apiURL}${MagaluUrls.onboardingURL}`)

      // TBD: "Not Implemented yet in Magalu API"
      // const { data: user } = await axiosClient.get<MagaluUser>(
      //   `${options.useSandbox ? MagaluUrls.sandboxApiURL ? MagaluUrls.apiURL}${MagaluUrls.profileURL}`
      // )
      // done(null, user)

      done(null, { id: -1, status: "Not Implemented yet in Magalu API" })
    } catch (error) {
      console.error(error.message)
      done(error)
    }
  }
}
