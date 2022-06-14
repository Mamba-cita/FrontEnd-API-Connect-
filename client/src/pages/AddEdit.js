import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddEdit.css";


const initialState = {
  name: "",
  age: "",
  city: "",
};



const AddEdit = () =>{
  const [state, setState] = useState(initialState);
  const {name, age, city} = state;

  const history = useHistory();
  const { id } = useParams();
  
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:4000/api/get/${id}`).then((response) => setState(...resp.data[0]));
    }
  }, [id]);



const handleSubmit = (e) => {
  e.preventDefault();
  if (name === "" || age === "" || city === "") {
    toast.error("Please fill all the fields");
  } else {
    if (!id) {
      axios
      .post("http://localhost:4000/api/add", {
        name,
        age,
        city

      })

      .then((res) => {
  setState({ name: "", age: "", city: "" });
      })
      .catch((err) => {
        toast.error("Error While Adding");
        toast.success("Successfully Added");
    }
    );
    } else {
      axios
      .put('http://localhost:4000/api/Edit/&{id}', {
        name,
        age,
        city

      })

      .then((res) => {
  setState({ name: "", age: "", city: "" });
      })
      .catch((err) => {
        toast.error("Error While Adding");
        toast.success("Successfully Added");
      }
      )
    }
  }
}
}

  


 const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });

  }

 
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}>
        <label  className="lable" htmlFor="Name">Name</label>
        <input
          type="text"
          id="Name"
          name="Name"
          placeholder="Name"
          value={name || ""}
          onChange={handleInputChange}
        />
        <label className="lable" htmlFor="Age">Age</label>
        <input
          type="text"
          id="Age"
          name="Age"
          placeholder="Age"
          value={age || ""}
          onChange={handleInputChange}
        />
        <label  className="lable"  htmlFor="City">City</label>
        <input
          type="text"
          id="City"
          name="City"
          placeholder="City"
          value={city || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "update" : "Save" } />
        <Link to="/">
        <input type="button" value="Cancel" />
        </Link>
      </form>
    </div>
  );

export default AddEdit;
