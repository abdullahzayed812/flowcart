import { hash, compare } from "bcrypt";
import { randomUUID } from "crypto";
import { User } from "../models/user.model";
import { IUserRepository } from "../repositories/user.repository";
import { JwtUtil } from "@shared/index";
import { INotificationService } from "./notification.service";

export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtUtil: JwtUtil,
    private readonly notificationService: INotificationService
  ) {}

  async registerUser(email: string, password: string, baseRole: string): Promise<User> {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        throw new Error("User already exists");
      }

      // Hash password
      const passwordHash = await hash(password, 10);

      // Create user in auth database
      const newUser = await this.userRepository.create({
        id: randomUUID(),
        email,
        passwordHash,
        baseRole,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Notify relevant service to create service-specific user record
      await this.notificationService.notifyUserCreation(newUser.id, email, baseRole);

      return newUser;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<string> {
    // Find user
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Verify password
    const isPasswordValid = await compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Get user roles and permissions
    const roles = await this.userRepository.getUserRoles(user.id);

    // Generate JWT token
    const token = this.jwtUtil.signToken({
      userId: user.id,
      email: user.email,
      roles,
      baseRole: user.baseRole,
    });

    return token;
  }

  verifyToken(token: string): any {
    return this.jwtUtil.verifyToken(token);
  }
}
