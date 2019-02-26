<template>
  <div class="project-content">
    <div class="icon-list">
      <Icon class="icon" type="ios-list-box-outline"/>
      <div class="add-icon-wrap">
        <Icon class="icon bg-icon" type="md-albums"/>
        <Icon class="icon top-icon" @click="show = true" type="ios-add"/>
      </div>
    </div>

    <p class="project-title">我负责的项目</p>

    <ul class="project-list">

      <li class="project-item" v-for="item in projects" :key="item.name">
        <img src="https://mailimg.teambition.com/logos/cover-demo.jpg">
        <div class="project-mask" @click="toDetail(item.id)">
          <div class="project-mask-header">
            <p class="project-mask-title">{{item.name}}</p>
            <div>
              <Tooltip content="打开设置设置" placement="top">
                <Icon class="icon" type="md-create"/>
              </Tooltip>
            </div>
          </div>
        </div>
      </li>

      <li class="project-item add-project">
        <Icon class="add-icon" @click="show = true" type="ios-add-circle"/>
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
                <Icon class="icon" type="md-create"/>
              </Tooltip>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <Modal :width="400" v-model="show" :footer-hide="true">
      <div class="model-header" slot="header">
        <Icon type="ios-arrow-back"/>
        <p>创建项目</p>
      </div>
      <Form v-if="show" ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="name">
          <Input type="text" v-model="formInline.name" placeholder="项目名称（必填）"/>
        </FormItem>

        <FormItem prop="discription">
          <Input type="textarea" v-model="formInline.discription" placeholder="项目简介（必填）"/>
        </FormItem>

        <FormItem prop="level">
          <Poptip v-model="poptipShow" trigger="click" title="级别" content="content">
            <Input
              style="width:368px"
              :readonly="true"
              type="text"
              v-model="formInline.level"
              placeholder="级别"
            />
            <div class="status-wrap" slot="content">
              <Button @click="changeLevel('普通')" type="success" class="status-btn" ghost>普通</Button>
              <Button @click="changeLevel('紧急')" type="warning" class="status-btn" ghost>紧急</Button>
              <Button @click="changeLevel('非常紧急')" type="error" class="status-btn" ghost>非常紧急</Button>
            </div>
          </Poptip>
        </FormItem>

        <FormItem prop="start_time">
          <DatePicker
            type="date"
            v-model="formInline.start_time"
            placeholder="开始时间"
            style="width: 368px"
          ></DatePicker>
        </FormItem>

        <FormItem prop="end_time">
          <DatePicker
            type="date"
            v-model="formInline.end_time"
            placeholder="结束时间"
            style="width: 368px"
          ></DatePicker>
        </FormItem>

        <FormItem>
          <Button long type="primary" @click="handleSubmit('formInline')">完成并创建</Button>
        </FormItem>
        
      </Form>
    </Modal>
  </div>
</template>

<script>
import qs from "qs";
export default {
  inject:['reload'],
  data() {
    return {
      show: false,
      poptipShow: false,
      formInline: {
        name: "",
        discription: "",
        level: "普通",
        start_time: "",
        end_time: ""
      },
      ruleInline: {
        name: [
          {
            required: true,
            message: "请填写项目名称",
            trigger: "blur"
          }
        ],
        discription: [
          {
            required: true,
            message: "请填写项目简介",
            trigger: "blur"
          }
        ]
      },
      projects: "",
      // options3: {
      //       disabledDate (date) {
      //           return date && date.valueOf() < Date.now() - 86400000;
      //       }
      //   },
      // options4: {
      //   disabledDate (date) {
      //       const disabledDay = date.getDate();
      //       return disabledDay === 15;
      //   }
      // },
    };
  },

  created: function() {
    this.axios
      .get("http://localhost:8090/projects/")
      .then((response) => {
        this.projects=response.data.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  methods: {

    toDetail(projectId){
      this.$router.push({path:"/projectdetail",query:{projectId:projectId}});
    },

    changeLevel(level) {
      this.formInline.level = level;
      this.poptipShow = false;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let data = {
            name: this.formInline.name,
            description: this.formInline.discription,
            level: this.formInline.level,
            state: "未完成",
            start_time: getFormatDate(new Date(this.formInline.start_time)),
            end_time: getFormatDate(new Date(this.formInline.end_time))
          };

          this.axios
            .post("http://localhost:8090/projects/", qs.stringify(data))
            .then(res => {
              if (res.data.code == 200) {
                console.log(res);
                this.$Message.success("创建成功");
                this.show = false;
                this.reload();
              } else {
                this.$Message.error("创建失败");
              }
            })
            .catch(res => {
              console.log(res);
            });
        } else {
          this.$Message.error("创建失败");
        }
      });
    }
  }
};
function getFormatDate(date) {
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate() + 1;
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}
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

