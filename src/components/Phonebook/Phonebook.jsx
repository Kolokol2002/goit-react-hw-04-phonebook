import {
  FormPhone,
  FieldPhone,
  ButtonPhone,
  NameInput,
  ErrorValidate,
} from './Phonebook.styled';
import * as Yup from 'yup';
import 'yup-phone-lite';
import { Formik, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

const Phonebook = ({ getContacts }) => {
  const scheme = Yup.object().shape({
    name: Yup.string().required('Required!'),
    number: Yup.string()
      .phone('UA', 'Number is not valid')
      .required('Required!'),
  });

  const handleSubmit = async (data, helpers) => {
    const { name, number } = data;

    const isResetForm = getContacts({
      name,
      number,
      id: nanoid(),
    });

    isResetForm && helpers.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      onSubmit={handleSubmit}
      validationSchema={scheme}
    >
      <FormPhone>
        <NameInput>Name</NameInput>
        <FieldPhone type="text" name="name" />
        <ErrorMessage name="name">
          {msg => <ErrorValidate>{msg}</ErrorValidate>}
        </ErrorMessage>

        <NameInput>Number</NameInput>
        <FieldPhone type="tel" name="number" />
        <ErrorMessage name="number">
          {msg => <ErrorValidate>{msg}</ErrorValidate>}
        </ErrorMessage>

        <ButtonPhone type="submit">Add Contact</ButtonPhone>
      </FormPhone>
    </Formik>
  );
};

Phonebook.propTypes = {
  getContacts: PropTypes.func.isRequired,
};

export default Phonebook;
