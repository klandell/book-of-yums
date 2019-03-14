import React, { useCallback } from 'react';
import ScrollHelper from './ScrollHelper';

function Testing() {
  return (
    <ScrollHelper
      throttle={100}
      renderBody={useCallback(({ scrollTop }) => {
        return ['red', 'blue', 'green'].map(color => (
          <div
            key={color}
            style={{
              height: 500,
              background: color,
              margin: 50,
              color: '#fff',
            }}
          >
            {scrollTop}
          </div>
        ));
      }, [])}
    />
  );
}

export default Testing;
