# ISera Biological - IT Asset Management System

A secure Spring Boot REST API for managing an organization's IT assets, employees, assignments, maintenance lifecycle, audit history, users, and dashboard information.

## Project Overview

The system is designed around an enterprise-style IT asset management workflow. It maintains master data such as departments, locations, asset categories, and vendors, then uses that data to manage employees, assets, asset assignments, maintenance records, audit logs, and authenticated users.

The application follows a layered backend architecture:

```text
Controller
   ↓
Service
   ↓
Repository
   ↓
MySQL Database
```

Cross-cutting concerns such as authentication, authorization, validation, exception handling, auditing, and API documentation are implemented around the core business modules.

## Main Modules

| Module | Purpose |
|---|---|
| Authentication | Login, JWT access/refresh tokens, refresh-token rotation, logout |
| Users & Roles | User accounts and role-based authorization |
| Departments | Department master data |
| Locations | Office/location master data |
| Employees | Employee records and user-account linkage |
| Asset Categories | Categories such as laptops and other IT equipment |
| Vendors | Vendor master data |
| Assets | IT asset lifecycle and status management |
| Asset Assignments | Assign and return assets to employees |
| Maintenance | Track issues from OPEN through IN_PROGRESS, RESOLVED, and CLOSED |
| Audit Logs | Record important business actions and state changes |
| Dashboard | Asset summary and operational statistics |
| Current User | Logged-in user's profile, assets, and assignments |

## Technology Stack

- Java 17
- Spring Boot 4.1.1
- Spring MVC
- Spring Security
- Spring Data JPA
- Hibernate ORM
- MySQL 8
- Flyway database migrations
- JWT / JJWT 0.13.0
- Maven Wrapper
- JUnit 6 / Spring Test
- Mockito
- MockMvc
- Springdoc OpenAPI / Swagger UI
- Postman
- Git

## Security

The API uses stateless JWT-based authentication.

Authentication flow:

```text
Login
  ↓
Access Token + Refresh Token
  ↓
Authorization: Bearer <access-token>
  ↓
JWT Authentication Filter
  ↓
Role-based authorization
```

The application distinguishes between:

- `401 Unauthorized` - missing or invalid authentication
- `403 Forbidden` - authenticated user does not have permission for the requested resource

Configured roles include:

```text
ADMIN
IT_ADMIN
IT_SUPPORT
MANAGER
EMPLOYEE
```

Examples of protected areas include users, employee management, assets, assignments, maintenance, audit logs, and dashboard access according to role.

## Important Business Rules

### Asset lifecycle

Assets can move through statuses such as:

```text
IN_STOCK
ASSIGNED
UNDER_MAINTENANCE
RETURNED
RETIRED
DISPOSED
```

### Assignment lifecycle

```text
IN_STOCK asset
      ↓
   Assign
      ↓
ASSIGNED asset + ACTIVE assignment
      ↓
   Return
      ↓
IN_STOCK asset + RETURNED assignment
```

The service layer prevents assigning an asset that is not available for assignment.

### Maintenance lifecycle

```text
OPEN
 ↓
IN_PROGRESS
 ↓
RESOLVED
 ↓
CLOSED
```

Starting, resolving, and closing maintenance records are status-controlled operations. When maintenance is closed, the asset is returned to the appropriate operational status based on whether an active assignment exists.

## Audit Logging

Important state-changing operations generate audit records containing information such as:

- action
- entity type
- entity ID
- previous state
- new state
- user
- IP address
- timestamp

Examples of recorded actions include asset assignment and return, maintenance creation/start/resolve/close, and related lifecycle changes.

## Database & Flyway

Database migrations are stored under:

```text
src/main/resources/db/migration
```

Current migration sequence:

```text
V1__create_initial_schema.sql
V2__insert_initial_master_data.sql
V3__add_token_version_to_users.sql
V4__link_employees_to_users.sql
```

The application uses Flyway for versioned schema management and Hibernate validation rather than automatic schema creation.

## Configuration

The application is configured for MySQL and runs on port `8080`.

Typical local configuration:

