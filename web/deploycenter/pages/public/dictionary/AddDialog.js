

import { Form, Input, Button, Select } from 'antd';
import { inject, observer } from 'mobx-react';
import XSelect from '../../common/components/select';

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};


@inject('dictionarysStore') @inject('categorysStore')
@observer
export default class AddPage extends React.Component {
  formRef = React.createRef();

  Store = () => {
    return this.props.dictionarysStore;
  }
  onFinish = values => {
    var that = this;

    ;
    this.Store().add(values, function (value) {
      console.log('ok save!');
      that.props.onConfirm();
    });

  };

  componentDidMount() {
    let that = this;
    this.props.categorysStore.queryAll(function(values){
      that.setState();
    });
    console.log('DidMount');
  }


  render = () => {
    let that = this;

    return (

      <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(this)}>
        <Form.Item
          name="name"
          label="字典项显示名称"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item
          name="value"
          label="字典项真实存贮值"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="category" label="所属分类">

          <Select >
            {that.props.categorysStore.dataObject.list.map(function (item, i) {
              return (<Select.Option value={item.id}>{item.description}</Select.Option>);
            })}
          </Select>
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={this.props.onConfirm}>
            Cancel
          </Button>
        </Form.Item>
      </Form>

    );
  }
}