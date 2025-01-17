// userDocs.js

const getAllUsers = {
  tags: ["Users"],
  description: "Retrieve a list of all users (Admin or authorized role only)",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: "List of users retrieved successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string" },
              data: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    name: { type: "string" },
                    email: { type: "string" },
                    role: { type: "string" },
                  },
                },
              },
            },
            example: {
              status: "success",
              data: [
                {
                  id: "12345",
                  name: "John Doe",
                  email: "john.doe@example.com",
                  role: "Contributor",
                },
                {
                  id: "23456",
                  name: "Jane Smith",
                  email: "jane.smith@example.com",
                  role: "Admin",
                },
              ],
            },
          },
        },
      },
    },
    401: {
      description: "Unauthorized - missing or invalid token",
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
              message: "Invalid token or insufficient privileges",
            },
          },
        },
      },
    },
  },
};

const getCurrentUser = {
  tags: ["Users"],
  description: "Retrieve the profile of the currently logged-in user",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: "Current user details",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string" },
              data: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  email: { type: "string" },
                  role: { type: "string" },
                },
              },
            },
            example: {
              status: "success",
              data: {
                id: "12345",
                name: "John Doe",
                email: "john.doe@example.com",
                role: "Contributor",
              },
            },
          },
        },
      },
    },
    401: {
      description: "Unauthorized - missing or invalid token",
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
              message: "Invalid token or user not found",
            },
          },
        },
      },
    },
  },
};

const getUserById = {
  tags: ["Users"],
  description:
    "Retrieve a specific user's details by user ID (Admin or authorized role)",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "user_id",
      in: "path",
      description: "ID of the user to retrieve",
      required: true,
      schema: {
        type: "string",
      },
      example: "12345",
    },
  ],
  responses: {
    200: {
      description: "User details retrieved successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string" },
              data: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  email: { type: "string" },
                  role: { type: "string" },
                },
              },
            },
            example: {
              status: "success",
              data: {
                id: "12345",
                name: "John Doe",
                email: "john.doe@example.com",
                role: "Contributor",
              },
            },
          },
        },
      },
    },
    404: {
      description: "User not found",
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
              message: "No user found with this ID",
            },
          },
        },
      },
    },
    401: {
      description: "Unauthorized - missing or invalid token",
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
              message: "Invalid token or insufficient privileges",
            },
          },
        },
      },
    },
  },
};

const updateUser = {
  tags: ["Users"],
  description:
    "Update a user's information by user ID (Admin or authorized role)",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "user_id",
      in: "path",
      description: "ID of the user to update",
      required: true,
      schema: {
        type: "string",
      },
      example: "12345",
    },
  ],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: { type: "string", example: "John Updated" },
            email: { type: "string", example: "john.updated@example.com" },
            role: {
              type: "string",
              description: "One of Admin, Contributor, or Viewer",
              example: "Admin",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "User updated successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string" },
              data: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  email: { type: "string" },
                  role: { type: "string" },
                },
              },
            },
            example: {
              status: "success",
              data: {
                id: "12345",
                name: "John Updated",
                email: "john.updated@example.com",
                role: "Admin",
              },
            },
          },
        },
      },
    },
    400: {
      description: "Invalid request or validation error",
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
              message: "Invalid user ID or validation error",
            },
          },
        },
      },
    },
    401: {
      description: "Unauthorized - missing or invalid token",
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
              message: "Invalid token or insufficient privileges",
            },
          },
        },
      },
    },
  },
};

const updateUserRole = {
  tags: ["Users"],
  description: "Update the role of a user by user ID (Admin only)",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "ID of the user whose role is to be updated",
      required: true,
      schema: {
        type: "string",
      },
      example: "12345",
    },
  ],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            role: {
              type: "string",
              enum: ["Admin", "Contributor", "Viewer"],
              description: "The new role for the user",
              example: "Admin",
            },
          },
          required: ["role"],
        },
      },
    },
  },
  responses: {
    200: {
      description: "User role updated successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string" },
              message: { type: "string" },
              data: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  email: { type: "string" },
                  role: { type: "string" },
                },
              },
            },
            example: {
              status: "success",
              message: "User role updated successfully",
              data: {
                id: "12345",
                name: "John Doe",
                email: "john.doe@example.com",
                role: "Admin",
              },
            },
          },
        },
      },
    },
    400: {
      description: "Invalid role or request body",
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
              message:
                "Invalid role. Allowed roles are Admin, Contributor, Viewer.",
            },
          },
        },
      },
    },
    404: {
      description: "User not found",
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
              message: "User not found",
            },
          },
        },
      },
    },
    401: {
      description: "Unauthorized - missing or invalid token",
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
              message: "Invalid token or insufficient privileges",
            },
          },
        },
      },
    },
  },
};

const deleteUser = {
  tags: ["Users"],
  description: "Delete a user by ID (Admin or authorized role)",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "user_id",
      in: "path",
      description: "ID of the user to delete",
      required: true,
      schema: {
        type: "string",
      },
      example: "12345",
    },
  ],
  responses: {
    200: {
      description: "User deleted successfully",
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
              message: "User has been deleted",
            },
          },
        },
      },
    },
    404: {
      description: "User not found",
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
              message: "No user found with this ID",
            },
          },
        },
      },
    },
    401: {
      description: "Unauthorized - missing or invalid token",
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
              message: "Invalid token or insufficient privileges",
            },
          },
        },
      },
    },
  },
};

const userRouteDocs = {
  "/api/users": {
    get: getAllUsers,
  },
  "/api/users/me": {
    get: getCurrentUser,
  },
  "/api/users/{user_id}": {
    get: getUserById,
    put: updateUser,
    delete: deleteUser,
  },
  "/api/users/{id}/role": {
    patch: updateUserRole,
  },
};

module.exports = userRouteDocs;
