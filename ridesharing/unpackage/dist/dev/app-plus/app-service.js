if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _imports_0$3 = "/static/pictures/start.png";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$d = {
    onShow() {
      setTimeout(() => {
        uni.reLaunch({
          url: "/pages/index/welcome"
          // 你想跳转的主页面
        });
      }, 2e3);
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "splash-page" }, [
      vue.createElementVNode("text", { class: "title" }, "拼 好 车"),
      vue.createElementVNode("text", { class: "subtitle" }, "你的出行省钱指南"),
      vue.createElementVNode("image", {
        class: "logo",
        src: _imports_0$3
      }),
      vue.createElementVNode("view", { class: "footer" }, [
        vue.createElementVNode("text", { class: "footer-text" }, "一路同行，美好随行"),
        vue.createElementVNode("text", { class: "version" }, "V1.0.0")
      ])
    ]);
  }
  const PagesIndexLaunch = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-8d8376b8"], ["__file", "D:/GitHub/Mobile-Carpooling-System/ridesharing/pages/index/launch.vue"]]);
  const _imports_0$2 = "/static/pictures/welcome0.png";
  const _imports_1 = "/static/pictures/welcome1.png";
  const _sfc_main$c = {
    methods: {
      goToExperience() {
        uni.reLaunch({
          url: "/pages/index/index"
          // 你想跳转的主页面
        });
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "splash-container" }, [
      vue.createCommentVNode(" 使用swiper组件 "),
      vue.createElementVNode("swiper", {
        class: "swiper",
        "indicator-dots": "true",
        autoplay: "false",
        interval: "5000",
        duration: "300",
        circular: "true"
      }, [
        vue.createCommentVNode(" 第一个页面 "),
        vue.createElementVNode("swiper-item", { class: "page1" }, [
          vue.createElementVNode("view", { class: "page-content" }, [
            vue.createElementVNode("text", { class: "title" }, [
              vue.createElementVNode("text", { class: "orange-text" }, "连接"),
              vue.createElementVNode("text", { class: "green-text" }, "你我")
            ]),
            vue.createElementVNode("text", { class: "title" }, [
              vue.createElementVNode("text", { class: "orange-text" }, "连接"),
              vue.createElementVNode("text", { class: "green-text" }, "城市")
            ]),
            vue.createElementVNode("image", {
              class: "image",
              src: _imports_0$2
            })
          ])
        ]),
        vue.createCommentVNode(" 第二个页面 "),
        vue.createElementVNode("swiper-item", { class: "page2" }, [
          vue.createElementVNode("view", { class: "page-content" }, [
            vue.createCommentVNode(" 第一行：车主乘客一键切换 "),
            vue.createElementVNode("text", { class: "big-title" }, [
              vue.createElementVNode("text", { class: "green-text" }, "车主乘客"),
              vue.createElementVNode("text", { class: "small-green-text" }, "一键切换！")
            ]),
            vue.createCommentVNode(" 第二行：出行更自由 "),
            vue.createElementVNode("text", { class: "small-title" }, [
              vue.createElementVNode("text", { class: "orange-text" }, "出行更"),
              vue.createElementVNode("text", { class: "big-orange-text" }, "自由!")
            ]),
            vue.createElementVNode("image", {
              class: "image",
              src: _imports_1
            }),
            vue.createElementVNode("button", {
              class: "experience-button",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.goToExperience && $options.goToExperience(...args))
            }, "立即体验")
          ])
        ])
      ])
    ]);
  }
  const PagesIndexWelcome = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-c7aac77f"], ["__file", "D:/GitHub/Mobile-Carpooling-System/ridesharing/pages/index/welcome.vue"]]);
  const _sfc_main$b = {
    data() {
      return {
        statusBarHeight: uni.getSystemInfoSync().statusBarHeight
      };
    },
    methods: {
      ToInvitationMatch() {
        uni.navigateTo({
          url: "./InvitationMatch",
          animationType: "slide-in-right",
          animationDuration: 300
        });
      },
      ToDetailRequest() {
        uni.navigateTo({
          url: "./RequestList",
          animationType: "slide-in-right",
          animationDuration: 300
        });
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle({ paddingTop: $data.statusBarHeight + "px" })
      },
      [
        vue.createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.ToInvitationMatch && $options.ToInvitationMatch(...args))
        }, "发布"),
        vue.createElementVNode("button", {
          onClick: _cache[1] || (_cache[1] = (...args) => $options.ToDetailRequest && $options.ToDetailRequest(...args))
        }, "拼车需求")
      ],
      4
      /* STYLE */
    );
  }
  const PagesCustomerCustomer = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__file", "D:/GitHub/Mobile-Carpooling-System/ridesharing/pages/customer/customer.vue"]]);
  const _sfc_main$a = {
    data() {
      return {
        statusBarHeight: uni.getSystemInfoSync().statusBarHeight
      };
    },
    methods: {}
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle({ paddingTop: $data.statusBarHeight + "px" })
      },
      " 车主 ",
      4
      /* STYLE */
    );
  }
  const PagesDriverDriver = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__file", "D:/GitHub/Mobile-Carpooling-System/ridesharing/pages/driver/driver.vue"]]);
  const _sfc_main$9 = {
    data() {
      return {
        statusBarHeight: uni.getSystemInfoSync().statusBarHeight
      };
    },
    methods: {}
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle({ paddingTop: $data.statusBarHeight + "px" })
      },
      null,
      4
      /* STYLE */
    );
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__file", "D:/GitHub/Mobile-Carpooling-System/ridesharing/pages/index/index.vue"]]);
  const _sfc_main$8 = {
    data() {
      return {
        statusBarHeight: uni.getSystemInfoSync().statusBarHeight || 0
      };
    },
    methods: {
      goToSpecificPage() {
        uni.switchTab({
          url: "/pages/customer/customer"
        });
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle({ paddingTop: $data.statusBarHeight + "px" })
      },
      [
        vue.createCommentVNode(" 返回按钮 - 强制跳转到指定页面 "),
        vue.createElementVNode("view", {
          class: "back-button",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.goToSpecificPage && $options.goToSpecificPage(...args))
        }, [
          vue.createElementVNode("text", null, "← 返回首页")
        ]),
        vue.createElementVNode("view", { class: "content" }, " 我的个人页面 ")
      ],
      4
      /* STYLE */
    );
  }
  const PagesMyMy = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__file", "D:/GitHub/Mobile-Carpooling-System/ridesharing/pages/my/my.vue"]]);
  const _imports_0$1 = "/static/left-arrow.png";
  const _sfc_main$7 = {
    name: "PageHeader",
    // 给组件命名
    props: {
      backText: {
        type: String,
        default: "返回"
        // 默认值
      },
      backUrl: {
        type: String,
        default: "/pages/customer/customer"
        // 默认跳转到首页
      }
    },
    data() {
      return {};
    },
    methods: {
      handleBack() {
        uni.switchTab({
          url: this.backUrl
        });
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "all" }, [
      vue.createElementVNode("view", { class: "head-content" }, [
        vue.createElementVNode("view", null, [
          vue.createElementVNode("view", { class: "back-btn" }, [
            vue.createElementVNode("image", {
              src: _imports_0$1,
              class: "left-arrow",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.handleBack && $options.handleBack(...args))
            }),
            vue.createElementVNode(
              "text",
              { class: "back-text" },
              vue.toDisplayString($props.backText),
              1
              /* TEXT */
            )
          ])
        ])
      ])
    ]);
  }
  const ComponentsPageHeader = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__file", "D:/GitHub/Mobile-Carpooling-System/ridesharing/components/PageHeader.vue"]]);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const fontData = [
    {
      "font_class": "arrow-down",
      "unicode": ""
    },
    {
      "font_class": "arrow-left",
      "unicode": ""
    },
    {
      "font_class": "arrow-right",
      "unicode": ""
    },
    {
      "font_class": "arrow-up",
      "unicode": ""
    },
    {
      "font_class": "auth",
      "unicode": ""
    },
    {
      "font_class": "auth-filled",
      "unicode": ""
    },
    {
      "font_class": "back",
      "unicode": ""
    },
    {
      "font_class": "bars",
      "unicode": ""
    },
    {
      "font_class": "calendar",
      "unicode": ""
    },
    {
      "font_class": "calendar-filled",
      "unicode": ""
    },
    {
      "font_class": "camera",
      "unicode": ""
    },
    {
      "font_class": "camera-filled",
      "unicode": ""
    },
    {
      "font_class": "cart",
      "unicode": ""
    },
    {
      "font_class": "cart-filled",
      "unicode": ""
    },
    {
      "font_class": "chat",
      "unicode": ""
    },
    {
      "font_class": "chat-filled",
      "unicode": ""
    },
    {
      "font_class": "chatboxes",
      "unicode": ""
    },
    {
      "font_class": "chatboxes-filled",
      "unicode": ""
    },
    {
      "font_class": "chatbubble",
      "unicode": ""
    },
    {
      "font_class": "chatbubble-filled",
      "unicode": ""
    },
    {
      "font_class": "checkbox",
      "unicode": ""
    },
    {
      "font_class": "checkbox-filled",
      "unicode": ""
    },
    {
      "font_class": "checkmarkempty",
      "unicode": ""
    },
    {
      "font_class": "circle",
      "unicode": ""
    },
    {
      "font_class": "circle-filled",
      "unicode": ""
    },
    {
      "font_class": "clear",
      "unicode": ""
    },
    {
      "font_class": "close",
      "unicode": ""
    },
    {
      "font_class": "closeempty",
      "unicode": ""
    },
    {
      "font_class": "cloud-download",
      "unicode": ""
    },
    {
      "font_class": "cloud-download-filled",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload-filled",
      "unicode": ""
    },
    {
      "font_class": "color",
      "unicode": ""
    },
    {
      "font_class": "color-filled",
      "unicode": ""
    },
    {
      "font_class": "compose",
      "unicode": ""
    },
    {
      "font_class": "contact",
      "unicode": ""
    },
    {
      "font_class": "contact-filled",
      "unicode": ""
    },
    {
      "font_class": "down",
      "unicode": ""
    },
    {
      "font_class": "bottom",
      "unicode": ""
    },
    {
      "font_class": "download",
      "unicode": ""
    },
    {
      "font_class": "download-filled",
      "unicode": ""
    },
    {
      "font_class": "email",
      "unicode": ""
    },
    {
      "font_class": "email-filled",
      "unicode": ""
    },
    {
      "font_class": "eye",
      "unicode": ""
    },
    {
      "font_class": "eye-filled",
      "unicode": ""
    },
    {
      "font_class": "eye-slash",
      "unicode": ""
    },
    {
      "font_class": "eye-slash-filled",
      "unicode": ""
    },
    {
      "font_class": "fire",
      "unicode": ""
    },
    {
      "font_class": "fire-filled",
      "unicode": ""
    },
    {
      "font_class": "flag",
      "unicode": ""
    },
    {
      "font_class": "flag-filled",
      "unicode": ""
    },
    {
      "font_class": "folder-add",
      "unicode": ""
    },
    {
      "font_class": "folder-add-filled",
      "unicode": ""
    },
    {
      "font_class": "font",
      "unicode": ""
    },
    {
      "font_class": "forward",
      "unicode": ""
    },
    {
      "font_class": "gear",
      "unicode": ""
    },
    {
      "font_class": "gear-filled",
      "unicode": ""
    },
    {
      "font_class": "gift",
      "unicode": ""
    },
    {
      "font_class": "gift-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-down",
      "unicode": ""
    },
    {
      "font_class": "hand-down-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-up",
      "unicode": ""
    },
    {
      "font_class": "hand-up-filled",
      "unicode": ""
    },
    {
      "font_class": "headphones",
      "unicode": ""
    },
    {
      "font_class": "heart",
      "unicode": ""
    },
    {
      "font_class": "heart-filled",
      "unicode": ""
    },
    {
      "font_class": "help",
      "unicode": ""
    },
    {
      "font_class": "help-filled",
      "unicode": ""
    },
    {
      "font_class": "home",
      "unicode": ""
    },
    {
      "font_class": "home-filled",
      "unicode": ""
    },
    {
      "font_class": "image",
      "unicode": ""
    },
    {
      "font_class": "image-filled",
      "unicode": ""
    },
    {
      "font_class": "images",
      "unicode": ""
    },
    {
      "font_class": "images-filled",
      "unicode": ""
    },
    {
      "font_class": "info",
      "unicode": ""
    },
    {
      "font_class": "info-filled",
      "unicode": ""
    },
    {
      "font_class": "left",
      "unicode": ""
    },
    {
      "font_class": "link",
      "unicode": ""
    },
    {
      "font_class": "list",
      "unicode": ""
    },
    {
      "font_class": "location",
      "unicode": ""
    },
    {
      "font_class": "location-filled",
      "unicode": ""
    },
    {
      "font_class": "locked",
      "unicode": ""
    },
    {
      "font_class": "locked-filled",
      "unicode": ""
    },
    {
      "font_class": "loop",
      "unicode": ""
    },
    {
      "font_class": "mail-open",
      "unicode": ""
    },
    {
      "font_class": "mail-open-filled",
      "unicode": ""
    },
    {
      "font_class": "map",
      "unicode": ""
    },
    {
      "font_class": "map-filled",
      "unicode": ""
    },
    {
      "font_class": "map-pin",
      "unicode": ""
    },
    {
      "font_class": "map-pin-ellipse",
      "unicode": ""
    },
    {
      "font_class": "medal",
      "unicode": ""
    },
    {
      "font_class": "medal-filled",
      "unicode": ""
    },
    {
      "font_class": "mic",
      "unicode": ""
    },
    {
      "font_class": "mic-filled",
      "unicode": ""
    },
    {
      "font_class": "micoff",
      "unicode": ""
    },
    {
      "font_class": "micoff-filled",
      "unicode": ""
    },
    {
      "font_class": "minus",
      "unicode": ""
    },
    {
      "font_class": "minus-filled",
      "unicode": ""
    },
    {
      "font_class": "more",
      "unicode": ""
    },
    {
      "font_class": "more-filled",
      "unicode": ""
    },
    {
      "font_class": "navigate",
      "unicode": ""
    },
    {
      "font_class": "navigate-filled",
      "unicode": ""
    },
    {
      "font_class": "notification",
      "unicode": ""
    },
    {
      "font_class": "notification-filled",
      "unicode": ""
    },
    {
      "font_class": "paperclip",
      "unicode": ""
    },
    {
      "font_class": "paperplane",
      "unicode": ""
    },
    {
      "font_class": "paperplane-filled",
      "unicode": ""
    },
    {
      "font_class": "person",
      "unicode": ""
    },
    {
      "font_class": "person-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled-copy",
      "unicode": ""
    },
    {
      "font_class": "phone",
      "unicode": ""
    },
    {
      "font_class": "phone-filled",
      "unicode": ""
    },
    {
      "font_class": "plus",
      "unicode": ""
    },
    {
      "font_class": "plus-filled",
      "unicode": ""
    },
    {
      "font_class": "plusempty",
      "unicode": ""
    },
    {
      "font_class": "pulldown",
      "unicode": ""
    },
    {
      "font_class": "pyq",
      "unicode": ""
    },
    {
      "font_class": "qq",
      "unicode": ""
    },
    {
      "font_class": "redo",
      "unicode": ""
    },
    {
      "font_class": "redo-filled",
      "unicode": ""
    },
    {
      "font_class": "refresh",
      "unicode": ""
    },
    {
      "font_class": "refresh-filled",
      "unicode": ""
    },
    {
      "font_class": "refreshempty",
      "unicode": ""
    },
    {
      "font_class": "reload",
      "unicode": ""
    },
    {
      "font_class": "right",
      "unicode": ""
    },
    {
      "font_class": "scan",
      "unicode": ""
    },
    {
      "font_class": "search",
      "unicode": ""
    },
    {
      "font_class": "settings",
      "unicode": ""
    },
    {
      "font_class": "settings-filled",
      "unicode": ""
    },
    {
      "font_class": "shop",
      "unicode": ""
    },
    {
      "font_class": "shop-filled",
      "unicode": ""
    },
    {
      "font_class": "smallcircle",
      "unicode": ""
    },
    {
      "font_class": "smallcircle-filled",
      "unicode": ""
    },
    {
      "font_class": "sound",
      "unicode": ""
    },
    {
      "font_class": "sound-filled",
      "unicode": ""
    },
    {
      "font_class": "spinner-cycle",
      "unicode": ""
    },
    {
      "font_class": "staff",
      "unicode": ""
    },
    {
      "font_class": "staff-filled",
      "unicode": ""
    },
    {
      "font_class": "star",
      "unicode": ""
    },
    {
      "font_class": "star-filled",
      "unicode": ""
    },
    {
      "font_class": "starhalf",
      "unicode": ""
    },
    {
      "font_class": "trash",
      "unicode": ""
    },
    {
      "font_class": "trash-filled",
      "unicode": ""
    },
    {
      "font_class": "tune",
      "unicode": ""
    },
    {
      "font_class": "tune-filled",
      "unicode": ""
    },
    {
      "font_class": "undo",
      "unicode": ""
    },
    {
      "font_class": "undo-filled",
      "unicode": ""
    },
    {
      "font_class": "up",
      "unicode": ""
    },
    {
      "font_class": "top",
      "unicode": ""
    },
    {
      "font_class": "upload",
      "unicode": ""
    },
    {
      "font_class": "upload-filled",
      "unicode": ""
    },
    {
      "font_class": "videocam",
      "unicode": ""
    },
    {
      "font_class": "videocam-filled",
      "unicode": ""
    },
    {
      "font_class": "vip",
      "unicode": ""
    },
    {
      "font_class": "vip-filled",
      "unicode": ""
    },
    {
      "font_class": "wallet",
      "unicode": ""
    },
    {
      "font_class": "wallet-filled",
      "unicode": ""
    },
    {
      "font_class": "weibo",
      "unicode": ""
    },
    {
      "font_class": "weixin",
      "unicode": ""
    }
  ];
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$6 = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      },
      fontFamily: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: fontData
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v) => v.font_class === this.type);
        if (code) {
          return code.unicode;
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      },
      styleObj() {
        if (this.fontFamily !== "") {
          return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
        }
        return `color: ${this.color}; font-size: ${this.iconSize};`;
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.styleObj),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-d31e1c47"], ["__file", "D:/GitHub/Mobile-Carpooling-System/ridesharing/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  const _sfc_main$5 = {
    name: "UniRate",
    props: {
      isFill: {
        // 星星的类型，是否镂空
        type: [Boolean, String],
        default: true
      },
      color: {
        // 星星未选中的颜色
        type: String,
        default: "#ececec"
      },
      activeColor: {
        // 星星选中状态颜色
        type: String,
        default: "#ffca3e"
      },
      disabledColor: {
        // 星星禁用状态颜色
        type: String,
        default: "#c0c0c0"
      },
      size: {
        // 星星的大小
        type: [Number, String],
        default: 24
      },
      value: {
        // 当前评分
        type: [Number, String],
        default: 0
      },
      modelValue: {
        // 当前评分
        type: [Number, String],
        default: 0
      },
      max: {
        // 最大评分
        type: [Number, String],
        default: 5
      },
      margin: {
        // 星星的间距
        type: [Number, String],
        default: 0
      },
      disabled: {
        // 是否可点击
        type: [Boolean, String],
        default: false
      },
      readonly: {
        // 是否只读
        type: [Boolean, String],
        default: false
      },
      allowHalf: {
        // 是否显示半星
        type: [Boolean, String],
        default: false
      },
      touchable: {
        // 是否支持滑动手势
        type: [Boolean, String],
        default: true
      }
    },
    data() {
      return {
        valueSync: "",
        userMouseFristMove: true,
        userRated: false,
        userLastRate: 1
      };
    },
    watch: {
      value(newVal) {
        this.valueSync = Number(newVal);
      },
      modelValue(newVal) {
        this.valueSync = Number(newVal);
      }
    },
    computed: {
      stars() {
        const value = this.valueSync ? this.valueSync : 0;
        const starList = [];
        const floorValue = Math.floor(value);
        const ceilValue = Math.ceil(value);
        for (let i = 0; i < this.max; i++) {
          if (floorValue > i) {
            starList.push({
              activeWitch: "100%"
            });
          } else if (ceilValue - 1 === i) {
            starList.push({
              activeWitch: (value - floorValue) * 100 + "%"
            });
          } else {
            starList.push({
              activeWitch: "0"
            });
          }
        }
        return starList;
      },
      marginNumber() {
        return Number(this.margin);
      }
    },
    created() {
      this.valueSync = Number(this.value || this.modelValue);
      this._rateBoxLeft = 0;
      this._oldValue = null;
    },
    mounted() {
      setTimeout(() => {
        this._getSize();
      }, 100);
    },
    methods: {
      touchstart(e) {
        if (this.readonly || this.disabled)
          return;
        const {
          clientX,
          screenX
        } = e.changedTouches[0];
        this._getRateCount(clientX || screenX);
      },
      touchmove(e) {
        if (this.readonly || this.disabled || !this.touchable)
          return;
        const {
          clientX,
          screenX
        } = e.changedTouches[0];
        this._getRateCount(clientX || screenX);
      },
      /**
       * 兼容 PC @tian
       */
      mousedown(e) {
      },
      mousemove(e) {
      },
      mouseleave(e) {
      },
      /**
       * 获取星星个数
       */
      _getRateCount(clientX) {
        this._getSize();
        const size = Number(this.size);
        if (isNaN(size)) {
          return new Error("size 属性只能设置为数字");
        }
        const rateMoveRange = clientX - this._rateBoxLeft;
        let index = parseInt(rateMoveRange / (size + this.marginNumber));
        index = index < 0 ? 0 : index;
        index = index > this.max ? this.max : index;
        const range = parseInt(rateMoveRange - (size + this.marginNumber) * index);
        let value = 0;
        if (this._oldValue === index && !this.PC)
          return;
        this._oldValue = index;
        if (this.allowHalf) {
          if (range > size / 2) {
            value = index + 1;
          } else {
            value = index + 0.5;
          }
        } else {
          value = index + 1;
        }
        value = Math.max(0.5, Math.min(value, this.max));
        this.valueSync = value;
        this._onChange();
      },
      /**
       * 触发动态修改
       */
      _onChange() {
        this.$emit("input", this.valueSync);
        this.$emit("update:modelValue", this.valueSync);
        this.$emit("change", {
          value: this.valueSync
        });
      },
      /**
       * 获取星星距离屏幕左侧距离
       */
      _getSize() {
        uni.createSelectorQuery().in(this).select(".uni-rate").boundingClientRect().exec((ret) => {
          if (ret) {
            this._rateBoxLeft = ret[0].left;
          }
        });
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode(
        "view",
        {
          ref: "uni-rate",
          class: "uni-rate"
        },
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($options.stars, (star, index) => {
              return vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  class: vue.normalizeClass(["uni-rate__icon", { "uni-cursor-not-allowed": $props.disabled }]),
                  style: vue.normalizeStyle({ "margin-right": $options.marginNumber + "px" }),
                  key: index,
                  onTouchstart: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.touchstart && $options.touchstart(...args), ["stop"])),
                  onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers((...args) => $options.touchmove && $options.touchmove(...args), ["stop"])),
                  onMousedown: _cache[2] || (_cache[2] = vue.withModifiers((...args) => $options.mousedown && $options.mousedown(...args), ["stop"])),
                  onMousemove: _cache[3] || (_cache[3] = vue.withModifiers((...args) => $options.mousemove && $options.mousemove(...args), ["stop"])),
                  onMouseleave: _cache[4] || (_cache[4] = (...args) => $options.mouseleave && $options.mouseleave(...args))
                },
                [
                  vue.createVNode(_component_uni_icons, {
                    color: $props.color,
                    size: $props.size,
                    type: $props.isFill ? "star-filled" : "star"
                  }, null, 8, ["color", "size", "type"]),
                  vue.createElementVNode(
                    "view",
                    {
                      style: vue.normalizeStyle({ width: star.activeWitch }),
                      class: "uni-rate__icon-on"
                    },
                    [
                      vue.createVNode(_component_uni_icons, {
                        color: $props.disabled ? $props.disabledColor : $props.activeColor,
                        size: $props.size,
                        type: "star-filled"
                      }, null, 8, ["color", "size"])
                    ],
                    4
                    /* STYLE */
                  )
                ],
                38
                /* CLASS, STYLE, NEED_HYDRATION */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        512
        /* NEED_PATCH */
      )
    ]);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-5c8fbdf3"], ["__file", "D:/GitHub/Mobile-Carpooling-System/ridesharing/uni_modules/uni-rate/components/uni-rate/uni-rate.vue"]]);
  function formatDateTime(dateStr) {
    if (!dateStr)
      return "";
    try {
      const normalizedDateStr = dateStr.replace(/[年月日]/g, "-").replace(/[时分秒]/g, ":");
      const date = new Date(normalizedDateStr);
      if (isNaN(date.getTime())) {
        const [datePart, timePart] = dateStr.split(" ");
        const [year, month2, day2] = datePart.split("-");
        return `${parseInt(month2)}月${parseInt(day2)}日 ${timePart}`;
      }
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${month}月${day}日 ${hours}:${minutes}`;
    } catch (e) {
      formatAppLog("error", "at utils/functions/formatDateTime.js:25", "日期格式错误:", dateStr, e);
      return dateStr;
    }
  }
  const _sfc_main$4 = {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    name: "ListBlock",
    // 给组件命名
    data() {
      return {
        isPressed: false
      };
    },
    mounted() {
    },
    methods: {
      formatDateTime,
      formatCarPlate(plate) {
        if (!plate)
          return "";
        if (plate.length > 3) {
          return `${plate.substring(0, 2)}·${plate.substring(2, 3)}****`;
        }
        return plate;
      },
      async createOrder() {
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    const _component_uni_rate = resolveEasycom(vue.resolveDynamicComponent("uni-rate"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "block" }, [
      vue.createElementVNode("view", { class: "up" }, [
        vue.createElementVNode("view", { class: "up-left" }, [
          vue.createElementVNode("text", { style: { "font-size": "16px", "font-weight": "bold" } }, [
            vue.createElementVNode("text", null, "出发时间"),
            vue.createElementVNode(
              "text",
              { style: { "margin-left": "10px" } },
              vue.toDisplayString($options.formatDateTime($props.item.startAt)),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "location-section" }, [
            vue.createElementVNode("view", { class: "location-item" }, [
              vue.createVNode(_component_uni_icons, {
                type: "circle-filled",
                size: "16",
                color: "var(--color-green)"
              }),
              vue.createElementVNode(
                "text",
                { class: "location-text" },
                vue.toDisplayString($props.item.startLoc),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "location-item" }, [
              vue.createVNode(_component_uni_icons, {
                type: "circle-filled",
                size: "16",
                color: "var(--color-orange)"
              }),
              vue.createElementVNode(
                "text",
                { class: "location-text" },
                vue.toDisplayString($props.item.endLoc),
                1
                /* TEXT */
              )
            ])
          ]),
          vue.createElementVNode(
            "text",
            { style: { "font-size": "14px", "font-weight": "bold", "color": "#878887" } },
            " 起终点与您位置偏差" + vue.toDisplayString($props.item.offset) + "km ",
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "up-right" }, [
          vue.createElementVNode("view", { style: { "display": "flex", "align-items": "center" } }, [
            vue.createElementVNode("image", {
              src: $props.item.avatar,
              class: "driver-avatar",
              mode: "aspectFill"
            }, null, 8, ["src"]),
            vue.createElementVNode(
              "text",
              { class: "car-plate" },
              vue.toDisplayString($options.formatCarPlate($props.item.carPlate)),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "car_info" }, [
            vue.createElementVNode(
              "text",
              { style: { "margin-right": "5px" } },
              vue.toDisplayString($props.item.car_color),
              1
              /* TEXT */
            ),
            vue.createElementVNode("text", null, "|"),
            vue.createElementVNode(
              "text",
              { style: { "margin-left": "5px" } },
              vue.toDisplayString($props.item.car_model),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "driver_info" }, [
            vue.createElementVNode(
              "text",
              { style: { "margin-right": "8px", "color": "black" } },
              vue.toDisplayString($props.item.username),
              1
              /* TEXT */
            ),
            vue.createVNode(_component_uni_rate, {
              value: $props.item.rating,
              size: "14",
              color: "#bbb",
              "active-color": "var(--color-yellow)",
              readonly: ""
            }, null, 8, ["value"]),
            vue.createElementVNode(
              "text",
              { style: { "margin-left": "8px", "color": "var(--color-yellow)" } },
              vue.toDisplayString($props.item.rating) + "分",
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "price" }, [
            vue.createElementVNode("text", { style: { "font-size": "20px", "color": "var(--color-blue)", "font-weight": "bold" } }, "预估"),
            vue.createElementVNode(
              "text",
              { style: { "font-size": "32px", "color": "var(--color-red)", "font-weight": "bold", "margin-left": "3px", "margin-right": "3px" } },
              vue.toDisplayString($props.item.price),
              1
              /* TEXT */
            ),
            vue.createElementVNode("text", { style: { "font-size": "20px", "color": "var(--color-blue)", "font-weight": "bold" } }, "元")
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "line" }),
      vue.createElementVNode("view", { class: "down" }, [
        vue.createElementVNode(
          "text",
          {
            class: vue.normalizeClass(["seats", {
              "seats-green": $props.item.seats >= 3,
              "seats-yellow": $props.item.seats === 2,
              "seats-red": $props.item.seats === 1
            }])
          },
          " 还可搭载" + vue.toDisplayString($props.item.seats) + "人 ",
          3
          /* TEXT, CLASS */
        ),
        vue.createElementVNode(
          "text",
          {
            class: vue.normalizeClass(["abutton", { "active": $data.isPressed }]),
            onClick: _cache[0] || (_cache[0] = (...args) => $options.createOrder && $options.createOrder(...args)),
            onTouchstart: _cache[1] || (_cache[1] = ($event) => $data.isPressed = true),
            onTouchend: _cache[2] || (_cache[2] = ($event) => $data.isPressed = false)
          },
          " 选择 ",
          34
          /* CLASS, NEED_HYDRATION */
        )
      ])
    ]);
  }
  const ComponentsListBlock = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "D:/GitHub/Mobile-Carpooling-System/ridesharing/components/ListBlock.vue"]]);
  const _sfc_main$3 = {
    mounted() {
      this.publishDemand();
    },
    components: {
      PageHeader: ComponentsPageHeader,
      ListBlock: ComponentsListBlock
    },
    data() {
      return {
        listBlockItems: [
          {
            startAt: "2023-05-15 08:30",
            startLoc: "北京市海淀区中关村",
            endLoc: "北京市朝阳区国贸",
            seats: 3,
            username: "张师傅",
            carPlate: "京A12345",
            price: 45,
            offset: 1.2,
            avatar: "/static/logo.png",
            car_color: "黑色",
            car_model: "奥迪A6",
            rating: 4.3
          },
          {
            startAt: "2023-05-15 09:15",
            startLoc: "北京市海淀区五道口",
            endLoc: "北京市西城区金融街",
            seats: 2,
            username: "李师傅",
            carPlate: "京B67890",
            price: 35.5,
            offset: 3.2,
            avatar: "/static/logo.png",
            car_color: "白色",
            car_model: "本田雅阁",
            rating: 5
          }
        ]
      };
    },
    onLoad() {
    },
    methods: {
      // 获取匹配订单
      getMatchedOrders() {
        uni.request({
          url: "https://example.com/api/matched-orders",
          // 需替换为实际API地址
          method: "GET",
          success: (res) => {
            if (res.statusCode === 200) {
              this.listBlockItems = res.data.list_matched.map((item) => ({
                startAt: item.start_at,
                startLoc: item.start_loc,
                endLoc: item.end_loc,
                seats: item.seats,
                username: item.username,
                carPlate: item.verification_car_plate,
                price: item.price,
                offset: item.offset,
                avatar: item.avatar || "/static/logo.png",
                // 后端返回的头像路径
                car_color: item.verification_color,
                car_model: item.verification_ar_model,
                rating: item.rating
              }));
            } else {
              formatAppLog("error", "at pages/customer/InvitationMatch.vue:88", "请求失败:", res);
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/customer/InvitationMatch.vue:92", "网络请求失败:", err);
          }
        });
      },
      publishDemand() {
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_PageHeader = vue.resolveComponent("PageHeader");
    const _component_ListBlock = vue.resolveComponent("ListBlock");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_PageHeader, {
        backText: "行程匹配的私家车邀请",
        backUrl: "/pages/customer/customer"
      }),
      $data.listBlockItems.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.listBlockItems, (item, index) => {
            return vue.openBlock(), vue.createBlock(_component_ListBlock, {
              key: index,
              item
            }, null, 8, ["item"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "empty-tips"
      }, [
        vue.createElementVNode("text", null, "暂时没有与您行程匹配的车主"),
        vue.createElementVNode("text", null, "已将您的需求发布"),
        vue.createElementVNode("text", null, "请耐心等待~")
      ]))
    ]);
  }
  const PagesCustomerInvitationMatch = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "D:/GitHub/Mobile-Carpooling-System/ridesharing/pages/customer/InvitationMatch.vue"]]);
  const _imports_0 = "/static/right-arrow-blue.png";
  const _sfc_main$2 = {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    name: "RequestBlock",
    // 给组件命名
    data() {
      return {};
    },
    methods: {
      formatDateTime,
      editRequest() {
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "block" }, [
        vue.createElementVNode("view", { class: "left" }, [
          vue.createElementVNode("text", { style: { "font-size": "16px", "font-weight": "bold" } }, [
            vue.createElementVNode("text", null, "出发时间"),
            vue.createElementVNode(
              "text",
              { style: { "margin-left": "10px" } },
              vue.toDisplayString($options.formatDateTime($props.item.startAt)),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "location-section" }, [
            vue.createElementVNode("view", { class: "location-item" }, [
              vue.createVNode(_component_uni_icons, {
                type: "circle-filled",
                size: "16",
                color: "var(--color-green)"
              }),
              vue.createElementVNode(
                "text",
                { class: "location-text" },
                vue.toDisplayString($props.item.startLoc),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "location-item" }, [
              vue.createVNode(_component_uni_icons, {
                type: "circle-filled",
                size: "16",
                color: "var(--color-orange)"
              }),
              vue.createElementVNode(
                "text",
                { class: "location-text" },
                vue.toDisplayString($props.item.endLoc),
                1
                /* TEXT */
              )
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "right" }, [
          $props.item.status === "pending" || $props.item.status === "matched" ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "edit-btn"
          }, [
            vue.createElementVNode("text", { class: "edit-text" }, "修改"),
            vue.createElementVNode("image", {
              src: _imports_0,
              class: "right-arrow",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.editRequest && $options.editRequest(...args))
            })
          ])) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "edit-btn-placeholder"
          })),
          vue.createElementVNode(
            "text",
            {
              class: vue.normalizeClass(["status", "status-" + $props.item.status])
            },
            vue.toDisplayString($props.item.status === "pending" ? "待接单" : $props.item.status === "matched" ? "进行中" : $props.item.status === "completed" ? "已完成" : $props.item.status === "canceled" ? "已取消" : ""),
            3
            /* TEXT, CLASS */
          )
        ])
      ])
    ]);
  }
  const ComponentsRequestBlock = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "D:/GitHub/Mobile-Carpooling-System/ridesharing/components/RequestBlock.vue"]]);
  const _sfc_main$1 = {
    components: {
      PageHeader: ComponentsPageHeader,
      RequestBlock: ComponentsRequestBlock
    },
    data() {
      return {
        RequestBlockItems: [
          {
            startAt: "2023-05-15 08:30",
            startLoc: "北京市海淀区中关村",
            endLoc: "北京市朝阳区国贸",
            status: "pending"
          },
          {
            startAt: "2023-05-15 09:15",
            startLoc: "北京市海淀区五道口",
            endLoc: "北京市西城区金融街",
            status: "completed"
          }
        ]
      };
    },
    onLoad() {
    },
    methods: {
      // 获取匹配订单
      getRequests() {
        uni.request({
          url: "https://example.com/api/get-requests",
          // 需替换为实际API地址
          method: "GET",
          success: (res) => {
            if (res.statusCode === 200) {
              this.RequestBlockItems = res.data.requests.map((item) => ({
                startAt: item.start_at,
                startLoc: item.start_loc,
                endLoc: item.end_loc,
                status: item.status
              }));
            } else {
              formatAppLog("error", "at pages/customer/RequestList.vue:60", "请求失败:", res);
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/customer/RequestList.vue:64", "网络请求失败:", err);
          }
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_PageHeader = vue.resolveComponent("PageHeader");
    const _component_RequestBlock = vue.resolveComponent("RequestBlock");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_PageHeader, {
        backText: "我的拼车需求",
        backUrl: "/pages/customer/customer"
      }),
      $data.RequestBlockItems.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.RequestBlockItems, (item, index) => {
            return vue.openBlock(), vue.createBlock(_component_RequestBlock, {
              key: index,
              item
            }, null, 8, ["item"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "empty-tips"
      }, [
        vue.createElementVNode("text", null, "您暂时还未发布过拼车需求哦")
      ]))
    ]);
  }
  const PagesCustomerRequestList = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/GitHub/Mobile-Carpooling-System/ridesharing/pages/customer/RequestList.vue"]]);
  __definePage("pages/index/launch", PagesIndexLaunch);
  __definePage("pages/index/welcome", PagesIndexWelcome);
  __definePage("pages/customer/customer", PagesCustomerCustomer);
  __definePage("pages/driver/driver", PagesDriverDriver);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/my/my", PagesMyMy);
  __definePage("components/PageHeader", ComponentsPageHeader);
  __definePage("pages/customer/InvitationMatch", PagesCustomerInvitationMatch);
  __definePage("components/ListBlock", ComponentsListBlock);
  __definePage("pages/customer/RequestList", PagesCustomerRequestList);
  __definePage("components/RequestBlock", ComponentsRequestBlock);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("warn", "at App.vue:4", "当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
      formatAppLog("log", "at App.vue:5", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:8", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:11", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/GitHub/Mobile-Carpooling-System/ridesharing/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
