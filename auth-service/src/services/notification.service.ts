import { ServiceMapperUtil } from "@shared/utils/service-mapper";

export interface INotificationService {
  notifyUserCreation(userId: string, email: string, baseRole: string): Promise<void>;
}

export class HttpNotificationService implements INotificationService {
  private readonly serviceMapper: ServiceMapperUtil;
  // You could inject an HTTP client here like axios

  constructor(serviceMapper: ServiceMapperUtil) {
    this.serviceMapper = serviceMapper;
  }

  async notifyUserCreation(userId: string, email: string, baseRole: string): Promise<void> {
    const serviceUrl = this.serviceMapper.getServiceFromRole(baseRole);
    if (!serviceUrl) return;

    try {
      // Example with axios:
      /*
      await axios.post(`http://${serviceUrl}/api/users`, {
        authUserId: userId,
        email,
        role: baseRole
      });
      */
      console.log(`Notified ${serviceUrl} about new user ${userId}`);
    } catch (error) {
      console.error(`Failed to notify ${serviceUrl}:`, error);
      throw error;
    }
  }
}
