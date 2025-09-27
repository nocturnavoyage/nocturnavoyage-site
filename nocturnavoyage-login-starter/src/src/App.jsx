import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import DashboardLocale from "./pages/DashboardLocale";
import AdminPage from "./pages/AdminPage";
import Home from "./pages/Home";
import CompleteProfile from "./pages/CompleteProfile";
import WallBlockPageExample from "./pages/WallBlockPageExample";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar session={session} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/complete-profile" element={<CompleteProfile session={session} />} />
        <Route path="/dashboard" element={
          <ProtectedRoute session={session}>
            <Dashboard session={session} />
          </ProtectedRoute>
        } />
        <Route path="/dashboard-locale" element={
          <ProtectedRoute session={session}>
            <DashboardLocale session={session} />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute session={session}>
            <AdminPage session={session} />
          </ProtectedRoute>
        } />
        <Route path="/blockv2/:id" element={
          <ProtectedRoute session={session}>
            <WallBlockPageExample session={session} />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;