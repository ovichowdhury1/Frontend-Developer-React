import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";
import axios from "axios";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://59.152.62.177:8085/api/Employee/EmployeeData/${id}`)
      .then((response) => {
        console.log("User loaded successfully:", response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error loading user:", error);
      });
  }, [id]);

  const handleEdit = () => {
    // Handle the edit action here
  };

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        User Details
      </Typography>
      <Typography>ID: {user.empID}</Typography>
      <Typography>First Name: {user.firstName}</Typography>
      <Typography>Last Name: {user.lastName}</Typography>
      <Typography>Employee Type: {user.employeeType}</Typography>
      <Button onClick={handleEdit} variant="outlined" color="primary">
        Edit
      </Button>
    </div>
  );
};

export default UserDetails;
