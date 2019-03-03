<template>
  <div>
    <Row>
      <Col span="8">
        <div>
          <Button @click="backhome()" type="text" ghost>
            <Icon type="md-arrow-back" size="30" color="black"/>
          </Button>
        </div>
      </Col>
      <Col span="8">
        <div class="projecttitle">
          <h2 align="center">{{projectInfo.name}}</h2>
        </div>
      </Col>

      <Col span="8">
        <div align="right">
          <Button @click="toFiles()" type="text" ghost>
            <Icon type="ios-folder" size="30" color="black"/>
          </Button>
          <Button @click="showDrawer()" type="text" ghost>
            <Icon type="md-settings" size="30" color="black"/>
          </Button>
        </div>
      </Col>
    </Row>

    <Tabs>
      <TabPane label="任务" icon="md-list-box">
        <Row
          style="margin:10px auto"
          class-name="RowContent"
          type="flex"
          justify="center"
          :gutter="40"
          class="code-row-bg"
        >
          <Col span="8" id="waiting">
            <ul>
              <li class="task-classify-title">
                <h3 justify="center">待分配</h3>
              </li>
              <br>

              <li
                class="task-item"
                v-for="taskitem in tasklist"
                v-if="taskitem.state == '待分配'"
                :key="taskitem.name"
              >
                <Card long>
                  <p slot="title">
                    <Dropdown trigger="click" @on-click="changeState($event,taskitem.id)">
                      <a href="javascript:void(0)">
                        <Icon type="ios-arrow-down"></Icon>
                        {{taskitem.name}}
                      </a>
                      <DropdownMenu slot="list">
                        <DropdownItem name="待分配" disabled >待分配</DropdownItem>
                        <DropdownItem name="进行中" >进行中</DropdownItem>
                        <DropdownItem name="已完成" disabled >已完成</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </p>
                  <a slot="extra">
                    <Button @click="deletetask(taskitem.id)" type="text">
                      <Icon type="ios-trash" size="25"/>
                    </Button>
                    <Button @click="changetask(taskitem.id)" type="text">
                      <Icon type="ios-clipboard" size="25"/>
                    </Button>
                  </a>
                  <ul>
                    <li>负责人：(待分配)</li>
                    <Divider class="div"/>
                    <li>任务简介：{{taskitem.description}}</li>
                  </ul>
                </Card>
                <br>
              </li>

              <li>
                <Button type="primary" @click="createtask = true" long>创建任务</Button>
              </li>
            </ul>
          </Col>

          <Col span="8" id="running">
            <ul>
              <li class="task-classify-title">
                <h3 justify="center">进行中</h3>
              </li>
              <br>

              <li
                class="task-item"
                v-for="taskitem in tasklist"
                v-if="taskitem.state == '进行中'"
                :key="taskitem.id"
              >
                <Card long>
                  <p slot="title">
                    <Dropdown trigger="click" @on-click="changeState($event,taskitem.id)">
                      <a href="javascript:void(0)">
                        <Icon type="ios-arrow-down"></Icon>
                        {{taskitem.name}}
                      </a>
                      <DropdownMenu slot="list">
                        <DropdownItem name="待分配" >待分配</DropdownItem>
                        <DropdownItem name="进行中" disabled >进行中</DropdownItem>
                        <DropdownItem name="已完成" >已完成</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </p>
                  <a slot="extra">
                    <Button @click="deletetask(taskitem.id)" type="text">
                      <Icon type="ios-trash" size="25"/>
                    </Button>
                    <Button @click="changetask(taskitem.id)" type="text">
                      <Icon type="ios-clipboard" size="25"/>
                    </Button>
                  </a>
                  <ul>
                    <li>负责人：{{taskitem.owner_name}}</li>
                    <Divider class="div"/>
                    <li>任务简介：{{taskitem.description}}</li>
                  </ul>
                </Card>
                <br>
              </li>
            </ul>
          </Col>

          <Col span="8" id="finished">
            <ul>
              <li class="task-classify-title">
                <h3 justify="center">已完成</h3>
              </li>
              <br>

              <li
                class="task-item"
                v-for="taskitem in tasklist"
                v-if="taskitem.state == '已完成'"
                :key="taskitem.name"
              >
                <Card long>
                  <p slot="title">
                    <Dropdown trigger="click" @on-click="changeState($event,taskitem.id)">
                      <a href="javascript:void(0)">
                        <Icon type="ios-arrow-down"></Icon>
                        {{taskitem.name}}
                      </a>
                      <DropdownMenu slot="list">
                        <DropdownItem name="待分配" >待分配</DropdownItem>
                        <DropdownItem name="进行中" >进行中</DropdownItem>
                        <DropdownItem name="已完成" disabled >已完成</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </p>
                  <a slot="extra">
                    <Button @click="deletetask(taskitem.id)" type="text">
                      <Icon type="ios-trash" size="25"/>
                    </Button>
                    <Button @click="createtask = true" type="text">
                      <Icon type="ios-clipboard" size="25"/>
                    </Button>
                  </a>
                  <ul>
                    <li>负责人：{{taskitem.owner_name}}</li>
                    <Divider class="div"/>
                    <li>任务简介：{{taskitem.description}}</li>
                  </ul>
                </Card>
                <br>
              </li>
            </ul>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="文件" icon="md-folder">
        <Table border :columns="fileColumns" :data="fileData" size="large"></Table>
      </TabPane>
    </Tabs>

    <Modal :width="400" v-model="createtask" :footer-hide="true">
      <div class="model-header" slot="header">
        <p>创建任务</p>
      </div>
      <Form v-if="createtask" ref="taskinfo" :model="taskinfo" :rules="ruleInline">

        任务名称（必填）
        <FormItem prop="name">
          <Input type="text" v-model="taskinfo.name" placeholder="任务名称（必填）" clearable/>
        </FormItem>

        任务简介
        <FormItem prop="description">
          <Input
            type="textarea"
            rows="4"
            v-model="taskinfo.description"
            placeholder="任务简介"
            clearable
          />
        </FormItem>

        任务级别
        <FormItem prop="level">
          <Poptip v-model="poptipShow" trigger="click" title="级别" content="content">
            <Input
              style="width:368px"
              :readonly="true"
              type="text"
              v-model="taskinfo.level"
              placeholder="级别"
            />
            <div class="status-wrap" slot="content">
              <Button @click="changeLevel('普通')" type="success" class="status-btn" ghost>普通</Button>
              <Button @click="changeLevel('紧急')" type="warning" class="status-btn" ghost>紧急</Button>
              <Button @click="changeLevel('非常紧急')" type="error" class="status-btn" ghost>非常紧急</Button>
            </div>
          </Poptip>
        </FormItem>

        开始时间
        <FormItem prop="start_time">
          <DatePicker
            options="start_date_limit"
            type="date"
            v-model="taskinfo.start_time"
            placeholder="开始时间"
            style="width: 368px"
          ></DatePicker>
        </FormItem>

        结束时间
        <FormItem prop="end_time">
          <DatePicker
            options="finish_date_limit"
            type="date"
            v-model="taskinfo.end_time"
            placeholder="结束时间"
            style="width: 368px"
          ></DatePicker>
        </FormItem>

        <FormItem>
          <Button long type="success" @click="createsubmit('taskinfo')">创建任务</Button>
        </FormItem>
      </Form>
    </Modal>

    <Modal :width="400" v-model="changetaskmodel" :footer-hide="true">
      <div class="model-header" slot="header">
        <p>修改任务</p>
      </div>

      <Form v-if="changetaskmodel" ref="taskinfo" :model="taskinfo" :rules="ruleInline">
        任务名称（必填）
        <FormItem prop="name">
          <Input type="text" v-model="taskinfo.name" clearable/>
        </FormItem>

        任务简介
        <FormItem prop="description">
          <Input
            type="textarea"
            rows="4"
            v-model="taskinfo.description"
            clearable
          />
        </FormItem>
        
        任务级别
        <FormItem prop="level">
          <Poptip v-model="poptipShow" trigger="click" title="级别" content="content">
            <Input
              style="width:368px"
              :readonly="true"
              type="text"
              v-model="taskinfo.level"
            />
            <div class="status-wrap" slot="content">
              <Button @click="changeLevel('普通')" type="success" class="status-btn" ghost>普通</Button>
              <Button @click="changeLevel('紧急')" type="warning" class="status-btn" ghost>紧急</Button>
              <Button @click="changeLevel('非常紧急')" type="error" class="status-btn" ghost>非常紧急</Button>
            </div>
          </Poptip>
        </FormItem>
        
        开始时间
        <FormItem prop="start_time">
          <DatePicker
            options="start_date_limit"
            type="date"
            v-model="taskinfo.start_time"
            style="width: 368px"
          ></DatePicker>
        </FormItem>

        结束时间
        <FormItem prop="end_time">
          <DatePicker
            options="finish_date_limit"
            type="date"
            v-model="taskinfo.end_time"
            style="width: 368px"
          ></DatePicker>
        </FormItem>

        
        <FormItem prop="owner_id" v-if="taskinfo.state != '待分配'">
          负责人(必选)
          <Select v-model="taskinfo.owner_id" >
            <Option
              v-for="memberitem in projectmembers"
              :key="memberitem.id"
              :value="memberitem.id"
            >{{memberitem.name}}</Option>
          </Select>
        </FormItem>

        <FormItem>
          <Button long type="success" @click="changeSubmit('taskinfo')">保存修改</Button>
        </FormItem>
      </Form>
    </Modal>

    <Modal :width="400" v-model="chooseMember" :footer-hide="true">
      <div class="model-header" slot="header">
        <p>选择负责人</p>
      </div>
      <Form v-if="chooseMember" ref="taskinfo" :model="taskinfo" :rules="ruleInline">
        <FormItem prop="owner_id">
          <Select v-model="taskinfo.owner_id" placeholder="负责人(必选)">
            <Option
              v-for="memberitem in projectmembers"
              :key="memberitem.id"
              :value="memberitem.id"
            >{{memberitem.name}}</Option>
          </Select>
        </FormItem>

        <FormItem>
          <Button long type="success" @click="memberSubmit('taskinfo')">确认</Button>
        </FormItem>
      </Form>
    </Modal>

    <Drawer
      title="项目详情"
      v-model="DrawerValue1"
      width="400"
      :styles="styles"
      :transfer="false"
      :inner="true"
      :mask="false"
    >
      <Divider orientation="center">项目详情</Divider>
      <Form :model="formItem" label-position="top">
        <FormItem label="项目名称">
          <Input v-model="formItem.projectName" placeholder="输入项目名称"></Input>
        </FormItem>

        <FormItem label="项目简介">
          <Input
            v-model="formItem.projectDesc"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="输入项目简介"
          ></Input>
        </FormItem>

        <FormItem label="项目级别">
          <Select v-model="formItem.level">
            <Option value="普通">普通</Option>
            <Option value="紧急">紧急</Option>
            <Option value="非常紧急">非常紧急</Option>
          </Select>
        </FormItem>

        <FormItem label="时间">
          <Row>
            <Col span="11" align="center">
              <DatePicker size="large" type="date" placeholder="开始日期" v-model="formItem.start_time"></DatePicker>
            </Col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="11" align="center">
              <DatePicker size="large" type="date" placeholder="结束日期" v-model="formItem.end_time"></DatePicker>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <div align="center">
            <Button type="primary">修改</Button>
            <Button style="margin-left: 8px" @click="DrawerValue1=false">取消</Button>
          </div>
        </FormItem>
      </Form>

      <Divider orientation="center">项目成员</Divider>
      <ul>
        <li v-for="member in projectmembers" :key="member">
          <Card long v-model="show">
            <Row type="flex" justify="center" align="middle">
              <Col span="12">
                <div>
                  <h3>{{ member.name }}</h3>
                  <h5>{{ member.email }}</h5>
                </div>
              </Col>
              <Col span="12" align="right">
                <h3 v-if="member.role=='creator'">创建者</h3>
                <Button
                  type="error"
                  size="small"
                  shape="circle"
                  icon="md-close"
                  v-if="member.role=='member'"
                ></Button>
              </Col>
            </Row>
          </Card>
        </li>
      </ul>
      <br>

      <Form :model="formInvite" :rules="inviteRule">
        <FormItem prop="emailInvite">
          <Input v-model="formInvite.emailInvite" size="large" placeholder="输入邮箱添加项目成员..."/>
        </FormItem>

        <FormItem>
          <Button type="success" @click="inviteMember()" long>邀请</Button>
        </FormItem>
      </Form>
    </Drawer>
  </div>
