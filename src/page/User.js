import React from 'react';
import style from './style1.scss';
const User = () => {
  console.log('style',style);
  return (
    <div className={style.container}>
      User
      <i className="iconfont icontubiaobeifen5" />
    </div>
  );
};

export default User;