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
        <%if (data.isChildModule){%>
        if (this.props.query.<%=data.parentModule%>Id) {
            data. <%= data.parentMapField %> = this.props.query. <%=data.parentModule%>Id;
        }
        <%}%>
        let that = this;
        model.add(data, function(response) {
            if (response && response.data) {
                console.log(data);
                router.push({pathname:'/<%=data.moduleName%>/list',query:{...that.props.query}});
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
                    let params = {...that.props.query,<%=data.moduleName%>Id:response.data.id,fromModule:'<%=data.moduleName%>'};
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
                let params = {...that.props.query,moduleName:"<%=data.moduleName%>",moduleId:response.data.id,associationName:associationModule,referModule:referm};
                router.push({pathname:'/<%=data.moduleName%>/association',query:params});
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
            <%
                var parentField = '';
                for (var field in data.moduleDefine) {
                    var referModule;
                    var fieldDisplayName = data.moduleDefine[field].dName;
                    var fieldShow = data.moduleDefine[field].show;
                    var fieldRefer = data.moduleDefine[field].refer;
                    var referMapfield = '';
                    if (fieldRefer){
                        referMapfield =fieldRefer.mapField;
                        referModule = fieldRefer.module;
                    }

                    if (fieldShow=="image"){%>
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
                <Form.Item label="<%=fieldDisplayName%>" >
                            {
                    getFieldDecorator("<%=field%>", {
                        initialValue: "-1",
                    })(
                        < XSelect  category="<%=referCategory%>" refer ="<%=referm%>" display= {(this.props.query.fromModule =='<%=referm%>') ? 'no':'yes' } />
                    )}
                < /Form.Item>
                    </Card>
                <%}else if(fieldShow=="list"){%>
                <Form.Item >
                    <XList  onEdit ={that.onSaveAndEdit.bind(that,'<%=fieldRefer.module%>')} refer ="<%=fieldRefer.module%>" mapField="<%=referMapfield%>" byId='-1'  title="<%=fieldDisplayName%>" />
                </Form.Item>
                <%}else if(fieldShow=="M2MList"){%>
                <Form.Item >
                    <XList  onEdit ={that.onAssociationEdit.bind(that,'<%=fieldRefer.associationTable%>','<%=referm%>')} refer ="<%=fieldRefer.associationTable%>" mapField="<%=data.moduleName%>Id" byId='-1'  title="<%=fieldDisplayName%>" />
                </Form.Item>
                <%}else if(fieldShow=="text"){%>
                <Card type="inner">
                <Form.Item label="<%=fieldDisplayName%>">
                    {getFieldDecorator("<%=field%>", { initialValue: ''})(<TextArea rows={5} />)}
                </Form.Item>
                </Card>
                <%}else if(fieldShow=="yes"){%>
                <Card type="inner">
                <FormItem label="<%=fieldDisplayName%>" >
                            {getFieldDecorator("<%=field%>", {
                                initialValue: '',
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

//export default()=>(<Layout> <MyForm/></Layout>)

