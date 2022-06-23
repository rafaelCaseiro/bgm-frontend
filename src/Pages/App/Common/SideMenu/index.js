import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowIcon } from "../../../../Components/ArrowIcon";
import { FontAwesome } from "../../../../Components/FontAwesome";
import {
  Container,
  Content,
  MenuContainer,
  MenuContent,
  MenuIcon,
  MenuItem,
  MenuLink,
  MenuText,
  SubmenuContainer,
} from "./style";

import Profile from "../../../../contexts/profile";
import { translate } from "../../../../utils/globalFunctions";

export function SideBar() {
  const config = [
    { model: "home", label: "Home", icon: "home" },
    {
      model: "admin",
      label: "Administration",
      icon: "wrench",
      items: [
        {
          model: "user",
          label: "Users",
          icon: "user-circle",
          to: "/basicregistration/user/1/30/index/{}",
        },
      ],
    },
    {
      model: "basicregistration",
      label: "Basic Registration",
      icon: "clone",
      items: [
        {
          model: "customer",
          label: "Customers",
          icon: "address-book",
          to: "/basicregistration/customer/1/30/index/{}",
        },
        {
          model: "ingredient",
          label: "Ingredients",
          icon: "database",
          to: "/basicregistration/ingredient/1/30/index/{}/true",
        },
        {
          model: "dietcomposition",
          label: "Diet Composition",
          icon: "balance-scale",
          to: "/basicregistration/diet/1/30/index/{}",
        },
        {
          model: "feedrestrictionprogram",
          label: "Feed Restriction Program",
          style: { fontSize: 11 },
          icon: "cutlery",
          to: "/basicregistration/feedrestrictionprogram/1/30/index/{}",
        },
        {
          model: "dietprogram",
          label: "Diet Program",
          icon: "bars",
          to: "/basicregistration/dietprogram/1/30/index/{}",
        },
        {
          model: "animalprofile",
          label: "Animal Profile",
          icon: "kiwi-bird",
          to: "/basicregistration/animalprofile/1/30/index/{}",
        },
        {
          model: "environmentvariables",
          label: "Environment Variables",
          icon: "thermometer-empty",
          to: "/basicregistration/environmentvariables/1/30/index/{}",
        },
      ],
    },
    {
      model: "feedformulator",
      label: "Feed Formulator",
      icon: "sliders",
      to: "/feedformulator",
    },
    {
      model: "simulator",
      label: "Simulator",
      icon: "area-chart",
      items: [
        {
          model: "newsimulation",
          label: "New Simulation",
          icon: "plus",
          to: "simulator/simulation/create",
        },
        {
          model: "listofsimulations",
          label: "List of Simulations",
          icon: "list",
          to: "simulator/simulations/1/30/index/{}",
        },
      ],
    },
    {
      model: "optimization",
      label: "Optimization",
      icon: "spinner",
      items: [
        {
          model: "newoptimization",
          label: "New Optimization",
          icon: "plus",
        },
        {
          model: "listofoptimizations",
          label: "List of optimization",
          icon: "list",
        },
      ],
    },
  ];

  const { profile } = useContext(Profile);

  const navigate = useNavigate();

  const [show, setShow] = useState([]);

  const showHandler = (index) => {
    setShow((prevState) => {
      return config.map((item, i) => (i !== index ? false : !prevState[i]));
    });
  };

  return (
    <Container>
      <Content>
        <MenuContainer>
          <MenuContent>
            {config
              .filter(({ model }) =>
                profile.roles && profile.roles.indexOf("admin") > -1
                  ? true
                  : model !== "admin"
              )
              .map(({ model, label, icon, items, to, style }, index) => (
                <MenuItem key={index + model}>
                  <MenuLink
                    onClick={() => (to ? navigate(to) : showHandler(index))}
                    show={show[index]}
                  >
                    <MenuIcon>
                      <FontAwesome
                        name={icon}
                        type="solid"
                        color="text"
                        size={16}
                      />
                    </MenuIcon>
                    <MenuText style={style || null}>
                      {translate(label, profile.language)}
                    </MenuText>
                    {items ? (
                      <MenuIcon>
                        <ArrowIcon show={show[index]} />
                      </MenuIcon>
                    ) : null}
                  </MenuLink>
                  {items ? (
                    <SubmenuContainer
                      style={
                        show[index] ? { height: 40.341 * items.length } : null
                      }
                    >
                      {items.map(({ model, label, icon, to, style }, index) => (
                        <MenuItem key={index + model}>
                          <MenuLink onClick={() => navigate(to)}>
                            <MenuIcon>
                              <FontAwesome
                                name={icon}
                                type="solid"
                                color="text"
                                size={12}
                              />
                            </MenuIcon>
                            <MenuText style={style || null}>
                              {translate(label, profile.language)}
                            </MenuText>
                          </MenuLink>
                        </MenuItem>
                      ))}
                    </SubmenuContainer>
                  ) : null}
                </MenuItem>
              ))}
          </MenuContent>
        </MenuContainer>
      </Content>
    </Container>
  );
}
