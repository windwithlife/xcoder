import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';
import XSelect from '../../common/components/form/select';
const { TextArea } = Input;
const FormItem = Form.Item;


const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

@inject('categorysStore') @observer
export default class AddPage extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        
    }

    Store = () => {
        return this.props.categorysStore;
    }

    onFinish = values => {
        var that = this;
        this.Store().add(values, () => { console.log('finished add row'); router.back(); });
    }

    render = () => {
        var that = this;
        return (
            <Card>
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}>
                    <Form.Item name="name" label="分类识别名称"
                        rules={[{
                            required: true,
                        },]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="描述">
                        <Input />
                    </Form.Item>

                    <Card type="inner">
                        <FormItem className="form-item-clear" {...tailLayout} >
                            <Button type="primary" htmlType="submit" size="large">Save</Button>
                        </FormItem>
                    </Card>
                </Form>
            </Card>
        );
    }
}
AddPage.getInitialProps = async function (context) {
    return { query: context.query };
}