</template>

<script>
import qs from "qs";
export default {
  inject: ["reload"],
  data() {
    return {
      //wsg
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      projectInfo: "",
      projectId: "",
      projectmembers: "",
      ProjectInfoDraw: false,
      Message: false,
      DrawerValue1: false,
      uploadData:{
        project_id:this.$route.query.projectId
      },
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      formInvite: {
        emailInvite: ""
      },
      inviteRule: {
        emailInvite: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" }
        ]
      },
      formItem: {
        projectName: "",
        projectDesc: "",
        level: "",
        start_time: "",
        end_time: ""
      },
      fileColumns: [
        {
          title: "文件名",
          key: "name",
          width: 600,
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.name)
            ]);
          }
        },
        {
          title: "上传者",
          key: "creator"
        },
        {
          title: "上传时间",
          key: "create_time"
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "6px"
                  },
                  on: {
                    click: () => {
                      this.download(params.index);
                    }
                  }
                },
                "下载"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],

      fileData: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park"
        }
      ],

      //shz
      createtask: false,
      changetaskmodel: false,
      poptipShow: false,
      chooseMember: false,
      taskinfo: {
        created: "",
        description: "",
        end_time: "",
        id: "",
        level: "普通",
        name: "",
        owner_id: "",
        start_time: "",
        state: "",
      },
      ruleInline: {
        name: [
          {
            required: true,
            message: "请填写任务名称",
            trigger: "blur"
          }
        ]
      },
      tasklist: "",
      value1: false,
      start_date_limit: {
          disabledDate (date) {
              return date && date.valueOf() < Date.now() - 86400000;
          },
      },
      finish_date_limit: {
          disabledDate (date) {
              return date && date.valueOf() < this.taskinfo.start_time.valueOf();
          },
      },
    };
  },
  //渲染task
  created: function() {
    console.log(this.userInfo);
    //获取跳转页面带来的projectId
    this.projectId = this.$route.query.projectId;

    //获取项目详情和任务列表
    this.axios
      .get("http://localhost:8090/projects/tasks", {
        params: { project_id: this.projectId }
      })
      .then(response => {
        if (response.data.code == 200) {
          console.log(response);
          this.projectInfo = response.data.data.project;
          this.tasklist = response.data.data.tasks;
          this.projectmembers = response.data.data.members;
          console.log("tasklist:");
          console.log(this.tasklist);
          console.log("projectmembers:");
          console.log(this.projectmembers);
        } else {
          this.$Message.error("权限错误");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  methods: {
    showDrawer() {
      this.DrawerValue1 = true;
      this.formItem.projectName = this.projectInfo.name;
      this.formItem.projectDesc = this.projectInfo.description;
      this.formItem.level = this.projectInfo.level;
      this.formItem.start_time = this.projectInfo.start_time;
      this.formItem.end_time = this.projectInfo.end_time;
    },
    backhome() {
      this.$router.back(-1);
    },
    inviteMember() {
      console.log(this.formInvite.emailInvite);
      let data = {
        project_id: this.projectId,
        email: this.formInvite.emailInvite
      };

      this.axios
        .post("http://localhost:8090/invitations", qs.stringify(data))
        .then(response => {
          console.log(response);
          if (response.data.code == 200) {
            console.log(response);
            this.$Modal.success({
              title: "邀请成功",
              content: "等待对方确认"
            });
          } else {
            this.$Modal.error({
              title: "邀请失败",
              content: response.data.message
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    changeLevel(level) {
      this.taskinfo.level = level;
      this.poptipShow = false;
    },
    createsubmit(name) {
      // 审核数据
      this.$refs[name].validate(valid => {
        if (valid) {
          // 建数据包
          let data = {
            project_id: this.projectId,
            name: this.taskinfo.name,
            description: this.taskinfo.description,
            level: this.taskinfo.level,
            //state: "待分配",
            start_time: getFormatDate(new Date(this.taskinfo.start_time)),
            end_time: getFormatDate(new Date(this.taskinfo.end_time)),
            //owner_id: this.taskinfo.owner_id,
          };
          console.log("data",data);
          // POST
          this.axios
            .post("http://localhost:8090/projects/tasks/", qs.stringify(data))
            .then(response => {
              console.log(response);
              if (response.data.code == 200) {
                this.$Message.success("任务创建成功");
                this.createtask = false;
                this.reload();
              } else {
                this.$Message.error("任务创建失败");
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.$Message.error("创建失败");
        }
      });
    },

    changetask(taskid)
    {
      for(var taskitem in this.tasklist){
        if(this.tasklist[taskitem].id == taskid){
          this.taskinfo = this.tasklist[taskitem];
          break;
        };
      };
      this.changetaskmodel = true;
    },

    changeSubmit()
    {
      console.log("change task:", this.taskinfo.id);
      console.log(this.taskinfo)
      this.$Modal.confirm({
        title: "确定保存修改？",
        content: "<p>修改后将无法恢复！！！</p>",
        onOk: () => {
          let data = this.taskinfo;
          data.project_id = this.projectId;
          data.task_id = this.taskinfo.id;
          data.start_time = getFormatDate(data.start_time);
          data.end_time = getFormatDate(data.end_time);
          console.log(data);
          this.axios
            .put("http://localhost:8090/projects/tasks?="+qs.stringify(data))
            .then((response) =>{
              if (response.data.code == 200) {
                  this.$Message.success("任务修改成功");
                  this.changetaskmodel = false;
                  this.reload();
              } else {
                this.$Message.error("任务修改失败");
              }
             
            })
            .catch(error => {
              console.log(error);
            });
        },
        onCancel: () => {
          this.$Message.error("任务修改取消");
        }
      });
    },

    changeState(newstate,taskid){
      for(var taskitem in this.tasklist){
        if(this.tasklist[taskitem].id == taskid){
          this.taskinfo = this.tasklist[taskitem];
          break;
        };
      };
      if(this.taskinfo.state == "待分配"){
        this.chooseMember = true;
      }
      else{
        let data = this.taskinfo;
        data.project_id = this.projectId;
        data.task_id = this.taskinfo.id;
        if(newstate == "待分配"){
            data.owner_id = "";
        };
        data.state = newstate;
        console.log(data);
        this.axios
          .put("http://localhost:8090/projects/tasks?="+qs.stringify(data))
          .then((response) =>{
            if (response.data.code == 200) {
                this.$Message.success("任务状态修改成功");
                this.reload();
            } else {
              this.$Message.error("任务状态修改失败");
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },

    memberSubmit(name)
    {
      console.log("确认负责人")
      let data = {
        task_id: this.taskinfo.id,
        project_id: this.projectId,
        owner_id: this.taskinfo.owner_id,
      }
      console.log(data);
      this.axios
        .post("http://localhost:8090/projects/members/", qs.stringify(data))
        .then((response) =>{
          if (response.data.code == 200) {
              // 修改状态
              this.$Message.success("负责人确定成功");
              this.reload();
            } else {
              this.$Message.error("负责人确定失败");
            }
          this.chooseMember = false;
        })
        .catch(error => {
          this.chooseMember = false;
          console.log(error);
        });
    },

    deletetask(taskid) {
      console.log("delete task:", taskid);
      this.$Modal.confirm({
        title: "确定删除该任务？",
        content: "<p>删除后将无法恢复！！！</p>",
        onOk: () => {
          let data = {
            project_id: this.projectId,
            task_id: String(taskid)
          };
          this.axios
            .delete("http://localhost:8090/projects/tasks/", { params: data })
            .then(response => {
              console.log("response");
              if (response.data.code == 200) {
                this.$Message.success("任务删除成功");
                this.reload();
              } else {
                this.$Message.error("任务删除失败");
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        onCancel: () => {
          this.$Message.error("任务删除取消");
        }
      });      
    },
    handleSuccess (res, file) {
                console.log(res);
                console.log(file.url)
            },
    handleError(res,file){
      console.log(res);
                console.log(file)
    },
    download(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.data6[index].name}<br>Age：${
          this.data6[index].age
        }<br>Address：${this.data6[index].address}`
      });
    },
    remove(index) {
      this.data6.splice(index, 1);
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

<style scoped lang="scss">
.RowContent {
  margin: 10px auto;
}
.task-classify-title {
  margin-left: 14px;
  font-size: 18px;
  color: #333;
}
.projecttitle {
  font-style: "Hiragino Sans GB";
  color: #464c5b;
  font-size: 20px;
}
.div {
  margin: 10px;
}
</style>