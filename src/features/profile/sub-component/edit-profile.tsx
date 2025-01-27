import { Button, ModalContainer, TextInput } from '@/components';
import { useModals } from '@/contexts/modals';
import { profileQueries } from '@/services/queries';
import { Profile } from '@/services/queries/profile/types';
import { errorParser } from '@/utils';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
});

export function Modal() {
  const { modals, setModals } = useModals();

  const item = modals.record as Profile;

  const initialValues = {
    firstName: item.firstName || '',
    lastName: item.lastName || '',
  };

  type InitialValues = ReturnType<() => typeof initialValues>;
  const handleClose = () => {
    setModals((prev) => ({ ...prev, show: false }));
  };

  const { mutate, isPending } = profileQueries.Update();

  const onSubmit = ({ ...values }: InitialValues) => {
    const payload = {
      ...values,
    };
    mutate(payload);
  };

  return (
    <ModalContainer centered show={modals.show} size="md" handleClose={handleClose}>
      <div className="modal-header">
        <h5 className="Articulat-Semibold">Edit Profile</h5>

        <button
          type="button"
          onClick={handleClose}
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </div>

      <div className="modal-body">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formikProps) => {
            const {
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              dirty,
              isValid,
            } = formikProps;

            return (
              <form onSubmit={handleSubmit} className="w-100 ">
                <div className="d-flex flex-column mb-3">
                  <TextInput
                    id="firstName"
                    name="firstName"
                    label="First name"
                    value={values?.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="app__auth__input_con"
                    error={errorParser(errors, touched, 'firstName')}
                  />
                  <TextInput
                    label="Last Name"
                    name="lastName"
                    id="lastName"
                    value={values?.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="app__auth__input_con"
                    error={errorParser(errors, touched, 'lastName')}
                  />
                </div>

                <div className="modal-footer">
                  <Button
                    onClick={() => {
                      handleClose();
                    }}
                    title="Cancel"
                    variant="outlined"
                  />

                  <Button
                    type="submit"
                    title="Submit"
                    color="primary"
                    className=" transition "
                    disabled={!isValid || !dirty}
                    isLoading={isPending}
                  />
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </ModalContainer>
  );
}
