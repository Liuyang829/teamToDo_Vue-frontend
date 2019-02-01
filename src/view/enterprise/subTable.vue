<template>
    <div>
        <Table class="sub-table" :show-header="false" :columns="column" :data="row.child"></Table>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        },
        data() {
            return {
                column: [
                    {
                        key: 'action',
                        width:30
                    },
                    {
                        key: 'name',
                        render: (h, params) => {
                            return h('p',{
                                style: {
                                    marginLeft: '20px'
                                }
                            },params.row.name)
                        }
                    },
                    {
                        key: 'owner_status',
                        align: 'center',
                        render: (h, params) => {
                            let Vnode = h('Icon', {
                                props: {
                                    type: 'md-checkmark'
                                },
                                style: {
                                    fontSize: '20px',
                                    color: '#2d8cf0'
                                }
                            })
                            return params.row.owner_status == '1' ? Vnode : '' 
                        }
                    },
                    {
                        key: 'admin_status',
                        align: 'center',
                        render: (h, params) => {
                            let Vnode = h('Icon', {
                                props: {
                                    type: 'md-checkmark'
                                },
                                style: {
                                    fontSize: '20px',
                                    color: '#2d8cf0'
                                }
                            })
                            return params.row.admin_status == '1' ? Vnode : '' 
                        }
                    },
                    {
                        key: 'member_status',
                        align: 'center',
                        render: (h, params) => {
                            let Vnode = h('Icon', {
                                props: {
                                    type: 'md-checkmark'
                                },
                                style: {
                                    fontSize: '20px',
                                    color: '#2d8cf0'
                                }
                            })
                            return params.row.member_status == '1' ? Vnode : '' 
                        }
                    }
                ]
            }
        }
    };
</script>
<style lang="scss">
.sub-table {
    border: none;
    .ivu-table:before, .ivu-table::after {
        display: none
    }
    
}
</style>

