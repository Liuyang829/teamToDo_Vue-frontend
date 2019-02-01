<template>
    <div class="enterprise-content">
        <div class="enterprise-content-nav">
            <Menu :active-name="activeName">
                <MenuGroup title="数据监控">
                    <MenuItem :to="{name: 'enterprise_log'}" name="enterprise_log">
                        <Icon type="md-document" />
                        操作日志
                    </MenuItem>
                </MenuGroup>
                <MenuGroup  title="企业设置">
                    <MenuItem :to="{name: 'enterprise_info'}" name="enterprise_info">
                        <Icon type="md-heart" />
                        企业信息
                    </MenuItem>
                    <MenuItem :to="{name: 'enterprise_tag'}" name="enterprise_tag">
                        <Icon type="md-leaf" />
                        企业标签
                    </MenuItem>
                </MenuGroup>
                <MenuGroup title="权限设置">
                    <MenuItem :to="{name: 'enterprise_power'}" name="enterprise_power">
                        <Icon type="md-heart" />
                        企业权限
                    </MenuItem>
                    <MenuItem :to="{name: 'project_power'}" name="project_power">
                        <Icon type="md-leaf" />
                        项目权限
                    </MenuItem>
                </MenuGroup>
            </Menu>
        </div>
        <div class="enterprise-content-right">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: 'enterprise_log'
        }
    },
    created() {
        this.activeName = this.$route.name
    }
};
</script>

<style lang="scss">
.enterprise-content {
    display: flex;
    & > div {
        background-color: #fff;
    }
    &-right {
        margin-left: 20px;
        flex: 1;
        overflow-y: auto;
    }
}
</style>
