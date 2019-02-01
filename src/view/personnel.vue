<template>
    <div class="personnel-content">
        <div class="personnel-left">
            <Input class="personnel-left__input" prefix="ios-search" placeholder="搜索" style="width: auto" />
            <div class="personnel-left__btn">
                <a href="javascript:">
                    <Icon class="personnel-left__icon" type="ios-add-circle" />
                    <span>创建部门</span>
                </a>
                <a href="javascript:">职位管理</a>
                <a href="javascript:"><Icon class="personnel-left__icon" type="md-trash" /></a>
                
            </div>
            <Tree :data="data"></Tree>
        </div>
        <div class="personnel-right">
            <div class="personnel-right-header">
                <p>所有成员</p>
                <div>
                   <Icon class="personnel-right-header__icon" type="ios-add-circle" /> 
                   <span>添加成员</span>
                </div>
            </div>
            <Table :show-header="false" :height="`${windowHeight - 245}`" :disabled-hover="true" :columns="columns" :data="listData"></Table>
        </div>
    </div>
</template>

<script>
export default {
  mounted() {
      this.windowHeight = document.documentElement.clientHeight;
      window.addEventListener('click', (e) => {
          console.log(e)
      })
  },
  data() {
    return {
      windowHeight: 0,
      data: [
        {
          title: "综合部",
          expand: true,
          children: [
            {
              title: "财务部",
              expand: true
            },
            {
              title: "会计部",
              expand: true
            }
          ]
        },
        {
          title: "综合部",
          expand: true,
          children: [
            {
              title: "财务部",
              expand: true,
              selected: true
            },
            {
              title: "会计部",
              expand: true
            }
          ]
        },
        {
          title: "综合部",
          expand: true,
          children: [
            {
              title: "财务部",
              expand: true
            },
            {
              title: "会计部",
              expand: true,
              children: [
                {
                  title: "综合部",
                  expand: true,
                  children: [
                    {
                      title: "财务部",
                      expand: true
                    },
                    {
                      title: "会计部",
                      expand: true
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      columns: [
          {
              title: 'Name',
              key: 'name',
              align: 'center',
              render: (h, params) => {
                  return h('div', {
                      style: {
                          display: 'flex',
                          alignItems: 'center'
                      }
                  },
                  [
                      h('Avatar', {
                          props: {
                              src: params.row.img
                          },
                          style: {
                              marginRight: '10px'
                          }
                      }),
                      h('span', {}, params.row.name)
                  ])
              }
          },
          {
              title: 'Job',
              key: 'job',
              align: 'center'
          },
          {
              title: 'T',
              key: 't',
              align: 'center'
          },
          {
              title: 'Action',
              key: 'action',
              align: 'center',
              render: (h, params) => {
                  return h('div', [
                      h('Icon', {
                          props: {
                              type: 'md-create'
                          },
                          style: {
                              marginRight: '10px'
                          },
                          on: {
                              click: () => {
                                  console.log(params)
                              }
                          }
                      }),
                      h('Icon', {
                          props: {
                              type: 'md-trash'
                          },
                          on: {
                              click: () => {

                              }
                          }
                      })
                  ])
              }
          }
      ],
      listData: [
          {
              name: '陈波',
              img: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
              job: '产品经理',
              t: '拥有者'
          },
          {
              name: '陈波',
              img: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
              job: '产品经理',
              t: '拥有者'
          },
          {
              name: '陈波',
              img: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
              job: '产品经理',
              t: '拥有者'
          },
          {
              name: '陈波',
              img: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
              job: '产品经理',
              t: '拥有者'
          },{
              name: '陈波',
              img: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
              job: '产品经理',
              t: '拥有者'
          },
          {
              name: '陈波',
              img: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
              job: '产品经理',
              t: '拥有者'
          },
          {
              name: '陈波',
              img: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
              job: '产品经理',
              t: '拥有者'
          },
          {
              name: '陈波',
              img: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
              job: '产品经理',
              t: '拥有者'
          },{
              name: '陈波',
              img: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
              job: '产品经理',
              t: '拥有者'
          },
          {
              name: '陈波',
              img: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
              job: '产品经理',
              t: '拥有者'
          },{
              name: '陈波',
              img: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
              job: '产品经理',
              t: '拥有者'
          },
          {
              name: '陈波',
              img: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
              job: '产品经理',
              t: '拥有者'
          },{
              name: '陈波',
              img: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
              job: '产品经理',
              t: '拥有者'
          },
          {
              name: '陈波',
              img: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
              job: '产品经理',
              t: '拥有者'
          }
      ]
    };
  }
};
</script>

<style lang="scss">
.personnel-content {
    & > div {
        border-radius: 10px;
    }
    display: flex;
    .personnel-left {
        padding: 20px;
        display: flex;
        flex-direction: column;
        margin-right: 20px;
        width: 300px;
        background-color: #fff;
        &__input {
            margin-bottom: 10px;
        }
        &__btn {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            justify-content: space-between;
            font-size: 16px;
        }
        &__icon {
            font-size: 19px;
        }

    }
    .personnel-right {
        flex: 1;
        padding: 20px;
        background-color: #fff;
        &-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            font-size: 18px;
            div:hover {
                cursor: pointer;
                color: #2d8cf0;
            }
            &__icon {
                font-size: 20px;
            }
        }
    }
    .ivu-table {
        font-size: 14px;
        .ivu-icon {
            font-size: 18px;
            cursor: pointer;
        }
    }
    .ivu-table-wrapper {
        border: none;
    }
    .ivu-table:before, .ivu-table::after {
        display: none;
    }
    .ivu-table-body {
        height: calc(100vh - 240px);
    }
}
</style>
