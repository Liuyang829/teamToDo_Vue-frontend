<template>
    <div class="enterprise-power">
        <div class="enterprise-power__header">
            <p>企业权限</p>
        </div>
        <Divider/>
        <div class="enterprise-power__table">
            <Table :columns="columns10" :data="data9"></Table>
        </div>
    </div>
</template>

<script>
import expandRow from './subTable.vue';
export default {
    components: { expandRow },
    data() {
        return {
            columns10: [
                    {
                        type: 'expand',
                        width: 30,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: ' ',
                        key: 'name'
                    },
                    {
                        title: '拥有者',
                        key: 'age',
                        align: 'center'
                    },
                    {
                        title: '管理员',
                        key: 'address',
                        align: 'center'
                    },
                    {
                        title: '成员',
                        key: 'address',
                        align: 'center'
                    }
                ],
                data9: [
                    {
                        name: 'John Brown',
                        _expanded: true,
                        child: [
                            {
                                name: '创建企业项目',
                                owner_status: '1',
                                admin_status: '1',
                                member_status: '1'
                            },
                            {
                                name: '编辑项目分组',
                                owner_status: '1',
                                admin_status: '1',
                                member_status: '1'
                            },
                            {
                                name: '查看企业所有项目',
                                owner_status: '1',
                                admin_status: '1',
                                member_status: '1'
                            },
                            {
                                name: '主动加人项目',
                                owner_status: '1',
                                admin_status: '1',
                                member_status: '1'
                            }
                        ]
                    },
                    {
                        name: 'Jim Green',
                        child: [
                            {
                                name: '创建企业项目',
                                owner_status: '1',
                                admin_status: '1',
                                member_status: '1'
                            },
                            {
                                name: '编辑项目分组',
                                owner_status: '1',
                                admin_status: '1',
                                member_status: '1'
                            },
                            {
                                name: '查看企业所有项目',
                                owner_status: '1',
                                admin_status: '1',
                                member_status: '1'
                            },
                            {
                                name: '主动加人项目',
                                owner_status: '1',
                                admin_status: '1',
                                member_status: '1'
                            }
                        ]
                    },
                    {
                        name: 'Joe Black',
                        child: [
                            {
                                name: '创建企业项目',
                                owner_status: '1',
                                admin_status: '1',
                                member_status: '1'
                            },
                            {
                                name: '编辑项目分组',
                                owner_status: '1',
                                admin_status: '1',
                                member_status: '1'
                            },
                            {
                                name: '查看企业所有项目',
                                owner_status: '1',
                                admin_status: '1',
                                member_status: '1'
                            },
                            {
                                name: '主动加人项目',
                                owner_status: '1',
                                admin_status: '1',
                                member_status: '1'
                            }
                        ]
                    },
                    {
                        name: 'Jon Snow',
                        child: [
                            {
                                name: '创建企业项目',
                                owner_status: '1',
                                admin_status: '1',
                                member_status: '1'
                            },
                            {
                                name: '编辑项目分组',
                                owner_status: '1',
                                admin_status: '1',
                                member_status: '1'
                            },
                            {
                                name: '查看企业所有项目',
                                owner_status: '1',
                                admin_status: '1',
                                member_status: '1'
                            },
                            {
                                name: '主动加人项目',
                                owner_status: '1',
                                admin_status: '1',
                                member_status: '1'
                            }
                        ]
                    }
                ]
        }
    }
}
</script>

<style lang="scss">
.enterprise-power {
    &__header {
        padding: 20px;
        padding-bottom: 0;
        font-size: 16px;
    }
    &__table {
        margin: 20px;
    }
    .ivu-table-expanded-cell {
        padding: 0;
    }
}
</style>
