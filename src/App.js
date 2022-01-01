
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/Login/Login/Login';
import AdminPanel from './components/AdminPanel/AdminPanel';
import Navigation from './components/Navigation/Navigation';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Login2 from './components/Login/Login2/Login2';
import UserProfile from './components/Login/UserProfile/UserProfile';
import AuthProvider from './contexts/AuthProvider/AuthProvider';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login2 />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/admin" element={<AdminPanel />} />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
