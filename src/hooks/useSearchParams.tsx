import { useMemo } from "react";

export const useSearchParams = () => {
  const searchParams = useMemo(() => {
    return new URLSearchParams(window.location.search);
  }, [location.search]);

  const setSearchParams = (nextInit: string) => {
    const url = new URL("" + window.location); // toString
    url.search = `?${nextInit}`;
    window.history.pushState({}, "", url);
  };

  return [searchParams, setSearchParams] as const;
};
