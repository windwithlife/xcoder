import React from 'react';
import model from './models/model.js.js';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import {
    Modal,
    Form,
    Card,
    Select,
    Input
} from 'antd';

import router from 'next/router';
import { inject, observer } from 'mobx-react';
import AddorEditPage from './AddorEditColumn';

const rowSelection = {
};
@inject('columnsStore') @inject('tablesStore')
@observer
export default class ListPage extends React.Component {
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
            title: "表列的名称",
            dataIndex: 'name',
            key: 'name'
        });
        fieldColumns.push({
            title: "类型",
            dataIndex: 'fieldType',
            key: 'fieldType'
        });
        fieldColumns.push({
            title: "外联类型",
            dataIndex: 'referModule',
            key: 'referModule'
        });
        fieldColumns.push({
            title: "关联字段",
            dataIndex: 'mapField',
            key: 'mapField'
        });
        fieldColumns.push({
            title: "说明",
            dataIndex: 'description',
            key: 'description'
        });



        this.columns = [...fieldColumns, {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <span >

                    <Popconfirm title="Sure to delete?" onConfirm={that.handleLineDelete.bind(that, index, record)} >
                        <a href="#" > Delete </a>
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
        //this.props.tablesStore.fetchAll();
        console.log('DidMount');
        let tableId = this.props.query.tableId;
        console.log("edit id:=" + tableId);
        this.props.columnsStore.initializeByTableId(9999);
        this.props.tablesStore.queryById(tableId);
    }

    pagination() {
        return {
            total: this.props.tablesStore.dataLength,
            showSizeChanger: true
        }
    }
    handleLineUpdate(index, record) {

        //router.push({ pathname: '/zxtable/edit', query: { ...that.props.query, pxtableId: record.id } });
        this.setState({
            visible: true,
            operationTitle: "修改",
            operationType: "edit"
        });
    }
    handleLineDetail(record) {
        //router.push({ pathname: '/zxtable/detail', query: { ...that.props.query, pxtableId: record.id } });
    }
    handleLineAdd() {
        this.setState({ visible: true });
    }
    onModalConfirm() {
        //router.push({pathname:'/zxtable/add',query:{...that.props.query}});
        this.setState({ visible: false });
    }
    handleLineDelete(index, record) {
        console.log(record.id);
        this.props.columnsStore.removeById(record.id, index);
    }

    handleSearchChange(e) {
        this.setState({ searchText: e.target.value, name: e.target.value });
    }
    handleSearch(e) {
        e.preventDefault();
        let keywork = this.state.searchText
        this.props.tablesStore.fetchByNameLike(param.keyword);

    }
    render() {
        let that = this;
        let itemData = that.props.tablesStore.dataObject.currentItem;
        return (
            < div >
                <Modal visible={that.state.visible} title={that.state.operationTitle}
                    onCancel={this.onModalConfirm.bind(that)}
                    footer={[]}>
                    <AddorEditPage operationType={this.state.operationType} onConfirm={this.onModalConfirm.bind(that)}></AddorEditPage>
                </Modal>

                <div>
                    <Form  >
                        < Form.Item name="name" label="表名：">
                            {itemData.name}
                        </Form.Item>
                        < Form.Item name="moduleName" label="所属模块：">
                            {itemData.module}
                        </Form.Item>
                        < Form.Item name="description" label="描述信息：">
                            {itemData.description}
                        </Form.Item>
                        < Form.Item name="defineText">
                            <Card size="small" title="表定义" style={{ width: 500 }}>
                                {itemData.defineText}
                            </Card>
                        </Form.Item>


                    </Form>
                </div>

                < Table rowSelection={
                    rowSelection
                }
                    columns={
                        this.columns
                    }
                    dataSource={
                        //that.props.tablesStore.items.slice()
                        that.props.columnsStore.dataObject.list.slice()
                    }
                    pagination={
                        this.pagination()
                    }
                    bordered title={() => (<Form layout="inline" onSubmit={this.handleSearch.bind(this)} >

                        < Form.Item label="表的列信息：">
                            <Button onClick={this.handleLineAdd.bind(this)} > 添加 </Button>
                        </Form.Item>
                    </Form>)}
                    footer={
                        () => (<Button onClick={that.onFooterBack.bind(that)}>Back</Button>)
                    }
                />

            </div>
        );
    }
}

ListPage.getInitialProps = async function (context) {
    return { query: context.query, path: context.pathname };
}
