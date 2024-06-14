import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import Form from '../components/Form';
import { useParams } from 'react-router-dom';

const NewContact = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    const loadContact = () => {
      console.log('Contacts in store:', store.listOfContact);
      if (id) {
        const contact = store.listOfContact.find(contact => contact.id === parseInt(id));
        console.log('Found contact:', contact);
        if (contact) {
          actions.setStore({ contact });
          console.log('Store after setting contact:', { ...store, contact });  // Verificar el estado del store después de establecer el contacto
        } else {
          console.error("Contact not found");
          actions.clearContact(); // Clear the form if contact not found
        }
      } else {
        // Limpia el estado del contacto al crear un nuevo contacto
        actions.clearContact();
      }
    };

    if (store.listOfContact.length > 0) {
      loadContact();
    } else {
      actions.FetchContacts().then(loadContact);
    }
  }, [id]);

  return (
    <div className='p-3'>
      <h1 className='fw-bold'><i class="fa-regular fa-address-card"></i> {id ? "Edit Contact" : "New Contact"}</h1>
      <Form />
    </div>
  );
};

export default NewContact;
