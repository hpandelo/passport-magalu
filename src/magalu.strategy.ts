import axios from "axios"
import OAuth2Strategy, {
  StrategyOptions,
  VerifyFunction,
} from "passport-oauth2"

import { MagaluUser } from "./magalu-user.interface"

export const MagaluUrls = {
  authorizationURL: "https://id.magalu.com/login",
  tokenURL: "https://id.magalu.com/oauth/token",
  onboardingURL: "https://api.magalu.com/v0/onboarding/signup",
  profileURL: "https://id.magalu.com/users/me",
}

export type MagaluVerifyFunction = VerifyFunction

export interface MagaluOptions extends Partial<StrategyOptions> {
  clientID: string
  clientSecret: string
  callbackURL: string
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
      await axiosClient.post(MagaluUrls.onboardingURL)

      const { data: user } = await axiosClient.get<MagaluUser>(
        MagaluUrls.profileURL
      )
      done(null, user)
    } catch (error) {
      console.error(error.message)
      done(error)
    }
  }
}
