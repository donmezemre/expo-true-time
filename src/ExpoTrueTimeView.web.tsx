import * as React from 'react';

import { ExpoTrueTimeViewProps } from './ExpoTrueTime.types';

export default function ExpoTrueTimeView(props: ExpoTrueTimeViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
