import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.appinfo',
  appName: 'appinfo',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
