import { List, InputItem,Button,Picker,TextareaItem,Modal,Card,WingBlank,WhiteSpace,Switch} from 'antd-mobile';
import { createForm } from 'rc-form';
import model from './models/model.js';

let BasicInputExample = React.createClass({
    getInitialState() {

        return {
            selectData: [{lable: '公开', value: 1}, {lable: '不公开', value: 2}, {lable: '付费可见', value: 3}],
            optionsData: [],
            isLoading: false,
        };
    },

    componentWillMount(){
        var that = this;

    },
    submit(){
        var that = this;
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
            var params = {};
            params.name = value.name;
            params.text = value.text;
            params.article = value.article;
            params.unit = {id:this.props.location.query.unitId};
            params.optionsList = this.state.optionsData;
            console.log("params:" + JSON.stringify(params));
            model.add(params, function (response) {
                if (response) {
                    console.log(JSON.stringify(response.data));
                    that.props.history.goBack();
                    //that.context.router.goBack();
                    //that.props.location.history.pushState("/client/main/list");
                }
            });
        });//end of validateFields.
    },
    //showModal(){
        //this.state.optionsData.push({name: "这是一个新选项", isRight: 0});
   //     this.setState({visible:true});
   // },
    onAddOption(){
        var that = this;
        this.props.form.validateFields((error, value) => {
            that.state.optionsData.push({name: value.optionText, isRight: value.optionIsRight});
            that.state.visible = false;
            that.setState(this.state);
        });


    },
    render() {
        var optionsData = this.state.optionsData;
        const { getFieldProps } = this.props.form;
        return (
            <div>


                <List>

                    <WingBlank size="lg">
                        <WhiteSpace size="lg"/>
                                <List>
                                <InputItem
                                    {...getFieldProps('name', {
                                        initialValue: '数学相关'
                                    })}
                                    placeholder=""
                                    >题目标题</InputItem>

                                <TextareaItem
                                    {...getFieldProps('text',{initialValue: "200+200＝？"})}
                                    title="题目内容"
                                    rows={5}

                                    placeholder="题目内容"
                                    />
                                <TextareaItem
                                    {...getFieldProps('article')}
                                    title="题目阅读内容"
                                    rows={5}
                                    placeholder="此处可以加阅读理解之类的额外内容"
                                    />
                                <Picker data={this.state.selectData} cols={1} {...getFieldProps('category')}
                                        className="forss">
                                    <List.Item arrow="horizontal">设置权限</List.Item>
                                </Picker>
                                    </List>

                    </WingBlank>




                        <Card full>
                            <Card.Header
                                title="题目选项"
                                extra={<Button type="ghost" onClick={this.onAddOption}>新增选项</Button>}
                                />



                            <WingBlank size="lg">
                                <TextareaItem
                                    {...getFieldProps('optionText',{initialValue: "选项"})}
                                    title="选项内容"
                                    cols={4}
                                    placeholder="选项内容"
                                    />
                                <div> 正确答案</div>
                                <Switch
                                    {...getFieldProps('optionsIsRight', {
                                        initialValue: false,
                                        valuePropName: 'checked',
                                    })}
                                    />


                            {optionsData.map((dItem, i) => {
                                return (
                                    <div key={i}><span>{i}</span>{dItem.name}</div>
                                );
                            })}
                                </WingBlank >
                            <Card.Footer content="" extra={<div></div>}/>
                        </Card>

                </List>
                <Button className="btn" type="primary" onClick={this.submit}>确认</Button>
            </div>);
    },
});

BasicInputExample = createForm()(BasicInputExample);
//var ExampleForm = createForm()(Form);
export default BasicInputExample;

