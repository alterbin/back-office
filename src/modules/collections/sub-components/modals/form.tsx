import { Button, ModalContainer, TextInput } from "@/components";
import { useModals } from "@/contexts/modals";
import { collectionQueries } from "@/services/queries";
import { errorParser, zodToFormikAdapter } from "@/utils";
import { useFormik } from "formik";
import React, { useState } from "react";
import { z } from "zod";
import ImageUploader from "../upload";
import { ICollection } from "@/services/queries/collections/types";

export const collectionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Decription is required"),
});

type PostSchema = z.infer<typeof collectionSchema>;

export const Form = () => {
  const { modals, setModals } = useModals();

  const collection = modals?.record as ICollection;

  const initialValues = {
    title: collection?.title || "",
    description: collection?.description || "",
    images: collection?.images || [],
  };

  const { mutate: update, isPending: isLoading } = collectionQueries.Put();
  const { mutate, isPending } = collectionQueries.Create();
  const handleClose = () => setModals((prev) => ({ ...prev, create: false }));
  const [photos, setPhotos] = useState<string[]>(initialValues?.images);

  const formikProps = {
    initialValues,
    validate: zodToFormikAdapter(collectionSchema),
    onSubmit: ({ ...values }: PostSchema) => {
      if (collection?.id) {
        update({
          ...values,
          images: photos,
          id: String(collection?.id),
        });
      } else {
        mutate({
          ...values,
          images: photos,
        });
      }
    },
  };

  const {
    handleChange,
    handleSubmit,
    errors,
    touched,
    values,
    handleBlur,
    isValid,
    dirty,
    setFieldValue,
  } = useFormik<PostSchema>(formikProps);

  return (
    <ModalContainer
      isOpen={modals.create}
      onClose={handleClose}
      title={collection?.id ? "Edit Collection" : "Create Collection"}
    >
      <div className="relative w-full max-w-[584px] rounded-3xl bg-white">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
         
          <div className="grid gap-4">
            <TextInput
              label="Title"
              name="title"
              placeholder="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errorParser(errors, touched, "title")}
            />
          </div>
          <TextInput
            label="Description"
            name="description"
            placeholder="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errorParser(errors, touched, "description")}
          />

          <ImageUploader
            photos={photos}
            setPhotos={setPhotos}
            label="Item Picture"
            required
          />

          <div className="flex items-center justify-end w-full gap-3 mt-6">
            <button type="button" onClick={handleClose} className="flex w-full justify-center rounded-lg border !border-gray-300 !bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs transition-colors hover:bg-gray-50 hover:text-gray-800 sm:w-auto">
              Cancel
            </button>
            <Button
              type="submit"
              isLoading={isPending || isLoading}
              disabled={!values.title || !values.description || !photos.length}
              className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white rounded-lg !bg-[#465fff] hover:bg-[#3641f5] !border-[#3641f5] hover:border-[#3641f5] shadow-theme-xs sm:w-auto"
            >
              {isPending || isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};
