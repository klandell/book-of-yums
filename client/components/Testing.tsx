import React, { useCallback } from 'react';
import CardList from './CardList';

const data = [];
const colors = ['red', 'blue', 'green', 'navy', 'purple', 'pink'];
for (let i = 0; i < 10000; i++) {
  data.push({
    key: i,
    color: colors[i % colors.length],
  });
}

function Testing() {
  return (
    <CardList cards={data} collectionSize={data.length} itemHeight={300} />
  );
}

export default Testing;
