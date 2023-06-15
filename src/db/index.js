import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("direcciones.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS lugar (id INTEGER PRIMARY KEY NOT NULL, imagen TEXT NOT NULL, addres TEXT NOT NULL, coords TEXT NOT NULL)",
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
