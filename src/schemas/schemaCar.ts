import { z } from 'zod';
import schemaVehicle from './schemaVehicle';

const schemaCar = schemaVehicle.extend({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
});

export default schemaCar;
export type ICar = z.infer<typeof schemaCar>;