import React from 'react';
import {
    Collapse,
    Card,
} from 'antd';
const { Panel } = Collapse;

import router from 'next/router';

import EditTable from '../../common/components/EditableTable';
import BasePage from '../../common/pages/BasePage';
import CategoryModel from './models/CategoryModel';


export default class EditPage extends BasePage {
    formRef = React.createRef();
    state = {
        editMode: false,
        data:[],
    }
    constructor() {
        super();
        this.setDefaultModel(new CategoryModel());
    }
  
    StoreData=()=>{
        return this.state.data;
    }
    componentDidMount() {
        let that = this;
        this.Store().queryAll(function (values) {
            console.log(values);
            that.setState({data:values.data.list});
        });
    }
    changeEditMode = (event) => {
        event.stopPropagation();
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

    
   

  

    handleLineUpdate(index, record) {
        
        let path = '/category/edit';
        router.push({ pathname: path, query: { id: record.id } });

    }
    handleLineDetail(record) {
        let path = '/category/detail';
        console.log(path);
        router.push({ pathname: path, query: { id: record.id } });
    }
    handleLineAdd() {
        let path = '/category/add';
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
        let editUrl = "/category/edit?id=" + this.props.query.id;
        let items = that.StoreData();
    
        return (
            < div >
                <Card size="small" title="基本信息" style={{ width: 500 }}  >
                 发布系统首页   
                </Card>
                <EditTable title="应用类型：" columns={that.tableHeader()} data={items}
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
