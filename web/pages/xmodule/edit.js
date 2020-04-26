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


const rowSelection = {
};
@inject('modulesStore') @inject('tablesStore')
@observer
export default class EditPage extends React.Component {
    formRef = React.createRef();
    state = {
        visible: false,
        operationTitle: "新增",
        operationType: "add"
    }
    constructor() {
        super();
        //var that = this;
        this.startHeader();

    }
    startHeader() {
        var that = this;

        var fieldColumns = [];

        fieldColumns.push({
            title: "表的名称",
            dataIndex: 'name',
            key: 'name'
        });

        fieldColumns.push({
            title: "说明",
            dataIndex: 'description',
            key: 'description'
        });
        fieldColumns.push({
            title: "当前状态",
            dataIndex: 'status',
            key: 'status'
        });


        this.columns = [...fieldColumns, {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <span  >

                    <span className="ant-divider" />
                    <Popconfirm title="Sure to delete?" onConfirm={that.handleLineDelete.bind(that, index, record)} >
                        < a href="#" > Delete </a>
                    </Popconfirm>
                    <span className="ant-divider" />
                    <a href="#" onClick={that.handleLineUpdate.bind(that, index, record)} > Edit </a>
                    <span className="ant-divider" />
                    <a href="#" onClick={that.handleLineDetail.bind(that, record)} > Detail </a>
                </span>
            )
        }];


    }

    onFooterBack() {
        router.back();
    }
    componentDidMount() {
        let that = this;
        console.log('DidMount');
        let id = this.props.query.moduleId;
        console.log("edit id:=" + id);
        this.props.tablesStore.queryByModuleId(id);
        this.props.modulesStore.queryById(id, function (values) {
            console.log(values);
            that.formRef.current.setFieldsValue(values);
        });
    }

    pagination() {
        return {
            //total: this.props.tablesStore.dataLength,
            showSizeChanger: true
        }
    }
    onFinish = values => {
        var that = this;
        let projectId = this.props.query.projectId;
        values.project = projectId;
        this.props.modulesStore.add(values, () => { console.log('finished add row'); router.back(); });
    }
    handleLineDetail(record) {
        //router.push({ pathname: '/xtable/detail', query: { ...that.props.query, pxtableId: record.id } });
    }
    handleLineUpdate(index, record) {
        let that = this;
        router.push({ pathname: '/xtable/edit', query: { tableId: record.id } });

    }
    handleLineDetail(record) {
        router.push({ pathname: '/xtable/detail', query: { tableId: record.id } });
    }
    handleLineAdd() {
        let moduleId = this.props.query.moduleId;
        router.push({ pathname: '/xtable/add', query: { moduleId: moduleId } });

    }

    handleLineDelete(index, record) {
        console.log(record.id);
        this.props.tablesStore.removeById(record.id, index);
    }


    render() {
        let that = this;
        let itemData = that.props.modulesStore.dataObject.currentItem;
        console.log('render module edit page');
        return (
            < div >
                <div>
                    <Card size="small" title="模块基本信息" style={{ width: 500 }}  >

                        <Form ref={this.formRef} onFinish={that.onFinish.bind(that)}>
                            <Form.Item
                                name="id"
                                noStyle='true'
                            ></Form.Item>
                           <Form.Item
                                name="projectId"
                                noStyle='true'
                            ></Form.Item>
                            < Form.Item name="name" label="模块名称：">
                                <Input />

                            </Form.Item>
                            < Form.Item name="description" label="描述信息：">
                                <Input />
                            </Form.Item>
                            < Form.Item name="status" label="状态">
                                <Input />
                            </Form.Item>
                            < Form.Item name="project" label="所属项目为：">
                                {itemData.project}
                            </Form.Item>
                            <Form.Item >
                                <Button type="primary" htmlType="submit" size="large">保存修改基本信息</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
                <Collapse >
                    <Panel header="此模块中的所有表" key="1" extra={<SettingOutlined ></SettingOutlined>}>
                        < Form.Item  >
                            <Button type="primary" onClick={this.handleLineAdd.bind(this)} > 添加 </Button>
                        </Form.Item>
                        < Table rowSelection={
                            rowSelection
                        }
                            columns={
                                this.columns
                            }
                            dataSource={
                                //that.props.tablesStore.items.slice()
                                that.props.tablesStore.dataObject.list.slice()
                            }
                            pagination={
                                this.pagination()
                            }


                        />
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

EditPage.getInitialProps = async function (context) {
    return { query: context.query, path: context.pathname };
}
