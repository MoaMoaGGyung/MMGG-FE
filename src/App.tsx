import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { RecoilRoot } from "recoil";

function App() {
    return (
        <RecoilRoot>
            <Header />
            <Outlet />
            <Footer />
        </RecoilRoot>
    );
}

export default App;
