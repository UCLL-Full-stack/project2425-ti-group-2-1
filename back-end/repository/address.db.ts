import { Address } from "../model/Address";

const addresses = [
    new Address({
        housecode : `25D`,
        street : `Cornerstreet`,
        postalcode : `2221`
    })
]

const getAddressById = ({ id }: { id: number }): Address | null => {
    try {
        return addresses.find((address) => address.getAddressID() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAddressById,
};