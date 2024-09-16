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

// Add or update content in the database
export const putDb = async (content) => {
  console.log('Saving to CodeNova database');
  try {
    const codeNovaDb = await openDB(DB_NAME, DB_VERSION);
    const tx = codeNovaDb.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    // Use .put() to either add new content or update existing
    const request = store.put({ content: content, timestamp: new Date().getTime() });
    const result = await request;
    console.log('Data saved successfully', result);
    return result;
  } catch (error) {
    console.error('putDb not implemented', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

// Initialize the database when the module is imported
initdb();