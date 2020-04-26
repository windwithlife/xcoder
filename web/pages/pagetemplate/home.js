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
@inject('templatesStore')
@observer
export default class DetailPage extends React.Component {

    state = {
        editMode: false,
    }
    constructor() {
        super();

    }
    Store = () => {
        return this.props.templatesStore;
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
        fieldColumns.push({
            title: "所适用开发语言",
            dataIndex: 'language',
            key: 'language'
        });
        fieldColumns.push({
            title: "所适用端",
            dataIndex: 'sideType',
            key: 'sideType'
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
        router.push({ pathname: '/pagetemplate/detail', query: { id: record.id } });
    }

    handleLineUpdate(record) {
        router.push({ pathname: '/pagetemplate/edit', query: { id: record.id } });
    }
    handleLineAdd() {
        router.push({ pathname: '/pagetemplate/add' });
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
                <EditTable title="模板列表" columns={that.tableHeader()} data={that.Store().dataObject.list}
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
