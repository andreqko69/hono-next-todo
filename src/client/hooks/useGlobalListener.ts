import { useEffect } from 'react';

const useGlobalListener = (
  eventName: string,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const controller = new AbortController();

    window.addEventListener(eventName, handler, {
      signal: controller.signal,
    });

    return () => {
      controller.abort();
    };
  }, [eventName, handler]);
};

export default useGlobalListener;
