const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contact: {
        full_name: "",
        email: "",
        address: "",
        phone: "",
      },

      listOfContact: [], // Aquí se almacenan mis contactos
    },

    actions: {
      handleChange: (e) => {
        const { name, value } = e.target;
        setStore({
          contact: {
            ...getStore().contact,
            [name]: value,
          },
        });
      },

      handleSubmit: async (e) => {
        e.preventDefault();
        try {
            const store = getStore();
            console.log("Store:", store);
            
            const { full_name, email, address, phone } = store.contact;
    
            console.log("Full Name:", full_name);
            console.log("Email:", email);
            console.log("Address:", address);
            console.log("Phone:", phone);
    
            const response = await fetch(
                "https://playground.4geeks.com/apis/fake/contact",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        full_name,
                        email,
                        agenda_slug: "myContactList",
                        address,
                        phone,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to add contact");
            }
            getActions().FetchContacts("myContactList"); // Trae los contactos actualizados despues de que se agrega un nuevo contacto
        } catch (error) {
            console.error("Error adding contact:", error);
        }
    },
    

      FetchAgendas: async () => {
        try {
          const response = await fetch(
            "https://playground.4geeks.com/apis/fake/contact/agenda"
          );
          if (!response.ok) {
            throw new Error("Failed to fetch agendas");
          }
          const data = await response.json();
          setStore({ agendas: data });  // Update store with fetched agendas
        } catch (error) {
          console.error("Error fetching agendas:", error);
        }
      },

      FetchContacts: async () => {
        try {
          const response = await fetch(
            "https://playground.4geeks.com/apis/fake/contact/agenda/myContactList"
          );
          if (!response.ok) {
            throw new Error("Failed to fetch contacts");
          }
          const data = await response.json();
          setStore({ listOfContact: data }); // Actualiza el store con los nuevos contactos obtenidos
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      },

      putFetchContact: async (contact_id) => {
        const store = getStore();
        try {
          const response = await fetch(
            `https://playground.4geeks.com/apis/fake/contact/${contact_id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(store.contact),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to update contact");
          }
          actions.FetchContacts();  // Trae la lista actualizada de contactos después de actualziar un contacto
        } catch (error) {
          console.error("Error updating contact:", error);
        }
      },

      deleteFetchContact: async (contact_id) => {
        try {
          const response = await fetch(
            `https://playground.4geeks.com/apis/fake/contact/${contact_id}`,
            {
              method: "DELETE",
            }
          );
          if (!response.ok) {
            throw new Error("Failed to delete contact");
          }
          actions.FetchContacts(); // Trae la lista de contactos luego de borrar un contacto
        } catch (error) {
          console.error("Error deleting contact:", error);
        }
      },
    },
  };
};

export default getState;
