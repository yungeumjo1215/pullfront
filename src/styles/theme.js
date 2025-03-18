const theme = {
  colors: {
    primary: '#4A6F4A',     // 소프트 그린
    secondary: '#8BA888',   // 라이트 그린
    background: '#F5F2ED',  // 베이지
    white: '#FFFFFF',
    text: '#2C3E2C',       // 다크 그린
    border: '#D4C9BE',     // 라이트 베이지
    error: '#E88B8B',      // 라이트 레드
    success: '#6B8E4E',    // 다크 그린
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
  },
  typography: {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontSize: {
      small: '0.875rem',
      medium: '1rem',
      large: '1.25rem',
      xlarge: '1.5rem',
      xxlarge: '2rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },
  spacing: {
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
    xlarge: '2rem',
    xxlarge: '3rem',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    circle: '50%',
  },
  transitions: {
    short: '0.2s',
    medium: '0.3s',
    long: '0.5s',
  },
};

export default theme; 