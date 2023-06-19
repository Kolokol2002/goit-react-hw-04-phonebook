import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Phonebook from '../Phonebook';
import Contacts from '../Contacts';
import Title from '../Title';
import Filter from '../Filter';
import { MainContainer } from './App.styled';

function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const getContacts = userData => {
    let isResetForm = true;

    setContacts(s => {
      const isEmptyName = s.filter(
        ({ name }) => name.toLowerCase() === userData.name.toLowerCase()
      ).length;

      const isEmptyNumber = s.filter(
        ({ number }) => number === userData.number
      ).length;

      if (!isEmptyName && !isEmptyNumber) {
        toast.success(`${userData.name}, success add!`, {
          hideProgressBar: true,
          autoClose: 2000,
          theme: 'dark',
        });

        return [...s, userData];
      }

      if (isEmptyName || isEmptyNumber) {
        toast.warn(
          `${
            (isEmptyName && userData.name) || (isEmptyNumber && userData.number)
          }, already exist in phonebook!!!`,
          {
            hideProgressBar: true,
            autoClose: 2000,
            theme: 'dark',
          }
        );
        isResetForm = false;
        return s;
      }
    });

    return isResetForm;
  };

  const handleFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const filterChange = () => {
    return contacts.filter(
      item =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.number.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const onDelete = ({ target }) => {
    const { userName } = target.dataset;
    setContacts(s => s.filter(item => item.name !== userName));
  };

  return (
    <MainContainer>
      <Title title={'Phonebook'}>
        <Phonebook getContacts={getContacts} />
      </Title>
      {contacts.length !== 0 && (
        <Title title={'Contacts'}>
          <Filter handleFilter={handleFilter} />

          <Contacts
            usersArray={filter !== '' ? filterChange() : contacts}
            onDelete={onDelete}
          />
        </Title>
      )}
    </MainContainer>
  );
}

export default App;
