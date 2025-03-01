"use client";

import { useFormik } from "formik";
import { z } from "zod";
import { Button, ModalContainer, TextInput } from "@/components";
import { errorParser, zodToFormikAdapter } from "@/utils";
import { Toggle } from "@/components/form-control/toggle";
import { useModals } from "@/contexts/modals";
import { givenQueries } from "@/services/queries";

export const createGivenSchema = z.object({
  rank: z.number().min(1, "Rank is required"),
  hidden: z.boolean(),
  isFulfilled: z.boolean(),
});

type PostSchema = z.infer<typeof createGivenSchema>;

export function EditModal() {
  const { mutate, isPending } = givenQueries.Put();
  const { modals, setModals } = useModals();
  const handleClose = () => setModals((prev) => ({ ...prev, edit: false }));

  const given = modals?.record;

  const initialValues = {
    hidden: given?.hidden || false,
    isFulfilled: given?.isFulfilled || false,
    rank: given?.rank || 0,
  };

  console.log("given", given?.rank);

  //   type InitialValues = ReturnType<() => typeof initialValues>;

  const formikProps = {
    initialValues,
    validate: zodToFormikAdapter(createGivenSchema),
    onSubmit: ({ ...values }: PostSchema) => {
      mutate({
        ...values,
        id: String(given?.id)
      });
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
      isOpen={modals.edit}
      onClose={handleClose}
      title="Edit Given"
      size="sm"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div className="grid gap-2">
          <TextInput
            label="Item Rank"
            name="rank"
            placeholder="rank"
            value={values.rank}
            type="number"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errorParser(errors, touched, "rank")}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Toggle
            label="Visibility"
            id="hidden"
            onChange={() => setFieldValue("hidden", !values.hidden)}
            checked={!values?.hidden}
          />
          {/* <Toggle
            label="Fulfilled"
            id="isFulfilled"
            onChange={handleChange}
            checked={values?.isFulfilled}
          /> */}
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button type="button" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" >
            {isPending ? "Saving..." : "Edit Given"}
          </Button>
        </div>
      </form>
    </ModalContainer>
  );
}
