import React from 'react';
import { blockDefaultProps } from '@lowdefy/block-tools';

const ContainerBlock = ({ blockId, content, events, methods, properties }) => (
  <div
    id={blockId}
    data-testid={blockId}
    onClick={() => methods.triggerEvent({ name: 'onClick' })}
    className={methods.makeCssClass([
      { outline: 'none', cursor: events.onClick && 'pointer' },
      properties.style,
    ])}
  >
    {properties.title && <h3>{properties.title}</h3>}
    {properties.content || (content.content && content.content())}
  </div>
);

ContainerBlock.defaultProps = blockDefaultProps;

export default ContainerBlock;
