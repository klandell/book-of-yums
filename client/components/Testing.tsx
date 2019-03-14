import React, { useCallback } from 'react';
import VirtualizedCollection from './VirtualizedCollection';

const data = [];
const colors = ['red', 'blue', 'green', 'navy', 'purple', 'pink'];
for (let i = 0; i < 1000000; i++) {
  data.push({
    key: i,
    color: colors[i % colors.length],
  });
}

function Testing() {
  const renderItem = useCallback(item => {
    //
    return (
      <div
        key={item.key}
        style={{
          height: 'calc(300px - 40px)',
          margin: 20,
          background: item.color,
          color: '#fff',
        }}
      >
        {item.key}
      </div>
    );
  }, []);

  return (
    <VirtualizedCollection
      collection={data}
      itemHeight={300}
      renderItem={renderItem}
    />
  );
}

export default Testing;
