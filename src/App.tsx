import { useState, FC } from "react";
import Auth from "./auth";
import Authenticated from "./authenticated";

const App: FC = () => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("accessToken"));
  return isAuth ? (
    <Authenticated setIsAuth={setIsAuth} />
  ) : (
    <Auth setIsAuth={setIsAuth} />
  );
};

export default App;
