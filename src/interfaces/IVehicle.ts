import { z } from 'zod';
import vehicleZodSchema from '../Schemas/vehicleZodSchema';

export type IVehicle = z.infer<typeof vehicleZodSchema>;
