/**
 * Created by zhangyq on 2018/11/26.
 */
import { Form} from 'antd';
export default class FormHelper{
    static form_decorator_show(store){

        return Form.create({
            onFieldsChange(props,fields){
                props[store].onFormFieldsChange(fields)
            },
             mapPropsToFields(props) {

             //将store中的值绑定到视图中
             let values = props.tablesStore.item;
             console.log("store values:" , values);
             let target = {}
             for(let [key,value] of Object.entries(values)){
                target[key] = Form.createFormField({value})
                console.log('now new value:',value)
             }
             return target;
             }
        })
    }

    static form_decorator(store){

        return Form.create({
            onFieldsChange(props,fields){
                props[store].onFormFieldsChange(fields)
            }
        })
    }
}