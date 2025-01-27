'use client';

import React from 'react';
import { Formik } from 'formik';
import { errorParser } from '@/utils';
import Link from 'next/link';
import { Button, TextInput } from '@/components';
import routes from '@/utils/routes';
import { authQueries } from '@/services/queries';
import OTPInput from 'react-otp-input';
import { resetPasswordValidationSchema } from './schema';

const initialValues = {
  password: '',
  otp: '',
};

type InitialValues = ReturnType<() => typeof initialValues>;

export const ResetPasswordTemplate = () => {
  const { mutate, isPending } = authQueries.ResetPassword();

  const onSubmit = ({ ...values }: InitialValues) => {
    const payload = {
      ...values,
    };
    mutate(payload);
  };

  return (
    <div className="app__auth__wrapper">
      <div className="app__auth__wrapper__shadow">
        <h1 className="app__auth__logo FormulaCondensed-Bold">
          chop creat8
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={resetPasswordValidationSchema}
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
              setFieldValue,
            } = formikProps;
            return (
              <form onSubmit={handleSubmit} className=" app__auth__register">
                <div className="my-3">
                  <h3 className="Articulat-Semibold  text-capitalize text-2xl  d-flex">Reset Password</h3>
                  <p className="text-muted">
                    Please enter your new password.
                  </p>
                </div>
                <div className="d-flex flex-column">

                  <TextInput
                    id="password"
                    placeholder="Enter your password"
                    label="New Password"
                    name="password"
                    type="password"
                    helperText="min, 8 characters with a uppercase letter and a number"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="app__auth__input_con"
                    error={errorParser(errors, touched, 'password')}
                  />

                  <div className="form-group app__auth__input_con">
                    <label htmlFor="OTP" className="mb-2">Otp</label>
                    <OTPInput
                      value={values.otp}
                      onChange={(otp) => setFieldValue('otp', otp)}
                      numInputs={6}
                      shouldAutoFocus
                      renderSeparator={<span>-</span>}
                      renderInput={(props) => <input {...props} />}
                      inputStyle={{
                        width: '3rem',
                        height: '3rem',
                        margin: '0 0.5rem',
                        fontSize: '1rem',
                        borderRadius: 4,
                        border: '1px solid rgba(0,0,0,0.3)',
                      }}
                    />
                    {touched.otp && errors.otp && (
                    <div className="text-danger mt-2">
                      {errors.otp}
                    </div>
                    )}

                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    title="Continue"
                    size="xl"
                    isLoading={isPending}
                    color="primary"
                    className="mt-4 transition w-100 text-uppercase"
                  />
                </div>
                <div className="m-auto mt-3 d-flex gap-2">
                  <span className="text-gray-500 fs-5">
                    Remember password?
                  </span>

                  <Link
                    href={routes.home.path}
                    className="app__auth__wrapper__links fs-5"
                  >
                    Log in
                  </Link>
                </div>
              </form>
            );
          }}
        </Formik>

      </div>
    </div>
  );
};
