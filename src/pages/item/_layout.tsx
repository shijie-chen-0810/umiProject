import React, { FC } from 'react';

const _layout: FC = (props) => {
  return (
    <div>
      <div>这个是_layout页面</div>
      {props.children}
    </div>
  );
};

export default _layout;
