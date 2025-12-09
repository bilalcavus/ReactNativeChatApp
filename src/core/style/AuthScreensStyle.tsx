import { StyleSheet } from "react-native";


export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
    paddingTop: 80,
    justifyContent: 'center'
  },

  text: { color: "white", fontSize: 26 },

  title: {
    fontSize: 32,
    fontWeight: "500",
    color: "#111",
    paddingBottom: 30
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 40,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F5F7",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#333",
  },

  button: {
    backgroundColor: "#4A6CF7",
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  linkText: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },

  registerTextView: {
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  registerText1: {
    marginRight: 6,
    fontSize: 16,
  },
  registerText2: {
    fontSize: 16,
    paddingRight: 10,
    color: 'green'
  }
});

