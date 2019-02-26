<template>
  <div>
    <div align="right">
      <Button @click="value1 = true" type="primary">Open</Button>
      <Drawer title="Basic Drawer" :closable="false" v-model="value1" transfer="false" inner="true">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>

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

    </Row>

    <Modal :width="400" v-model="createtask" :footer-hide="true">
      <div class="model-header" slot="header">
        <p>创建任务</p>
      </div>
      <Form v-if="createtask" ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="name">
          <Input type="text" v-model="formInline.name" placeholder="任务名称（必填）"/>
        </FormItem>

        <FormItem prop="discription">
          <Input type="textarea" :rows="4" v-model="formInline.discription" placeholder="任务简介"/>
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
            options="start-date-limit"
            type="date"
            v-model="formInline.start_time"
            placeholder="开始时间"
            style="width: 368px"
          ></DatePicker>
        </FormItem>

        <FormItem prop="end_time">
          <DatePicker
            options="finish-date-limit"
            type="date"
            v-model="formInline.end_time"
            placeholder="结束时间"
            style="width: 368px"
          ></DatePicker>
        </FormItem>

        <FormItem>
          <Button long type="success" @click="handleSubmit('formInline')">完成并创建</Button>
        </FormItem>
        
      </Form>
    </Modal>

    <!--Modal :width="400" v-model="changetask" :footer-hide="true">
      <div class="model-header" slot="header">
        <p>任务详情</p>
      </div>
      <Form v-if="createtask" ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="name">
          <Input type="text" v-model="formInline.name" placeholder="任务名称（必填）"/>
        </FormItem>

        <FormItem prop="discription">
          <Input type="textarea" :rows="4" v-model="formInline.discription" placeholder="任务简介"/>
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
          <Button long type="success" @click="handleSubmit('formInline')">完成并创建</Button>
        </FormItem>
        
      </Form>
    </Modal-->

  </div>
  
</template>

<script>
export default {
  data() {
    return {
      //projectid: 
      createtask: false,
      changetask: false,
      poptipShow: false,
      formInline: {
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
      show: true,
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
  created: function() {
    this.axios.get("http://localhost:8090/projects/tasks?project_id={{projectid}}").then((response) => {
      tasklist=response.data.data;
      console.log(tasklist);
    }).catch(function(error) {
      console.log(error);
    });
  },
  methods: {
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
            state: "待分配",
            start_time: getFormatDate(new Date(this.formInline.start_time)),
            end_time: getFormatDate(new Date(this.formInline.end_time)),
            member: this.formInline.member
          };

          // this.axios
          //   .post("http://localhost:8090/projects/", qs.stringify(data))
          //   .then(res => {
          //     if (res.data.code == 200) {
          //       console.log(res);
          //       this.$Message.success("创建成功");
          //       this.show = false;
          //       this.reload();
          //     } else {
          //       this.$Message.error("创建失败");
          //     }
          //   })
          //   .catch(res => {
          //     console.log(res);
          //   });
        } else {
          this.$Message.error("创建失败");
        }
      });
    }
  },
};
</script>

<style scoped lang="scss">
.task-classify-title {
    margin-left: 14px;
    font-size: 18px;
    color: #333;
  }
</style>