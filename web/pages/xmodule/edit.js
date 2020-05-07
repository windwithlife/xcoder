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
import EditTable from '../common/components/EditableTable';


const rowSelection = {
};
@inject('modulesStore') @inject('tablesStore')
@observer
export default class EditPage extends React.Component {
    formRef = React.createRef();
    state = {
        visible: false,
        operationTitle: "新增",
        operationType: "add"
    }
    constructor() {
        super();
        //var that = this;
        //this.startHeader();

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
        let id = this.props.query.id;
        console.log("edit id:=" + id);
        this.props.tablesStore.queryByModuleId(id);
        this.props.modulesStore.queryById(id, function (values) {
            console.log(values);
            that.formRef.current.setFieldsValue(values);
        });
    }

   
    onFinish = values => {
        var that = this;
        let projectId = this.props.query.projectId;
        values.project = projectId;
        this.props.modulesStore.add(values, () => { console.log('finished add row'); router.back(); });
    }
    handleLineUpdate(type,index, record) {
        let that = this;
        let path= '/'+ type+'/edit';
        router.push({ pathname: path, query: { id: record.id ,moduleId:this.props.query.moduleId} });

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


    render() {
        let that = this;
        let itemData = that.props.modulesStore.dataObject.currentItem;
     
        console.log('render module edit page');
        return (
            < div >
                <div>
                    <Card size="small" title="模块基本信息" style={{ width: 800 }}  >

                        <Form ref={this.formRef} onFinish={that.onFinish.bind(that)}>
                            <Form.Item
                                name="id"
                                noStyle='true'
                            ></Form.Item>
                           <Form.Item
                                name="projectId"
                                noStyle='true'
                            ></Form.Item>
                            < Form.Item name="name" label="模块名称：">
                                <Input />

                            </Form.Item>
                            < Form.Item name="description" label="描述信息：">
                                <Input />
                            </Form.Item>
                            < Form.Item name="status" label="状态">
                                <Input />
                            </Form.Item>
                            < Form.Item name="project" label="所属项目为：">
                                {itemData.project}
                            </Form.Item>
                            <Form.Item >
                                <Button type="primary" htmlType="submit" size="large">保存修改基本信息</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
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
    return { query: context.query, path: context.pathname };
}
