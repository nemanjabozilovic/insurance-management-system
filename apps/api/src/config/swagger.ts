import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Insurance Management System API',
      version: '1.0.0',
      description: 'API documentation for Insurance Management System',
    },
    servers: [
      {
        url: 'http://localhost:3002',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'User unique identifier',
            },
            username: {
              type: 'string',
              description: 'Unique username',
            },
            firstName: {
              type: 'string',
              description: 'First name',
            },
            lastName: {
              type: 'string',
              description: 'Last name',
            },
            dateOfBirth: {
              type: 'string',
              format: 'date-time',
              description: 'Date of birth',
            },
            address: {
              type: 'string',
              description: 'Address',
            },
            phoneNumber: {
              type: 'string',
              description: 'Phone number',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address',
            },
            profileImageUrl: {
              type: 'string',
              format: 'uri',
              nullable: true,
              description: 'Profile image URL',
            },
          },
          required: ['id', 'username', 'firstName', 'lastName', 'dateOfBirth', 'address', 'phoneNumber', 'email'],
        },
        Policy: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Policy unique identifier',
            },
            name: {
              type: 'string',
              description: 'Policy name',
            },
            shortDescription: {
              type: 'string',
              description: 'Short description of the policy',
            },
            monthlyPremium: {
              type: 'number',
              format: 'decimal',
              description: 'Monthly premium amount',
            },
          },
          required: ['id', 'name', 'shortDescription', 'monthlyPremium'],
        },
        UserWithPolicies: {
          type: 'object',
          allOf: [
            { $ref: '#/components/schemas/User' },
            {
              type: 'object',
              properties: {
                policies: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        format: 'uuid',
                      },
                      userId: {
                        type: 'string',
                        format: 'uuid',
                      },
                      policyId: {
                        type: 'string',
                        format: 'uuid',
                      },
                      createdAt: {
                        type: 'string',
                        format: 'date-time',
                      },
                      policy: {
                        $ref: '#/components/schemas/Policy',
                      },
                    },
                  },
                },
              },
            },
          ],
        },
        UserPolicy: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            userId: {
              type: 'string',
              format: 'uuid',
            },
            policyId: {
              type: 'string',
              format: 'uuid',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            policy: {
              $ref: '#/components/schemas/Policy',
            },
          },
          required: ['id', 'userId', 'policyId', 'createdAt'],
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                },
                code: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [
    './src/**/*.routes.ts',
    './src/**/*.controller.ts',
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
