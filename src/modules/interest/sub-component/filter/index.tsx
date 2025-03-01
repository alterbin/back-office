"use Client";

import React, { useState, Dispatch, SetStateAction } from "react";
import { useQueryString } from "@/hooks/use-query";
import { Button, X, Badge } from "@/components";
import { usePathname, useRouter } from "next/navigation";
import { SORT_DIRECTION, STATUSES } from "./constants";
import { PageQuery } from "@/services/queries/interest/types";
import { givenQueries } from "@/services/queries";

interface TransactionsFilterProps {
  pageQueries: PageQuery;
  setShowFilter: Dispatch<SetStateAction<boolean>>;
}

export const InterestsFilter: React.FC<TransactionsFilterProps> = ({
  pageQueries,
  setShowFilter,
}) => {
  const { createQueryStrings, clearQueryParams } = useQueryString();
  const { push } = useRouter();
  const pathname = usePathname();
  const { data: givens } = givenQueries.Read(pageQueries);

  const [filters, setFilters] = useState<Partial<PageQuery>>({
    sortDir: pageQueries?.sortDir || "",
    status: pageQueries?.status || "",
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
          <h4 className="font-semibold fs-6">Sort Order</h4>
          <div className="flex-wrap flex gap-3 mt-2">
            {SORT_DIRECTION.map((item) => (
              <Badge
                key={item.value}
                isSelected={filters.sortDir === item.value}
                label={item.label}
                defaultValue={!filters.sortDir && item.value === ""}
                onClick={() => handleInputChange(item.value, "sortDir")}
              />
            ))}
          </div>
        </div>

        <div className=" px-3 mt-2">
          <h4 className="font-semibold fs-6">Status</h4>
          <div className="flex-wrap flex gap-3 mt-2">
            {STATUSES.map((item) => (
              <Badge
                key={item.value}
                isSelected={filters.status === item.value}
                label={item.label}
                defaultValue={!filters.status && item.value === ""}
                onClick={() => handleInputChange(item.value, "status")}
              />
            ))}
          </div>
        </div>
        <div className=" px-3 mt-2">
          <h4 className="font-semibold fs-6">Givens</h4>
          <div className="flex-wrap flex gap-3 mt-2">
            {givens?.data?.map((item) => (
              <Badge
                key={item.id}
                isSelected={filters.given === item.id}
                label={item.name}
                defaultValue={!filters.given && item.id === ""}
                onClick={() => handleInputChange(item.id, "given")}
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
