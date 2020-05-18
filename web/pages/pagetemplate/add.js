import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';
import XSelect from '../common/components/select';
const { TextArea } = Input;
const FormItem = Form.Item;


@inject('templatesStore') @inject('applicationTypesStore')
@observer
export default class TableAdd extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {};
        //props.widgetsStore.queryAll();
    }
    Store = () => {
        return this.props.templatesStore;
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
                    <Form.Item name="category" label="页面功能分类" >
                    <XSelect category="pageCategory">
                    </XSelect>
                    </Form.Item>
                    <Form.Item name="applicationTypeId" label="应用类型" >
                    <Select >       
           {that.props.applicationTypesStore.dataObject.list.map(function (item, i) {
               return (<Select.Option value={item.id}>{item.name}</Select.Option>);
           })}
         </Select>
                    </Form.Item>
                    
                 
                    < Form.Item name="tag" label="页面标签：">
                       <Input />
                    </Form.Item>
                    <Form.Item name="defineText" label="页面模板定义">
                        <TextArea rows={10} />
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
TableAdd.getInitialProps = async function (context) {
    return { query: context.query };
}

