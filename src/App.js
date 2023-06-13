import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Typography, Tab, Tabs } from "@material-ui/core";
import {
  UserList,
  EmployeeList,
  UserDetails,
  EditUserModal,
} from "./components";

function App() {
  return (
    <Router>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          User Management
        </Typography>
        <Tabs>
          <Tab label="User" component={Link} to="/users" />
          <Tab label="Employees" component={Link} to="/employees" />
        </Tabs>
        <Switch>
          <Route path="/" exact>
            <UserList />
          </Route>
          <Route path="/users" exact>
            <UserList />
          </Route>
          <Route path="/employees" exact>
            <EmployeeList />
          </Route>
          <Route path="/users/:id" exact>
            <UserDetails />
          </Route>
          <Route path="/users/:id/edit" exact>
            <EditUserModal />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
