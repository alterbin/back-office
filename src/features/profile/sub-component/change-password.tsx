import { Button, ModalContainer, TextInput } from '@/components';
import { useModals } from '@/contexts/modals';
import { profileQueries } from '@/services/queries';
import { errorParser } from '@/utils';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  newPassword: Yup.string()
    .required('New Password is required')
    .min(8, 'New Password must be at least 8 characters')
    .matches(/[a-z]/, 'New Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'New Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'New Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'New Password must contain at least one special character')
    .notOneOf([Yup.ref('currentPassword')], 'New Password must not be the same as the current password'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('newPassword')], 'Confirm Password must match New Password'),
});

export function Modal() {
  const { modals, setModals } = useModals();

  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  type InitialValues = ReturnType<() => typeof initialValues>;
  const handleClose = () => {
    setModals((prev) => ({ ...prev, edit: false }));
  };

  const { mutate, isPending } = profileQueries.UpdatePassword();

  const onSubmit = ({ ...values }: InitialValues) => {
    const payload = {
      ...values,
    };
    mutate(payload);
  };

  return (
    <ModalContainer centered show={modals.edit} size="md" handleClose={handleClose}>
      <div className="modal-header">
        <h5 className="Articulat-Semibold">Change Password</h5>

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
                    id="currentPassword"
                    name="currentPassword"
                    label="Current Password"
                    value={values?.currentPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                    className="app__auth__input_con"
                    error={errorParser(errors, touched, 'email')}
                  />
                  <TextInput
                    label="New Password"
                    name="newPassword"
                    id="newPassword"
                    value={values?.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                    className="app__auth__input_con"
                    error={errorParser(errors, touched, 'newPassword')}
                  />
                  <TextInput
                    label="Confirm Password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={values?.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                    className="app__auth__input_con"
                    error={errorParser(errors, touched, 'confirmPassword')}
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
