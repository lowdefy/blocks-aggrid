import React from 'react';
import { blockDefaultProps } from '@lowdefy/block-tools';

const InputBlock = ({ blockId, properties, methods, value }) => (
  <label>
    {properties.label || 'Label'}:
    <input
      data-testid={`${blockId}-input`}
      id={blockId}
      onChange={(e) => methods.setValue(e.target.value)}
      value={value || ''}
    />
  </label>
);

InputBlock.defaultProps = blockDefaultProps;

export default InputBlock;
