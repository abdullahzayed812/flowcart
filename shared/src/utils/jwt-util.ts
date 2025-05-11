import { sign, verify, JwtPayload } from "jsonwebtoken";

export interface TokenPayload extends JwtPayload {
  userId: string;
  email: string;
  roles: string[];
  baseRole: string;
}

export class JwtUtil {
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;

  constructor(
    jwtSecret: string = process.env.JWT_SECRET || "your-secret-key",
    jwtExpiresIn: string = "1d" // Token valid for 1 day
  ) {
    this.jwtSecret = jwtSecret;
    this.jwtExpiresIn = jwtExpiresIn;
  }

  signToken(payload: Omit<TokenPayload, "iat" | "exp">): string {
    return sign(payload, this.jwtSecret, { expiresIn: this.jwtExpiresIn });
  }

  verifyToken(token: string): TokenPayload {
    try {
      return verify(token, this.jwtSecret) as TokenPayload;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
