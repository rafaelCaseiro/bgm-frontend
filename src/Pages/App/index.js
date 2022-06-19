import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { isAuthenticated, logout } from "../../services/auth";
import { Header } from "./Common/Header";
import { SideBar } from "./Common/SideMenu";
import { Routes } from "./Routes";
import { Body, Container, Content, Wrapper } from "./style";
import Profile from "../../contexts/profile";

export function Application() {
  const [profile, setProfile] = useState({});
  const [run, setRun] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const loadUser = async () => {
      const response = await api.get("/auth/userprofile").catch((err) => err);
      if (!response.data) {
        return logout();
      }

      setProfile(response.data);
    };
    if (run) {
      setRun(false);
      loadUser();
    }
  }, [run]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Profile.Provider value={{ profile, setProfile }}>
      <Container>
        <Content>
          <Wrapper>
            <Header />
            <Body>
              <SideBar />
              <Routes />
            </Body>
          </Wrapper>
        </Content>
      </Container>
    </Profile.Provider>
  );
}
