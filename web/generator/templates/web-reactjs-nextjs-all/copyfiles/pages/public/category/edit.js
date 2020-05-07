

import { Form, Input, Button, Select } from 'antd';
import { inject, observer } from 'mobx-react';
import router from 'next/router';

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
export default class EditPage extends React.Component {
  formRef = React.createRef();
  Store=()=>{
    return this.props.categorysStore;
  }
  constructor(props){
      super();
      //console.log("edit id:=" + props.query.id);
     
  }
  onFinish = values => {
    var that = this;
  
    console.log(values);
    this.Store().update(values,function(value) { 
      console.log('ok save!');
      router.back();
    });
    
  };

  componentDidMount() {
    let that = this;
    this.Store().queryById(this.props.query.id,function(values){
      that.formRef.current.setFieldsValue(values);
    });
}

  render() {
    var that = this;
    console.log("render,render");
    console.log(this.Store().dataObject.currentItem.name);
    return ( 
      <Form {...layout} ref={this.formRef}  name="control-ref" onFinish={this.onFinish.bind(that)}>
        <Form.Item
          name="id"
          noStyle='true'
        >
         
        </Form.Item>
        <Form.Item
          name="name"
          label="字典类别识别码"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input  />
        </Form.Item>
        
        <Form.Item
          name= 'description'
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
         
        </Form.Item>
      </Form>
    
    );
  }
}


EditPage.getInitialProps = async function (context) {
  return { query: context.query};
}

