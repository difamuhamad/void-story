import HomePage from "../pages/home/home-page";
import AboutPage from "../pages/about/about-page";
import LoginPage from "../pages/auth/login/login-page";
import RegisterPage from "../pages/auth/register/register-page";
import StoryPage from "../pages/story/story-page";
import ProfilePage from "../pages/profile/profile-page";

const routes = {
  "/": new HomePage(),
  "/about": new AboutPage(),
  "/login": new LoginPage(),
  "/register": new RegisterPage(),
  "/story": new StoryPage(),
  "/profile": new ProfilePage(),
};

export default routes;
