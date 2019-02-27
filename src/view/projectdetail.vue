<template>
  <div>
    <Row>
      <Col span="6" offset="8">
        <div class="projecttitle">
          <p align="center">{{projectInfo.name}}</p>
        </div>
      </Col>
      <Col span="6" offset="4">
        <div align="right">
          <Button @click="ProjectInfoDraw = true" type="text" ghost>
            <Icon type="md-person-add" size="30" color="black"/>
          </Button>
          <Button @click="Message = true" type="text" ghost>
            <Icon type="ios-chatboxes" size="30" color="black"/>
          </Button>
        </div>
      </Col>
    </Row>

    <br>
    <Row type="flex" justify="center" :gutter="40">
      <Col span="8" id="waiting">
        <ul>
          <li class="task-classify-title">
            <p justify="center">待分配</p>
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
                <Dropdown>
                  <a href="javascript:void(0)">
                    <Icon type="ios-arrow-down"></Icon>
                    {{taskitem.name}}
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem disabled>待分配</DropdownItem>
                    <DropdownItem>进行中</DropdownItem>
                    <DropdownItem>已完成</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </p>
              <a slot="extra">
                <Button @click="deletetask(taskitem.id)" type="text">
                  <Icon type="ios-trash" size="25"/>
                </Button>
                <Button @click="changetask = true" type="text">
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

          <li>
            <Button type="primary" @click="createtask = true" long>创建任务</Button>
          </li>
        </ul>
      </Col>

      <Col span="8" id="running">
        <ul>
          <li class="task-classify-title">
            <p justify="center">进行中</p>
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
                <Dropdown>
                  <a href="javascript:void(0)">
                    <Icon type="ios-arrow-down"></Icon>
                    {{taskitem.name}}
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem>待分配</DropdownItem>
                    <DropdownItem disabled>进行中</DropdownItem>
                    <DropdownItem>已完成</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </p>
              <a slot="extra">
                <Button @click="deletetask(taskitem.id)" type="text">
                  <Icon type="ios-trash" size="25"/>
                </Button>
                <Button @click="changetask = true" type="text">
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
            <p justify="center">已完成</p>
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
                <Dropdown>
                  <a href="javascript:void(0)">
                    <Icon type="ios-arrow-down"></Icon>
                    {{taskitem.name}}
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem>待分配</DropdownItem>
                    <DropdownItem>进行中</DropdownItem>
                    <DropdownItem disabled>已完成</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </p>
              <a slot="extra">
                <Button @click="deletetask(taskitem.id)" type="text">
                  <Icon type="ios-trash" size="25"/>
                </Button>
                <Button @click="changetask = true" type="text">
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

    <Modal :width="400" v-model="createtask" :footer-hide="true">
      <div class="model-header" slot="header">
        <p>创建任务</p>
      </div>
      <Form v-if="createtask" ref="taskinfo" :model="taskinfo" :rules="ruleInline">
        <FormItem prop="name">
          <Input type="text" v-model="taskinfo.name" placeholder="任务名称（必填）" clearable/>
        </FormItem>

        <FormItem prop="description">
          <Input
            type="textarea"
            rows="4"
            v-model="taskinfo.description"
            placeholder="任务简介"
            clearable
          />
        </FormItem>

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

        <FormItem prop="start_time">
          <DatePicker
            options="start-date-limit"
            type="date"
            v-model="taskinfo.start_time"
            placeholder="开始时间"
            style="width: 368px"
          ></DatePicker>
        </FormItem>

        <FormItem prop="end_time">
          <DatePicker
            options="finish-date-limit"
            type="date"
            v-model="taskinfo.end_time"
            placeholder="结束时间"
            style="width: 368px"
          ></DatePicker>
        </FormItem>

        <FormItem prop="owner_id">
          <Select v-model="taskinfo.member" placeholder="负责人(必选)">
            <Option v-for="memberitem in projectmember" :key="memberitem.id" :value="memberitem.id">{{memberitem.name}}</Option>
          </Select>
        </FormItem>

        <FormItem>
          <Button long type="success" @click="createsubmit('taskinfo')">完成并创建</Button>
        </FormItem>
      </Form>
    </Modal>

    <Drawer title="项目详情" v-model="ProjectInfoDraw" width="500" :styles="styles" :transfer="false">
      <Form :model="formItem">
        <FormItem label="Input">
          <Input v-model="formItem.input" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="Select">
          <Select v-model="formItem.select">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="DatePicker">
          <Row>
            <Col span="11">
              <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
            </Col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="11">
              <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="Radio">
          <RadioGroup v-model="formItem.radio">
            <Radio label="male">Male</Radio>
            <Radio label="female">Female</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="Checkbox">
          <CheckboxGroup v-model="formItem.checkbox">
            <Checkbox label="Eat"></Checkbox>
            <Checkbox label="Sleep"></Checkbox>
            <Checkbox label="Run"></Checkbox>
            <Checkbox label="Movie"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="Switch">
          <i-switch v-model="formItem.switch" size="large">
            <span slot="open">On</span>
            <span slot="close">Off</span>
          </i-switch>
        </FormItem>
        <FormItem label="Slider">
          <Slider v-model="formItem.slider" range></Slider>
        </FormItem>
        <FormItem label="Text">
          <Input
            v-model="formItem.textarea"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem>
          <Button type="primary">Submit</Button>
          <Button style="margin-left: 8px">Cancel</Button>
        </FormItem>
      </Form>
    </Drawer>

    <Drawer title="项目详情" v-model="ProjectInfoDraw" width="500" :styles="styles" :transfer="false">
      <Form :model="formItem">
        <FormItem label="Input">
          <Input v-model="formItem.input" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="Select">
          <Select v-model="formItem.select">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="DatePicker">
          <Row>
            <Col span="11">
              <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
            </Col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="11">
              <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="Radio">
          <RadioGroup v-model="formItem.radio">
            <Radio label="male">Male</Radio>
            <Radio label="female">Female</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="Checkbox">
          <CheckboxGroup v-model="formItem.checkbox">
            <Checkbox label="Eat"></Checkbox>
            <Checkbox label="Sleep"></Checkbox>
            <Checkbox label="Run"></Checkbox>
            <Checkbox label="Movie"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="Switch">
          <i-switch v-model="formItem.switch" size="large">
            <span slot="open">On</span>
            <span slot="close">Off</span>
          </i-switch>
        </FormItem>
        <FormItem label="Slider">
          <Slider v-model="formItem.slider" range></Slider>
        </FormItem>
        <FormItem label="Text">
          <Input
            v-model="formItem.textarea"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem>
          <Button type="primary">Submit</Button>
          <Button style="margin-left: 8px">Cancel</Button>
        </FormItem>
      </Form>
    </Drawer>

  </div>
