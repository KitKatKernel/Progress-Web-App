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

// Get all content from the database
export const getDb = async () => {
  console.log('Getting all content from CodeNova database');
  try {
    const codeNovaDb = await openDB(DB_NAME, DB_VERSION);
    const tx = codeNovaDb.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    // Use .getAll() to retrieve all records in the store
    const request = store.getAll();
    const result = await request;
    console.log('Data retrieved successfully', result);
    return result;
  } catch (error) {
    console.error('getDb not implemented', error);
  }
};

// BONUS: Delete a specific entry from the database
export const deleteDb = async (id) => {
  console.log('Deleting from CodeNova database', id);
  try {
    const codeNovaDb = await openDB(DB_NAME, DB_VERSION);
    const tx = codeNovaDb.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    // Use .delete() to remove a record by its id
    const request = store.delete(id);
    const result = await request;
    console.log('Data deleted successfully', result);
    return result;
  } catch (error) {
    console.error('deleteDb not implemented', error);
  }
};

// Initialize the database when the module is imported
initdb();