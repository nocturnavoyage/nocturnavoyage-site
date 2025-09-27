import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Signup from "./components/Signup";
import WallBlockPage from "./pages/WallBlockPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/block/:id"
          element={
            <ProtectedRoute>
              <WallBlockPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<p className='text-center mt-10'>404 - Page Not Found</p>} />
      </Routes>
    </Router>
  );
}

export default App;