/**
 * ScrollHelper sets up an onScroll handler for a Scroller component
 * and passes the current and previous scroll positions to its children
 * via the renderBody function. Calls to renderBody can be throttled
 * by setting the throttle prop with a call delay in milliseconds.
 */
import React, { useState, useCallback } from 'react';
import { throttler } from '../lib';
import Scroller from './Scroller';

interface ScrollPos {
  scrollLeft: number;
  scrollTop: number;
  prevScrollLeft: number;
  prevScrollTop: number;
}

interface RenderBody {
  (scrollPos: ScrollPos): React.ReactNode;
}

interface Props {
  renderBody: RenderBody;
  throttle?: number;
}

const ScrollHelper: React.FC<Props> = (props: Props) => {
  const { renderBody, throttle } = props;

  const [scrollPos, setScrollPos] = useState({
    scrollLeft: 0,
    scrollTop: 0,
    prevScrollLeft: 0,
    prevScrollTop: 0,
  });

  const scrollHandler = scroller => {
    const { scrollLeft, scrollTop } = scroller;
    setScrollPos({
      scrollLeft,
      scrollTop,
      prevScrollLeft: scrollPos.scrollLeft,
      prevScrollTop: scrollPos.scrollTop,
    });
  };

  const onScroll = throttle
    ? useCallback(throttler(scrollHandler, throttle), [])
    : scrollHandler;

  return (
    <Scroller onScroll={e => onScroll(e.currentTarget)}>
      {renderBody(scrollPos)}
    </Scroller>
  );
};

ScrollHelper.defaultProps = {
  throttle: 0,
};

export default ScrollHelper;
