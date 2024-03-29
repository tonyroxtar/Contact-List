import React, { useContext } from "react";
import { Context } from "../store/appContext";

const Form = () => {
  const { store, actions } = useContext(Context);

  const handleSubmit = async (e) => {
   
      e.preventDefault();
      
    if (store.contact.id) {
      actions.putFetchContact(store.contact.id);
    } else {
     await actions.handleSubmit(e);
    }
  };

  return (
    <>
      <form className="p-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label h3">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            placeholder="Enter Full Name"
            name="full_name"
            value={store.contact.full_name}
            onChange={actions.handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label h3">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email address"
            name="email"
            value={store.contact.email}
            onChange={actions.handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phomeNumber" className="form-label h3">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            placeholder="Enter phone number"
            name="phone"
            value={store.contact.phone}
            onChange={actions.handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label h3">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="faddress"
            placeholder="Enter your address"
            name="address"
            value={store.contact.address}
            onChange={actions.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {store.contact.id ? "Update" : "Submit"}
        </button>
      </form>
    </>
  );
};

export default Form;
