import { z } from 'zod';
import carZodSchema from '../Schemas/carZodSchema';

export type ICar = z.infer<typeof carZodSchema>;
