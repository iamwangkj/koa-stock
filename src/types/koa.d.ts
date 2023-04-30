import Koa from 'koa'

declare module 'koa' {
  interface BaseContext {
    resolve(data: any, status?: number): void;
    reject(data: any, status?: number, message?: string): void;
  }
}
