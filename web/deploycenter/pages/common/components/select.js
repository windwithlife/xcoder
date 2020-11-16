/**
 * Created by zhangyq on 2016/11/11.
 */
import { Input,Select} from 'antd';
import BasePage from '../pages/BasePage.js';
import DictionaryModel from '../../public/dictionary/models/DictionaryModel'

export default class XList extends BasePage {
    constructor(props) {
        super(props);
        var options = this.props.options;
        var selectedItem = this.props.value|| "";
        if (!options) {
            options = []
        }
        ;
        this.state = {value: selectedItem, options: options};
        this.handleChange = this.handleChange.bind(this);
        this.setDefaultModel(new DictionaryModel());

    }

    componentWillMount() {
        var that = this;
        if (this.state.options.length > 0) {
            this.setState(this.state);
        } else if (this.props.category) {

            var params = {};
            let categoryName = this.props.category;
            that.Store().queryDictionaryByCategory(categoryName, function (response) {
                if (response && response.status===200) {
                console.log(response.data);
                that.setState({value:that.props.value, options: response.data});
                }
            });
        } 
    }

    handleChange(event) {
        console.log(JSON.stringify(event));
        this.setState({value: event});
        if (this.props.onChange) {
            this.props.onChange(event);
        }
       
    }

    render() {
        var that = this;
        
        if (!that.state.options){
            return(<Select ref ="selectEL" value={this.props.value} onChange={this.handleChange}>
                        <Select.Option key = "keyxxx" value={"-1"}>无</Select.Option>
                   </Select >);
        }
        return (

            <Select ref ="selectEL" value={this.props.value} onChange={this.handleChange}>
                <Select.Option value={"-1"}>无</Select.Option>
                {that.state.options.map(function (item, i) {
                    item.key = item.id;
                    return (<Select.Option key={item.key} value={item.value}>{item.name}</Select.Option>);
                })}
            </Select >
        );
    }
}
