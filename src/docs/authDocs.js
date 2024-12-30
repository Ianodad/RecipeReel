// authDocs.js

const register = {
  tags: ["Auth"],
  description: "Register a new user",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Full name of the user",
              example: "John Doe",
            },
            email: {
              type: "string",
              description: "Valid email address of the user",
              example: "john.doe@example.com",
            },
            password: {
              type: "string",
              description: "Password for the new account",
              example: "password123",
            },
            role: {
              type: "string",
              description: "User role (Admin, Contributor, or Viewer)",
              example: "Contributor",
            },
          },
          required: ["name", "email", "password", "role"],
        },
      },
    },
  },
  responses: {
    201: {
      description: "User Registered Successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "string",
              },
              data: {
                type: "object",
                properties: {
                  userId: { type: "string" },
                  name: { type: "string" },
                  email: { type: "string" },
                  role: { type: "string" },
                },
              },
            },
            example: {
              status: "success",
              data: {
                userId: "12345",
                name: "John Doe",
                email: "john.doe@example.com",
                role: "Contributor",
              },
            },
          },
        },
      },
    },
    400: {
      description: "Invalid input data",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string" },
              message: { type: "string" },
            },
            example: {
              status: "error",
              message: "Email already in use or validation error",
            },
          },
        },
      },
    },
  },
};

const login = {
  tags: ["Auth"],
  description: "Login user",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: {
              type: "string",
              description: "Registered email address",
              example: "john.doe@example.com",
            },
            password: {
              type: "string",
              description: "User password",
              example: "password123",
            },
          },
          required: ["email", "password"],
        },
      },
    },
  },
  responses: {
    200: {
      description: "Login successful",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string" },
              token: { type: "string" },
            },
            example: {
              status: "success",
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....",
            },
          },
        },
      },
    },
    401: {
      description: "Unauthorized - Invalid credentials",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string" },
              message: { type: "string" },
            },
            example: {
              status: "error",
              message: "Invalid email or password",
            },
          },
        },
      },
    },
  },
};

const forgotPassword = {
  tags: ["Auth"],
  description: "Initiate password reset",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: {
              type: "string",
              description: "Registered email address to reset password",
              example: "john.doe@example.com",
            },
          },
          required: ["email"],
        },
      },
    },
  },
  responses: {
    200: {
      description: "Email sent with password reset instructions",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string" },
              message: { type: "string" },
            },
            example: {
              status: "success",
              message: "Password reset instructions sent to the email",
            },
          },
        },
      },
    },
    404: {
      description: "Email not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string" },
              message: { type: "string" },
            },
            example: {
              status: "error",
              message: "User with this email does not exist",
            },
          },
        },
      },
    },
  },
};

const resetPassword = {
  tags: ["Auth"],
  description: "Reset user password using a valid reset token",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            token: {
              type: "string",
              description: "Password reset token from email",
              example: "ABC123TOKEN",
            },
            newPassword: {
              type: "string",
              description: "New password for the user",
              example: "myNewSecurePassword",
            },
          },
          required: ["token", "newPassword"],
        },
      },
    },
  },
  responses: {
    200: {
      description: "Password reset successful",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string" },
              message: { type: "string" },
            },
            example: {
              status: "success",
              message: "Password has been reset",
            },
          },
        },
      },
    },
    400: {
      description: "Invalid or expired reset token",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string" },
              message: { type: "string" },
            },
            example: {
              status: "error",
              message: "Invalid or expired token",
            },
          },
        },
      },
    },
  },
};

const authRouteDocs = {
  "/api/auth/register": {
    post: register,
  },
  "/api/auth/login": {
    post: login,
  },
  "/api/auth/forgot-password": {
    post: forgotPassword,
  },
  "/api/auth/reset-password": {
    post: resetPassword,
  },
};

module.exports = authRouteDocs;
