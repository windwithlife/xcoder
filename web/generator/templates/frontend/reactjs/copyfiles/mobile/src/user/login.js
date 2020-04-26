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
       return  { withoutBackBtn: true,
            title:"登录页"};
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
    header="登录入口"
    >

        <form onSubmit={this.submitHandler}  method="post" action="/login">
            <Card>
        <Field
            name ="username"
            labelBefore={<Icon name="person" />}
            placeholder="用户名称."
            value="admin"
            />
            
        <Field
            name ="password"

            labelBefore={<Icon name="search" />}
            placeholder="密码."
            value="123456"
            />
                <input type="hidden" name="roleType" value={this.state.roleType} />

            </Card>

        <Field
            value="登录"
            type="submit"
            amStyle="secondary"
            block

            />

        </form>
        <Button amStyle="primary" block onClick={()=>this.props.history.pushState(null,'/client/user/register')}>注册新用户</Button>
    </Group>



            </Container>
        );
    }
});

var MyForm = React.createClass({
    getInitialState:function(){
        return {
            username:'admin',
            roleType:'2',
            password:'123456'
        };
    },
    handleChange:function(event){
        var newState={};
        newState[event.target.name]=event.target.value;
        this.setState(newState);
    },
    submitHandler:function (e) {
        //e.preventDefault();
        console.log(this.state);
    },
    render:function () {
        return <form onSubmit={this.submitHandler}  method="post" action="/login">
            <label htmlFor="username">请输入用户名:</label>
            <input type="text" name="username" onChange={this.handleChange} value={this.state.username} id="username"/>
            <input type="text" name="password" onChange={this.handleChange} value={this.state.password} id="password"/>
            <br/>
            <select name="roleType" onChange={this.handleChange} value={this.state.gender}>
                <option value="1">老师</option>
                <option value="2">学生</option>
            </select>
            <br/>

            <button type="submit">登录</button>
        </form>
    }
});

export default AddForm;
