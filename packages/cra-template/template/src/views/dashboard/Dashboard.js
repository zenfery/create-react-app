import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import './Dashboard.less';
import { FormattedMessage } from 'react-intl';
import { request, get } from '../../common/Request';

const mapStateToProps = state => {
  return {
    count: state.count,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    increase: () => {
      dispatch({ type: 'INCREASE' });
    },
    decrease: () => {
      dispatch({ type: 'DECREASE' });
    },
  };
};

class Dashboard extends React.Component {
  static i18n = {
    zh_CN: {
      'dashboard.hello': '你好！',
    },
    en_US: {
      'dashboard.hello': 'Hello!',
    },
  };

  render() {
    let btnStyle = {
      maxHeight: '10px',
      color: 'red',
    };
    get('www.baidu.com').then(body => {
      console.log(body);
    });

    return (
      <div className="Dashboard">
        <div>{this.props.count}</div>
        <Button onClick={this.props.increase} style={btnStyle}>
          increase
        </Button>
        <Button onClick={this.props.decrease}>decrease</Button>
        <div>
          国际化：
          <FormattedMessage tagName="span" id="dashboard.hello" />
        </div>
      </div>
    );
  }
}

const DashboardStore = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardStore;
