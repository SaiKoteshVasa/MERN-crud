import React, { useState } from "react";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleAge = (e) => setAge(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !age) {
      setError("All fields are required.");
      return;
    }

    const addUser = { name, email, age };
    setLoading(true);
    setSuccess(false);
    const response = await fetch("http://localhost:5000", {
      method: "POST",
      body: JSON.stringify(addUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    setLoading(false);

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    } else {
      console.log(result);
      setError("");
      setName("");
      setEmail("");
      setAge("");
      setSuccess(true);
    }
  };

  return (
    <div className="form__container">
      {error && <div className="alert alert-danger">{error}</div>}
      {success && (
        <div className="alert alert-success">User created successfully!</div>
      )}
      <h2 className="text-center">Enter the data</h2>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-input"
            id="name"
            value={name}
            onChange={handleName}
          />
        </div>

        <div className="field">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-input"
            id="email"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="field">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-input"
            id="age"
            value={age}
            onChange={handleAge}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Create;
