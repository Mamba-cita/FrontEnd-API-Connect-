import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:4000/api/get");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);



const deleteContact =  (id) => {
  if(window.confirm("Are you sure you want to delete this Employee?")){
    axios.delete(`http://localhost:4000/api/delete/${id}`)
      toast.success("Contact Deleted Successfully");

      setTimeout(() => loadData(), 500);
  }
};

     




  return (
    <div  style={{ marginTop: "150px" }}>
    <div className="header">
    <h1> Employee Names and Work Stations</h1>
    <button className="btn btn-contact" id="main" ><Link to="/AddContact">Add</Link></button>
</div>
      <table className="styed-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>S1 No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Age</th>
            <th style={{ textAlign: "center" }}>City</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.city}</td>
              <td>
                <Link to={`/edit/${item.id}`}>
                  {" "}
                  <button
                    className="btn btn-edit"
                    onClick={() => {
                      axios.get(`http://localhost:4000/api/get/${item.id}`).then((response) => setData(response.data));
                    }
                    }

                >
                    Edit
                  </button>
                </Link>

                <button
                  className="btn btn-delete"
                  onClick={() =>deleteContact(item.id)}
                >
                  Delete
                </button>

                <Link to={`/view/${item.id}`}>
                  <button className="btn btn-view"> View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
