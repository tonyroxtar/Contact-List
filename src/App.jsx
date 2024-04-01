import { useState } from "react";
import injectContext from "./store/appContext.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ContactList from "./views/contact_list.jsx";
import NewContact from "./views/new_contact.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/contact_list" element={<ContactList />} />
          <Route path="/new_contact/:id" element={<NewContact />} />
          <Route path="/new_contact/" element={<NewContact />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default injectContext(App);
