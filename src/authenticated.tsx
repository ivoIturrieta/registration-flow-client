import { useCallback, FC, Dispatch } from "react";

const Authenticated: FC<{
  setIsAuth: Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsAuth }) => {
  const name = localStorage.getItem("name");
  const onLogout = useCallback(() => {
    setIsAuth(false);
    localStorage.setItem("name", "");
    localStorage.setItem("accessToken", "");
  }, [setIsAuth]);

  return (
    <>
      Welcome <h2>{name}!</h2> to logout click{" "}
      <button onClick={onLogout}>here</button>
    </>
  );
};

export default Authenticated;
