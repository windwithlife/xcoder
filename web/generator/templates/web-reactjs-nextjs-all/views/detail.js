

import React from 'react';

import {
    Icon,
    Button,
    Collapse,
    Modal,
    Form,
    Input,
    Card,
    Select,
} from 'antd';
const { Panel } = Collapse;
//import { SettingOutlined } from '@ant-design/icons';
const { TextArea } = Input;
import router from 'next/router';
import { inject, observer } from 'mobx-react';
import EditTable from '../common/components/EditableTable';
//import NetworkHelper from '../common/models/network';

@inject('<%=data.tableName%>Store')
@observer
export default class DetailPage extends React.Component {
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
        if (!id){return;}
        this.Store().queryById(id, function (values) {
            console.log(values);
            that.formRef.current.setFieldsValue(values);
        });
    }

    handleLineUpdate(type,index, record) {
        //let path ="<%=data.pageBasePath%>/<%data.pagePrefixName%>edit";
        let path ="<%=data.pageBasePath%>/" + type + "_edit";
        router.push({ pathname: path, query: { id: record.id } });

    }
    handleLineDetail(type,record) {
        let path ="<%=data.pageBasePath%>/" + type + "_detail";
        console.log(path);
        router.push({ pathname: path, query: { id: record.id } });
    }
    handleLineAdd(type) {
        //let path ="<%=data.pageBasePath%>/<%data.pagePrefixName%>add";
        let path ="<%=data.pageBasePath%>/" + type + "_add";
        router.push({ pathname:path});
    }

    handleLineDelete(type,index, record) {
        let that = this;
        let id = record.id;
        this.Store().removeById(id,function(value){
            console.log('removed item ID is:' + id);
        });
    }

    render() {

        let that = this;
        let itemData = that.StoreData().currentItem;
        let items = that.StoreData().currentItem.children;
        console.log('render module edit page');
        return (
            < div >
                <Card size="small" title="基本信息" style={{ width: 800 }}  >
                        <Form >
<%data.fields.forEach(function(field){%>
                          < Form.Item label="<%=field.description%>">
                            {itemData.<%=field.name%>}
                          </Form.Item>
<%});%>
                        </Form>
                </Card>

                <EditTable title="列表" columns={that.tableHeader()} data={items}
                    onAdd={that.handleLineAdd.bind(that,"table")}
                    onDelete={that.handleLineDelete.bind(that,"table")}
                    onUpdate={that.handleLineUpdate.bind(that,"table")}
                    onDetail={that.handleLineDetail.bind(that,"table")}
                ></EditTable>
               
            </div>
        );
    }
}

DetailPage.getInitialProps = async function (context) {
    return { query: context.query };
}










