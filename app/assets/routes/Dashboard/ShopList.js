import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './ShopList.less';

const FormItem = Form.Item;
const {Option} = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({rule, loading}) => ({
  data: rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class ShopList extends PureComponent {
  state = {
    expandForm: false,
    formValues: {},
  };

  componentDidMount() {
    const date = new Date();
    const seperator1 = "-";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9)
      month = "0" + month;
    if (strDate >= 0 && strDate <= 9)
      strDate = "0" + strDate;

    const today = date.getFullYear() + seperator1 + month + seperator1 + strDate;

    const {dispatch} = this.props;
    dispatch({
      type: 'rule/queryShop',
      payload: {data: today},
    });
  }

  handleFormReset = () => {
    const {form, dispatch} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const {expandForm} = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const {dispatch, form} = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        // updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });
      if (!values.name)
        delete values.name;
      values.data = moment(values.data).format("YYYY-MM-DD")

      dispatch({
        type: 'rule/queryShop',
        payload: values,
      });
    });
  };


  renderSimpleForm() {
    const {form} = this.props;
    const {getFieldDecorator} = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="店铺名称">
              {getFieldDecorator('name')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{marginLeft: 8}} onClick={this.toggleForm}>
                展开 <Icon type="down"/>
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {form} = this.props;
    const {getFieldDecorator} = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="店铺名称">
              {getFieldDecorator('name')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="日期">
              {getFieldDecorator('data')(
                <DatePicker style={{width: '100%'}} placeholder="请输入更新日期"/>
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{overflow: 'hidden'}}>
          <span style={{float: 'right', marginBottom: 24}}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{marginLeft: 8}} onClick={this.toggleForm}>
              收起 <Icon type="up"/>
            </a>
          </span>
        </div>
      </Form>
    );
  }

  renderForm() {
    const {expandForm} = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      data,
      loading,
    } = this.props;

    const columns = [
      {
        title: '店铺名称',
        dataIndex: 'name',
      },
      {
        title: '日期',
        dataIndex: 'data',
      },
      {
        title: '工作时间',
        dataIndex: 'time',
        children: [{
          title: '上午',
          dataIndex: 'morning',
          children: [
            {
              title: '开始',
              dataIndex: 'morning_open',
              key: 'morning_open',
              width: 100,
            }, {
              title: '结束',
              dataIndex: 'morning_close',
              key: 'morning_close',
              width: 100,
            }
          ]
        }, {
          title: '下午',
          dataIndex: 'afternoon',
          children: [
            {
              title: '开始',
              dataIndex: 'afternoon_open',
              key: 'afternoon_open',
              width: 100,
            }, {
              title: '结束',
              dataIndex: 'afternoon_close',
              key: 'afternoon_close',
              width: 100,
            }
          ]
        },]
      }
    ];

    return (
      <PageHeaderLayout title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
              data={{list: data.data.dailyList}}
              loading={loading}
              columns={columns}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
