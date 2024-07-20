
import { z } from 'zod';

export  const  postSchema = z.object({
    title: z.string().min(5, { message: 'Title must be at least 5 characters long' }),
    description: z.string().min(3, { message: 'Description must be at least 3 characters long' }),
   
  });

