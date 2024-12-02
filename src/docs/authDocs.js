const login = {
  tags: ["Auth"],
  description: "Login user ",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: {
              type: "string",
              description: "Your email",
              example: "john@gmail.com",
            },
            password: {
              type: "string",
              description: "your password",
              example: "password123!",
            },
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: "OK",
      content: {
        "application/json": {
          type: "object",
          example: {
            status: "success",
            data: [],
          },
        },
      },
    },
  },
};

const authRouteDocs = {
  "/api/auth/login": {
    post: login,
  },
};

module.exports = authRouteDocs;
