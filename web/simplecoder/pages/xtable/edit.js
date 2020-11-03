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

@inject('columnsStore') @inject('tablesStore')
@observer
export default class ListPage extends React.Component {
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

    
    onFinish = values => {
        var that = this;
        let moduleId = this.props.query.moduleId;
        values.moduleId = moduleId;
        this.props.tablesStore.update(values, () => { console.log('finished update table'); router.back(); });
    }
    componentDidMount=()=>{
        //this.props.tablesStore.fetchAll();
        let that = this;
        console.log('DidMount');
        let tableId = this.props.query.id;
        console.log("edit id:=" + tableId);
        this.props.columnsStore.initializeByTableId(tableId);
        this.props.tablesStore.queryById(tableId,function(values){
            that.formRef.current.setFieldsValue(values);
        });
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
        let tableId = this.props.query.id;
        router.push({ pathname: '/xtable/add_column', query:{tableId:tableId}});
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
                
                <div>
                <Card size="small" title="表基本信息" style={{ width: 500 }}  >
                    <Form ref={this.formRef} onFinish={that.onFinish.bind(that)}>
                        <Form.Item
                            name="id"
                            noStyle='true'
                        ></Form.Item>
                         <Form.Item
                            name="moduleId"
                            noStyle='true'
                        ></Form.Item>
                       
                        < Form.Item name="name" label="表名：">
                            <Input />
                        </Form.Item>
                        < Form.Item name="description" label="描述信息：">
                            <Input />
                        </Form.Item>
                        < Form.Item name="defineText" label="表定义">
                            <TextArea rows={5} />
                        </Form.Item>
                        <Form.Item >
                                <Button type="primary" htmlType="submit" size="large">保存修改基本信息</Button>
                            </Form.Item>
                    </Form>
                    </Card>
                </div>
                <Collapse >
                    <Panel header="此表所有列" key="1" extra={<SettingOutlined ></SettingOutlined>}>
                      
                < Table 
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

                        < Form.Item >
                            <Button type="primary" onClick={this.handleLineAdd.bind(this)} > 添加 </Button>
                        </Form.Item>
                    </Form>)}
                   
                />
            </Panel>
            </Collapse>
            </div>
        );
    }
}

ListPage.getInitialProps = async function (context) {
    return { query: context.query, path: context.pathname };
}
