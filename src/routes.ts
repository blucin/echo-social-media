/**
 * Routes that are accessible to all users
 * However, if a user is logged in, they will be redirected to fill out their profile
 * if they have not done so already
 */
export const publicRoutes = [
  '/home',
  '/'
];

/**
 * Routes that are accessible to logged in users
 */
export const privateRoutes = [
  '/private-feed',
  '/notifications',
  '/settings',
];

/**
 * Routes that are accessible to all the users
 * regardless of whether they are logged in or not
 * or what their profile status is
 */
export const apiAuthPrefix = '/api/auth';

/**
 * Default redirect on sign in
 */
export const DEFAULT_SIGNIN_REDIRECT = '/home';

/**
 * Route which is used for authentication
 */
export const AUTH_ROUTE = '/signin';

/*
* Route which is used to fill out the profile
*/
export const PROFILE_ROUTE = '/profile';
