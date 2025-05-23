import HomePage from "../pages/home/home-page";
import AboutPage from "../pages/about/about-page";
import LoginPage from "../pages/auth/login/login-page";
import RegisterPage from "../pages/auth/register/register-page";
import StoryPage from "../pages/story/story-page";
import ProfilePage from "../pages/profile/profile-page";
import StoryDetailPage from "../pages/story-detail/story-detail-page";

const routes = {
  "/": new HomePage(),
  "/about": new AboutPage(),
  "/login": new LoginPage(),
  "/register": new RegisterPage(),
  "/story": new StoryPage(),
  "/story/:id": new StoryDetailPage(),
  "/profile": new ProfilePage(),
};

export default routes;
