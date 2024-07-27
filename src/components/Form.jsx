import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const Form = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (store.contact.id) {
      await actions.putFetchContact(store.contact.id, store.contact, navigate);
    } else {
      await actions.handleSubmit(e, navigate);
    }
  };

  return (
    <>
      <form className="p-3 w-75 mx-auto" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label h3">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Full Name"
            name="name"
            value={store.contact.name || ""}
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
            value={store.contact.email || ""}
            onChange={actions.handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label h3">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="Enter phone number"
            name="phone"
            value={store.contact.phone || ""}
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
            id="address"
            placeholder="Enter your address"
            name="address"
            value={store.contact.address || ""}
            onChange={actions.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success">
          {store.contact.id ? "Update" : "Submit"}
        </button>
        <div>
          <Link to="/">Or get back to contact list</Link>
        </div>
      </form>
    </>
  );
};

export default Form;

