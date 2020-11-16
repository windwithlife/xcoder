

import { Form, Input, Button, Select } from 'antd';
import { inject, observer } from 'mobx-react';

import router from 'next/router';

const { Option } = Select;
import BasePage from '../common/pages/BasePage';
import ApplicationModel from './models/CategoryModel';

export default class EditPage extends BasePage {
    formRef = React.createRef();
    state = {
        dataObject: {},
    }
    constructor(props) {
        super(props);
        this.setDefaultModel(new ApplicationModel());
    }

    StoreData = () => {
        return this.state.dataObject;
    }

    componentDidMount() {
        let that = this;
        let id = this.params().id;
        this.Store().queryById(id, function (values) {
            let dataObject = values.data;
            console.log(dataObject);
            that.setState({ dataObject: dataObject });

        });
    }

    onEdit =()=>{
        const editUrl = "/dictionary/edit";
        const id = this.params().id;
        router.push({pathname:editUrl, query:{id: id}});
    }

  render() {
    var that = this;
    let itemData = this.StoreData()
    return (
      <Card size="small" title="项目信息" style={{ width: 500 }} extra={<a onClick={that.onEdit}>Edit</a>} >
                               
                           
      <Form ref={this.formRef} >
          < Form.Item name="name" label="字典类别名称">
              {itemData.name}
          </Form.Item>
          < Form.Item name="description" label="描述信息：">
              {itemData.description}
          </Form.Item>
          
          < Form.Item name="value" label="值">
              {itemData.value}
          </Form.Item>
          < Form.Item name="categoryId" label="所属分类">
              {itemData.categoryId}
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

