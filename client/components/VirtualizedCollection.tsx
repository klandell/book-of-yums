/**
 *
 */
import React, { useCallback, useState } from 'react';
import Scroller from './Scroller';
import VirtualContainer from './VirtualContainer';
import VirtualizedItem from './VirtualizedItem';

interface VirtualItemRenderer {
  (o: object): React.ReactNode;
}

interface Props {
  collection: object[];
  itemHeight: number;
  renderItem: VirtualItemRenderer;
  keyProperty?: string;
  leadingBufferZone?: number;
  trailingBufferZone?: number;
}

const VirtualizedCollection: React.FC<Props> = (props: Props) => {
  const {
    collection,
    keyProperty,
    itemHeight,
    renderItem,
    leadingBufferZone,
    trailingBufferZone,
  } = props;
  const [scrollTop, setScrollTop] = useState(0);

  /**
   * define some values used for calculations
   *   index - the index of the top-most *visible* item
   *   leadingIndex - the index of the top-most item (rendered off screen)
   *   trailingIndex - the index of the bottom-most item (rendered off screen)
   */
  const index = Math.floor(scrollTop / itemHeight);
  const leadingIndex = Math.max(0, index - leadingBufferZone);
  const trailingIndex = Math.min(index + trailingBufferZone, collection.length);

  // render a subsection of the total collection
  const itemsToRender = collection.slice(leadingIndex, trailingIndex);

  const scrollHandler = useCallback(scroller => {
    const { scrollTop: nextScrollTop } = scroller;
    setScrollTop(nextScrollTop);
  }, []);

  return (
    <Scroller onScroll={e => scrollHandler(e.currentTarget)}>
      <VirtualContainer height={itemHeight * collection.length}>
        {itemsToRender.map((o, i) => (
          <VirtualizedItem key={o[keyProperty]} top={(leadingIndex + i) * itemHeight}>
            {renderItem(o)}
          </VirtualizedItem>
        ))}
      </VirtualContainer>
    </Scroller>
  );
};

VirtualizedCollection.defaultProps = {
  keyProperty: 'id',
  leadingBufferZone: 100,
  trailingBufferZone: 50,
};

export default VirtualizedCollection;
