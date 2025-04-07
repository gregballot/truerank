import { z } from 'zod';

export function buildApiRequestUrl<TQuery extends z.ZodTypeAny>(
  path: string,
  querySchema: TQuery,
  params: z.infer<TQuery>
): string {
  const url = new URL(`/api/${path}`, window.location.origin);
  const validated = querySchema.parse(params);

  Object.entries(validated).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  return url.toString();
}
