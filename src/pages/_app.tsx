import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import '../styles/globals.css';

const theme = {
  colors: {
    primary: '#0070f3',
    secondary: '#0051cc',
    background: '#f0f2f5',
    text: '#333'
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px'
  }
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
} 