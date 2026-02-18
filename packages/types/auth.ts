export type AuthRequest = {
    email: string;
    password: string;
    username?: string;
  };
  
  export type AuthResponse = {
    token: string;
    userId: number;
  };
  