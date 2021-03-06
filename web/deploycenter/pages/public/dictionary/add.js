import React from 'react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';

import BasePage from '../../common/pages/BasePage';
import DictionaryModel from './models/DictionaryModel'
import CategoryModel from '../category/models/CategoryModel'


export default class AddPage extends BasePage {
    formRef = React.createRef();
    state ={
        categorys:[],
        data:{}
    }
    StoreData = () => {
        return this.state.data;
    }
    constructor(props) {
        super(props);
        this.setDefaultModel(new DictionaryModel());
        this.categoryModel = new CategoryModel();

    }
    componentDidMount(){
        let that = this;
        this.categoryModel.queryAll().then(function(result){
            if(result.data){
                that.setState({categorys:result.data.list})
            }
        })
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
                    <Form.Item
                        name="value"
                        label="字典项真实存贮值"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="categoryId" label="所属分类">
                        <Select >
                            {that.state.categorys.map(function (item, i) {
                                return (<Select.Option value={item.id}>{item.description}</Select.Option>);
                            })}
                        </Select>
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

