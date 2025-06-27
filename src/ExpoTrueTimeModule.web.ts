import { registerWebModule, NativeModule } from 'expo';

import { ExpoTrueTimeModuleEvents } from './ExpoTrueTime.types';

class ExpoTrueTimeModule extends NativeModule<ExpoTrueTimeModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoTrueTimeModule, 'ExpoTrueTimeModule');
