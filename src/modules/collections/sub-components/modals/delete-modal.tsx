import { Button, ModalContainer } from "@/components";
import { useModals } from "@/contexts/modals";
import { collectionQueries } from "@/services/queries";
import React from "react";
import { ICollection } from "@/services/queries/collections/types";

export const DeleteCollectionModal = () => {
  const { modals, setModals } = useModals();

  const collection = modals?.record as ICollection;

  const { mutate, isPending } = collectionQueries.Del();
  const handleClose = () => setModals((prev) => ({ ...prev, delete: false }));

  const handleDelete = async () => {
    mutate({
      id: collection?.id,
    });
  };

  return (
    <ModalContainer
      isOpen={modals.delete}
      onClose={handleClose}
      title="Delete Collection"
      size="sm"
    >
      <div className="w-full">
        <div className="flex flex-col gap-4 w-full">
          <div>Are you sure you want to delete this collection?</div>

          <div className="flex w-full justify-end gap-3">
            <Button type="button" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="button" isLoading={isPending} onClick={handleDelete}>
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};
