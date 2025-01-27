import { Button, ModalContainer, TextInput } from '@/components';
import { useModals } from '@/contexts/modals';
import { teamqueries } from '@/services/queries';
import { errorParser, getCallbackUrl } from '@/utils';
import routes from '@/utils/routes';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').required('Email is required'),
});

const initialValues = {
  email: '',
  callbackUrl: getCallbackUrl({ url: routes.home.path }),
};

type InitialValues = ReturnType<() => typeof initialValues>;

export function Modal() {
  const { modals, setModals } = useModals();
  const handleClose = () => {
    setModals((prev) => ({ ...prev, show: false }));
  };

  const { mutate, isPending } = teamqueries.Invite();

  const onSubmit = ({ ...values }: InitialValues) => {
    const payload = {
      ...values,
    };
    mutate(payload);
  };

  return (
    <ModalContainer centered show={modals.show} size="md" handleClose={handleClose}>
      <div className="modal-header">
        <h5 className="Articulat-Semibold">Invite Admin</h5>

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
                    id="email"
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Enter your email"
                    className="app__auth__input_con"
                    error={errorParser(errors, touched, 'email')}
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
