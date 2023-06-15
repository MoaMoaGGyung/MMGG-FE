import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { RecoilRoot } from "recoil";
import Breadcrumb from "./components/Breadcrumb";

function App() {
    return (
        <RecoilRoot>
            <Header />
            <Breadcrumb />
            <Outlet />
            <Footer />
        </RecoilRoot>
    );
}

export default App;
