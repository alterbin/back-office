'use client';

import React from 'react';
import { Formik } from 'formik';
import { errorParser } from '@/utils';
import { authQueries } from '@/services/queries';
import { Button, TextInput } from '@/components';
import { loginValidationSchema } from './schema';
import "../styles.scss"

const initialValues = {
  email: '',
  password: '',
};

type InitialValues = ReturnType<() => typeof initialValues>;

export const LoginTemplate = () => {
  const { mutate, isPending } = authQueries.Login();

  const onSubmit = ({ ...values }: InitialValues) => {
    const payload = {
      ...values,
    };
    mutate(payload);
  };

  return (
    <div className="app__auth__wrapper m-0 p-0 flex flex-col gap-2">
      <div className="app__auth__wrapper__shadow">
        <h1 className="app__auth__logo">
          Philan Back Office
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
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
                <div className=" mb-4">
                  <h2 className="Articulat-Semibold capitalize text-2xl  flex">
                    log in
                  </h2>
                  <p>
                    Please fill in your details
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
                    className="app__auth__input_con"
                    placeholder="Enter your email"
                    error={errorParser(errors, touched, 'email')}
                  />

                  <TextInput
                    id="password"
                    placeholder="Enter your password"
                    label="Password"
                    name="password"
                    type="password"
                    helperText="min, 8 characters with a uppercase letter and a number"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="app__auth__input_con"
                    error={errorParser(errors, touched, 'password')}
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    title="log in"
                    size="xl"
                    color="primary"
                    className="mt-4 transition w-full uppercase"
                    isLoading={isPending}
                  />
                </div>
                {/* <div className="m-auto mt-3 d-flex gap-2">
                  <Link
                    href={routes.auth.forgotPassword.path}
                    className="app__auth__wrapper__links justify-content-center d-flex w-100 fs-5 link-underline-opacity-0"
                  >
                    Forgot Password?
                  </Link>
                </div> */}
              </form>
            );
          }}
        </Formik>

      </div>
    </div>
  );
};
