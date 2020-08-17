const baseUrl = "https://assets.breatheco.de/apis/fake/contact/";
const agenda = "Agenda-Boris";
const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			contacts: [],
			id: 0,
			editContact: {}
		},
		actions: {
			fetchCreateContact: async (name, email, phone, adress) => {
				let actions = getActions();
				try {
					let response = await fetch(`${baseUrl}`, {
						method: "POST",
						headers: {
							"Content-Type": "application/JSON"
						},
						body: JSON.stringify({
							full_name: name,
							email,
							agenda_slug: agenda,
							address: adress,
							phone
						})
					});
					if (response.ok) {
						await actions.fetchContacts();
					} else {
						console.log(`error: ${response.status} ${response.statusText}`);
					}
				} catch (error) {
					console.log("something failed");
					console.log(error);
				}
			},
			fetchContacts: async () => {
				let contacts = [];
				try {
					let response = await fetch(`${baseUrl}/agenda/${agenda}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/JSON"
						}
					});
					if (response.ok) {
						contacts = await response.json();
					} else {
						console.log(`error: ${response.status} ${response.statusText}`);
					}
				} catch (error) {
					console.log("something failed");
					console.log(error);
				}
				setStore({
					contacts: contacts
				});
			},
			fetchDeleteContact: async id => {
				let actions = getActions();
				try {
					let response = await fetch(`${baseUrl}/${id}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/JSON"
						}
					});
					if (response.ok) {
						await actions.fetchContacts();
					} else {
						console.log(`error: ${response.status} ${response.statusText}`);
					}
				} catch (error) {
					console.log("something failed");
					console.log(error);
				}
			},
			fetchEditContact: async (name, email, phone, adress) => {
				let store = getStore();
				let actions = getActions();
				try {
					let response = await fetch(`${baseUrl}/${store.editContact.id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/JSON"
						},
						body: JSON.stringify({
							full_name: name,
							email,
							agenda_slug: agenda,
							address: adress,
							phone
						})
					});
					if (response.ok) {
						await actions.fetchContacts();
					} else {
						console.log(`error: ${response.status} ${response.statusText}`);
					}
				} catch (error) {
					console.log("something failed");
					console.log(error);
				}
				setStore({
					editContact: {}
				});
			},
			getId: contactId => {
				setStore({
					id: contactId
				});
			},
			setEditContact: contact => {
				setStore({
					editContact: contact
				});
			}
		}
	};
};

export default getState;
