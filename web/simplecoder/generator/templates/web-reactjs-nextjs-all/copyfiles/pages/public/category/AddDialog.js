

import { Form, Input, Button, Select } from 'antd';
import { inject, observer } from 'mobx-react';

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};



@inject('categoryStore') 
@observer 
export default class AddPage extends React.Component {
  formRef = React.createRef();

  Store=()=>{
    return this.props.categorysStore;
  }
  onFinish = values => {
    var that = this;
  
   ;
    this.Store().add(values,function(value) { 
      console.log('ok save!');
      that.props.onConfirm();
    });
    
  };

  componentDidMount() {
    
    console.log('DidMount');
  }


  render=()=>{
    
    return (
      
      <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(this)}>
        <Form.Item
          name="name"
          label="字典类型识别码："
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="text" />
        </Form.Item>
        
        <Form.Item
          name="description"
          label="说明"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
  

        <Form.Item {...tailLayout}>
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
