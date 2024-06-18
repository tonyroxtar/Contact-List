import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const Card = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

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

  const handleShowModal = (contact_id) => {
    setContactToDelete(contact_id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setContactToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (contactToDelete) {
      await actions.deleteFetchContact(contactToDelete);
      handleCloseModal();
    }
  };

  return (
    <>
      <div className="col-md-2 float-end me-5 mb-5">
        <Link to="/new_contact" className="btn btn-success btn-lg">
          Add New Contact
        </Link>
      </div>
      <div className="card-container container-fluid w-75">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div key={contact.id} className="card mb-3 container-sm shadow p-3 mb-5 bg-body-tertiary rounded my-4">
              <div className="row g-0">
                <div className="col-md-3">
                  <img
                    src="https://art.ngfiles.com/images/34000/34569_danigan_storm-trooper.png?f1249725130"
                    className="img-fluid rounded-circle mt-3 ms-3 p-2"
                    alt="..."
                  />
                </div>
                <div className="col-md-6">
                  <div className="card-body my-4 ms-4">
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
                    <button type="button" className="btn btn-danger btn-lg mt-3" onClick={() => handleShowModal(contact.id)}>
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

      {/* Modal de confirmación */}
      <div className={`modal fade ${showModal ? "show d-block" : "d-none"}`} tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Deletion</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this contact?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
