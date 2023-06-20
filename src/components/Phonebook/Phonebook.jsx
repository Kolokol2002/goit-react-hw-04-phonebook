import {
  FormPhone,
  FieldPhoneName,
  FieldPhoneNumber,
  ButtonPhone,
  NameInput,
  ErrorValidate,
  ContainerInputNumber,
} from './Phonebook.styled';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import 'yup-phone-lite';
import { yupResolver } from '@hookform/resolvers/yup';
import { nanoid } from 'nanoid';
import { useForm } from 'react-hook-form';
import { getCountryCallingCode } from 'react-phone-number-input/input';
import Select from 'components/Select/Select';
import { useState } from 'react';

const Phonebook = ({ getContacts }) => {
  const [countryNumberCode, setCountryNumberCode] = useState(
    () => `+${getCountryCallingCode('UA')}`
  );
  const [countryCode, setCountryCode] = useState('UA');

  const scheme = Yup.object().shape({
    name: Yup.string().required('Required!'),
    number: Yup.string()
      .phone(countryCode, 'Number is not valid')
      .required('Required!'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(scheme) });

  const onGetChangeSelect = value => {
    setCountryCode(value);
    setCountryNumberCode(`+${getCountryCallingCode(value)}`);
  };
  // onGetChangeSelect('UA');

  const onSubmit = async ({ name, number }) => {
    const isResetForm = getContacts({
      name,
      number,
      id: nanoid(),
    });

    if (isResetForm) {
      reset();
      setCountryNumberCode(`+${getCountryCallingCode(countryCode)}`);
    }
  };

  // const onChangeInput = ({ target }) => {
  //   console.log(target.value);
  // };

  return (
    <FormPhone onSubmit={handleSubmit(onSubmit)}>
      <NameInput>Name</NameInput>
      <FieldPhoneName {...register('name')} />
      {errors.name && <ErrorValidate>{errors.name.message}</ErrorValidate>}

      <NameInput>Number</NameInput>
      <ContainerInputNumber>
        <FieldPhoneNumber {...register('number')} />
        <Select onGetChangeSelect={onGetChangeSelect} />
      </ContainerInputNumber>
      {errors.number && <ErrorValidate>{errors.number.message}</ErrorValidate>}

      <ButtonPhone type="submit">Add Contact</ButtonPhone>
    </FormPhone>
  );
};

Phonebook.propTypes = {
  getContacts: PropTypes.func.isRequired,
};

export default Phonebook;
