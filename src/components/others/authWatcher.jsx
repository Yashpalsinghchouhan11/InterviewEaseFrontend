import { useSelector, useDispatch } from "react-redux";
import { isAuthenticated, logOut } from "../../features/userSlice";
import { useEffect } from "react";
import { persistor } from "../../store/store.js"; // ⬅️ import persistor from your store

const AuthWatcher = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector(isAuthenticated);

  useEffect(() => {
  if (!authenticated) {
    dispatch(logOut());
    persistor.purge();

    // Force remove redux-persist metadata
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("persist:")) {
        localStorage.removeItem(key);
      }
    });
  }
}, [authenticated, dispatch]);


  return null; // invisible component
};

export default AuthWatcher;
