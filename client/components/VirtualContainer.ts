/**
 *
 */
import styled from 'styled-components';

interface Props {
  height: number;
}

const div = styled.div.attrs(({ height }: Props) => ({
  style: { height },
}));

const VirtualContainer = div<Props>`
  position: relative;
`;

export default VirtualContainer;
