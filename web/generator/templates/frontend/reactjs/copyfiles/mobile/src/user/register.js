/**
 * Created by zhangyq on 2016/9/15.
 */

import React from 'react';
import {
    Container,
    Grid,
    Col,
    Group,
    Icon,
    List,
    Field,
    Button,
    Switch,
    Card
} from 'amazeui-touch';
import Select from '../common/components/form/select.js';





const AddForm = React.createClass({
    getDefaultProps:function(){
        return  { withoutBackBtn: false,
            title:"注册页"};
    },
    getInitialState:function(){
        return {
            username:'admin',
            roleType:'1',
            password:'123456'
        };
    },
    handleChange:function(event){
        if (event.target.name == 'teacher'){
            var checked = this.refs.teacher.getChecked();
            if (checked){
                this.setState({roleType:2});
            }else{
                this.setState({roleType:1});
            }
            console.log("teacher checked");
        }else{
            var newState={};
            newState[event.target.name]=event.target.value;
            this.setState(newState);
        }

    },

    submitHandler(e) {
        //e.preventDefault();
        //this.props.history.pushState(null,'/client/user/login');
        //console.log(this.refs.select.getValue());

        console.log(this.state);
    },

    render() {
        return (
            <Container {...this.props} scrollable >
    <Group
    header=""
    >

        <form onSubmit={this.submitHandler}  method="post" action="/user/register">
            <Card>
        <Field
            name ="username"
            label="用户名："
            labelBefore={<Icon name="person" />}
            placeholder="用户名称."
            value="admin"
            />
            
        <Field
            name ="password"
            label="密 码："
            labelBefore={<Icon name="search" />}
            placeholder="密码."
            value="123456"
            />
                <input type="hidden" name="roleType" value={this.state.roleType} />

            </Card>
            <Card>
            <List.Item
                nested="radio"
                >
            <Field
                label="老师"
                type="radio"
                name="teacher"
                ref="teacher"
                onChange={this.handleChange}
                >
            </Field>
                </List.Item>
            <List.Item
                nested="radio"
                >
            <Field
                label="学生"
                type="radio"
                defaultChecked="true"
                name="teacher"
                onChange={this.handleChange}
                >
            </Field>
                </List.Item>
                </Card>
        <Field
            value="注册"
            type="submit"
            amStyle="secondary"
            block

            />

        </form>
    </Group>



            </Container>
        );
    }
});



export default AddForm;
