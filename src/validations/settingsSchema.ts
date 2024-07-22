import { z } from 'zod';

export const settingsSchema = z.object({
    userName: z.string().min(8, { message: 'Username must be at least 8 characters long' }).optional(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }).optional(),
});
