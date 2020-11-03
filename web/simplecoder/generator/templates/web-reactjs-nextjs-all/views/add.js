import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';
import XSelect from '../common/components/select';
const { TextArea } = Input;
import Upload from '../common/components/FileUpload';

@inject('<%=data.tableName%>Store')
@observer
export default class AddPage extends React.Component {
    formRef = React.createRef();

    Store = () => {
        return this.props.<%=data.tableName%>Store;
    }
    constructor(props) {
        super(props);
        this.state = {};
    }

    onFinish = values => {
        var that = this;
        let projectId = this.props.query.projectId;
        values.projectId = projectId;
        console.log(values);
        this.Store().add(values, () => { console.log('finished add row'); router.back(); });
    }

    onUploadError=(info)=>{
        console.log('error happened during upload file!' + info.file.name);
    }
    onUploadEnd=(fieldName, info)=>{
        console.log('error happened during upload file!' + JSON.stringify(info));
        console.log(info.file.response.path);
        let webImageFilePath = info.file.response.path;
        this.formRef.current.setFieldsValue({fieldName:webImageFilePath});
    }
    render() {
        var that = this;

        return (
            <Card>
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}>
<%data.fields.forEach(function(field){%>
   <%if(field.needChoosed){%>
                        < Form.Item name="<%=field.name%>" label="<%=field.description%>">
                        <XSelect category="<%=field.choosedCategory%>" />
                        </Form.Item>
    <%}else if(field.fieldType=='text'){%>
                         < Form.Item name="<%=field.name%>" label="<%=field.description%>">
                         <TextArea rows={5} />
                         </Form.Item>
    <%}else if(field.fieldType=='image'){%>
                            < Form.Item name="<%=field.name%>" label="<%=field.description%>">
                            <Upload filename="imagefile" uploadAction='/imageupload' onEnd={this.onUploadEnd.bind(that,"<%=field.name%>")} onError={this.onUploadError} />
                            </Form.Item>
   <%}else if(field.name!=='id'){%>
                          < Form.Item name="<%=field.name%>" label="<%=field.description%>">
                           <Input />
                          </Form.Item>
<%}});%>

                    <Card type="inner">
                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="large">Save</Button>
                        </Form.Item>
                    </Card>
                </Form>
            </Card>
        );
    }
}
AddPage.getInitialProps = async function (context) {
    return { query: context.query };
}

