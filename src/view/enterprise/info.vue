<template>
    <div class="enterprise-info">
        <div class="enterprise-info__basic">
            <div class="enterprise-info__header">
                <p>基本信息</p>
            </div>
            <div class="enterprise-info__body">
                <Form :model="infoForm" label-position="top">
                    <FormItem label="企业头像">
                        <div class="avatar-upload">
                            <Avatar size="large" src="https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar"></Avatar>
                            <Upload
                                ref="upload"
                                :show-upload-list="false"
                                :default-file-list="defaultList"
                                :on-success="handleSuccess"
                                :format="['jpg','jpeg','png']"
                                :max-size="2048"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                type="drag"
                                action="//jsonplaceholder.typicode.com/posts/"
                                style="display: inline-block;width:58px;">
                                <div style="width: 58px;height:58px;line-height: 58px;">
                                    <Icon type="ios-camera" size="20"></Icon>
                                </div>
                            </Upload>
                        </div>
                    </FormItem>
                    <FormItem label="企业名称">
                        <Input v-model="infoForm.name" placeholder="企业名称"></Input>
                    </FormItem>
                    <FormItem label="企业简介">
                        <Input type="textarea" placeholder="企业简介" :rows="3" v-model="infoForm.description"></Input>
                    </FormItem>
                    <FormItem style="margin-top: 90px;">
                        <Button type="primary">保存</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
        <div class="enterprise-info__pay">
            <div class="enterprise-info__header">
                <p>付费信息</p>
            </div>
            <div class="enterprise-info__body">
                <div>
                    <p>版本信息</p>
                    <span>企业专业版</span>
                </div>
                <div>
                    <p>企业ID</p>
                    <span>51546532156461231</span>
                </div>
                <div>
                    <p>成员数量</p>
                    <span>1位企业成员， 共1000个名额</span>
                </div>
                <div>
                    <p>创建时间</p>
                    <span>2018年9月11日</span>
                </div>
                <div>
                    <p>到期时间</p>
                    <span>2018年9月21日</span>
                </div>
                <div>
                    <p>企业状态</p>
                    <span>试用中</span>
                </div>
                <div class="pay-btn__wrap">
                    <Button type="primary" ghost>立即购买</Button>
                    <Button type="primary" ghost>查看订单</Button>
                </div>
            </div>
        </div>
        <div class="enterprise-info__action">
            <div class="enterprise-info__header">
                <p>更多操作</p>
            </div>
            <div class="enterprise-info__body">
                <div>
                    <p>企业归属</p>
                    <div class="enterprise_ascription">
                        <div>
                            <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg"></Avatar>
                            <span>陈波</span>
                        </div>
                        <Button type="primary" ghost>移交</Button>
                    </div>
                </div>
                <Divider />
                <div>
                    <p>删除企业</p>
                    <span>一旦你删除了企业，企业内所有项目、部门、成员，项目中所有内容等都将会永久删除，这是一个不可恢复的操作，请谨慎对待！</span>
                    <Button type="error" ghost>删除企业</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      infoForm: {
        avatar: "",
        name: "",
        description: ""
      },
      defaultList: [
        {
          name: "a42bdcc1178e62b4694c830f028db5c0",
          url:
            "https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar"
        },
        {
          name: "bc7521e033abdd1e92222d733590f104",
          url:
            "https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar"
        }
      ],
      imgName: "",
      visible: false,
      uploadList: []
    };
  },
  methods: {
      handleSuccess () {

      }, 
      handleFormatError () {

      },
      handleMaxSize() {

      },
      handleBeforeUpload () {

      }
  }
};
</script>

<style lang="scss">
.enterprise-info {
    overflow-y: auto;
    & > div {
        margin-bottom: 20px;
        border-radius: 10px;
        background-color: #fff;
    }
    background-color: #f5f5f5;
    &__header {
        padding: 15px 20px;
        border-bottom: 1px #eeeeee solid;
        font-size: 16px;
    }
    &__body {
        width: 400px;
        padding: 30px 20px;
    }
    .avatar-upload {
        display: flex;
        align-items: center;
        .ivu-avatar-large {
            margin-right: 20px; 
            width: 70px;
            height: 70px;
            border-radius: 50%;
        }
    }
    .enterprise-info__pay > .enterprise-info__body > div {
        display: flex;
        margin-bottom: 30px;
        font-size: 15px;
        p {
            width: 80px;
            margin-right: 40px;
            color: #000;
        }
    }
    .pay-btn__wrap {
        margin-top: 40px;
        margin-bottom: 0 !important;
        button {
            margin-right: 30px;
        }
    }
    & > .enterprise-info__action {
        margin-bottom: 0;
        p {
            font-size: 15px;
        }
        div > span {
            display: block;
            margin: 10px 0;
            color: #808695;
        }
        .enterprise-info__header {
            margin-bottom: 20px;
        }
        .enterprise-info__body {
            width: 100%;
            padding: 0 20px;
            padding-bottom: 30px;

        }
        .enterprise_ascription {
            display: flex;
            justify-content: space-between;
            align-items: center;
            div {
                display: flex;
                align-items: center;
                span {
                    display: block;
                    margin-right: 15px;
                    font-size: 14px
                }
            }
        }
    }
}
</style>
