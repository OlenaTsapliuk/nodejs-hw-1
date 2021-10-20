const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const { writeFile } = require("fs");
const chalk = require("chalk");

const id = crypto.randomInt(1, 256);
const contactsPath = path.join(__dirname, "db", "contacts.json");

const readContact = async () => {
  const result = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(result);
};

const listContacts = async () => {
  return await readContact();
};

const getContactById = async (contactId) => {
  const contacts = await readContact();
  const [result] = contacts.filter(
    (contact) => contact.id === Number(contactId)
  );
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await readContact();
  const filteredContacts = contacts.filter(
    (contact) => contact.id != contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
  return console.table(filteredContacts);
};

const addContact = async (name, email, phone) => {
  const contacts = await readContact();
  const newContact = { id, name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return console.table(newContact);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
