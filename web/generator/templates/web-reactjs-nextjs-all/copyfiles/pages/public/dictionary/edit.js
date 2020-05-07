

import { Form, Input, Button, Select } from 'antd';
import { inject, observer } from 'mobx-react';
import { Router } from 'next/router';
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
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};



@inject('dictionaryStore') 
@observer 
export default class EditPage extends React.Component {
  formRef = React.createRef();
  Store=()=>{
    return this.props.dictionarysStore;
  }
  onFinish = values => {
    var that = this;
  
   ;
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
    let itemData = this.Store().dataObject.currentItem;
    
  
    return (

      
      
      <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}>
        <Form.Item
          name="id"
          noStyle='true'
        ></Form.Item>
        <Form.Item
          name="name"
          label="项名称"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="value"
          label="项名称对应存贮值"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="category" label="所属分类">
        < XSelect  category="" refer ="category" display='yes' />
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

