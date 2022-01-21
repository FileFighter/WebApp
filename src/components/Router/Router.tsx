import React, {ReactElement} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Health from "../pages/health/Health";
import Error404 from "../pages/errors/Error404";
import Login from "../basicElements/login/Login";
import Registration from "../pages/User/Registration";
import FileSystem, {filesBaseUrl} from "../pages/filesytem/Filesystem";
import Profile from "../pages/User/Profile";
import Error400 from "../pages/errors/Error400";
import BackendRedirect from "./BackendRedirect";


export default function Router(): ReactElement {

    return (
        <Routes>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/"} element={<Navigate replace to={filesBaseUrl}/>}/>
            <Route path={""} element={<Navigate replace to={filesBaseUrl}/>}/>
            <Route path={"/health"} element={<Health/>}/>
            <Route path={filesBaseUrl + "/*"} element={<FileSystem/>}/>
            <Route path={"/registration"} element={<Registration/>}/>
            <Route path={"/profile"} element={<Profile/>}/>
            <Route path={"/error"} element={<Error400/>}/>
            <Route path={"/data"} element={<BackendRedirect/>}/>
            <Route path={"/api"} element={< BackendRedirect/>}/>
            <Route path={"*"} element={<Error404/>}/>
        </Routes>
    );
}
