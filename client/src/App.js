import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from './components/HomePage';
import FindPerson from './components/FindPerson';
import CheckIn from './components/CheckIn';
import Partner from './components/Partner';
import Login from './components/Login';
import Weather from './components/Weather';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/find" element={<FindPerson />} />
      <Route exact path="/disaster" element={<Weather />} />
      <Route exact path="/check-in" element={<CheckIn />} />
      <Route exact path="/partner" element={<Partner />} />
      <Route exact path="/Login" element={<Login />} />
      </Routes>
      </Router>
     
     
    </div>
  );
}

export default App;
