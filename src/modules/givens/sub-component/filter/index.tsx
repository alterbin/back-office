"use Client";

import React, { useState, Dispatch, SetStateAction } from "react";
import { useQueryString } from "@/hooks/use-query";
import { Button, X, Badge } from "@/components";
import { usePathname, useRouter } from "next/navigation";
import { SORT_DIRECTION, STATUSES } from "./constants";
import { PageQuery } from "@/services/queries/interest/types";

interface TransactionsFilterProps {
  pageQueries: PageQuery;
  setShowFilter: Dispatch<SetStateAction<boolean>>;
}

export const GivenFilter: React.FC<TransactionsFilterProps> = ({
  pageQueries,
  setShowFilter,
}) => {
  const { createQueryStrings, clearQueryParams } = useQueryString();
  const { push } = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState<Partial<PageQuery>>({
    sortDir: pageQueries?.sortDir || "",
    isFullfilled: pageQueries?.isFullfilled || "",
    given: pageQueries?.given || "",
  });

  const handleInputChange = (value: string, name: keyof PageQuery) => {
    if (filters[name] === value) {
      setFilters((prevFilters) => ({ ...prevFilters, [name]: "" }));
    } else {
      setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    }
  };

  const allQueries = createQueryStrings(filters);

  const applyFilters = () => {
    push(`${pathname}?${allQueries}`);
    setShowFilter(false);
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      given: "",
    });
    const newQueries = createQueryStrings({
      status: "",
      given: "",
      isFullfilled: "",
    });

    push(`${pathname}?${newQueries}`);
    setShowFilter(false);
  };

  return (
    <div className="bg-white rounded p-3">
      <div className=" border-b pb-3 flex justify-between items-center">
        <h4 className="font-semibold fs-5">Filters</h4>
        <p className="" onClick={() => setShowFilter(false)}>
          <X />
        </p>
      </div>
      <div className=" gap-3">

        <div className=" px-3 mt-2">
          <h4 className="font-semibold fs-6">Status</h4>
          <div className="flex-wrap flex gap-3 mt-2">
            {STATUSES.map((item) => (
              <Badge
                key={item.value}
                isSelected={filters.isFullfilled === item.value}
                label={item.label}
                defaultValue={!filters.isFullfilled && item.value === ""}
                onClick={() => handleInputChange(item.value, "isFullfilled")}
              />
            ))}
          </div>
        </div>

      </div>

      <div className="flex gap-2 px-3 py-3 border-t">
        <Button
          className="w-full whitespace-nowrap"
          size="xl"
          onClick={applyFilters}
        >
          Apply Filters
        </Button>
        <Button
          className="w-full whitespace-nowrap"
          size="xl"
          variant="outlined"
          onClick={clearFilters}
        >
          Clear filters
        </Button>
      </div>
    </div>
  );
};
