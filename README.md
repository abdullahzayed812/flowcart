# **FlowCart App Documentation**

## **1. Overview**

FlowCart is a multi-service application designed to manage e-commerce, warehouse, and shipping operations for businesses. The app is modular and designed with a microservices architecture, with each service (E-commerce, Warehouse, and Shipping) running independently but connected to shared resources like a database.

The app utilizes **Node.js**, **TypeScript**, and **MySQL** for data persistence, with **Express** for the backend framework. The services communicate through internal APIs, and each service has its own database, ensuring scalability and flexibility.

The app is designed with Object-Oriented Programming (OOP) principles, allowing for clean, reusable, and maintainable code across services. The system is also integrated with **Docker** for containerization and **PM2** for process management.

---

## **2. Features**

### **2.1. E-commerce Service**

- **Product Management**: Handle the listing, updating, and removal of products.
- **Order Management**: Manage customer orders, process payments, and handle order statuses.
- **Customer Management**: Store and retrieve customer information.
- **Inventory Integration**: Sync inventory status from the Warehouse service.
- **Shipping Integration**: Communicate with the Shipping service to track and process shipments.

### **2.2. Warehouse Service**

- **Inventory Management**: Manage stock levels for products.
- **Stock Updates**: Sync with the E-commerce service to reflect real-time inventory changes.
- **Stock Alerts**: Trigger alerts when stock reaches a predefined threshold.

### **2.3. Shipping Service**

- **Shipping Requests**: Handle requests from the E-commerce service to process shipments.
- **Shipment Tracking**: Provide shipment tracking functionality and updates.
- **Label Generation**: Generate shipping labels based on shipment data.

### **2.4. Shared Services**

- **Database Connection**: MySQL connection is managed by a Singleton class to ensure a single point of database connection initialization across services.
- **Error Handling**: A centralized error-handling middleware for consistent and meaningful error responses across services.
- **Logging**: Logging functionality for tracking service activities and debugging.

---

## **3. Technologies**

- **Node.js**: Backend runtime environment for executing JavaScript/TypeScript.
- **TypeScript**: Superset of JavaScript with strong static typing.
- **Express.js**: Web framework for building REST APIs.
- **MySQL**: Relational database used for storing business and transactional data.
- **Docker**: Containerization tool used to package services for consistent development and production environments.
- **PM2**: Process manager for Node.js applications, used for keeping services running, automatic restarts, and logging.
- **Winston**: Logging library to capture logs and errors in a structured manner.
- **Jest**: Unit testing framework to ensure quality and correctness.

---

## **4. API Documentation**

The API for each service follows RESTful principles. Each service (eCommerce, Warehouse, and Shipping) exposes its own set of endpoints that can be accessed independently.

### **4.1. eCommerce Service API**

#### **Base URL**: `http://localhost:3001`

#### **Endpoints**:

1. **GET /products**

   - **Description**: Retrieve a list of all products in the eCommerce store.
   - **Response**:
     ```json
     [
       {
         "id": 1,
         "name": "Product 1",
         "price": 100.0,
         "stock": 50
       }
     ]
     ```
   - **Status**: `200 OK`

2. **POST /orders**

   - **Description**: Create a new order for a customer.
   - **Request Body**:
     ```json
     {
       "customerId": 1,
       "products": [
         {
           "productId": 1,
           "quantity": 2
         }
       ],
       "totalPrice": 200.0
     }
     ```
   - **Response**:
     ```json
     {
       "orderId": 12345,
       "status": "Pending"
     }
     ```
   - **Status**: `201 Created`

3. **GET /orders/:orderId**

   - **Description**: Retrieve the details of a specific order.
   - **Response**:
     ```json
     {
       "orderId": 12345,
       "customerId": 1,
       "products": [
         {
           "productId": 1,
           "quantity": 2
         }
       ],
       "totalPrice": 200.0,
       "status": "Pending"
     }
     ```
   - **Status**: `200 OK`

4. **GET /health**
   - **Description**: Check the health of the eCommerce service.
   - **Response**:
     ```json
     "Service is healthy!"
     ```
   - **Status**: `200 OK`

