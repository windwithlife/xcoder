import React from 'react';

import {
    Table,
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

const { TextArea } = Input;
import router from 'next/router';
import { inject, observer } from 'mobx-react';
import EditTable from '../common/components/EditableTable';
//import NetworkHelper from '../../store/network';
//import AddorEditPage from './AddorEditColumn';


@inject('applicationreleasesStore') 
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
        return this.props.applicationreleasesStore;
    }
    StoreData=()=>{
        return this.props.applicationreleasesStore.dataObject;
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

    generateCode = () => {
        //console.log(type);
        let itemData = this.Store().dataObject.currentItem;
        itemData.projectName = this.projectName;
        let finalParams = {};
        finalParams.type = 'release';
        finalParams.defines = itemData;

       // NetworkHelper.webPost("generateCodeByProjectId/", finalParams);
        console.log(finalParams);
    }
   

    handleLineUpdate(index, record) {
        
        let path = '/applicationrelease/edit';
        router.push({ pathname: path, query: { id: record.id } });

    }
    handleLineDetail(record) {
        let path = '/applicationrelease/detail';
        console.log(path);
        router.push({ pathname: path, query: { id: record.id } });
    }
    handleLineAdd() {
        let path = '/applicationrelease/add';
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
        let editUrl = "/projectrelease/edit?id=" + this.props.query.id;
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
