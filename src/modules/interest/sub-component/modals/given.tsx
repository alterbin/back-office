"use client";

import { ModalContainer } from "@/components";
import { useModals } from "@/contexts/modals";
import { Interest } from "@/services/queries/interest/types";

interface ItemProps {
  title: string;
  description: any;
}

const Item: React.FC<ItemProps> = ({ title, description }) => {
  return (
    <div className="w-full flex justify-between gap-4">
      <div className=" font-semibold whitespace-nowrap capitalize">
        {title || ""}:{" "}
      </div>
      <div className=" font-medium text-sm text-start items-start flex w-full ">{description || ""}</div>
    </div>
  );
};

export function ReadMoreModal() {
  const { modals, setModals } = useModals();
  const handleClose = () => setModals((prev) => ({ ...prev, show: false }));

  const interest = modals?.record as Interest;

  return (
    <ModalContainer isOpen={modals.show} onClose={handleClose} title="Given Details">
      <div className="flex flex-col gap-4 w-full">
        <Item title="Name" description={interest?.givens?.name} />
        <Item title="description" description={interest?.givens?.description} />
        <Item title="contact" description={interest?.givens?.contact} />
        <Item title="address" description={interest?.givens?.address} />
        <Item
          title="Fulfilled"
          description={interest?.givens?.isFulfilled ? "Yes" : "No"}
        />
        <div>
          <h4 className="mb-2 font-bold">Photos</h4>
          <div className="grid grid-cols-2 gap-4">
            {interest?.givens?.photos?.map((photo, index) => (
              <div key={`${photo}${index}`} className="w-full max-w-[200px]">
                <img
                  src={photo || ""}
                  alt="given "
                  className=" object-cover w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}
