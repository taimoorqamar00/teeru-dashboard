interface IJwtPayload {
  fullName: string;
  email: string;
  phone: string;
  userId: string;
  role: "admin" | string;
  iat: number;
  exp: number;
}

export type { IJwtPayload };
