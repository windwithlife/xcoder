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
const { Panel } = Collapse;
import { SettingOutlined } from '@ant-design/icons';

import router from 'next/router';
import { inject, observer } from 'mobx-react';
//import AddColumnPage from './AddColumnDialog';

const rowSelection = {
};
@inject('columnsStore') @inject('tablesStore')
@observer
export default class ListPage extends React.Component {
    state = {
        visible: false,
        operationTitle: "新增",
        operationType: "add",
        editMode: false,
    }
    constructor() {
        super();
        //var that = this;
        this.startHeader();

    }
    changeEditMode = (event) => {
        event.stopPropagation();
        console.log('click on edit model');
        let nextMode = !this.state.editMode;
        this.setState({ editMode: nextMode });
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
                <span hidden={!that.state.editMode} >

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

    componentDidMount() {
        //this.props.tablesStore.fetchAll();
        console.log('DidMount');
        let tableId = this.props.query.id;
        console.log("edit id:=" + tableId);
        this.props.columnsStore.initializeByTableId(tableId);
        //this.props.columnsStore.initializeByTableId(9999);
        this.props.tablesStore.queryById(tableId);
    }

    pagination() {
        return {
            total: this.props.tablesStore.dataLength,
            showSizeChanger: true
        }
    }
    handleLineUpdate(index, record) {
        console.log("colId" + record.id);
        router.push({pathname:'/xtable/edit_column',query:{columnId:record.id}});
       
    }
    handleLineDetail(record) {
        //router.push({ pathname: '/zxtable/detail', query: { ...that.props.query, pxtableId: record.id } });
    }
    handleLineAdd() {
        //this.setState({ visible: true });
        console.log('ddd column');
        let tableId = this.props.query.id;
        router.push({ pathname:'/xtable/add_column', query:{tableId:tableId}});
    }
   
    handleLineDelete(index, record) {
        console.log(record.id);
        this.props.columnsStore.removeById(index,record.id);
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
        let tableId = this.props.query.tableId;
        let itemData = that.props.tablesStore.dataObject.currentItem;
        return (
            < div >
               
                <div>
                <Card size="small" title="表基本信息" style={{ width: 500 }}  >
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
                        < Form.Item name="defineText" label='表结构定义'>
                            
                                {itemData.defineText}
                           
                        </Form.Item>

                    </Form>
                    </Card>
                </div>

                <Collapse accordion>
                    <Panel header="此表中所有列" key="2" extra={<SettingOutlined onClick={that.changeEditMode}></SettingOutlined>}>


                        < Form.Item  >
                            <Button type="primary" onClick={this.handleLineAdd.bind(this)} hidden={!that.state.editMode}> 添加 </Button>
                        </Form.Item>


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

                        />
                    </Panel></Collapse>
            </div>
        );
    }
}

ListPage.getInitialProps = async function (context) {
    return { query: context.query, path: context.pathname };
}
