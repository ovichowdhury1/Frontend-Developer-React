import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";

import { Modal, TextField } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  employeeType: Yup.string().required("Employee Type is required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  employeeType: "",
  districtID: 0,
};

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://59.152.62.177:8085/api/Employee/EmployeeData")
      .then((response) => {
        console.log("Employees loaded successfully:", response.data);
        setEmployees(response.data.readEmployeeData);
      })
      .catch((error) => {
        console.error("Error loading employees:", error);
      });
  }, []);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values) => {
    axios
      .post("http://59.152.62.177:8085/api/SaveEmployeeInformation", values)
      .then((response) => {
        console.log("User saved successfully:", response.data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error saving user:", error);
      });
  };

  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        Employee List
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add User
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Paper style={{ padding: "2rem", maxWidth: "400px" }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Add User
            </Typography>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div style={{ marginBottom: "1rem" }}>
                  <Field
                    name="firstName"
                    label="First Name"
                    as={TextField}
                    fullWidth
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <Field
                    name="lastName"
                    label="Last Name"
                    as={TextField}
                    fullWidth
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <Field
                    name="employeeType"
                    label="Employee Type"
                    as={TextField}
                    fullWidth
                  />
                  <ErrorMessage
                    name="employeeType"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1rem",
                  }}
                >
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={handleClose}
                  >
                    Delete
                  </Button>
                </div>
              </Form>
            </Formik>
          </Paper>
        </div>
      </Modal>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Employee Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.empID}>
                <TableCell>{employee.empID}</TableCell>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.employeeType}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/users/${employee.empID}`}
                    variant="outlined"
                    color="primary"
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EmployeeList;
