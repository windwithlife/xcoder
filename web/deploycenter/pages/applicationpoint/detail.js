import React from 'react';

import {
    Collapse,
    Button,
    Form,
    Card,

} from 'antd';
const { Panel } = Collapse;

import router from 'next/router';
import BasePage from '../common/pages/BasePage';
import GroupModel from './models/DelpoymentGroupModel';


export default class EditPage extends BasePage {
    formRef = React.createRef();
    state = {
        editMode: false,
        data: [],
    }
    constructor() {
        super();
        this.setDefaultModel(new GroupModel())
    }

    StoreData = () => {
        return this.state.data;
    }

    componentDidMount() {
        let that = this;
        let groupId = this.params().id;
        if (groupId) {
            this.Store().queryById(groupId).then(function (values) {
                console.log(values);
                that.setState({ data: values.data });
            });
        }

    }
    onEdit = () => {
        let groupId = this.params().id;
        router.push({ pathname: '/applicationpoint/edit', query: { id: groupId } });
    }
    render() {
        let that = this;
        let itemData = that.StoreData();
        return (
            < div >
                <Card size="small" title="基本信息" style={{ width: 800 }} extra={<a onClick={that.onEdit} >修改</a>}  >
                    <Form ref={this.formRef}>
                        < Form.Item name="name" label="名称：">
                            {itemData.name}
                        </Form.Item>
                        < Form.Item name="description" label="描述信息：">
                            {itemData.description}
                        </Form.Item>
                        <Form.Item name="topicName" label="可访问主题消息">
                            {itemData.topicName}
                        </Form.Item>
                        <Form.Item name="extraTopics" label="可访其它主题消息">
                            {itemData.extraTopics}
                        </Form.Item>
                        <Form.Item name="supportActions" label="支持功能">
                            {itemData.supportActions}
                        </Form.Item>
                        <Form.Item name="supportMesh" label="支持网格服务">
                            {itemData.supportMesh}
                        </Form.Item>
                        <Form.Item name="serverAddress" label="服务侦听地址">
                            {itemData.serverAddress}
                        </Form.Item>
                        <Form.Item name="serverPort" label="生产服务侦听端口">
                            {itemData.serverPort}
                        </Form.Item>



                    </Form>

                </Card>

            </div>
        );
    }
}

EditPage.getInitialProps = async function (context) {
    return { query: context.query };
}
