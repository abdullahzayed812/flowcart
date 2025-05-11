export class ServiceMapperUtil {
  private readonly roleServiceMap: Record<string, string>;

  constructor(roleServiceMap?: Record<string, string>) {
    this.roleServiceMap = roleServiceMap || {
      "ecommerce:customer": "ecommerce-service:3001",
      "ecommerce:admin": "ecommerce-service:3001",
      "shipping:admin": "shipping-service:3002",
      "shipping:courier": "shipping-service:3002",
      "warehouse:admin": "warehouse-service:3003",
      "warehouse:staff": "warehouse-service:3003",
    };
  }

  getServiceFromRole(baseRole: string): string | null {
    return this.roleServiceMap[baseRole] || null;
  }
}
