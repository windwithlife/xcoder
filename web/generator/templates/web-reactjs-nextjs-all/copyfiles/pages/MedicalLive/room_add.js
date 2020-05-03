import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';
import XSelect from '../common/components/form/select';
const { TextArea } = Input;

@inject('roomStore')
@observer
export default class AddPage extends React.Component {
    formRef = React.createRef();

    Store = () => {
        return this.props.roomStore;
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
        this.Store().add(values, () => { console.log('finished add row'); router.back(); });
    }

    render() {
        var that = this;

        return (
            <Card>
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}>

   
   
                          < Form.Item name="name" label="Name">
                           <Input />
                          </Form.Item>

   
                          < Form.Item name="title" label="Title">
                           <Input />
                          </Form.Item>


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

