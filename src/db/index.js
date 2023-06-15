import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('direcciones.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(        
         //"DROP TABLE IF EXISTS lugar",
        "CREATE TABLE IF NOT EXISTS lugar (id INTEGER PRIMARY KEY NOT NULL, imagen TEXT NOT NULL, address TEXT NOT NULL, coords TEXT NOT NULL)",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const insertLugar = (imagen, address, coords) => { 
  
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO lugar (imagen, address, coords) VALUES (?,?,?)",
        [imagen, address, JSON.stringify(coords)],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const selectLugar = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM lugar',
        [],
        (_, result) => {
          
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
