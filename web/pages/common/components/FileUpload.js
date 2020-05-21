
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


export default class FileUpload extends React.Component {
    state = {
        loading: false,
    };

    
    configProps={
       
            name: this.props.filename? this.props.filename: 'imagefile',
            action: this.props.uploadAction? this.props.uploadAction:"/imageupload/",
            headers: {
                authorization: 'authorization-text',
            }
    }

    
    onChange=(info)=>{
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            if (this.props.onEnd){
                this.props.onEnd(info);
            }
           

        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
            if (this.props.onError){
                this.props.onError(info);
            }
           
        }
    }
    render = () => {
        return (<Upload {...this.configProps} onChange={this.onChange}>
            <Button>
              <UploadOutlined /> Click to Upload
            </Button>
          </Upload>);
    }
}