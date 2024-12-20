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
 *           description: Customer's full name.
 *         email:
 *           type: string
 *           format: email
 *           description: Customer's email address.
 *         number:
 *           type: string
 *           description: Customer's phone number.
 *         address:
 *           type: object
 *           properties:
 *             housecode:
 *               type: string
 *               description: The house number or code.
 *             street:
 *               type: string
 *               description: The street name of the customer's address.
 *             postalcode:
 *               type: string
 *               description: The postal code of the customer's address.
 *     AuthenticationRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password
 *     AuthenticationResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: The JWT token for authenticated requests.
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the authenticated customer.
 *         name:
 *           type: string
 *           description: The name of the authenticated customer.
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
import CustomerService from '../service/customer.service';
import { CustomerInput } from '../types';

const customerRouter = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     security: []
 *     summary: Login a customer.
 *     description: This endpoint allows an existing customer to log in using their email and password. A JWT token will be returned upon successful login.
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
 *       500:
 *         description: Internal server error.
 */
customerRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authRequest: AuthenticationRequest = req.body;

        // Await the result of login since it returns a promise
        const authResponse: AuthenticationResponse = await CustomerService.login(authRequest);

        return res.status(200).json(authResponse);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(401).json({ message: error.message });
        }

        return res.status(500).json({ message: 'An error occurred during authentication' });
    }
});

/**
 * @swagger
 * /register:
 *   post:
 *     security: []
 *     summary: Register a new customer.
 *     description: This endpoint allows a new customer to register by providing their details such as name, email, phone number, and address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerInput'
 *     responses:
 *       200:
 *         description: Customer created successfully.
 *       400:
 *         description: Bad Request (Missing or invalid data).
 *       500:
 *         description: Internal server error.
 */

customerRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer: CustomerInput = req.body;
        const result = await CustomerService.createCustomer(customer);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { customerRouter };
