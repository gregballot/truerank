import { BadRequest } from 'http-errors';
import { z } from "zod";

export function validateQuery<T extends z.ZodTypeAny>(
  schema: T,
  query: unknown,
): z.infer<T> {
  const result = schema.safeParse(query);
  if (!result.success) {
    throw BadRequest('Invalid query parameters');
  }
  return result.data;
}
