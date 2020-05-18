import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';
import XSelect from '../common/components/select';
const { TextArea } = Input;
const FormItem = Form.Item;


@inject('pagesStore') @inject('templatesStore') @inject('applicationsStore') @inject('widgetsStore') 
@observer
export default class TableAdd extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        let that = this;
        let applicationId = this.props.query.applicationId;
        this.state = {choosedTemplates:[]};
        this.moduleFitTemplates = [];
        props.applicationsStore.queryById(applicationId,function(app){
            console.log(module);
            props.templatesStore.queryAll(function(values){
                values.forEach(function(template){
                    console.log("template data");
                    console.log(template);
                    if ((template.sideType == app.sideType) && (template.language==app.language)){
                        that.moduleFitTemplates.push(template);
                    }
                });
                that.setState({choosedTemplates:that.moduleFitTemplates}); 
            });
        })
       
    }
    Store = () => {
        return this.props.pagesStore;
    }
    componentDidMount() {
        this.props.widgetsStore.queryAll();
    }
    onFinish = values => {
        var that = this;
        let applicationId = this.props.query.applicationId;
        values.applicationId = applicationId;
        console.log(values);
        this.Store().add(values, () => { console.log('finished add interface row'); router.back(); });
    }

    onChangeCategory=(value)=>{
        let that = this;
        let category = value;
        console.log('category:' + value);
        let results =[];
        this.moduleFitTemplates.forEach(function(template){
            if(template.category == value){
                results.push(template);
            }
        }); 
        that.setState({choosedTemplates:results}); 
       
      }
    onChangeTemplate=(value)=>{
        let that = this;
        let index = value;
        console.log('index' + value);
        let templateDefineText = this.props.templatesStore.dataObject.list[index].defineText;
        console.log(templateDefineText);
        this.formRef.current.setFieldsValue({defineText:templateDefineText});
       
      }
    render() {
        var that = this;

        return (
            <Card>
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}>
                    <Form.Item name="name" label="名称(必须用英文）"
                        rules={[{
                            required: true,
                        },]}>
                        <Input />
                    </Form.Item>
                    
                    <Form.Item name="pageCategory" label="页面所属类型" >
                    <XSelect category="pageCategory" onChange={that.onChangeCategory}>
                       
                    </XSelect>
                    </Form.Item>
                    <Form.Item name="pageTemplate" label="选择喜欢的页面布局模板" >
                    <Select onChange={that.onChangeTemplate}>
                        {that.state.choosedTemplates.map(function (item, i) {
                            return (<Select.Option value={i}>{item.name}</Select.Option>);
                        })}
                    </Select>
                    </Form.Item>

                    <Form.Item name="sectionA" label="选择片段组件 A片段" >
                    <Select onChange={that.onChangeTemplate}>
                        {that.props.widgetsStore.dataObject.list.map(function (item, i) {
                            return (<Select.Option value={i}>{item.name}</Select.Option>);
                        })}
                    </Select>
                    </Form.Item>
                    <Form.Item name="sectionB" label="选择片段组件 B片段" >
                    <Select onChange={that.onChangeTemplate}>
                        {that.props.widgetsStore.dataObject.list.map(function (item, i) {
                            return (<Select.Option value={i}>{item.name}</Select.Option>);
                        })}
                    </Select>
                    </Form.Item>
                    <Form.Item name="sectionC" label="选择片段组件 C片段" >
                    <Select onChange={that.onChangeTemplate}>
                        {that.props.widgetsStore.dataObject.list.map(function (item, i) {
                            return (<Select.Option value={i}>{item.name}</Select.Option>);
                        })}
                    </Select>
                    </Form.Item>
                    <Form.Item name="defineText" label="页面布局模板">
                        <TextArea rows={10} />
                    </Form.Item>
                    <Form.Item name="description" label="描述">
                        <Input />
                    </Form.Item>

                    <Card type="inner">
                        <FormItem className="form-item-clear" >
                            <Button type="primary" htmlType="submit" size="large">保存</Button>
                            <Button type="primary" size="large">取消</Button>
                            <Button type="primary"  size="large">继续进行页面详细配置</Button>
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

