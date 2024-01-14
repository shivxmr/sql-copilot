// Which actors have the last name 'Bening' ?

import React, { useState } from 'react';
import { Textarea } from './components/ui/textarea';
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';
import { MainNav } from './components/main-nav';
import { Input } from './components/ui/input';
import Loader from './components/loader/loader'

function App() {
  const [query, setQuery] = useState('');
  const [sqlCode, setSqlCode] = useState('');
  const [sqlGenTime, setSqlGenTime] = useState(null);
  const [chatbotRespTime, setChatbotRespTime] = useState(null);
  const [data, setData] = useState([]);
  const [sqlExecTime, setSqlExecTime] = useState(null);

  const [loading, setLoading] = useState(false); // Add loading state
  const [showContent, setShowContent] = useState(false); // Add state to control content visibility



  const handleSubmit = async () => {
    setLoading(true); // Set loading to true before making the API call
    // Make a POST request to the server with the user's query
    const response = await fetch('http://localhost:8005/pipeline', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        last_questions: [],
        collection_name: 'sakila',
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
      <div className="container mx-auto w-screen m-3 flex flex-col items-center">
        <div className="flex w-screen pb-5">
          <Input
            placeholder="Enter your query here!"
            className="mr-2 ml-4"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button className='mr-4' onClick={handleSubmit}>Submit</Button>
        </div>

        {loading && !showContent ? (
          <Loader /> // Show the loader only when loading is true and content is not yet fetched
        ) : (
          <div className="grid w-screen gap-1.5 ml-10">
            {showContent && (
              <>
                <div className="flex justify-between w-screen pb-2">
                  <Label htmlFor="message">SQL Code</Label>
                  <Label>SQL Code Generation Time: {sqlGenTime} seconds</Label>
                </div>
                <Textarea
                  placeholder="Generated SQL code will appear here!"
                  className='mr-6'
                  value={sqlCode}
                  onChange={null}
                />
                <Label className='mt-2'>Chatbot Response Time: {chatbotRespTime} seconds</Label>
                <Label>Tables</Label>
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
                <Label>SQL Executed Time: {sqlExecTime} seconds</Label>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;