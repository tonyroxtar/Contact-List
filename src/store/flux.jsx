import { toast } from "react-toastify";

const getState = ({ getStore, getActions, setStore }) => {
  const API_BASE_URL = 'https://playground.4geeks.com/contact/agendas/tonyroxtar';

  return {
    store: {
      contact: {
        id: null,
        name: "",
        email: "",
        address: "",
        phone: "",
      },
      listOfContact: [],
    },

    actions: {
      handleChange: (e) => {
        const { name, value } = e.target;
        const store = getStore();
        const updatedContact = {
          ...store.contact,
          [name]: value,
        };
        setStore({ contact: updatedContact });
      },

      handleSubmit: async (e, navigate) => {
        e.preventDefault();
        const store = getStore();
        const { name, email, address, phone } = store.contact;

        if (!name || !email || !address || !phone) {
          console.error("All fields are required.");
          return;
        }

        const contactData = {
          name,
          email,
          address,
          phone,
          agenda_slug: "tonyroxtar",
        };

        try {
          // Ensure the agenda exists before adding a contact
          await getActions().ensureAgendaExists("tonyroxtar");

          const response = await fetch(`${API_BASE_URL}/contacts`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(contactData),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to add contact: ${errorData.detail ? errorData.detail[0].msg : "Unknown error"}`);
          }

          await getActions().FetchContacts();
          toast.success("Contact added successfully!");
          navigate("/");
        } catch (error) {
          console.error("Error adding contact:", error);
        }
      },

      ensureAgendaExists: async (agenda_slug) => {
        try {
          const response = await fetch(`${API_BASE_URL}/${agenda_slug}`);
          if (response.status === 404) {
            const createResponse = await fetch(`${API_BASE_URL}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ agenda_slug }),
            });

            if (!createResponse.ok) {
              const errorData = await createResponse.json();
              throw new Error(`Failed to create agenda: ${errorData.detail ? errorData.detail[0].msg : "Unknown error"}`);
            }
            toast.success("Agenda created successfully!");
          }
        } catch (error) {
          console.error("Error ensuring agenda exists:", error);
        }
      },

      FetchContacts: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/contacts`);
          if (!response.ok) {
            throw new Error("Failed to fetch contacts");
          }
          const data = await response.json();
          console.log('Fetched contacts:', data.contacts);
          setStore({ listOfContact: Array.isArray(data.contacts) ? data.contacts : [] });
        } catch (error) {
          console.error("Error fetching contacts:", error);
          setStore({ listOfContact: [] });
        }
      },

      putFetchContact: async (contact_id, updatedContact, navigate) => {
        try {
          const response = await fetch(`${API_BASE_URL}/contacts/${contact_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedContact),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to update contact: ${errorData.detail ? errorData.detail[0].msg : "Unknown error"}`);
          }

          await getActions().FetchContacts();
          toast.success("Contact updated successfully!");
          navigate("/");
        } catch (error) {
          console.error("Error updating contact:", error);
          toast.error("Error updating contact");
        }
      },

      deleteFetchContact: async (contact_id) => {
        try {
          const response = await fetch(`${API_BASE_URL}/contacts/${contact_id}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to delete contact: ${errorData.detail ? errorData.detail[0].msg : "Unknown error"}`);
          }

          await getActions().FetchContacts();
          toast.success("Contact deleted successfully!");
        } catch (error) {
          console.error("Error deleting contact:", error);
          toast.error("Error deleting contact");
        }
      },

      setStore: (updatedStore) => {
        console.log('Setting store with:', updatedStore);
        const store = getStore();
        setStore({
          ...store,
          ...updatedStore,
        });
        console.log('New store:', getStore());
      },

      clearContact: () => {
        setStore({
          contact: {
            id: null,
            name: "",
            email: "",
            address: "",
            phone: "",
          }
        });
      }
    },
  };
};

export default getState;
