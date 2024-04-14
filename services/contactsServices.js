import Contact from "../models/Contact.js";

// const updateListContacts = (contacts) =>

export async function listContacts(filter) {
  return Contact.find(filter);
}

export async function getContactById(contactId) {
  return Contact.findById(contactId);
}

export async function removeContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}

export async function addContact(body) {
  return Contact.create(body);
}

export async function updateContact(id, body) {
  return Contact.findByIdAndUpdate(id, body);
}

export async function updateStatus(id, body) {
  return Contact.findByIdAndUpdate(id, body);
}
