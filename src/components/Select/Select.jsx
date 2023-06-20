import PropTypes from 'prop-types';
import {
  getCountries,
  getCountryCallingCode,
} from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en';
import {
  ArrowSelectCountry,
  ContainerOptionsCountry,
  ContainerSelectCountry,
  FlagCountry,
  OptionCountry,
  SelectCountry,
} from './Select.styled';
import { useState } from 'react';

function Select({ onGetChangeSelect, ...rest }) {
  const [country, setCountry] = useState('UA');

  const onChange = ({ target }) => {
    console.log(target.value);
    const result = target.value || undefined;
    onGetChangeSelect(result);
    setCountry(target.value);
  };

  return (
    <ContainerSelectCountry>
      {country && (
        <FlagCountry
          src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
        />
      )}
      <ContainerOptionsCountry>
        <SelectCountry {...rest} onChange={onChange}>
          {getCountries().map(country => (
            <OptionCountry key={country} value={country}>
              {en[country]} +{getCountryCallingCode(country)}
            </OptionCountry>
          ))}
        </SelectCountry>

        <ArrowSelectCountry />
      </ContainerOptionsCountry>
    </ContainerSelectCountry>
  );
}

Select.propTypes = {
  onGetChangeSelect: PropTypes.func.isRequired,
};

export default Select;
