import Dashboard from '../views/dashboard/Dashboard';

const comps = [Dashboard];

const zh_CN = {
  hello: '你好',
};

const en_US = {
  hello: 'Hello',
};

// 合并处理
comps.map(comp => {
  let i18n = comp.i18n;
  if (i18n) {
    Object.assign(en_US, i18n['en_US']);
    Object.assign(zh_CN, i18n['zh_CN']);
  }
  return comp;
});

export default zh_CN;
export { zh_CN, en_US };