```properties
spring.application.name=isera-it-asset-management
spring.datasource.url=jdbc:mysql://localhost:3307/isera_asset_management
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.open-in-view=false
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration
```

JWT settings are configured separately in `application.properties`.

For a real deployment, database credentials and JWT secrets should be supplied through environment variables or a secure configuration mechanism rather than committed to source control.

## Running the Application

### Prerequisites

- Java 17
- MySQL 8
- IntelliJ IDEA or another Java IDE

### Start MySQL

Create the application database:

```sql
CREATE DATABASE isera_asset_management;
```

Ensure the configured MySQL port and credentials match `application.properties`.

### Run with IntelliJ

Open the project and run:

```text
IseraItAssetManagementApplication
```

The application starts on:

```text
http://localhost:8080
```

### Run with Maven Wrapper on Windows

Use the Maven Wrapper included with the project:

```powershell
.\mvnw.cmd clean test
```

To start the application from the terminal:

```powershell
.\mvnw.cmd spring-boot:run
```

## API Documentation

Swagger UI is available at:

```text
http://localhost:8080/swagger-ui.html
```

OpenAPI JSON is available at:

```text
http://localhost:8080/v3/api-docs
```

The API documentation includes bearer-token authentication configuration for protected endpoints.

## API Areas

The main API groups use the `/api/v1` base path.

```text
/api/v1/auth/**
/api/v1/departments/**
/api/v1/locations/**
/api/v1/asset-categories/**
/api/v1/vendors/**
/api/v1/employees/**
/api/v1/assets/**
/api/v1/asset-assignments/**
/api/v1/maintenance/**
/api/v1/audit-logs/**
/api/v1/users/**
/api/v1/me/**
/api/v1/dashboard/**
```

## Testing

The project contains unit, repository, controller, security, and integration tests.

The complete regression suite currently passes:

```text
84 tests passed
0 failures
0 errors
```

A clean Maven test build also completes successfully using the Maven Wrapper:

```powershell
.\mvnw.cmd clean test
```

Postman API testing has also been performed during development, including authentication and the asset assignment/return lifecycle.

### Integration scenario

A representative business flow is:

```text
Login
  ↓
Create/verify employee
  ↓
Create/verify asset
  ↓
Assign asset
  ↓
Verify asset status
  ↓
Return asset
  ↓
Verify asset status
  ↓
Verify audit records
```

## Exception Handling

The application uses centralized REST exception handling for common failures, including:

- resource not found
- duplicate resource
- invalid token
- validation errors
- unauthorized requests
- forbidden requests
- unexpected server errors

Validation errors are returned as structured API error responses rather than raw framework exceptions.

## Project Structure

A simplified package structure is:

```text
src/main/java/com/isera/assetmanagement
│
├── auth
├── audit
├── asset
├── assignment
├── config
├── dashboard
├── employee
├── exception
├── maintenance
├── security
├── user
└── IseraItAssetManagementApplication.java
```

Tests are organized under:

```text
src/test/java/com/isera/assetmanagement
```

and cover the major service, repository, controller, security, and integration layers.

## Development Approach

The project was developed using the following workflow:

```text
1. Understand the requirement
2. Design the solution
3. Implement the code
4. Run the application
5. Test with Postman / automated tests
6. Debug issues
7. Verify the business behavior
```

## Production Considerations

Before a production deployment, review at least the following:

- move database credentials out of source control
- use a strong production JWT secret
- configure environment-specific properties
- configure HTTPS
- review CORS policy if a frontend is introduced
- add production logging and monitoring
- configure database backups
- review API rate limiting and infrastructure security
- configure CI/CD and deployment environment variables

## Project Status

```text
Core backend modules       ✅
JWT authentication         ✅
Role-based authorization   ✅
CRUD/business workflows    ✅
Asset lifecycle            ✅
Assignment lifecycle      ✅
Maintenance lifecycle     ✅
Audit logging              ✅
Dashboard                  ✅
Swagger/OpenAPI            ✅
Postman testing            ✅
Automated testing          ✅ 84/84
Clean build                ✅
```

## License

This project is intended as an enterprise-style IT Asset Management backend project for development, learning, demonstration, and portfolio purposes.
