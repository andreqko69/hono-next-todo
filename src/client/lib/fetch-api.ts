import { CustomAPIError } from '@/client/utils/errors';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type FetchOptions = {
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
  headers?: HeadersInit;
  method?: HttpMethod;
  body?: BodyInit | null;
};

async function fetchApi<T>(url: string, options?: FetchOptions): Promise<T> {
  const {
    cache = 'no-store',
    revalidate,
    tags,
    headers = {},
    method = 'GET',
    body = null,
  } = options ?? {};

  try {
    const res = await fetch(url, {
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      cache,
      next: {
        revalidate,
        tags,
      },
    });

    const resBody = await res.json();

    if (!res.ok || resBody.success === false) {
      throw new CustomAPIError(
        resBody.error ?? `API error: ${res.status}`,
        resBody.fieldErrors
      );
    }

    return resBody;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}

async function postApi<T, B = unknown>({
  url,
  body,
  options = {},
}: {
  url: string;
  body: B;
  options?: Omit<FetchOptions, 'cache' | 'method' | 'body'>;
}): Promise<T> {
  return fetchApi<T>(url, {
    method: 'POST',
    ...options,
    body: JSON.stringify(body),
    cache: 'no-store',
  });
}

export { fetchApi, postApi };
