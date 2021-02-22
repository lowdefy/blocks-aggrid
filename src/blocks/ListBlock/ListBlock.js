import React, { useEffect } from 'react';
import { blockDefaultProps } from '@lowdefy/block-tools';

const ListBlock = ({ blockId, methods, properties, list }) => {
  useEffect(() => {
    methods.registerMethod('pushItem', methods.pushItem);
    methods.registerMethod('unshiftItem', methods.unshiftItem);
    methods.registerMethod('removeItem', methods.removeItem);
    methods.registerMethod('moveItemDown', methods.moveItemDown);
    methods.registerMethod('moveItemUp', methods.moveItemUp);
  }, []);
  return (
    <div id={blockId} data-testid={blockId} style={{ border: '1px solid blue' }}>
      <button data-testid={`${blockId}-pushItem`} onClick={methods.pushItem}>
        pushItem
      </button>
      {list.map((item, index) => (
        <div key={index}>
          <h4>
            {properties.itemTitle || 'Item Title'} {index}
            <div>
              <button
                data-testid={`${blockId}-removeItem-${index}`}
                onClick={() => methods.removeItem(index)}
              >
                removeItem
              </button>{' '}
              <button
                data-testid={`${blockId}-moveItemUp-${index}`}
                onClick={() => methods.moveItemUp(index)}
              >
                moveItemUp
              </button>{' '}
              <button
                data-testid={`${blockId}-moveItemDown-${index}`}
                onClick={() => methods.moveItemDown(index)}
              >
                moveItemDown
              </button>
            </div>
          </h4>
          <div>{item.content()}</div>
        </div>
      ))}
      <button data-testid={`${blockId}-unshiftItem`} onClick={methods.unshiftItem}>
        unshiftItem
      </button>
    </div>
  );
};

ListBlock.defaultProps = blockDefaultProps;

export default ListBlock;
