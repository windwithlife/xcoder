import React from 'react';
import { Form, Input,Button,Select} from 'antd';
import {Card} from 'antd';
import model from './models/model.js';
import FileUpload from '../common/components/form/upload';
import XSelect from '../common/components/form/select';
import XList from '../common/components/form/referlist';
import router from 'next/router';
import Layout from '../common/pages/layout';

const { TextArea } = Input;
const FormItem = Form.Item;



class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        //this.state.item = this.props.location.state.item;

    }


    handleSubmitUpdate(data) {
        
        let that = this;
        model.add(data, function(response) {
            if (response && response.data) {
                console.log(data);
                router.push({pathname:'/project/list',query:{...that.props.query}});
            }
        })

    }
    handleSubmit(e) {
        e.preventDefault();

        var that = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const data = {...values};
                console.log('Received values of form: ', values);
                that.handleSubmitUpdate(data);
            }
        });
    }
    handleSaveAndEdit(childModuleName,data) {
        let that = this;
        model.add(data, function(response) {
                if (response && response.data) {
                    console.log(response.data);
                    let params = {...that.props.query,projectId:response.data.id,fromModule:'project'};
                    router.push({pathname:'/'+ childModuleName+ '/list',query:params});
                }
        });
    }

    onSaveAndEdit(childModuleName,e){
        e.preventDefault();
        var that = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const data = {...values};
                console.log('Received values of form: ', values);
                that.handleSaveAndEdit(childModuleName,data);
            }
        });
    }

    onAssociationEdit(aName,referModule,e){
        e.preventDefault();
        var that = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const data = {...values};
                console.log('Received values of form: ', values);
                that.handleAssociationEdit(aName,referModule,data);
            }
        });


    }

    handleAssociationEdit(associationModule,referm,data) {
        let that = this;
        model.add(data, function(response) {
            if (response && response.data) {
                console.log(response.data);
                let params = {...that.props.query,moduleName:"project",moduleId:response.data.id,associationName:associationModule,referModule:referm};
                router.push({pathname:'/project/association',query:params});
            }
        });
    }

render()
{

    var that = this;
    const { getFieldDecorator } = this.props.form;


    return (
            <Card>
            <Form  onSubmit={this.handleSubmit.bind(this)}>
            
                <Card type="inner">
                <FormItem label="名称" >
                            {getFieldDecorator("name", {
                                initialValue: '',
                            })(
                                <Input type="text" />
                            )}
                </FormItem>
                </Card>
                
                <Card type="inner">
                <FormItem label="说明" >
                            {getFieldDecorator("description", {
                                initialValue: '',
                            })(
                                <Input type="text" />
                            )}
                </FormItem>
                </Card>
                
                <Form.Item >
                    <XList  onEdit ={that.onSaveAndEdit.bind(that,'pxchannel')} refer ="pxchannel" mapField="myproject" byId='-1'  title="模块" />
                </Form.Item>
                
                <Card type="inner">
                <FormItem label="站点" >
                            {getFieldDecorator("website", {
                                initialValue: '',
                            })(
                                <Input type="text" />
                            )}
                </FormItem>
                </Card>
                
                <Card type="inner">
                <FormItem label="SOA地址" >
                            {getFieldDecorator("soaIp", {
                                initialValue: '',
                            })(
                                <Input type="text" />
                            )}
                </FormItem>
                </Card>
                

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

const MyForm = Form.create()(EditForm);


export default class Page extends React.Component{

    render(){
        return (<Layout path={this.props.path}><MyForm query={this.props.query}/></Layout>)
    }
}
Page.getInitialProps = async function(context){
    return {query:context.query,path:context.pathname};
}

//export default()=>(<Layout> <MyForm/></Layout>)

