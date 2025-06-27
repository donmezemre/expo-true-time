import { NativeModule, requireNativeModule } from 'expo';

import { ExpoTrueTimeModuleEvents } from './ExpoTrueTime.types';

declare class ExpoTrueTimeModule extends NativeModule<ExpoTrueTimeModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoTrueTimeModule>('ExpoTrueTime');
