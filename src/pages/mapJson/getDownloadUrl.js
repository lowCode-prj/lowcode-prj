import axios from "axios"
export default {
  inject: {
    updateWidthHeight: {
      type: Function,
      default: () => {},
    },
  },
  watch: {
    backImage: {
      async handler(newVal, oldVal) {
        if (newVal) {
          try {
            const imgUrl = (await this.getDownloadUrl(newVal)).data

            // 若上传新图片，则更新容器宽高
            if (oldVal !== undefined) {
              let styles
              let _vid = this.$store.state.canvasData.currentBlock._vid
              await new Promise((resolve, reject) => {
                let image = new Image()
                image.src = imgUrl
                image.onload = function () {
                  styles = {
                    width: this.width,
                    height: this.height,
                  }
                  resolve(image)
                }
                image.onerror = function () {
                  reject()
                }
              })
              this.updateWidthHeight(_vid, styles)
            }
            this.backgroundImage = `url(${imgUrl})`
          } catch (e) {
            console.log(e)
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    async getDownloadUrl(params) {
      if (params) {
        const options = {
          params: {
            fileName: params,
            dashboardId: this.dashboardId ? this.dashboardId : this.$store.state.canvasData.pageId,
          },
          headers: {},
        };
        if (this.shareToken) {
          options.headers['share-token'] = this.shareToken;
          return axios.get(`${this.$API.dashboard}/api/files/downloadUrl`, options);
        }
        return this.$http.get(`${this.$API.dashboard}/api/files/downloadUrl`, options);
      }
    },
  },
}
