/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *           description: Customer name.
 *         email:
 *           type: string
 *           description: Customer email.
 *         number:
 *           type: string
 *           description: Customer phone number.
 *         address:
 *           type: object
 *           properties:
 *             housecode:
 *               type: string
 *             street:
 *               type: string
 *             postalcode:
 *               type: string
 *     AuthenticationRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password
 *     AuthenticationResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         email:
 *           type: string
 */

import express, { NextFunction, Request, Response } from 'express';
import { login } from '../service/customer.service'
import { AuthenticationRequest, AuthenticationResponse } from '../types/index';

const customerRouter = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a customer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationRequest'
 *     responses:
 *       200:
 *         description: Successful login.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 *       401:
 *         description: Invalid email or password.
 */
customerRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authRequest: AuthenticationRequest = req.body;

        const authResponse: AuthenticationResponse = login(authRequest);

        return res.status(200).json(authResponse);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(401).json({ message: error.message });
        }

        return res.status(500).json({ message: "An error occurred during authentication" });
    }
});

export { customerRouter };