import { Router } from 'express';
import { policiesController } from './policies.controller';

export const policiesRoutes = Router();

/**
 * @swagger
 * /api/policies:
 *   get:
 *     summary: Get all insurance policies
 *     tags: [Policies]
 *     responses:
 *       200:
 *         description: List of all insurance policies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Policy'
 */
policiesRoutes.get('/', policiesController.getAll);

/**
 * @swagger
 * /api/policies/assign:
 *   post:
 *     summary: Assign a policy to a user
 *     tags: [Policies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - policyId
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *               policyId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Policy assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPolicy'
 *       400:
 *         description: User already has this policy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User or Policy not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
policiesRoutes.post('/assign', policiesController.assignToUser);

/**
 * @swagger
 * /api/policies/users/{userId}/{policyId}:
 *   delete:
 *     summary: Remove a policy from a user
 *     tags: [Policies]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *       - in: path
 *         name: policyId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Policy ID
 *     responses:
 *       204:
 *         description: Policy removed successfully
 *       400:
 *         description: User does not have this policy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User or Policy not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
policiesRoutes.delete('/users/:userId/:policyId', policiesController.removeFromUser);

