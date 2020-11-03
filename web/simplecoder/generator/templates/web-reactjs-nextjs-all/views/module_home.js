
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
import NetworkHelper from '../common/components/models/network';

@inject('<%=data.tableName%>Store')
@observer
export default class ModuleHomePage extends React.Component {
    formRef = React.createRef();
    state = {
        editMode: false,
    }
    constructor() {
        super();
        this.projectName = "tempName";
    }
    Store = () => {
        return this.props.releasesStore;
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

    handleLineUpdate(type, index, record) {
        let that = this;
        let path = '/' + type + '/edit';
        router.push({ pathname: path, query: { id: record.id, moduleId: this.props.query.moduleId } });

    }
    handleLineDetail(type, record) {
        let path = '/' + type + '/detail';
        console.log(path);
        router.push({ pathname: path, query: { id: record.id } });
    }
    handleLineAdd(type) {
        let releaseId = this.props.query.id;
        console.log('begin route to ' + type);
        if('xmodule'==type){
            router.push({ pathname:'/projectrelease/add_module', query: {id: releaseId } });
        }else if('xpage' == type){
            router.push({ pathname:'/xpage/add', query: {id: releaseId } });
        }
    }

    handleLineDelete(type, index, record) {
        let that = this;
        let releaseId = this.props.query.id;
        if ('xpage' == type) {
            this.props.pagesStore.removeById(index, record.id, function (value) {
                that.Store().queryById(moduleId);
            });
        }
        if ('xmodule' == type) {
            let moduleId = record.id;
            this.Store().deleteModule(releaseId, moduleId,function(value){
                console.log('remove module from release ID is:' + value);
            });
        }

    }

    render() {

        let that = this;
        let editUrl = "/projectrelease/edit?id=" + this.props.query.id;
        let itemData = that.Store().dataObject.currentItem;
        let isShowPage = itemData.sideType == 'server' ? false : true;

        console.log('render module edit page');
        return (
            < div >
                <Card size="small" title="基本信息" style={{ width: 500 }} extra={<a href={editUrl}>编辑项目基本信息</a>} >
                        <Form >
<%data.fields.forEach(function(field){%>
                          < Form.Item name="<%=field.name%>" label="<%=field.description%>">
                            {itemData.<%=field.name%>}
                          </Form.Item>
<%});%>
                        </Form>
                </Card>

                {isShowPage ? <EditTable title="页面：" columns={that.tableHeader()} data={itemData.pages}
                    onAdd={that.handleLineAdd.bind(that, 'xpage')}
                    onDelete={that.handleLineDelete.bind(that, 'xpage')}
                    onUpdate={that.handleLineUpdate.bind(that, 'xpage')}
                    onDetail={that.handleLineDetail.bind(that, 'xpage')}
                ></EditTable> : <div></div>}
               
            </div>
        );
    }
}

ModuleHomePage.getInitialProps = async function (context) {
    return { query: context.query };
}
