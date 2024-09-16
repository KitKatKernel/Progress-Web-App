import { openDB } from 'idb';

const DB_NAME = 'codenova';
const DB_VERSION = 1;
const STORE_NAME = 'code_snippets';

// Initialize the database
const initdb = async () => {
  console.log('Initializing CodeNova database');
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (db.objectStoreNames.contains(STORE_NAME)) {
        console.log(`${STORE_NAME} database already exists`);
        return;
      }
      // Create a new object store for code snippets
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      console.log(`${STORE_NAME} database created`);
    },
  });
};

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

// Initialize the database when the module is imported
initdb();