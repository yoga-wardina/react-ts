import React, { ReactElement } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from "react-router-dom";

import "../App.css";
import { useAuthStore } from "../config/stores";
import MainLayout from "../layouts/mobile/main-layout";

const LoginPage = React.lazy(() => import("../pages/auth/login"));
const RegisterPage = React.lazy(() => import("../pages/auth/register"));

function DynamicLayout(children: ReactElement) {
    const location = useLocation();
    const chatId = useParams();

    const { isAuthenticated } = useAuthStore();

    React.useEffect(() => {
        if (location.pathname.startsWith("/channel")) {
            if (!isAuthenticated) {
                window.location.href = "/login";
            }
        }
    });
    if (location.pathname.startsWith("/channel")) {
        let channelType = "private";
        if (location.pathname.startsWith("/group") && chatId) {
            channelType = "group";
        }
        return <MainLayout channelType={channelType}>{children}</MainLayout>;
    }
    return <>{children}</>;
}

const Home = () => {
    return (
        <div>
            <h1>Hello World!</h1>
        </div>
    );
};
function App() {
    return (
        <Router>
            <React.Suspense>
                <Routes>
                    <Route path="/">
                        <Route index element={<Home />} />
                    </Route>
                </Routes>
            </React.Suspense>
        </Router>
    );
}

export default App;
