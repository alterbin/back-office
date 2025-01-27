'use client';

import React from 'react';
import { Formik } from 'formik';
import { errorParser } from '@/utils';
import { Button, TextInput } from '@/components';
import { teamqueries } from '@/services/queries';
import { onboardValidationSchema } from './schema';

const initialValues = {
  firstName: '',
  lastName: '',
  newPassword: '',
};

type InitialValues = ReturnType<() => typeof initialValues>;

export const Onboardemplate = () => {
  const { mutate, isPending } = teamqueries.Onboard();

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
          validationSchema={onboardValidationSchema}
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
                  <h3 className="Articulat-Semibold  text-capitalize text-2xl  d-flex">Onboard</h3>
                </div>
                <div className="d-flex flex-column">

                  <TextInput
                    id="firstName"
                    placeholder="Enter your password"
                    label="First Name"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="app__auth__input_con"
                    error={errorParser(errors, touched, 'firstName')}
                  />

                  <TextInput
                    id="lastName"
                    placeholder="Enter your last name"
                    label="Last Name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="app__auth__input_con"
                    error={errorParser(errors, touched, 'lastName')}
                  />
                  <TextInput
                    id="newPassword"
                    placeholder="Enter your password"
                    label="New Password"
                    name="newPassword"
                    type="password"
                    helperText="min, 8 characters with a uppercase letter and a number"
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="app__auth__input_con"
                    error={errorParser(errors, touched, 'newPassword')}
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    title="Verify"
                    size="xl"
                    color="primary"
                    className="my-4 transition w-100 text-uppercase"
                    isLoading={isPending}
                  />
                </div>
              </form>
            );
          }}
        </Formik>

      </div>
    </div>
  );
};
