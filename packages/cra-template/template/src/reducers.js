import { combineReducers } from 'redux';

// 初始化全局状态
let initState = {
  count: 1,
  user: {},
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

// 合并分支 reducer
const reducers = combineReducers({
  count,
  locale,
});

export default reducers;
