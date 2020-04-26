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
import EditTable from '../common/components/EditableTable';
import router from 'next/router';
import { inject, observer } from 'mobx-react';

const rowSelection = {
};
@inject('widgetsStore')
@observer
export default class DetailPage extends React.Component {

    state = {
        editMode: false,
    }
    constructor() {
        super();

    }
    Store = () => {
        return this.props.widgetsStore;
    }
    tableHeader() {
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
    changeEditMode = (event) => {
        event.stopPropagation();
        console.log('click on edit model');
        let nextMode = !this.state.editMode;
        this.setState({ editMode: nextMode });
    }

    componentDidMount() {

        console.log('DidMount');
        let id = this.props.query.id;
        this.Store().queryAll();
    }


    handleLineDetail(record) {
        router.push({ pathname: '/xwidget/detail', query: { id: record.id } });
    }

    handleLineUpdate(record) {
        router.push({ pathname: '/xwidget/edit', query: { id: record.id } });
    }
    handleLineAdd() {
        router.push({ pathname: '/xwidget/add' });
    }


    handleDelete(index, record) {
        console.log(record.id);
        let that = this;
        this.Store().removeById(index, record.id,function(value){
           that.Store().queryAll();
        });
    }


    render() {
        let that = this;
        let items = this.Store().dataObject.list;
        console.log('render widget home');
        console.log(that.Store().dataObject.list);
        return (
            <div>
                <Card size="small" title="基本信息" style={{ width: 500 }}  >

                </Card>
                <EditTable title="组件列表" columns={that.tableHeader()} data={that.props.widgetsStore.dataObject.list}
                    onAdd={that.handleLineAdd.bind(that)}
                    onDelete={that.handleDelete.bind(that)}
                    onDetail={that.handleLineDetail.bind(that)}
                ></EditTable>

            </div>
        );
    }
}

DetailPage.getInitialProps = async function (context) {
    return { query: context.query };
}
