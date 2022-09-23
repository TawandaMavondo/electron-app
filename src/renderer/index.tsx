import { ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';
import App from './App';
import theme from './theme/theme';

const container = document.getElementById('root')!;
const root = createRoot(container);
const Wrapper = () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
root.render(<Wrapper />);


