export type LoginRequest = { username: string; password: string };
export type CreateCharacterRequest = {
  first_name: string;
  last_name: string;
  sex: string;
  avatar: string;
};
export type RegisterRequest = { username: string; password: string };

export type SessionResponse = { access_token: string; token_type: string };

export type User = {
  username: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar: string | null;
  sex: string | null;
};
