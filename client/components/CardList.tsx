import React, { useCallback } from 'react';
import VirtualizedCollection from './VirtualizedCollection';
import Card from './Card';

interface Props {
  cards: object[]; // FIXME: better type
}

// collectionSize={data.length} itemHeight={300}

const CardList: React.FC<Props> = (props: Props) => {
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
};

export default CardList;
