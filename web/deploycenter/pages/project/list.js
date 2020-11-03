import React from 'react';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import {
    Card,
    Form,
    Select,
    Input
} from 'antd';

import router from 'next/router';
import { inject, observer } from 'mobx-react';
import EditTable from '../common/components/EditableTable';


@inject('projectsStore')
@observer
export default class ListPage extends React.Component {
    constructor() {
        super();
        //this.startHeader();
        //this.store = this.props.modulesStore;


    }

    Store = () => {
        return this.props.projectsStore;
    }

    StoreData = () => {
        return this.Store().dataObject;
    }

    filterData = (list) => {
        let result = [];
       list.forEach(function(item){
           if(item.status >=0){
                result.push(item);
           }
       });

       return result;
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

    componentDidMount() {
        //this.props.tablesStore.queryAll();
        let that = this;
        this.props.projectsStore.queryAll(function(values){
            //that.filterData();
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
        let items = this.filterData(this.Store().dataObject.list);
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
