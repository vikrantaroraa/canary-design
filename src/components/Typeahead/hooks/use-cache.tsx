import { useRef } from "react";

type CacheEntry = { data: unknown; timestamp: number };

const getCurrentTimestamp = () => Math.floor(Date.now() / 1000); // returns current time in seconds i.e., unix timestamp

// we are also saving timestamp with each query to check whether the query has expired or not since any stored
// query is suppossed to be cleared along with its data after a certain time i.e., expirationTimeInMilliSeconds
const useCache = (key: string, expirationTimeInMilliSeconds: number) => {
  const cache = useRef<Record<string, CacheEntry>>(
    JSON.parse(localStorage.getItem(key) ?? "{}")
  );

  const setCache = (query: string, data: unknown) => {
    const timestamp = getCurrentTimestamp();
    cache.current[query] = { data, timestamp };
    localStorage.setItem(key, JSON.stringify(cache.current));
  };

  const getCache = (query: string): unknown[] | null => {
    const cachedData = cache.current[query];
    if (cachedData) {
      const { data, timestamp } = cachedData;
      if (getCurrentTimestamp() - timestamp < expirationTimeInMilliSeconds) {
        return Array.isArray(data) ? data : null; // Ensure only arrays are returned
      } else {
        delete cache.current[query];
        localStorage.setItem(key, JSON.stringify(cache.current));
      }
    }
    return null;
  };

  return {
    getCache,
    setCache,
  };
};

export default useCache;
