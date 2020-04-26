import React from 'react';
import { browserHistory } from 'react-router';
import { List, InputItem,Button,Picker,TextareaItem,Modal,Card,WingBlank,WhiteSpace,Switch} from 'antd-mobile';
import { createForm } from 'rc-form';
import ImagePickerFile from '../common/components/form/imagefile';
import Select from '../common/components/form/select';
import model from './models/model.js';



class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        //this.state.item = this.props.location.state.item;

    }
   
    
    handleSubmitUpdate(data) {
        data.id = 0;
        model.add(data, function(response) {
            if (response && response.data) {
                console.log(data);
                browserHistory.push('/<%=data.endName%>/<%=data.moduleName%>/');
            }
        })

    }
    handleSubmit(e) {
        e.preventDefault();
        
        var that = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const data = {...values};
                console.log('Received values of form: ', values);
                that.handleSubmitUpdate(data);
            }
        });
    }
   

checkNumber(rule, value, callback)
{
    if (!value) {
        callback(new Error('年龄未填写'));
    }
    if (!/^[\d]{1,2}$/.test(value)) {
        callback(new Error('年龄不合法'));
    } else {
        callback();
    }
}


render()
{


    const { getFieldProps } = this.props.form;
    
    
    return (
        
            <List>
                <%
                for (var field in data.moduleDefine){
                    var fieldDisplayName = data.moduleDefine[field].dName;
                    var fieldShow = data.moduleDefine[field].show;
                    var fieldRefer =  data.moduleDefine[field].refer;

                    if (fieldShow=="image"){
                %>
                 <ImagePickerFile
                                    {...getFieldProps("<%=field%>", {
                                        initialValue: ''
                                    })}
                                    title="<%=fieldDisplayName%>"
                                    ><%=fieldDisplayName%></ImagePickerFile>


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

                   <Select {...getFieldProps("<%=field%>", {
                                        initialValue: {id:"-1"}
                                    })}
                                    placeholder="<%=fieldDisplayName%>"
                                    ><%=fieldDisplayName%>
                                    </Select>
                <%}else if(fieldShow=="list"){%>
                    <Form.Item >
                        <XList  refer ="<%=fieldRefer.module%>" module="book" byId='-1'  title="书目" />
                            </Form.Item>


                <%}else if(fieldShow=="yes"){%>


                                <InputItem
                                    {...getFieldProps("<%=field%>", {
                                        initialValue: 'test'
                                    })}
                                    placeholder="<%=fieldDisplayName%>"
                                    ><%=fieldDisplayName%></InputItem>
                <%}}%>

                
                <Button className="btn" type="primary" onClick={this.handleSubmit.bind(this)}>确认</Button>

            </List>
        
    );
}
}

export default createForm()(EditForm);
