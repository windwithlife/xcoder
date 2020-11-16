import React from 'react';
export default class BasePage extends React.Component {

    constructor(props){
        super(props);
        this.defaultModel = {};
    }
    setDefaultModel(model){
        if(model){
            this.defaultModel = model;
        }
    }
    Store=()=>{
        return this.defaultModel;
    }
    params=()=>{
        let queryParams = this.props.router.query;
        return queryParams;
    }
}