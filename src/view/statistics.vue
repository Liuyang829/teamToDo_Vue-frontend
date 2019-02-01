<template>
    <div class="statistics-content">
        <div class="enterprise-task">
            <div class="statistics-header">
                <p>企业任务统计</p>
            </div>
            <div class="enterprise-task__content">
                <div>
                    <i-circle stroke-color="#5cb85c" :size="140" :stroke-width="8" :trail-width="7" :percent="80" dashboard>
                        <div class="circle-content">
                            <span class="demo-circle-inner" style="font-size:24px">80%</span>
                            <Button type="success" ghost>项目</Button>
                        </div>
                    </i-circle>
                    <i-circle stroke-color="#ff5500" :size="140" :stroke-width="8" :trail-width="7" :percent="80" dashboard>
                        <div class="circle-content">
                            <span class="demo-circle-inner" style="font-size:24px">80%</span>
                            <Button type="error" ghost>项目</Button>
                        </div>
                    </i-circle>
                </div>
                <div>
                  <ul>
                    <li>
                        <span>待完成</span>
                        <p>12</p>
                    </li>
                    <li>
                        <span>延期</span>
                        <p>1</p>
                    </li>
                    <li>
                        <span>已完成</span>
                        <p>0</p>
                    </li>
                    <li>
                        <span>任务总数</span>
                        <p>12</p>
                    </li>    
                  </ul>      
                </div>
            </div>
        </div>
        <div class="enterprise-trend">
            <div class="statistics-header">
                <p>企业每日新增和完成任务趋势</p>
                <div class="statistics-header-right">
                    <div class="week-btn__change">
                        <Icon type="ios-arrow-back" />
                        <p>本周</p>
                        <Icon type="ios-arrow-forward" />
                    </div>
                </div>
            </div>
            <ve-line :legend="legend" :data="chartData"></ve-line>
        </div>
        <div class="enterprise-weekly">
            <div class="statistics-header">
                <p>企业任务周报</p>
                <div class="statistics-header-right">
                    <div class="week-btn__change">
                        <Icon type="ios-arrow-back" />
                        <p>8月13日-19日</p>
                        <Icon type="ios-arrow-forward" />
                    </div>
                </div>
            </div>
            <div class="enterprise-weekly-content">
                <div class="enterprise-weekly__delay">
                    <div class="enterprise-weekly__left">
                        <span>延期任务</span>
                        <p>0</p>
                    </div>
                    <div class="enterprise-weekly__right">
                        <Icon type="md-alarm" />
                    </div>
                </div>
                <div class="enterprise-weekly__complete">
                    <div class="enterprise-weekly__left">
                        <span>完成任务</span>
                        <p>0</p>
                    </div>
                    <div class="enterprise-weekly__right">
                        <Icon type="md-checkbox-outline" />
                    </div>
                </div>
                <div class="enterprise-weekly__add">
                    <div class="enterprise-weekly__left">
                        <span>新增任务</span>
                        <p>0</p>
                    </div>
                    <div class="enterprise-weekly__right">
                        <Icon type="md-trending-up" />
                    </div>
                </div>
            </div>
        </div>
        <div class="project-progress">
            <div class="statistics-header">
                <p>项目进度统计</p>
                <div class="statistics-header-right">
                    <Input prefix="ios-search"  placeholder="搜索" />
                </div>
            </div>
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="member-progress">
            <div class="statistics-header">
                <p>成员进度统计</p>
                <div class="statistics-header-right">
                    <Input prefix="ios-search"  placeholder="搜索" />
                </div>
            </div>
            <Table border :columns="columns2" :data="data2"></Table>
        </div>
    </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";
