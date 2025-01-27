'use client';

import React from 'react';
import { Formik } from 'formik';
import { errorParser } from '@/utils';
import { authQueries } from '@/services/queries';
import Link from 'next/link';
import { Button, TextInput } from '@/components';
import routes from '@/utils/routes';
import { forgotPasswordValidationSchema } from './schema';

const initialValues = {
  email: '',
};

type InitialValues = ReturnType<() => typeof initialValues>;

export const ForgotPasswordTemplate = () => {
  const { mutate, isPending } = authQueries.ForgotPassword();

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
          validationSchema={forgotPasswordValidationSchema}
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
            } = formikProps;
            return (
              <form onSubmit={handleSubmit} className=" app__auth__register">
                <div className="my-3">
                  <h3 className="Articulat-Semibold  text-capitalize text-2xl  d-flex">Forgot Password</h3>
                  <p className="text-muted">
                    Don’t worry, we’ll send you an email to reset your password
                  </p>
                </div>
                <div className="d-flex flex-column">

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

                <div>
                  <Button
                    type="submit"
                    title="Continue"
                    size="xl"
                    color="primary"
                    isLoading={isPending}
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
