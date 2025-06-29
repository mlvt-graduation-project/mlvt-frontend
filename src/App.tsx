import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import CustomLoadingDot from './components/CustomLoadingDot'
import { AuthProvider } from './contexts/AuthContext'
import { ProjectProvider } from './contexts/ProjectContext'
import { AppRoutes } from './routes'
import { ColorModeProvider } from './themes/ColorModeContext'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
})

const App: React.FC = () => (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
)

export default App
