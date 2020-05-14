import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Card,Input,Button,Select} from 'antd';
import router from 'next/router';
import XSelect from '../common/components/select';
const { TextArea } = Input;

@inject('projectsStore') @inject('modulesStore')  @observer
export default  class AddPage extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {};
    }

    onFinish = values => {
        var that = this;
        this.props.projectsStore.add(values,()=>{console.log('finished add row'); router.back();});
    }
   
render(){
    var that = this;
   
    return (
            <Card>
            <Form  ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}>   
                <Form.Item name="name" label="名称"
                    rules={[{
                             required: true,},]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="描述">
                    <Input />
                </Form.Item>
                <Form.Item name="soaIp" label="服务地址">
                    <Input />
                </Form.Item>
                <Form.Item name="website" label="站点">
                    <Input />
                </Form.Item>
                <Form.Item name="status" label="状态">
                   < XSelect  category="data_status" refer =""  />
                </Form.Item>
        
                 <Card type="inner">
                 <FormItem className="form-item-clear" >
                    <Button type="primary" htmlType="submit" size="large">Save</Button>
                 </FormItem>
                 </Card>
            </Form>
        </Card>
    );
}
}
AddPage.getInitialProps = async function(context){
    return {query:context.query,path:context.pathname};
}

