import {
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as SQLite from "expo-sqlite";
import React, { useEffect, useState } from "react";
import styles from "./style";

//Open database
const db = SQLite.openDatabase("rn_sqlite");

export default function App() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  //Create Table
  const createTables = () => {
    db.transaction((txn) => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS gameList (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20))`,
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

  //Delete all game
  const deleteAllGame = () => {
    Alert.alert(
      "",
      "Are you sure delete all game?",
      [
        {
          text: "Yes",
          onPress: () => {
            db.transaction((txn) => {
              txn.executeSql(
                `DELETE FROM gameList`,
                [],
                (sqlTxn, res) => {
                  console.log(`${category} deleted successfully`);
                  setCategories([]);
                },
                (error) => {
                  console.log("error on deleting " + error.message);
                }
              );
            });
          },
        },
        {
          text: "No",
          onPress: () => console.log("No button clicked"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  //Add game
  const addGame = () => {
    if (!category) {
      alert("Enter game");
      return false;
    }

    db.transaction((txn) => {
      txn.executeSql(
        `INSERT INTO gameList (name) VALUES (?)`,
        [category],
        (sqlTxn, res) => {
          console.log(`${category} added successfully`);
          fetchAllGame();
          setCategory("");
        },
        (error) => {
          console.log("error on adding  " + error.message);
        }
      );
    });
  };

  //fetch all game
  const fetchAllGame = () => {
    db.transaction((txn) => {
      txn.executeSql(
        `SELECT * FROM gameList ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          console.log("Game retrieved successfully");
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
          console.log("error on getting games " + error.message);
        }
      );
    });
  };

  //Remove a game
  const removeItem = (item) => {
    console.log(item.id);
    db.transaction((txn) => {
      txn.executeSql(
        ` DELETE FROM gameList
        WHERE id = ?
        `,
        [item.id],
        (sqlTxn, res) => {
          console.log("game deleted successfully");
          fetchAllGame();
        },
        (error) => {
          console.log("error on deleting a game " + error.message);
        }
      );
    });
  };

  // List item element
  const renderGames = ({ item }) => {
    return (
      <View style={styles.listItem}>
        {/* <Text style={{ marginRight: 9 }}>{item.id}</Text> */}
        <Text>{item.name}</Text>
        <TouchableOpacity onPress={() => removeItem(item)}>
          <Text style={styles.fonts}>Remove</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Load initial data
  useEffect(async () => {
    createTables();
    fetchAllGame();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter game"
        value={category}
        onChangeText={setCategory}
        style={styles.textfield}
      />
      <Button title="Add" onPress={addGame} />
      <Button title="Remove all" onPress={deleteAllGame} />
      <FlatList
        data={categories}
        renderItem={renderGames}
        key={(cat) => cat.id}
      />
    </View>
  );
}
