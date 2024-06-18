import injectContext from "./store/appContext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ContactList from "./views/contact_list.jsx";
import NewContact from "./views/new_contact.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="/new_contact/:id" element={<NewContact />} />
          <Route path="/new_contact/" element={<NewContact />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default injectContext(App);
