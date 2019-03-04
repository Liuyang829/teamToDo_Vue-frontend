<template>
  <Row class-name="Row" type="flex" justify="space-between" align="middle" class="code-row-bg">
    <Col class-name="col-left" span="8">
      <div align="left">
        <AutoComplete
          placeholder="请选择一个项目"
          @on-blur="delprojectlist"
          @on-focus="getprojectlist"
          v-model="search_value"
          :data="project_names"
          @on-search="filter_project"
          style="width:50%"
          @on-select="set_id"
        >
          <Option v-for="item in project_names" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </AutoComplete>
        <Button type="text" shape="circle" icon="ios-search" @click="toDetail()"></Button>
      </div>
    </Col>
    <Col class-name="col-center" span="8">
      <div align="center">
        <Button ghost type="text" size="large">
        <h3 style="color:#2d8cf0">TeamToDo</h3>
        </Button>
      </div>
    </Col>
    <Col class-name="col-right" span="8">
<<<<<<< HEAD
      <div align="right">
=======
<<<<<<< HEAD
      <div align="right">
        
>>>>>>> 64c1a5473e7c2c7b74ae30bac24b9b68bcc67e93
        <a href="javascript:" class="btn" @click="calendar">日历</a>
        <Badge dot :count="count1" class="demo-badge">
          <Button
            type="text"
            shape="circle"
            icon="md-notifications"
            size="small"
            @click="modal1 = true"
          ></Button>
        </Badge>&nbsp;
        <Badge dot :count="count2">
          <Button type="text" shape="circle" icon="md-text" size="small"></Button>
        </Badge>
        <Avatar class="avatar" src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
      </div>
<<<<<<< HEAD
=======
=======
    <div align="right">
      <a href="javascript:" class="btn" @click="calendar">日历</a>
      <Badge dot :count="count1" class="demo-badge">
        <Button type="text" shape="circle" icon="md-notifications" size="small" @click="modal1 = true"></Button>
      </Badge>&nbsp;
      <Badge dot :count="count2">
        <Button type="text" shape="circle" icon="md-text" size="small"></Button>
      </Badge>
      <Avatar class="avatar" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
    </div>
>>>>>>> bafb726886894bd84ec898509cd693c3d0a1ae43
>>>>>>> 64c1a5473e7c2c7b74ae30bac24b9b68bcc67e93
    </Col>
    <Modal v-model="modal1" title="项目邀请信息">
      <li type="none">
        <h5>具体信息：</h5>
      </li>
      <Scroll>
        <li
          class="invite-item"
          v-for="(invitationitem,index) in invitationList"
          data-index="index"
          :key="index"
          type="none"
        >
          <div>
            <Card v-if="card[index]" long>
              <ul>
                <li>项目名称：{{invitationitem.project_name}}</li>
                <Divider class="div"/>
                <li>发起人：{{invitationitem.inviter}}</li>
                <Divider class="div"/>
                <div align="right">
                  <Button type="success" @click="accept(invitationitem.id,index)">接受</Button>
                  <Button type="error" @click="refuse(invitationitem.id,index)">拒绝</Button>
                </div>
              </ul>
            </Card>
          </div>
        </li>
      </Scroll>
    </Modal>
  </Row>
</template>

<script>
import qs from "qs";
export default {
  name: "IHeader",
  data() {
    return {
      modal1: false,
      count1: 0,
      count2: 0,
      card: [],
      invitationList: "",
      timer: null,
      search_value: "",
      project_names: "",
      project_id: ""
    };
  },
  created: function() {
    // this.getFamilyBase_info();
    clearInterval(this.timer);
    this.timer = null;
    this.setTimer();
    console.log("123456", "this is header");
    this.getList();
  },
  destroyed: function() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    getList() {
      this.axios
        .get("http://localhost:8090/invitations/received")
        .then(res => {
          if (res.data.code == 200) {
            this.invitationList = res.data.data;
            console.log(this.invitationList.length);
            this.count1 = 0;
            this.count1 += res.data.data.length;
            console.log(this.count1);
            this.card = [];
            var i = 0;
            for (i = 0; i < this.invitationList.length; i++) {
              this.card.push(true);
            }
            // console.log(this.card);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    setTimer() {
      if (this.timer == null) {
        this.timer = setInterval(() => {
          console.log("this is timer", "定时发生（10s)");
          this.getList();
          console.log("count1", this.count1);
        }, 10000);
      }
    },
    //接受邀请
    accept(invitation_id, index) {
      console.log("this is index", index);

      let data = {
        invitation_id: parseInt(invitation_id)
      };
      this.axios
        .post("http://localhost:8090/invitations/received", qs.stringify(data))
        .then(response => {
          console.log(response);
          if (response.data.code == 200) {
            this.$Message.success("接受成功");
            this.count1 -= 1;
            console.log("count1:", this.count1);

            this.card[index] = false;
          } else {
            this.$Message.error("接受失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //拒绝邀请
    refuse(invitation_id, index) {
      // let data = {
      //   invitation_id: parseInt(invitation_id)
      // };
      this.axios
        .delete("http://localhost:8090/invitations/received", {
          params: { invitation_id: invitation_id }
        })
        .then(response => {
          console.log(response);
          if (response.data.code == 200) {
            this.$Message.success("拒绝成功");
            this.count1 -= 1;
            console.log("count1:", this.count1);

            this.card[index] = false;
          } else {
            this.$Message.error("拒绝失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    calendar() {
      this.$router.push("calendar");
    },
    toDetail(value) {
      this.axios
        .get("http://localhost:8090/projects/")
        .then(response => {
          console.log(response.data.data);
          // for(var i=0;i<response.data.data.length;i++){
          //   this.project_names.push(response.data.data[i].name);
          // }
          // this.project_names=response.data.data;
          for (var i = 0; i < response.data.data.length; i++) {
            if (this.search_value == response.data.data[i].name) {
              // console.log(this.project_names[i].name);

              this.project_id = response.data.data[i].id;
              break;
            }
          }
          console.log("???");
          
          this.$router.push({
            path: "/projectdetail",
            query: { projectId: String(this.project_id) }
          });
          this.reload();
          console.log("123456", this.project_id);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    filter_project(value) {
      console.log("this is value", value);
      // console.log("this is option",option);
      var option = [];
      for (var i = 0; i < this.project_names.length; i++) {
        option.push(this.project_names[i].name);
      }
      return option.indexOf(value) !== -1;
    },
    getprojectlist() {
      this.axios
        .get("http://localhost:8090/projects/")
        .then(response => {
          console.log(response.data.data);
          // for(var i=0;i<response.data.data.length;i++){
          //   this.project_names.push(response.data.data[i].name);
          // }
          this.project_names = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    delprojectlist() {
      this.project_names = [];
    },
    set_id(value) {
      this.set_project_id = value;
      console.log(this.set_project_id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.Row {
  height: 50px;
  background: #fff;
  .col-left {
    padding: 5px;
  }

  .col-center {
    font-size: 20px;
    color: black;
  }

  .col-right {
    padding: 5px;
    font-size: 14px;
    color: gray;

    a {
      margin: 0 10px;
    }
    i {
      margin: 0 10px;
      font-size: 18px;
    }
    .avatar {
      margin: 0px 10px;
    }
  }
}
</style>
