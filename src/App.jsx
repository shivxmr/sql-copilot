// Which actors have the last name 'Bening' ?

import { Button } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";

import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { Textarea } from "./components/ui/textarea";
// import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";
import { MainNav } from "./components/main-nav";
import { Input } from "./components/ui/input";
import Loader from "./components/loader/loader";

const chatWindowStyles = {
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
    // border: "1px solid grey",
    borderRadius: "2rem",
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

function App() {
  const [query, setQuery] = useState("Default Text");
  const [sqlCode, setSqlCode] = useState("");
  const [sqlGenTime, setSqlGenTime] = useState(null);
  const [chatbotRespTime, setChatbotRespTime] = useState(null);
  const [data, setData] = useState([]);
  const [sqlExecTime, setSqlExecTime] = useState(null);

  const [loading, setLoading] = useState(false); // Add loading state
  const [showContent, setShowContent] = useState(false); // Add state to control content visibility
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true before making the API call
    setNewMessage(query);
    setQuery(""); // Reset the query to empty string after submitting
    // Make a POST request to the server with the user's query
    const response = await fetch("http://localhost:8005/pipeline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        last_questions: [],
        collection_name: "sakila",
        limit: 10,
      }),
    });

    // Handle the response
    const result = await response.json();

    // Update the state with the response data
    setSqlCode(result.sql);
    setSqlGenTime(result.sql_gen_time.toFixed(3)); // Fix to 3 decimal places
    setChatbotRespTime(result.chatbot_response_time.toFixed(7));
    setData(result.data);
    setSqlExecTime(result.sql_exec_time.toFixed(4));

    setLoading(false); // Set loading to false after receiving the response
    setShowContent(true); // Show content after receiving the response
  };

  return (
    <>
      <MainNav />
      {/* <div className="container mx-auto w-screen m-3 flex flex-col items-center"> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          mt: "0.7em",
          maxHeight: "100%",
          width: "100%",
          background: "linear-gradient(103deg, #2155BF 0%, #29D9FF 100.37%);",
          p: "1rem 3rem",
          justifyContent: "center",
          overflow: "hidden",
          // alignItems: "center",
        }}
      >
        <Box
          sx={{
            // flexGrow: 3,
            display: "flex",
            flexDirection: "column",
            // justifyContent: "space-evenly",
            // alignItems: "bottom",
            width: "100%",
            height: "85vh",
            backgroundColor: "white",
            borderRadius: "2rem",
            mt: "3.5rem",
          }}
        >
          {loading && !showContent ? (
            <Loader /> // Show the loader only when loading is true and content is not yet fetched
          ) : (
            <>
              <Box sx={chatWindowStyles.messagesContainer}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Box
                    className="query"
                    // key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      justifyContent: "right",
                      alignItems: "flex-end",
                      backgroundColor: "#c7efff",
                      width: "fit-content",
                      marginBottom: "8px",
                      borderRadius: "1rem 1rem 0rem 1rem",
                      boxShadow: "5px 4px 15px 4px rgba(0, 0, 0, 0.07)",
                      padding: "1rem",
                      color: "black",
                      margin: "2rem 2rem 1rem 1rem",
                      maxWidth: "35rem",
                      fontSize: "1rem",
                    }}
                  >
                    <Typography variant="h6">{newMessage}</Typography>
                  </Box>
                </Box>
                {showContent && (
                  <Box
                    className="response"
                    sx={{
                      backgroundColor: "#8CEAFF",
                      width: "fit-content",
                      marginBottom: "8px",
                      borderRadius: "1rem 1rem 1rem 0rem",
                      boxShadow: "5px 4px 15px 4px rgba(0, 0, 0, 0.07)",
                      padding: "1rem",
                      color: "black",
                      margin: "1rem 0rem 1rem 1rem",
                      maxWidth: "80%",
                      fontSize: "1rem",
                      m: "1rem 0rem 0rem 2rem",
                      width: "70rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      backgroundColor: "#2155BF",
                      p: "1rem",
                      borderRadius: "1rem 1rem 1rem 0rem",
                    }}
                    // className="grid w-screen gap-1.5 ml-10"
                  >
                    <Box
                      sx={{
                        backgroundColor: "#8CEAFF",
                        color: "black",
                        borderRadius: "0.5rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        p: "0.6rem",
                        // height: "10rem",
                      }}
                    >
                      <Typography
                      // className="mt-2"
                      >
                        Chatbot Response Time: {chatbotRespTime} seconds
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "#8CEAFF",
                          color: "black",
                          borderRadius: "0.5rem",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          p: "1rem",
                        }}
                      >
                        <Typography htmlFor="message">SQL Code</Typography>
                        <TextField
                          placeholder="Generated SQL Code will appear here"
                          // className="mr-6"
                          value={sqlCode}
                          onChange={null}
                          multiline
                          sx={{
                            color: "black",
                            width: "20rem",
                            m: "1rem",
                          }}
                        />
                        <Typography>
                          SQL Code Generation Time: {sqlGenTime} seconds
                        </Typography>
                        <Typography
                        // className="mt-2"
                        >
                          SQL Executed Time: {sqlExecTime} seconds
                        </Typography>
                        {/* <Typography
              // className="mt-2"
              >
                Tables
              </Typography> */}
                      </Box>
                      <Box
                        sx={{
                          backgroundColor: "#8CEAFF",
                          color: "black",
                          borderRadius: "0.5rem",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "left",
                          alignItems: "center",
                          p: "1rem",
                          width: "100%",
                          ml: "1rem",
                        }}
                      >
                        <table>
                          <thead>
                            <tr>
                              <th>First Name</th>
                              <th>Last Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((row, index) => (
                              <tr key={index}>
                                <td>{row[0]}</td>
                                <td>{row[1]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </Box>
                      {/* </> */}
                    </Box>
                  </Box>
                )}
              </Box>
            </>
          )}
          <Box
            // className="flex w-screen pb-5"
            style={chatWindowStyles.inputContainer}
          >
            <TextField
              placeholder="Enter your query here!"
              inputProps={{ "aria-label": "Enter your query here!" }}
              // className="mr-2 ml-4"
              style={chatWindowStyles.textField}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              // className="mr-4"
              variant="contained"
              sx={{
                m: "0rem 0rem 0rem 1.5rem",
                borderRadius: "2rem",
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
