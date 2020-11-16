import React from 'react';

import {
    Card,
    Form,
    Button,
    Icon,
} from 'antd';

import router from 'next/router';

import EditTable from '../common/components/EditableTable';
import ProjectModel from './models/ProjectModel';
import BasePage from '../common/pages/BasePage';



export default class ListPage extends BasePage{
    state ={
        data:[],
    }
    constructor() {
        super();
        this.setDefaultModel(new ProjectModel());

    }

    StoreData = () => {
        return this.state.data;
    }

    
    Header = () => {

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

    componentDidMount=()=>{
        //this.props.tablesStore.queryAll();
        let that = this;
        this.Store().queryAll().then(function(result){
            if(result.data){
                that.setState({data:result.data.list});
            }
        });
    }

    pagination() {
        return {
            //total: this.props.modulesStore.dataObject.list.length,
            showSizeChanger: true,
        };
    }
    handleLineUpdate(index, record) {
        let that = this;
        router.push({ pathname: '/project/edit', query: { id: record.id } });

    }
    handleLineDetail(record) {
        let that = this;
        router.push({ pathname: '/project/detail', query: { id: record.id } });
    }

    handleLineAdd() {
        let that = this;
        router.push({ pathname: '/project/add', query: { ...that.props.query } });
    }
    handleLineDelete(index, record) {
        var that = this;
        this.props.projectsStore.removeById(index, record.id);
    }
    render() {
        let that = this;
        let items = this.state.data;
        return (
            <div>
                <Card size="small" title="项目管理首页" style={{ width: 800 }}>
                    <Card type="inner">
                        <p>
                            项目基本定义管理，有模块管理，每个模块包含表定义及接口定义，
                            首先要先创建一个项目来管理各模块定义，针对每个项目创建应用
                            代码框架，有了框架代码，就可以在上面进行编码，并创建自动构建的发布（CI,CD)
                        </p>
                        <Button type="primary" onClick={that.onGotoApplications} size="large">项目应用管理</Button>
                        <Button type="primary" onClick={that.onGotoReleases} size="large">项目发布管理</Button>

                    </Card>
                </Card>

                <EditTable title="项目列表" columns={that.Header()} data={items}
                    onAdd={that.handleLineAdd.bind(that)}
                    onDelete={that.handleLineDelete.bind(that)}
                    onUpdate={that.handleLineUpdate.bind(that)}
                    onDetail={that.handleLineDetail.bind(that)}
                ></EditTable>



            </div>
        );
    }
}


ListPage.getInitialProps = async function (context) {
    return { query: context.query, path: context.pathname };
}
