import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { throttler } from '../lib';
import Scroller from './Scroller';

// TODO: load more records in the collection eventually

const Container = styled.div.attrs(({ height }) => ({
  style: { height },
}))`
  position: relative;
`;

const Positioned = styled.div.attrs(({ top }) => ({
  style: { top },
}))`
  position: absolute;
  left: 0;
  right: 0;
`;

const VirtualizedCollection = props => {
  const {
    collection,
    collectionSize,
    keyProperty,
    itemHeight,
    renderItem,
    leadingBufferZone,
    trailingBufferZone,
    throttle,
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
  const trailingIndex = Math.min(index + trailingBufferZone, collectionSize);

  // render a subsection of the total collection
  const itemsToRender = collection.slice(leadingIndex, trailingIndex);

  const scrollHandler = useCallback(
    throttler(scroller => {
      const { scrollTop: nextScrollTop } = scroller;
      setScrollTop(nextScrollTop);
    }, throttle),
    [],
  );
  const onScroll = useCallback(e => scrollHandler(e.currentTarget), []);

  return (
    <Scroller onScroll={onScroll}>
      <Container height={itemHeight * collectionSize}>
        {itemsToRender.map((o, i) => {
          const top = (leadingIndex + i) * itemHeight;
          return (
            <Positioned key={o[keyProperty]} top={top}>
              {renderItem(o)}
            </Positioned>
          );
        })}
      </Container>
    </Scroller>
  );
};

VirtualizedCollection.defaultProps = {
  keyProperty: 'id',
  leadingBufferZone: 100,
  trailingBufferZone: 50,
  loadPage: null,
  throttle: 50,
};

export default VirtualizedCollection;
