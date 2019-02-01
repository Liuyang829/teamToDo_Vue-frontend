<template>
    <div class="project-content">
        <div class="icon-list">
            <Icon class="icon" type="ios-list-box-outline" />
            <div class="add-icon-wrap">
                <Icon class="icon bg-icon" type="md-albums" />
                <Icon class="icon top-icon" @click="show = true" type="ios-add" />
            </div>
        </div>
        <p class="project-title">我负责的项目</p>
        <ul class="project-list">
            <li class="project-item">
                <img src="https://mailimg.teambition.com/logos/cover-demo.jpg">
                <div class="project-mask">
                    <div class="project-mask-header">
                        <p class="project-mask-title">产品进展</p>
                        <div>
                            <Tooltip content="打开设置设置" placement="top">
                                <Icon class="icon" type="md-create" />
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </li>
            <li class="project-item add-project">
                <Icon class="add-icon" type="ios-add-circle" />
                <p>创建新项目</p>
            </li>
        </ul>
        <p class="project-title">我参与的项目</p>
        <ul class="project-list">
            <li class="project-item">
                <img src="https://mailimg.teambition.com/logos/cover-demo.jpg">
                <div class="project-mask">
                    <div class="project-mask-header">
                        <p class="project-mask-title">产品进展</p>
                        <div>
                            <Tooltip content="打开设置设置" placement="top">
                                <Icon class="icon" type="md-create" />
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <Modal :width="400" v-model="show" :footer-hide="true">
            <div class="model-header" slot="header">
                <Icon type="ios-arrow-back" />
                <p>创建项目</p>
            </div>
            <Form v-if="show" ref="formInline" :model="formInline" :rules="ruleInline">
                <FormItem prop="name">
                    <Input type="text" v-model="formInline.name" placeholder="项目名称（必填）"/>
                </FormItem>
                <FormItem prop="dec">
                    <Input type="textarea" v-model="formInline.password" placeholder="项目简介（必填）"/>
                </FormItem>
                <FormItem>
                    <Poptip v-model="poptipShow" trigger="click" title="状态" content="content">
                        <Input style="width:368px"  :readonly="true" type="text" v-model="formInline.status" placeholder="状态"/>
                        <div class="status-wrap" slot="content">
                            <Button @click="changeStatus('普通')" type="success" class="status-btn" ghost>普通</Button>
                            <Button @click="changeStatus('紧急')" type="warning" class="status-btn" ghost>紧急</Button>
                            <Button @click="changeStatus('非常紧急')" type="error" class="status-btn" ghost>非常紧急</Button>
                        </div>
                    </Poptip>
                </FormItem>
                <FormItem>
                    <DatePicker type="date" placeholder="开始时间" style="width: 368px"></DatePicker>
                </FormItem>
                <FormItem>
                    <DatePicker type="date" placeholder="结束时间" style="width: 368px"></DatePicker>
                </FormItem>
                <FormItem>
                    <Button long type="primary" @click="handleSubmit('formInline')">完成并创建</Button>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      poptipShow: false,
      formInline: {
        name: "",
        dec: "",
        status: "普通"
      },
      ruleInline: {
        name: [
          {
            required: true,
            message: "请填写项目名称",
            trigger: "blur"
          }
        ],
        dec: [
          {
            required: true,
            message: "请填写项目简介",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    changeStatus(status) {
      this.formInline.status = status;
      this.poptipShow = false;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("创建成功");
        } else {
          this.$Message.error("创建失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.project-content {
  position: relative;
  .icon {
    cursor: pointer;
  }
  .icon-list {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    top: -20px;
    font-size: 24px;
    div {
      margin-left: 10px;
      width: 24px;
      height: 24px;
      position: relative;
      .bg-icon,
      .top-icon {
        position: absolute;
      }
      .top-icon {
        top: 1px;
        left: 2px;
        color: #fff;
        z-index: 99;
      }
    }
  }
  .project-title {
    margin-left: 14px;
    font-size: 18px;
    color: #333;
  }
  .project-list {
    list-style: none;
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
    margin-bottom: 20px;
    .project-item {
      position: relative;
      margin: 14px;
      width: 254px;
      height: 128px;
      border-radius: 5px;
      cursor: pointer;
      border: 1px solid rgba($color: #000000, $alpha: 0.15);
      transform: translateY(0);
      transition: transform 0.218s ease;
      background-color: #fff;
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 12px 2px rgba($color: #000000, $alpha: 0.1);
      }
      img {
        width: 100%;
        height: 100%;
      }
      &.add-project {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        .add-icon {
          margin-bottom: 10px;
          font-size: 46px;
        }
        &:hover {
          color: #3da8f5;
        }
      }
      .project-mask {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        border-radius: 5px;
        .icon {
          opacity: 0;
          transition: all 0.5s;
        }
        &:hover .icon {
          opacity: 1;
        }
        .project-mask-header {
          width: 100%;
          padding: 10px 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 18px;
          color: #fff;
          .icon:hover {
            font-size: 19px;
            font-weight: bold;
            cursor: pointer;
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 1199px) {
  .project-content {
    width: 296px * 3 + 14px * 6;
    .project-item {
      width: 296px !important;
      height: 148px !important;
    }
  }
}
.status-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .status-btn {
    display: block;
    margin: 10px auto;
  }
}
.model-header {
  display: flex;
  align-items: center;
  font-size: 18px;
  text-align: center;
}
</style>

