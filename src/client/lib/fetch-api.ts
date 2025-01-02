import { CustomAPIError } from '@/client/lib/errors';

type FetchOptions = {
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
  headers?: HeadersInit;
  method?: string;
  body?: BodyInit | null;
};

async function fetchApi<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    cache = 'force-cache',
    revalidate,
    tags,
    headers = {},
    method = 'GET',
    body = null,
  } = options;

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

    if (!res.ok || resBody.error) {
      throw new CustomAPIError(
        resBody.error ?? `API error: ${res.status}`,
        resBody.details
      );
    }

    return resBody;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}

async function postApi<T, B = unknown>(
  url: string,
  body: B,
  options: Omit<FetchOptions, 'cache' | 'method' | 'body'> = {}
): Promise<T> {
  return fetchApi<T>(url, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
    cache: 'no-store',
  });
}

export { fetchApi, postApi };
