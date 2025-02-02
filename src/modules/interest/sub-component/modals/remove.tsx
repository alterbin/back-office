import { useState } from "react";
import { Button, Trash } from "@/components";
import { givenQueries } from "@/services/queries";
import { Given } from "@/services/queries/givens/types";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export const Remove = ({ id }: Given) => {
  const { mutate, isPending } = givenQueries.Del();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    mutate({ id });
    setIsOpen(false);
  };

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <div className="text-center w-full flex md:justify-center">
        <Button
          style={{ padding: "0.1rem 0.975rem", minHeight: "28px" }}
          className="w-auto"
          size="md"
          variant="outlined"
          onClick={openModal}
        >
          <Trash stroke="var(--red)" />
        </Button>
      </div>

      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-sm rounded bg-white p-6 shadow-lg">
            <DialogTitle className="text-lg font-medium">
              Are you sure?
            </DialogTitle>
            <div className="mt-4 flex gap-2">
              <Button
                isLoading={isPending}
                onClick={handleDelete}
                className="w-auto"
                size="md"
                variant="outlined"
              >
                Yes
              </Button>
              <Button onClick={closeModal} className="w-auto" size="md">
                No
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
