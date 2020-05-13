
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


export default class FileUpload extends React.Component {
    state = {
        loading: false,
    };

    configProps={
       
            name: this.props.filename? this.props.filename: 'file',
            action: this.props.uploadAction? this.props.uploadAction:"/upload/",
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info){
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            }

    }

    

    render = () => {
        return (<Upload {...this.configProps}>
            <Button>
              <UploadOutlined /> Click to Upload
            </Button>
          </Upload>);
    }
}