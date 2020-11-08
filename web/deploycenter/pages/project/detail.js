import React from 'react';
import Button from 'antd/lib/button';
import {
    Collapse,
    Modal,
    Form,
    Card,
    Select,
    Input
} from 'antd';
const { Panel } = Collapse;
import { SettingOutlined } from '@ant-design/icons';
import router from 'next/router';
import { inject, observer } from 'mobx-react';

//import NetworkHelper from '../../store/network';
import EditTable from '../common/components/EditableTable';

const rowSelection = {
};
@inject('modulesStore') @inject('projectsStore')  @inject('applicationsStore')
@observer
export default class DetailPage extends React.Component {
    Store=()=>{
        return this.props.projectsStore;
    }
   
    constructor() {
        super();
    }
   
    Header=()=>{
       
        var fieldColumns = [];

        fieldColumns.push({
            title: "名称",
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
  
        let id = this.props.query.id;
        console.log("edit id:=" + id);
       
        this.props.projectsStore.queryById(id);
    }

   
    generateCode=()=>{
       
        let projectData = this.Store().dataObject.currentItem;
        let finalParams = {};
        finalParams.type = "project";
        finalParams.defines = projectData;
        //NetworkHelper.webPost("generateCodeByProjectId/",finalParams);
    }
    onGotoApplications=()=>{
        let pId = this.props.query.id;
        router.push({pathname:'/application/home',query:{projectId:pId}});
    }
    
    onGotoReleases=()=>{
        let pId = this.props.query.id;
        router.push({pathname:'/applicationrelease/home',query:{projectId:pId}});
    }
  
   
    handleLineUpdate(type, index, record) {
        console.log(type + index);
        if('projectrelease'==type){
            console.log(type +record.id);
            router.push({pathname:'/application/edit',query:{id:record.id}});
        
        }else if('xmodule'==type){
            router.push({pathname:'/xmodule/edit',query:{id:record.id}});
        }
    
    }
    
    handleLineDetail(type,record) {
        let releaseId = record.id;
        if (type=='xmodule'){
            router.push({ pathname: '/xmodule/detail' ,query: {id: releaseId }});
        }else if(type=='projectrelease'){
            router.push({ pathname: '/application/detail' ,query: {id: releaseId }});  
        }
    }
    handleLineAdd(type) {
        let projectId = this.props.query.id;
        if (type=='xmodule'){
            router.push({ pathname: '/xmodule/add' ,query: {projectId: projectId }});
        }else if(type=='projectrelease'){
            router.push({ pathname: '/application/add' ,query: {projectId: projectId }});  
        }
        
       

    }
    handleLineEditModule() {
        let id = this.props.query.id;
        router.push({ pathname: '/xmodule/list', query: { projectId: id } });

    }
   
    handleLineDelete(type,index, record) {
        if (type=='xmodule'){
            console.log(record.id);
            this.props.modulesStore.removeById(index,record.id);
        }else if(type=='application'){
            console.log(record.id);
            this.props.releasesStore.removeById(index,record.id);
        }
        
    }

    
    render() {
        let that = this;
        let itemData = that.props.projectsStore.dataObject.currentItem;
        let editUrl = "/project/edit?id=" + this.props.query.id;
        return (
            < div >
               
                    <Card size="small" title="项目基本信息" style={{ width: 500 }} extra={<a href={editUrl}>编辑项目基本信息</a>} >


                        <Form >
                            < Form.Item name="name" label="项目名称：">
                                {itemData.name}
                            </Form.Item>
                            < Form.Item name="description" label="描述信息：">
                                {itemData.description}
                            </Form.Item>
                           
                        </Form>
                        <Card type="inner"> 
                             <Form.Item>
                             <Button type="primary" onClick={that.onGotoApplications} size="large">项目应用管理</Button>
                             <Button type="primary" onClick={that.onGotoReleases} size="large">项目发布管理</Button>
                            </Form.Item>
                    </Card>
                    </Card>
                

                <EditTable title="此项目中的所有模块" columns={that.Header()} data={itemData.modules} 
                onAdd={that.handleLineAdd.bind(that,'xmodule')} 
                onDelete={that.handleLineDelete.bind(that,'xmodule')}
                onUpdate={that.handleLineUpdate.bind(that,'xmodule')}
                onDetail={that.handleLineDetail.bind(that,'xmodule')}
                ></EditTable>
                
         
            
            </div>
        );
    }
}

DetailPage.getInitialProps = async function (context) {
    return { query: context.query };
}
