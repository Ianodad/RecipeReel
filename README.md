# RecipeReel API

A NodeJS backend service for managing recipes with user authentication and authorization.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Server runs on
http://localhost:4000/api/

# API Documentation
http://localhost:4000/api-docs
```

## API Endpoints

### Authentication

#### POST `/api/auth/register`
Register a new user with name, email, password, and role (Admin/Contributor/Viewer).

#### POST `/api/auth/login`
Login with email and password to receive JWT token.

#### POST `/api/auth/forgot-password`
Request password reset via email.

#### POST `/api/auth/reset-password`
Reset password using token received via email.

### Recipes

#### GET `/api/recipes`
Get all recipes. No authentication required.

#### POST `/api/recipes`
Create new recipe (Contributor/Admin only). Requires authentication.

#### GET `/api/recipes/{recipe_id}`
Get specific recipe by ID.

#### PUT `/api/recipes/{recipe_id}`
Update recipe (Contributor/Admin only). Requires authentication.

#### DELETE `/api/recipes/{recipe_id}`
Delete recipe (Contributor/Admin only). Requires authentication.

#### PATCH `/api/recipes/{recipe_id}/approve`
Approve recipe (Admin only). Requires authentication.

### Users

#### GET `/api/users`
Get all users (Admin only). Requires authentication.

#### GET `/api/users/me`
Get current user profile. Requires authentication.

#### GET `/api/users/{user_id}`
Get user by ID (Admin only). Requires authentication.

#### PUT `/api/users/{user_id}`
Update user (Admin only). Requires authentication.

#### DELETE `/api/users/{user_id}`
Delete user (Admin only). Requires authentication.

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

## Role-Based Access

- **Admin**: Full access to all endpoints
- **Contributor**: Can create/edit recipes
- **Viewer**: Can only view recipes

## Error Responses

All endpoints return consistent error responses:

```json
{
  "status": "error",
  "message": "Error description"
}
```

Common status codes:
- 200/201: Success
- 400: Invalid input
- 401: Unauthorized
- 404: Not found