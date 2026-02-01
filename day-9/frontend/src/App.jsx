import React, { useEffect, useState } from "react";
import axios from "axios";
import "/src/App.css";
const App = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      const res = await axios.get("http://localhost:3000/notes");
      setdata(res.data.notes);
    };

    getdata();
  }, []);

  console.log(data);
  return (
    <div className="container">
      {data.map((elem, idx) => {
        return (
          <div className="card-conatainer" key={idx}>
            <h2>{elem.title}</h2>
            <p>{elem.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default App;
