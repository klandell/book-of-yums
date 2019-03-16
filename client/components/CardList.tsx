import React, { useCallback } from 'react';
import styled from 'styled-components';
import VirtualizedCollection from './VirtualizedCollection';
import Card from './Card';
//

function CardList(props) {
  const { cards } = props;

  const renderItem = useCallback(item => {
    return <Card key={item.key} />;
  }, []);

  return (
    <VirtualizedCollection
      collection={cards}
      collectionSize={cards.length}
      itemHeight={450}
      keyProperty="key"
      renderItem={renderItem}
    />
  );
}

export default CardList;
