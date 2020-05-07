import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';
import XSelect from '../common/components/form/select';
const { TextArea } = Input;
//const FormItem = Form.Item;


@inject('releasesStore') @inject('modulesStore')
@observer
export default class AddPage extends React.Component {
    formRef = React.createRef();

    Store = () => {
        return this.props.releasesStore;
    }
    StoreData = () => {
        return this.props.releasesStore.dataObject;
    }
    constructor(props) {
        super(props);
        this.state = {};
        this.hasModuleInfo = false;
    }
    componentDidMount() {
        let that = this;
        console.log('DidMount');
        let projectId = this.props.query.projectId;
        let moduleId = this.props.query.moduleId;
        if (moduleId){
            this.hasModuleInfo = true;
            this.props.modulesStore.queryById(moduleId,function(values){
                that.formRef.current.setFieldsValue({ moduleId: moduleId, name: values.name,selectModule:values.name,path:"/"+values.name });
            });
        }else{
            this.props.modulesStore.queryByProjectId(projectId);
        }
       
        
    }

    onFinish = values => {
        var that = this;
        let projectId = this.props.query.projectId;
        values.projectId = projectId;
        console.log(values);
        this.Store().add(values, () => { console.log('finished add row'); router.back(); });
    }
    onChangeModule = (value) => {
        let that = this;
        console.log('Index:' + value);
        let item = this.props.modulesStore.dataObject.list[value];
        //let domainName = item.name;
        let moduleId = item.id;
        let moduleName = item.name;

       console.log(moduleName);
        this.formRef.current.setFieldsValue({ moduleId: moduleId, name: moduleName,path:"/"+moduleName });

    }
    render() {
        var that = this;

        return (
            <Card>
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}>
                    <Form.Item name="name" label="名称"
                        rules={[{
                            required: true,
                        },]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="moduleId"
                        noStyle='true'
                    ></Form.Item>
                    < Form.Item name="selectModule" label="关联模块">
                       <Select onChange={that.onChangeModule}>
                            {that.props.modulesStore.dataObject.list.map(function (item, i) {
                                return (<Select.Option value={i}>{item.name}</Select.Option>);
                            })}
                        </Select>
                    </Form.Item>
                    < Form.Item name="sideType" label="项目类型：">
                        < XSelect category="sideType" />
                    </Form.Item>
                    < Form.Item name="language" label="编程语言选择：">
                        < XSelect category="language" />
                    </Form.Item>
                    < Form.Item name="framework" label="技术框架：">
                        < XSelect category="framework" />
                    </Form.Item>
                    < Form.Item name="platform" label="目标操作系统">
                        < XSelect category="os" />
                    </Form.Item>
                    
                    <Form.Item name="path" label="服务，站点类应用访问PATH">
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="描述">
                        <Input />
                    </Form.Item>
                    <Card type="inner">
                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="large">Save</Button>
                        </Form.Item>
                    </Card>
                </Form>
            </Card>
        );
    }
}
AddPage.getInitialProps = async function (context) {
    return { query: context.query, path: context.pathname };
}

