import React, { useCallback } from 'react';
import ScrollHelper from './ScrollHelper';

/*
  interface Props {
    // collection
  }
*/

const VirtualizedCollection = props => {
  const {
    collection,
    itemHeight,
    renderItem,
    leadingBufferZone,
    trailingBufferZone,
  } = props;

  const renderBody = useCallback(({ scrollTop }) => {
    const visibleIndex = Math.floor(scrollTop / itemHeight);

    const leadingIdx = Math.max(0, visibleIndex - leadingBufferZone);
    const trailingIdx = Math.min(
      visibleIndex + trailingBufferZone,
      collection.length,
    );

    const itemsToRender = collection.slice(leadingIdx, trailingIdx);
    return itemsToRender.map((o, i) => (
      <div
        key={o.key}
        style={{
          position: 'absolute',
          width: '100%',
          height: itemHeight,
          top: (leadingIdx + i) * itemHeight,
        }}
      >
        {renderItem(o)}
      </div>
    ));
  }, []);

  return <ScrollHelper throttle={100} renderBody={renderBody} />;
};

VirtualizedCollection.defaultProps = {
  leadingBufferZone: 200,
  trailingBufferZone: 50,
};

export default VirtualizedCollection;
