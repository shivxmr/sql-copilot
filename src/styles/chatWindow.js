const chatWindow = {
  root: {
    backgroundColor: "#F4F6FF",
    // color: "red",
    display: "flex",
    flexDirection: "column",
    height: "90%",
    width: "70%",
    padding: "0.5rem 1rem 0.5rem 0.5rem",
    borderRadius: "1.5rem",
    margin: "0rem 0rem 0rem 5rem",
    flexShrink: 0,
  },
  messagesContainer: {
    // flexGrow: 1,
    overflow: "auto",
    // marginBottom: "1rem",
    padding: "0rem",
    width: "auto",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },

  message: {
    backgroundColor: "#8CEAFF",
    width: "fit-content",
    marginBottom: "10px",
    borderRadius: "1rem 1rem 0rem 1rem",
    boxShadow: "5px 4px 15px 4px rgba(0, 0, 0, 0.07)",
    padding: "1rem",
    color: "black",
    margin: "1rem",
    display: "flex",
    flexDirection: "row",
    maxWidth: "25rem",
    ai: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      backgroundColor: "#8CEAFF",
      width: "fit-content",
      marginBottom: "8px",
      borderRadius: "1rem 1rem 1rem 0rem",
      boxShadow: "5px 4px 15px 4px rgba(0, 0, 0, 0.07)",
      padding: "1rem",
      color: "black",
      margin: "1rem 0rem 1rem 1rem",
      maxWidth: "40rem",
      fontSize: "1rem",
    },
    human: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      backgroundColor: "#c7efff",
      width: "fit-content",
      marginBottom: "8px",
      borderRadius: "1rem 1rem 0rem 1rem",
      boxShadow: "5px 4px 15px 4px rgba(0, 0, 0, 0.07)",
      padding: "1rem",
      color: "black",
      margin: "1rem",
      maxWidth: "35rem",
      fontSize: "1rem",
    },
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: "0em",
    margin: "2rem",
  },
  textField: {
    ml: 1,
    flex: 1,
    width: "70rem",
    p: "0rem 0.6rem 0rem 0.6rem",
    fontSize: "0.9rem",
    border: "1px solid grey",
    borderRadius: "3rem",
  },
  button: {
    backgroundColor: "#2155BF",
    mb: "1rem",
    width: "15rem",
  },
  buttonStyle: {
    color: "white",
    background: "linear-gradient(93deg, #2155BF 0%, #29D9FF 152.8%)",
    my: "0.3rem",
    borderRadius: "3rem",
    fontSize: "0.75rem",
    fontWieght: "bold",
    quickActions: {
      color: "white",
      background: "linear-gradient(93deg, #2155BF 0%, #29D9FF 152.8%)",
      borderRadius: "3rem",
      fontSize: "0.75rem",
      margin: "0.25rem 0.5rem",
      padding: "0.5rem 0rem 0.5rem 0.8rem",
      fontWeight: "bold",
      letterSpacing: "0.1rem",
      width: "auto",
      paddingRight: "0.2rem",
    },
    feedback: {
      margin: "0rem",
      padding: "0rem 0rem 0rem 1rem",
      width: "auto",
      positive: {
        // bacgrou: "linear-gradient(93deg, #2155BF 0%, #29D9FF 152.8%)",
        borderRadius: "0.5rem",
        fontSize: "0.75rem",
        margin: "0rem",
        padding: "0.25rem 1.1rem",
        fontWeight: "bold",
        letterSpacing: "0.1rem",
        maxWidth: "2rem",
        minWidth: "2rem",
      },
      negative: {
        // color: "linear-gradient(93deg, #2155BF 0%, #29D9FF 152.8%)",
        borderRadius: "0.5rem",
        fontSize: "0.75rem",
        margin: "0rem",
        padding: "0.25rem 1.1rem",
        fontWeight: "bold",
        letterSpacing: "0.1rem",
        maxWidth: "2rem",
        minWidth: "2rem",
      },
    },
  },
  quickActionsMenu: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center", // Align items in a column
    width: "auto",
  },
};

export default chatWindow;
