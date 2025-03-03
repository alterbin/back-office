import { Button, ModalContainer } from "@/components";
import { useModals } from "@/contexts/modals";
import React from "react";
import { ICollection } from "@/services/queries/collections/types";

export const ViewMoreModal = () => {
  const { modals, setModals } = useModals();

  const collection = modals?.record as ICollection;

  const handleClose = () => setModals((prev) => ({ ...prev, show: false }));

  return (
    <ModalContainer
      isOpen={modals.show}
      onClose={handleClose}
      title={collection?.id ? "Edit Collection" : "Create Collection"}
    >
      <div className="w-full">
        <div className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-4 gap-4">
            {collection?.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="collection"
                className="w-20 h-20 object-cover rounded-lg"
              />
            ))}
          </div>

          <div className="flex w-full justify-end gap-3">
            <Button type="button" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};
