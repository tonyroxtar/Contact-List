import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const Card = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (store.listOfContact.length === 0) {
      console.log("Calling FetchContacts...");
      actions.FetchContacts();
    }
  }, [actions, store.listOfContact]);

  const contacts = store.listOfContact;

  const handleEdit = (contact_id) => {
    navigate(`/new_contact/${contact_id}`);
  };

  const handleDelete = async (contact_id) => {
    await actions.deleteFetchContact(contact_id);
  };

  return (
    <>
      <div className="col-md-2 float-end me-5 mb-3">
        <Link to="/new_contact" className="btn btn-success btn-lg">
          Add New Contact
        </Link>
      </div>
      <div className="card-container container-fluid">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div key={contact.id} className="card mb-3 container-sm shadow p-3 mb-5 bg-body-tertiary rounded my-4">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="https://art.ngfiles.com/images/34000/34569_danigan_storm-trooper.png?f1249725130"
                    className="img-fluid rounded-circle"
                    alt="..."
                  />
                </div>
                <div className="col-md-6">
                  <div className="card-body my-4 ms-2">
                    <h2 className="card-title fs-1"> {contact.name}</h2>
                    <p className="card-text fs-4">
                      <i className="fa-solid fa-location-dot"></i>{" "}
                      {contact.address}
                    </p>
                    <p className="card-text fs-4">
                      <i className="fa-solid fa-phone"></i> {contact.phone}
                    </p>
                    <p className="card-text fs-4">
                      <i className="fa-solid fa-at"></i> {contact.email}
                    </p>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="buttons d-flex flex-column mt-5">
                    <button type="button" className="btn btn-success btn-lg" onClick={() => handleEdit(contact.id)}>
                      <i className="fa-solid fa-pencil fs-3"></i>
                    </button>
                    <button type="button" className="btn btn-success btn-lg mt-3" onClick={() => handleDelete(contact.id)}>
                      <i className="fa-solid fa-eraser fs-3"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No contacts found</p>
        )}
      </div>
    </>
  );
};

export default Card;
