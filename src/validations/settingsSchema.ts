//schema For settings
import { z } from 'zod';

export const settingsSchema = z.object({
    username: z.string().min(8, { message: 'Username must be at least 8 characters long' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
});