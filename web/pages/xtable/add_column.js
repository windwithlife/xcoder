import { Form, Input, Button, Select } from 'antd';
import { inject, observer } from 'mobx-react';
import XSelect from '../common/components/form/select';
//import { Router } from 'next/router';
import router from 'next/router';
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};



@inject('columnsStore') @inject('tablesStore') @inject('categorysStore') 
@observer 
export default class AddPage extends React.Component {
  formRef = React.createRef();

  state={
    colList:[],
  }
  constructor(props){
    super(props);
    props.tablesStore.queryAll();
  }
  Store=()=>{
    return this.props.columnsStore;
  }
  componentDidMount() {
    this.props.categorysStore.queryAll();
  }
  onFinish = values => {
    var that = this;
    values.tableId= this.props.query.tableId;
    console.log(values);
    this.props.columnsStore.add(values,function(value) { 
      console.log('ok save column');
      //that.props.onConfirm();
      router.back();
    });
    
  };

  onChangeTable=(value)=>{
    let that = this;
    let index = value;
    console.log('index' + value);
    let tableData = this.props.tablesStore.dataObject.list[value];
    let tableId = tableData.id;
    let tableName = tableData.name;
    this.formRef.current.setFieldsValue({referModule:tableName});
    this.Store().initializeByTableId(tableId,function(values){
        that.setState({colList:that.Store().dataObject.list});
    });
  }


  render() {
    var that = this;
    return (
      <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}>
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
         
        < XSelect  category="fieldType"  />
        </Form.Item>

        <Form.Item
          name="choose"
          label="字典表中进行选择"
        >
        <Select >       
           {that.props.categorysStore.dataObject.list.map(function (item, i) {
               return (<Select.Option value={item.nme}>{item.name}</Select.Option>);
           })}
         </Select>
        </Form.Item>
        <Form.Item
          name="map"
          label="外关联关系"
        >
         < XSelect  category="mapType" />
        </Form.Item>
       <Form.Item
         
          label="外关联表"
        >
         <Select  onChange={this.onChangeTable}>
         <Option value="other">无</Option>        
           {that.props.tablesStore.dataObject.list.map(function (item, i) {
               return (<Select.Option value={i}>{item.name}</Select.Option>);
           })}
         </Select>
        </Form.Item>
        <Form.Item noStyle
          name="referModule"
          label="外关联表"
        >
        </Form.Item>

        <Form.Item
          name="mapField"
          label="外联字段"
        >
          <Select>
            
            <Option value="other">无</Option>
           
          {that.state.colList.map(function (item, i) {
              return (<Select.Option value={item.name}>{item.name}</Select.Option>);
          })}
          </Select>
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
          <Button htmlType="button" onClick={this.props.onConfirm}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

AddPage.getInitialProps = async function (context) {
  return { query: context.query };
}