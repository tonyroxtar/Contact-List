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
      listOfContact: [], // Inicializado como array
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

      handleSubmit: async (e) => {
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

          getActions().FetchContacts(); // Trae los contactos actualizados después de que se agrega un nuevo contacto
        } catch (error) {
          console.error("Error adding contact:", error);
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
          setStore({ listOfContact: Array.isArray(data.contacts) ? data.contacts : [] }); // Asegúrate de que los datos son un array
        } catch (error) {
          console.error("Error fetching contacts:", error);
          setStore({ listOfContact: [] });
        }
      },

      putFetchContact: async (contact_id, updatedContact) => {
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

          getActions().FetchContacts();
        } catch (error) {
          console.error("Error updating contact:", error);
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

          getActions().FetchContacts();
        } catch (error) {
          console.error("Error deleting contact:", error);
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
