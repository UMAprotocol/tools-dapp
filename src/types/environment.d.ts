export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NEXT_PUBLIC_INFURA_URL: string;
      readonly NEXT_PUBLIC_INFURA_KEY: string;
    }
  }
}
