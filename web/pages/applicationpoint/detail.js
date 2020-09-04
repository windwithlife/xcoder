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
import EditTable from '../common/components/EditableTable';
import NetworkHelper from '../../store/network';
//import AddorEditPage from './AddorEditColumn';


@inject('applicationPointStore') @inject('applicationTypesStore')
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
        return this.props.applicationPointStore;
    }
    StoreData = () => {
        return this.props.applicationPointStore.dataObject;
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
            //that.props.applicationPointStore.queryById(values.applicationTypeId);
           
        });
    }

    

    render() {
        let that = this;
        let appTypeName = this.props.applicationTypesStore.dataObject.currentItem.name;
        let itemData = that.Store().dataObject.currentItem;
        if (!itemData.releaseStatus) {
            itemData.releaseStatus = "DEV";
        }
        console.log('render at xrelease detail page');

        return (
            < div >
                <Card size="small" title="基本信息" style={{ width: 800 }}  >
                    <Form ref={this.formRef}>
                        < Form.Item name="name" label="名称：">
                            {itemData.name}
                        </Form.Item>
                        < Form.Item name="description" label="描述信息：">
                            {itemData.description}
                        </Form.Item>
                        < Form.Item name="serverAddress" label="端点地址与端口：">
                            {itemData.serverAddress}
                        </Form.Item>
                       
                       
                      

                    </Form>

                </Card>
               
            </div>
        );
    }
}

EditPage.getInitialProps = async function (context) {
    return { query: context.query };
}
