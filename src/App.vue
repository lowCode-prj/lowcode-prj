<template>
  <div id="app">
    <div :class="['opts-btn', show ? 'show' : 'hide']">
      <RadioGroup v-model="currType" type="button">
        <Radio v-for="t in buttonList" :key="t.value" :label="t.value">{{ t.name }}</Radio>
      </RadioGroup>
      <i-switch v-model="fullScreen" size="large" @on-change="handleChangeFullScreen">
        <span slot="open">开启</span>
        <span slot="close">全屏</span>
      </i-switch>
      <div class="footer" @click="show = !show">
        <Icon v-if="show" type="ios-arrow-up" size="25" />
        <Icon v-else type="ios-arrow-down" size="25" />
      </div>
    </div>
    <Dashboard v-if="currType === 1" />
  </div>
</template>

<script>
import Dashboard from "./pages/index.vue";

export default {
  name: "App",
  components: {
    Dashboard,
  },
  data() {
    return {
      currType: 1,
      fullScreen: false,
      buttonList: [
        { name: "大屏", value: 1 },
      ],
      show: true,
      toggleFullScreen: false,
    };
  },
  computed: {
    parseStyles() {
      const sourceStyle = {
        backgroundColor: "rgba(34,40,51,0)",
        x: 45,
        width: 502,
        y: 141,
        height: 402,
        zIndex: 19,
      };
      Object.keys(sourceStyle).forEach(key => {
        if (["width", "height"].includes(key)) {
          sourceStyle[key] += "px";
        } else if (key === "x") {
          sourceStyle.left = sourceStyle[key] + "px";
        } else if (key === "y") {
          sourceStyle.top = sourceStyle[key] + "px";
        }
      });

      sourceStyle.position = "absolute";

      return sourceStyle;
    },
  },
  watch: {
    fullScreen() {
      this.toggleFullScreen = true;
    },
  },
  mounted() {
    document.addEventListener("fullscreenchange", () => {
      if (!this.toggleFullScreen) {
        this.fullScreen = false;
      }
      this.toggleFullScreen = false;
    });

    document.addEventListener("keydown", e => {
      if (e.key === "F11") {
        e.preventDefault();
      }
    });
  },
  methods: {
    handleChangeFullScreen(isFullScreen) {
      if (isFullScreen) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  background: #333 !important;
}

#app {
  height: 100vh;
  color: #2c3e50;
  background: #232323;
}

.opts-btn {
  position: fixed;
  left: 50vw;
  transform: translateX(-50%);
  z-index: 999;
  background: #eee;
  padding: 5px 5px 0 5px;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 0 8px #333;
  transition: top 0.3s;
  text-align: center;
  cursor: pointer;
}

.opts-btn .footer:hover {
  color: #3b89ec;
  background: #ccc;
}

.opts-btn.show {
  top: 0;
}

.opts-btn.hide {
  top: -40px;
}
</style>