</template>

<script>
import qs from "qs";
export default {
  inject:['reload'],
  data() {
    return {
      //wsg
      projectInfo: "",
      projectId: "",
      projectmember: "",
      ProjectInfoDraw: false,
      Message: false,
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      formItem: {
        input: "",
        select: "",
        radio: "male",
        checkbox: [],
        switch: true,
        date: "",
        time: "",
        slider: [20, 50],
        textarea: ""
      },

      //shz
      createtask: false,
      changetask: false,
      poptipShow: false,
      taskinfo: {
        name: "",
        description: "",
        level: "普通",
        start_time: "",
        end_time: "",
        member: ""
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
      value1: false
      // start-date-limit: {
      //     disabledDate (date) {
      //         return date && date.valueOf() < Date.now() - 86400000;
      //     }
      // },
      // finish-date-limit: {
      //     disabledDate (date) {
      //         return date && date.valueOf() < Date.now() - 86400000;
      //     }
      // },
    };
  },
  //渲染task
  created: function() {
    //获取跳转页面带来的projectId
    this.projectId = this.$route.query.projectId;
    console.log(this.projectId);
    //获取task
    this.axios
      .get("http://localhost:8090/projects/tasks", {
        params: { project_id: this.projectId }
      })
      .then(response => {
        if (response.data.code == 200) {
          this.projectInfo = response.data.data.project;
          this.tasklist = response.data.data.tasks;
          this.projectmember = response.data.data.members;
          console.log("tasklist:");
          console.log(this.tasklist);
          console.log("projectmember:");
          console.log(this.projectmember);
        } else {
          this.$Message.error("权限错误");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  methods: {
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
            state: "待分配",
            start_time: getFormatDate(new Date(this.taskinfo.start_time)),
            end_time: getFormatDate(new Date(this.taskinfo.end_time)),
            owner_id: this.taskinfo.member,
          };
          console.log(data);
          // POST
          this.axios
            .post("http://localhost:8090/projects/tasks/", qs.stringify(data))
            .then((response) => {
              console.log(response);
              if (response.data.code == 200) {
                console.log(111);
                this.$Message.success("任务创建成功");
                this.createtask = false;
                this.reload();
              } else {
                this.$Message.error("任务创建失败");
              }
            }).catch(error => {
              console.log(error);
            });
        } else {
          this.$Message.error("创建失败");
        }
      });
    },

    deletetask(taskid) {
      console.log("delete task:",taskid);
      let data = {
        project_id: this.projectId,
        task_id: String(taskid),
      };
      console.log(data);
      this.axios
        .delete("http://localhost:8090/projects/tasks/", {params:data})
        .then((response) => {
          console.log("response");
          if (response.data.code == 200) {
            this.$Message.success("任务删除成功");
            this.reload();
          } else {
            this.$Message.error("任务删除失败");
          }
        }).catch(error => {
          console.log(error);
        });
    },
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