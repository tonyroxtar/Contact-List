import React from "react";
import Card from "../components/Card";

const ContactList = () => {
  return (
    <div className="p-3">
      <h1 className="fw-bold mt-3 ms-5"><i className="fa-regular fa-address-book"></i> Contact List</h1>
      <Card />
    </div>
  );
};

export default ContactList;
