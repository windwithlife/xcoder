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

const FormItem = Form.Item;

class EditForm extends React.Component {

    state={
        items:{id:-1},
    }
    componentWillMount(){

        var that = this;
        console.log("edit id:=" + this.props.query.id);
        model.queryById(this.props.query.<%=data.moduleName%>Id,function(response) {
            if (response && response.data) {
                console.log(response.data);
                that.setState({items:response.data});
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        router.back();
    }

render()
{
    var that = this;
    var listItems = this.state.items;
    console.log(listItems);
    const { getFieldDecorator } = this.props.form;
    console.log("detail render data:" + JSON.stringify(listItems));
    
    return (
            <Card >
            <Form  onSubmit={this.handleSubmit.bind(this)}>
               <%
                for (var field in data.moduleDefine){
                    var fieldDisplayName = data.moduleDefine[field].dName;
                    var fieldShow = data.moduleDefine[field].show;
                    var fieldRefer =  data.moduleDefine[field].refer;
                    if (fieldRefer){
                        referMapfield =fieldRefer.mapField;
                    }

                    if (fieldShow=="image"){
                %>
                <Card type="inner">
                <FormItem label="<%=fieldDisplayName%>" >
                            <image src= "{listItems.<%=field%>} />
                </FormItem>
                </Card>

                <%}else if(fieldShow=="list"){%>

                    <Form.Item >
                        <XList  onEdit ={null} refer ="<%=fieldRefer.module%>" mapField="<%=referMapfield%>" byId={that.props.query.<%=data.moduleName%>Id}  title="<%=fieldDisplayName%>" />
                        </Form.Item>

                <%}else if((fieldShow=="yes")||(fieldShow=='select')||(fieldShow=='text')){%>
                        <Card type="inner">
                        <FormItem
                            label="<%=fieldDisplayName%>"
                            >
                            {listItems.<%=field%>}
                        </FormItem>
                        </Card>
                <%}}%>
                 <Card type="inner">
                 <FormItem className="form-item-clear" >
                    <Button type="primary" htmlType="submit" size="large">Back</Button>
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

