import { z } from 'zod';

const urlComprobation = /^(ftp|http|https):\/\/[^ "]+$/; // Comprueba que el enlace ingresado por el usuario sea un URL válido

export const editProfileSchema = z.object({
    userName: z.string().optional(),
    password: z.string().min(8, { message:'Passwordd must be at least 8 characters long' }).optional(),
    fullName: z.string().min(5, { message: 'Fullname must be at least 5 characters long' }).optional(),
    age: z.number().optional(),
    gender: z.string().optional(),
    location: z.string().optional(),
/*     personalWebSite: z.string()
        .optional()
        .refine(value => value === undefined || urlComprobation.test(value), {
            message: 'Invalid URL format',
        }),
    workPlace: z.string().optional(), */
    profileImage: z.instanceof(File).optional(),
    coverImage: z.instanceof(File).optional(),
});
