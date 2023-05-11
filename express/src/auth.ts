import dotenv from 'dotenv'
dotenv.config()

//postgres client
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const db = new PrismaClient()

//express
import express from 'express'
var router = express.Router()

//passport (bearer token, google oauth2, local)
import passport from 'passport'
import passportHttpBearer from 'passport-http-bearer'
import passportGoogleOauth20 from 'passport-google-oauth20'
import passportLocal from 'passport-local'
const BearerStrategy = passportHttpBearer.Strategy
const GoogleStrategy = passportGoogleOauth20.Strategy

//passwort hash
import bcrypt from 'bcrypt'

//error response
import { ErrorResponse } from './_error.js'
import { errorHandler } from './_errorHandler.js'

//passport google oauth2 sign-up startegy
passport.use(
  'google-signup',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_SIGNUP_CALLBACK_URL,
    },
    async function (req, accessToken, refreshToken, profile, done) {
      const user = await db.user.findUnique({
        where: {
          googleId: profile.id,
        },
      })
      if (user) {
        return done(
          new ErrorResponse(409, 'profile already exists.', [
            { field: 'email', message: 'profile already exists.' },
          ])
        )
      }
      const newUser = await db.user.create({
        data: {
          email: profile.emails[0].value,
          password: null,
          name: profile.displayName,
          googleId: profile.id,
        },
      })
      return done(null, newUser)
    }
  )
)

//passport google oauth2 sign-in startegy
passport.use(
  'google-signin',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_SIGNIN_CALLBACK_URL,
    },
    async function (req, accessToken, refreshToken, profile, done) {
      const user = await db.user.findUnique({
        where: {
          googleId: profile.id,
        },
      })
      if (!user) {
        return done(
          new ErrorResponse(404, 'profile does not exist.', [
            { field: 'email', message: 'profile does not exist.' },
          ])
        )
      }
      return done(null, user)
    }
  )
)

//passport local sign-up startegy
passport.use(
  'local-signup',
  new passportLocal.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async function (req, email, password, done) {
      const user = await db.user.findUnique({
        where: {
          email: email,
        },
      })
      if (user) {
        return done(
          new ErrorResponse(409, 'profile already exists.', [
            { field: 'email', message: 'profile already exists.' },
          ])
        )
      }
      const newUser = await db.user.create({
        data: {
          email: email,
          password: await bcrypt.hash(password, 10),
          name: req.body.name,
          googleId: null,
        },
      })
      return done(null, newUser)
    }
  )
)

//passport local sign-in startegy
passport.use(
  'local-signin',
  new passportLocal.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async function (req, email, password, done) {
      const user = await db.user.findUnique({
        where: {
          email: email,
        },
      })
      if (!user) {
        return done(
          new ErrorResponse(404, 'profile does not exist.', [
            { field: 'email', message: 'profile does not exist.' },
          ])
        )
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return done(
          new ErrorResponse(401, 'incorrect password.', [
            { field: 'password', message: 'incorrect password.' },
          ])
        )
      }
      return done(null, user)
    }
  )
)

//sign-up google oauth2 route
router.get(
  '/signup/google',
  passport.authenticate('google-signup', { scope: ['profile', 'email'] })
)
router.get(
  '/signup/google/callback',
  passport.authenticate('google-signup', {
    session: false,
  }),
  function (req, res) {
    //201 created
    res.status(201).json({
      code: 201,
      message: 'profile created.',
    })
  }
)

//sign-in google oauth2 route
router.get(
  '/signin/google',
  passport.authenticate('google-signin', { scope: ['profile', 'email'] })
)
router.get(
  '/signin/google/callback',
  passport.authenticate('google-signin', {
    session: false,
  }),
  function (req, res) {
    res.redirect('/')
  }
)

//sign-up local route
router.post(
  '/signup/local',
  passport.authenticate('local-signup', {
    session: false,
  }),
  function (req, res) {
    res.redirect('/')
  }
)

//sign-in local route
router.post(
  '/signin/local',
  passport.authenticate('local-signin', {
    session: false,
  }),
  function (req, res) {
    res.redirect('/')
  }
)

export default router
