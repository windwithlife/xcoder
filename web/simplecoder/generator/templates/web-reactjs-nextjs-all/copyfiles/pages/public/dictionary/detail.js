

import { Form, Input, Button, Select } from 'antd';
import { inject, observer } from 'mobx-react';
//import { Router } from 'next/router';
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




@inject('dictionaryStore') 
@observer 
export default class EditPage extends React.Component {
  formRef = React.createRef();

  Store=()=>{
    return this.props.dictionarysStore;
  }
  onFinish = values => {
   router.back();
    
  };

  componentDidMount() {
   
    this.Store().queryById(this.props.query.id);
   
}

  render() {
    var that = this;
    let itemData = this.Store().dataObject.currentItem;
    return (
      <Card size="small" title="项目信息" style={{ width: 500 }} extra={<a href={editUrl}>Edit</a>} >
                               
                           
      <Form ref={this.formRef} >
          < Form.Item name="name" label="字典类别名称">
              {itemData.name}
          </Form.Item>
          < Form.Item name="description" label="描述信息：">
              {itemData.description}
          </Form.Item>
          
          < Form.Item name="status" label="状态">
              {itemData.status}
          </Form.Item>
          <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
         
        </Form.Item>
      

      </Form>
      </Card>
  
    
    );
  }
}


EditPage.getInitialProps = async function (context) {
  return { query: context.query};
}

