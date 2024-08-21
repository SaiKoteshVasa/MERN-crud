import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function getData() {
    try {
      const response = await fetch("http://localhost:5000");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error);
      }

      setMessage("Deleted Successfully");

      setTimeout(() => {
        setMessage("");
        getData();
      }, 1000);
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view__container">
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-danger">{message}</div>}
      <h2 className="text-center">All data</h2>
      <div className="row">
        {data.map((ele) => (
          <div key={ele._id} className="card-body">
            <h5 className="card-title">{ele.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
            <p className="text-muted">{ele.age}</p>
            <Link className="link delete" onClick={() => handleDelete(ele._id)}>
              Delete
            </Link>
            <Link className="link edit" to={`/${ele._id}`}>
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
