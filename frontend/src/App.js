import React from "react";
import {BrowserRouter} from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import AppRoutes from "./routes/AppRoutes";
import {ToastContainer} from "react-toastify";
import {AuthProvider} from "./context/AuthContext";

function App(){

return(

<AuthProvider>

<BrowserRouter>

<NavbarComponent/>

<AppRoutes/>

<ToastContainer/>

</BrowserRouter>

</AuthProvider>

)

}

export default App;