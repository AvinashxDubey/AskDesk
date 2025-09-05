import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
    <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
    </Routes>
    </>
  )
}

export default App