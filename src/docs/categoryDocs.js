const createCategory = {
  tags: ["Category"],
  description: "Create a new category",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the category",
              example: "Desserts",
            },
            description: {
              type: "string",
              description: "Optional description of the category",
              example: "Sweet dishes for dessert lovers",
            },
          },
          required: ["name"],
        },
      },
    },
  },
  responses: {
    201: {
      description: "Category created successfully",
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
                  description: { type: "string" },
                },
              },
            },
            example: {
              status: "success",
              data: {
                id: "64b9b29d8e44a529dcffba8a",
                name: "Desserts",
                description: "Sweet dishes for dessert lovers",
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
              message: "Validation error: Name is required",
            },
          },
        },
      },
    },
  },
};

const getAllCategories = {
  tags: ["Category"],
  description: "Get all categories",
  responses: {
    200: {
      description: "A list of all categories",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                name: { type: "string" },
                description: { type: "string" },
                recipeCount: { type: "number" },
              },
            },
            example: [
              {
                id: "64b9b29d8e44a529dcffba8a",
                name: "Desserts",
                description: "Sweet dishes for dessert lovers",
                recipeCount: 12,
              },
            ],
          },
        },
      },
    },
  },
};

const getCategoryById = {
  tags: ["Category"],
  description: "Get a single category by ID",
  parameters: [
    {
      in: "path",
      name: "id",
      schema: { type: "string" },
      required: true,
      description: "ID of the category",
      example: "64b9b29d8e44a529dcffba8a",
    },
  ],
  responses: {
    200: {
      description: "Category details",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              description: { type: "string" },
              recipeCount: { type: "number" },
            },
            example: {
              id: "64b9b29d8e44a529dcffba8a",
              name: "Desserts",
              description: "Sweet dishes for dessert lovers",
              recipeCount: 12,
            },
          },
        },
      },
    },
    404: {
      description: "Category not found",
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
              message: "Category not found",
            },
          },
        },
      },
    },
  },
};

const updateCategory = {
  tags: ["Category"],
  description: "Update a category by ID",
  parameters: [
    {
      in: "path",
      name: "id",
      schema: { type: "string" },
      required: true,
      description: "ID of the category to update",
      example: "64b9b29d8e44a529dcffba8a",
    },
  ],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Updated name of the category",
              example: "New Desserts",
            },
            description: {
              type: "string",
              description: "Updated description of the category",
              example: "Updated description for sweet dishes",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Category updated successfully",
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
                  description: { type: "string" },
                },
              },
            },
            example: {
              status: "success",
              data: {
                id: "64b9b29d8e44a529dcffba8a",
                name: "New Desserts",
                description: "Updated description for sweet dishes",
              },
            },
          },
        },
      },
    },
    404: {
      description: "Category not found",
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
              message: "Category not found",
            },
          },
        },
      },
    },
  },
};

const deleteCategory = {
  tags: ["Category"],
  description: "Delete a category by ID",
  parameters: [
    {
      in: "path",
      name: "id",
      schema: { type: "string" },
      required: true,
      description: "ID of the category to delete",
      example: "64b9b29d8e44a529dcffba8a",
    },
  ],
  responses: {
    200: {
      description: "Category deleted successfully",
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
              message: "Category deleted successfully",
            },
          },
        },
      },
    },
    404: {
      description: "Category not found",
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
              message: "Category not found",
            },
          },
        },
      },
    },
  },
};

const categoryRouteDocs = {
  "/api/categories": {
    get: getAllCategories,
    post: createCategory,
  },
  "/api/categories/{id}": {
    get: getCategoryById,
    put: updateCategory,
    delete: deleteCategory,
  },
};

module.exports = categoryRouteDocs;
