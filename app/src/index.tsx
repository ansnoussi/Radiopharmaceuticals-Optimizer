import ReactDOM from 'react-dom';
import App from './App';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { init } from 'emailjs-com';
import { initAmplitude } from './utils/amplitude';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { PatientsContextProvider } from './context/PatientsContext';
import { RpSettingsContextProvider } from './context/RpSettingsContext';
import { StatisticsContextProvider } from './context/StatisticsContext';

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: 'antd/dist/antd.css',
};

// init amplitude
initAmplitude();

// init emailjs
init(process.env.REACT_APP_EMAILSJS_USER ?? '');

// init sentry
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
  ignoreErrors: ['ResizeObserver loop limit exceeded'],
});

const AppWrapper = () => {
  return (
    <ThemeSwitcherProvider themeMap={themes} defaultTheme="light">
      <RpSettingsContextProvider>
        <PatientsContextProvider>
          <StatisticsContextProvider>
            <App />
          </StatisticsContextProvider>
        </PatientsContextProvider>
      </RpSettingsContextProvider>
    </ThemeSwitcherProvider>
  );
};

ReactDOM.render(<AppWrapper />, document.getElementById('root'));
