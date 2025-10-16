'use client';

import React from 'react';
import {Formik} from 'formik';
import {errorParser} from '@/utils';
import {authQueries} from '@/services/queries';
import {Button, TextInput} from '@/components';
import {loginValidationSchema} from './schema';
import '../styles.scss';

const initialValues = {
  email: '',
  password: '',
};

type InitialValues = ReturnType<() => typeof initialValues>;

export const LoginTemplate = () => {
  const {mutate, isPending} = authQueries.Login();

  const onSubmit = ({...values}: InitialValues) => {
    const payload = {
      ...values,
    };
    mutate(payload);
  };

  return (
    <div className="relative flex h-screen w-full flex-col justify-center sm:p-0 lg:flex-row">
      <div className="app__auth__wrapper m-0 p-0 flex flex-col pt-20 md:pt-32 gap-2 lg:w-1/2">
        <div className="mb-5 sm:mb- mx-auto w-full max-w-md">
          <h1>
            <span className="text-gray-800 lg:hidden py-10 text-xl md:text-4xl text-xl leading-tight md:leading-[37.57px] font-black uppercase">
                Philan back Office
              </span>
          </h1>
          <h1 className="text-xl sm:text-4xl mb-2 font-bold text-gray-800">
            Log In
          </h1>
          <p className="text-lg text-gray-500">
            Enter your email and password to log in!
          </p>
        </div>

        <div className=" mx-auto w-full max-w-md rounded-lg">
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={onSubmit}
          >
            {formikProps => {
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
                  <div className="d-flex flex-column">
                    <label
                      className="mb-1 block text-base font-medium text-gray-700"
                      htmlFor="email"
                    >
                      Email<span className="text-error-500">*</span>
                    </label>

                    <TextInput
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      className="app__auth__input_con shadow-xs focus:border-brand-300 focus:ring-brand-500/10 h-[50px] w-full rounded-lg border border-gray-300 text-sm placeholder:text-gray-400 focus:ring-3 focus:outline-hidden"
                      placeholder="Enter your email"
                      error={errorParser(errors, touched, 'email')}
                    />

                    <label
                      className="mt-2 mb-1 block text-base font-medium text-gray-700"
                      htmlFor="password"
                    >
                      Password<span className="text-error-500">*</span>
                    </label>

                    <TextInput
                      id="password"
                      placeholder="Enter your password"
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="app__auth__input_con shadow-xs focus:border-brand-300 focus:ring-brand-500/10 h-[50px] w-full rounded-lg border border-gray-300 text-sm placeholder:text-gray-400 focus:ring-3 focus:outline-hidden"
                      error={errorParser(errors, touched, 'password')}
                    />
                    <p className="my-1 text-sm text-gray-500">
                      min, 8 characters with a uppercase letter and a number
                    </p>
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
      <div className="!bg-red-900 relative hidden h-full w-full items-center lg:grid lg:w-1/2">
        <div className="z-1 flex items-center justify-center">
          <div className="absolute right-0 top-0 -z-1 w-full max-w-[250px] xl:max-w-[450px]">
            <img src="/images/grid-01.svg" alt="grid" />
          </div>
          <div className="absolute bottom-0 left-0 -z-1 w-full max-w-[250px] rotate-180 xl:max-w-[450px]">
            <img src="/images/grid-01.svg" alt="grid" />
          </div>

          <div className="flex max-w-xs flex-col items-center">
            <a href="#" className="mb-4 block">
              <span className="text-white text-xl md:text-[32px] leading-tight md:leading-[37.57px] font-black uppercase">
                Philan back Office
              </span>
            </a>
            <p className="text-center text-gray-400 dark:text-white/60">
              Manage all your Philan activities in one place - from donations to
              campaigns and beyond.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
