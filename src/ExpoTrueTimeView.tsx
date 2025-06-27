import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoTrueTimeViewProps } from './ExpoTrueTime.types';

const NativeView: React.ComponentType<ExpoTrueTimeViewProps> =
  requireNativeView('ExpoTrueTime');

export default function ExpoTrueTimeView(props: ExpoTrueTimeViewProps) {
  return <NativeView {...props} />;
}
