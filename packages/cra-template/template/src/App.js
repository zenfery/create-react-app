import React from 'react';
import { connect } from 'react-redux';
import logo from './assets/logo-white.png';
import './App.less';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from 'react-router-dom';
import { Button, Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  DashboardOutlined,
  CopyrightOutlined,
  BulbOutlined,
} from '@ant-design/icons';

import Dashboard from './views/dashboard/Dashboard.js';

// i18n
import { IntlProvider } from 'react-intl';
import { zh_CN, en_US } from './locales/locale';

// Store
const mapStateToProps = state => {
  return {
    locale: state.locale,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeLocale: () => {
      dispatch({ type: 'CHANGE_LOCALE' });
    },
  };
};

class App extends React.Component {
  state = {
    collapsed: false, // 切换菜单收起
    titleShow: true, // 显示title
  };

  // 切换菜单收起
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
    let _this = this;
    // 解决收起时，标题Logo动画效果不流畅的问题
    if (_this.state.collapsed) {
      setTimeout(() => {
        _this.setState({ titleShow: !_this.state.collapsed });
      }, 100);
    } else {
      _this.setState({ titleShow: _this.state.collapsed });
    }
  };

  render() {
    let { locale } = this.props;
    let messages = zh_CN;
    if (locale === 'en') {
      messages = en_US;
      document.title = 'ChinaCache Safe Service';
    } else {
      messages = zh_CN;
      document.title = 'ChinaCache 安全服务';
    }

    const { Header, Footer, Sider, Content } = Layout;

    return (
      <IntlProvider locale={locale} messages={messages}>
        <div className="App">
          <Router>
            <Layout>
              <Sider
                style={{ overflow: 'auto', position: 'relative' }}
                width={256}
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
              >
                <div className="logo" id="logo">
                  <Link to="/dashboard">
                    <img src={logo} />
                    {this.state.titleShow ? <h1>安全服务</h1> : ''}
                  </Link>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                  <Menu.Item key="1" icon={<DashboardOutlined />}>
                    <Link to="/dashboard">Dashboard</Link>
                  </Menu.Item>
                  <Menu.Item key="2" icon={<BulbOutlined />}>
                    <Link to="/about">About</Link>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout>
                <Header className="header" style={{ padding: 0 }}>
                  {React.createElement(
                    this.state.collapsed
                      ? MenuUnfoldOutlined
                      : MenuFoldOutlined,
                    {
                      className: 'trigger',
                      onClick: this.toggle,
                    }
                  )}
                  <Button onClick={this.props.changeLocale}>切换语言</Button>
                </Header>
                <Content
                  className="content"
                  style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 680,
                  }}
                >
                  <Switch>
                    <Route path="/dashboard">
                      <Dashboard />
                    </Route>
                    <Route path="/about">
                      <About />
                    </Route>
                    <Route path="/">
                      <Dashboard />
                    </Route>
                  </Switch>
                </Content>

                <Footer>
                  Copyright <CopyrightOutlined /> 2020
                  北京蓝汛通信技术有限责任公司
                </Footer>
              </Layout>
            </Layout>
          </Router>
        </div>
      </IntlProvider>
    );
  }
}

function About() {
  return <h2>About</h2>;
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
