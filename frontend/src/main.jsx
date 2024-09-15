import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import ChatProvider from './Context/ChatProvider.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <ChakraProvider>
                <ChatProvider>
                    <App />
                </ChatProvider>
            </ChakraProvider>
        </BrowserRouter>
    </StrictMode>
);
