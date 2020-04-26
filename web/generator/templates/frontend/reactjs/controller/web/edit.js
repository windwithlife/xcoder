import React from 'react';

import router from 'next/router';
import Layout from '../common/pages/layout';
import { Form, Input,Button} from 'antd';
import {Card} from 'antd';
import FileUpload from '../common/components/form/upload';
import XSelect from '../common/components/form/select';
import XList from '../common/components/form/referlist';
import model from './models/model.js';
//import '../common/styles/App.less';

const { TextArea } = Input;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};



class EditForm extends React.Component {

    state={
        items:{id:-1},
    }
    componentWillMount(){
        // this.setState({item:this.props.location.state.item});
        var that = this;
        console.log("edit id:=" + this.props.query.<%=data.moduleName%>id);
        model.queryById(this.props.query.<%=data.moduleName%>Id,function(response) {
            if (response && response.data) {
                console.log(response.data);
                that.setState({items:response.data});
            }
        })
    }

    handleSaveAndEdit(childModuleName,data) {

        let that = this;
        let params = {...that.props.query,fromModule:'<%=data.moduleName%>'};
        router.push({pathname:'/'+ childModuleName+ '/list',query:params});
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
    onAssociationEdit(aName,referm,e){
        e.preventDefault();
        var that = this;
        var mId = this.props.query.<%=data.moduleName%>Id;
        let params = {...that.props.query,moduleName:"<%=data.moduleName%>",moduleId:mId,associationName:aName,referModule:referm};
        router.push({pathname:'/<%=data.moduleName%>/association',query:params});
    }
    handleSubmitUpdate(data) {
        let that = this;
        model.update(data, function(response) {
            if (response && response.data) {
                console.log(data);
                let params = {...that.props.query};
                router.push({pathname:'/<%=data.moduleName%>/list',query:params});
            }
        })

    }
    
    handleSubmit(e) {
        e.preventDefault();
        var that = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const data = {...values, id:this.state.items.id};
                console.log('Received values of form: ', values);
                that.handleSubmitUpdate(data);
            }
        });
    }
   


render()
{
    var that = this;
    var listItems = this.state.items;
    console.log(listItems);
   // let selectIndex = listItems.sex? listItems.sex:-1;

    const { getFieldDecorator } = this.props.form;
    console.log("modal interal" + JSON.stringify(listItems));
    
    return (
            <Card>
            <Form  onSubmit={this.handleSubmit.bind(this)}>
               <%
                for (var field in data.moduleDefine){
                    var referModule;
                    var fieldDisplayName = data.moduleDefine[field].dName;
                    var fieldShow = data.moduleDefine[field].show;
                    var fieldRefer =  data.moduleDefine[field].refer;
                    if (fieldRefer){
                        referMapfield =fieldRefer.mapField;
                        referModule = fieldRefer.module;
                    }

                    if (fieldShow=="image"){
                %>
                    <Card type="inner">
                <FormItem
                    label="<%=fieldDisplayName%>"
                    hasFeedback
                    {...formItemLayout}
                    >
                    {getFieldDecorator("<%=field%>", {
                        initialValue: 'empty',
                    })(
                        <FileUpload />
                    )}
                </FormItem>
                </Card>

                <%}else if ((fieldShow=="select")&&(fieldRefer)){
                    var referCategory;var referm;
                    if (fieldRefer.module == "dictionary"){
                        referCategory = fieldRefer.category;
                        referm ="";
                    }else{
                        referCategory="";
                        referm = fieldRefer.module;
                    }

                %>
                    <Card type="inner">
                <Form.Item label="<%=fieldDisplayName%>"
                            hasFeedback {...formItemLayout}> {
                    getFieldDecorator("<%=field%>", {
                        initialValue: listItems.<%=field%>,
                    })(
                        < XSelect  category="<%=referCategory%>" refer ="<%=referm%>" display= {this.props.query.fromModule =='<%=referm%>' ? 'no':'yes'} />
                    )}
                    < /Form.Item>
                        </Card>
                        <%}else if(fieldShow=="list"){%>

                    <Form.Item >
                        <XList  onEdit ={that.onSaveAndEdit.bind(that,"<%=fieldRefer.module%>")} refer ="<%=fieldRefer.module%>" mapField="<%=referMapfield%>" byId={that.props.query.<%=data.moduleName%>Id}  title="<%=fieldDisplayName%>" />
                        </Form.Item>
                <%}else if(fieldShow=="M2MList"){%>
                    <Form.Item >
                        <XList  onEdit ={that.onAssociationEdit.bind(that,'<%=fieldRefer.associationTable%>','<%=referModule%>')} refer ="<%=fieldRefer.associationTable%>" mapField="<%=data.moduleName%>Id" byId={that.props.query.<%=data.moduleName%>Id}  title="<%=fieldDisplayName%>" />
                    </Form.Item>

                <%}else if(fieldShow=="text"){%>
                    <Card type="inner">
                        <Form.Item label="<%=fieldDisplayName%>">
                            {getFieldDecorator("<%=field%>", { initialValue: listItems.<%=field%>})(<TextArea rows={5} />)}
                        </Form.Item>
                    </Card>
                <%}else if(fieldShow=="yes"){%>
                        <Card type="inner">
                        <FormItem label="<%=fieldDisplayName%>" >
                            {getFieldDecorator("<%=field%>", {
                                initialValue: listItems.<%=field%>
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                        </Card>
                <%}}%>
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
        return (<MyForm query={this.props.query}/>)
}
}
Page.getInitialProps = async function(context){
    return {query:context.query,path:context.pathname};
}

