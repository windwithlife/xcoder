

import { Form, Input, Button, Select } from 'antd';
import BasePage from '../../common/pages/BasePage';
import DictionaryModel from './models/DictionaryModel'
import CategoryModel from '../category/models/CategoryModel'

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};



export default class AddPage extends BasePage {
  formRef = React.createRef();

  state={
    categorys:[],
    data:{}
  }
  constructor(){
    this.setDefaultModel(new DictionaryModel());
    this.categoryModel = new CategoryModel();
  }
  StoreData = () => {
    return this.state.data;
  }
  onFinish = values => {
    var that = this;
    this.Store().add(values, function (value) {
      console.log('ok save!');
      that.props.onConfirm();
    });

  };

  componentDidMount() {
    let that = this;
    this.categorysModel.queryAll(function (values) {
      that.setState({categorys:values.data.list});
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
        <Form.Item name="categoryId" label="所属分类">

          <Select >
            {that.state.categorys.map(function (item, i) {
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
