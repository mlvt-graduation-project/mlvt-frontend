import React, { Suspense } from "react";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { ProjectProvider } from "./context/ProjectContext";
import { ColorModeProvider } from "./themes/ColorModeContext";
import CustomLoadingDot from "./components/CustomLoadingDot";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => (
    <BrowserRouter>
        <ColorModeProvider>
            <AuthProvider>
                <ProjectProvider>
                    <Suspense fallback={<CustomLoadingDot />}>
                        <AppRoutes />
                    </Suspense>
                </ProjectProvider>
            </AuthProvider>
        </ColorModeProvider>
    </BrowserRouter>
);

export default App;
