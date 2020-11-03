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
import Upload from '../common/components/FileUpload';

@inject('widgetsStore') @inject('applicationTypesStore')
@observer
export default class EditPage extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
    }
    Store = () => {
        return this.props.widgetsStore;
    }
    StoreData = () => {
        return this.props.widgetsStore.dataObject;
    }

    onFinish = values => {
        var that = this;
        //let moduleId = this.props.query.moduleId;
        //values.module = moduleId;
        this.Store().update(values, () => { console.log('finished add row'); router.back(); });
    }
    componentDidMount() {
        let that = this;
        console.log('DidMount');
        let id = this.props.query.id;
        this.props.applicationTypesStore.queryAll();
        this.Store().queryById(id, function(values){
            that.formRef.current.setFieldsValue(values);
        });
    }


    onUploadError=(info)=>{
        console.log('error happened during upload file!' + info.file.name);
    }
    onUploadEnd=(info)=>{
        console.log('error happened during upload file!' + JSON.stringify(info));
        console.log(info.file.response.path);
        let webImageFilePath = info.file.response.path;
        this.StoreData().currentItem.image = webImageFilePath;
        this.formRef.current.setFieldsValue({image:webImageFilePath});
        
    }


    render() {
        let that = this;
        let itemData = this.Store().dataObject.currentItem;
        return (

            <Card size="small" title="表基本信息" style={{ width: 500 }}  >
                <Form ref={this.formRef} onFinish={that.onFinish.bind(that)}>
                    <Form.Item
                        name="id"
                        noStyle='true'
                    ></Form.Item>
                    < Form.Item name="name" label="名称（必须用英文）：">
                        <Input />
                    </Form.Item>
                    < Form.Item name="description" label="描述信息：">
                        <Input />
                    </Form.Item>
                    <Form.Item name="applicationTypeId" label="应用类型" >
                        <Select >
                            {that.props.applicationTypesStore.dataObject.list.map(function (item, i) {
                                return (<Select.Option key= {item.id} value={item.id}>{item.name}</Select.Option>);
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item name="image" label="图片">
                    <img src={itemData.image} width="100px" height="100px" />
                    <Upload filename="imagefile" uploadAction='/imageupload' onEnd={this.onUploadEnd} onError={this.onUploadError} />
                    </Form.Item>
                 
                    < Form.Item name="defineText" label='组件定义'>
                        <TextArea rows={5} />
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit" size="large">保存修改基本信息</Button>
                    </Form.Item>
                </Form>
            </Card>


        );
    }
}

EditPage.getInitialProps = async function (context) {
    return { query: context.query };
}
