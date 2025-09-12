import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn';
import Home from './pages/Home/Home';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

function App() {

  return (
    <>
    <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
    </Routes>
    <Navbar />
    <Home />
    </>
  )
}

export default App