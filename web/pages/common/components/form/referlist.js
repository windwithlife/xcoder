/**
 * Created by zhangyq on 2016/11/11.
 */
import { Input,Select} from 'antd';
import { Card, Icon, Avatar } from 'antd';
import model from '../models/modelCommon.js';

export default class XList extends React.Component {

    state={
        options:[]
    }
    componentWillMount() {
        //console.log('begin to get referlist data! ID=' + this.props.byId);
        var that = this;
        model.queryReferListBy(that.props.refer,that.props.mapField,{id:that.props.byId},function (response) {
            if (response && response.status===200) {
                //console.log("successful to get refer data");
                //console.log(response.data);
                //console.log("finished to print response data");
                that.setState({options: response.data});
            }
        });
    }

    handleEdit() {
        console.log("switch to edit page");

    }
    onEdit(e){
        e.preventDefault();
        if(this.props.onEdit){this.props.onEdit(e)}
    }

    render() {
        if (this.state.options ==null){return <a/>}
        var that = this;
        return (

            <Card title={this.props.title}
    actions={[<button onClick={that.onEdit.bind(that)} >SaveAndEdit</button>]}>
                {that.state.options.map(function (item, i) {
                    return (<Card
                        type="inner"
                        title={item.name}
                    >
                   </Card>)
                })}
            </Card >
        );
    }
}
