import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const AuthContext = createContext({});

const client = axios.create({
  baseURL: "http://localhost:3000",
});

export const AuthProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const [userData, setUserData] = useState(authContext);
  const router = useNavigate();

  const handleSignUp = async (name, username, password) => {
    try {
      let request = await client.post("/signup", {
        name: name,
        username: username,
        password: password,
      });
      if (request.status == 201) {
        return request.data.message;
      }
    } catch (err) {
      throw err;
    }
  };
  const handleLogin = async (username, password) => {
    try {
      let request = await client.post("/login", {
        username: username,
        password: password,
      });
      console.log(request);
      if (request.status == 201) {
        localStorage.setItem("token", request.data.token);
        router("/home");
        return request.data.message;
      }
    } catch (err) {
      throw err;
    }
  };

  const getHistoryOfUser = async () => {
    try {
      let request = await client.get("/get_all_activity", {
        params: {
          token: localStorage.getItem("token"),
        },
      });
      return request.data;
    } catch (e) {
      throw e;
    }
  };

  const addToUserHistory = async (meetingCode) => {
    try {
      let request = await client.post("/add_to_activity", {
        token: localStorage.getItem("token"),
        meeting_code: meetingCode,
      });
      return request;
    } catch (e) {
      throw e;
    }
  };

  const data = {
    userData,
    setUserData,
    handleSignUp,
    handleLogin,
    addToUserHistory,
    getHistoryOfUser,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
