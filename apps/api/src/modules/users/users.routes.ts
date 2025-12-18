import { Router } from 'express';
import { usersController } from './users.controller';
import { validateBody } from '../../shared/validation';
import { createUserSchema, updateUserSchema } from './users.validation';

export const usersRoutes = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
usersRoutes.get('/', usersController.getAll);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - firstName
 *               - lastName
 *               - dateOfBirth
 *               - address
 *               - phoneNumber
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *               firstName:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *               lastName:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *               dateOfBirth:
 *                 type: string
 *                 format: date-time
 *               address:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 500
 *               phoneNumber:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 20
 *               email:
 *                 type: string
 *                 format: email
 *               profileImageUrl:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithPolicies'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Username or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
usersRoutes.post('/', validateBody(createUserSchema), usersController.create);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID with policies
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details with policies
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithPolicies'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
usersRoutes.get('/:id', usersController.getById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *               firstName:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *               lastName:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *               dateOfBirth:
 *                 type: string
 *                 format: date-time
 *               address:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 500
 *               phoneNumber:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 20
 *               email:
 *                 type: string
 *                 format: email
 *               profileImageUrl:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithPolicies'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Username or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
usersRoutes.put('/:id', validateBody(updateUserSchema), usersController.update);

/**
 * @swagger
 * /api/users/{id}/profile-image:
 *   patch:
 *     summary: Update user profile image
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - imageUrl
 *             properties:
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *     responses:
 *       200:
 *         description: Profile image updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
usersRoutes.patch('/:id/profile-image', usersController.updateProfileImage);

