import database from '../repository/database';  // Assuming the address repository is in this path
import { Address } from '../model/Address';  // Assuming Address model is defined elsewhere

interface UpdateAddressInput {
    email: string;
    street?: string;
    housecode?: string;
    postalcode?: string;
}

const updateAddressService = async ({ email, street, housecode, postalcode }: UpdateAddressInput): Promise<Address | null> => {
    if (!email) {
        throw new Error('Email is required.');
    }

    // First, find the user based on the email
    const user = await database.customer.findUnique({
        where: { email },
        include: { address: true },  // Include address information
    });

    if (!user) {
        throw new Error('User not found.');
    }

    if (!user.address) {
        throw new Error('User does not have an address associated with their profile.');
    }

    // Prepare updated address fields
    const updatedFields: { [key: string]: string | undefined } = {
        street: street,
        housecode: housecode,
        postalcode: postalcode,
    };

    // Filter out undefined values to avoid updating with empty fields
    const filteredUpdatedFields = Object.fromEntries(
        Object.entries(updatedFields).filter(([key, value]) => value !== undefined)
    );

    if (Object.keys(filteredUpdatedFields).length === 0) {
        throw new Error('At least one address field (street, housecode, or postalcode) must be provided to update.');
    }

    // Update the address with the new fields
    const updatedAddress = await database.address.update({
        where: { id: user.address.id },
        data: filteredUpdatedFields,
    });

    return updatedAddress ? Address.from(updatedAddress) : null;
};

export default {
    updateAddressService,
};
