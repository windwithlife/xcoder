import React from 'react';
//import model from './models/model.js';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import {

    Modal,
    Form,
    Input,
    Card,
    Select,
} from 'antd';
const { TextArea } = Input;
const { Option } = Select;
import XSelect from '../common/components/form/select';
//const { Panel } = Collapse;
//import { SettingOutlined } from '@ant-design/icons';
import router from 'next/router';
import { inject, observer } from 'mobx-react';



const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const rowSelection = {
};

@inject('columnsStore') @inject('tablesStore')
@observer
export default class EditPage extends React.Component {
    formRef = React.createRef();

    constructor() {
        super();
    }
    Store = () => {
        return this.props.columnsStore;
    }
    onFinish = values => {
        var that = this;
        let tableId = this.props.query.tableId;
        values.xtableId = tableId;
        this.Store().update(values, () => { console.log('finished add row'); router.back(); });
    }
    componentDidMount() {

        console.log('DidMount');
        let that = this;
        let colId = this.props.query.columnId;
        console.log("edit id:=" + colId);
        this.Store().queryById(colId, function (values) {
            that.formRef.current.setFieldsValue(values);
        });
    }




    render() {
        let that = this;
        let itemData = that.props.tablesStore.dataObject.currentItem;
        return (

            <Card size="small" title="表列定义" style={{ width: 500 }}  >
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}>
                    <Form.Item
                        name="name"
                        label="名称"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="fieldType"
                        label="类型"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="referModule"
                        label="外联类型"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="mapField"
                        label="外联字段"
                    >
                        <Select>
                            <Option value="map">Map</Option>
                            <Option value="list">List</Option>
                            <Option value="other">other</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="map"
                        label="外关联关系"
                    >
                        < XSelect category="mapType" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="说明"
                    >
                        <Input />
                    </Form.Item>



                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                         </Button>
                    </Form.Item>
                </Form>
            </Card>

        );
    }
}

EditPage.getInitialProps = async function (context) {
    return { query: context.query };
}
