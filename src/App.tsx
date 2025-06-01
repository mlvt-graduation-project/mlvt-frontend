import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import { ColorModeProvider } from './themes/ColorModeContext';

const App: React.FC = () => (
  <ColorModeProvider>
    <AuthProvider>
      <ProjectProvider>
        <RouterProvider router={router} />
      </ProjectProvider>
    </AuthProvider>
  </ColorModeProvider>
);

export default App;
