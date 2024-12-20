import express, { Request, Response } from 'express';
import addressService from '../service/address.service';  // Assuming this handles the address update

const addressRouter = express.Router();

/**
 * @swagger
 * /update-address:
 *   put:
 *     summary: Update the address of a customer based on email.
 *     description: This endpoint updates the address (street, housecode, postalcode) for a customer using their email.
 *     operationId: updateAddress
 *     requestBody:
 *       description: Customer email and the address fields to be updated.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the customer whose address is to be updated.
 *               street:
 *                 type: string
 *                 description: The street name to be updated.
 *               housecode:
 *                 type: string
 *                 description: The housecode (or house number) to be updated.
 *               postalcode:
 *                 type: string
 *                 description: The postalcode to be updated.
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Address updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Address updated successfully"
 *                 updatedAddress:
 *                   type: object
 *                   description: The updated address object.
 *       400:
 *         description: Bad request due to missing fields or invalid input.
 *       500:
 *         description: Internal server error.
 */
addressRouter.put('/update-address', async (req: Request, res: Response) => {
    try {
        const { email, street, housecode, postalcode } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }

        if (!street && !housecode && !postalcode) {
            return res.status(400).json({ message: 'At least one address field (street, housecode, postalcode) is required.' });
        }

        const updatedAddress = await addressService.updateAddressService({
            email,
            street,
            housecode,
            postalcode
        });

        return res.status(200).json({ message: 'Address updated successfully', updatedAddress });
    } catch (error) {
        console.error('Error updating address:', error);
        return res.status(500).json({ message: 'An error occurred while updating the address.' });
    }
});

export { addressRouter };
