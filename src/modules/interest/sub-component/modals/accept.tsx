"use client";

import { Button, ModalContainer } from "@/components";
import { useModals } from "@/contexts/modals";
import { interestQueries } from "@/services/queries";
import { Interest } from "@/services/queries/interest/types";

export function AcceptInterestModal() {
  const { modals, setModals } = useModals();
  const handleClose = () => setModals((prev) => ({ ...prev, edit: false }));
  const { mutate, isPending } = interestQueries.Accept();

  const interest = modals?.record as Interest;

  const handleSubmit = () => {
    mutate({
      id: String(interest?.id),
      isAccepted: true,
    });
  };

  return (
    <ModalContainer
      isOpen={modals.edit}
      onClose={handleClose}
      title="Given Details"
      size="sm"
    >
      <div className="flex flex-col mx-auto sm:w-[450px] lg:w-[450px] w-full ">
        <div className="flex flex-col gap-5">
          <h3 className="font-bold text-left">Are you sure?</h3>
          <p>
            Proceeding will accept this interest and mark the given as fulfiled
          </p>
        </div>

        <div className=" flex gap-4 mt-5 justify-end">
          <Button type="button" onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {isPending ? "loading..." : "Yes"}
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}
