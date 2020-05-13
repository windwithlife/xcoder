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
import Upload from '../../common/components/FileUpload';
//import EditTable from '../common/components/EditableTable';
//import AddorEditPage from './AddorEditColumn';

const rowSelection = {
};




@inject('categorysStore')
@observer
export default class EditPage extends React.Component {
    formRef = React.createRef();
    state = {
        editMode: false,
    }
    constructor() {
        super();

    }

    Store = () => {
        return this.props.categorysStore;
    }

    StoreData = () => {
        return this.Store().dataObject;
    }

    tableHeader() {
        var that = this;

        var fieldColumns = [];

        fieldColumns.push({
            title: "表的名称",
            dataIndex: 'name',
            key: 'name'
        });

        fieldColumns.push({
            title: "说明",
            dataIndex: 'description',
            key: 'description'
        });

        return fieldColumns;
    }


    componentDidMount() {
        let that = this;
        console.log('DidMount');
        let moduleId = this.props.query.id;
        console.log("module id:=" + moduleId);


    }




    render() {
        let that = this;

        let itemData = that.StoreData().currentItem;

        console.log('render module edit page');
        return (
            < div >
                <Card size="small" title="模块基本信息" style={{ width: 800 }}  >
                 <Card type="inner">
                        <Upload filename="avatar" uploadAction='/profile' />
                    </Card>
                </Card>
            </div>
        );
    }
}

EditPage.getInitialProps = async function (context) {
    return { query: context.query };
}
