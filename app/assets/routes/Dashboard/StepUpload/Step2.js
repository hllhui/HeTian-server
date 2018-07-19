import React, {Fragment} from 'react';
import {connect} from 'dva';
import {Button, Row, Col} from 'antd';
import {routerRedux} from 'dva/router';
import Result from 'components/Result';
import styles from './style.less';
import ReactPlayer from 'react-player'
import moment from 'moment';

class Step3 extends React.PureComponent {
  render() {
    const {dispatch, data} = this.props;
    const onFinish = () => {
      dispatch(routerRedux.push('/Dashboard/upload'));
    };
    const toList = () => {
      dispatch(routerRedux.push('/Dashboard/video-list'));
    };
    const information = (
      <div className={styles.information}>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            视频名称：
          </Col>
          <Col xs={24} sm={16}>
            {data.name}
          </Col>
        </Row>
        <Row>
          <ReactPlayer
            width='100%'
            height='100%'
            controls={true}
            url={data.address} playing
          />
        </Row>
      </div>
    );
    const actions = (
      <Fragment>
        <Button type="primary" onClick={onFinish}>
          继续上传
        </Button>
        <Button onClick={toList}>视频列表</Button>
      </Fragment>
    );
    return (
      <Result
        type="success"
        title="操作成功"
        description="视频会自动上传至各台显示器"
        extra={information}
        actions={actions}
        className={styles.result}
      />
    );
  }
}

export default connect(({upload}) => ({
  data: upload.step,
}))(Step3);
