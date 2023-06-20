import styled from 'styled-components';
// import { Form, Field } from 'formik';
import 'react-phone-number-input/style.css';
import Input from 'react-phone-number-input/input';

export const FormPhone = styled.form`
  padding: 30px;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

export const FieldPhoneName = styled.input`
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
  padding-left: 50px;
`;
export const FieldPhoneNumber = styled(Input)`
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
  padding-left: 50px;
`;

export const ButtonPhone = styled.button`
  font-family: 'Roboto', sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4caf50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;

  :hover,
  :active,
  :focus {
    background: #43a047;
  }
`;
export const NameInput = styled.span`
  padding-top: 10px;
`;
export const ErrorValidate = styled.p`
  color: red;
  padding: 0;
  margin: 0 0 10px 0;
  font-size: 14px;
`;
export const ContainerInputNumber = styled.div`
  position: relative;
`;
