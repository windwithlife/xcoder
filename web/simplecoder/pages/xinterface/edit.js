import React from 'react';
//import model from './models/model.js';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import {
    Collapse,
    Modal,
    Form,
    Input,
    Card,
    Select,
} from 'antd';
const { TextArea } = Input;
const { Panel } = Collapse;
import { SettingOutlined } from '@ant-design/icons';
import router from 'next/router';
import { inject, observer } from 'mobx-react';
//import AddorEditPage from './AddColumnDialog';

@inject('interfacesStore') @inject('tablesStore')
@observer
export default class ListPage extends React.Component {
    formRef = React.createRef();
    
    constructor(props) {
        super(props);
    }
    Store=()=>{
        return this.props.interfacesStore;
    }
   
    
    onFinish = values => {
        var that = this;
        //let moduleId = this.props.query.moduleId;
        //values.module = moduleId;
        this.Store().add(values, () => { console.log('finished add row'); router.back(); });
    }
    componentDidMount() {
       let that = this;
        console.log('DidMount');
        let id = this.props.query.id;
        let moduleId = this.props.query.moduleId;
        this.props.tablesStore.queryByModuleId(moduleId);
        this.Store().queryById(id,function(values){
            that.formRef.current.setFieldsValue(values);
        });
    }

  
    handleLineUpdate(index, record) {
        console.log("colId" + record.id);
        router.push({pathname:'/xtable/edit_column',query:{columnId:record.id}});
       
    }
    
    handleLineDelete(index, record) {
        console.log(record.id);
        this.Store().removeById(record.id, index);
    }

    onChangeTable=(value)=>{
        let that = this;
        console.log('Index:'+ value);
        let item = this.props.tablesStore.dataObject.list[value];
        let domainName = item.name;
        let domainId = item.id;
       console.log(item);
        
        this.formRef.current.setFieldsValue({domainId:domainId,domain:domainName});
       
      }
    render() {
        let that = this;
        let itemData = this.Store().dataObject.currentItem;
        return (
            
                <Card size="small" title="表基本信息" style={{ width: 500 }}  >
                    <Form ref={this.formRef} onFinish={that.onFinish.bind(that)}>
                        <Form.Item
                            name="id"
                            noStyle='true'
                        ></Form.Item>
                        
                        <Form.Item
                            name="moduleId"
                            noStyle='true'
                        ></Form.Item>
                          <Form.Item
                            name="domainId"
                            noStyle='true'
                        ></Form.Item>
                        <Form.Item name="name" label="名称(必须用英文）"
                        rules={[{
                            required: true,
                        },]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="requestMethod" label="请求方法">
                    <Select>
                        <Select.Option value="post">Post</Select.Option>
                        <Select.Option value="get">Get</Select.Option>
                    </Select>
                    </Form.Item>
                    
                  
                    <Form.Item name="domain" label="选择接口所属的域(按数据表定义识别)" >
                    <Select onChange={this.onChangeTable}>
                        {that.props.tablesStore.dataObject.list.map(function (item, i) {
                            return (<Select.Option value={i}>{item.name}</Select.Option>);
                        })}
                    </Select>
                    </Form.Item>
                    
                    <Form.Item name="inputParams" label="入口参数对象定义">
                        <TextArea rows={5} />
                    </Form.Item>
                    <Form.Item name="outputParams" label="出口参数对象定义">
                        <TextArea rows={5} />
                    </Form.Item>

                    <Form.Item name="customSql" label="自定义查询语句">
                        <TextArea rows={5} />
                    </Form.Item>
                    <Form.Item name="description" label="描述">
                        <Input />
                    </Form.Item>

                        <Form.Item >
                                <Button type="primary" htmlType="submit" size="large">保存修改基本信息</Button>
                            </Form.Item>
                    </Form>
                    </Card>
              
                
        );
    }
}

ListPage.getInitialProps = async function (context) {
    return { query: context.query };
}
