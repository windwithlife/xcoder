import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';
import XSelect from '../common/components/form/select';
const { TextArea } = Input;

@inject('<%=data.tableName%>Store')
@observer
export default class AddPage extends React.Component {
    formRef = React.createRef();

    Store = () => {
        return this.props.<%=data.tableName%>Store;
    }
    constructor(props) {
        super(props);
        this.state = {};
    }

    onFinish = values => {
        var that = this;
        let projectId = this.props.query.projectId;
        values.projectId = projectId;
        console.log(values);
        this.Store().save(values, () => { console.log('finished add row'); router.back(); });
    }

    render() {
        var that = this;

        return (
            <Card>
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}>
<%data.fields.forEach(function(field){%>
   <%if(field.needChoosed){%>
                        < Form.Item name="<%=field.name%>" label="<%=field.description%>">
                        <XSelect category="<%=field.choosedCategory%>" />
                        </Form.Item>
   <%}else if(field.name!=='id'){%>
                          < Form.Item name="<%=field.name%>" label="<%=field.description%>">
                           <Input />
                          </Form.Item>
<%}});%>

                    <Card type="inner">
                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="large">Save</Button>
                        </Form.Item>
                    </Card>
                </Form>
            </Card>
        );
    }
}
AddPage.getInitialProps = async function (context) {
    return { query: context.query };
}

