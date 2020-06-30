import { combineReducers } from 'redux';

// 初始化全局状态
let initState = {
  count: 1,
  user: null,
  client: {}, //绑定的客户
  locale: 'en',
};

// Reducers:
// 测试 reducer
const count = (count = initState.count, action) => {
  switch (action.type) {
    case 'INCREASE':
      return count + 1;
    case 'DECREASE':
      return count - 1;
    default:
      return count;
  }
};

// 改变国际化
const locale = (locale = initState.locale, action) => {
  switch (action.type) {
    case 'CHANGE_LOCALE':
      return locale === 'en' ? 'zh' : 'en';
    default:
      return locale;
  }
};

// 设置 user
const user = (user = initState.user, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user;
    default:
      return user;
  }
};

// 合并分支 reducer
const reducers = combineReducers({
  count,
  locale,
  user,
});

export default reducers;
