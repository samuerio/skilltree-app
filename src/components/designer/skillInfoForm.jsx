import {Form,Input,Button} from 'antd';
import React,{Component} from 'react';
const FormItem  = Form.Item;

/**
 * Skill信息填写表单
 */

export default Form.create({
    mapPropsToFields(props){
        let {formData} = props;
        return{
            name:{
                value:formData.name||''
            },
            description:{
                value:formData.description||''
            }
        }
    },
    onFieldsChange(props,changedFields){
        let {addFieldVal} = props;
        for(let fieldName in changedFields){
            addFieldVal(fieldName,changedFields[fieldName]['value']);
        }

    }
})((props)=>{
    const {getFieldDecorator} = props.form;
    let {designer,formData} = props;
    return(
        <Form vertical >
            <FormItem label="技能名称" labelCol={{span:4}} wrapperCol={{span:8}}>
                {
                    getFieldDecorator('name',{
                        rules:[{
                            required: true, message: 'Please input your E-mail!'
                        }]
                    })(<Input />)
                }
            </FormItem>
            <FormItem label="技能描述" labelCol={{span:4}} wrapperCol={{span:8}} >
                {
                    getFieldDecorator('description')(<Input type="textarea"/>)
                }
            </FormItem>
            <FormItem wrapperCol={{ span: 8, offset: 4 }} >
                <Button type="primary"  size="large" onClick={()=>{
                    let {viewBox,mindNodes} = designer.data;
                    //进行技能树的存储
                    let actionUrl = '/skilltree-app/app.action?type=skill&operType=createSkill';
                    $.post(actionUrl,{
                        name:formData.name || '',
                        description:formData.description || '',
                        viewBox:JSON.stringify(viewBox),
                        mindNodes:JSON.stringify(mindNodes)
                    }).then(function(rs){
                        rs = JSON.parse(rs);
                        rs.isSuccess && alert('创建成功!');
                    });
                }} >创建技能</Button>
            </FormItem>
        </Form>
    )
});