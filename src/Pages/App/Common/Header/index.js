import { FirstLetter } from "../../../../Components/FirstLetter";
import { Input } from "../../../../Components/Input";
import {
  Container,
  Content,
  LanguageContainer,
  Logo,
  LogoContainer,
  UserButton,
  UserContainer,
  UserContent,
  UserInfo,
  UserName,
  UserResponsibility,
} from "./style";

import Profile from "../../../../contexts/profile";
import { useContext, useState } from "react";
import { api } from "../../../../services/api";
import { translate } from "../../../../utils/globalFunctions";
import { logout } from "../../../../services/auth";

export function Header() {
  const { profile, setProfile } = useContext(Profile);

  const [loading, setLoading] = useState(false);

  const languageHandler = async (e) => {
    setLoading(true);
    const response = await api.get("user/language/" + e.target.value);

    setProfile((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.language = response.data.language;
      return newState;
    });
    setLoading(false);
  };

  return (
    <Container>
      <Content>
        <LogoContainer>
          <Logo src="https://zenbytes-public.sfo2.digitaloceanspaces.com/unesp/logo.png" />
        </LogoContainer>
        <UserContainer>
          <LanguageContainer>
            <Input
              type="selectOnly"
              item={profile}
              setItem={setProfile}
              params="language"
              onChange={languageHandler}
              value={profile.language || "en"}
              disabled={loading}
              options={[
                { label: "Português", value: "pt" },
                { label: "English", value: "en" },
                { label: "Español", value: "es" },
              ]}
            />
          </LanguageContainer>
          <UserContent>
            <UserButton>
              <UserInfo>
                <UserName>{profile.name}</UserName>
                <UserResponsibility>
                  {profile.responsibility}
                </UserResponsibility>
              </UserInfo>
              <FirstLetter bg="default" color="white">
                {profile.name}
              </FirstLetter>
            </UserButton>
          </UserContent>
          <UserButton style={{ color: "white" }} onClick={logout}>
            {translate("Logout", profile.language)}
          </UserButton>
        </UserContainer>
      </Content>
    </Container>
  );
}
