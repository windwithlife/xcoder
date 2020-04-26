/**
 * Created by zhangyq on 2016/11/11.
 */


import { Upload, Button, Icon,Input,message } from 'antd';


const props = {
  name: 'file',
  action: ' http://121.196.221.190:8080/files/upload',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


export default class FileUpload extends React.Component {
    constructor(props) {
        super(props);
      this.state = {value: this.props.value ||'', fileList:[]};

      }

    componentWillMount() {
        var that = this;

    }

    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file);
            console.log(info.fileList);
            
        }

        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            if (this.props.onChange){
               this.props.onChange(info.file.response); 
            }
            
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }


    render() {
        props.action = this.props.action || props.action;
        props.onChange = this.onChange.bind(this) || props.onChange;
        return (
            <div>
              <span>
                <Input type="hidden" /></span><span>
                <Upload {...props}  listType='picture'>
                    <Button type="ghost">
                        <Icon type="upload" /> upload
                    </Button>
                </Upload>
                </span>
            </div>
        );
    }
 }