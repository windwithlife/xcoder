import React from 'react';
//import model from './models/model.js';
//import Table from 'antd/lib/table';
//import Button from 'antd/lib/button';
//import Popconfirm from 'antd/lib/popconfirm';

import {
    Collapse,
    Modal,
    Form,
    Card,
    Select,
    Input,
    Table,
    Popconfirm,
    Button,
} from 'antd';
const { Panel } = Collapse;
import { SettingOutlined } from '@ant-design/icons';
import router from 'next/router';
export default class EditableTable extends React.Component {
    state = {
        editMode: false,
    }
    constructor(props) {
        super(props);
        this.startHeader(props);
    }
    startHeader(props) {
        var that = this;

        var fieldColumns = props.columns;
        this.columns = [...fieldColumns, {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <span>
                <span hidden={!that.state.editMode} >
                    <span className="ant-divider" />
                    <Popconfirm title="Sure to delete?" onConfirm={that.handleLineDelete.bind(that, index, record)} >
                        < a href="#" > Delete </a>
                    </Popconfirm>
                    <span className="ant-divider" />
                    <a href="#" onClick={that.handleLineUpdate.bind(that, index, record)} > Edit </a>
                    <span className="ant-divider" />
                </span>
                <a href="#" onClick={that.handleLineDetail.bind(that, record)} > Detail </a>
                </span>
            )
        }];

    }
    componentDidMount() {
    }
    pagination() {
        return {
            showSizeChanger: true
        }
    }
    handleLineUpdate(index, record) {
        if(this.props.onUpdate){
            this.props.onUpdate(index,record);
        }
    }
    changeEditMode = (event) => {
        event.stopPropagation();
        //console.log('click on edit model');
        let nextMode = !this.state.editMode;
        this.setState({ editMode: nextMode });
    }
    handleLineDetail(record) {
        if(this.props.onDetail){
            this.props.onDetail(record);
        }
    }
    handleLineAdd() {
        if(this.props.onAdd){
            this.props.onAdd();
        }
    }
    handleLineDelete(index, record) {
        console.log(record.id);
        //this.props.data.splice(index,1);
       
        if(this.props.onDelete){
            this.props.onDelete(index,record);
        }
       
    }

    handleSearchChange(e) {
        this.setState({ searchText: e.target.value, name: e.target.value });
    }
    handleSearch(e) {
        e.preventDefault();
        let keywork = this.state.searchText

    }
    render() {
        let that = this;
        let headerTitle = this.props.title;
        let list = this.props.data;
        if(!list){list=[];}
        list.forEach(function(item){
            item.key=item.id;
        });
        return (
                <Collapse  accordion>
                    <Panel header={headerTitle} key="4" extra={<SettingOutlined onClick={that.changeEditMode}></SettingOutlined>}>

                        <Form layout="inline" onSubmit={this.handleSearch.bind(this)} >
                            {/* <Form.Item  >
                                <Input type="text" onChange={this.handleSearchChange.bind(this)} />
                            </Form.Item>
                            < Form.Item  >
                                < Button style={{ marginRight: '10px' }} type="primary" htmlType="submit" > 搜索 </Button>
                            </Form.Item> */}
                            < Form.Item  >
                                <Button type="primary" onClick={this.handleLineAdd.bind(this)} hidden={!that.state.editMode}> 添加 </Button>
                            </Form.Item>
                        </Form>
                        < Table 
                            columns={
                                this.columns
                            }
                            dataSource={
                                list.slice()
                            }
                            pagination={
                                this.pagination()
                            }
                        />
                    </Panel>
                </Collapse>
        );
    }
}
