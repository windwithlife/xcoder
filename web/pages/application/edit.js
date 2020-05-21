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
import XSelect from '../common/components/select';
import EditTable from '../common/components/EditableTable';


@inject('modulesStore') @inject('pagesStore') @inject('applicationsStore') @inject('applicationTypesStore')
@observer
export default class EditPage extends React.Component {
    formRef = React.createRef();

    constructor() {
        super();
    }

    Store = () => {
        return this.props.applicationsStore;
    }
    startHeader() {
        var that = this;

        var fieldColumns = [];

        fieldColumns.push({
            title: "名称",
            dataIndex: 'name',
            key: 'name'
        });

        fieldColumns.push({
            title: "说明",
            dataIndex: 'description',
            key: 'description'
        });
        return fieldColumns;
    }




    componentDidMount() {
        let that = this;
        let id = this.props.query.id;
        this.props.applicationTypesStore.queryAll();
        this.Store().queryById(id, function (values) {
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
        this.Store().update(values, () => { console.log('finished update row'); router.back(); });
    }
    handleLineUpdate(type, index, record) {
        let that = this;
        let path = '/' + type + '/edit';
        router.push({ pathname: path, query: { id: record.id, moduleId: this.props.query.moduleId } });

    }
    handleLineDetail(type, record) {
        let path = '/' + type + '/detail';
        console.log(path);
        router.push({ pathname: path, query: { id: record.id } });
    }
    handleLineAdd(type) {
        let moduleId = this.props.query.moduleId;
        let path = '/' + type + '/add';
        router.push({ pathname: path, query: { moduleId: moduleId } });

    }

    handleLineDelete(type, index, record) {
        if ('xpage' == type) {
            //console.log('inde')
            this.props.pagesStore.removeById(index, record.id, function (value) {
                that.props.modulesStore.queryById(moduleId);
            });
        }

    }


    render() {
        let that = this;
        let itemData = that.Store().dataObject.currentItem;
        let isShowPage = itemData.sideType == 'server' ? false : true;
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
                            <Form.Item
                                name="moduleId"
                                noStyle='true'
                            ></Form.Item>
                            <Form.Item name="name" label="名称(请用英文)"
                                rules={[{
                                    required: true,
                                },]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="moduleName" label="关联模块"
                            >
                                {itemData.moduleName}
                            </Form.Item>

                          
                    <Form.Item name="applicationTypeId" label="应用类型" >
                        <Select >
                            {that.props.applicationTypesStore.dataObject.list.map(function (item, i) {
                                return (<Select.Option value={item.id}>{item.name}</Select.Option>);
                            })}
                        </Select>
                    </Form.Item>
                            <Form.Item name="path" label="服务，站点类应用访问PATH">
                                <Input />
                            </Form.Item>
                            <Form.Item name="description" label="描述">
                                <Input />
                            </Form.Item>

                            <Form.Item >
                                <Button type="primary" htmlType="submit" size="large">保存修改基本信息</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
                {isShowPage ? <EditTable title="页面：" columns={that.startHeader()} data={itemData.pages}
                    onAdd={that.handleLineAdd.bind(that, 'xpage')}
                    onDelete={that.handleLineDelete.bind(that, 'xpage')}
                    onUpdate={that.handleLineUpdate.bind(that, 'xpage')}
                    onDetail={that.handleLineDetail.bind(that, 'xpage')}
                ></EditTable> : <div></div>}
              
            </div >
        );
    }
}

EditPage.getInitialProps = async function (context) {
    return { query: context.query};
}