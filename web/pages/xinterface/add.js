import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';
import XSelect from '../common/components/form/select';
const { TextArea } = Input;
const FormItem = Form.Item;


@inject('interfacesStore') @inject('tablesStore') @inject('modulesStore')
@observer
export default class TableAdd extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {};
        //props.tablesStore.queryByModuleId(props.query.moduleId);
        props.modulesStore.queryById(props.query.moduleId);
    }
    Store = () => {
        return this.props.interfacesStore;
    }
    onFinish = values => {
        var that = this;
        let moduleId = this.props.query.moduleId;
        values.moduleId = moduleId;
        console.log(values);
        this.Store().add(values, () => { console.log('finished add interface row'); router.back(); });
    }

    // onChangeTable=(value)=>{
    //     let that = this;
    //     console.log('Index:'+ value);
    //     let item = this.props.tablesStore.dataObject.list[value];
    //     let domainName = item.name;
    //     let domainId = item.id;
        
        
    //     this.formRef.current.setFieldsValue({domainId:domainId,domain:domainName});
       
    //   }
    render() {
        var that = this;

        return (
            <Card>
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}>
                    <Form.Item
                            name="moduleId"
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
                    <Form.Item
                            name="domainId"
                            noStyle='true'
                        ></Form.Item>
                    
                    {/* <Form.Item name="domain" label="选择接口所属的域(按数据表定义识别)" >
                    <Select onChange={that.onChangeTable}>
                        {that.props.tablesStore.dataObject.list.map(function (item, i) {
                            return (<Select.Option value={i}>{item.name}</Select.Option>);
                        })}
                    </Select>
                    </Form.Item> */}
                    
                    <Form.Item name="inputParams" label="入口参数对象定义">
                        <TextArea rows={5} />
                    </Form.Item>
                    <Form.Item name="outputParams" label="出口参数对象定义">
                        <TextArea rows={5} />
                    </Form.Item>

                    {/* <Form.Item name="customSql" label="自定义查询语句">
                        <TextArea rows={5} />
                    </Form.Item> */}
                    <Form.Item name="description" label="描述">
                        <Input />
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
TableAdd.getInitialProps = async function (context) {
    return { query: context.query };
}