---

### **4.2. Warehouse Service API**

#### **Base URL**: `http://localhost:3001`

#### **Endpoints**:

1. **GET /inventory**

   - **Description**: Retrieve the current inventory of products.
   - **Response**:
     ```json
     [
       {
         "productId": 1,
         "stock": 50
       }
     ]
     ```
   - **Status**: `200 OK`

2. **PUT /inventory/:productId**

   - **Description**: Update the stock quantity of a specific product.
   - **Request Body**:
     ```json
     {
       "stock": 45
     }
     ```
   - **Response**:
     ```json
     {
       "productId": 1,
       "stock": 45
     }
     ```
   - **Status**: `200 OK`

3. **GET /health**
   - **Description**: Check the health of the Warehouse service.
   - **Response**:
     ```json
     "Service is healthy!"
     ```
   - **Status**: `200 OK`

---

### **4.3. Shipping Service API**

#### **Base URL**: `http://localhost:3002`

#### **Endpoints**:

1. **POST /shipments**

   - **Description**: Create a new shipment request.
   - **Request Body**:
     ```json
     {
       "orderId": 12345,
       "address": "123 Shipping St.",
       "carrier": "DHL"
     }
     ```
   - **Response**:
     ```json
     {
       "shipmentId": 67890,
       "status": "Shipped"
     }
     ```
   - **Status**: `201 Created`

2. **GET /shipments/:shipmentId**

   - **Description**: Retrieve the status of a specific shipment.
   - **Response**:
     ```json
     {
       "shipmentId": 67890,
       "status": "Shipped",
       "trackingNumber": "DHL123456"
     }
     ```
   - **Status**: `200 OK`

3. **GET /health**
   - **Description**: Check the health of the Shipping service.
   - **Response**:
     ```json
     "Service is healthy!"
     ```
   - **Status**: `200 OK`

---

## **5. Error Handling**

The application uses a centralized error-handling middleware that catches all errors and formats them in a standard way before sending them as a response. Errors are logged using the `winston` logger for easier debugging and monitoring.

### **Example Error Response:**

```json
{
  "error": "Invalid request body",
  "message": "The 'products' field is required in the request body"
}
```

## **6. Database and Configuration**

### **6.1. Database**

Each service uses its own MySQL database, which is initialized during the startup of the service. The connection is handled through the MySQLConnection class in the shared module.

### **6.2. Configuration**

The app's configuration (like database connection parameters) is loaded from environment variables using the dotenv package. All environment variables are defined in a .env file, which is loaded during application initialization.

### **Folders Structure**

/flowcart-project
│
├── /shared
│ ├── /middlewares
│ │ ├── proxyMiddleware.ts # Native proxy middleware
│ │ ├── authMiddleware.ts # Token + Role verification middleware
│ │ └── errorHandler.ts # Global error handler
│ ├── /database
│ │ └── mysql-connection.ts # Singleton DB connector class
│ ├── /utils
│ │ └── responseHandler.ts # Class to handle responses with status codes
│ ├── index.ts # Barrel file exports everything
│ └── types.ts # Shared types/interfaces
│
├── /gateway
│ ├── server.ts # Main entry with proxy routing
│ └── .env # Env file for gateway configs
│
├── /ecommerce-service
│ ├── /src
│ │ ├── /controllers
│ │ │ └── productController.ts # Handles logic for product endpoints
│ │ ├── /services
│ │ │ └── productService.ts # Handles business logic
│ │ ├── /repositories
│ │ │ └── productRepo.ts # Executes queries
│ │ ├── /routes
│ │ │ └── productRoutes.ts
│ │ ├── db.ts # Initializes DB from shared connection
│ │ ├── index.ts # Boots app
│ │ └── server.ts # Express setup and middleware registration
│ └── .env
│
├── /auth-service
│ ├── /src
│ │ ├── /controllers
│ │ ├── /services
│ │ ├── /routes
│ │ ├── db.ts
│ │ └── index.ts / server.ts
│ └── .env
│
└── README.md # Full documentation
