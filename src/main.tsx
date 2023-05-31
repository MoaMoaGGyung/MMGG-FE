import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <div>404 Not Found</div>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <RouterProvider router={router} />
);
