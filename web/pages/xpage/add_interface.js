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
import EditTable from '../common/components/EditableTable';
//import SelectTransfer from './add_test';
import SelectTransfer from '../common/components/TransferSelect';
import router from 'next/router';
import { inject, observer } from 'mobx-react';

const rowSelection = {
};
@inject('pagesStore') @inject('interfacesStore')
@observer
export default class DetailPage extends React.Component {
    formRef = React.createRef();

    state = {
        editMode: false,
    }
    constructor() {
        super();
        this.finalKeys = [];
    }
    onFinish = values => {
        var that = this;
        let pageId = this.props.query.id;
        //values.module = moduleId;
        this.finalKeys.forEach(function(item){
            let interId = item.id;//= that.props.interfacesStore.dataObject.list[item];
            that.Store().addInterface(pageId,interId,function(value){
                console.log('success to add interface id:' + value);
                router.back();
            });
        });
        //this.Store().add(values, () => { console.log('finished add page'); router.back(); });
    }
    Store = () => {
        return this.props.pagesStore;
    }
    
    changeEditMode = (event) => {
        event.stopPropagation();
        console.log('click on edit model');
        let nextMode = !this.state.editMode;
        this.setState({ editMode: nextMode });
    }

    componentDidMount() {
        let that = this;
        console.log('DidMount');
        let id = this.props.query.id;
        this.Store().queryById(id,function(page){
            that.props.interfacesStore.queryByModuleId(page.moduleId);
        });
        
    }

    filterData=(item)=>{
        return {
            description: item.name,
            value:item.id,
        }
    }
    onItemClick=(values)=>{
        console.log(values);
        //thisconsole.log(values);
        this.formRef.current.setFieldsValue(values);
    }
    handleChange=(keys)=>{
        console.log(keys);
        this.finalKeys = keys;
    }
    onChangeInterface(e) {
        let path = '/' + type + '/detail';
        //router.push({ pathname: path, query: { id: record.id } });
    }
    handleLineAdd(type) {
        let moduleId = this.props.query.moduleId;
        let path = '/' + type + '/add';
        router.push({ pathname: path, query: { moduleId: moduleId } });

    }

    handleLineDelete(index, record) {
        console.log(record.id);
       
    }
    
    render() {
        //return (<div>test</div>);
        let that = this;
        let itemData = this.Store().dataObject.currentItem;
        let interfaces = this.props.interfacesStore.dataObject.list;
        return (
            <div>
                <Card size="small" title="基本信息" style={{ width: 800 }}  >
                <SelectTransfer data={interfaces} filterData={that.filterData} onItemClick={that.onItemClick} handleChange={that.handleChange}></SelectTransfer>
                        
                    <Form  ref={this.formRef} onFinish={that.onFinish.bind(that)}>
                        < Form.Item name="name" label="名称：">
                            <Input />
                        </Form.Item>
                        < Form.Item name="description" label="说明：">
                        <Input />
                        </Form.Item>
                       
                        <Form.Item >
                                <Button type="primary" htmlType="submit" size="large">保存</Button>
                            </Form.Item>
                    </Form>
                </Card>
               
            </div>
        );
    }
}

DetailPage.getInitialProps = async function (context) {
    return { query: context.query };
}
