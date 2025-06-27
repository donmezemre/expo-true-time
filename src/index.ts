// Reexport the native module. On web, it will be resolved to ExpoTrueTimeModule.web.ts
// and on native platforms to ExpoTrueTimeModule.ts
export { default } from './ExpoTrueTimeModule';
export { default as ExpoTrueTimeView } from './ExpoTrueTimeView';
export * from  './ExpoTrueTime.types';
