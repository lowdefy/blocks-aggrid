import React from 'react';
import { blockDefaultProps } from '@lowdefy/block-tools';

const DisplayBlock = ({ blockId, properties, methods, events }) => (
  <div
    id={blockId}
    data-testid={blockId}
    onClick={() => methods.triggerEvent({ name: 'onClick' })}
    className={methods.makeCssClass([
      { outline: 'none', cursor: events.onClick && 'pointer' },
      properties.style,
    ])}
  >
    New Lowdefy display block {properties.title && `with title: ${properties.title}`}
  </div>
);

DisplayBlock.defaultProps = blockDefaultProps;

export default DisplayBlock;
