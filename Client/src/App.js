import { RouterProvider } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./store/actions";
import { DefaultLayout } from "./component/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import router from "./routes";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getHome());
  }, []);

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
