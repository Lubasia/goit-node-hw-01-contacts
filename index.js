const { Command } = require('commander');
const program = new Command();

const contacts = ({
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require('./contact.js'));

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case 'get':
      const contactById = await contacts.getContactById(id);
      console.table(contactById);
      break;

    case 'add':
      const addContact = await contacts.addContact(name, email, phone);
      console.table(addContact);
      break;

    case 'remove':
      await contacts.removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
