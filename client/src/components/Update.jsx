import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  //get single user data
  const getSingleUser = async () => {
    const response = await fetch(`http://localhost:5000/${id}`);
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setError("");
      console.log("Updated user ", result);
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
  };

  //send Updated data to backend
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedUser = { name, email, age };
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    } else {
      console.log(result);
      setError("");
      navigate("/all");
    }
  };

  useEffect(() => {
    getSingleUser();
  }, [id]);

  return (
    <div className="form__container">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center">Edit the data</h2>

      <form onSubmit={handleUpdate}>
        <div className="field">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-input"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-input"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-input"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
