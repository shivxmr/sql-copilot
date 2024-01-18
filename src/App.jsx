// Which actors have the last name 'Bening' ?
// What are the actors with first name "Scarlett"?
import React, { useState } from "react";

import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import chatWindow from "./styles/chatWindow";
import { MainNav } from "./components/main-nav";
import Loader from "./components/loader/loader";

function App() {
  const [query, setQuery] = useState("");
  const [sqlCode, setSqlCode] = useState("");
  const [sqlGenTime, setSqlGenTime] = useState(null);
  const [chatbotRespTime, setChatbotRespTime] = useState(null);
  const [data, setData] = useState([]);
  const [sqlExecTime, setSqlExecTime] = useState(null);

  const [loading, setLoading] = useState(false); // Add loading state
  const [showContent, setShowContent] = useState(false); // Add state to control content visibility
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true before making the API call
    setNewMessage(query);
    setQuery(""); // Reset the query to empty string after submitting
    // Make a POST request to the server with the user's query
    console.log("Submitting query: ");
    const response = await fetch("http://localhost:8005/pipeline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        last_questions: messages
          .filter((message) => message.type === "user")
          .map((userMessage) => userMessage.text),
        collection_name: "sakila",
        limit: 10,
      }),
    });

    try {
      const result = await response.json();

      // Update the state with the response data
      setSqlCode(result.sql);
      setSqlGenTime(result.sql_gen_time.toFixed(3)); // Fix to 3 decimal places
      setChatbotRespTime(result.chatbot_response_time.toFixed(7));
      setData(result.data);
      setSqlExecTime(result.sql_exec_time.toFixed(4));

      const newMessage = {
        type: "user",
        text: query,
      };

      const botResponse = {
        type: "bot",
        sqlCode: result.sql,
        sqlGenTime: result.sql_gen_time.toFixed(3),
        chatbotRespTime: result.chatbot_response_time.toFixed(7),
        data: result.data,
        sqlExecTime: result.sql_exec_time.toFixed(4),
      };

      // Update the state with the new messages
      console.log("newMessage: ", newMessage);
      console.log("botResponse: ", botResponse);
      setMessages((prevMessages) => [...prevMessages, newMessage, botResponse]);
      console.log("messages: ", messages);
      setLoading(false); // Set loading to false after receiving the response
      setShowContent(true); // Show content after receiving the response
    } catch (error) {
      console.log("Something went wrong!", error);
    }

    // Handle the response
  };

  const rows = data.map((row, index) => ({
    id: index,
    firstName: row[0],
    lastName: row[1],
  }));

  const columns = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
  ];

  return (
    <>
      <MainNav />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row", // Change to column
          alignItems: "center", // Center horizontally
          justifyContent: "center", // Center vertically
          minHeight: "100vh", // Set minHeight to 100vh for full height
          background: "linear-gradient(103deg, #2155BF 0%, #29D9FF 100.37%);",
          p: "1rem 3rem",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "85vh",
            backgroundColor: "white",
            borderRadius: "2rem",
            mt: "3.5rem",

            // flexGrow: 3,
            // justifyContent: "space-evenly",
            // alignItems: "bottom",
          }}
        >
          {loading && !showContent ? (
            <Loader /> // Show the loader only when loading is true and content is not yet fetched
          ) : (
            <>
              <Box sx={chatWindow.messagesContainer}>
                {messages.map((message, index) => {
                  if (message.type === "user") {
                    return (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                        }}
                      >
                        <Box
                          className="query"
                          key={index}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "left",
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
                          <Typography variant="h6">{message.text}</Typography>
                        </Box>
                      </Box>
                    );
                  } else if (message.type === "bot") {
                    return (
                      showContent && (
                        <Box
                          className="response"
                          key={index}
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
                            // width: "70rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            // backgroundColor: "#2155BF",
                            p: "1rem",
                            // borderRadius: "1rem 1rem 1rem 0rem",
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
                              <Typography htmlFor="message">
                                SQL Code
                              </Typography>
                              <TextField
                                placeholder="Generated SQL Code will appear here"
                                // className="mr-6"
                                value={sqlCode}
                                onChange={null}
                                multiline={true}
                                rows={10}
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
                              <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={5} // Set your desired page size
                                checkboxSelection
                                disableSelectionOnClick
                                sx={{
                                  boxShadow: 2,
                                  border: 2,
                                  borderColor: "primary.light",
                                  "& .MuiDataGrid-cell:hover": {
                                    color: "primary.main",
                                  },
                                }}
                              />

                              {/* <table>
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
                        </table> */}
                            </Box>
                          </Box>
                        </Box>
                      )
                    );
                  }
                })}
              </Box>
            </>
          )}
          <Box style={chatWindow.inputContainer}>
            <TextField
              placeholder="Enter your query here!"
              inputProps={{ "aria-label": "Enter your query here!" }}
              style={chatWindow.textField}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{
                m: "0rem 0rem 0rem 1.5rem",
                borderRadius: "1rem",
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
