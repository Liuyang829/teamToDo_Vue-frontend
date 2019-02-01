<template>
    <div class="user-content__info">
        <p>个人信息</p>
        <Form :show-message="false" label-position="left" class="user-content__info__form" ref="formCustom" :model="form" :rules="rule" :label-width="80">
            <FormItem class="upload-form__item" label="头像" prop="avatar">
                <div class="upload-avatar">
                    <Avatar class="upload-avatar__img" src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="large"></Avatar>
                    <Poptip placement="bottom" v-model="show.visible">
                        <div class="poptip-title" slot="title">
                            <p>更改头像</p>
                            <Icon @click="show.visible = false" class="poptip-title__close" type="md-close" />
                        </div>
                        <Button type="info" ghost>上传头像</Button>
                        <CellGroup style="width:300px;" slot="content">
                            <Cell title="上传新头像"></Cell>
                            <Cell title="使用默认头像"></Cell>
                        </CellGroup>
                    </Poptip>
                </div>
            </FormItem>
            <FormItem label="姓名" prop="name">
                <Input type="password" v-model="form.name"></Input>
            </FormItem>
            <FormItem label="联系电话" prop="phone">
                <Input type="text" v-model="form.phone" number></Input>
            </FormItem>
            <FormItem label="生日" prop="birthday">
                <Select v-model="date.year" style="width:100px">
                    <Option v-for="item in dateList.year" :value="item" :key="item">{{ item }}</Option>
                </Select>
                <Select v-model="date.month" style="width:100px;margin: 0 6px;">
                    <Option v-for="item in dateList.month" :value="item" :key="item">{{ item }}</Option>
                </Select>
                <Select v-model="date.day" style="width:100px">
                    <Option v-for="item in dayList" :value="item" :key="item">{{ item }}</Option>
                </Select>
            </FormItem>
            <FormItem label="所在地" prop="address">
                <Input type="text" v-model="form.address" ></Input>
            </FormItem>
            <FormItem label="网址" prop="website">
                <Input type="text" v-model="form.website" ></Input>
            </FormItem>
            <FormItem label=" " >
                <Button long :type="validate ? 'primary': 'info'" @click="handleSubmit('formCustom')">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    data() {
        const validatePhone = (rule,value, callback) => {
            const rgx = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
            if (rgx.test(value)) {
                callback()
            } else {
                callback(new Error('请输入正确的手机号'))
            }
        }
        return {
            form: {
                name: '',
                phone: '',
                address: '',
                website: '',
                birthday: '',
                avatar: ''
            },
            rule: {
                name: [
                    {trigger: 'blur'}
                ],
                phone: [
                    {validator: validatePhone, trigger: 'change'}
                ],
                address: [],
                website: [],
                birthday: [],
                avatar: []
            },
            show: {
                visible: false
            },
            dateList: {
                year: [],
                month: []
            },
            date: {
                year: 1970,
                month: 1,
                day: 1
            },
            validate: false
        }
    },
    watch: {
        form: {
            handler(v,o) {
                if(v) {
                    this.$refs.formCustom.validate((vail) => {
                        if(vail) {
                            this.validate = true
                        } else {
                            this.validate = false
                        }
                    })
                }
            },
            deep: true
        }
    },
    computed: {
        dayList() {
            let day = 1
            let dayArr = []
            let end_day = new Date(this.date.year, this.date.month, 0).getDate();

            for (let i = 0; i < end_day; i++) {
                dayArr.push(day)
                day++
            }
            return dayArr
        }
    },
    methods: {
        handleSubmit(v) {
            if (!this.validate) return
            this.$refs[v].validate(vail => {
                if(vail) {
                    console.log(11)
                }
            })
        },
        initYear() {
            let year = 1938
            let now_year = new Date().getFullYear()

            for (let i = 0; i <= now_year - 1938; i++) {
                this.dateList.year.unshift(year)
                year++
            }
        },
        initMonth() {
            let month = 1

            for (let i = 0; i < 12; i++) {
                this.dateList.month.push(month)
                month++
            }
        }
    },
    created() {
        this.initYear()
        this.initMonth()
    }
}
</script>

<style lang="scss">
.user-content__info {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    & > p {
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: bold;
    }
    &__form {
        width: 400px;
    }
    .ivu-poptip-body {
        padding: 5px 0;
    }
    .poptip-title {
        position: relative;
        padding: 5px 0;
        font-size: 16px;
        font-weight: bold;
        color: #000;
        text-align: center;
        &__close {
            position: absolute;
            right: 0;
            top: 50%;
            font-size: 20px;
            transform: translateY(-50%);
            cursor: pointer;
        }
    }
    .upload-avatar {
        &__img {
            margin-right: 30px;
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
    }
    .upload-form__item {
        .ivu-form-item-label {
            height: 100px;
            line-height: 100px;
        }
    }
}
</style>
