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
          <Button @click="DrawerValue1 = true" type="text"  ghost>
            <Icon type="md-person-add" size="30" color="black"/>
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
          <br/>

          <li class="task-item">
            <Card long>
              <p slot="title">
                <Dropdown>
                  <a href="javascript:void(0)">
                    <Icon type="ios-arrow-down"></Icon> 任务名称
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem disabled>待分配</DropdownItem>
                    <DropdownItem>进行中</DropdownItem>
                    <DropdownItem>已完成</DropdownItem>
                  </DropdownMenu>
                </Dropdown> 
              </p>
              <a @click="createtask = true" slot="extra" @click.prevent="changeLimit">
                <Icon type="ios-loop-strong"></Icon>+ 详细
              </a>
              <ul>
                <li> 任务简介 </li>
              </ul>
            </Card>

            <br/>
          </li>

          <li class="task-item" v-for="taskitem in tasklist" v-if="taskitem.state = 待分配" :key="taskitem.name">
            <Card long>
              <p slot="title">
                <Dropdown>
                  <a href="javascript:void(0)">
                    <Icon type="ios-arrow-down"></Icon> {{taskitem.name}}
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem disabled>待分配</DropdownItem>
                    <DropdownItem>进行中</DropdownItem>
                    <DropdownItem>已完成</DropdownItem>
                  </DropdownMenu>
                </Dropdown> 
              </p>
              <a @click="changetask = true" slot="extra" @click.prevent="changeLimit">
                <Icon type="ios-loop-strong"></Icon>+ 详细
              </a>
              <ul>
                <li> {{taskitem.description}} </li>
              </ul>
            </Card>
            <br/>
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
          <br/>

          <li class="task-item" v-for="taskitem in tasklist" v-if="taskitem.state = 进行中" :key="taskitem.name">
            <Card long>
              <p slot="title">
                <Dropdown>
                  <a href="javascript:void(0)">
                    <Icon type="ios-arrow-down"></Icon> {{taskitem.name}}
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem>待分配</DropdownItem>
                    <DropdownItem disabled>进行中</DropdownItem>
                    <DropdownItem>已完成</DropdownItem>
                  </DropdownMenu>
                </Dropdown> 
              </p>
              <a @click="changetask = true" slot="extra" @click.prevent="changeLimit">
                <Icon type="ios-loop-strong"></Icon>+ 详细
              </a>
              <ul>
                <li> {{taskitem.description}} </li>
              </ul>
            </Card>
            <br/>
          </li>

        </ul>
      </Col>

      <Col span="8" id="finished">
        <ul>
          <li class="task-classify-title">
            <p justify="center">已完成</p>
          </li>
          <br/>

          <li class="task-item" v-for="taskitem in tasklist" v-if="taskitem.state = 已完成" :key="taskitem.name">
            <Card long>
              <p slot="title">
                <Dropdown>
                  <a href="javascript:void(0)">
                    <Icon type="ios-arrow-down"></Icon> {{taskitem.name}}
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem>待分配</DropdownItem>
                    <DropdownItem>进行中</DropdownItem>
                    <DropdownItem disabled>已完成</DropdownItem>
                  </DropdownMenu>
                </Dropdown> 
              </p>
              <a @click="changetask = true" slot="extra" >
                <Icon type="ios-loop-strong"></Icon>+ 详细
              </a>
              <ul>
                <li> {{taskitem.description}} </li>
              </ul>
            </Card>
            <br/>
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

        <FormItem prop="discription">
          <Input type="textarea" :rows="4" v-model="taskinfo.discription" placeholder="任务简介" clearable/>
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

        <FormItem label="Select">
          <Select v-model="taskinfo.member" placeholder="负责人(必选)">
              <!--Option vue-for="member in projectInfo.member." >{{member.name}}</Option-->
          </Select>
        </FormItem>

        <FormItem>
          <Button long type="success" @click="handleSubmit('taskinfo')">完成并创建</Button>
        </FormItem>
        
      </Form>
    </Modal>

    <Modal :width="400" v-model="createtask" :footer-hide="true">
      <div class="model-header" slot="header">
        <p>创建任务</p>
      </div>
      <Form v-if="createtask" ref="taskinfo" :model="taskinfo" :rules="ruleInline">
        <FormItem prop="name">
          <Input type="text" v-model="taskinfo.name" placeholder="任务名称（必填）" clearable/>
        </FormItem>

        <FormItem prop="discription">
          <Input type="textarea" :rows="4" v-model="taskinfo.discription" placeholder="任务简介" clearable/>
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

        <FormItem label="Select">
          <Select v-model="taskinfo.member" placeholder="负责人(必选)">
              <!--Option vue-for="member in projectInfo.member." >{{member.name}}</Option-->
          </Select>
        </FormItem>

        <FormItem>
          <Button long type="success" @click="handleSubmit('taskinfo')"保存</Button>
        </FormItem>
        
      </Form>
    </Modal>

    <Drawer title="项目详情" v-model="DrawerValue1" width="500"  :styles="styles" transfer="false">
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
    </Drawer-->
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      //projectid:

      //wsg
      projectInfo: "",
      show: true,
      DrawerValue1: false,
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
        discription: "",
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
        ],
      },
      tasklist: "",
      value1: false,
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
    this.projectInfo = this.$route.params.item;
    this.axios.get("http://localhost:8090/projects/tasks?project_id=" + this.projectInfo.id).then((response) => {
      if(response.data.code==200) {
        this.tasklist=response.data.data;
      } else {
        this.$Message.error("权限错误");
      }
    }).catch(function(error) {
      console.log(error);
    });
  },
  methods: {
    changeLevel(level) {
      this.taskinfo.level = level;
      this.poptipShow = false;
    },
    handleSubmit(name) {  
      // 审核数据
      this.$refs[name].validate(valid => {
        if (valid) {
          // 建数据包
          let data = {
            name: this.taskinfo.name,
            description: this.taskinfo.discription,
            level: this.taskinfo.level,
            state: "待分配",
            start_time: getFormatDate(new Date(this.taskinfo.start_time)),
            end_time: getFormatDate(new Date(this.taskinfo.end_time)),
            member: this.taskinfo.member
          };
          // POST
          this.axios
            .post("http://localhost:8090/projects/", qs.stringify(data))
            .then(res => {
              if (res.data.code == 200) {
                console.log(res);
                this.$Message.success("任务创建成功");
                this.createtask = false;
                this.reload();
              } else {
                this.$Message.error("任务创建失败");
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
  },
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
</style>