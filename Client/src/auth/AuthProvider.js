import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import React from "react";
import { createContext } from "react";

const AuthContext = createContext(null);

const AuthProvider = () => {
  const [token, setToken] = useState();

  const login = () => {};

  return <div>AuthProvider</div>;
};

export default AuthProvider;
