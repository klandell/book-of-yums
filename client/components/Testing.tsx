import React from 'react';
import CardList from './CardList';

const data: any[] = [];
const colors = ['red', 'blue', 'green', 'navy', 'purple', 'pink'];
for (let i = 0; i < 10000; i++) {
  data.push({
    key: i,
    color: colors[i % colors.length],
  });
}

function Testing() {
  return <CardList cards={data} />;
}

export default Testing;
