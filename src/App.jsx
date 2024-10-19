import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import CustomerList from './CustomerList';
import TrainingList from './TrainingList';

function App() {
  return (
    <Router>
      <Container maxWidth = "xl">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Training App
          </Typography>
          <Button color="inherit" component={Link} to="/customers">
            Customers
          </Button>
          <Button color="inherit" component={Link} to="/trainings">
            Trainings
          </Button>
        </Toolbar>
      </AppBar>
      
        <Routes>
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingList />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
