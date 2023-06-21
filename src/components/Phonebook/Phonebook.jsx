import {
  FormPhone,
  ButtonPhone,
  NameInput,
  ErrorValidate,
} from './Phonebook.styled';
import PropTypes from 'prop-types';
import 'yup-phone-lite';
import { nanoid } from 'nanoid';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useState } from 'react';

function Phonebook({ getContacts }) {
  const [dialCode, setDialCode] = useState('');
  const [numberValue, setNumberValue] = useState('');

  const {
    register,
    handleSubmit,
    reset,

    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      number: dialCode,
    },
  });

  const onSubmit = async ({ name, number }) => {
    const isResetForm = getContacts({
      name,
      number,
      id: nanoid(),
    });

    if (isResetForm) {
      reset();
      setNumberValue(dialCode);
    }
  };

  return (
    <FormPhone onSubmit={handleSubmit(onSubmit)}>
      <NameInput>Name</NameInput>
      <input
        placeholder="Name"
        {...register('name', { required: 'Required!!!' })}
      />
      {errors.name && <ErrorValidate>{errors.name.message}</ErrorValidate>}

      <NameInput>Number</NameInput>
      <Controller
        control={control}
        name="number"
        rules={{ required: 'Required!!!' }}
        render={({ field }) => {
          return (
            <PhoneInput
              {...field}
              inputExtraProps={{
                ref: field.ref,
              }}
              onChange={(value, country) => {
                setNumberValue(value);
                setValue('number', value);
                setDialCode(country.dialCode);
                if (country.dialCode !== dialCode) {
                  setNumberValue(country.dialCode);
                  return;
                }
              }}
              value={numberValue}
              country={'ua'}
              prefix={'+'}
              placeholder={''}
              searchPlaceholder={'Search'}
              enableSearch={true}
              disableSearchIcon={true}
            />
          );
        }}
      />

      {errors.number && <ErrorValidate>{errors.number.message}</ErrorValidate>}

      <ButtonPhone type="submit">Add Contact</ButtonPhone>
    </FormPhone>
  );
}

Phonebook.propTypes = {
  getContacts: PropTypes.func.isRequired,
};

export default Phonebook;
