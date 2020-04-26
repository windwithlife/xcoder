
import React from 'react';
//import model from './models/model.js';

import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
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
const { TextArea } = Input;
import router from 'next/router';
import { inject, observer } from 'mobx-react';
import EditTable from '../common/components/EditableTable';
import NetworkHelper from '../common/components/models/network';

@inject('<%=data.tableName%>Store')
@observer
export default class HomePage extends React.Component {
    formRef = React.createRef();
    state = {
        editMode: false,
    }
    constructor() {
        super();
        this.projectName = "tempName";
    }
    Store = () => {
        return this.props.<%=data.tableName%>Store;
    }
    StoreData = () => {
        return this.props.<%=data.tableName%>Store.dataObject;
    }
    changeEditMode = (event) => {
        event.stopPropagation();
        console.log('click on edit model');
        let nextMode = !this.state.editMode;
        this.setState({ editMode: nextMode });
    }
    tableHeader() {
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

        return fieldColumns;
    }

   
    componentDidMount() {
        let that = this;
        let id = this.props.query.id;
        this.Store().queryById(id, function (values) {
            console.log(values);
            that.formRef.current.setFieldsValue(values);
        });
    }

    handleLineUpdate(index, record) {
        let path ="<%=data.pageBasePath%>/<%data.pagePrefixName%>edit";
        router.push({ pathname: path, query: { id: record.id } });

    }
    handleLineDetail(record) {
        let path ="<%=data.pageBasePath%>/<%data.pagePrefixName%>detail";
        console.log(path);
        router.push({ pathname: path, query: { id: record.id } });
    }
    handleLineAdd() {
        let path ="<%=data.pageBasePath%>/<%data.pagePrefixName%>add";
        router.push({ pathname:path});
    }

    handleLineDelete(index, record) {
        let that = this;
        let id = record.id;
        this.Store().removeById(id,function(value){
            console.log('removed item ID is:' + id);
        });
    }

    render() {

        let that = this;
        let itemData = that.StoreData().currentItem;
        let items = that.StoreData().list;
        console.log('render module edit page');
        return (
            < div >
                <Card size="small" title="基本信息" style={{ width: 500 }}  >
                        <Form >
<%data.fields.forEach(function(field){%>
                          < Form.Item name="<%=field.name%>" label="<%=field.description%>">
                            {itemData.<%=field.name%>}
                          </Form.Item>
<%});%>
                        </Form>
                </Card>

                <EditTable title="列表" columns={that.tableHeader()} data={items}
                    onAdd={that.handleLineAdd.bind(that)}
                    onDelete={that.handleLineDelete.bind(that)}
                    onUpdate={that.handleLineUpdate.bind(that)}
                    onDetail={that.handleLineDetail.bind(that)}
                ></EditTable>
               
            </div>
        );
    }
}

HomePage.getInitialProps = async function (context) {
    return { query: context.query };
}






