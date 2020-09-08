import React from 'react';
//import Button from 'antd/lib/button';
import {
    Card,
    Form,
    Select,
    Input,
    Button,
} from 'antd';
import router from 'next/router';
import Link from 'next/link';
export default class ListPage extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        //this.props.tablesStore.queryAll();
    }
    goto=(path)=>{
        let pathName = path;
        router.push({ pathname: pathName});
    }

    render() {
        let that = this;
        return (
            <div>
                <Card size="small" title="持续集成平台首页" style={{ width: 800 }}>
                    <Card type="inner">
                        <p>
                            持续集成平台，可以进行自动构建与发布（CI,CD)
                        </p>
                       
                    </Card>
                    <Button type="primary" onClick={that.goto.bind(that,'/applicationrelease/home')} size="large">发布单管理</Button>
                    <Button type="primary" onClick={that.goto.bind(that,'/public/applicationtype/home')} size="large">应用类型配置管理</Button>

                    {/* <li><Link href="/applicationrelease/home"><a>发布管理</a></Link></li>
                    <li><Link href="/config/home"><a>配置管理</a></Link></li> */}
                </Card>

            </div>
        );
    }
}


ListPage.getInitialProps = async function (context) {
    return { query: context.query, path: context.pathname };
}
