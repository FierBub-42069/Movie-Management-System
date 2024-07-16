import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import Login from "./Components/Login";
import MovieList from "./Components/MovieList";
import MovieForm from "./Components/MovieForm";
import AuthGuard from "./Components/Auth/AuthGuard";
import { AuthService } from "./Components/Auth/AuthService";
import "./App.css";

const App = () => {
  // Setting current user, if authenticated and authorized, for usage of application
  const [_, setUser] = useState(AuthService.getCurrentUser());

  // Function for handling login of user through AuthService
  const handleLogin = (user) => {
    AuthService.login(user);
    setUser(user);
  };

  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login setUser={handleLogin} />} />
        <Route
          path="/movies"
          element={
            <AuthGuard role="admin">
              <MovieList />
            </AuthGuard>
          }
        />
        <Route
          path="/add-movie"
          element={
            <AuthGuard role="admin">
              <MovieForm />
            </AuthGuard>
          }
        />
        <Route
          path="/edit-movie/:id"
          element={
            <AuthGuard role="admin">
              <MovieForm />
            </AuthGuard>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
