import React from 'react';
//import model from './models/model.js';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import XSelect from '../common/components/select';

import {
    Modal,
    Form,
    Input,
    Card,
    Select,
} from 'antd';
const { TextArea } = Input;
import router from 'next/router';
import { inject, observer } from 'mobx-react';
//import AddorEditPage from './AddorEditColumn';

const rowSelection = {
};
@inject('modulesStore') @inject('projectsStore')
@observer
export default class EditPage extends React.Component {
    formRef = React.createRef();
    state = {
        visible: false,
        operationTitle: "新增",
        operationType: "add"
    }
    Store = () => {
        return this.props.projectsStore;
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
                <span >
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
        let id = this.props.query.id;
        console.log("edit id:=" + id);

        this.props.modulesStore.queryByProjectId(id);

        this.Store().queryById(id, function (values) {
            that.formRef.current.setFieldsValue(values);
        });
    }

    pagination() {
        return {
            //total: this.props.tablesStore.dataLength,
            showSizeChanger: true
        }
    }

    handleLineDetail(record) {
        //router.push({ pathname: '/xtable/detail', query: { ...that.props.query, pxtableId: record.id } });
    }
    handleLineAdd() {
        let id = this.props.query.id;
        router.push({ pathname: '/xmodule/list', query: { projectId: id } });

    }
    onFinish = values => {
        var that = this;
        console.log(values);
        this.props.projectsStore.update(values, () => { console.log('finished add row'); router.back(); });
    }
    handleLineDelete(index, record) {
        console.log(record.id);
        this.props.tablesStore.removeById(record.id, index);
    }

    handleSearchChange(e) {
        this.setState({ searchText: e.target.value, name: e.target.value });
    }
    handleSearch(e) {
        e.preventDefault();
        //let keywork = this.state.searchText
        //this.props.tablesStore.fetchByNameLike(param.keyword);

    }
    render() {
        let that = this;
        let itemData = that.props.projectsStore.dataObject.currentItem;
        return (
            < div >
                <div>
                    <Card size="small" title="项目信息" style={{ width: 600 }}  >
                        <Form ref={this.formRef} onFinish={this.onFinish.bind(that)}>
                            <Card size="small" title="项目基本信息" style={{ width: 500 }} >
                                <Form.Item name="id" noStyle='true'></Form.Item>
                                < Form.Item name="name" label="项目名称：">
                                    <Input />
                                </Form.Item>
                                < Form.Item name="description" label="描述信息：">
                                    <Input />
                                </Form.Item>
                                < Form.Item name="status" label="状态">
                                    < XSelect category="data_status" refer="" />
                                </Form.Item>
                            </Card>
                            <Form.Item className="form-item-clear" >
                                <Button type="primary" htmlType="submit" size="large">保存信息</Button>
                            </Form.Item>
                        </Form>
                    </Card>



                </div>

                {/* < Table rowSelection={
                    rowSelection
                }
                    columns={
                        this.columns
                    }
                    dataSource={
                        //that.props.tablesStore.items.slice()
                        that.props.modulesStore.dataObject.list.slice()
                    }
                    pagination={
                        this.pagination()
                    }
                    bordered title={() => ("项目中所有模块")}
                    footer={
                        () => (<Button type="primary" onClick={this.handleLineAdd.bind(this)} > 编辑模块表... </Button>)
                    }
                /> */}

            </div>
        );
    }
}

EditPage.getInitialProps = async function (context) {
    return { query: context.query, path: context.pathname };
}
