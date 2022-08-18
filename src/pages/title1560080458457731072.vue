<template>
  <div>
    <div :style="{...styles, ...backStyles, textShadow: textShadowStr}">代码导出示例</div>
    <p :style="{...styles, ...fontStyles}">代码导出示例</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      styles: {
        color: "rgba(255,255,255,0.8)",
        fontSize: "30px",
        fontFamily: "initial",
        letterSpacing: "0px",
        textAlign: "center",
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
        padding: "0px 0px 0px 0px",
      },
      backStyles: {
        position: "absolute",
        inset: 0,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        borderRadius: "1px",
      },
      fontStyles: {
        position: "relative",
        zIndex: 10,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8))",
        "-webkit-background-clip": "text", 
        "-webkit-text-fill-color": "rgba(255,255,255,0.8)"
      }
    }
  },
  computed: {
    textShadowStr() {
      let offsetDirectionArr = [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
      ] // 四个偏移方向
      let offset = 1 // 偏移量
      let color = "transparent"
      return offsetDirectionArr
        .map(v => {
          return v.map(t => t * offset + "px").join(" ") + " 5px " + color
        })
        .join()
    },
  },
}
</script>

<style scoped>
/* 引入字体 */
@import url("./mapJson/font.css");
</style>
