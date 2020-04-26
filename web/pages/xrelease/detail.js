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
import NetworkHelper from '../common/components/models/network';
//import AddorEditPage from './AddorEditColumn';


@inject('xreleasesStore')
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
        return this.props.xreleasesStore;
    }
    StoreData = () => {
        return this.props.xreleasesStore.dataObject;
    }
    changeEditMode = (event) => {
        event.stopPropagation();
        console.log('click on edit model');
        let nextMode = !this.state.editMode;
        this.setState({ editMode: nextMode });
    }
    
  
    componentDidMount() {
        let that = this;
        let id = this.props.query.id;

        this.Store().queryById(id, function (values) {
            console.log(values);
            if (!values.releaseStatus){
                values.releaseStatus = "DEV";
            }
        });
    }

    releaseTo = (envType) => {
      
        let itemData = this.StoreData().currentItem;
        itemData.projectName = this.projectName;
        let finalParams = {};
        finalParams.type = 'release';
        finalParams.defines = itemData;
        NetworkHelper.webPost("releaseByParams/", finalParams);
        console.log(finalParams);
    }
   
    render() {
        let that = this;
      
        let itemData = that.Store().dataObject.currentItem;
        if (!itemData.releaseStatus){
            itemData.releaseStatus = "DEV";
        }
        console.log('render at xrelease detail page');
        return (
            < div >
                <Card size="small" title="基本信息" style={{ width: 800 }}  >
                    <Form ref={this.formRef}>
                        < Form.Item name="name" label="可发布名：">
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
                        < Form.Item name="description" label="描述信息：">
                            {itemData.description}
                        </Form.Item>
                        < Form.Item name="releaseStatus" label="当前发布状态：">
                            {itemData.releaseStatus}
                        </Form.Item>
                        <Card type="inner"> 
                             <Form.Item>
                             <Button type="primary" onClick={that.releaseTo} size="large">进行发布</Button>
                            </Form.Item>
                    </Card>

                    </Form>
                </Card>

               
            </div>
        );
    }
}

EditPage.getInitialProps = async function (context) {
    return { query: context.query };
}
