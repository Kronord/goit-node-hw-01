const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const stringData = await fs.readFile(contactsPath, "utf8");
    const data = JSON.parse(stringData);
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const oneContact = data.find((contact) => contact.id === contactId);
    return oneContact ? oneContact : null;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const newDataArray = data.filter((contact) => contactId !== contact.id);
    fs.writeFile(contactsPath, JSON.stringify(newDataArray));
    return newDataArray;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    data.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
