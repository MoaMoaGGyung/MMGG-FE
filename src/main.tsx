import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <div>404 Not Found</div>,
        children: [
            {
                path: "/",
                element: <Main />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <RouterProvider router={router} />
);
