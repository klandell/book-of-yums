/**
 *
 */
import styled from 'styled-components';

interface Props {
  top: number;
}

const div = styled.div.attrs(({ top }: Props) => ({
  style: { top },
}));

const VirtualizedItem = div<Props>`
  position: absolute;
  left: 0;
  right: 0;
`;

export default VirtualizedItem;
