export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly INFURA_URL: string;
      readonly INFURA_KEY: string;
    }
  }
}
