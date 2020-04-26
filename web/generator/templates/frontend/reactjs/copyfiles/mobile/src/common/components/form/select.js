/**
 * Created by zhangyq on 2016/11/11.
 */
import model from '../models/modelCommon.js';

export default class Select extends React.Component {
    constructor(props) {
        super(props);
        var options = this.props.options;
        var selectedItem = this.props.value;
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
                console.log(JSON.stringify(response.data));
                that.setState({options: response.data});
                }
            });
        } else if(this.props.refer){

            model.queryReferListByName(this.props.refer,function (response) {
                if (response && response.status===200) {
                    console.log("get data:" + JSON.stringify(response.data));

                    that.setState({options: response.data});
                }
            });
        }
    }

    handleChange(event) {
        var selectedValue = event.target.value;
        this.setState({value: selectedValue});
        if (this.props.onChange) {
            this.props.onChange({id:selectedValue});
        }
        alert("selected item is:" + selectedValue);
    }

    render() {
        var that = this;
        return (

            <select value={this.state.value.id} onChange={this.handleChange}>
                <option value="-1">未选择</option>
                {that.state.options.map(function (item, i) {
                    return (<option value={item.id}>{item.name}</option>);
                })}
            </select>
        );
    }
}
