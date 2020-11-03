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

import XSelect from '../common/components/select';
import router from 'next/router';
import { inject, observer } from 'mobx-react';
//import AddorEditPage from './AddColumnDialog';
import Upload from '../common/components/FileUpload';

@inject('templatesStore') @inject('applicationTypesStore')
@observer
export default class EditPage extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
    }
    Store = () => {
        return this.props.templatesStore;
    }


    onFinish = values => {
        var that = this;
        //let moduleId = this.props.query.moduleId;
        //values.module = moduleId;
        console.log(values);
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
        this.formRef.current.setFieldsValue({image:webImageFilePath});
        this.Store().dataObject.currentItem.image = webImageFilePath;
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

                    <Form.Item name="name" label="名称(必须用英文）"
                        rules={[{
                            required: true,
                        },]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="description" label="描述">
                        <Input />
                    </Form.Item>
                    <Form.Item name="image" label="图片">
                    <img src={itemData.image} width="100px" height="100px" />
                    <Upload filename="imagefile" uploadAction='/imageupload' onEnd={this.onUploadEnd} onError={this.onUploadError} />
                    </Form.Item>
                    <Form.Item name="category" label="页面所属类型" >
                        <XSelect category="pageCategory" />

                    </Form.Item>
                    <Form.Item name="applicationTypeId" label="适用的应用类型" >
                    <Select >       
           {that.props.applicationTypesStore.dataObject.list.map(function (item, i) {
               return (<Select.Option key = {item.id} value={item.id}>{item.name}</Select.Option>);
           })}
         </Select>
                    </Form.Item>
                   
                    < Form.Item name="tag" label="页面标签：">
                        <Input />
                    </Form.Item>
                    <Form.Item name="defineText" label="页面定义">
                        <TextArea rows={10} />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit" size="large">保存</Button>
                    </Form.Item>
                </Form>
            </Card>


        );
    }
}

EditPage.getInitialProps = async function (context) {
    return { query: context.query };
}