export default {
  components: {
    VeLine
  },
  data() {
    return {
      chartData: {
        columns: ["日期", "新增任务", "完成任务"],
        rows: [
          { 日期: "08-13", 新增任务: 2, 完成任务: 4 },
          { 日期: "08-14", 新增任务: 0, 完成任务: 1 },
          { 日期: "08-15", 新增任务: 1, 完成任务: 6 },
          { 日期: "08-16", 新增任务: 3, 完成任务: 3 },
          { 日期: "08-17", 新增任务: 2, 完成任务: 8 },
          { 日期: "08-18", 新增任务: 6, 完成任务: 4 },
          { 日期: "08-19", 新增任务: 4, 完成任务: 4 }
        ]
      },
      legend: {
        right: 0
      },
      columns1: [
        {
          title: '项目',
          key: 'name',
          align: 'center'
        },
        {
          title: '开始时间',
          key: 'start_time',
          align: 'center'
        },
        {
          title: '结束时间',
          key: 'end_time',
          align: 'center'
        },
        {
          title: '负责人',
          key: 'charge_person',
          align: 'center'
        },
        {
          title: '状态',
          key: 'status',
          align: 'center'
        },
        {
          title: '待完成',
          key: 'to_completed',
          align: 'center'
        },
        {
          title: '延期任务',
          key: 'delay_task',
          align: 'center'
        },
        {
          title: '已完成',
          key: 'completed',
          align: 'center'
        },
        {
          title: '项目进度',
          key: 'progress',
          render: (h, params) => {
              return h('i-progress', {
                  props: {
                      percent: params.row.progress,
                      'hide-info': true
                  }
              })
          }
        }
      ],
      data1: [
        {
          name: "John Brown",
          start_time: "2018-08-13",
          end_time: "2018-08-20",
          charge_person: "陈波",
          status: '',
          to_completed: 11,
          delay_task: 1,
          completed: 0,
          progress: 25
        },
        {
          name: "John Brown",
          start_time: '2018-08-13',
          end_time: "2018-08-20",
          charge_person: "陈波",
          status: '',
          to_completed: 11,
          delay_task: 1,
          completed: 0,
          progress: 25
        }
      ],
      columns2: [
        {
          title: '成员',
          key: 'name',
          align: 'center'
        },
        {
          title: '项目数',
          key: 'task_num',
          align: 'center'
        },
        {
          title: '待完成',
          key: 'to_completed',
          align: 'center'
        },
        {
          title: '延期任务',
          key: 'delay_task',
          align: 'center'
        },
        {
          title: '已完成',
          key: 'completed',
          align: 'center'
        },
        {
          title: '任务总数',
          key: 'task_count',
          align: 'center'
        },
        {
          title: '延误率',
          key: 'delay_rate',
          align: 'center'
        },
        {
          title: '成员完成度',
          key: 'completed_progress',
          align: 'center',
          render: (h, params) => {
              return h('i-progress', {
                  props: {
                      percent: params.row.completed_progress,
                      'hide-info': true
                  }
              })
          }
        },
      ],
      data2: [
        {
          name: "陈波",
          task_num: 1,
          to_completed: 11,
          delay_task: 1,
          completed: 0,
          task_count: 10,
          delay_rate: '6%',
          completed_progress: 25
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.statistics-content {
  padding: 5px;
  background: #fff;
  .statistics-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 16px;
    color: #7a7780;
    & > p {
      padding-left: 8px;
      border-left: 3px solid #1adebd;
    }
  }
  & > div {
    padding: 15px;
    margin-bottom: 20px;
    border: 3px solid #efeeec;
  }
  .enterprise-task {
    &__content {
      display: flex;
      & > div,
      & ul {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
      & > div:first-child {
        border-right: 1px solid #dcdcdd;
      }
      & ul {
        margin-left: 30px;
        text-align: center;
      }
      & li p {
        font-size: 50px;
        color: #808695;
      }
      & li:nth-child(2) p,
      & li:nth-child(2) span {
        color: #ed4014;
      }
      & li:nth-child(3) p,
      & li:nth-child(3) span {
        color: #19be6b;
      }
    }
  }
  .circle-content {
    position: relative;
    button {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 50px);
    }
  }
  .week-btn__change {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      margin: 0 15px;
    }
    i {
      font-size: 20px;
      cursor: pointer;
    }
  }
  .enterprise-weekly-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    & > div {
      width: 340px;
      height: 100px;
      display: flex;
      border: 2px solid #e8eaec;
      border-radius: 5px;
    }
    .enterprise-weekly__left {
      flex: 2.5;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 30px;
      p {
        font-size: 50px;
        line-height: 50px;
      }
    }
    .enterprise-weekly__right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      color: #fff;
    }
    .enterprise-weekly__delay .enterprise-weekly__right {
      background-color: #ed4014;
    }
    .enterprise-weekly__complete .enterprise-weekly__right {
      background-color: #19be6b;
    }

    .enterprise-weekly__add .enterprise-weekly__right {
      background-color: #ffd36b;
    }
    .enterprise-weekly__delay .enterprise-weekly__left {
      color: #ed4014;
    }
    .enterprise-weekly__complete .enterprise-weekly__left {
      color: #19be6b;
    }

    .enterprise-weekly__add .enterprise-weekly__left {
      color: #ffd36b;
    }
  }
}
</style>
