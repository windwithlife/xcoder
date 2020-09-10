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
const { TextArea } = Input;
import router from 'next/router';
import { inject, observer } from 'mobx-react';
import EditTable from '../common/components/EditableTable';
import NetworkHelper from '../../store/network';
//import AddorEditPage from './AddorEditColumn';


@inject('applicationPointStore') 
@observer
export default class EditPage extends React.Component {
    formRef = React.createRef();
    state = {
        editMode: false,
    }
    constructor() {
        super();
        this.projectName = "tempName";
    }
    Store = () => {
        return this.props.applicationPointStore;
    }
    StoreData=()=>{
        return this.props.applicationPointStore.dataObject;
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

        this.Store().queryAll(id, function (values) {
            console.log(values);
        });
    }

   

    handleLineUpdate(index, record) {
        let path = '/applicationpoint/edit';
        console.log(path);
        router.push({ pathname: path, query: { id: record.id } });
       
    }
    handleLineDetail(record) {
        let path = '/applicationpoint/detail';
        console.log(path);
        router.push({ pathname: path, query: { id: record.id } });
    }
    handleLineAdd() {
        let path = '/applicationpoint/add';
        console.log(path);
        router.push({ pathname: path });
    }

    handleLineDelete(index, record) {
        let id = record.id;
        this.Store().removeById(index, record.id, function (value) {
           console.log('sucessful to detele one xrlease');
        });
    }

    render() {
        let that = this;
        //let editUrl = "/projectrelease/edit?id=" + this.props.query.id;
        let items = that.StoreData().list;
        //let isShowPage = itemData.sideType == 'server' ? false : true;

        console.log('render module edit page');
        return (
            < div >
                <Card size="small" title="基本信息" style={{ width: 500 }}  >
                 发布系统首页   
                </Card>
                <EditTable title="所有发布进程：" columns={that.tableHeader()} data={items}
                    onAdd={that.handleLineAdd.bind(that)}
                    onDelete={that.handleLineDelete.bind(that)}
                    onUpdate={that.handleLineUpdate.bind(that)}
                    onDetail={that.handleLineDetail.bind(that)}
                ></EditTable>

            </div>
        );
    }
}

EditPage.getInitialProps = async function (context) {
    return { query: context.query };
}
