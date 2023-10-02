const fs = require("fs/promises");
const path = require("path");
const nanoid = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const contactIndex = contacts.findIndex(({ id }) => id === contactId);

  if (contactIndex === -1) {
    return null;
  }

  return contacts[contactIndex];
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const contactIndex = contacts.findIndex(({ id }) => id === contactId);

  if (contactIndex === -1) {
    return null;
  }

  const removedContact = contacts[contactIndex];

  contacts.splice(contactIndex, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removedContact;
};

const addContact = async (
  name = "username",
  email = "email",
  phone = "phone number"
) => {
  const contacts = await listContacts();

  const newContact = { name, email, phone, id: nanoid() };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
