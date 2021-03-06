import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

function AddContact() {
	const { store, actions } = useContext(Context);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [adress, setAdress] = useState("");
	const { param } = useParams();

	let localData = localStorage.getItem("contact");
	localData = JSON.parse(localData);
	const [editName, setEditName] = useState(localData.full_name);
	const [editEmail, setEditEmail] = useState(localData.email);
	const [editPhone, setEditPhone] = useState(localData.phone);
	const [editAddress, setEditAddress] = useState(localData.address);

	return (
		<>
			{param == "edit" ? (
				<div className="container">
					<div>
						<h1 className="text-center mt-5">Edit contact</h1>
						<form>
							<div className="form-group">
								<label>Full Name</label>
								<input
									type="text"
									className="form-control"
									placeholder="Full Name"
									defaultValue={localData.full_name}
									onChange={e => setEditName(e.target.value)}
								/>
							</div>
							<div className="form-group">
								<label>Email</label>
								<input
									type="email"
									defaultValue={localData.email}
									className="form-control"
									placeholder="Enter email"
									onChange={e => setEditEmail(e.target.value)}
								/>
							</div>
							<div className="form-group">
								<label>Phone</label>
								<input
									type="phone"
									defaultValue={localData.phone}
									className="form-control"
									placeholder="Enter phone"
									onChange={e => setEditPhone(e.target.value)}
								/>
							</div>
							<div className="form-group">
								<label>Address</label>
								<input
									type="text"
									defaultValue={localData.address}
									className="form-control"
									placeholder="Enter address"
									onChange={e => setEditAddress(e.target.value)}
								/>
							</div>
							<Link
								to="/"
								onClick={e =>
									actions.fetchEditContact(editName, editEmail, editPhone, editAddress, localData.id)
								}>
								<button type="button" className="btn btn-primary form-control">
									save
								</button>
							</Link>
							<Link className="mt-3 w-100 text-center" to="/">
								or get back to contacts
							</Link>
						</form>
					</div>
				</div>
			) : (
				<div className="container">
					<div>
						<h1 className="text-center mt-5">Add a new contact</h1>
						<form>
							<div className="form-group">
								<label>Full Name</label>
								<input
									type="text"
									className="form-control"
									placeholder="Full Name"
									onChange={e => setName(e.target.value)}
								/>
							</div>
							<div className="form-group">
								<label>Email</label>
								<input
									type="email"
									className="form-control"
									placeholder="Enter email"
									onChange={e => setEmail(e.target.value)}
								/>
							</div>
							<div className="form-group">
								<label>Phone</label>
								<input
									type="phone"
									className="form-control"
									placeholder="Enter phone"
									onChange={e => setPhone(e.target.value)}
								/>
							</div>
							<div className="form-group">
								<label>Address</label>
								<input
									type="text"
									className="form-control"
									placeholder="Enter address"
									onChange={e => setAdress(e.target.value)}
								/>
							</div>
							<Link to="/" onClick={e => actions.fetchCreateContact(name, email, phone, adress)}>
								<button type="button" className="btn btn-primary form-control">
									save
								</button>
							</Link>
							<Link className="mt-3 w-100 text-center" to="/">
								or get back to contacts
							</Link>
						</form>
					</div>
				</div>
			)}
		</>
	);
}

export default AddContact;
