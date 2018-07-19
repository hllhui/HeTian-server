import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Card, Popconfirm, Icon, List, Modal, Input, DatePicker, Row, Col} from 'antd';
import ReactPlayer from 'react-player'
import Ellipsis from 'components/Ellipsis';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './VideoList.less';

const RangePicker = DatePicker.RangePicker;


@connect(({upload, loading}) => ({
  fileList: upload.fileList,
  visible: upload.visible,
  loading: loading.models.upload,
}))
export default class VideoList extends PureComponent {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'upload/show',
    });
  }

  render() {
    const {
      fileList,
      loading,
      visible,
      dispatch,
    } = this.props;
    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          操作提示：点击修改或删除相应视频
        </p>
      </div>
    );

    const handleOk = (e) => {
      dispatch({
        type: 'upload/saveState',
        payload: {key: 'visible', val: false},

      });
    };

    const handleCancel = (e) => {
      dispatch({
        type: 'upload/saveState',
        payload: {key: 'visible', val: false},

      });
    };

    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="这是一个标题"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );

    const deleteVideo = (id, data) => {
      const newData = data.filter(item => item.id !== id);

      dispatch({
        type: 'upload/del',
        payload: {id, newData}
      });
    };

    return (
      <PageHeaderLayout title="视频列表" content={content} extraContent={extraContent}>
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}}
            dataSource={[...fileList]}
            renderItem={item =>
              <List.Item key={item.id}>
                <Card
                  hoverable
                  className={styles.card}
                  actions={[
                    <Popconfirm title="是否要删除此行？" onConfirm={() => deleteVideo(item.id, fileList)}>
                      <a>删除</a>
                    </Popconfirm>]}
                  cover={
                    <ReactPlayer
                      width='100%'
                      height='100%'
                      controls={true}
                      url={item.address} playing
                    />
                  }
                >
                  <Card.Meta
                    title={<a href="#">{item.name}</a>}
                    description={'时间: ' + item.start + ' ~ ' + item.end}
                  />
                </Card>
              </List.Item>
            }
          />
        </div>
      </PageHeaderLayout>
    );
  }
}
