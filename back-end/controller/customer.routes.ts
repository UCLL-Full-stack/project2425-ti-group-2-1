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
 *     CustomerInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         password:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         number:
 *           type: string
 *         address:
 *           type: object
 *           properties:
 *             housecode:
 *               type: string
 *             street:
 *               type: string
 *             postalcode:
 *               type: string
 *       required:
 *         - name
 *         - password
 *         - email
 *         - number
 *         - address
 */

import express, { NextFunction, Request, Response } from 'express';
import { AuthenticationRequest, AuthenticationResponse } from '../types/index';
import CustomerService from "../service/customer.service";
import { CustomerInput } from '../types';

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

        const authResponse: AuthenticationResponse = CustomerService.login(authRequest);

        return res.status(200).json(authResponse);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(401).json({ message: error.message });
        }

        return res.status(500).json({ message: "An error occurred during authentication" });
    }
});

    /**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new customer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerInput'
 *     responses:
 *       200:
 *         description: Customer created.
 *       400:
 *         description: Bad Request.
 *       500:
 *         description: Server Error.
 */

customerRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const customer: CustomerInput = req.body;
        const result = await CustomerService.createCustomer(customer);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { customerRouter };