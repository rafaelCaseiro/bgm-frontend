import { Route, Routes as Switch, Navigate } from "react-router-dom";
import { CreateEditCustomer } from "../Views/BasicRegistration/Customers/CreateEditCustomer";
import { ListCustomers } from "../Views/BasicRegistration/Customers/ListCustomers";
import { CreateEditUser } from "../Views/Admin/Users/CreateEditUser";
import { ListUsers } from "../Views/Admin/Users/ListUsers";
import { CreateEditSimulation } from "../Views/Simulator/CreateEditSimulation";
import { Container, Content } from "./style";
import { ListIngredients } from "../Views/BasicRegistration/Ingredients/ListIngredients";
import { CreateEditIngredient } from "../Views/BasicRegistration/Ingredients/CreateEditIngredients";
import { FeedFormulator } from "../Views/FeedFormulator";
import { CreateEditDiet } from "../Views/BasicRegistration/DietComposition/CreateEditDiet";
import { ListDiet } from "../Views/BasicRegistration/DietComposition/ListDiet";
import { CreateEditFeedRestrictionProgram } from "../Views/BasicRegistration/FeedRestrictionProgram/CreateEditFeedRestrictionProgram";
import { ListFeedRestrictionPrograms } from "../Views/BasicRegistration/FeedRestrictionProgram/ListFeedRestrictionProgram";
import { CreateEditDietProgram } from "../Views/BasicRegistration/DietProgram/CreateEditDietProgram";
import { ListDietPrograms } from "../Views/BasicRegistration/DietProgram/ListDietProgram";
import { CreateEditAnimalProfile } from "../Views/BasicRegistration/AnimalProfile/CreateEditAnimalProfile";
import { ListAnimalProfiles } from "../Views/BasicRegistration/AnimalProfile/ListAnimalProfile";
import { CreateEditEnvironmentVariables } from "../Views/BasicRegistration/EnvironmentVariables/CreateEditEnvironmentVariables";
import { ListEnvironmentVariables } from "../Views/BasicRegistration/EnvironmentVariables/ListEnvironmentVariables";
import { ListSimulations } from "../Views/Simulator/ListSimulation";

export function Routes() {
  return (
    <Container>
      <Content>
        <Switch>
          <Route
            path="/"
            exact={true}
            element={<Navigate to={`home`} replace />}
          />

          <Route path="/home" element={<div />}></Route>

          {/* User */}
          <Route
            path="/basicregistration/user/create"
            element={<CreateEditUser />}
          />
          <Route
            path="/basicregistration/user/edit/:id"
            element={<CreateEditUser />}
          />
          <Route
            path="/basicregistration/user/:page/:limit/:sort/:query"
            element={<ListUsers />}
          />

          {/* Customer */}
          <Route
            path="/basicregistration/customer/create"
            element={<CreateEditCustomer />}
          />
          <Route
            path="/basicregistration/customer/edit/:id"
            element={<CreateEditCustomer />}
          />
          <Route
            path="/basicregistration/customer/:page/:limit/:sort/:query"
            element={<ListCustomers />}
          />
          {/* Ingredients */}
          <Route
            path="/basicregistration/ingredient/create"
            element={<CreateEditIngredient />}
          />
          <Route
            path="/basicregistration/ingredient/edit/:id"
            element={<CreateEditIngredient />}
          />
          <Route
            path="/basicregistration/ingredient/:page/:limit/:sort/:query/:id"
            element={<ListIngredients />}
          />
          {/* Diet Composition */}

          <Route
            path="/basicregistration/diet/edit/:id"
            element={<CreateEditDiet />}
          />
          <Route
            path="/basicregistration/diet/:page/:limit/:sort/:query"
            element={<ListDiet />}
          />
          {/* Feed Restriction Program */}
          <Route
            path="/basicregistration/feedrestrictionprogram/create"
            element={<CreateEditFeedRestrictionProgram />}
          />
          <Route
            path="/basicregistration/feedrestrictionprogram/edit/:id"
            element={<CreateEditFeedRestrictionProgram />}
          />
          <Route
            path="/basicregistration/feedrestrictionprogram/:page/:limit/:sort/:query"
            element={<ListFeedRestrictionPrograms />}
          />
          {/* Diet Program */}
          <Route
            path="/basicregistration/dietprogram/create"
            element={<CreateEditDietProgram />}
          />
          <Route
            path="/basicregistration/dietprogram/edit/:id"
            element={<CreateEditDietProgram />}
          />
          <Route
            path="/basicregistration/dietprogram/:page/:limit/:sort/:query"
            element={<ListDietPrograms />}
          />
          {/* Animal Profile */}
          <Route
            path="/basicregistration/animalprofile/create"
            element={<CreateEditAnimalProfile />}
          />
          <Route
            path="/basicregistration/animalprofile/edit/:id"
            element={<CreateEditAnimalProfile />}
          />
          <Route
            path="/basicregistration/animalprofile/:page/:limit/:sort/:query"
            element={<ListAnimalProfiles />}
          />
          {/* Environment Variables */}
          <Route
            path="/basicregistration/environmentVariables/create"
            element={<CreateEditEnvironmentVariables />}
          />
          <Route
            path="/basicregistration/environmentVariables/edit/:id"
            element={<CreateEditEnvironmentVariables />}
          />
          <Route
            path="/basicregistration/environmentVariables/:page/:limit/:sort/:query"
            element={<ListEnvironmentVariables />}
          />
          {/* Feed Formulator */}
          <Route path="/feedformulator" element={<FeedFormulator />} />
          {/* Simulation */}
          <Route
            path="/simulator/simulation/create"
            element={<CreateEditSimulation />}
          />
          <Route
            path="/simulator/simulation/edit/:id"
            element={<CreateEditSimulation />}
          />
          <Route
            path="/simulator/simulations/:page/:limit/:sort/:query"
            element={<ListSimulations />}
          />
        </Switch>
      </Content>
    </Container>
  );
}
