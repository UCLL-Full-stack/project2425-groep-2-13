import { User as UserPrisma } from '@prisma/client';
import { Role } from '../types';

export class User {
    readonly id?: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
    readonly role: Role;

    constructor(user: {
        id?: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
    }) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }
    validate(user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
    }) {
        if (
            !user.firstName ||
            typeof user.firstName !== 'string' ||
            user.firstName.trim().length === 0
        ) {
            throw new Error('First name is required and cannot be empty.');
        }
        if (
            !user.lastName ||
            typeof user.lastName !== 'string' ||
            user.lastName.trim().length === 0
        ) {
            throw new Error('Last name is required and cannot be empty.');
        }
        if (!user.email || typeof user.email !== 'string' || user.email.trim().length === 0) {
            throw new Error('Email is required and cannot be empty.');
        }
        if (
            !user.password ||
            typeof user.password !== 'string' ||
            user.password.trim().length === 0
        ) {
            throw new Error('Password is required and cannot be empty.');
        }
        if (!user.role) {
            throw new Error('Role is required');
        }
    }

    equals({
        id,
        firstName,
        lastName,
        email,
        password,
        role,
    }: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
    }): boolean {
        return (
            this.id === id &&
            this.firstName === firstName &&
            this.lastName === lastName &&
            this.email === email &&
            this.password === password &&
            this.role === role
        );
    }

    static from(userPrisma: UserPrisma) {
        return new User({
            id: userPrisma.id,
            firstName: userPrisma.firstName,
            lastName: userPrisma.lastName,
            email: userPrisma.email,
            password: userPrisma.password,
            role: userPrisma.role as Role,
        });
    }
}
