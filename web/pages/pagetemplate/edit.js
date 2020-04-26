import React from 'react';
//import model from './models/model.js';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import {
    Collapse,
    Modal,
    Form,
    Input,
    Card,
    Select,
} from 'antd';
const { TextArea } = Input;
const { Panel } = Collapse;
import { SettingOutlined } from '@ant-design/icons';
import router from 'next/router';
import { inject, observer } from 'mobx-react';
//import AddorEditPage from './AddColumnDialog';

@inject('templatesStore')
@observer
export default class EditPage extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
    }
    Store = () => {
        return this.props.templatesStore;
    }


    onFinish = values => {
        var that = this;
        //let moduleId = this.props.query.moduleId;
        //values.module = moduleId;
        this.Store().update(values, () => { console.log('finished add row'); router.back(); });
    }
    componentDidMount() {

        console.log('DidMount');
        let id = this.props.query.id;
        this.Store().queryById(id);
    }





    render() {
        let that = this;
        let itemData = this.Store().dataObject.currentItem;
        return (

            <Card size="small" title="表基本信息" style={{ width: 500 }}  >
                <Form ref={this.formRef} onFinish={that.onFinish.bind(that)}>
                    <Form.Item
                        name="id"
                        noStyle='true'
                    ></Form.Item>

                    <Form.Item name="name" label="名称(必须用英文）"
                        rules={[{
                            required: true,
                        },]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="description" label="描述">
                        <Input />
                    </Form.Item>
                    <Form.Item name="sideType" label="端点" >
                        < XSelect category="sideType" />
                    </Form.Item>
                    <Form.Item name="category" label="页面功能分类" >
                        <XSelect category="pageCategory" />

                    </Form.Item>
                    < Form.Item name="language" label="编程语言选择：">
                        < XSelect category="language" />
                    </Form.Item>
                    < Form.Item name="framework" label="技术框架：">
                        < XSelect category="framework" />
                    </Form.Item>
                    < Form.Item name="tag" label="页面标签：">
                        <Input />
                    </Form.Item>
                    <Form.Item name="defineText" label="页面定义">
                        <TextArea rows={10} />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit" size="large">保存</Button>
                    </Form.Item>
                </Form>
            </Card>


        );
    }
}

ListPage.getInitialProps = async function (context) {
    return { query: context.query };
}
