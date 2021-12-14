import React from "react";
import { useLocation } from "react-router-dom";

export function useSearchParams2() {
  const { search } = useLocation();

  return React.useMemo(() => {
    const params = new URLSearchParams(search);

    return {
      name: params.get("name") ?? "",
    };
  }, [search]);
}
