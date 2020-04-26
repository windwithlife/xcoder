/**
 * Created by zhangyq on 2016/11/11.
 */

 import { ImagePicker, Button } from 'antd-mobile';

 const ImagePickerFile = React.createClass({
  getInitialState() {
    var title = this.props.title ||'';
    var fileValue =this.props.value ||'';
    var originId = 1;
    if((!this.props.value) ||(this.props.value=='')){
      return { files: [],title:title };
    }else{
      return { files: [{url:fileValue,id:originId}],title:title };
    }
    
  },
  onChange(files, type, index) {
    console.log("OnChanged");
    console.log(files, type, index);
    if (this.props.onChange){this.props.onChange(files[0].file.name)};
    this.setState({
      files,
    });
  },
  onAddImageClick() {
    console.log("OnAddImageClick");
    this.setState({
      files: this.state.files.concat({
        url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
        id: '3',
      }),
    });
  },
  
  render() {
    const { files} = this.state;
    return (<div>
      <Button inline style={{ margin: 10 }} >{this.state.title}</Button>
      {<ImagePicker
        files={files}
        onChange={this.onChange}
        onImageClick={(index, fs) => console.log(index, fs)}
        
        selectable={files.length < 5}
      />}
    </div>);
  },
});

 export default ImagePickerFile;