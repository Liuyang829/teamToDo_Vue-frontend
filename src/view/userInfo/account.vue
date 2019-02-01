<template>
    <div class="user-account">
        <Card :shadow="true" class="user-account__login"  :bordered="false">
            <p slot="title" style="font-size:16px;">登录账户</p>
            <div class="user-account__email">
                <label>邮箱账号</label>
                <div class="user-account__email__input">
                    <Input style="width: 300px" placeholder="输入邮箱地址"/>
                    <Button type="info" size="large">确认绑定</Button>
                </div>
            </div>
            <div class="user-account__phone">
                <label>手机账号</label>
                <div class="user-account__phone__input">
                    <Input style="width: 300px" placeholder="输入手机号">
                        <Select v-model="phonePre" slot="prepend" style="width: 60px">
                            <Option value="+86">+86</Option>
                        </Select>
                    </Input>
                    <Button type="info" size="large">确认绑定</Button>
                </div>
            </div>
        </Card>
        <Card class="user-account__pwd" :shadow="true">
            <p>登录密码</p>
            <Form style="width:430px;" label-position="left" ref="formPwd" :model="formPwd" :rules="rulePwd" :label-width="124">
                <FormItem label="旧密码" prop="old_password">
                    <Input type="password" v-model="formPwd.old_password"></Input>
                </FormItem>
                <FormItem label="新密码" prop="new_password">
                    <Input type="password" v-model="formPwd.new_password"></Input>
                </FormItem>
                <FormItem label="确认密码" prop="re_password">
                    <Input type="password" v-model="formPwd.new_password"></Input>
                </FormItem>
                <FormItem label=" ">
                    <Button style="width:120px" size="large" type="primary" @click="savaPwd('formPwd')">保存</Button>
                </FormItem>
            </Form>   
        </Card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            phonePre: '+86',
            formPwd: {
                old_password: '',
                new_password: '',
                re_password: ''
            }
        }
    }
}
</script>

<style lang="scss">
.user-account {
    &__login {
        margin-bottom: 20px;
    }
    &__email, &__phone {
        display: flex;
        padding: 20px 0 4px 0;
        label {
            color: grey;
            width: 104px;
            margin-right: 20px;
        }
        & > div {
            display: flex;
            button {
                margin-left: 20px;
            }
        }
    }
    &__email {
        padding-top: 5px;
        padding-bottom: 20px;
        box-shadow: 0 1px 0 rgba(0,0,0,.1)
    }
    &__pwd {
        p {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .ivu-form-item-label {
            font-size: 14px;
            color: gray;
        }
    }
}
</style>
