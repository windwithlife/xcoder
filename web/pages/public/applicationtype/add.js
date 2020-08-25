import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';
import XSelect from '../../common/components/select';
const { TextArea } = Input;
//const FormItem = Form.Item;


@inject('applicationTypesStore')
@observer
export default class AddPage extends React.Component {
    formRef = React.createRef();

    Store = () => {
        return this.props.applicationTypesStore;
    }
    StoreData = () => {
        return this.props.applicationTypesStore.dataObject;
    }
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let that = this;
        let appId = this.props.query.applicationId;
        console.log('appid' + appId);
    
    }
    onFinish = values => {
        var that = this;
      
        console.log(values);
        this.Store().add(values, () => { console.log('finished add row'); router.back(); });
    }

    render() {
        var that = this;

        return (
            <Card>
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}>
                    <Form.Item name="name" label="名称"
                        rules={[{
                            required: true,
                        },]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="描述">
                        <Input />
                    </Form.Item>
                    < Form.Item name="sideType" label="项目类型：">
                        < XSelect category="sideType" />
                    </Form.Item>
                    < Form.Item name="language" label="编程语言选择：">
                        < XSelect category="language" />
                    </Form.Item>
                    < Form.Item name="framework" label="技术框架：">
                        < XSelect category="framework" />
                    </Form.Item>
                    < Form.Item name="platform" label="目标操作系统">
                        < XSelect category="os" />
                    </Form.Item>
                  
                    < Form.Item name="isLib" label="是否为公共库">
                        < XSelect category="isLib" />
                    </Form.Item>
                    <Form.Item name="nickname" label="别名(用于识别应用类型，英文输入)">
                        <Input />
                    </Form.Item>
                    

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
    return { query: context.query, path: context.pathname };
}

