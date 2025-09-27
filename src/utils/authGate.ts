export type LoginCredentials = {
  username: string;
  password: string;
};

// Verify the login credentials are exactly the demo username and password
export function authGate({ username, password }: LoginCredentials): boolean {
  if (!username || !password) return false;

  // only allow the username 'demo'
  if (username !== "demo") return false;

  // only allow the password 'test1234'
  if (password !== "test1234") return false;

  return true;
}
