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
//import AddorEditPage from './AddorEditColumn';

const rowSelection = {
};




@inject('modulesStore') @inject('tablesStore') @inject('interfacesStore')
@observer
export default class EditPage extends React.Component {
    formRef = React.createRef();
    state = {
        editMode: false,
    }
    constructor() {
        super();

    }

    Store=()=>{
        return this.props.modulesStore;
    }

    StoreData=()=>{
        return this.Store().dataObject;
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

    buildPageColumns() {
        let fieldColumns = [];

        fieldColumns.push({
            title: "模块名称",
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
        console.log('DidMount');
        let moduleId = this.props.query.id;
        console.log("module id:=" + moduleId);
        //this.props.tablesStore.queryByModuleId(id);
        this.props.modulesStore.queryById(moduleId, function (values) {
            console.log(values);
            that.formRef.current.setFieldsValue(values);
        });
    }

    createApplicationByModule=()=>{
        let moduleId = this.props.query.id;
        let pId = this.StoreData().currentItem.projectId;
        router.push({ pathname: "/application/add", query: { moduleId: moduleId ,projectId:pId}});
    }

    handleLineUpdate(type,index, record) {
        let that = this;
        let moduleId = this.props.query.id;
        let path= '/'+ type+'/edit';
        router.push({ pathname: path, query: { id: record.id ,moduleId:moduleId} });

    }
    handleLineDetail(type,record) {
        let path= '/'+ type+'/detail';
        console.log(path);
        router.push({ pathname: path, query: { id: record.id } });
    }
    handleLineAdd(type) {
        let moduleId = this.props.query.id;
        let path= '/'+ type+'/add';
        router.push({ pathname: path, query: { moduleId: moduleId } });

    }

    handleLineDelete(type,index, record) {
        console.log(record.id);
        let that = this;
        let moduleId = this.props.query.moduleId;
        if('xtable'==type){
            //console.log('inde')
            this.props.tablesStore.removeById(index, record.id,function(value){
                that.props.modulesStore.queryById(moduleId);
            });
        }

        if('xinterface'==type){
            //console.log('inde')
            this.props.interfacesStore.removeById(index, record.id,function(value){
                that.props.modulesStore.queryById(moduleId);
            });
        }
        if('xpage'==type){
            //console.log('inde')
            this.props.pagesStore.removeById(index, record.id,function(value){
                that.props.modulesStore.queryById(moduleId);
            });
        }
        
    }
    handleSearchChange(e) {
        this.setState({ searchText: e.target.value, name: e.target.value });
    }
    handleSearch(e) {
        e.preventDefault();

    }
    render() {
        let that = this;
        let editUrl = "/xmodule/edit?id=" + this.props.query.id;
        let itemData = that.props.modulesStore.dataObject.currentItem;
        
        console.log('render module edit page');
        return (
            < div >
                <Card size="small" title="模块基本信息" style={{ width: 500 }} extra={<a href={editUrl}>编辑项目基本信息</a>} >
                    <Form ref={this.formRef}>
                        < Form.Item name="name" label="模块名：">
                            {itemData.name}
                        </Form.Item>
                        < Form.Item name="description" label="描述信息：">
                            {itemData.description}
                        </Form.Item>
                        < Form.Item name="projectId" label="所属项目：">
                            {itemData.projectId}
                        </Form.Item>

                    </Form>
                    <Card type="inner"> 
                             <Form.Item>
                             <Button type="primary" onClick={that.createApplicationByModule} size="large">创建基于当前模块的新应用</Button>
                            </Form.Item>
                    </Card>
                </Card>


                <EditTable title="此模块中的所有表" columns={that.tableHeader()} data={itemData.tables} 
                onAdd={that.handleLineAdd.bind(that,'xtable')} 
                onDelete={that.handleLineDelete.bind(that,'xtable')}
                onUpdate={that.handleLineUpdate.bind(that,'xtable')}
                onDetail={that.handleLineDetail.bind(that,'xtable')}
                ></EditTable>
                
                <EditTable title="接口：" columns={that.buildPageColumns()} data={itemData.interfaces} 
                onAdd={that.handleLineAdd.bind(that,'xinterface')} 
                onDelete={that.handleLineDelete.bind(that,'xinterface')}
                onDetail={that.handleLineDetail.bind(that,'xinterface')}
                onUpdate={that.handleLineUpdate.bind(that,'xinterface')}
                ></EditTable>
            </div>
        );
    }
}

EditPage.getInitialProps = async function (context) {
    return { query: context.query };
}
