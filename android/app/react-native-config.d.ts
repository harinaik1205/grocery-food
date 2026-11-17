declare module 'react-native-config' {
  export interface NativeConfig {
    HOSTNAME?: string;
    WEB_CLIENT_ID?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
