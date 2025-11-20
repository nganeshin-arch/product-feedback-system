import passport from 'passport';
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { userRepository } from '../database';
import type { User } from '@feedback-system/shared';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:8888/api/auth/google/callback';

/**
 * Configure Google OAuth strategy
 */
export function configurePassport() {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    console.warn('⚠️  Google OAuth credentials not configured. Social login will not work.');
    return;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
        scope: ['profile', 'email'],
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback
      ) => {
        try {
          const email = profile.emails?.[0]?.value;
          if (!email) {
            return done(new Error('No email found in Google profile'), undefined);
          }

          // Check if user already exists
          let user = userRepository.getUserByEmail(email);

          if (!user) {
            // Create new user from Google profile
            user = userRepository.createUser({
              email,
              displayName: profile.displayName || email.split('@')[0],
              photoURL: profile.photos?.[0]?.value,
              authProvider: 'google',
              role: 'user',
            });
          } else if (user.authProvider !== 'google') {
            // User exists with email/password auth
            return done(
              new Error('An account with this email already exists. Please login with email/password.'),
              undefined
            );
          }

          return done(null, user);
        } catch (error) {
          return done(error as Error, undefined);
        }
      }
    )
  );

  // Serialize user for session (not used with JWT, but required by passport)
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  // Deserialize user from session (not used with JWT, but required by passport)
  passport.deserializeUser((id: number, done) => {
    try {
      const user = userRepository.getUserById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
}

export default passport;
