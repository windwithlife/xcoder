import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';
import XSelect from '../../common/components/select';
const { TextArea } = Input;
const FormItem = Form.Item;


@inject('dictionaryStore') @observer
export default class AddPage extends React.Component {
    formRef = React.createRef();

    Store = () => {
        return this.props.dictionarysStore;
    }
    constructor(props) {
        super(props);
        
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
                    <Form.Item name="name" label="名称"
                        rules={[{
                            required: true,
                        },]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="描述">
                        <Input />
                    </Form.Item>
                    <Form.Item name="category" label="所属分类">
                    < XSelect  category="" refer ="category" display='yes' />
                    </Form.Item>
                    
                    <Card type="inner">
                        <FormItem className="form-item-clear" >
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

