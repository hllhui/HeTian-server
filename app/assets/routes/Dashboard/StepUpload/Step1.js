import React, {Fragment} from 'react';
import {connect} from 'dva';
import {Form, Input, Button, Select, DatePicker, Upload, Icon, message} from 'antd';
import {routerRedux} from 'dva/router';
import styles from './style.less';
import moment from 'moment';

const RangePicker = DatePicker.RangePicker;
const {Option} = Select;
const dateFormat = 'YYYY/MM/DD';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};


@Form.create()
class Step1 extends React.PureComponent {
  render() {
    const {form, dispatch, data} = this.props;
    const {getFieldDecorator, validateFields} = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!data.address) {
          message.error('请填上传视频。');
          return;
        }
        values.address = data.address;
        values.start = moment(values.time[0]).format("YYYY-MM-DD");
        values.end = moment(values.time[1]).format("YYYY-MM-DD");
        if (!err) {
          dispatch({
            type: 'upload/create',
            payload: values,
          });
          dispatch(routerRedux.push('/Dashboard/upload/result'));
        }
      });
    };
    const rangeConfig = {
      rules: [{
        type: 'array',
        required: true,
        message: '请选择播放时间',
      }],
    };

    const props = {
      name: 'file',
      action: 'http://127.0.0.1:7001/ht/upload',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          dispatch({
            type: 'upload/saveStepFormData',
            payload: {address: 'http://localhost:7001/public/video/' + info.file.name},
          });
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="视频名称">
            {getFieldDecorator('name', {
              initialValue: data.name,
              rules: [{required: true, message: '请填写视频名称'}],
            })(
              <Input style={{width: 'calc(100% - 100px)'}} placeholder="XXXX"/>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="视频播放时间">
            {getFieldDecorator('time', {
              rangeConfig
            })(
              <RangePicker style={{width: 'calc(100% - 100px)'}}/>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="上传广告视频">
            <Upload {...props}>
              <Button>
                <Icon type="upload"/> upload
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: {span: 24, offset: 0},
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default connect(({upload}) => ({
  data: upload.step,
}))(Step1);
