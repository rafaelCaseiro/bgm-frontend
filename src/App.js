import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Application } from "./Pages/App";
import { Forgot } from "./Pages/Auth/Forgot";
import { Login } from "./Pages/Auth/Login";
import { NewPassword } from "./Pages/Auth/NewPassword";
import { GlobalStyle } from "./styles/global";
function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          {/* <Route
            path="/new-password/:token"
            render={(props) => <NewPassword {...props} />}
          />
         
          <Route path="/forgot" render={(props) => <Forgot {...props} />} /> */}
          <Route path="/new-password/:token" element={<NewPassword />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Application />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
