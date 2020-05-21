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
const { Panel } = Collapse;
import { SettingOutlined } from '@ant-design/icons';
const { TextArea } = Input;
import router from 'next/router';
import { inject, observer } from 'mobx-react';
import EditTable from '../../common/components/EditableTable';
//import NetworkHelper from '../../store/network';
//import AddorEditPage from './AddorEditColumn';


@inject('applicationTypesStore')
@observer
export default class EditPage extends React.Component {
    formRef = React.createRef();
    state = {
        editMode: false,
    }
    constructor() {
        super();
        this.projectName = "tempName";
    }
    Store = () => {
        return this.props.applicationTypesStore;
    }
    StoreData = () => {
        return this.props.applicationTypesStore.dataObject;
    }
    changeEditMode = (event) => {
        event.stopPropagation();
        console.log('click on edit model');
        let nextMode = !this.state.editMode;
        this.setState({ editMode: nextMode });
    }

    tableHeader() {
        var that = this;

        var fieldColumns = [];

        fieldColumns.push({
            title: "名称",
            dataIndex: 'name',
            key: 'name'
        });

        fieldColumns.push({
            title: "版本",
            dataIndex: 'releaseVersion',
            key: 'releaseVersion'
        });
        fieldColumns.push({
            title: "发布环境",
            dataIndex: 'envType',
            key: 'envType'
        });
        fieldColumns.push({
            title: "Build Number",
            dataIndex: 'buildOrder',
            key: 'buildOrder'
        });
        return fieldColumns;
    }

    componentDidMount() {
        let that = this;
        let id = this.props.query.id;

        this.Store().queryById(id, function (values) {
            console.log(values);
            if (!values.releaseStatus) {
                values.releaseStatus = "DEV";
            }
        });
    }

   

    render() {
        let that = this;

        let itemData = that.Store().dataObject.currentItem;
       
        console.log('render at xrelease detail page');
        return (
            < div >
                <Card size="small" title="基本信息" style={{ width: 800 }}  >
                    <Form ref={this.formRef}>
                        < Form.Item name="name" label="名：">
                            {itemData.name}
                        </Form.Item>
                        < Form.Item name="sideType" label="项目端点类型：">
                            {itemData.sideType}
                        </Form.Item>

                        < Form.Item name="language" label="编程语言：">
                            {itemData.language}
                        </Form.Item>
                        < Form.Item name="framework" label="框架：">
                            {itemData.framework}
                        </Form.Item>
                        < Form.Item name="platform" label="操作系统平台：">
                            {itemData.platform}
                        </Form.Item>
                        < Form.Item name="path" label="相对的PATH：">
                            {itemData.path}
                        </Form.Item>
                      
                        < Form.Item name="description" label="描述信息：">
                            {itemData.description}
                        </Form.Item>
                        <Card type="inner">
                           
                            <Form.Item>
                                <Button type="primary" size="large">返回</Button>
                            </Form.Item>
                        </Card>

                    </Form>

                </Card>
                {/* <EditTable title="发布历史记录：" columns={that.tableHeader()} data={items}
                    onAdd={that.handleLineAdd.bind(that)}
                    onDelete={that.handleLineDelete.bind(that)}
                    onUpdate={that.handleLineUpdate.bind(that)}
                    onDetail={that.handleLineDetail.bind(that)}
                ></EditTable> */}

            </div>
        );
    }
}

EditPage.getInitialProps = async function (context) {
    return { query: context.query };
}
