import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import "materialize-css";
import { Navbar } from "./Components/Navbar";
import { Loader } from "./Components/Loader";

function App() {
  const { token, userId, login, logout, ready} = useAuth();
  const isAuth = !!token
  const routes = useRoutes(isAuth)
  
  if (!ready) {
    return <Loader />
  }
  return (
    <AuthContext.Provider value={{token, userId, login, logout, isAuth}}>
      <Router>
        {isAuth && <Navbar/>}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
