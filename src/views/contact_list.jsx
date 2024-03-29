import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import Card from '../components/Card';

const ContactList = () => {

    const { store, actions } = useContext(Context);

    useEffect(() => {
      actions.FetchContacts();

    }, []);

  return (
    <>
      <h1>Lista de Contactos</h1>
      <Card />
    </>
  );
};

export default ContactList;
