import Contact from "../models/Contact.js";

// const updateListContacts = (contacts) =>

export async function listContacts() {
  return Contact.find();
}

export async function getContactById(contactId) {
  return Contact.findById(contactId);
}

export async function removeContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}

export async function addContact(body) {
  Contact.create(body);
}

export async function updateContact(id, body) {
  return Contact.findByIdAndUpdate(id, body);
}

export async function updateStatus(id, body) {
  return Contact.findByIdAndUpdate(id, body);
}
