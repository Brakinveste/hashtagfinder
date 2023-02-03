import React from "react";
//import { isAuthenticated } from "./checkLogin";
import { Navigate, Route, useNavigate } from "react-router-dom";
import { Login } from "./index.jsx";
import { History } from "../history";
//import { validateLogin } from "../../services";
 

export function PrivateRoute( props ) {

    const navigate = useNavigate()

    props.logged ? navigate('/buscas') : navigate('/login');
}