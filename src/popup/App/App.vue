<template>
  <div class="main_app">
    <div class="left">
      <div v-for="(item,i) in tab_infos_objs" :key="i" @mouseover="left_over(i)"
           @mouseleave="left_leave(i)"
           :style="i==is_check_left ? 'color:#ffffff;background-color:#0099FF' : 'color:#000000;background-color:#f2f2f2'">
        <div style="display:flex;justify-content: space-between;align-items: center;margin-right: 2px">
          <div class="tab-row">
            <el-image :src="item.favIconUrl" style="margin-left:4px;width: 20px" lazy>
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" style="font-size:16px"></i>
              </div>
            </el-image>
            <div style="align-items: flex-start">
              <span class="tab_title">{{ item.domain }}</span>
            </div>
          </div>
          <div class="icon_delete" @click="close_all_sub_tabs(i)">
            <i class="el-icon-delete"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <el-empty v-if="sub_tab_infos.length==0" class="empty_img" description="暂无数据"></el-empty>
      <div v-for="(item,index) in sub_tab_infos" :key="index" @mouseover="right_over(index)"
           @mouseleave="right_leave(index)" @click="right_click(index)"
           :style="index==is_check_right ? 'color:#ffffff;background-color:#0099FF' : ''">
        <div class="tab-row">
          <el-image :src="item.favIconUrl" style="margin-left:4px;width: 20px" lazy>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" style="font-size:16px"></i>
            </div>
          </el-image>
          <div style="align-items: flex-start">
            <div class="tab_title">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getDomain} from 'tldjs'

export default {
  name: 'app',
  data() {
    return {
      is_check_left: '',
      is_check_right: '',
      tab_infos_objs: [],
      sub_tab_infos: [],
    }
  },
  created() {
    var that = this
    chrome.tabs.query({}, function (tabArray) {
      that.tab_infos_objs = Object.values(that.classify_tab_infos(tabArray))
      that.sub_tab_infos = that.tab_infos_objs[0].children
    })
  },
  methods: {
    right_click: function (i) {
      var windowId = this.sub_tab_infos[i].windowId;
      var index = this.sub_tab_infos[i].index;
      chrome.tabs.highlight({"tabs": index, "windowId": windowId});
      chrome.windows.update(windowId, {focused: true});
    },
    left_over: function (i) {
      this.is_check_left = i
      this.is_check_right = ''
      this.sub_tab_infos = this.tab_infos_objs[i].children
    },
    left_leave: function (i) {
    },
    right_over: function (i) {
      this.is_check_right = i
    },
    right_leave: function (i) {
    },
    close_all_sub_tabs: function (i) {
      console.log('close_all_sub_tabs:', i)
    },
    /**
     * 截取域名
     * @param url
     * @returns {*}
     */
    get_domain: function (url) {
      if (url.startsWith('view-source:')) {
        url = url.slice(12)
      }
      return getDomain(url);
    },
    classify_tab_infos: function (tab_infos) {
      var result = {};
      for (var i = 0; i < tab_infos.length; i++) {
        var favIconUrl = tab_infos[i].favIconUrl
        var domain = this.get_domain(tab_infos[i].url)
        if (result.hasOwnProperty(domain) && result[domain].hasOwnProperty('domain') && result[domain].domain === domain) {
          result[domain].children.push(tab_infos[i]);
        } else {
          result[domain] = {
            favIconUrl: favIconUrl,
            domain: domain,
            children: [tab_infos[i]]
          }
        }
      }
      return result
    }
  }
}
</script>

<style>
body {
  margin: 4px 0px;
  background-color: #f2f2f2;
}

.main_app {
  padding: 0px;
  margin: 0px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 400px;
  height: 600px;
  display: flex;
  justify-content: space-between;
}

.left {
  width: 50%;
}

.right {
  width: 50%;

}

.tab-row {
  height: 28px;
  display: flex;
  justify-content: flex-start;
  /*justify-content: space-around;*/
  align-items: center;
  /*border-bottom: 1px solid #f2f2f2;*/

}

.icon_delete {
  width: 28px;
  height: 28px;
}

.el-icon-delete {
  width: 28px;
  height: 28px;
  color: red;
  margin: 0 auto; /*水平居中*/
  position: relative;
  top: 25%; /*偏移*/
}

.tab_title {
  margin-left: 12px;
  font-size: 14px;
  width: 150px; /*必须设置宽度*/
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
  width: 100px;
  height: 100px
}
</style>
