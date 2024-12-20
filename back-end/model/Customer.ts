import { Address } from './Address';
import { Customer as CustomerPrisma, Address as AddressPrisma } from '@prisma/client';
import { Role } from '../types';

export class Customer {
    id?: number;
    name: string;
    password: string;
    email: string;
    number: string;
    address: Address;
    role: Role;

    constructor(customer: {
        id?: number;
        name: string;
        password: string;
        email: string;
        number: string;
        address: Address;
        role: Role;
    }) {
        this.validate(customer);

        this.id = customer.id;
        this.name = customer.name;
        this.password = customer.password;
        this.email = customer.email;
        this.number = customer.number;
        this.address = customer.address;
        this.role = customer.role;
    }

    getCustomerID(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    setName(value: string): void {
        if (!value) {
            throw new Error('Name is required');
        }
        this.name = value;
    }

    getPassword(): string {
        return this.password;
    }

    setPassword(value: string): void {
        if (!value) {
            throw new Error('Password is required');
        }
        this.password = value;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(value: string): void {
        if (!value) {
            throw new Error('Email is required');
        }
        this.email = value;
    }

    getNumber(): string {
        return this.number;
    }

    setNumber(value: string): void {
        if (!value) {
            throw new Error('Number is required');
        }
        this.number = value;
    }

    getAddress(): Address {
        return this.address;
    }

    setAddress(value: Address): void {
        if (!value) {
            throw new Error('Address is required');
        }
        this.address = value;
    }

    getRole(): Role {
        return this.role;
    }

    setRole(value: Role): void {
        if (!value) {
            throw new Error('Role is required');
        }
        this.role = value;
    }

    validate(customer: {
        name: string;
        password: string;
        email: string;
        number: string;
        address: Address;
        role: Role;
    }) {
        if (!customer.name) {
            throw new Error('Name is required');
        }

        if (!customer.password) {
            throw new Error('Password is required');
        }

        if (!customer.email) {
            throw new Error('Email is required');
        }

        if (!customer.number) {
            throw new Error('Number is required');
        }

        if (!customer.address) {
            throw new Error('Address is required');
        }

        if (!customer.role) {
            throw new Error('Role is required');
        }
    }

    static from({
        id,
        name,
        password,
        email,
        number,
        address,
        role,
    }: CustomerPrisma & { address: AddressPrisma; role: string }): Customer {
        if (!['admin', 'klant', 'banned'].includes(role)) {
            throw new Error(`Invalid role: ${role}`);
        }

        return new Customer({
            id,
            name,
            password,
            email,
            number,
            address: Address.from(address),
            role: role as Role
        });
    }
}
