// recipeDocs.js

const getAllRecipes = {
  tags: ["Recipes"],
  description: "Retrieve a list of all recipes",
  responses: {
    200: {
      description: "List of recipes retrieved successfully",
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
                    _id: { type: "string" },
                    title: { type: "string" },
                    description: { type: "string" },
                    category: { type: "string" },
                    prepTime: { type: "number" },
                    cookTime: { type: "number" },
                    servings: { type: "number" },
                  },
                },
              },
            },
            example: {
              status: "success",
              data: [
                {
                  _id: "64f5b6837b7e4a",
                  title: "Delicious Pancakes",
                  description: "Fluffy pancakes perfect for breakfast.",
                  category: "Breakfast",
                  prepTime: 10,
                  cookTime: 15,
                  servings: 4,
                },
                {
                  _id: "64f5b6840cab2f",
                  title: "Spaghetti Carbonara",
                  description: "Creamy and savory Italian pasta dish.",
                  category: "Main Course",
                  prepTime: 15,
                  cookTime: 20,
                  servings: 2,
                },
              ],
            },
          },
        },
      },
    },
  },
};

const getRecipeById = {
  tags: ["Recipes"],
  description: "Retrieve a single recipe by its ID",
  parameters: [
    {
      name: "recipe_id",
      in: "path",
      description: "ID of the recipe to retrieve",
      required: true,
      schema: {
        type: "string",
      },
      example: "64f5b6837b7e4a",
    },
  ],
  responses: {
    200: {
      description: "Recipe retrieved successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string" },
              data: {
                type: "object",
                properties: {
                  _id: { type: "string" },
                  title: { type: "string" },
                  description: { type: "string" },
                  category: { type: "string" },
                  prepTime: { type: "number" },
                  cookTime: { type: "number" },
                  servings: { type: "number" },
                },
              },
            },
            example: {
              status: "success",
              data: {
                _id: "64f5b6837b7e4a",
                title: "Delicious Pancakes",
                description: "Fluffy pancakes perfect for breakfast.",
                category: "Breakfast",
                prepTime: 10,
                cookTime: 15,
                servings: 4,
              },
            },
          },
        },
      },
    },
    404: {
      description: "Recipe not found",
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
              message: "No recipe found with this ID",
            },
          },
        },
      },
    },
  },
};

const createRecipe = {
  tags: ["Recipes"],
  description: "Create a new recipe (Contributor or Admin only)",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            title: { type: "string", example: "Delicious Pancakes" },
            description: {
              type: "string",
              example: "Fluffy pancakes perfect for breakfast.",
            },
            ingredients: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Flour" },
                  quantity: { type: "string", example: "2 cups" },
                },
              },
            },
            instructions: {
              type: "string",
              example: "Mix ingredients and cook on a griddle.",
            },
            category: { type: "string", example: "Breakfast" },
            prepTime: { type: "number", example: 10 },
            cookTime: { type: "number", example: 15 },
            servings: { type: "number", example: 4 },
          },
          required: ["title", "description"],
        },
      },
    },
  },
  responses: {
    201: {
      description: "Recipe created successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string" },
              data: { type: "object" },
            },
            example: {
              status: "success",
              data: {
                _id: "64f5b6837b7e4a",
                title: "Delicious Pancakes",
                description: "Fluffy pancakes perfect for breakfast.",
                category: "Breakfast",
                prepTime: 10,
                cookTime: 15,
                servings: 4,
              },
            },
          },
        },
      },
    },
    401: {
      description: "Unauthorized",
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
              message: "Missing or invalid token",
            },
          },
        },
      },
    },
    400: {
      description: "Validation error or invalid input",
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
              message: "Invalid request data",
            },
          },
        },
      },
    },
  },
};

const updateRecipe = {
  tags: ["Recipes"],
  description: "Update an existing recipe by ID (Contributor or Admin only)",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "recipe_id",
      in: "path",
      description: "ID of the recipe to update",
      required: true,
      schema: {
        type: "string",
      },
      example: "64f5b6837b7e4a",
    },
  ],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            description: {
              type: "string",
              example: "Even fluffier pancakes with extra ingredients.",
            },
            prepTime: { type: "number", example: 15 },
            // add other fields you allow updating
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Recipe updated successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string" },
              data: { type: "object" },
            },
            example: {
              status: "success",
              data: {
                _id: "64f5b6837b7e4a",
                title: "Delicious Pancakes",
                description: "Even fluffier pancakes with extra ingredients.",
                category: "Breakfast",
                prepTime: 15,
                cookTime: 15,
                servings: 4,
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
              message: "User not authorized",
            },
          },
        },
      },
    },
    404: {
      description: "Recipe not found",
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
              message: "No recipe found with this ID",
            },
          },
        },
      },
    },
  },
};

const deleteRecipe = {
  tags: ["Recipes"],
  description: "Delete an existing recipe by ID (Contributor or Admin only)",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "recipe_id",
      in: "path",
      description: "ID of the recipe to delete",
      required: true,
      schema: {
        type: "string",
      },
      example: "64f5b6837b7e4a",
    },
  ],
  responses: {
    200: {
      description: "Recipe deleted successfully",
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
              message: "Recipe has been deleted",
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
              message: "User not authorized",
            },
          },
        },
      },
    },
    404: {
      description: "Recipe not found",
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
              message: "No recipe found with this ID",
            },
          },
        },
      },
    },
  },
};

const approveRecipe = {
  tags: ["Recipes"],
  description: "Approve a recipe by ID (Admin only)",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "recipe_id",
      in: "path",
      description: "ID of the recipe to approve",
      required: true,
      schema: {
        type: "string",
      },
      example: "64f5b6837b7e4a",
    },
  ],
  requestBody: {
    required: false,
    content: {
      "application/json": {
        schema: {
          type: "object",
          description: "No body needed for approval, or pass an empty object",
          example: {},
        },
      },
    },
  },
  responses: {
    200: {
      description: "Recipe approved successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string" },
              data: {
                type: "object",
                properties: {
                  approved: { type: "boolean" },
                },
              },
            },
            example: {
              status: "success",
              data: {
                _id: "64f5b6837b7e4a",
                title: "Delicious Pancakes",
                approved: true,
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
              message: "User not authorized (not Admin)",
            },
          },
        },
      },
    },
    404: {
      description: "Recipe not found",
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
              message: "No recipe found with this ID",
            },
          },
        },
      },
    },
  },
};

const recipeRouteDocs = {
  "/api/recipes": {
    get: getAllRecipes,
    post: createRecipe,
  },
  "/api/recipes/{recipe_id}": {
    get: getRecipeById,
    put: updateRecipe,
    delete: deleteRecipe,
  },
  "/api/recipes/{recipe_id}/approve": {
    patch: approveRecipe,
  },
};

module.exports = recipeRouteDocs;
