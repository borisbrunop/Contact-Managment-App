const baseUrl = "https://assets.breatheco.de/apis/fake/contact/";
const agenda = "Agenda-Boris";
const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			contacts: []
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			fetchCreateContact: async (name, email, phone, adress) => {
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
						contacts = await response.json();
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
			}
		}
	};
};

export default getState;
