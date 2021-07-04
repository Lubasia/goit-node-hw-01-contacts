const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const updateContacts = async contacts => {
  const str = JSON.stringify(contacts);
  try {
    await fs.writeFile(contactsPath, str);
  } catch (error) {
    throw error;
  }
};

// TODO: список всех контактов
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    error.message = 'Cannot read contacts file';
    throw error;
  }
};

// TODO: показать контакт по Id
const getContactById = async contactId => {
  try {
    const allContacts = await listContacts();
    const findContact = allContacts.find(
      contact => contact.id.toString() === contactId,
    );
    if (!findContact) {
      throw new Error('Id is not valid');
    }
    return findContact;
  } catch (error) {
    throw error;
  }
};

// TODO: добавить контакт по Id
const addContact = async (name, email, phone) => {
  try {
    const allContacts = await listContacts();
    const id = allContacts[allContacts.length - 1].id + 1;
    const newContact = { id, name, email, phone };
    const newListContacts = [...allContacts, newContact];
    await updateContacts(newListContacts);
    console.table(newListContacts);
    return newContact;
  } catch (error) {
    throw error;
  }
};

// TODO: удалить контакт по Id
const removeContact = async contactId => {
  try {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(
      contact => contact.id.toString() === contactId,
    );
    if (index === -1) {
      throw new Error('Id is not validt');
    }
    const filteredContacts = allContacts.filter(
      contact => contact.id.toString() !== contactId,
    );
    await updateContacts(filteredContacts);
    console.table(filteredContacts);
  } catch (error) {
    throw error;
  }
};
module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
