import {useContext} from 'react';
import {Context} from '../store/appContext';
import Form from '../components/Form';
const NewContact = () => {

    const { store, actions } = useContext(Context);

  return (
    <>
      <h1>Nuevo Contacto</h1>
      <Form formdata={store.contact} handleSubmit={actions.handleSubmit} handleChange={actions.handleChange} />
    </>
  );
};

export default NewContact;
