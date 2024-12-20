import database from './database';
import { Address } from '../model/Address';

const createAddress = async (address: Address): Promise<Address> => {
    try {
        const addressPrisma = await database.address.create({
            data: {
                housecode: address.housecode,
                street: address.street,
                postalcode: address.postalcode,
            },
        });

        return Address.from(addressPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAddressById = async ({ id }: { id: number }): Promise<Address | null> => {
    try {
        const addressPrisma = await database.address.findUnique({
            where: { id },
        });

        return addressPrisma ? Address.from(addressPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAddressByDetails = async (
    housecode: string,
    street: string,
    postalcode: string
): Promise<Address | null> => {
    try {
        const addressPrisma = await database.address.findFirst({
            where: {
                housecode: housecode,
                street: street,
                postalcode: postalcode,
            },
        });

        return addressPrisma ? Address.from(addressPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllAddresses = async (): Promise<Address[]> => {
    try {
        const addressPrisma = await database.address.findMany();

        return addressPrisma.map((addressPrisma) => Address.from(addressPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateAddress = async (
    id: number,
    updatedFields: Partial<Address>
): Promise<Address | null> => {
    try {
        const addressPrisma = await database.address.update({
            where: { id },
            data: {
                ...updatedFields, 
            },
        });

        return Address.from(addressPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createAddress,
    getAddressById,
    getAddressByDetails,
    getAllAddresses,
    updateAddress,
};
