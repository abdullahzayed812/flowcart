import { sign, verify } from "jsonwebtoken";
import { hash, compare } from "bcrypt";
// import { v4 as uuidv4 } from "uuid";
import { User } from "../models/user.model";

class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
  private readonly JWT_EXPIRES_IN = "1d"; // Token valid for 1 day

  async register(email: string, password: string, role: string): Promise<User> {
    try {
      // Check if user already exists
      const existingUser = await this.findUserByEmail(email);
      if (existingUser) {
        throw new Error("User already exists");
      }

      // Hash password
      const passwordHash = await hash(password, 10);

      // Create user in auth database
      const newUser = await this.createUser({
        id: "......................................",
        email,
        passwordHash,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Notify relevant service to create service-specific user record
      await this.notifyServiceUserCreation(newUser.id, email, role);

      return newUser;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<string> {
    // Find user
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Verify password
    const isPasswordValid = await compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Get user roles and permissions
    const roles = await this.getUserRoles(user.id);

    // Generate JWT token
    const token = sign(
      {
        userId: user.id,
        email: user.email,
        roles,
        role: user.role,
      },
      this.JWT_SECRET,
      { expiresIn: this.JWT_EXPIRES_IN }
    );

    return token;
  }

  verifyToken(token: string): any {
    try {
      const decoded = verify(token, this.JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  // Database interaction methods (implement based on your DB choice)
  private async findUserByEmail(email: string): Promise<User | null> {
    // Implementation depends on your database
    // Example with a hypothetical DB client:
    // return db.users.findOne({ email });
    return null; // Placeholder
  }

  private async createUser(user: User): Promise<User> {
    // Implementation depends on your database
    // Example: return db.users.insert(user);
    return user; // Placeholder
  }

  private async getUserRoles(userId: string): Promise<string[]> {
    // Get roles from database
    // Example: const userRoles = await db.userRoles.find({ userId });
    // return userRoles.map(role => role.name);
    return []; // Placeholder
  }

  private async notifyServiceUserCreation(userId: string, email: string, baseRole: string): Promise<void> {
    // Determine which service to notify based on baseRole
    const serviceToNotify = this.getServiceFromRole(baseRole);
    if (!serviceToNotify) return;

    try {
      // You could use message queue, direct API call, or event bus for this
      // Example with direct API call:
      /*
      await axios.post(`http://${serviceToNotify}/api/users`, {
        authUserId: userId,
        email,
        role: baseRole
      });
      */
      console.log(`Notified ${serviceToNotify} about new user ${userId}`);
    } catch (error) {
      console.error(`Failed to notify ${serviceToNotify}:`, error);
    }
  }

  private getServiceFromRole(baseRole: string): string | null {
    const roleServiceMap: Record<string, string> = {
      "ecommerce:customer": "ecommerce-service:3001",
      "ecommerce:admin": "ecommerce-service:3001",
      "shipping:admin": "shipping-service:3002",
      "shipping:courier": "shipping-service:3002",
      "warehouse:admin": "warehouse-service:3003",
      "warehouse:staff": "warehouse-service:3003",
    };

    return roleServiceMap[baseRole] || null;
  }
}

export default new AuthService();
