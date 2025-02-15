import { Routes, Route } from "react-router-dom";
import { Login, Signup, Home } from "./pages";
import { ToastContainer } from "react-toastify";
import LandingPage from "./pages/LandingPage.jsx";
import Authentication from "./pages/Authentication";
import { AuthProvider } from "./contexts/AuthContext";
import VideoMeetComponent from "./pages/VideoMeet";
import HomeComponent from "./pages/HomeComponent";
import History from "./pages/History";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/:url" element={<VideoMeetComponent />} />
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
