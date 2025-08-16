import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import "./App.css";
import app from "./FireBase.config";
import Registration from "./Pages/Registration";
import { ToastContainer } from "react-toastify";
import LayoutOne from "./Layouts/LayoutOne";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

function App() {
  const myRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<LayoutOne />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Route>
    )
  );
  return (
    <div className="">
      <ToastContainer />
      <RouterProvider router={myRouter} />
    </div>
  );
}

export default App;
