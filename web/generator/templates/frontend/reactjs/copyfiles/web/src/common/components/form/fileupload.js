/**
 * Created by zhangyq on 2016/11/11.
 */


var $ = require('jquery');
import '../3rd/fileupload/js/jquery.fileupload.js';

export default class XFileUpload extends React.Component {
    constructor(props) {
        super(props);
        var options = this.props.options;
        var selectedItem = this.props.value;

      }

    componentWillMount() {
        var that = this;

    }

    handleChange(event) {
        var selectedValue = event.target.value;

        alert("selected item is:" + selectedValue);
    }

    handleSubmit(event) {
        var target =  $(event.target);
        var statusBar = $(event.target).next();
        var inputParent = $(event.target).parent();
        console.log(event.target.name);
        target.fileupload({
            replaceFileInput:false,
            //dataType: 'json',
            add: function (e, data) {
                data.context = statusBar.text('Upload')
                    .click(function () {
                        //data.context=statusBar.text('Uploading...');
                        data.submit();
                    });
            },
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                var widthParent = inputParent.width();
                statusBar.text(progress + "%").css('width',progress/100*widthParent);
            },
            done: function (e, data) {
                console.log("finished file upload!");
                data.context.text('Done!.')
                data.context.unbind('click');
            }
        });

    }
    render() {
        return (
            <div style={{marginRight: 10, marginLeft: 10}}>
                <input type="file" onClick ={this.handleSubmit} name="file" data-url="//121.196.221.190:8080/files/upload/" multiple />
                <button class="progress" style={{backgroundColor:'#00ff00'}}>
                    Upload
                </button>
            </div>
        );
    }
 }