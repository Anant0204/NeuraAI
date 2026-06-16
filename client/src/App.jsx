import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Billing from "./pages/Billing";
import Builder from "./pages/Builder";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

export const serverURL = "https://neuraaiserver.onrender.com";
export const CLIENT_URL = "http://localhost:5173";
const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get(serverURL + "/api/user/current-user", {
          withCredentials: true,
        });
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log("Error in fecthing current User", error);
        setLoading(false);
      }
    };
    fetchMe();
  }, []);
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute user={user} loading={loading}>
              <Navbar user={user} setUser={setUser} />
              <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route
                  path="/builder"
                  element={<Builder user={user} setUser={setUser} />}
                />
                <Route path="/billing" element={<Billing user={user} setUser={setUser} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
