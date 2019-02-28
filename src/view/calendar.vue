<template>
  <div>
    <full-calendar
      :events="projects"
      class="test-fc"
      first-day="1"
      locale="fr"
      @eventClick="eventClick"
    ></full-calendar>
  </div>
</template>

<script>
import { FullCalendar } from "vue-fullcalendar";
export default {
  data() {
    return {
      projectlist: "",
      projects: []
      // projects: [
      //   {
      //     title: "event2",
      //     start: "2019-02-02",
      //     end: "2019-02-03"
      //   },
      //   {
      //     title: "event3",
      //     start: "2019-02-02",
      //     end: "2019-02-04"
      //   },
      // ]
    };
  },

  created: function() {
    console.log(this.userInfo);
    this.axios
      .get("http://localhost:8090/projects/")
      .then(response => {
        this.projectlist = response.data.data;
        for (var i = 0; i < this.projectlist.length; i++) {
          var row1 = {};
          row1.title = this.projectlist[i].name;
          row1.start = this.projectlist[i].start_time;
          row1.end = this.projectlist[i].end_time;
          row1.id = this.projectlist[i].id;
          this.projects.push(row1);
        }
        console.log(this.projects);
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  methods: {
    // 点击事件
    eventClick(event) {
      console.log("eventClick", event);
      console.log(event.id);
      var projectId = event.id;
      this.$router.push({
        path: "/projectdetail",
        query: { projectId: projectId }
      });
    }
  },
  components: {
    "full-calendar": require("vue-fullcalendar")
  }
};
</script>

