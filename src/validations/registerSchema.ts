import { z } from 'zod';

export const registerSchema = z.object({
  userName: z.string().min(3, {
    message: 'Username must be at least 3 characters long',
  }).max(20, {
    message: 'Username must be at most 20 characters long',
  }),
  email: z.string().email({
    message: 'Invalid email address',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 6 characters long',
  }),
  fullName: z.string().min(0, {
    message: 'Password must be at least 6 characters long',
  }),
  gender: z.string().min(0, {
    message: 'Password must be at least 6 characters long',
  }),
});  