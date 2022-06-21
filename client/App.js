import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
// import EventBrite from "./components/EventBrite/EventBrite";

import Layout from "./components/Layout";
import AuthForm from "./components/AuthForm";
import Home from "./components/Home/Home";
import { me, getIsLoggedIn } from "./store";

import Profile from "./components/Profile";
import EventDetails from "./components/EventDetails";
import UserCalendar from "./components/UserCalendar";

import "./App.scss";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const location = useLocation();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/event/:id" element={<EventDetails />} />
          {isLoggedIn && (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/calendar" element={<UserCalendar />} />
            </>
          )}
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
