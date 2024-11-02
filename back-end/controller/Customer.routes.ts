import express, { NextFunction, Request, Response } from 'express';
import CustomerService from "../service/Customer.service";
import { CustomerInput } from '../types';

const customerRouter = express.Router();

customerRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const customer = <CustomerInput>req.body;
        const result = await CustomerService.createCustomer(customer);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { customerRouter };