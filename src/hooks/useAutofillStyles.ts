import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

const useAutofillStyles = () => {
  const theme = useTheme();

  useEffect(() => {
    const autofillStyles = document.createElement('style');
    autofillStyles.type = 'text/css';
    autofillStyles.id = 'autofillStyles';

    let autofillColor;
    let autofillBgColor;

    if (theme.palette.mode === 'dark') {
      autofillColor = theme.palette.text.primary;
      autofillBgColor = theme.palette.background.default;
    } else {
      autofillColor = theme.palette.text.primary;
      autofillBgColor = theme.palette.background.default;
    }

    autofillStyles.innerHTML = `
      input:-webkit-autofill,
      input:-webkit-autofill:hover, 
      input:-webkit-autofill:focus, 
      input:-webkit-autofill:active  {
        -webkit-box-shadow: 0 0 0 30px ${autofillBgColor} inset !important;
        color: ${autofillColor} !important;
      }
    `;

    // Append new autofill styles
    document.head.appendChild(autofillStyles);

    // Clean up function
    return () => {
      // Remove autofill styles when the component is unmounted
      const existingStyles = document.getElementById('autofillStyles');
      if (existingStyles) {
        document.head.removeChild(existingStyles);
      }
    };
  }, [theme]);
};

export default useAutofillStyles;
