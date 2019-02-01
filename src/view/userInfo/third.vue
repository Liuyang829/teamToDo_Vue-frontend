<template>
    <div class="user-third">
        <Card :shadow="true">
            <p slot="title" style="font-size:16px;">第三方账号</p>
            <div class="user-third__list">
                <i class="wechat-icon"></i>
                <Button type="info" style="width:80px;" ghost>绑定</Button>
            </div>
        </Card>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.user-third {
    &__list {
        display: flex;
        justify-content: space-between;
    }
  .wechat-icon {
    display: block;
    width: 28px;
    height: 28px;
    background: #79c700
      url("https://dn-st.teambition.net/account/my/static/images/thrids/wechat@2x.ef67bc01.png")
      no-repeat center;
    background-size: 100%;
  }
}
</style>
