import React, { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useQueryString } from "@/hooks/use-query";
import { TextInput } from "./text-input";
import "./styles.scss";

const useQueries = () => {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const searchTerm = searchParams.get("searchTerm") || "";

  return useMemo(
    () => ({
      page,
      searchTerm,
    }),
    [page, searchTerm]
  );
};

export function SearchInput() {
  const searchParams = useSearchParams();
  const pageQueries = useQueries();
  const pathname = usePathname();
  const { push } = useRouter();
  const { createQueryString } = useQueryString();
  const initialSearchTerm = pageQueries?.searchTerm;
  const [search, setSearch] = useState(initialSearchTerm);

  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
      const queryString = createQueryString(
        "searchTerm",
        debouncedSearch?.trim() === "" ? "" : debouncedSearch
      );
      push(`${pathname}?${queryString}`);
  }, [debouncedSearch]);

  return (
    <div className="app_admin_connect__search">
      <TextInput
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        placeholder="search..."
        className="app_admin_connect__search__input w-full"
      />
    </div>
  );
}
