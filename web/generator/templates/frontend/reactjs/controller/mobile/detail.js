/**
 * Created by zhangyq on 2015/9/15.
 */
import React from 'react';

import { Card, WhiteSpace } from 'antd-mobile';
import model from './models/model.js';

const SliderExample = React.createClass({
    getInitialState() {
        return {
            item: null,
            isLoading: false,
        };
    },


    componentWillMount(){
        var that = this;
        if (!that.props.location){return;}
        model.queryById({id:that.props.location.query.id},function(response){
            if(response){
                console.log(JSON.stringify(response.data));

            that.setState({
                item: response.data,
                isLoading: false,
            });
        }
    });
},
    render() {
        var item = this.state.item;
        if (!item || item =={}){return (<div>loading</div>)};
        return (
            <div>

                <div style={{ height: 20 * (window.viewportScale || 1), marginRight: 8 }}></div>
                <Card full>
                    <Card.Header
                        title= {item.name}
                        />
                    <Card.Body>
                        <div>{item.text}</div>
                        <div>{item.text}</div>
                    </Card.Body>
                    <Card.Footer  >
                    </Card.Footer>
                </Card>
            </div>
        );
    }
});

export default SliderExample;
