export const /**
   * An array of routes that are accessible to the public
   * These routes do not require authentication
   * @type {string[]}
   */
  publicRoutes: string[] = ["/new-verification", "/"],
  /**
   * An array of routes that are used for authentication
   * These routes will redirect logged-in users to /settings
   * @type {string[]}
   */
  authRoutes: string[] = ["/sign-in", "/sign-up"],
  /**
   * The prefix for API authentication routes that start with this prefix are used for API authentication purposes
   * @type {string}
   */
  apiAuthPrefix: string = "/api/",
  /**
   * The default redirect path after logging in
   * @type {string}
   */
  DefaultLoginRedirect: string = "/dashboard";
