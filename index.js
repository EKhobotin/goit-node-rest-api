import { program } from "commander";

import * as contactsList from "./db/contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      await contactsList.listContacts();
      const allContacts = await contactsList.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contactById = await contactsList.getContactById(id);
      console.log(contactById);
      break;

    case "add":
      const addContact = await contactsList.addContact(name, email, phone);
      console.log(addContact);
      break;

    case "remove":
      const contactRemove = await contactsList.removeContact(id);
      console.log(contactRemove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(action);
