import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';
const { TextArea } = Input;
import XSelect from '../common/components/select';
import Upload from '../common/components/FileUpload';




@inject('widgetsStore') @inject('applicationTypesStore')
@observer
export default class TableAdd extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {};
        //props.widgetsStore.queryAll();
    }
    Store = () => {
        return this.props.widgetsStore;
    }
    StoreData = () => {
        return this.props.widgetsStore.dataObject;
    }
    componentDidMount() {
        let id = this.props.query.id;
        this.props.applicationTypesStore.queryAll();
    }
    onFinish = values => {
        var that = this;
        //let moduleId = this.props.query.moduleId;
        //values.moduleId = moduleId;
        console.log(values);
        this.Store().add(values, () => { console.log('finished add interface row'); router.back(); });
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
        var that = this;

        return (
            <Card>
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}>
                    <Form.Item name="name" label="名称(必须用英文）"
                        rules={[{
                            required: true,
                        },]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="description" label="描述">
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
                    <Upload filename="imagefile" uploadAction='/imageupload' onEnd={this.onUploadEnd} onError={this.onUploadError} />
                    </Form.Item>
                    <Form.Item name="defineText" label="组件定义">
                        <TextArea rows={5} />
                    </Form.Item>

                    <Card type="inner">
                        <Form.Item className="form-item-clear" >
                            <Button type="primary" htmlType="submit" size="large">Save</Button>
                        </Form.Item>
                    </Card>
                </Form>
            </Card>
        );
    }
}
TableAdd.getInitialProps = async function (context) {
    return { query: context.query };
}

