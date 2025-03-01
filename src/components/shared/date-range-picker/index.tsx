import React, { ChangeEvent, useEffect, useState } from "react";
import moment from "moment";
import { Button } from "../button";
import { useModals } from "@/contexts/modals";
import { Select, TextInput } from "@/components/form-control";
import { ModalContainer } from "@/components/modals";
import { usePathname, useRouter } from "next/navigation";
import { useQueryString } from "@/hooks/use-query";

interface CustomDateRangePickerProps {
  from?: string;
  to?: string;
  defaultOption?: string;
}

export const DateRangePicker: React.FC<CustomDateRangePickerProps> = ({
  from = moment().startOf("year").format("YYYY-MM-DD"),
  to = moment().endOf("year").format("YYYY-MM-DD"),
  defaultOption = "thisYear",
}) => {
  const [customFromDate, setCustomFromDate] = useState<string>("");
  const [customToDate, setCustomToDate] = useState<string>("");
  const [customOptionAdded, setCustomOptionAdded] = useState(false);
  const [dateRangeOption, setDateRangeOption] = useState<string>(
    defaultOption || "thisYear"
  );
  const [fromDate, setFromDate] = useState<string>(from);
  const [toDate, setToDate] = useState<string>(to);
  const { modals, setModals } = useModals();

  const { push } = useRouter();
  const pathname = usePathname();
  const { createQueryStrings } = useQueryString();

  const handleOpen = () => setModals((prev) => ({ ...prev, view: true }));
  const handleClose = () => setModals((prev) => ({ ...prev, view: false }));

  const today = moment();
  const dateRanges: Record<string, [moment.Moment, moment.Moment]> = {
    today: [today, today],
    yesterday: [moment().subtract(1, "day"), moment().subtract(1, "day")],
    thisWeek: [moment().startOf("week"), moment().endOf("week")],
    lastWeek: [
      moment().subtract(1, "week").startOf("week"),
      moment().subtract(1, "week").endOf("week"),
    ],
    thisMonth: [moment().startOf("month"), moment().endOf("month")],
    lastMonth: [
      moment().subtract(1, "month").startOf("month"),
      moment().subtract(1, "month").endOf("month"),
    ],
    thisYear: [moment().startOf("year"), moment().endOf("year")],
    lastYear: [
      moment().subtract(1, "year").startOf("year"),
      moment().subtract(1, "year").endOf("year"),
    ],
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setDateRangeOption(selectedOption);

    if (selectedOption === "custom") {
      handleOpen();
      setCustomFromDate(fromDate);
      setCustomToDate(toDate);
      return;
    }

    const range = dateRanges[selectedOption];
    if (range) {
      setFromDate(range[0].format("YYYY-MM-DD"));
      setToDate(range[1].format("YYYY-MM-DD"));
    }
  };

  const handleApplyClick = () => {
    setFromDate(customFromDate);
    setToDate(customToDate);
    setCustomOptionAdded(true);
    handleClose();
  };

  const formatKey = (key: string): string => {
    return key
      .replace(/([A-Z])/g, " $1")
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const dateOptions = Object.entries(dateRanges).map(([key, range]) => ({
    label: `${formatKey(key)} | ${range[0].format("MMM D")} - ${range[1].format(
      "MMM D, YYYY"
    )}`,
    value: key,
  }));

  useEffect(() => {
    const query = createQueryStrings({ to: toDate, from: fromDate });
    push(`${pathname}?${query}`);
  }, [toDate, fromDate]);

  return (
    <div>
      <Select
        value={dateRangeOption}
        onChange={handleOptionChange}
        options={[...dateOptions, { label: "Custom", value: "custom" }]}
        optionLabel="label"
        optionValue="value"
      />

      <ModalContainer
        isOpen={modals.view}
        onClose={handleClose}
        title="Set Date Range"
        size="sm"
      >
        <div className="w-full">
          <div className="mt-4 flex flex-col gap-3">
            <TextInput
              label="Start Date"
              type="date"
              value={customFromDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCustomFromDate(e.target.value)
              }
            />
            <TextInput
              label="End Date"
              type="date"
              value={customToDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCustomToDate(e.target.value)
              }
              min={customFromDate}
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button title="Cancel" variant="outlined" onClick={handleClose} />
            <Button title="Apply" onClick={handleApplyClick} />
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};
