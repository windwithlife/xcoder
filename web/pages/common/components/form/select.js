/**
 * Created by zhangyq on 2016/11/11.
 */
import { Input,Select} from 'antd';
import model from '../models/modelCommon.js';

export default class XList extends React.Component {
    constructor(props) {
        super(props);
        var options = this.props.options;
        var selectedItem = this.props.id|| "-1";
        if (!options) {
            options = []
        }
        ;
        this.state = {value: selectedItem, options: options};
        this.handleChange = this.handleChange.bind(this);

    }

    componentWillMount() {
        var that = this;
        if (this.state.options.length > 0) {
            this.setState(this.state);
        } else if (this.props.category) {

            var params = {};
            params.category = this.props.category;
            model.queryDictionaryByCategory(params, function (response) {
                if (response && response.status===200) {
                console.log(response.data);
                that.setState({options: response.data});
                }
            });
        } else if(this.props.refer){

            model.queryReferListByName(this.props.refer,function (response) {
                if (response && response.status===200) {
                    console.log(response.data);
                    response.data.map(function (item, i){
                        item.value = item.id;
                    })
                    that.setState({options: response.data});
                }
            });
        }
    }

    handleChange(event) {
        console.log(JSON.stringify(event));
        //var selectedValue = event.target.value;
        this.setState({value: event});
        if (this.props.onChange) {
            this.props.onChange(event);
        }
        //alert("selected item is:" + selectedValue);
    }

    render() {
        var that = this;
        //console.log("current display property:" + this.props.display);
        if (that.props.display == 'no'){
            return(<div></div>);
        }
        if (!that.state.options){
            return(<Select ref ="selectEL" value={this.state.value} onChange={this.handleChange}>
                        <Select.Option value={"-1"}>无</Select.Option>
                   </Select >);
        }
        return (

            <Select ref ="selectEL" value={this.state.value} onChange={this.handleChange}>
                <Select.Option value={"-1"}>无</Select.Option>
                {that.state.options.map(function (item, i) {
                    return (<Select.Option value={item.value}>{item.name}</Select.Option>);
                })}
            </Select >
        );
    }
}
