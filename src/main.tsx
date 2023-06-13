import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import HotArticles from "./pages/HotArticles";
import Department from "./pages/Department";
import Board from "./pages/Board";
import Detail from "./pages/Detail";
import axios from "axios";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        // errorElement: <div>404 Not Found</div>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/hot",
                element: <HotArticles />,
            },
            {
                path: "/department",
                element: <Detail />,
                children: [
                    {
                        path: "/department/:dId",
                        element: <Department />,
                    },
                    {
                        path: "/department/:dId/board/:bId",
                        element: <Board />,
                    },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <RouterProvider router={router} />
);
