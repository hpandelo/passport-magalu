# Passport-Magalu

[Passport](https://github.com/jaredhanson/passport) strategy for authenticating with [magalu](https://www.magazineluiza.com.br/) using the OAuth 2.0 API.

Learn more about magalu OAuth schema [here](https://developers.magalu.com/docs/first_steps/create_an_application/authentication_authorization/).

## Installation

    $ npm install passport-magalu

## Configuration

The Magalu authentication strategy authenticates users using a Magalu
account and OAuth 2.0 tokens. The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying a client ID, client secret, and callback URL.

You can obtain the client ID and secret by creating a magalu app [here](https://developers.magalu.com/).

## Note
This Strategy is already using the **NEW API** and this new API is still getting implemented [Check here](https://developers.magalu.com/).
The User endpoit wan't implemented yet by the Magalu developers. When done, I'll be updating this package to support it (or feel free to add a PR updating the file `src/magalu.strategy.ts` line 60+)

```javascript
import { MagaluStrategy, type MagaluVerifyFunction } from 'passport-magalu'

passport.use(
  new magaluStrategy(
    {
      clientID: "YOUR_CLIENT_ID",
      clientSecret: "YOUR_CLIENT_SECRET",
      callbackURL: "http://www.example.com/auth/magalu/callback",
      scope: 'open:portfolio:read',
    },
    (accessToken, refreshToken, profile, done) => {
      // + store/retrieve user from database, together with access token and refresh token

      // the callback function (done) will inject the profile in req.user
      return done(null, profile)

      // TIP: If you need the accessToken, you can use like this:
      // return done(null, { profile, accessToken })
      // In this case, the accessToken will be in req.user.accessToken and the data in req.user.profile
    }
  )
)

// The value passed to `done` here is stored on the session.
// We save the full user object in the session.
passport.serializeUser((user, done) => {
  done(null, JSON.stringify(user))
})

// The value returned from `serializeUser` is passed in from the session here,
// to get the user. We save the full user object in the session.
passport.deserializeUser((user: string, done) => {
  done(null, JSON.parse(user))
})
```

## Usage

Use `passport.authorize()`, specifying the `'magalu'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```javascript
// Use passport.authorize auth method
app.get("/auth/magalu", passport.authorize("magalu"))

// Use passport.authenticate on Callback
app.get(
  "/auth/magalu/callback",
  passport.authenticate('magalu', { session: true }),
  (req, res) => {
    // Successful authentication, redirect home or do what do you need
    res.redirect("/")
  }
)

// req.isAuthenticated() returns true if the request is authenticated
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/auth/magalu")
}

// User data is available at req.user object
app.get("/", ensureAuthenticated, (req, res) => {
  res.send("Logged in user: " + req.user.nickname)
})
```

## License

[The MIT License](http://opensource.org/licenses/MIT)
