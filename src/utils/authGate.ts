export type LoginCredentials = {
  username: string;
  password: string;
};

// Verify the login credentials are exactly the demo username and password
export function authGate({ username, password }: LoginCredentials): boolean {
  if (!username || !password) return false;

  if (!process.env.USERNAME || !process.env.PASSWORD)
    throw new Error(
      "Error: No user credentials are configured for authenticate."
    );
  // only allow the username 'demo'
  if (username !== process.env.USERNAME) return false;

  // only allow the password 'test1234'
  if (password !== process.env.PASSWORD) return false;

  return true;
}
