/**
 * Created by lianghaohui on 2018/7/11.
 */
import React, {PureComponent} from 'react';
import {
  Card,
  Button,
  Form,
  Icon,
  Col,
  Row,
  DatePicker,
  TimePicker,
  Input,
  Select,
  Popover,
} from 'antd';
import {connect} from 'dva';
import FooterToolbar from 'components/FooterToolbar';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import TableForm from '../Forms/TableForm';
import styles from './AddStore.less';

const fieldLabels = {
  name: '仓库名',
  url: '仓库域名',
  owner: '仓库管理员',
  approver: '审批人',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型',
};

class AddStore extends PureComponent {
  state = {
    width: '100%',
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'rule/query'
    });
    // window.addEventListener('resize', this.resizeFooterToolbar);
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  // resizeFooterToolbar = () => {
  //   const sider = document.querySelectorAll('.ant-layout-sider')[0];
  //   const width = `calc(100% - ${sider.style.width})`;
  //   const { width: stateWidth } = this.state;
  //   if (stateWidth !== width) {
  //     this.setState({ width });
  //   }
  // };

  render() {
    const {dispatch, form, data} = this.props;
    const {width: stateWidth} = this.state;
    const {getFieldDecorator, validateFieldsAndScroll, getFieldsError} = form;
    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          // submit the values
          dispatch({
            type: 'form/submitAdvancedForm',
            payload: values,
          });
        }
      });
    };

    const errors = getFieldsError();
    const getErrorInfo = () => {
      const errorCount = Object.keys(errors).filter(key => errors[key]).length;
      if (!errors || errorCount === 0) {
        return null;
      }
      const scrollToField = fieldKey => {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
        if (labelNode) {
          labelNode.scrollIntoView(true);
        }
      };
      const errorList = Object.keys(errors).map(key => {
        if (!errors[key]) {
          return null;
        }
        return (
          <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
            <Icon type="cross-circle-o" className={styles.errorIcon}/>
            <div className={styles.errorMessage}>{errors[key][0]}</div>
            <div className={styles.errorField}>{fieldLabels[key]}</div>
          </li>
        );
      });
      return (
        <span className={styles.errorIcon}>
          <Popover
            title="表单校验信息"
            content={errorList}
            overlayClassName={styles.errorPopover}
            trigger="click"
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Icon type="exclamation-circle"/>
          </Popover>
          {errorCount}
        </span>
      );
    };

    return (
      <PageHeaderLayout
        title="管理页面"
        content="新增或编辑修改店铺信息。"
        wrapperClassName={styles.advancedForm}
      >
        <Card title="店铺管理" bordered={false}>
          {getFieldDecorator('members', {
            initialValue: data.data.list,
          })(<TableForm dispatch={dispatch}/>)}
        </Card>
        {/*<FooterToolbar style={{width: stateWidth}}>*/}
        {/*{getErrorInfo()}*/}
        {/*<Button type="primary" onClick={test_func}>*/}
        {/*提交*/}
        {/*</Button>*/}
        {/*</FooterToolbar>*/}
      </PageHeaderLayout>
    );
  }
}

export default connect(({global, loading, rule}) => ({
  collapsed: global.collapsed,
  data: rule,
}))(Form.create()(AddStore));
