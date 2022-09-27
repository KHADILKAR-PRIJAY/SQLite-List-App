import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("rn_sqlite");

const createTables = () => {
  db.transaction((txn) => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20))`,
      [],
      (sqlTxn, res) => {
        console.log("table created successfully");
      },
      (error) => {
        console.log("error on creating table " + error.message);
      }
    );
  });
};

const deleteAllGame = () => {
  db.transaction((txn) => {
    txn.executeSql(
      `DELETE FROM categories`,
      [],
      (sqlTxn, res) => {
        console.log(`${category} category deleted successfully`);
        setCategories([]);
      },
      (error) => {
        console.log("error on deleting category " + error.message);
      }
    );
  });
};

const addGame = () => {
  if (!category) {
    alert("Enter category");
    return false;
  }

  db.transaction((txn) => {
    txn.executeSql(
      `INSERT INTO categories (name) VALUES (?)`,
      [category],
      (sqlTxn, res) => {
        console.log(`${category} category added successfully`);
        fetchAllGame();
        setCategory("");
      },
      (error) => {
        console.log("error on adding category " + error.message);
      }
    );
  });
};
const fetchAllGame = () => {
  db.transaction((txn) => {
    txn.executeSql(
      `SELECT * FROM categories ORDER BY id DESC`,
      [],
      (sqlTxn, res) => {
        console.log("categories retrieved successfully");
        let len = res.rows.length;
        let results = [];
        if (len > 0) {
          for (let i = 0; i < len; i++) {
            let item = res.rows.item(i);
            results.push({ id: item.id, name: item.name });
          }

          setCategories(results);
        }
      },
      (error) => {
        console.log("error on getting categories " + error.message);
      }
    );
  });
};
const removeItem = (item) => {
  console.log(item.id);
  db.transaction((txn) => {
    txn.executeSql(
      ` DELETE FROM categories
        WHERE id = ?
        `,
      [item.id],
      (sqlTxn, res) => {
        console.log("categories deleted a successfully");
        fetchAllGame();
      },
      (error) => {
        console.log("error on deleting a categories " + error.message);
      }
    );
  });
};
