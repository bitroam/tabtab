<template>
  <div class="main_app">
    <div class="left">
      <div v-for="(item,i) in tabs_infos" :key="item.id">
        <div class="tab-row">
          <el-image :src="item.favIconUrl" style="width: 20px" :fit="contain">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" style="width: 28px"></i>
            </div>
          </el-image>
          <div style="align-items: flex-start">
            <span @mouseover="hover(i)" class="tab_title">{{ get_domain(item.url) }}</span>
          </div>
          <hr>
        </div>
      </div>
    </div>
    <div class="right">
      <el-empty class="empty_img" image-size=100 description="暂无数据"></el-empty>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      tabs_infos: [],
    }
  },
  created() {
    var that = this
    chrome.tabs.query({}, function (tabArray) {
      console.log('tabs_infos:', that.tabs_infos)
      console.log(tabArray)
      that.tabs_infos = tabArray
      // this.nextTick(function () {
      //   this.tabs_infos = tabArray
      // });
      console.log('tabs_infos:', that.tabs_infos)
    })
  },
  methods: {
    hover: function (i) {
      console.log(i)
    },
    /**
     * 取域名
     * @param url
     * @returns {*}
     */
    get_domain: function (url) {
      var arrUrl = url.split("//");
      if (url.indexOf("//") > -1) {
        return arrUrl[1].split("/")[0]
      }
      return arrUrl[0].split("/")[0]
    }

  }
}
</script>

<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 100px;*/
  width: 600px;
  height: 600px;
  display: flex;
  justify-content: space-between;
}

.left {
  flex-direction: row-reverse;
  width: 49%;
  overflow-y: auto;
  height: 600px;
}

.right {
  width: 49%;
  background-color: lightgoldenrodyellow;

}

.tab-row {
  padding: 4px 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
}

.tab_title {
  margin-left: 12px;
  font-size: 14px;
  width: 100%; /*必须设置宽度*/
  overflow: hidden; /*溢出隐藏*/
  text-overflow: ellipsis; /*以省略号...显示*/
  white-space: nowrap; /*强制不换行*/
}

/*隐藏滚动条*/
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.empty_img {
  align-items: center;
}

a:hover {
  background-color: yellow;
}

tab-row:hover {
  background-color: red;
}

</style>
