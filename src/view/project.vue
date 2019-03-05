<template>
  <div class="project-content">
    <h3 class="project-title">我负责的项目</h3>

    <ul class="project-list">
      <li
        class="project-item"
        v-for="(item,index) in projects"
        :key="item.name"
        v-if="item.role=='creator'"
      >
        <img :src="imgSrc[imgRandomIndex(index)]">

        <div class="project-mask" @click="toDetail(item.id)">
          <div class="project-mask-level" v-if="item.level=='普通'" style="background-color:#2db7f5"></div>
          <div class="project-mask-level" v-if="item.level=='紧急'" style="background-color:#ff9900"></div>
          <div
            class="project-mask-level"
            v-if="item.level=='非常紧急'"
            style="background-color:#ed4014"
          ></div>
          <div class="project-mask-header">
            <h3 class="project-mask-title">{{item.name}}</h3>
            <div>
              <Tooltip content="删除项目" placement="top">
                <Button
                  class="icon"
                  @click="delProject(item.id)"
                  type="error"
                  shape="circle"
                  icon="md-trash"
                ></Button>
              </Tooltip>
            </div>
          </div>
          <div class="project-mask-body">
            <p
              style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
            >{{item.description}}</p>
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
      <li
        class="project-item"
        v-for="(item,index) in projects"
        :key="item.name"
        v-if="item.role=='member'"
      >
        <!-- <img src="https://mailimg.teambition.com/logos/cover-demo.jpg"> -->
        <img :src="imgSrc[imgRandomIndex(index)]">

        <div class="project-mask" @click="toDetail(item.id)">
          <div class="project-mask-level" v-if="item.level=='普通'" style="background-color:#2db7f5"></div>
          <div class="project-mask-level" v-if="item.level=='紧急'" style="background-color:#ff9900"></div>
          <div
            class="project-mask-level"
            v-if="item.level=='非常紧急'"
            style="background-color:#ed4014"
          ></div>
          <div class="project-mask-header">
            <h3 class="project-mask-title">{{item.name}}</h3>
          </div>
          <div class="project-mask-body">
            <p
              style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
            >{{item.description}}</p>
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
  inject: ["reload"],
  data() {
    return {
      count: 5,
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      show: false,
      levelStyle: {
        background: "red"
      },
      pressDel: false,
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

      imgSrc: [
        "https://images.pexels.com/photos/459654/pexels-photo-459654.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/934011/pexels-photo-934011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/403571/pexels-photo-403571.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      ]
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
    console.log(this.userInfo);
    // count = 5;
    this.axios
      .get("http://localhost:8090/projects/")
      .then(response => {
        this.projects = response.data.data;
        console.log(this.projects);
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  methods: {
    imgRandomIndex(index) {
      return index % 4;
    },
    toDetail(projectId) {
      if (this.pressDel == false) {
        this.$router.push({
          path: "/projectdetail",
          query: { projectId: projectId }
        });
      }
    },
    delProject(projectId) {
      this.pressDel = true;
      this.$Modal.confirm({
        title: "确定删除该项目？",
        content: "<p>确定删除该项目？</p><p>确定删除该项目？</p>",
        onOk: () => {
          this.axios
            .delete("http://localhost:8090/projects/", {
              params: { project_id: projectId }
            })
            .then(response => {
              console.log("response");
              if (response.data.code == 200) {
                this.$Message.success("项目删除成功");
                this.reload();
              } else {
                this.$Message.error("项目删除失败");
              }
            })
            .catch(error => {
              console.log(error);
            });
          this.pressDel = false;
        },
        onCancel: () => {
          this.pressDel = false;
        }
      });
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
        opacity: 0.8;
        -webkit-filter: blur(0.8px);
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
        .project-mask-level {
          width: 100%;
          padding: 0px 0px;
          height: 5px;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }

        .project-mask-header {
          width: 100%;
          padding: 10px 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 18px;
          color: #000;
          .icon:hover {
            font-size: 19px;
            font-weight: bold;
            cursor: pointer;
          }
        }
        .project-mask-body {
          width: 100%;
          padding: 0px 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 15px;
          color: rgb(0, 0, 0);
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
.span {
  display: flex;
  float: right;
}
</style>

