import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    paddingHorizontal: 15,
    backgroundColor: "#eaf3fa",
  },

  textfield: {
    margin: 10,
    backgroundColor: "white",
    height: 40,
    borderWidth: 1,
    padding: 10,
  },

  fonts: {
    color: "red",
    fontWeight: "bold",
    // padding: 15,
  },

  listItem: {
    flexDirection: "row",
    paddingVertical: 12,
    justifyContent: "space-between",
    paddingHorizontal: 7,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
});
