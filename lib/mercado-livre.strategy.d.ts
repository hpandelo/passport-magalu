import OAuth2Strategy, { StrategyOptions, VerifyFunction } from "passport-oauth2";
export declare const MagaluUrls: {
  authorizationURL: string
  tokenURL: string
  apiURL: string
  profileURL: string
}
export type MagaluVerifyFunction = VerifyFunction
export interface MagaluOptions extends Partial<StrategyOptions> {
  clientID: string
  clientSecret: string
  callbackURL: string
}
export declare class MagaluStrategy extends OAuth2Strategy {
  constructor(options: MagaluOptions, verify: VerifyFunction)
  userProfile(
    accessToken: string,
    done: (err?: Error | null, profile?: any) => void
  ): Promise<void>
}
