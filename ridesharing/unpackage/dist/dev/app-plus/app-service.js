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
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
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
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$D = {
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
  function _sfc_render$C(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$C], ["__scopeId", "data-v-d31e1c47"], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = { ...defaultSettings };
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        }
      };
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && pluginDescriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(pluginDescriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
   * vuex v4.1.0
   * (c) 2022 Evan You
   * @license MIT
   */
  var storeKey = "store";
  function forEachValue(obj, fn) {
    Object.keys(obj).forEach(function(key) {
      return fn(obj[key], key);
    });
  }
  function isObject(obj) {
    return obj !== null && typeof obj === "object";
  }
  function isPromise(val) {
    return val && typeof val.then === "function";
  }
  function assert(condition, msg) {
    if (!condition) {
      throw new Error("[vuex] " + msg);
    }
  }
  function partial(fn, arg) {
    return function() {
      return fn(arg);
    };
  }
  function genericSubscribe(fn, subs, options) {
    if (subs.indexOf(fn) < 0) {
      options && options.prepend ? subs.unshift(fn) : subs.push(fn);
    }
    return function() {
      var i = subs.indexOf(fn);
      if (i > -1) {
        subs.splice(i, 1);
      }
    };
  }
  function resetStore(store2, hot) {
    store2._actions = /* @__PURE__ */ Object.create(null);
    store2._mutations = /* @__PURE__ */ Object.create(null);
    store2._wrappedGetters = /* @__PURE__ */ Object.create(null);
    store2._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
    var state = store2.state;
    installModule(store2, state, [], store2._modules.root, true);
    resetStoreState(store2, state, hot);
  }
  function resetStoreState(store2, state, hot) {
    var oldState = store2._state;
    var oldScope = store2._scope;
    store2.getters = {};
    store2._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
    var wrappedGetters = store2._wrappedGetters;
    var computedObj = {};
    var computedCache = {};
    var scope = vue.effectScope(true);
    scope.run(function() {
      forEachValue(wrappedGetters, function(fn, key) {
        computedObj[key] = partial(fn, store2);
        computedCache[key] = vue.computed(function() {
          return computedObj[key]();
        });
        Object.defineProperty(store2.getters, key, {
          get: function() {
            return computedCache[key].value;
          },
          enumerable: true
          // for local getters
        });
      });
    });
    store2._state = vue.reactive({
      data: state
    });
    store2._scope = scope;
    if (store2.strict) {
      enableStrictMode(store2);
    }
    if (oldState) {
      if (hot) {
        store2._withCommit(function() {
          oldState.data = null;
        });
      }
    }
    if (oldScope) {
      oldScope.stop();
    }
  }
  function installModule(store2, rootState, path, module, hot) {
    var isRoot = !path.length;
    var namespace = store2._modules.getNamespace(path);
    if (module.namespaced) {
      if (store2._modulesNamespaceMap[namespace] && true) {
        console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join("/"));
      }
      store2._modulesNamespaceMap[namespace] = module;
    }
    if (!isRoot && !hot) {
      var parentState = getNestedState(rootState, path.slice(0, -1));
      var moduleName = path[path.length - 1];
      store2._withCommit(function() {
        {
          if (moduleName in parentState) {
            console.warn(
              '[vuex] state field "' + moduleName + '" was overridden by a module with the same name at "' + path.join(".") + '"'
            );
          }
        }
        parentState[moduleName] = module.state;
      });
    }
    var local = module.context = makeLocalContext(store2, namespace, path);
    module.forEachMutation(function(mutation, key) {
      var namespacedType = namespace + key;
      registerMutation(store2, namespacedType, mutation, local);
    });
    module.forEachAction(function(action, key) {
      var type = action.root ? key : namespace + key;
      var handler = action.handler || action;
      registerAction(store2, type, handler, local);
    });
    module.forEachGetter(function(getter, key) {
      var namespacedType = namespace + key;
      registerGetter(store2, namespacedType, getter, local);
    });
    module.forEachChild(function(child, key) {
      installModule(store2, rootState, path.concat(key), child, hot);
    });
  }
  function makeLocalContext(store2, namespace, path) {
    var noNamespace = namespace === "";
    var local = {
      dispatch: noNamespace ? store2.dispatch : function(_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type = args.type;
        if (!options || !options.root) {
          type = namespace + type;
          if (!store2._actions[type]) {
            console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
            return;
          }
        }
        return store2.dispatch(type, payload);
      },
      commit: noNamespace ? store2.commit : function(_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type = args.type;
        if (!options || !options.root) {
          type = namespace + type;
          if (!store2._mutations[type]) {
            console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
            return;
          }
        }
        store2.commit(type, payload, options);
      }
    };
    Object.defineProperties(local, {
      getters: {
        get: noNamespace ? function() {
          return store2.getters;
        } : function() {
          return makeLocalGetters(store2, namespace);
        }
      },
      state: {
        get: function() {
          return getNestedState(store2.state, path);
        }
      }
    });
    return local;
  }
  function makeLocalGetters(store2, namespace) {
    if (!store2._makeLocalGettersCache[namespace]) {
      var gettersProxy = {};
      var splitPos = namespace.length;
      Object.keys(store2.getters).forEach(function(type) {
        if (type.slice(0, splitPos) !== namespace) {
          return;
        }
        var localType = type.slice(splitPos);
        Object.defineProperty(gettersProxy, localType, {
          get: function() {
            return store2.getters[type];
          },
          enumerable: true
        });
      });
      store2._makeLocalGettersCache[namespace] = gettersProxy;
    }
    return store2._makeLocalGettersCache[namespace];
  }
  function registerMutation(store2, type, handler, local) {
    var entry = store2._mutations[type] || (store2._mutations[type] = []);
    entry.push(function wrappedMutationHandler(payload) {
      handler.call(store2, local.state, payload);
    });
  }
  function registerAction(store2, type, handler, local) {
    var entry = store2._actions[type] || (store2._actions[type] = []);
    entry.push(function wrappedActionHandler(payload) {
      var res = handler.call(store2, {
        dispatch: local.dispatch,
        commit: local.commit,
        getters: local.getters,
        state: local.state,
        rootGetters: store2.getters,
        rootState: store2.state
      }, payload);
      if (!isPromise(res)) {
        res = Promise.resolve(res);
      }
      if (store2._devtoolHook) {
        return res.catch(function(err) {
          store2._devtoolHook.emit("vuex:error", err);
          throw err;
        });
      } else {
        return res;
      }
    });
  }
  function registerGetter(store2, type, rawGetter, local) {
    if (store2._wrappedGetters[type]) {
      {
        console.error("[vuex] duplicate getter key: " + type);
      }
      return;
    }
    store2._wrappedGetters[type] = function wrappedGetter(store22) {
      return rawGetter(
        local.state,
        // local state
        local.getters,
        // local getters
        store22.state,
        // root state
        store22.getters
        // root getters
      );
    };
  }
  function enableStrictMode(store2) {
    vue.watch(function() {
      return store2._state.data;
    }, function() {
      {
        assert(store2._committing, "do not mutate vuex store state outside mutation handlers.");
      }
    }, { deep: true, flush: "sync" });
  }
  function getNestedState(state, path) {
    return path.reduce(function(state2, key) {
      return state2[key];
    }, state);
  }
  function unifyObjectStyle(type, payload, options) {
    if (isObject(type) && type.type) {
      options = payload;
      payload = type;
      type = type.type;
    }
    {
      assert(typeof type === "string", "expects string as the type, but found " + typeof type + ".");
    }
    return { type, payload, options };
  }
  var LABEL_VUEX_BINDINGS = "vuex bindings";
  var MUTATIONS_LAYER_ID = "vuex:mutations";
  var ACTIONS_LAYER_ID = "vuex:actions";
  var INSPECTOR_ID = "vuex";
  var actionId = 0;
  function addDevtools(app, store2) {
    setupDevtoolsPlugin(
      {
        id: "org.vuejs.vuex",
        app,
        label: "Vuex",
        homepage: "https://next.vuex.vuejs.org/",
        logo: "https://vuejs.org/images/icons/favicon-96x96.png",
        packageName: "vuex",
        componentStateTypes: [LABEL_VUEX_BINDINGS]
      },
      function(api) {
        api.addTimelineLayer({
          id: MUTATIONS_LAYER_ID,
          label: "Vuex Mutations",
          color: COLOR_LIME_500
        });
        api.addTimelineLayer({
          id: ACTIONS_LAYER_ID,
          label: "Vuex Actions",
          color: COLOR_LIME_500
        });
        api.addInspector({
          id: INSPECTOR_ID,
          label: "Vuex",
          icon: "storage",
          treeFilterPlaceholder: "Filter stores..."
        });
        api.on.getInspectorTree(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            if (payload.filter) {
              var nodes = [];
              flattenStoreForInspectorTree(nodes, store2._modules.root, payload.filter, "");
              payload.rootNodes = nodes;
            } else {
              payload.rootNodes = [
                formatStoreForInspectorTree(store2._modules.root, "")
              ];
            }
          }
        });
        api.on.getInspectorState(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            var modulePath = payload.nodeId;
            makeLocalGetters(store2, modulePath);
            payload.state = formatStoreForInspectorState(
              getStoreModule(store2._modules, modulePath),
              modulePath === "root" ? store2.getters : store2._makeLocalGettersCache,
              modulePath
            );
          }
        });
        api.on.editInspectorState(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            var modulePath = payload.nodeId;
            var path = payload.path;
            if (modulePath !== "root") {
              path = modulePath.split("/").filter(Boolean).concat(path);
            }
            store2._withCommit(function() {
              payload.set(store2._state.data, path, payload.state.value);
            });
          }
        });
        store2.subscribe(function(mutation, state) {
          var data = {};
          if (mutation.payload) {
            data.payload = mutation.payload;
          }
          data.state = state;
          api.notifyComponentUpdate();
          api.sendInspectorTree(INSPECTOR_ID);
          api.sendInspectorState(INSPECTOR_ID);
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: Date.now(),
              title: mutation.type,
              data
            }
          });
        });
        store2.subscribeAction({
          before: function(action, state) {
            var data = {};
            if (action.payload) {
              data.payload = action.payload;
            }
            action._id = actionId++;
            action._time = Date.now();
            data.state = state;
            api.addTimelineEvent({
              layerId: ACTIONS_LAYER_ID,
              event: {
                time: action._time,
                title: action.type,
                groupId: action._id,
                subtitle: "start",
                data
              }
            });
          },
          after: function(action, state) {
            var data = {};
            var duration = Date.now() - action._time;
            data.duration = {
              _custom: {
                type: "duration",
                display: duration + "ms",
                tooltip: "Action duration",
                value: duration
              }
            };
            if (action.payload) {
              data.payload = action.payload;
            }
            data.state = state;
            api.addTimelineEvent({
              layerId: ACTIONS_LAYER_ID,
              event: {
                time: Date.now(),
                title: action.type,
                groupId: action._id,
                subtitle: "end",
                data
              }
            });
          }
        });
      }
    );
  }
  var COLOR_LIME_500 = 8702998;
  var COLOR_DARK = 6710886;
  var COLOR_WHITE = 16777215;
  var TAG_NAMESPACED = {
    label: "namespaced",
    textColor: COLOR_WHITE,
    backgroundColor: COLOR_DARK
  };
  function extractNameFromPath(path) {
    return path && path !== "root" ? path.split("/").slice(-2, -1)[0] : "Root";
  }
  function formatStoreForInspectorTree(module, path) {
    return {
      id: path || "root",
      // all modules end with a `/`, we want the last segment only
      // cart/ -> cart
      // nested/cart/ -> cart
      label: extractNameFromPath(path),
      tags: module.namespaced ? [TAG_NAMESPACED] : [],
      children: Object.keys(module._children).map(
        function(moduleName) {
          return formatStoreForInspectorTree(
            module._children[moduleName],
            path + moduleName + "/"
          );
        }
      )
    };
  }
  function flattenStoreForInspectorTree(result, module, filter, path) {
    if (path.includes(filter)) {
      result.push({
        id: path || "root",
        label: path.endsWith("/") ? path.slice(0, path.length - 1) : path || "Root",
        tags: module.namespaced ? [TAG_NAMESPACED] : []
      });
    }
    Object.keys(module._children).forEach(function(moduleName) {
      flattenStoreForInspectorTree(result, module._children[moduleName], filter, path + moduleName + "/");
    });
  }
  function formatStoreForInspectorState(module, getters, path) {
    getters = path === "root" ? getters : getters[path];
    var gettersKeys = Object.keys(getters);
    var storeState = {
      state: Object.keys(module.state).map(function(key) {
        return {
          key,
          editable: true,
          value: module.state[key]
        };
      })
    };
    if (gettersKeys.length) {
      var tree = transformPathsToObjectTree(getters);
      storeState.getters = Object.keys(tree).map(function(key) {
        return {
          key: key.endsWith("/") ? extractNameFromPath(key) : key,
          editable: false,
          value: canThrow(function() {
            return tree[key];
          })
        };
      });
    }
    return storeState;
  }
  function transformPathsToObjectTree(getters) {
    var result = {};
    Object.keys(getters).forEach(function(key) {
      var path = key.split("/");
      if (path.length > 1) {
        var target = result;
        var leafKey = path.pop();
        path.forEach(function(p) {
          if (!target[p]) {
            target[p] = {
              _custom: {
                value: {},
                display: p,
                tooltip: "Module",
                abstract: true
              }
            };
          }
          target = target[p]._custom.value;
        });
        target[leafKey] = canThrow(function() {
          return getters[key];
        });
      } else {
        result[key] = canThrow(function() {
          return getters[key];
        });
      }
    });
    return result;
  }
  function getStoreModule(moduleMap, path) {
    var names = path.split("/").filter(function(n) {
      return n;
    });
    return names.reduce(
      function(module, moduleName, i) {
        var child = module[moduleName];
        if (!child) {
          throw new Error('Missing module "' + moduleName + '" for path "' + path + '".');
        }
        return i === names.length - 1 ? child : child._children;
      },
      path === "root" ? moduleMap : moduleMap.root._children
    );
  }
  function canThrow(cb) {
    try {
      return cb();
    } catch (e) {
      return e;
    }
  }
  var Module = function Module2(rawModule, runtime) {
    this.runtime = runtime;
    this._children = /* @__PURE__ */ Object.create(null);
    this._rawModule = rawModule;
    var rawState = rawModule.state;
    this.state = (typeof rawState === "function" ? rawState() : rawState) || {};
  };
  var prototypeAccessors$1 = { namespaced: { configurable: true } };
  prototypeAccessors$1.namespaced.get = function() {
    return !!this._rawModule.namespaced;
  };
  Module.prototype.addChild = function addChild(key, module) {
    this._children[key] = module;
  };
  Module.prototype.removeChild = function removeChild(key) {
    delete this._children[key];
  };
  Module.prototype.getChild = function getChild(key) {
    return this._children[key];
  };
  Module.prototype.hasChild = function hasChild(key) {
    return key in this._children;
  };
  Module.prototype.update = function update(rawModule) {
    this._rawModule.namespaced = rawModule.namespaced;
    if (rawModule.actions) {
      this._rawModule.actions = rawModule.actions;
    }
    if (rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations;
    }
    if (rawModule.getters) {
      this._rawModule.getters = rawModule.getters;
    }
  };
  Module.prototype.forEachChild = function forEachChild(fn) {
    forEachValue(this._children, fn);
  };
  Module.prototype.forEachGetter = function forEachGetter(fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn);
    }
  };
  Module.prototype.forEachAction = function forEachAction(fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn);
    }
  };
  Module.prototype.forEachMutation = function forEachMutation(fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn);
    }
  };
  Object.defineProperties(Module.prototype, prototypeAccessors$1);
  var ModuleCollection = function ModuleCollection2(rawRootModule) {
    this.register([], rawRootModule, false);
  };
  ModuleCollection.prototype.get = function get(path) {
    return path.reduce(function(module, key) {
      return module.getChild(key);
    }, this.root);
  };
  ModuleCollection.prototype.getNamespace = function getNamespace(path) {
    var module = this.root;
    return path.reduce(function(namespace, key) {
      module = module.getChild(key);
      return namespace + (module.namespaced ? key + "/" : "");
    }, "");
  };
  ModuleCollection.prototype.update = function update$1(rawRootModule) {
    update2([], this.root, rawRootModule);
  };
  ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
    var this$1$1 = this;
    if (runtime === void 0)
      runtime = true;
    {
      assertRawModule(path, rawModule);
    }
    var newModule = new Module(rawModule, runtime);
    if (path.length === 0) {
      this.root = newModule;
    } else {
      var parent = this.get(path.slice(0, -1));
      parent.addChild(path[path.length - 1], newModule);
    }
    if (rawModule.modules) {
      forEachValue(rawModule.modules, function(rawChildModule, key) {
        this$1$1.register(path.concat(key), rawChildModule, runtime);
      });
    }
  };
  ModuleCollection.prototype.unregister = function unregister(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    var child = parent.getChild(key);
    if (!child) {
      {
        console.warn(
          "[vuex] trying to unregister module '" + key + "', which is not registered"
        );
      }
      return;
    }
    if (!child.runtime) {
      return;
    }
    parent.removeChild(key);
  };
  ModuleCollection.prototype.isRegistered = function isRegistered(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    if (parent) {
      return parent.hasChild(key);
    }
    return false;
  };
  function update2(path, targetModule, newModule) {
    {
      assertRawModule(path, newModule);
    }
    targetModule.update(newModule);
    if (newModule.modules) {
      for (var key in newModule.modules) {
        if (!targetModule.getChild(key)) {
          {
            console.warn(
              "[vuex] trying to add a new module '" + key + "' on hot reloading, manual reload is needed"
            );
          }
          return;
        }
        update2(
          path.concat(key),
          targetModule.getChild(key),
          newModule.modules[key]
        );
      }
    }
  }
  var functionAssert = {
    assert: function(value) {
      return typeof value === "function";
    },
    expected: "function"
  };
  var objectAssert = {
    assert: function(value) {
      return typeof value === "function" || typeof value === "object" && typeof value.handler === "function";
    },
    expected: 'function or object with "handler" function'
  };
  var assertTypes = {
    getters: functionAssert,
    mutations: functionAssert,
    actions: objectAssert
  };
  function assertRawModule(path, rawModule) {
    Object.keys(assertTypes).forEach(function(key) {
      if (!rawModule[key]) {
        return;
      }
      var assertOptions = assertTypes[key];
      forEachValue(rawModule[key], function(value, type) {
        assert(
          assertOptions.assert(value),
          makeAssertionMessage(path, key, type, value, assertOptions.expected)
        );
      });
    });
  }
  function makeAssertionMessage(path, key, type, value, expected) {
    var buf = key + " should be " + expected + ' but "' + key + "." + type + '"';
    if (path.length > 0) {
      buf += ' in module "' + path.join(".") + '"';
    }
    buf += " is " + JSON.stringify(value) + ".";
    return buf;
  }
  function createStore(options) {
    return new Store(options);
  }
  var Store = function Store2(options) {
    var this$1$1 = this;
    if (options === void 0)
      options = {};
    {
      assert(typeof Promise !== "undefined", "vuex requires a Promise polyfill in this browser.");
      assert(this instanceof Store2, "store must be called with the new operator.");
    }
    var plugins = options.plugins;
    if (plugins === void 0)
      plugins = [];
    var strict = options.strict;
    if (strict === void 0)
      strict = false;
    var devtools = options.devtools;
    this._committing = false;
    this._actions = /* @__PURE__ */ Object.create(null);
    this._actionSubscribers = [];
    this._mutations = /* @__PURE__ */ Object.create(null);
    this._wrappedGetters = /* @__PURE__ */ Object.create(null);
    this._modules = new ModuleCollection(options);
    this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
    this._subscribers = [];
    this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
    this._scope = null;
    this._devtools = devtools;
    var store2 = this;
    var ref = this;
    var dispatch2 = ref.dispatch;
    var commit2 = ref.commit;
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch2.call(store2, type, payload);
    };
    this.commit = function boundCommit(type, payload, options2) {
      return commit2.call(store2, type, payload, options2);
    };
    this.strict = strict;
    var state = this._modules.root.state;
    installModule(this, state, [], this._modules.root);
    resetStoreState(this, state);
    plugins.forEach(function(plugin) {
      return plugin(this$1$1);
    });
  };
  var prototypeAccessors = { state: { configurable: true } };
  Store.prototype.install = function install(app, injectKey) {
    app.provide(injectKey || storeKey, this);
    app.config.globalProperties.$store = this;
    var useDevtools = this._devtools !== void 0 ? this._devtools : true;
    if (useDevtools) {
      addDevtools(app, this);
    }
  };
  prototypeAccessors.state.get = function() {
    return this._state.data;
  };
  prototypeAccessors.state.set = function(v) {
    {
      assert(false, "use store.replaceState() to explicit replace store state.");
    }
  };
  Store.prototype.commit = function commit(_type, _payload, _options) {
    var this$1$1 = this;
    var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;
    var mutation = { type, payload };
    var entry = this._mutations[type];
    if (!entry) {
      {
        console.error("[vuex] unknown mutation type: " + type);
      }
      return;
    }
    this._withCommit(function() {
      entry.forEach(function commitIterator(handler) {
        handler(payload);
      });
    });
    this._subscribers.slice().forEach(function(sub) {
      return sub(mutation, this$1$1.state);
    });
    if (options && options.silent) {
      console.warn(
        "[vuex] mutation type: " + type + ". Silent option has been removed. Use the filter functionality in the vue-devtools"
      );
    }
  };
  Store.prototype.dispatch = function dispatch(_type, _payload) {
    var this$1$1 = this;
    var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;
    var action = { type, payload };
    var entry = this._actions[type];
    if (!entry) {
      {
        console.error("[vuex] unknown action type: " + type);
      }
      return;
    }
    try {
      this._actionSubscribers.slice().filter(function(sub) {
        return sub.before;
      }).forEach(function(sub) {
        return sub.before(action, this$1$1.state);
      });
    } catch (e) {
      {
        console.warn("[vuex] error in before action subscribers: ");
        console.error(e);
      }
    }
    var result = entry.length > 1 ? Promise.all(entry.map(function(handler) {
      return handler(payload);
    })) : entry[0](payload);
    return new Promise(function(resolve, reject) {
      result.then(function(res) {
        try {
          this$1$1._actionSubscribers.filter(function(sub) {
            return sub.after;
          }).forEach(function(sub) {
            return sub.after(action, this$1$1.state);
          });
        } catch (e) {
          {
            console.warn("[vuex] error in after action subscribers: ");
            console.error(e);
          }
        }
        resolve(res);
      }, function(error) {
        try {
          this$1$1._actionSubscribers.filter(function(sub) {
            return sub.error;
          }).forEach(function(sub) {
            return sub.error(action, this$1$1.state, error);
          });
        } catch (e) {
          {
            console.warn("[vuex] error in error action subscribers: ");
            console.error(e);
          }
        }
        reject(error);
      });
    });
  };
  Store.prototype.subscribe = function subscribe(fn, options) {
    return genericSubscribe(fn, this._subscribers, options);
  };
  Store.prototype.subscribeAction = function subscribeAction(fn, options) {
    var subs = typeof fn === "function" ? { before: fn } : fn;
    return genericSubscribe(subs, this._actionSubscribers, options);
  };
  Store.prototype.watch = function watch$1(getter, cb, options) {
    var this$1$1 = this;
    {
      assert(typeof getter === "function", "store.watch only accepts a function.");
    }
    return vue.watch(function() {
      return getter(this$1$1.state, this$1$1.getters);
    }, cb, Object.assign({}, options));
  };
  Store.prototype.replaceState = function replaceState(state) {
    var this$1$1 = this;
    this._withCommit(function() {
      this$1$1._state.data = state;
    });
  };
  Store.prototype.registerModule = function registerModule(path, rawModule, options) {
    if (options === void 0)
      options = {};
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
      assert(path.length > 0, "cannot register the root module by using registerModule.");
    }
    this._modules.register(path, rawModule);
    installModule(this, this.state, path, this._modules.get(path), options.preserveState);
    resetStoreState(this, this.state);
  };
  Store.prototype.unregisterModule = function unregisterModule(path) {
    var this$1$1 = this;
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
    }
    this._modules.unregister(path);
    this._withCommit(function() {
      var parentState = getNestedState(this$1$1.state, path.slice(0, -1));
      delete parentState[path[path.length - 1]];
    });
    resetStore(this);
  };
  Store.prototype.hasModule = function hasModule(path) {
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
    }
    return this._modules.isRegistered(path);
  };
  Store.prototype.hotUpdate = function hotUpdate(newOptions) {
    this._modules.update(newOptions);
    resetStore(this, true);
  };
  Store.prototype._withCommit = function _withCommit(fn) {
    var committing = this._committing;
    this._committing = true;
    fn();
    this._committing = committing;
  };
  Object.defineProperties(Store.prototype, prototypeAccessors);
  var mapState = normalizeNamespace(function(namespace, states) {
    var res = {};
    if (!isValidMap(states)) {
      console.error("[vuex] mapState: mapper parameter must be either an Array or an Object");
    }
    normalizeMap(states).forEach(function(ref) {
      var key = ref.key;
      var val = ref.val;
      res[key] = function mappedState() {
        var state = this.$store.state;
        var getters = this.$store.getters;
        if (namespace) {
          var module = getModuleByNamespace(this.$store, "mapState", namespace);
          if (!module) {
            return;
          }
          state = module.context.state;
          getters = module.context.getters;
        }
        return typeof val === "function" ? val.call(this, state, getters) : state[val];
      };
      res[key].vuex = true;
    });
    return res;
  });
  var mapActions = normalizeNamespace(function(namespace, actions) {
    var res = {};
    if (!isValidMap(actions)) {
      console.error("[vuex] mapActions: mapper parameter must be either an Array or an Object");
    }
    normalizeMap(actions).forEach(function(ref) {
      var key = ref.key;
      var val = ref.val;
      res[key] = function mappedAction() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var dispatch2 = this.$store.dispatch;
        if (namespace) {
          var module = getModuleByNamespace(this.$store, "mapActions", namespace);
          if (!module) {
            return;
          }
          dispatch2 = module.context.dispatch;
        }
        return typeof val === "function" ? val.apply(this, [dispatch2].concat(args)) : dispatch2.apply(this.$store, [val].concat(args));
      };
    });
    return res;
  });
  function normalizeMap(map) {
    if (!isValidMap(map)) {
      return [];
    }
    return Array.isArray(map) ? map.map(function(key) {
      return { key, val: key };
    }) : Object.keys(map).map(function(key) {
      return { key, val: map[key] };
    });
  }
  function isValidMap(map) {
    return Array.isArray(map) || isObject(map);
  }
  function normalizeNamespace(fn) {
    return function(namespace, map) {
      if (typeof namespace !== "string") {
        map = namespace;
        namespace = "";
      } else if (namespace.charAt(namespace.length - 1) !== "/") {
        namespace += "/";
      }
      return fn(namespace, map);
    };
  }
  function getModuleByNamespace(store2, helper, namespace) {
    var module = store2._modulesNamespaceMap[namespace];
    if (!module) {
      console.error("[vuex] module namespace not found in " + helper + "(): " + namespace);
    }
    return module;
  }
  const _sfc_main$C = {
    props: {
      type: {
        type: String,
        default: "shared",
        validator: (value) => ["shared", "exclusive"].includes(value)
      },
      isSelected: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      typeName() {
        return this.type === "shared" ? "拼座" : "独享";
      },
      typeDesc() {
        return this.type === "shared" ? "超低价，低碳环保" : "不拼人，舒适省时";
      }
    },
    methods: {
      handleClick() {
        formatAppLog("log", "at components/ShareOption.vue:47", this.type);
        this.$emit("select", this.type);
      }
    }
  };
  function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["option-card", [$props.type, { selected: $props.isSelected }]]),
        onClick: _cache[7] || (_cache[7] = (...args) => $options.handleClick && $options.handleClick(...args))
      },
      [
        vue.createElementVNode("view", {
          class: "left",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.handleClick && $options.handleClick(...args))
        }, [
          vue.createElementVNode("cover-image", {
            src: $props.type === "shared" ? "/static/shareoption/shared.png" : "/static/shareoption/exclusive.png"
          }, null, 8, ["src"])
        ]),
        vue.createElementVNode("view", {
          class: "right",
          onClick: _cache[6] || (_cache[6] = (...args) => $options.handleClick && $options.handleClick(...args))
        }, [
          vue.createElementVNode("view", {
            class: "firstrow",
            onClick: _cache[4] || (_cache[4] = (...args) => $options.handleClick && $options.handleClick(...args))
          }, [
            vue.createElementVNode(
              "view",
              {
                class: "type-name",
                onClick: _cache[1] || (_cache[1] = (...args) => $options.handleClick && $options.handleClick(...args))
              },
              vue.toDisplayString($options.typeName),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["radio-button", { selected: $props.isSelected, [$props.type]: true }]),
                onClick: _cache[3] || (_cache[3] = (...args) => $options.handleClick && $options.handleClick(...args))
              },
              [
                $props.isSelected ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "radio-inner",
                  onClick: _cache[2] || (_cache[2] = (...args) => $options.handleClick && $options.handleClick(...args))
                })) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )
          ]),
          vue.createElementVNode(
            "view",
            {
              class: "type-desc",
              onClick: _cache[5] || (_cache[5] = (...args) => $options.handleClick && $options.handleClick(...args))
            },
            vue.toDisplayString($options.typeDesc),
            1
            /* TEXT */
          )
        ])
      ],
      2
      /* CLASS */
    );
  }
  const ComponentsShareOption = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$B], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/components/ShareOption.vue"]]);
  const _sfc_main$B = {
    components: {
      ShareOption: ComponentsShareOption
    },
    data() {
      const app = getApp();
      const now = /* @__PURE__ */ new Date();
      const currentTime = `${now.getFullYear()}年${(now.getMonth() + 1).toString().padStart(2, "0")}月${now.getDate().toString().padStart(2, "0")}日 ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      return {
        statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
        longitude: app.globalData.my_location_longitude,
        latitude: app.globalData.my_location_latitude,
        api_key: app.globalData.api_key,
        scale: 16,
        markers: [],
        polyline: [],
        addrDel: null,
        mapContext: null,
        currentLocation: null,
        startPoint: null,
        endPoint: null,
        selectedType: null,
        selectedTime: currentTime,
        currentTime: now,
        selectedSeats: 1,
        requestnumber: 0,
        ordersnumber: 0,
        currentOrders: [],
        highway: null
      };
    },
    computed: {
      ...mapState(["userID", "rideRequest", "rideOrder", "current_change_request_id"])
    },
    onLoad() {
      this.currentTime.setHours(this.currentTime.getHours() + 8);
      this.setStartAt(this.currentTime.toISOString());
      this.currentTime.setHours(this.currentTime.getHours() - 8);
      formatAppLog("log", "at pages/customer/customer_new.vue:170", this.rideRequest.startAt);
    },
    onShow() {
      this.getRequests();
      this.getCurrentOrder();
      this.setCurrentChangeRequestId(0);
      this.resetGlobal();
    },
    methods: {
      ...mapActions([
        "login",
        "logout",
        "setRequestId",
        "setStartLoc",
        "setEndLoc",
        "setStartAt",
        "setExclusive",
        "toggleHighway",
        "resetRideRequest",
        "setOrderId",
        "setCurrentChangeRequestId",
        "resetRequest"
      ]),
      onMapReady() {
        this.mapContext = uni.createMapContext("map", this);
        this.getCurrentLocation();
      },
      async resetGlobal() {
        if (this.rideRequest.requestID != this.current_change_request_id) {
          this.resetRequest(this.current_change_request_id);
          const now = /* @__PURE__ */ new Date();
          const currentTime = `${now.getFullYear()}年${(now.getMonth() + 1).toString().padStart(2, "0")}月${now.getDate().toString().padStart(2, "0")}日 ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
          this.selectedTime = currentTime;
          this.currentTime = now;
          this.currentTime.setHours(this.currentTime.getHours() + 8);
          this.setStartAt(this.currentTime.toISOString());
          this.currentTime.setHours(this.currentTime.getHours() - 8);
          this.selectedSeats = 1;
        } else {
          try {
            const hasStart = this.rideRequest.startLoc;
            const hasEnd = this.rideRequest.endLoc;
            if (hasStart && !hasEnd) {
              this.startPoint = await this.geocodeAddress(this.rideRequest.startLoc);
              this.longitude = this.startPoint[0];
              this.latitude = this.startPoint[1];
              this.scale = 16;
              this.markers = [{
                id: 1,
                latitude: this.startPoint[1],
                longitude: this.startPoint[0],
                width: 24,
                height: 24,
                iconPath: "/static/point_start.png"
              }];
              this.polyline = [];
              if (this.mapContext) {
                this.mapContext.moveToLocation({
                  longitude: this.startPoint[0],
                  latitude: this.startPoint[1]
                });
              }
            } else if (!hasStart && hasEnd) {
              this.endPoint = await this.geocodeAddress(this.rideRequest.endLoc);
              this.longitude = this.endPoint[0];
              this.latitude = this.endPoint[1];
              this.scale = 16;
              this.markers = [{
                id: 2,
                latitude: this.endPoint[1],
                longitude: this.endPoint[0],
                width: 24,
                height: 24,
                iconPath: "/static/point_end.png"
              }];
              this.polyline = [];
              if (this.mapContext) {
                this.mapContext.moveToLocation({
                  longitude: this.endPoint[0],
                  latitude: this.endPoint[1]
                });
              }
            } else if (hasStart && hasEnd) {
              this.startPoint = await this.geocodeAddress(this.rideRequest.startLoc);
              this.endPoint = await this.geocodeAddress(this.rideRequest.endLoc);
              await this.getDrivingRoute(this.startPoint, this.endPoint);
            } else {
              this.markers = [];
              this.polyline = [];
              this.getCurrentLocation();
            }
          } catch (error) {
            formatAppLog("log", "at pages/customer/customer_new.vue:268", "地址解析失败:", error);
            uni.showToast({
              title: "地址解析失败，请检查地址",
              icon: "none",
              duration: 2e3
            });
            this.markers = [];
            this.polyline = [];
            this.getCurrentLocation();
          }
        }
      },
      async geocodeAddress(address) {
        return new Promise((resolve, reject) => {
          const geocodeUrl = `https://restapi.amap.com/v3/geocode/geo?address=${encodeURIComponent(address)}&output=json&key=${this.api_key}`;
          uni.request({
            url: geocodeUrl,
            method: "GET",
            success: (res) => {
              if (res.data.status === "1" && res.data.geocodes && res.data.geocodes.length > 0) {
                const location = res.data.geocodes[0].location.split(",");
                const lngLat = [parseFloat(location[0]), parseFloat(location[1])];
                resolve(lngLat);
              } else {
                reject("地理编码失败：未找到该地点");
              }
            },
            fail: (error) => {
              reject(`地理编码请求失败：${error}`);
            }
          });
        });
      },
      async getDrivingRoute(startLngLat, endLngLat) {
        if (!startLngLat || !endLngLat)
          return;
        try {
          const url = `https://restapi.amap.com/v3/direction/driving?key=${this.api_key}&origin=${startLngLat[0]},${startLngLat[1]}&destination=${endLngLat[0]},${endLngLat[1]}&strategy=0`;
          const response = await uni.request({
            url,
            method: "GET"
          });
          if (response.data.status === "1" && response.data.route) {
            const pathSteps = response.data.route.paths[0].steps;
            this.markers = [
              {
                id: 1,
                longitude: startLngLat[0],
                latitude: startLngLat[1],
                title: this.rideRequest.startLoc,
                iconPath: "/static/point_start.png",
                width: 24,
                height: 24
              },
              {
                id: 2,
                longitude: endLngLat[0],
                latitude: endLngLat[1],
                title: this.rideRequest.endLoc,
                iconPath: "/static/point_end.png",
                width: 24,
                height: 24
              }
            ];
            this.polyline = pathSteps.map((step) => ({
              points: step.polyline.split(";").map((coord) => {
                const [lng, lat] = coord.split(",").map(Number);
                return {
                  longitude: lng,
                  latitude: lat
                };
              }),
              color: "#517aff",
              width: 10,
              dottedLine: false
            }));
            this.adjustMapView();
          } else {
            throw new Error("路径规划失败");
          }
        } catch (error) {
          formatAppLog("error", "at pages/customer/customer_new.vue:358", "路线规划错误:", error);
          uni.showToast({
            title: "路线规划失败",
            icon: "none"
          });
        }
      },
      adjustMapView() {
        let allPoints = [];
        this.markers.forEach((marker) => {
          allPoints.push({
            longitude: marker.longitude,
            latitude: marker.latitude
          });
        });
        this.polyline.forEach((line) => {
          line.points.forEach((point) => {
            allPoints.push(point);
          });
        });
        const bounds = this.calculateBounds(allPoints);
        const centerLng = (bounds.minLng + bounds.maxLng) / 2;
        const centerLat = (bounds.minLat + bounds.maxLat) / 2;
        this.longitude = centerLng;
        this.latitude = centerLat;
        this.scale = this.calculateScale(bounds);
      },
      calculateBounds(points) {
        let minLng = Infinity;
        let maxLng = -Infinity;
        let minLat = Infinity;
        let maxLat = -Infinity;
        points.forEach((p) => {
          minLng = Math.min(minLng, p.longitude);
          maxLng = Math.max(maxLng, p.longitude);
          minLat = Math.min(minLat, p.latitude);
          maxLat = Math.max(maxLat, p.latitude);
        });
        return {
          minLng,
          maxLng,
          minLat,
          maxLat
        };
      },
      calculateScale(bounds) {
        const systemInfo = uni.getSystemInfoSync();
        const widthInPx = systemInfo.windowWidth;
        const deltaLng = bounds.maxLng - bounds.minLng;
        const deltaLat = bounds.maxLat - bounds.minLat;
        const padding = 0.2;
        const paddedDeltaLng = deltaLng * (1 + padding);
        const paddedDeltaLat = deltaLat * (1 + padding);
        const metersPerPixel = (paddedDeltaLng * 111319 + paddedDeltaLat * 110574) / widthInPx;
        const baseZoomLevel = 17;
        let scale = baseZoomLevel - Math.log(metersPerPixel) / Math.LN2;
        return Math.max(3, Math.min(18, Math.floor(scale)));
      },
      getCurrentLocation() {
        const that = this;
        uni.getLocation({
          type: "wgs84",
          geocode: true,
          success: function(res) {
            that.addrDel = res;
            that.longitude = res.longitude;
            that.latitude = res.latitude;
            that.scale = 16;
            that.markers = [{
              id: 1,
              latitude: res.latitude,
              longitude: res.longitude,
              width: 24,
              height: 24,
              iconPath: "/static/current_location.png"
            }];
            if (that.mapContext) {
              that.mapContext.moveToLocation({
                longitude: res.longitude,
                latitude: res.latitude
              });
            }
          },
          fail: function(err) {
            formatAppLog("log", "at pages/customer/customer_new.vue:465", "定位失败:", err);
            uni.showToast({
              title: "获取地址失败，将导致部分功能不可用",
              icon: "none",
              duration: 2e3
            });
          }
        });
      },
      async publishDemand() {
        try {
          const requestData = {
            passengerId: this.userID,
            startLoc: this.rideRequest.startLoc,
            endLoc: this.rideRequest.endLoc,
            status: "PENDING",
            startAt: this.rideRequest.startAt,
            exclusive: this.rideRequest.exclusive,
            highway: this.rideRequest.highway
          };
          formatAppLog("log", "at pages/customer/customer_new.vue:485", requestData);
          const response = await uni.request({
            url: "http://10.0.2.2:8083/carsharing/post-request",
            method: "POST",
            data: requestData,
            header: {
              "Content-Type": "application/json"
            }
          });
          if (response.data.status === "success") {
            const responseData = response.data;
            if (responseData.requestID) {
              this.setRequestId(responseData.requestID);
              this.requestnumber += 1;
              this.markers = [];
              this.polyline = [];
              this.longitude = getApp().globalData.my_location_longitude;
              this.latitude = getApp().globalData.my_location_latitude;
              this.scale = 16;
              this.startPoint = null;
              this.endPoint = null;
              this.selectedTime = null;
              this.selectedSeats = null;
              this.selectedType = null;
              this.getCurrentLocation();
              uni.showToast({
                title: "发布成功",
                icon: "success"
              });
              this.ToInvitationMatch();
            } else {
              throw new Error("未收到 requestID");
            }
          } else {
            throw new Error("请求失败");
          }
        } catch (error) {
          formatAppLog("error", "at pages/customer/customer_new.vue:528", "发布失败:", error);
          uni.showToast({
            title: "发布失败",
            icon: "none"
          });
        }
      },
      ToInvitationMatch() {
        uni.navigateTo({
          url: "./InvitationMatch",
          animationType: "slide-in-right",
          huntingDuration: 300
        });
      },
      ToDetailRequest() {
        uni.navigateTo({
          url: "./RequestList",
          animationType: "slide-in-right",
          animationDuration: 300
        });
      },
      ToStartLoc() {
        uni.navigateTo({
          url: "./StartLoc",
          animationType: "slide-in-right",
          animationDuration: 300
        });
      },
      ToEndLoc() {
        uni.navigateTo({
          url: "./EndLoc",
          animationType: "slide-in-right",
          animationDuration: 300
        });
      },
      handleSelect(type) {
        this.selectedType = type;
        if (type == "shared") {
          this.setExclusive(false);
        } else {
          this.setExclusive(true);
        }
      },
      showTimePicker() {
        uni.showActionSheet({
          itemList: ["当前时间", "15分钟后", "30分钟后", "1小时后", "自定义时间"],
          success: (res) => {
            if (res.tapIndex === 4) {
              this.showDateTimeInput();
            } else {
              const times = [0, 15, 30, 60];
              this.selectTime(times[res.tapIndex]);
            }
          }
        });
      },
      showDateTimeInput() {
        const now = /* @__PURE__ */ new Date();
        const currentDateTime = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
        uni.showModal({
          title: "自定义出发时间",
          content: `当前时间: ${currentDateTime}
请输入出发时间(YYYY-MM-DD HH:MM)`,
          editable: true,
          placeholderText: "例如: " + this.getTomorrowDate(),
          showCancel: false,
          confirmButtonText: "确定",
          confirmButtonColor: "#007AFF",
          success: (res) => {
            if (res.confirm) {
              this.validateAndSetDateTime(res.content);
            }
          }
        });
      },
      getTomorrowDate() {
        const tomorrow = /* @__PURE__ */ new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return `${tomorrow.getFullYear()}-${(tomorrow.getMonth() + 1).toString().padStart(2, "0")}-${tomorrow.getDate().toString().padStart(2, "0")} 09:00`;
      },
      validateAndSetDateTime(dateTimeStr) {
        const dateTimeRegex = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/;
        if (!dateTimeRegex.test(dateTimeStr)) {
          uni.showToast({
            title: "格式不正确，请使用YYYY-MM-DD HH:MM格式",
            icon: "none"
          });
          return;
        }
        const [_, year, month, day, hours, minutes] = dateTimeStr.match(dateTimeRegex);
        const targetTime = new Date(year, month - 1, day, hours, minutes);
        const now = /* @__PURE__ */ new Date();
        if (isNaN(targetTime.getTime())) {
          uni.showToast({
            title: "日期时间无效",
            icon: "none"
          });
          return;
        }
        if (targetTime < now) {
          uni.showToast({
            title: "时间已过，请选择未来的时间",
            icon: "none"
          });
          return;
        }
        const formattedDate = `${year}年${month}月${day}日 ${hours}:${minutes}`;
        this.selectedTime = formattedDate;
        targetTime.setHours(this.currentTime.getHours() + 8);
        this.setStartAt(targetTime.toISOString());
        uni.showToast({
          title: `已设置: ${formattedDate}`,
          icon: "success"
        });
      },
      selectTime(minutesLater) {
        this.currentTime.setHours(this.currentTime.getHours() + 8);
        const targetTime1 = new Date(this.currentTime.getTime() + minutesLater * 6e4);
        this.currentTime.setHours(this.currentTime.getHours() - 8);
        const targetTime2 = new Date(this.currentTime.getTime() + minutesLater * 6e4);
        const hours = targetTime2.getHours().toString().padStart(2, "0");
        const minutes = targetTime2.getMinutes().toString().padStart(2, "0");
        if (minutesLater === 0) {
          this.selectedTime = `${this.currentTime.getFullYear()}年${(this.currentTime.getMonth() + 1).toString().padStart(2, "0")}月${this.currentTime.getDate().toString().padStart(2, "0")}日 ${hours}:${minutes}`;
        } else {
          this.selectedTime = `${minutesLater}分钟后 (${hours}:${minutes})`;
        }
        this.setStartAt(targetTime1.toISOString());
      },
      showSeatsInput() {
        uni.showModal({
          title: "选择座位人数",
          content: "请输入需要的座位数（1-7）",
          editable: true,
          placeholderText: "例如: 2",
          showCancel: false,
          confirmButtonText: "确定",
          confirmButtonColor: "#007AFF",
          success: (res) => {
            if (res.confirm) {
              this.validateAndSetSeats(res.content);
            }
          }
        });
      },
      validateAndSetSeats(seatsStr) {
        const seats = parseInt(seatsStr);
        if (isNaN(seats) || seats < 1 || seats > 7) {
          uni.showToast({
            title: "请输入1-7之间的有效人数",
            icon: "none"
          });
          return;
        }
        this.selectedSeats = seats;
        uni.showToast({
          title: `已设置: ${seats}人`,
          icon: "success"
        });
      },
      async getRequests() {
        this.isLoading = true;
        this.error = null;
        try {
          const response = await uni.request({
            url: `http://10.0.2.2:8083/carsharing/get-requests?userId=${this.userID}`,
            method: "GET",
            header: {
              "Content-Type": "application/json"
            }
          });
          if (response.data.status === "success") {
            const res = response.data.history;
            if (res && res.length > 0) {
              this.requestnumber = res.filter((request) => request.status === "PENDING").length;
            } else {
              this.requestnumber = 0;
            }
          } else {
            throw new Error(response.data.message || "获取请求列表失败");
          }
        } catch (error) {
          formatAppLog("error", "at pages/customer/customer_new.vue:717", "获取请求列表失败:", error);
          this.error = error.message || "获取请求列表失败";
          this.requestnumber = 0;
          uni.showToast({
            title: this.error,
            icon: "none"
          });
        } finally {
          this.isLoading = false;
        }
      },
      async getCurrentOrder() {
        this.isLoading = true;
        this.error = null;
        try {
          if (!this.userID) {
            throw new Error("用户未登录");
          }
          const response = await uni.request({
            url: `http://10.0.2.2:8083/carsharing/current-order?userId=${this.userID}`,
            method: "GET",
            header: {
              "Content-Type": "application/json"
            }
          });
          if (response.data.status === "success") {
            const res = response.data;
            const now = /* @__PURE__ */ new Date();
            if (res.orders && res.orders.length > 0) {
              const pastOrders = res.orders.filter((order) => new Date(order.startAt) < now).sort((a, b) => new Date(b.startAt) - new Date(a.startAt));
              this.currentOrders = pastOrders.length > 0 ? [{
                id: pastOrders[0].id,
                distance: pastOrders[0].distance,
                driverName: pastOrders[0].realName,
                driverRating: pastOrders[0].rating,
                carModel: pastOrders[0].verificationCarModel || "未知车型",
                carPlate: pastOrders[0].verificationCarPlate || "未知车牌",
                startAt: pastOrders[0].startAt || "未知时间",
                avatar: pastOrders[0].avatar
              }] : [];
              this.ordersnumber = this.currentOrders.length;
            } else {
              this.ordersnumber = 0;
              this.currentOrders = [];
            }
          } else {
            throw new Error(response.data.message || "获取当前订单失败");
          }
        } catch (error) {
          formatAppLog("error", "at pages/customer/customer_new.vue:770", "获取当前订单失败:", error);
          this.error = error.message || "获取当前订单失败";
          this.ordersnumber = 0;
          this.currentOrders = [];
          uni.showToast({
            title: this.error,
            icon: "none"
          });
        } finally {
          this.isLoading = false;
        }
      },
      ToOrderDetail() {
        if (this.currentOrders.length > 0) {
          const orderid = this.currentOrders[0].id;
          this.setOrderId(orderid);
          formatAppLog("log", "at pages/customer/customer_new.vue:786", this.rideOrder.orderID);
          uni.navigateTo({
            url: "/pages/customer/OrderDetail",
            animationType: "slide-in-right",
            animationDuration: 300
          });
        } else {
          uni.showToast({
            title: "没有可查看的订单",
            icon: "none"
          });
        }
      }
    }
  };
  function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    const _component_ShareOption = vue.resolveComponent("ShareOption");
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle({ paddingTop: $data.statusBarHeight + "px" }),
        class: "container"
      },
      [
        vue.createCommentVNode(" 地图部分 "),
        vue.createElementVNode("map", {
          id: "map",
          class: "map-area",
          longitude: $data.longitude,
          latitude: $data.latitude,
          markers: $data.markers,
          polyline: $data.polyline,
          scale: $data.scale,
          "show-location": "",
          onReady: _cache[0] || (_cache[0] = (...args) => $options.onMapReady && $options.onMapReady(...args))
        }, null, 40, ["longitude", "latitude", "markers", "polyline", "scale"]),
        vue.createCommentVNode(" 定位按钮 "),
        vue.createElementVNode("cover-view", {
          class: "locate-button1",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.getCurrentLocation && $options.getCurrentLocation(...args))
        }),
        vue.createElementVNode("cover-view", {
          class: "locate-button2",
          onClick: _cache[2] || (_cache[2] = (...args) => $options.getCurrentLocation && $options.getCurrentLocation(...args))
        }),
        vue.createCommentVNode(" 浮动按钮和订单请求部分 "),
        vue.createElementVNode("view", { class: "floating-buttons" }, [
          vue.createElementVNode("view", { class: "start_end_loc" }, [
            vue.createElementVNode("view", { class: "first-row" }, [
              vue.createElementVNode("view", {
                class: "location-select",
                style: { "display": "flex", "flex-direction": "column", "width": "65%" }
              }, [
                vue.createElementVNode("view", {
                  class: "location-row start",
                  onClick: _cache[3] || (_cache[3] = (...args) => $options.ToStartLoc && $options.ToStartLoc(...args))
                }, [
                  vue.createElementVNode("view", { class: "icon start-icon" }),
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["location-text", { "selected": this.rideRequest.startLoc }])
                    },
                    vue.toDisplayString(this.rideRequest.startLoc ? this.rideRequest.startLoc : "您从哪儿上车"),
                    3
                    /* TEXT, CLASS */
                  )
                ]),
                vue.createElementVNode("view", {
                  class: "location-row end",
                  onClick: _cache[4] || (_cache[4] = (...args) => $options.ToEndLoc && $options.ToEndLoc(...args))
                }, [
                  vue.createElementVNode("view", { class: "icon end-icon" }),
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["location-text", { "selected": this.rideRequest.endLoc }])
                    },
                    vue.toDisplayString(this.rideRequest.endLoc ? this.rideRequest.endLoc : "您要到哪儿去"),
                    3
                    /* TEXT, CLASS */
                  )
                ])
              ]),
              vue.createElementVNode("view", {
                class: "time-seats-select",
                style: { "display": "flex", "flex-direction": "column", "width": "35%" }
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["time-selector", { "has-time": $data.selectedTime }]),
                    onClick: _cache[6] || (_cache[6] = (...args) => $options.showTimePicker && $options.showTimePicker(...args))
                  },
                  [
                    vue.createElementVNode("view", { style: { "color": "var(--color-blue)", "font-size": "11px", "font-weight": "bold", "display": "flex", "flex-direction": "row" } }, [
                      vue.createVNode(_component_uni_icons, {
                        type: "compose",
                        color: "var(--color-blue);",
                        style: { "margin-right": "3px" },
                        size: "16"
                      }),
                      vue.createTextVNode(" 出发时间 "),
                      vue.createElementVNode("view", {
                        class: "modify-text",
                        onClick: _cache[5] || (_cache[5] = (...args) => $options.showTimePicker && $options.showTimePicker(...args))
                      }, "(修改时间)")
                    ]),
                    vue.createElementVNode(
                      "view",
                      { class: "time-text" },
                      vue.toDisplayString($data.selectedTime),
                      1
                      /* TEXT */
                    )
                  ],
                  2
                  /* CLASS */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["seats-selector", { "has-seats": $data.selectedSeats }]),
                    onClick: _cache[8] || (_cache[8] = (...args) => $options.showSeatsInput && $options.showSeatsInput(...args))
                  },
                  [
                    vue.createElementVNode("view", { style: { "color": "var(--color-blue)", "font-size": "11px", "font-weight": "bold", "display": "flex", "flex-direction": "row" } }, [
                      vue.createVNode(_component_uni_icons, {
                        type: "person",
                        color: "var(--color-blue);",
                        style: { "margin-right": "3px" },
                        size: "16"
                      }),
                      vue.createTextVNode(" 座位人数 "),
                      vue.createElementVNode("view", {
                        class: "modify-text",
                        onClick: _cache[7] || (_cache[7] = (...args) => $options.showSeatsInput && $options.showSeatsInput(...args))
                      }, "(修改人数)")
                    ]),
                    vue.createElementVNode(
                      "view",
                      { class: "seats-text" },
                      vue.toDisplayString($data.selectedSeats + "人"),
                      1
                      /* TEXT */
                    )
                  ],
                  2
                  /* CLASS */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["highway-selector", { "has-highway": $data.highway }])
                  },
                  [
                    vue.createElementVNode("view", { style: { "color": "var(--color-blue)", "font-size": "11px", "font-weight": "bold", "display": "flex", "flex-direction": "row", "align-items": "center" } }, [
                      vue.createVNode(_component_uni_icons, {
                        type: "flag",
                        color: "var(--color-blue);",
                        style: { "margin-right": "3px" },
                        size: "16"
                      }),
                      vue.createTextVNode(" 愿意协商高速费 "),
                      vue.createElementVNode("checkbox", {
                        checked: $data.highway,
                        onClick: _cache[9] || (_cache[9] = ($event) => this.toggleHighway()),
                        style: { "margin-left": "4px" }
                      }, null, 8, ["checked"])
                    ])
                  ],
                  2
                  /* CLASS */
                )
              ])
            ]),
            vue.createElementVNode("view", { class: "second-row" }, [
              vue.createElementVNode("view", { class: "share-option" }, [
                vue.createVNode(_component_ShareOption, {
                  type: "shared",
                  isSelected: $data.selectedType === "shared",
                  onSelect: $options.handleSelect
                }, null, 8, ["isSelected", "onSelect"]),
                vue.createVNode(_component_ShareOption, {
                  type: "exclusive",
                  isSelected: $data.selectedType === "exclusive",
                  onSelect: $options.handleSelect
                }, null, 8, ["isSelected", "onSelect"])
              ]),
              vue.createElementVNode("view", {
                class: "publish-button",
                onClick: _cache[10] || (_cache[10] = (...args) => $options.publishDemand && $options.publishDemand(...args))
              }, "立即发布")
            ])
          ]),
          vue.createElementVNode("view", { class: "order-request" }, [
            vue.createElementVNode("view", { class: "order-card" }, [
              vue.createElementVNode("view", { class: "order-header" }, [
                vue.createElementVNode("view", {
                  class: "order-title",
                  style: { "font-size": "16px" }
                }, [
                  vue.createElementVNode("view", null, "正在"),
                  vue.createElementVNode("view", { style: { "color": "var(--color-green)" } }, "进行中"),
                  vue.createElementVNode("view", null, "的订单")
                ]),
                $data.currentOrders.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "order-detail-btn",
                  onClick: _cache[11] || (_cache[11] = (...args) => $options.ToOrderDetail && $options.ToOrderDetail(...args))
                }, "详情 >>")) : vue.createCommentVNode("v-if", true)
              ]),
              $data.currentOrders.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "order-content"
              }, [
                vue.createElementVNode("view", { class: "order-distance" }, [
                  vue.createElementVNode("view", { style: { "margin-bottom": "2px" } }, "剩余"),
                  vue.createElementVNode("view", {
                    class: "km",
                    style: { "display": "flex", "flex-direction": "row", "align-items": "flex-end" }
                  }, [
                    vue.createElementVNode(
                      "view",
                      { style: { "color": "var(--color-red)", "font-size": "20px" } },
                      vue.toDisplayString($data.currentOrders[0].distance),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { style: { "color": "var(--color-red)", "margin-left": "4px" } }, "km")
                  ])
                ]),
                vue.createElementVNode("view", {
                  class: "driver-info",
                  onClick: _cache[12] || (_cache[12] = (...args) => $options.ToOrderDetail && $options.ToOrderDetail(...args))
                }, [
                  vue.createElementVNode(
                    "view",
                    { class: "car-plate" },
                    vue.toDisplayString($data.currentOrders[0].carPlate),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "vertical-divider" }),
                  vue.createElementVNode("view", { class: "driver-rating" }, [
                    vue.createElementVNode("view", {
                      class: "driver-detail",
                      style: { "display": "flex", "flex-direction": "row", "align-items": "center", "gap": "2px" }
                    }, [
                      vue.createElementVNode(
                        "view",
                        { class: "stars" },
                        vue.toDisplayString($data.currentOrders[0].driverRating) + "分",
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "view",
                        { class: "driver-name" },
                        vue.toDisplayString($data.currentOrders[0].driverName),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "view",
                        { class: "driver-avator" },
                        vue.toDisplayString($data.currentOrders[0].avator),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode(
                      "view",
                      { class: "car-detail" },
                      vue.toDisplayString($data.currentOrders[0].carColor || "黑色") + " | " + vue.toDisplayString($data.currentOrders[0].carModel),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ])) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "order-content no-orders"
              }, " 当前没有进行中的订单 "))
            ]),
            vue.createElementVNode("view", {
              class: "request-info",
              onClick: _cache[19] || (_cache[19] = (...args) => $options.ToDetailRequest && $options.ToDetailRequest(...args))
            }, [
              vue.createElementVNode("view", {
                class: "request-detail",
                onClick: _cache[15] || (_cache[15] = (...args) => $options.ToDetailRequest && $options.ToDetailRequest(...args))
              }, [
                vue.createElementVNode("view", {
                  style: { "display": "flex", "flex-direction": "row", "align-items": "flex-end", "gap": "3px" },
                  onClick: _cache[14] || (_cache[14] = (...args) => $options.ToDetailRequest && $options.ToDetailRequest(...args))
                }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: "request-count",
                      onClick: _cache[13] || (_cache[13] = (...args) => $options.ToDetailRequest && $options.ToDetailRequest(...args))
                    },
                    vue.toDisplayString($data.requestnumber),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { style: { "font-size": "16px", "margin-bottom": "3px" } }, "条")
                ])
              ]),
              vue.createElementVNode("view", { style: { "width": "200px", "display": "flex", "align-items": "end", "flex-direction": "column" } }, [
                vue.createElementVNode("view", {
                  class: "request-title",
                  onClick: _cache[16] || (_cache[16] = (...args) => $options.ToDetailRequest && $options.ToDetailRequest(...args))
                }, [
                  vue.createElementVNode("view", null, "拼车"),
                  vue.createElementVNode("view", { style: { "color": "var(--color-orange)" } }, "需求")
                ]),
                vue.createElementVNode("view", {
                  class: "request-status",
                  onClick: _cache[17] || (_cache[17] = (...args) => $options.ToDetailRequest && $options.ToDetailRequest(...args))
                }, "已发布待匹配"),
                vue.createElementVNode("view", {
                  class: "order-detail-btn2",
                  onClick: _cache[18] || (_cache[18] = (...args) => $options.ToDetailRequest && $options.ToDetailRequest(...args))
                }, "详情 >>")
              ])
            ])
          ])
        ])
      ],
      4
      /* STYLE */
    );
  }
  const PagesCustomerCustomerNew = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$A], ["__scopeId", "data-v-63271edb"], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/customer/customer_new.vue"]]);
  const _sfc_main$A = {
    components: {
      ShareOption: ComponentsShareOption
    },
    data() {
      return {
        statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
        currentLocation: null,
        startPoint: null,
        endPoint: null,
        selectedType: null,
        selectedTime: null,
        showTimePopup: false,
        requestnumber: 0,
        ordersnumber: 0,
        currentOrders: [
          //     {
          //       id: 1,
          //       distance: 10.5,
          //       driverName: "张三",
          //       driverRating: 4.8,
          //       carModel: "特斯拉 Model",
          //       carPlate: "京A12345",
          //       startAt: "2025-04-21T10:00:00Z",
          // avatar:"@/static/1.png"
          //     },
          //     {
          //       id: 2,
          //       distance: 5.2,
          //       driverName: "李四",
          //       driverRating: 4.6,
          //       carModel: "比亚迪汉",
          //       carPlate: "京B67890",
          //       startAt: "2025-04-21T11:30:00Z",
          //     },
          //     {
          //       id: 3,
          //       distance: 7.8,
          //       driverName: "王五",
          //       driverRating: 4.9,
          //       carModel: "宝马 5 系",
          //       carPlate: "京C56789",
          //       startAt: "2025-04-21T12:45:00Z",
          //     }
        ]
      };
    },
    computed: {
      ...mapState(["userID", "rideRequest", "rideOrder"])
    },
    onLoad() {
      this.getRequests();
      this.getCurrentOrder();
    },
    methods: {
      ...mapActions([
        "login",
        "logout",
        "setRequestId",
        "setStartLoc",
        "setEndLoc",
        "setStartAt",
        "toggleExclusive",
        "toggleHighway",
        "resetRideRequest",
        "setOrderId"
      ]),
      handleMapMessage(e) {
        const { longitude, latitude, type, distance, duration } = e.detail.data;
        if (type === "select") {
          if (!this.startPoint) {
            this.startPoint = [longitude, latitude];
            uni.showToast({
              title: `已记录起点: ${longitude}, ${latitude}`,
              icon: "none"
            });
          } else if (!this.endPoint) {
            this.endPoint = [longitude, latitude];
            uni.showToast({
              title: `已记录终点: ${longitude}, ${latitude}`,
              icon: "none"
            });
          }
        } else if (type === "location") {
          this.currentLocation = [longitude, latitude];
          uni.showToast({
            title: `当前位置: ${longitude}, ${latitude}`,
            icon: "none"
          });
        } else if (type === "route") {
          uni.showToast({
            title: `距离: ${distance}m, 时长: ${Math.round(duration / 60)}分钟`,
            icon: "none"
          });
        }
      },
      getCurrentLocation() {
        const webview = this.$refs.webview;
        webview.evalJS("getCurrentPosition()");
      },
      startRoutePlanning() {
        if (!this.rideRequest.startLoc || !this.rideRequest.endLoc) {
          uni.showToast({
            title: "请先设置起点和终点",
            icon: "none"
          });
          return;
        }
        const webview = this.$refs.webview;
        webview.evalJS(`planRoute(${this.rideRequest.startLoc[0]}, ${this.rideRequest.startLoc[1]}, ${this.rideRequest.endLoc[0]}, ${this.rideRequest.endLoc[1]})`);
      },
      async publishDemand() {
        try {
          const requestData = {
            passengerId: this.userID,
            startLoc: this.rideRequest.startLoc,
            endLoc: this.rideRequest.endLoc,
            status: "PENDING",
            startAt: this.rideRequest.startAt,
            exclusive: this.rideRequest.exclusive,
            highway: this.rideRequest.highway
          };
          const response = await uni.request({
            url: "http://10.0.2.2:8083/carsharing/post-request",
            method: "POST",
            data: requestData,
            header: {
              "Content-Type": "application/json"
            }
          });
          formatAppLog("log", "at pages/customer/customer.vue:231", requestData);
          if (response.data.status === "success") {
            const responseData = response.data;
            if (responseData.requestID) {
              this.setRequestId(responseData.requestID);
              uni.showToast({
                title: "发布成功",
                icon: "success"
              });
              this.ToInvitationMatch();
            } else {
              throw new Error("未收到 requestID");
            }
          } else {
            throw new Error("请求失败");
          }
        } catch (error) {
          formatAppLog("error", "at pages/customer/customer.vue:248", "发布失败:", error);
          uni.showToast({
            title: "发布失败",
            icon: "none"
          });
        }
      },
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
      },
      ToStartLoc() {
        uni.navigateTo({
          url: "./StartLoc",
          animationType: "slide-in-right",
          animationDuration: 300
        });
      },
      ToEndLoc() {
        uni.navigateTo({
          url: "./EndLoc",
          animationType: "slide-in-right",
          animationDuration: 300
        });
      },
      handleSelect(type) {
        this.selectedType = type;
      },
      showTimePicker() {
        uni.showActionSheet({
          itemList: ["15分钟后", "30分钟后", "1小时后", "自定义时间"],
          success: (res) => {
            if (res.tapIndex === 3) {
              this.showDateTimeInput();
            } else {
              const times = [15, 30, 60];
              this.selectTime(times[res.tapIndex]);
            }
          }
        });
      },
      showDateTimeInput() {
        const now = /* @__PURE__ */ new Date();
        const currentDateTime = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
        uni.showModal({
          title: "自定义出发时间",
          content: `当前时间: ${currentDateTime}
请输入出发时间(YYYY-MM-DD HH:MM)`,
          editable: true,
          placeholderText: "例如: " + this.getTomorrowDate(),
          showCancel: false,
          // 不显示取消按钮
          confirmButtonText: "确定",
          // 自定义确认按钮文字
          confirmButtonColor: "#007AFF",
          // 自定义确认按钮颜色
          success: (res) => {
            if (res.confirm) {
              this.validateAndSetDateTime(res.content);
            }
          }
        });
      },
      getTomorrowDate() {
        const tomorrow = /* @__PURE__ */ new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return `${tomorrow.getFullYear()}-${(tomorrow.getMonth() + 1).toString().padStart(2, "0")}-${tomorrow.getDate().toString().padStart(2, "0")} 09:00`;
      },
      validateAndSetDateTime(dateTimeStr) {
        const dateTimeRegex = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/;
        if (!dateTimeRegex.test(dateTimeStr)) {
          uni.showToast({
            title: "格式不正确，请使用YYYY-MM-DD HH:MM格式",
            icon: "none"
          });
          return;
        }
        const [_, year, month, day, hours, minutes] = dateTimeStr.match(dateTimeRegex);
        const targetTime = new Date(year, month - 1, day, hours, minutes);
        const now = /* @__PURE__ */ new Date();
        if (isNaN(targetTime.getTime())) {
          uni.showToast({
            title: "日期时间无效",
            icon: "none"
          });
          return;
        }
        if (targetTime < now) {
          uni.showToast({
            title: "时间已过，请选择未来的时间",
            icon: "none"
          });
          return;
        }
        const formattedDate = `${year}年${month}月${day}日 ${hours}:${minutes}`;
        this.selectedTime = formattedDate;
        this.setStartAt(targetTime.toISOString());
        uni.showToast({
          title: `已设置: ${formattedDate}`,
          icon: "success"
        });
      },
      selectTime(minutesLater) {
        const now = /* @__PURE__ */ new Date();
        const targetTime = new Date(now.getTime() + minutesLater * 6e4);
        this.selectedTime = `${minutesLater}分钟后 (${targetTime.getHours()}:${targetTime.getMinutes().toString().padStart(2, "0")})`;
        this.setStartAt(targetTime.toISOString());
      },
      async getRequests() {
        this.isLoading = true;
        this.error = null;
        try {
          const response = await uni.request({
            url: "http://10.0.2.2:8083/carsharing/get-requests?userId=1",
            method: "GET",
            header: {
              "Content-Type": "application/json"
            }
          });
          if (response.data.status === "success") {
            const res = response.data.history;
            formatAppLog("log", "at pages/customer/customer.vue:398", res);
            if (res && res.length > 0) {
              this.requestnumber = res.filter((request) => request.status === "PENDING").length;
            } else {
              this.requestnumber = 0;
            }
          } else {
            throw new Error(response.data.message || "获取请求列表失败");
          }
        } catch (error) {
          formatAppLog("error", "at pages/customer/customer.vue:409", "获取请求列表失败:", error);
          this.error = error.message || "获取请求列表失败";
          this.requestnumber = 0;
          uni.showToast({
            title: this.error,
            icon: "none"
          });
        } finally {
          this.isLoading = false;
        }
      },
      async getCurrentOrder() {
        this.isLoading = true;
        this.error = null;
        try {
          if (!this.userID) {
            throw new Error("用户未登录");
          }
          const response = await uni.request({
            url: `http://10.0.2.2:8083/carsharing/current-order?userId=${this.userID}`,
            method: "GET",
            header: {
              "Content-Type": "application/json"
            }
          });
          if (response.data.status === "success") {
            const res = response.data;
            const now = /* @__PURE__ */ new Date();
            formatAppLog("log", "at pages/customer/customer.vue:441", res.orders);
            if (res.orders && res.orders.length > 0) {
              const pastOrders = res.orders.filter((order) => new Date(order.startAt) < now).sort((a, b) => new Date(b.startAt) - new Date(a.startAt));
              formatAppLog("log", "at pages/customer/customer.vue:447", pastOrders);
              this.currentOrders = pastOrders.length > 0 ? [{
                id: pastOrders[0].id,
                distance: pastOrders[0].distance,
                driverName: pastOrders[0].realName,
                driverRating: pastOrders[0].rating,
                carModel: pastOrders[0].verificationCarModel || "未知车型",
                carPlate: pastOrders[0].verificationCarPlate || "未知车牌",
                startAt: pastOrders[0].startAt || "未知时间",
                avatar: pastOrders[0].avatar
              }] : [];
              this.ordersnumber = this.currentOrders.length;
            } else {
              this.ordersnumber = 0;
              this.currentOrders = [];
            }
          } else {
            throw new Error(response.data.message || "获取当前订单失败");
          }
        } catch (error) {
          formatAppLog("error", "at pages/customer/customer.vue:471", "获取当前订单失败:", error);
          this.error = error.message || "获取当前订单失败";
          this.ordersnumber = 0;
          this.currentOrders = [];
          uni.showToast({
            title: this.error,
            icon: "none"
          });
        } finally {
          this.isLoading = false;
        }
      },
      ToOrderDetail() {
        if (this.currentOrders.length > 0) {
          const orderid = this.currentOrders[0].id;
          formatAppLog("log", "at pages/customer/customer.vue:489", orderid);
          this.setOrderId(orderid);
          formatAppLog("log", "at pages/customer/customer.vue:492", this.rideOrder.orderID);
          uni.navigateTo({
            url: "./OrderDetail",
            // 替换为你的订单详情页面路径
            animationType: "slide-in-right",
            animationDuration: 300
          });
        } else {
          uni.showToast({
            title: "没有可查看的订单",
            icon: "none"
          });
        }
      }
    }
  };
  function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_ShareOption = vue.resolveComponent("ShareOption");
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle({ paddingTop: $data.statusBarHeight + "px" })
      },
      [
        vue.createCommentVNode(" 地图容器 "),
        vue.createElementVNode("view", { class: "map-container" }, [
          vue.createElementVNode(
            "web-view",
            {
              src: "/static/map.html",
              onMessage: _cache[0] || (_cache[0] = (...args) => $options.handleMapMessage && $options.handleMapMessage(...args))
            },
            null,
            32
            /* NEED_HYDRATION */
          ),
          vue.createCommentVNode(" 使用cover-view作为浮动按钮容器 "),
          vue.createElementVNode("cover-view", { class: "floating-buttons" }, [
            vue.createElementVNode("cover-view", { class: "start_end_loc" }, [
              vue.createElementVNode("cover-view", { class: "first-row" }, [
                vue.createElementVNode("cover-view", {
                  class: "location-row start",
                  onClick: _cache[3] || (_cache[3] = (...args) => $options.ToStartLoc && $options.ToStartLoc(...args))
                }, [
                  vue.createElementVNode("cover-view", {
                    class: "icon start-icon",
                    onClick: _cache[1] || (_cache[1] = (...args) => $options.ToStartLoc && $options.ToStartLoc(...args))
                  }),
                  vue.createElementVNode(
                    "cover-view",
                    {
                      class: "location-text",
                      onClick: _cache[2] || (_cache[2] = (...args) => $options.ToStartLoc && $options.ToStartLoc(...args))
                    },
                    vue.toDisplayString(_ctx.rideRequest.startLoc ? _ctx.rideRequest.startLoc : "你从哪上车"),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("cover-view", {
                  class: "location-row end",
                  onClick: _cache[6] || (_cache[6] = (...args) => $options.ToEndLoc && $options.ToEndLoc(...args))
                }, [
                  vue.createElementVNode("cover-view", {
                    class: "icon end-icon",
                    onClick: _cache[4] || (_cache[4] = (...args) => $options.ToEndLoc && $options.ToEndLoc(...args))
                  }),
                  vue.createElementVNode(
                    "cover-view",
                    {
                      class: "location-text",
                      onClick: _cache[5] || (_cache[5] = (...args) => $options.ToEndLoc && $options.ToEndLoc(...args))
                    },
                    vue.toDisplayString(_ctx.rideRequest.endLoc ? _ctx.rideRequest.endLoc : "你要到哪去"),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              vue.createElementVNode("cover-view", { class: "second-row" }, [
                vue.createElementVNode("cover-view", { class: "share-option" }, [
                  vue.createVNode(_component_ShareOption, {
                    type: "shared",
                    isSelected: $data.selectedType === "shared",
                    onSelect: $options.handleSelect
                  }, null, 8, ["isSelected", "onSelect"]),
                  vue.createVNode(_component_ShareOption, {
                    type: "exclusive",
                    isSelected: $data.selectedType === "exclusive",
                    onSelect: $options.handleSelect
                  }, null, 8, ["isSelected", "onSelect"])
                ]),
                vue.createElementVNode("cover-view", { class: "publish-button-container" }, [
                  vue.createElementVNode(
                    "cover-view",
                    {
                      class: vue.normalizeClass(["time-selector", { "has-time": $data.selectedTime }]),
                      onClick: _cache[9] || (_cache[9] = (...args) => $options.showTimePicker && $options.showTimePicker(...args))
                    },
                    [
                      vue.createElementVNode(
                        "cover-view",
                        {
                          class: "time-text",
                          onClick: _cache[7] || (_cache[7] = (...args) => $options.showTimePicker && $options.showTimePicker(...args))
                        },
                        vue.toDisplayString($data.selectedTime || "一会出发？选择出发时间"),
                        1
                        /* TEXT */
                      ),
                      vue.withDirectives(vue.createElementVNode(
                        "cover-view",
                        {
                          class: "time-line",
                          onClick: _cache[8] || (_cache[8] = (...args) => $options.showTimePicker && $options.showTimePicker(...args))
                        },
                        null,
                        512
                        /* NEED_PATCH */
                      ), [
                        [vue.vShow, !$data.selectedTime]
                      ])
                    ],
                    2
                    /* CLASS */
                  ),
                  vue.createElementVNode("cover-view", {
                    class: "publish-button",
                    onClick: _cache[10] || (_cache[10] = (...args) => $options.publishDemand && $options.publishDemand(...args))
                  }, "发布")
                ])
              ])
            ]),
            $data.currentOrders.length > 0 ? (vue.openBlock(), vue.createElementBlock("cover-view", {
              key: 0,
              class: "order-request"
            }, [
              vue.createElementVNode("cover-view", {
                class: "order-card",
                onClick: _cache[18] || (_cache[18] = (...args) => $options.ToOrderDetail && $options.ToOrderDetail(...args))
              }, [
                vue.createElementVNode("cover-view", {
                  class: "order-header",
                  onClick: _cache[13] || (_cache[13] = (...args) => $options.ToOrderDetail && $options.ToOrderDetail(...args))
                }, [
                  vue.createElementVNode("cover-view", {
                    class: "order-title",
                    style: { "font-size": "18px" },
                    onClick: _cache[11] || (_cache[11] = (...args) => $options.ToOrderDetail && $options.ToOrderDetail(...args))
                  }, [
                    vue.createElementVNode("cover-view", null, "正在"),
                    vue.createElementVNode("cover-view", { style: { "color": "var(--color-green)" } }, "进行中"),
                    vue.createElementVNode("cover-view", null, "的订单")
                  ]),
                  vue.createElementVNode("cover-view", {
                    class: "order-detail-btn",
                    onClick: _cache[12] || (_cache[12] = (...args) => $options.ToOrderDetail && $options.ToOrderDetail(...args))
                  }, "详情 >>")
                ]),
                vue.createElementVNode("cover-view", {
                  class: "order-content",
                  onClick: _cache[17] || (_cache[17] = (...args) => $options.ToOrderDetail && $options.ToOrderDetail(...args))
                }, [
                  vue.createElementVNode("cover-view", {
                    class: "order-distance",
                    onClick: _cache[14] || (_cache[14] = (...args) => $options.ToOrderDetail && $options.ToOrderDetail(...args))
                  }, [
                    vue.createElementVNode("cover-view", null, "剩余"),
                    vue.createElementVNode("cover-view", {
                      class: "km",
                      style: { "display": "flex", "flex-direction": "row", "align-items": "flex-end" }
                    }, [
                      vue.createElementVNode(
                        "cover-view",
                        { style: { "color": "var(--color-red)", "font-size": "24px" } },
                        vue.toDisplayString($data.currentOrders[0].distance),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("cover-view", { style: { "color": "var(--color-red)", "margin-left": "4px" } }, "km")
                    ])
                  ]),
                  vue.createElementVNode("cover-view", {
                    class: "driver-info",
                    onClick: _cache[16] || (_cache[16] = (...args) => $options.ToOrderDetail && $options.ToOrderDetail(...args))
                  }, [
                    vue.createElementVNode("cover-view", { class: "driver-rating" }, [
                      vue.createElementVNode("cover-view", { class: "stars" }, "★★★★★"),
                      vue.createElementVNode("cover-view", { class: "driver-detail" }, [
                        vue.createElementVNode(
                          "cover-view",
                          { class: "driver-name" },
                          vue.toDisplayString($data.currentOrders[0].driverName),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "cover-view",
                          { class: "driver-avator" },
                          vue.toDisplayString($data.currentOrders[0].avator),
                          1
                          /* TEXT */
                        )
                      ])
                    ]),
                    vue.createElementVNode("cover-view", {
                      class: "car-info",
                      onClick: _cache[15] || (_cache[15] = (...args) => $options.ToOrderDetail && $options.ToOrderDetail(...args))
                    }, [
                      vue.createElementVNode(
                        "cover-view",
                        { class: "car-plate" },
                        vue.toDisplayString($data.currentOrders[0].carPlate),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "cover-view",
                        { class: "car-detail" },
                        "🔍 " + vue.toDisplayString($data.currentOrders[0].carColor || "黑色") + " | " + vue.toDisplayString($data.currentOrders[0].carModel),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ])
              ]),
              vue.createElementVNode("cover-view", {
                class: "request-info",
                onClick: _cache[25] || (_cache[25] = (...args) => $options.ToDetailRequest && $options.ToDetailRequest(...args))
              }, [
                vue.createElementVNode("cover-view", {
                  class: "request-title",
                  onClick: _cache[19] || (_cache[19] = (...args) => $options.ToDetailRequest && $options.ToDetailRequest(...args))
                }, [
                  vue.createElementVNode("cover-view", null, "拼车"),
                  vue.createElementVNode("cover-view", { style: { "color": "var(--color-orange)" } }, "需求")
                ]),
                vue.createElementVNode("cover-view", {
                  class: "request-status",
                  onClick: _cache[20] || (_cache[20] = (...args) => $options.ToDetailRequest && $options.ToDetailRequest(...args))
                }, "已发布待匹配"),
                vue.createElementVNode("cover-view", {
                  class: "request-detail",
                  onClick: _cache[24] || (_cache[24] = (...args) => $options.ToDetailRequest && $options.ToDetailRequest(...args))
                }, [
                  vue.createElementVNode("cover-view", {
                    style: { "display": "flex", "flex-direction": "row", "align-items": "flex-end" },
                    onClick: _cache[22] || (_cache[22] = (...args) => $options.ToDetailRequest && $options.ToDetailRequest(...args))
                  }, [
                    vue.createElementVNode(
                      "cover-view",
                      {
                        class: "request-count",
                        onClick: _cache[21] || (_cache[21] = (...args) => $options.ToDetailRequest && $options.ToDetailRequest(...args))
                      },
                      vue.toDisplayString($data.requestnumber),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("cover-view", null, "条")
                  ]),
                  vue.createElementVNode("cover-view", {
                    class: "order-detail-btn",
                    onClick: _cache[23] || (_cache[23] = (...args) => $options.ToDetailRequest && $options.ToDetailRequest(...args))
                  }, "详情 >>")
                ])
              ])
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ])
      ],
      4
      /* STYLE */
    );
  }
  const PagesCustomerCustomer = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$z], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/customer/customer.vue"]]);
  const store = createStore({
    state() {
      return {
        userID: "1",
        rideRequest: {
          // 拼车需求数据
          startLoc: "华东理工大学",
          endLoc: "上海财经大学",
          startAt: /* @__PURE__ */ new Date("2025-04-14 00:00:00"),
          exclusive: false,
          highway: false,
          requestID: null
        },
        rideOrder: {
          orderID: null,
          startLoc: "华东理工大学",
          endLoc: "上海财经大学",
          startAt: /* @__PURE__ */ new Date("2025-04-14 00:00:00")
        },
        rideInvitation: {
          startLoc: "华东理工大学",
          endLoc: "上海财经大学",
          startAt: /* @__PURE__ */ new Date("2025-04-14 00:00:00"),
          seats: 3,
          invitationID: null
        },
        current_change_request_id: null
      };
    },
    mutations: {
      MLOGIN(state, userID) {
        state.userID = userID;
      },
      MLOGOUT(state) {
        state.userID = "未登录用户";
      },
      // RideRequest mutations
      SET_START_LOC(state, location) {
        state.rideRequest.startLoc = location;
      },
      SET_END_LOC(state, location) {
        state.rideRequest.endLoc = location;
      },
      SET_START_AT(state, datetime) {
        state.rideRequest.startAt = datetime;
      },
      SET_EXCLUSIVE(state, exclusive) {
        state.rideRequest.exclusive = exclusive;
      },
      SET_HIGHWAY(state, highway) {
        state.rideRequest.highway = highway;
      },
      TOGGLE_HIGHWAY(state) {
        state.rideRequest.highway = !state.rideRequest.highway;
      },
      SET_REQUEST_ID(state, id) {
        state.rideRequest.requestID = id;
      },
      SET_INVITATION_ID(state, id) {
        state.rideInvitation.invitationID = id;
      },
      SET_CURRENT_CHANGE_REQUEST_ID(state, id) {
        state.current_change_request_id = id;
      },
      RESET_REQUEST(state, id) {
        state.rideRequest.requestID = id;
        state.rideRequest.startLoc = null;
        state.rideRequest.endLoc = null;
        state.rideRequest.startAt = /* @__PURE__ */ new Date();
        state.rideRequest.exclusive = null;
        state.rideRequest.highway = false;
      },
      // SET_START_LOC_CURRENT_OBJECT(state, objectnum) {
      //   state.startLoc_currentObject = objectnum
      // },
      // SET_END_LOC_CURRENT_OBJECT(state, objectnum) {
      //   state.endLoc_currentObject = objectnum
      // },
      // SET_START_AT_CURRENT_OBJECT(state, objectnum) {
      //   state.startAt_currentObject = objectnum
      // },
      // Optional: reset all rideRequest fields
      RESET_RIDE_REQUEST(state) {
        state.rideRequest = {
          startLoc: "",
          endLoc: "",
          startAt: "",
          exclusive: false,
          highway: false,
          requestID: null
        };
      },
      SET_ORDER_ID(state, id) {
        state.rideOrder.orderID = id;
      }
    },
    actions: {
      login({ commit }, userID) {
        commit("MLOGIN", userID);
      },
      logout({ commit }) {
        commit("MLOGOUT");
      },
      // RideRequest actions
      setStartLoc({ commit }, location) {
        commit("SET_START_LOC", location);
      },
      setEndLoc({ commit }, location) {
        commit("SET_END_LOC", location);
      },
      setStartAt({ commit }, datetime) {
        commit("SET_START_AT", datetime);
      },
      setExclusive({ commit }, exclusive) {
        commit("SET_EXCLUSIVE", exclusive);
      },
      setHighway({ commit }, highway) {
        commit("SET_HIGHWAY", highway);
      },
      toggleHighway({ commit }) {
        commit("TOGGLE_HIGHWAY");
      },
      setRequestId({ commit }, id) {
        commit("SET_REQUEST_ID", id);
      },
      resetRideRequest({ commit }) {
        commit("RESET_RIDE_REQUEST");
      },
      setOrderId({ commit }, id) {
        commit("SET_ORDER_ID", id);
      },
      setInvitationId({ commit }, id) {
        commit("SET_INVITATION_ID", id);
      },
      setCurrentChangeRequestId({ commit }, id) {
        commit("SET_CURRENT_CHANGE_REQUEST_ID", id);
      },
      // setStartLocCurrentObject({ commit }, objectnum) {
      //   commit('SET_START_LOC_CURRENT_OBJECT', objectnum)
      // },
      // setEndLocCurrentObject({ commit }, objectnum) {
      //   commit('SET_END_LOC_CURRENT_OBJECT', objectnum)
      // },
      // setStartAtCurrentObject({ commit }, objectnum) {
      //   commit('SET_START_AT_CURRENT_OBJECT', objectnum)
      // },
      resetRequest({ commit }, id) {
        commit("RESET_REQUEST", id);
      }
    }
  });
  const _sfc_main$z = {
    data() {
      return {
        statusBarHeight: uni.getSystemInfoSync().statusBarHeight || 0,
        phone: "",
        password: "",
        showPassword: false
      };
    },
    methods: {
      togglePassword() {
        this.showPassword = !this.showPassword;
      },
      validateForm() {
        if (!/^1[3-9]\d{9}$/.test(this.phone)) {
          uni.showToast({ title: "请输入有效手机号", icon: "none" });
          return false;
        }
        if (!this.password.trim()) {
          uni.showToast({ title: "请输入密码", icon: "none" });
          return false;
        }
        return true;
      },
      async handleLogin() {
        if (!this.validateForm())
          return;
        uni.showLoading({ title: "登录中...", mask: true });
        try {
          formatAppLog("log", "at pages/my/login/passwordLogin.vue:95", "11111111");
          const res = await uni.request({
            url: "http://10.0.2.2:8083/carsharing/login",
            method: "POST",
            data: {
              phone: this.phone,
              password: this.password
            }
          });
          formatAppLog("log", "at pages/my/login/passwordLogin.vue:104", res);
          uni.hideLoading();
          if (res.data.status === "success") {
            const userID = res.data.userId;
            formatAppLog("log", "at pages/my/login/passwordLogin.vue:108", userID);
            store.dispatch("login", userID);
            uni.switchTab({ url: "/pages/customer/customer" });
          } else {
            uni.showToast({ title: res.data.msg || "登录失败", icon: "none" });
          }
        } catch (error) {
          uni.hideLoading();
          uni.showToast({ title: "网络错误，请重试", icon: "none" });
        }
      },
      navigateTo(url) {
        uni.navigateTo({ url });
      }
    }
  };
  function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "container",
        style: vue.normalizeStyle({ paddingTop: $data.statusBarHeight + "px" })
      },
      [
        vue.createElementVNode("view", { class: "login-content" }, [
          vue.createElementVNode("view", { class: "title" }, "密码登录"),
          vue.createElementVNode("view", { class: "input-group" }, [
            vue.createElementVNode("view", { class: "input-item" }, [
              vue.createElementVNode("text", { class: "prefix" }, "+86"),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.phone = $event),
                  type: "number",
                  placeholder: "请输入手机号码",
                  maxlength: "11",
                  class: "input"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.phone]
              ])
            ]),
            vue.createElementVNode("view", { class: "input-item" }, [
              vue.withDirectives(vue.createElementVNode("input", {
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.password = $event),
                type: $data.showPassword ? "text" : "password",
                placeholder: "请输入密码",
                class: "input",
                onConfirm: _cache[2] || (_cache[2] = (...args) => $options.handleLogin && $options.handleLogin(...args))
              }, null, 40, ["type"]), [
                [vue.vModelDynamic, $data.password]
              ]),
              vue.createElementVNode(
                "text",
                {
                  class: vue.normalizeClass(["iconfont", $data.showPassword ? "icon-eye" : "icon-eye-close"]),
                  onClick: _cache[3] || (_cache[3] = (...args) => $options.togglePassword && $options.togglePassword(...args))
                },
                null,
                2
                /* CLASS */
              )
            ])
          ]),
          vue.createElementVNode("button", {
            class: "login-btn",
            onClick: _cache[4] || (_cache[4] = (...args) => $options.handleLogin && $options.handleLogin(...args))
          }, "登录"),
          vue.createElementVNode("view", { class: "switch-login" }, [
            vue.createElementVNode("text", {
              onClick: _cache[5] || (_cache[5] = ($event) => $options.navigateTo("/pages/my/login/login"))
            }, "验证码登录"),
            vue.createElementVNode("text", {
              onClick: _cache[6] || (_cache[6] = ($event) => $options.navigateTo("/pages/my/login/forget"))
            }, "忘记密码")
          ]),
          vue.createCommentVNode(" 添加底部容器 "),
          vue.createElementVNode("view", { class: "bottom-container" }, [
            vue.createElementVNode("view", { class: "footer" }, [
              vue.createElementVNode("text", null, "还没有账户？"),
              vue.createElementVNode("text", {
                class: "register",
                onClick: _cache[7] || (_cache[7] = ($event) => $options.navigateTo("/pages/my/login/register"))
              }, "立即注册")
            ]),
            vue.createElementVNode("view", { class: "agreement" }, [
              vue.createTextVNode(" 登录即同意 "),
              vue.createElementVNode("text", {
                class: "link",
                onClick: _cache[8] || (_cache[8] = ($event) => $options.navigateTo("/pages/agreement/user"))
              }, "《用户协议》"),
              vue.createTextVNode(" 和 "),
              vue.createElementVNode("text", {
                class: "link",
                onClick: _cache[9] || (_cache[9] = ($event) => $options.navigateTo("/pages/agreement/privacy"))
              }, "《隐私政策》")
            ])
          ])
        ])
      ],
      4
      /* STYLE */
    );
  }
  const PagesMyLoginPasswordLogin = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$y], ["__scopeId", "data-v-ac03f4cd"], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/my/login/passwordLogin.vue"]]);
  const _imports_0$6 = "/static/icon_order.png";
  const _imports_1$2 = "/static/icon_safe.png";
  const _imports_2$1 = "/static/icon_cash.png";
  const _sfc_main$y = {
    data() {
      return {
        statusBarHeight: uni.getSystemInfoSync().statusBarHeight
      };
    },
    methods: {
      // 跳转到车主认证页面
      goToAuthPage() {
        uni.navigateTo({
          url: "/pages/driver/car-owner"
        });
      },
      // 跳转到车主搜索页面
      goToDriverSearch() {
        uni.navigateTo({
          url: "/pages/driver/driver_search"
        });
      }
    }
  };
  function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle({ paddingTop: $data.statusBarHeight + "px" }),
        class: "container"
      },
      [
        vue.createElementVNode("view", { class: "content-box" }, [
          vue.createElementVNode("view", { class: "features" }, [
            vue.createElementVNode("view", { class: "feature-item" }, [
              vue.createElementVNode("image", {
                src: _imports_0$6,
                class: "feature-icon"
              }),
              vue.createElementVNode("view", { class: "feature-text" }, [
                vue.createElementVNode("text", { class: "title green" }, "海量订单"),
                vue.createElementVNode("text", { class: "subtitle" }, "出行随时接单")
              ])
            ]),
            vue.createElementVNode("view", { class: "feature-item" }, [
              vue.createElementVNode("image", {
                src: _imports_1$2,
                class: "feature-icon"
              }),
              vue.createElementVNode("view", { class: "feature-text" }, [
                vue.createElementVNode("text", { class: "title blue" }, "完全合规"),
                vue.createElementVNode("text", { class: "subtitle" }, "注册接单无顾虑")
              ])
            ]),
            vue.createElementVNode("view", { class: "feature-item" }, [
              vue.createElementVNode("image", {
                src: _imports_2$1,
                class: "feature-icon"
              }),
              vue.createElementVNode("view", { class: "feature-text" }, [
                vue.createElementVNode("text", { class: "title orange" }, "快速提现"),
                vue.createElementVNode("text", { class: "subtitle" }, "支付宝秒到账")
              ])
            ])
          ]),
          vue.createCommentVNode(" 立即成为车主按钮 "),
          vue.createElementVNode("view", { class: "button-wrapper" }, [
            vue.createElementVNode("view", {
              class: "join-button",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.goToAuthPage && $options.goToAuthPage(...args))
            }, [
              vue.createElementVNode("text", { class: "button-text" }, "立即成为车主")
            ])
          ]),
          vue.createCommentVNode(" 已经是车主文字 "),
          vue.createElementVNode("view", { class: "link-wrapper" }, [
            vue.createElementVNode("text", {
              class: "link-text",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.goToDriverSearch && $options.goToDriverSearch(...args))
            }, "已经是车主")
          ])
        ])
      ],
      4
      /* STYLE */
    );
  }
  const PagesDriverDriver = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$x], ["__scopeId", "data-v-da5dba0b"], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/driver/driver.vue"]]);
  const _sfc_main$x = {
    data() {
      return {
        username: "",
        email: "",
        avatar: "",
        // 用于存储头像 URL
        home_address: "",
        company_address: "",
        showError: false,
        showUploadDialog: false,
        // 控制上传图片弹窗
        uploadedImage: ""
        // 存储上传的图片路径
      };
    },
    computed: {
      ...mapState(["userID"])
      // 假设 userID 是在 Vuex 里存的
    },
    onLoad() {
      if (this.userID && this.userID !== "未登录用户") {
        this.fetchUserInfo();
      }
    },
    methods: {
      // 返回上一页
      goBack() {
        uni.switchTab({ url: "/pages/my/my" });
      },
      // 获取用户信息，加载到表单
      fetchUserInfo() {
        uni.request({
          url: `http://10.0.2.2:8083/carsharing/get-user-info?userId=${this.userID}`,
          // 改成你的后端接口
          method: "GET",
          success: (res) => {
            if (res.data.status === "success" && res.data) {
              formatAppLog("log", "at pages/my/change/change.vue:155", res);
              const userInfo = res.data;
              this.username = userInfo.username || "";
              this.email = userInfo.email || "";
              this.avatar = userInfo.avatar || "";
              this.home_address = userInfo.homeAddress || "";
              this.company_address = userInfo.companyAddress || "";
            } else {
              uni.showToast({ title: "加载用户信息失败", icon: "none" });
            }
          },
          fail: () => {
            uni.showToast({ title: "网络错误，请重试", icon: "none" });
          }
        });
      },
      // 打开上传头像弹窗
      openUploadDialog() {
        this.showUploadDialog = true;
      },
      // 选择图片
      chooseImage() {
        uni.chooseImage({
          count: 1,
          sizeType: ["original", "compressed"],
          sourceType: ["album", "camera"],
          success: (res) => {
            this.uploadedImage = res.tempFilePaths[0];
          },
          fail: (err) => {
            uni.showToast({ title: "选择图片失败", icon: "none" });
          }
        });
      },
      // 关闭上传弹窗
      closeUploadDialog() {
        this.showUploadDialog = false;
        this.uploadedImage = "";
      },
      // 确认上传图片
      confirmUpload() {
        this.avatar = this.uploadedImage;
        this.showUploadDialog = false;
      },
      // 提交表单
      submitForm() {
        if (!this.username || !this.email) {
          this.showError = true;
          uni.vibrateShort();
          return;
        }
        uni.request({
          url: `http://10.0.2.2:8083/carsharing/update-user-info`,
          // 改成你的后端接口
          method: "POST",
          data: {
            userId: this.userID,
            // 带上 userID
            username: this.username,
            email: this.email,
            avatar: this.avatar,
            homeAddress: this.home_address,
            companyAddress: this.company_address
          },
          success: (res) => {
            if (res.data.status === "success" && res.data) {
              uni.showToast({ title: "更新成功", icon: "success" });
              uni.switchTab({ url: "/pages/my/my" });
            } else {
              uni.showToast({ title: "更新失败", icon: "none" });
            }
          },
          fail: () => {
            uni.showToast({ title: "网络错误，请重试", icon: "none" });
          }
        });
      }
    }
  };
  function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { class: "container" }, [
          vue.createCommentVNode(" 🔙 返回按钮 "),
          vue.createElementVNode("view", {
            class: "back-button",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.goBack && $options.goBack(...args))
          }, [
            vue.createVNode(_component_uni_icons, {
              type: "back",
              size: "24",
              color: "#333"
            }),
            vue.createElementVNode("text", { class: "back-text" }, "返回")
          ]),
          vue.createCommentVNode(" 标题和装饰线 "),
          vue.createElementVNode("view", { class: "header" }, [
            vue.createElementVNode("text", { class: "title" }, "用户信息登记"),
            vue.createElementVNode("view", { class: "title-line" })
          ]),
          vue.createCommentVNode(" 表单项 "),
          vue.createElementVNode("view", { class: "form-card" }, [
            vue.createCommentVNode(" 用户名 "),
            vue.createElementVNode("view", { class: "form-item" }, [
              vue.createElementVNode("view", { class: "item-header" }, [
                vue.createVNode(_component_uni_icons, {
                  type: "person",
                  size: "18",
                  color: "#666",
                  class: "icon"
                }),
                vue.createElementVNode("text", { class: "label" }, [
                  vue.createTextVNode("用户名"),
                  vue.createElementVNode("text", { class: "required" }, "*")
                ])
              ]),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.username = $event),
                  class: vue.normalizeClass(["input", { error: $data.showError && !$data.username }]),
                  placeholder: "请输入用户名",
                  "placeholder-class": "placeholder"
                },
                null,
                2
                /* CLASS */
              ), [
                [vue.vModelText, $data.username]
              ]),
              $data.showError && !$data.username ? (vue.openBlock(), vue.createElementBlock("text", {
                key: 0,
                class: "error-msg"
              }, "用户名不能为空")) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createCommentVNode(" 邮箱 "),
            vue.createElementVNode("view", { class: "form-item" }, [
              vue.createElementVNode("view", { class: "item-header" }, [
                vue.createVNode(_component_uni_icons, {
                  type: "email",
                  size: "18",
                  color: "#666",
                  class: "icon"
                }),
                vue.createElementVNode("text", { class: "label" }, "邮箱")
              ]),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.email = $event),
                  class: "input",
                  placeholder: "请输入邮箱",
                  "placeholder-class": "placeholder"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.email]
              ])
            ]),
            vue.createCommentVNode(" 用户头像 "),
            vue.createElementVNode("view", { class: "form-item" }, [
              vue.createElementVNode("view", { class: "item-header" }, [
                vue.createVNode(_component_uni_icons, {
                  type: "image",
                  size: "18",
                  color: "#666",
                  class: "icon"
                }),
                vue.createElementVNode("text", { class: "label" }, "用户头像")
              ]),
              vue.createElementVNode("view", { class: "avatar-upload" }, [
                $data.avatar ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "avatar-preview"
                }, [
                  vue.createElementVNode("image", {
                    src: $data.avatar,
                    class: "avatar-image",
                    mode: "aspectFit"
                  }, null, 8, ["src"])
                ])) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("button", {
                  class: "upload-btn",
                  onClick: _cache[3] || (_cache[3] = (...args) => $options.openUploadDialog && $options.openUploadDialog(...args))
                }, "上传头像")
              ])
            ]),
            vue.createCommentVNode(" 常用居住地址 "),
            vue.createElementVNode("view", { class: "form-item" }, [
              vue.createElementVNode("view", { class: "item-header" }, [
                vue.createVNode(_component_uni_icons, {
                  type: "location",
                  size: "18",
                  color: "#666",
                  class: "icon"
                }),
                vue.createElementVNode("text", { class: "label" }, "常用居住地址")
              ]),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.home_address = $event),
                  class: "input",
                  placeholder: "请输入常用居住地址",
                  "placeholder-class": "placeholder"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.home_address]
              ])
            ]),
            vue.createCommentVNode(" 常用公司地址 "),
            vue.createElementVNode("view", { class: "form-item" }, [
              vue.createElementVNode("view", { class: "item-header" }, [
                vue.createVNode(_component_uni_icons, {
                  type: "location",
                  size: "18",
                  color: "#666",
                  class: "icon"
                }),
                vue.createElementVNode("text", { class: "label" }, "常用公司地址")
              ]),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.company_address = $event),
                  class: "input",
                  placeholder: "请输入常用公司地址",
                  "placeholder-class": "placeholder"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.company_address]
              ])
            ]),
            vue.createCommentVNode(" 提交按钮 "),
            vue.createElementVNode("button", {
              onClick: _cache[6] || (_cache[6] = (...args) => $options.submitForm && $options.submitForm(...args)),
              class: "submit-button",
              "hover-class": "submit-button-hover"
            }, " 立即提交 ")
          ])
        ]),
        vue.createCommentVNode(" 上传图片弹窗 "),
        $data.showUploadDialog ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "upload-mask"
        }, [
          vue.createElementVNode("view", { class: "upload-box" }, [
            vue.createElementVNode("view", { class: "upload-title" }, "上传头像"),
            vue.createElementVNode("view", { class: "upload-area" }, [
              !$data.uploadedImage ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "upload-placeholder",
                onClick: _cache[7] || (_cache[7] = (...args) => $options.chooseImage && $options.chooseImage(...args))
              }, [
                vue.createElementVNode("text", null, "点击上传图片")
              ])) : (vue.openBlock(), vue.createElementBlock("image", {
                key: 1,
                src: $data.uploadedImage,
                class: "uploaded-image",
                mode: "aspectFit"
              }, null, 8, ["src"]))
            ]),
            vue.createElementVNode("view", { class: "upload-btns" }, [
              vue.createElementVNode("view", {
                class: "cancel",
                onClick: _cache[8] || (_cache[8] = (...args) => $options.closeUploadDialog && $options.closeUploadDialog(...args))
              }, "取消"),
              vue.createElementVNode("view", {
                class: "confirm",
                onClick: _cache[9] || (_cache[9] = (...args) => $options.confirmUpload && $options.confirmUpload(...args))
              }, "确定")
            ])
          ])
        ])) : vue.createCommentVNode("v-if", true)
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesMyChangeChange = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$w], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/my/change/change.vue"]]);
  const _sfc_main$w = {
    data() {
      return {
        selectedCity: "上海市",
        // 固定为上海市
        uploadItems: [
          { label: "驾驶证", desc: "准驾车型：至少包含A1, A2, A3, B1, B2, C1, C2", certified: false },
          { label: "行驶证", desc: "本人车辆或亲友车辆均可认证", certified: false },
          { label: "车辆照片", desc: "使用真实照片，座位数7座及以下", certified: false }
        ],
        realNameCertified: false,
        realName: "",
        idNumber: "",
        showAgreementDialog: false,
        // 控制协议弹窗显示
        showUploadDialog: false,
        // 控制上传弹窗显示
        currentUploadIndex: null,
        // 当前上传的项的索引
        uploadedImage: "",
        // 存储上传的图片路径
        agreeProtocol1: false,
        // 第一个协议勾选状态
        agreeProtocol2: false,
        // 第二个协议勾选状态
        isSubmitting: false
        // 防止重复点击
      };
    },
    computed: {
      currentUploadItem() {
        return this.currentUploadIndex !== null ? this.uploadItems[this.currentUploadIndex] : null;
      },
      idNumberDisplay() {
        if (!this.idNumber)
          return "";
        return this.idNumber.slice(0, 1) + "*".repeat(this.idNumber.length - 2) + this.idNumber.slice(-1);
      },
      isAllCertified() {
        return this.realNameCertified && this.uploadItems.every((item) => item.certified);
      },
      isAllAgreed() {
        return this.agreeProtocol1 && this.agreeProtocol2;
      }
    },
    methods: {
      goBack() {
        uni.navigateBack();
      },
      openAuthDialog() {
        uni.showModal({
          title: "实名认证 - 姓名",
          content: "请输入您的姓名",
          showCancel: true,
          editable: true,
          placeholderText: "请输入姓名",
          success: (res) => {
            if (res.confirm && res.content) {
              this.realName = res.content.trim();
              if (!this.realName) {
                uni.showToast({
                  title: "姓名不能为空",
                  icon: "none"
                });
                return;
              }
              uni.showModal({
                title: "实名认证 - 身份证号",
                content: "请输入您的身份证号",
                showCancel: true,
                editable: true,
                placeholderText: "请输入身份证号",
                success: (res2) => {
                  if (res2.confirm && res2.content) {
                    this.idNumber = res2.content.trim();
                    if (this.idNumber.length !== 18) {
                      uni.showToast({
                        title: "身份证号必须为18位",
                        icon: "none"
                      });
                      return;
                    }
                    const idNumberRegex = /^[1-9]\d{16}(\d|X)$/i;
                    if (!idNumberRegex.test(this.idNumber)) {
                      uni.showToast({
                        title: "身份证号格式不正确",
                        icon: "none"
                      });
                      return;
                    }
                    if (this.realName && this.idNumber.length === 18) {
                      this.realNameCertified = true;
                    } else {
                      uni.showToast({
                        title: "请输入有效信息",
                        icon: "none"
                      });
                    }
                  }
                }
              });
            } else if (res.confirm && !res.content) {
              uni.showToast({
                title: "姓名不能为空",
                icon: "none"
              });
            }
          }
        });
      },
      showAgreement() {
        this.showAgreementDialog = true;
      },
      hideAgreement() {
        this.showAgreementDialog = false;
      },
      openUploadDialog(index) {
        this.currentUploadIndex = index;
        this.uploadedImage = "";
        this.showUploadDialog = true;
      },
      closeUploadDialog() {
        this.showUploadDialog = false;
        this.currentUploadIndex = null;
        this.uploadedImage = "";
      },
      chooseImage() {
        uni.chooseImage({
          count: 1,
          sizeType: ["original", "compressed"],
          sourceType: ["album", "camera"],
          success: (res) => {
            this.uploadedImage = res.tempFilePaths[0];
          },
          fail: (err) => {
            uni.showToast({
              title: "选择图片失败",
              icon: "none"
            });
          }
        });
      },
      confirmUpload() {
        if (this.currentUploadIndex !== null) {
          this.uploadItems[this.currentUploadIndex].certified = true;
        }
        this.closeUploadDialog();
      },
      handleProtocolChange(e) {
        const values = e.detail.value;
        this.agreeProtocol1 = values.includes("protocol1");
        this.agreeProtocol2 = values.includes("protocol2");
        formatAppLog("log", "at pages/driver/car-owner.vue:276", "agreeProtocol1:", this.agreeProtocol1, "agreeProtocol2:", this.agreeProtocol2);
      },
      submit() {
        if (this.isSubmitting)
          return;
        this.isSubmitting = true;
        if (!this.isAllCertified) {
          uni.showToast({
            title: "请完成所有认证和上传",
            icon: "none"
          });
          this.isSubmitting = false;
          return;
        }
        if (!this.isAllAgreed) {
          uni.showToast({
            title: "请同意所有协议",
            icon: "none"
          });
          this.isSubmitting = false;
          return;
        }
        uni.setStorageSync("isAuthenticated", true);
        uni.navigateTo({
          url: "/pages/driver/driver_search",
          // 修正路径
          success: (res) => {
            formatAppLog("log", "at pages/driver/car-owner.vue:307", "跳转成功:", res);
          },
          fail: (err) => {
            formatAppLog("error", "at pages/driver/car-owner.vue:310", "跳转失败:", err);
            uni.showToast({
              title: "跳转失败，请检查路径",
              icon: "none"
            });
            this.isSubmitting = false;
          },
          complete: () => {
            this.isSubmitting = false;
          }
        });
      }
    },
    // 页面加载时检查认证状态
    onLoad() {
      const isAuthenticated = uni.getStorageSync("isAuthenticated");
      if (isAuthenticated) {
        uni.switchTab({
          url: "/pages/driver/driver_search"
        });
      }
    }
  };
  function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "auth-container" }, [
      vue.createCommentVNode(" 顶部标题栏 + 返回按钮 "),
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("view", {
          class: "back-icon",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.goBack && $options.goBack(...args))
        }, "‹"),
        vue.createElementVNode("text", { class: "title" }, "私家车拼车车主认证")
      ]),
      vue.createCommentVNode(" 城市显示（固定为上海市） "),
      vue.createElementVNode("view", { class: "city-display" }, [
        vue.createElementVNode("text", { class: "city-label" }, "接单城市"),
        vue.createElementVNode("view", { class: "city-box" }, [
          vue.createElementVNode(
            "text",
            { class: "city-name" },
            vue.toDisplayString($data.selectedCity),
            1
            /* TEXT */
          )
        ])
      ]),
      vue.createCommentVNode(" 实名认证卡片 "),
      vue.createElementVNode("view", { class: "auth-card" }, [
        vue.createElementVNode("view", { class: "row" }, [
          vue.createElementVNode("view", { class: "left" }, [
            vue.createElementVNode("text", { class: "label" }, "实名认证"),
            !$data.realNameCertified ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 0,
              class: "desc",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.openAuthDialog && $options.openAuthDialog(...args))
            }, "点击进行实名认证")) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
              vue.createElementVNode(
                "text",
                { class: "desc" },
                vue.toDisplayString($data.realName) + " " + vue.toDisplayString($options.idNumberDisplay),
                1
                /* TEXT */
              ),
              vue.createElementVNode("text", { class: "subdesc" }, "年龄要求：18–70周岁")
            ]))
          ]),
          $data.realNameCertified ? (vue.openBlock(), vue.createElementBlock("text", {
            key: 0,
            class: "verified"
          }, "✔ 已认证")) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createCommentVNode(" 上传项 "),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.uploadItems, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "row",
              key: index
            }, [
              vue.createElementVNode("view", { class: "left" }, [
                vue.createElementVNode(
                  "text",
                  { class: "label" },
                  vue.toDisplayString(item.label),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "desc" },
                  vue.toDisplayString(item.desc),
                  1
                  /* TEXT */
                )
              ]),
              item.certified ? (vue.openBlock(), vue.createElementBlock("text", {
                key: 0,
                class: "verified"
              }, "✔ 已认证")) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "upload-btn",
                onClick: ($event) => $options.openUploadDialog(index)
              }, "去上传", 8, ["onClick"]))
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createCommentVNode(" 协议 "),
      vue.createElementVNode("view", { class: "agreement" }, [
        vue.createElementVNode(
          "checkbox-group",
          {
            onChange: _cache[4] || (_cache[4] = (...args) => $options.handleProtocolChange && $options.handleProtocolChange(...args))
          },
          [
            vue.createElementVNode("view", { class: "checkbox-line" }, [
              vue.createElementVNode("checkbox", {
                value: "protocol1",
                checked: $data.agreeProtocol1
              }, null, 8, ["checked"]),
              vue.createTextVNode(" 请阅读并同意 "),
              vue.createElementVNode("text", {
                class: "link",
                onClick: _cache[2] || (_cache[2] = (...args) => $options.showAgreement && $options.showAgreement(...args))
              }, "《拼好车车主协议》"),
              vue.createTextVNode("（必选） ")
            ]),
            vue.createElementVNode("view", { class: "checkbox-line" }, [
              vue.createElementVNode("checkbox", {
                value: "protocol2",
                checked: $data.agreeProtocol2
              }, null, 8, ["checked"]),
              vue.createTextVNode(" 同意成为拼车车主并同意 "),
              vue.createElementVNode("text", {
                class: "link",
                onClick: _cache[3] || (_cache[3] = (...args) => $options.showAgreement && $options.showAgreement(...args))
              }, "《拼好车车主协议》")
            ])
          ],
          32
          /* NEED_HYDRATION */
        )
      ]),
      vue.createCommentVNode(" 提交按钮 "),
      vue.createElementVNode("view", { class: "submit-area" }, [
        vue.createElementVNode("button", {
          class: "submit-btn",
          disabled: $data.isSubmitting,
          onClick: _cache[5] || (_cache[5] = (...args) => $options.submit && $options.submit(...args))
        }, "确认上传", 8, ["disabled"])
      ]),
      vue.createCommentVNode(" 协议弹窗 "),
      $data.showAgreementDialog ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "agreement-mask"
      }, [
        vue.createElementVNode("view", { class: "agreement-box" }, [
          vue.createElementVNode("view", { class: "agreement-title" }, "拼好车车主协议"),
          vue.createElementVNode("scroll-view", {
            class: "agreement-content",
            "scroll-y": ""
          }, [
            vue.createElementVNode("view", { class: "content-text" }, [
              vue.createElementVNode("view", { class: "section" }, [
                vue.createElementVNode("text", { class: "section-title" }, "一、协议目的"),
                vue.createElementVNode("text", { class: "section-text" }, " 本协议旨在规范拼好车平台车主的服务行为，保障车主和乘客的合法权益，促进平台的健康发展。 ")
              ]),
              vue.createElementVNode("view", { class: "section" }, [
                vue.createElementVNode("text", { class: "section-title" }, "二、服务要求"),
                vue.createElementVNode("text", { class: "section-text" }, " 1. 车主需年满18周岁且不超过70周岁，持有有效驾驶证，并确保车辆符合平台要求（7座及以下）。\\n 2. 车主需提供真实有效的身份信息，包括姓名、身份证号、驾驶证、行驶证等。\\n 3. 车主应遵守交通规则，确保行车安全，不得从事违法行为。 ")
              ]),
              vue.createElementVNode("view", { class: "section" }, [
                vue.createElementVNode("text", { class: "section-title" }, "三、费用与结算"),
                vue.createElementVNode("text", { class: "section-text" }, " 1. 车主通过平台接单后，费用由乘客支付，平台将按约定比例与车主结算。\\n 2. 车主需遵守平台的收费标准，不得私自向乘客收取额外费用。 ")
              ]),
              vue.createElementVNode("view", { class: "section" }, [
                vue.createElementVNode("text", { class: "section-title" }, "四、责任与义务"),
                vue.createElementVNode("text", { class: "section-text" }, " 1. 车主应对乘客的安全负责，确保服务过程中不发生安全事故。\\n 2. 如因车主原因导致服务纠纷，车主需承担相应责任，平台有权暂停或终止其服务资格。 ")
              ]),
              vue.createElementVNode("view", { class: "section" }, [
                vue.createElementVNode("text", { class: "section-title" }, "五、其他条款"),
                vue.createElementVNode("text", { class: "section-text" }, " 1. 本协议自车主同意之日起生效。\\n 2. 平台有权根据法律法规或运营需要调整协议内容，调整后将通过平台通知车主。 ")
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "agreement-btns" }, [
            vue.createElementVNode("view", {
              class: "close-btn",
              onClick: _cache[6] || (_cache[6] = (...args) => $options.hideAgreement && $options.hideAgreement(...args))
            }, "关闭")
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 上传图片弹窗 "),
      $data.showUploadDialog ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "upload-mask"
      }, [
        vue.createElementVNode("view", { class: "upload-box" }, [
          vue.createElementVNode(
            "view",
            { class: "upload-title" },
            "上传" + vue.toDisplayString($options.currentUploadItem ? $options.currentUploadItem.label : ""),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "upload-area" }, [
            !$data.uploadedImage ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "upload-placeholder",
              onClick: _cache[7] || (_cache[7] = (...args) => $options.chooseImage && $options.chooseImage(...args))
            }, [
              vue.createElementVNode("text", null, "点击上传图片")
            ])) : (vue.openBlock(), vue.createElementBlock("image", {
              key: 1,
              src: $data.uploadedImage,
              class: "uploaded-image",
              mode: "aspectFit"
            }, null, 8, ["src"]))
          ]),
          vue.createElementVNode("view", { class: "upload-btns" }, [
            vue.createElementVNode("view", {
              class: "cancel",
              onClick: _cache[8] || (_cache[8] = (...args) => $options.closeUploadDialog && $options.closeUploadDialog(...args))
            }, "取消"),
            vue.createElementVNode("view", {
              class: "confirm",
              onClick: _cache[9] || (_cache[9] = (...args) => $options.confirmUpload && $options.confirmUpload(...args))
            }, "确定")
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesDriverCarOwner = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$v], ["__scopeId", "data-v-ba5a77be"], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/driver/car-owner.vue"]]);
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
  const _sfc_main$v = {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    computed: {
      paymentStatus() {
        if (this.item.status === "PENDING" || this.item.status === "ONGOING")
          return "未支付";
        if (this.item.status === "COMPLETED")
          return "已支付";
        if (this.item.status === "CANCELLED")
          return "已取消";
        return "";
      }
    },
    methods: {
      formatDateTime,
      handleItemClick() {
        if (!this.item.id) {
          uni.showToast({
            title: "订单ID不存在",
            icon: "none"
          });
          return;
        }
        uni.navigateTo({
          url: `/pages/driver/RideInfoDisplayPage?id=${this.item.id}`
        });
      }
    }
  };
  function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", {
      onClick: _cache[0] || (_cache[0] = (...args) => $options.handleItemClick && $options.handleItemClick(...args))
    }, [
      vue.createElementVNode("view", { class: "block" }, [
        vue.createElementVNode(
          "view",
          { class: "time-text" },
          vue.toDisplayString($options.formatDateTime($props.item.startAt)),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", { class: "location-row" }, [
          vue.createElementVNode("view", { class: "location-section" }, [
            vue.createElementVNode("view", { class: "location-item" }, [
              vue.createVNode(_component_uni_icons, {
                type: "circle-filled",
                size: "14",
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
            vue.createElementVNode("view", { class: "dashed-line" }),
            vue.createElementVNode("view", { class: "location-item" }, [
              vue.createVNode(_component_uni_icons, {
                type: "circle-filled",
                size: "14",
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
          vue.createElementVNode("text", { class: "amount-on-right" }, [
            vue.createElementVNode(
              "text",
              { class: "price-number" },
              vue.toDisplayString($props.item.price.toFixed(2)),
              1
              /* TEXT */
            ),
            vue.createElementVNode("text", { class: "price-unit" }, "元")
          ])
        ]),
        vue.createElementVNode("view", { class: "tags-row" }, [
          vue.createElementVNode("view", { class: "tag" }, "1人"),
          vue.createElementVNode(
            "view",
            { class: "tag" },
            vue.toDisplayString($props.item.exclusive ? "独享" : "拼座"),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "view",
            { class: "tag" },
            vue.toDisplayString($options.paymentStatus),
            1
            /* TEXT */
          ),
          $props.item.highway ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "tag tag-blue"
          }, "愿意协商高速费")) : vue.createCommentVNode("v-if", true)
        ])
      ])
    ]);
  }
  const ComponentsInvitationList = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$u], ["__scopeId", "data-v-4846c26a"], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/components/InvitationList.vue"]]);
  const _sfc_main$u = {
    components: { InvitationList: ComponentsInvitationList },
    data() {
      return {
        activeTab: "市内",
        activeRouteTab: "市内路线",
        startLocation: "",
        endLocation: "",
        locationTags: ["上海南站", "虹桥1", "虹桥2", "浦东3", "浦东4"],
        invitationCount: 3,
        tripListItems: [],
        isdriver: false,
        seats: 1
      };
    },
    computed: {
      ...mapState(["userID", "rideRequest", "rideOrder", "rideInvitation"]),
      formattedTime() {
        const now = this.rideInvitation.startAt;
        const today = /* @__PURE__ */ new Date();
        let prefix = "今天";
        if (now.getDate() !== today.getDate()) {
          prefix = `${now.getMonth() + 1}月${now.getDate()}日`;
        }
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        return `${prefix}${hours}:${minutes}`;
      }
    },
    methods: {
      ...mapActions([
        "setInvitationId"
      ]),
      goToAuthPage() {
        uni.navigateTo({
          url: "/pages/driver/car-owner"
        });
      },
      selectLocation(tag) {
        if (!this.startLocation) {
          this.startLocation = tag;
        } else if (!this.endLocation) {
          this.endLocation = tag;
        } else {
          this.startLocation = tag;
        }
      },
      showSeatPicker() {
        uni.showActionSheet({
          itemList: ["1 个", "2 个", "3 个", "4 个"],
          success: (res) => {
            this.rideInvitation.seats = res.tapIndex + 1;
            uni.showToast({
              title: `已设置为 ${this.rideInvitation.seats} 个座位`,
              icon: "success"
            });
          },
          fail: () => {
            uni.showToast({
              title: "未选择座位数",
              icon: "none"
            });
          }
        });
      },
      showTimePicker() {
        uni.showActionSheet({
          itemList: ["15分钟后", "30分钟后", "1小时后", "自定义时间"],
          success: (res) => {
            if (res.tapIndex === 3) {
              this.showDateTimeInput();
            } else {
              const times = [15, 30, 60];
              this.selectTime(times[res.tapIndex]);
            }
          }
        });
      },
      selectTime(minutesLater) {
        const now = /* @__PURE__ */ new Date();
        const targetTime = new Date(now.getTime() + minutesLater * 6e4);
        this.rideInvitation.startAt = targetTime;
        uni.showToast({
          title: `已设置：${minutesLater}分钟后`,
          icon: "success"
        });
      },
      showDateTimeInput() {
        const now = /* @__PURE__ */ new Date();
        const currentDateTime = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
        uni.showModal({
          title: "自定义出发时间",
          content: `当前时间: ${currentDateTime}
请输入出发时间(YYYY-MM-DD HH:MM)`,
          editable: true,
          placeholderText: "例如: " + this.getTomorrowDate(),
          showCancel: false,
          confirmButtonText: "确定",
          confirmButtonColor: "#007AFF",
          success: (res) => {
            if (res.confirm) {
              this.validateAndSetDateTime(res.content);
            }
          }
        });
      },
      getTomorrowDate() {
        const tomorrow = /* @__PURE__ */ new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return `${tomorrow.getFullYear()}-${(tomorrow.getMonth() + 1).toString().padStart(2, "0")}-${tomorrow.getDate().toString().padStart(2, "0")} 09:00`;
      },
      validateAndSetDateTime(dateTimeStr) {
        const dateTimeRegex = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/;
        if (!dateTimeRegex.test(dateTimeStr)) {
          uni.showToast({
            title: "格式不正确，请使用YYYY-MM-DD HH:MM格式",
            icon: "none"
          });
          return;
        }
        const [_, year, month, day, hours, minutes] = dateTimeStr.match(dateTimeRegex);
        const targetTime = new Date(year, month - 1, day, hours, minutes);
        const now = /* @__PURE__ */ new Date();
        if (isNaN(targetTime.getTime())) {
          uni.showToast({
            title: "时间无效",
            icon: "none"
          });
          return;
        }
        if (targetTime < now) {
          uni.showToast({
            title: "不能选择过去的时间",
            icon: "none"
          });
          return;
        }
        this.rideInvitation.startAt = targetTime;
        uni.showToast({
          title: "时间设置成功",
          icon: "success"
        });
      },
      async publishInvitation() {
        try {
          const requestData = {
            driverId: this.userID,
            startLoc: this.rideInvitation.startLoc,
            endLoc: this.rideInvitation.endLoc,
            status: "PENDING",
            startAt: this.rideInvitation.startAt,
            seats: this.rideInvitation.seats
          };
          const response = await uni.request({
            url: "http://10.0.2.2:8083/carsharing/post-invitation",
            method: "POST",
            data: requestData,
            header: {
              "Content-Type": "application/json"
            }
          });
          if (response.data.status === "success") {
            const responseData = response.data;
            if (responseData.invitationID) {
              this.setInvitationId(responseData.invitationID);
              uni.showToast({
                title: "发布成功",
                icon: "success"
              });
              this.goToSearchResult();
            } else {
              throw new Error("未收到 requestID");
            }
          } else {
            throw new Error("请求失败");
          }
        } catch (error) {
          formatAppLog("error", "at pages/driver/driver_search.vue:313", "发布失败:", error);
          uni.showToast({
            title: "发布失败",
            icon: "none"
          });
        }
      },
      goToSearchResult() {
        uni.navigateTo({ url: "/pages/driver/search-result" });
      },
      searchRides() {
        this.publishInvitation();
      },
      goToInvitations() {
        uni.navigateTo({ url: "/pages/driver/invitations" });
      },
      goToMyTrips() {
        uni.navigateTo({ url: "/pages/driver/driverTripList" });
      },
      async getRides() {
        try {
          const response = await uni.request({
            url: "http://10.0.2.2:8083/carsharing/get-all-invitations",
            method: "GET",
            header: { "Content-Type": "application/json" }
          });
          formatAppLog("log", "at pages/driver/driver_search.vue:341", response);
          if (response.data.history && response.data.history.length > 0) {
            this.tripListItems = response.data.history.map((item) => ({
              id: item.id,
              startAt: item.startAt || "未知时间",
              startLoc: item.startLoc || "未知",
              endLoc: item.endLoc || "未知",
              distance: item.distance,
              price: item.price,
              status: item.status || "",
              exclusive: item.exclusive || false,
              highway: item.highway || false
            }));
          } else {
            this.tripListItems = [];
          }
        } catch (error) {
          formatAppLog("error", "at pages/driver/driver_search.vue:358", "拉取失败:", error);
          uni.showToast({
            title: "拉取失败",
            icon: "none"
          });
        }
      },
      async getUserInfo() {
        try {
          const response = await uni.request({
            url: `http://10.0.2.2:8083/carsharing/my?userId=${this.userID}`,
            method: "GET",
            header: { "Content-Type": "application/json" }
          });
          formatAppLog("log", "at pages/driver/driver_search.vue:372", response);
          if (response.data.userInfo) {
            if (response.data.userInfo.role === "driver") {
              this.isdriver = true;
            }
          } else {
            this.tripListItems = [];
          }
          formatAppLog("log", "at pages/driver/driver_search.vue:380", this.isdriver);
        } catch (error) {
          formatAppLog("error", "at pages/driver/driver_search.vue:382", "拉取失败:", error);
          uni.showToast({
            title: "拉取失败",
            icon: "none"
          });
        }
      }
    },
    onLoad() {
      this.getRides();
      this.getUserInfo();
    },
    onShow() {
      this.getUserInfo();
    },
    ToStartLoc() {
      uni.navigateTo({
        url: "./StartLoc",
        animationType: "slide-in-right",
        animationDuration: 300
      });
    },
    ToEndLoc() {
      uni.navigateTo({
        url: "./EndLoc",
        animationType: "slide-in-right",
        animationDuration: 300
      });
    }
  };
  function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_InvitationList = vue.resolveComponent("InvitationList");
    return vue.openBlock(), vue.createElementBlock("view", { class: "app-container" }, [
      $data.isdriver ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "main-content"
      }, [
        vue.createCommentVNode(" 搜索表单 "),
        vue.createElementVNode("view", { class: "search-form-container" }, [
          vue.createElementVNode("view", { class: "location-tabs" }, [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["tab", { active: $data.activeTab === "市内" }]),
                onClick: _cache[0] || (_cache[0] = ($event) => $data.activeTab = "市内")
              },
              "市内",
              2
              /* CLASS */
            ),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["tab", { active: $data.activeTab === "城际" }]),
                onClick: _cache[1] || (_cache[1] = ($event) => $data.activeTab = "城际")
              },
              "城际",
              2
              /* CLASS */
            )
          ]),
          vue.createElementVNode("view", { class: "search-form" }, [
            vue.createElementVNode("view", {
              class: "input-group",
              onClick: _cache[3] || (_cache[3] = (...args) => _ctx.ToStartLoc && _ctx.ToStartLoc(...args))
            }, [
              vue.createElementVNode("view", { class: "dot green" }),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  type: "text",
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.startLocation = $event),
                  placeholder: "您的出发地",
                  class: "form-input"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.startLocation]
              ])
            ]),
            vue.createElementVNode("view", {
              class: "input-group",
              onClick: _cache[5] || (_cache[5] = (...args) => _ctx.ToEndLoc && _ctx.ToEndLoc(...args))
            }, [
              vue.createElementVNode("view", { class: "dot orange" }),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  type: "text",
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.endLocation = $event),
                  placeholder: "您的目的地",
                  class: "form-input"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.endLocation]
              ])
            ]),
            vue.createElementVNode("view", { class: "location-tags" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.locationTags, (tag, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "tag",
                    key: index,
                    onClick: ($event) => $options.selectLocation(tag)
                  }, vue.toDisplayString(tag), 9, ["onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            vue.createCommentVNode(" 时间 + 座位数 统一样式 "),
            vue.createElementVNode("view", { class: "info-row" }, [
              vue.createElementVNode("view", {
                class: "info-box",
                onClick: _cache[6] || (_cache[6] = (...args) => $options.showTimePicker && $options.showTimePicker(...args))
              }, [
                vue.createElementVNode("text", { class: "icon" }, "🕘"),
                vue.createElementVNode(
                  "text",
                  { class: "text" },
                  vue.toDisplayString($options.formattedTime),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", {
                class: "info-box",
                onClick: _cache[7] || (_cache[7] = (...args) => $options.showSeatPicker && $options.showSeatPicker(...args))
              }, [
                vue.createElementVNode("text", { class: "icon" }, "💺"),
                vue.createElementVNode(
                  "text",
                  { class: "text" },
                  "座位数：" + vue.toDisplayString(_ctx.rideInvitation.seats) + " 个",
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("button", {
              class: "search-button",
              onClick: _cache[8] || (_cache[8] = (...args) => $options.searchRides && $options.searchRides(...args))
            }, "发布并搜索")
          ])
        ]),
        vue.createCommentVNode(" 导航卡片 "),
        vue.createElementVNode("view", { class: "navigation-cards" }, [
          vue.createElementVNode("view", {
            class: "nav-card invitation-card",
            onClick: _cache[9] || (_cache[9] = (...args) => $options.goToInvitations && $options.goToInvitations(...args))
          }, [
            vue.createElementVNode("view", { class: "nav-card-content" }, [
              vue.createElementVNode("view", { class: "nav-card-title" }, "拼车邀请"),
              vue.createElementVNode("view", { class: "nav-card-subtitle" }, "正在寻找乘客")
            ]),
            vue.createElementVNode("view", { class: "nav-card-detail" }, "详情 >")
          ]),
          vue.createElementVNode("view", {
            class: "nav-card trip-card",
            onClick: _cache[10] || (_cache[10] = (...args) => $options.goToMyTrips && $options.goToMyTrips(...args))
          }, [
            vue.createElementVNode("view", { class: "nav-card-content" }, [
              vue.createElementVNode("view", { class: "nav-card-title" }, "我的行程"),
              vue.createElementVNode("view", { class: "nav-card-subtitle" }, "历史拼车订单")
            ]),
            vue.createElementVNode("view", { class: "nav-card-detail" }, "详情 >")
          ])
        ]),
        vue.createCommentVNode(" 路线标签 "),
        vue.createElementVNode("view", { class: "route-tabs" }, [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["route-tab", { active: $data.activeRouteTab === "市内路线" }]),
              onClick: _cache[11] || (_cache[11] = ($event) => $data.activeRouteTab = "市内路线")
            },
            "市内路线",
            2
            /* CLASS */
          ),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["route-tab", { active: $data.activeRouteTab === "城际路线" }]),
              onClick: _cache[12] || (_cache[12] = ($event) => $data.activeRouteTab = "城际路线")
            },
            "城际路线",
            2
            /* CLASS */
          )
        ]),
        vue.createCommentVNode(" 行程列表 "),
        $data.tripListItems.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.tripListItems, (item, index) => {
              return vue.openBlock(), vue.createBlock(_component_InvitationList, {
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
          vue.createElementVNode("text", null, "暂无拼车邀请")
        ]))
      ])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "container"
      }, [
        vue.createElementVNode("view", { class: "content-box" }, [
          vue.createElementVNode("view", { class: "features" }, [
            vue.createElementVNode("view", { class: "feature-item" }, [
              vue.createElementVNode("image", {
                src: _imports_0$6,
                class: "feature-icon"
              }),
              vue.createElementVNode("view", { class: "feature-text" }, [
                vue.createElementVNode("text", { class: "title green" }, "海量订单"),
                vue.createElementVNode("text", { class: "subtitle" }, "出行随时接单")
              ])
            ]),
            vue.createElementVNode("view", { class: "feature-item" }, [
              vue.createElementVNode("image", {
                src: _imports_1$2,
                class: "feature-icon"
              }),
              vue.createElementVNode("view", { class: "feature-text" }, [
                vue.createElementVNode("text", { class: "title blue" }, "完全合规"),
                vue.createElementVNode("text", { class: "subtitle" }, "注册接单无顾虑")
              ])
            ]),
            vue.createElementVNode("view", { class: "feature-item" }, [
              vue.createElementVNode("image", {
                src: _imports_2$1,
                class: "feature-icon"
              }),
              vue.createElementVNode("view", { class: "feature-text" }, [
                vue.createElementVNode("text", { class: "title orange" }, "快速提现"),
                vue.createElementVNode("text", { class: "subtitle" }, "支付宝秒到账")
              ])
            ])
          ]),
          vue.createCommentVNode(" 立即成为车主按钮 "),
          vue.createElementVNode("view", { class: "button-wrapper" }, [
            vue.createElementVNode("view", {
              class: "join-button",
              onClick: _cache[13] || (_cache[13] = (...args) => $options.goToAuthPage && $options.goToAuthPage(...args))
            }, [
              vue.createElementVNode("text", { class: "button-text" }, "立即成为车主")
            ])
          ])
        ])
      ]))
    ]);
  }
  const PagesDriverDriverSearch = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$t], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/driver/driver_search.vue"]]);
  const _imports_0$5 = "/static/left-arrow.png";
  const _sfc_main$t = {
    name: "PageHeader",
    props: {
      backText: {
        type: String,
        default: "返回"
      },
      backUrl: {
        type: String,
        default: "/pages/customer/customer_new"
      }
    },
    data() {
      return {
        // 定义 TabBar 页面路径列表
        tabBarPages: [
          "/pages/driver/driver",
          "/pages/customer/customer_new",
          "/pages/my/my"
        ]
      };
    },
    methods: {
      handleBack() {
        if (this.tabBarPages.includes(this.backUrl)) {
          uni.switchTab({
            url: this.backUrl
          });
        } else {
          uni.navigateBack({
            delta: 1
            // 返回上一页
          });
        }
      }
    }
  };
  function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "all" }, [
      vue.createElementVNode("view", { class: "head-content" }, [
        vue.createElementVNode("view", null, [
          vue.createElementVNode("view", { class: "back-btn" }, [
            vue.createElementVNode("image", {
              src: _imports_0$5,
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
  const ComponentsPageHeader = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$s], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/components/PageHeader.vue"]]);
  const _sfc_main$s = {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    computed: {
      paymentStatus() {
        if (this.item.status === "PENDING" || this.item.status === "ONGOING")
          return "未支付";
        if (this.item.status === "COMPLETED")
          return "已支付";
        if (this.item.status === "CANCELLED")
          return "已取消";
        return "";
      }
    },
    methods: {
      formatDateTime
    }
  };
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "block" }, [
        vue.createElementVNode("view", { class: "first-row" }, [
          vue.createElementVNode("view", { style: { "display": "flex", "gap": "10px", "align-items": "center" } }, [
            vue.createElementVNode(
              "view",
              { class: "convenient-rate" },
              vue.toDisplayString(($props.item.convenientRate * 100).toFixed(1)) + "%顺路",
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "view",
              { class: "offset" },
              vue.toDisplayString($props.item.offset.toFixed(1)) + "km偏差",
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode(
            "view",
            { class: "time-text" },
            vue.toDisplayString($options.formatDateTime($props.item.startAt)),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "location-row" }, [
          vue.createElementVNode("view", { class: "location-section" }, [
            vue.createElementVNode("view", { class: "location-item" }, [
              vue.createVNode(_component_uni_icons, {
                type: "circle-filled",
                size: "14",
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
            vue.createElementVNode("view", { class: "dashed-line" }),
            vue.createElementVNode("view", { class: "location-item" }, [
              vue.createVNode(_component_uni_icons, {
                type: "circle-filled",
                size: "14",
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
          vue.createElementVNode("text", { class: "amount-on-right" }, [
            vue.createElementVNode(
              "text",
              { class: "price-number" },
              vue.toDisplayString($props.item.price.toFixed(2)),
              1
              /* TEXT */
            ),
            vue.createElementVNode("text", { class: "price-unit" }, "元")
          ])
        ]),
        vue.createElementVNode("view", { class: "tags-row" }, [
          vue.createElementVNode("view", { class: "tag" }, "1人"),
          vue.createElementVNode(
            "view",
            { class: "tag" },
            vue.toDisplayString($props.item.exclusive ? "独享" : "拼座"),
            1
            /* TEXT */
          ),
          vue.createCommentVNode('        <view class="tag">{{ paymentStatus }}</view> '),
          $props.item.highway ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "tag tag-blue"
          }, "愿意协商高速费")) : vue.createCommentVNode("v-if", true)
        ])
      ])
    ]);
  }
  const ComponentsMatchedRequestBlock = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$r], ["__scopeId", "data-v-b0e60d77"], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/components/MatchedRequestBlock.vue"]]);
  const _imports_0$4 = "/static/lightning.png";
  const _imports_1$1 = "/static/edit.png";
  const _imports_2 = "/static/delete.png";
  const _imports_3 = "/static/arrowdown.png";
  const _sfc_main$r = {
    components: {
      PageHeader: ComponentsPageHeader,
      MatchedRequestBlock: ComponentsMatchedRequestBlock
    },
    data() {
      return {
        invitationInfo: {
          start_loc: "北京市海淀区中关村大街1号",
          end_loc: "北京市朝阳区建国路88号",
          seats: 0,
          start_at: "2023-06-15T09:00:00"
          // 假设司机行程开始时间
        },
        sortIndex: 0,
        sortOptions: ["按时间排序", "按顺路度由高到低排序", "按价格由低到高排序", "按价格由高到低排序"],
        listBlockItems: [
          // {
          //   id: '1',
          //   startAt: '2023-06-15T08:30:00',
          //   startLoc: '北京市海淀区中关村大街5号',
          //   endLoc: '北京市朝阳区国贸大厦',
          //   person: '张先生',
          //   price: 45,
          //   offset: 6.6,
          //   exclusive: false,
          //   highway: true,
          //   convenientRate: 0.65,
          // },
          // {
          //   id: '2',
          //   startAt: '2023-06-15T09:15:00',
          //   startLoc: '北京市海淀区清华大学东门',
          //   endLoc: '北京市朝阳区CBD万达广场',
          //   person: '李女士',
          //   price: 35,
          //   offset: 3.4,
          //   exclusive: true,
          //   highway: false,
          //   convenientRate: 0.75,
          // },
          // {
          //   id: '3',
          //   startAt: '2023-06-15T10:00:00',
          //   startLoc: '北京市海淀区北京大学西门',
          //   endLoc: '北京市朝阳区三里屯',
          //   person: '王同学',
          //   price: 30,
          //   offset: 4,
          //   exclusive: false,
          //   highway: true,
          //   convenientRate: 0.85,
          // },
          // {
          //   id: '4',
          //   startAt: '2023-06-15T18:45:00',
          //   startLoc: '北京市海淀区人民大学',
          //   endLoc: '北京市朝阳区朝阳公园',
          //   person: '赵先生',
          //   price: 40,
          //   offset: 5,
          //   exclusive: true,
          //   highway: true,
          //   convenientRate: 0.235,
          // },
          // {
          //   id: '5',
          //   startAt: '2023-06-15T09:30:00',
          //   startLoc: '北京市海淀区五道口',
          //   endLoc: '北京市朝阳区大望路',
          //   person: '刘女士',
          //   price: 25,
          //   offset: 70,
          //   exclusive: false,
          //   highway: false,
          //   convenientRate: 0.455,
          // }
        ],
        isLoading: false,
        error: null,
        // 筛选条件状态
        highwayFilter: false,
        exclusiveFilter: false,
        timeFilter: false,
        offsetFilter: false
        // 改为 offsetFilter
      };
    },
    computed: {
      ...mapState(["userID", "rideRequest", "rideOrder", "rideInvitation"]),
      // 计算过滤后的订单
      filteredItems() {
        let filtered = [...this.listBlockItems];
        if (this.highwayFilter) {
          filtered = filtered.filter((item) => item.highway === true);
        }
        if (this.exclusiveFilter) {
          filtered = filtered.filter((item) => item.exclusive === true);
        }
        if (this.timeFilter) {
          const driverTime = new Date(this.invitationInfo.start_at).getTime();
          const oneHour = 60 * 60 * 1e3;
          filtered = filtered.filter((item) => {
            const itemTime = new Date(item.startAt).getTime();
            return Math.abs(itemTime - driverTime) <= oneHour;
          });
        }
        if (this.offsetFilter) {
          filtered = filtered.filter((item) => item.offset <= 5);
        }
        const sortType = this.sortOptions[this.sortIndex];
        switch (sortType) {
          case "按时间排序":
            filtered.sort((a, b) => new Date(a.startAt) - new Date(b.startAt));
            break;
          case "按顺路度由高到低排序":
            filtered.sort((a, b) => b.convenientRate - a.convenientRate);
            break;
          case "按价格由低到高排序":
            filtered.sort((a, b) => a.price - b.price);
            break;
          case "按价格由高到低排序":
            filtered.sort((a, b) => b.price - a.price);
            break;
        }
        return filtered;
      }
    },
    onLoad() {
      this.getCurrentInvitation();
      this.getMatchedRequests();
      this.sortReqests();
    },
    methods: {
      formatDateTime,
      async getCurrentInvitation() {
        this.isLoading = true;
        this.error = null;
        try {
          formatAppLog("log", "at pages/driver/search-result.vue:215", this.rideInvitation.invitationID);
          if (!this.rideInvitation.invitationID) {
            throw new Error("未获取到订单ID");
          }
          const response = await uni.request({
            url: `http://10.0.2.2:8083/carsharing/get-certain-invitation?offerId=${this.rideInvitation.invitationID}`,
            method: "GET",
            header: {
              "Content-Type": "application/json"
            }
          });
          formatAppLog("log", "at pages/driver/search-result.vue:226", response.data);
          if (response.data.status === "success") {
            this.invitationInfo = response.data.data;
            formatAppLog("log", "at pages/driver/search-result.vue:229", this.invitationInfo);
          } else {
            throw new Error(response.data.message || "获取邀请信息失败");
          }
        } catch (error) {
          formatAppLog("error", "at pages/driver/search-result.vue:234", "获取邀请信息失败:", error);
          this.error = error.message || "获取邀请信息失败";
          uni.showToast({
            title: this.error,
            icon: "none"
          });
        } finally {
          this.isLoading = false;
        }
      },
      async getMatchedRequests() {
        this.isLoading = true;
        this.error = null;
        try {
          if (!this.rideInvitation.invitationID) {
            throw new Error("缺少拼车邀请ID");
          }
          const response = await uni.request({
            url: `http://10.0.2.2:8083/carsharing/matched-requests?offerId=${this.rideInvitation.invitationID}`,
            method: "GET",
            header: {
              "Content-Type": "application/json"
            }
          });
          formatAppLog("log", "at pages/driver/search-result.vue:258", response.data);
          if (response.data.status === "success") {
            const res = response.data;
            if (res.list_matched && res.list_matched.length > 0) {
              this.listBlockItems = res.list_matched.map((item) => ({
                id: item.id,
                startAt: item.start_at,
                startLoc: item.start_loc,
                endLoc: item.end_loc,
                person: item.person,
                price: item.price,
                offset: item.offset,
                exclusive: item.exclusive,
                highway: item.highway,
                convenientRate: item.convenient_rate
              }));
              this.sortReqests();
            } else {
              this.listBlockItems = [];
            }
          } else {
            throw new Error("请求失败");
          }
        } catch (error) {
          formatAppLog("error", "at pages/driver/search-result.vue:283", "获取匹配订单失败:", error);
          this.error = error.message || "获取匹配订单失败";
          uni.showToast({
            title: this.error,
            icon: "none"
          });
        } finally {
          this.isLoading = false;
        }
      },
      sortChange(e) {
        this.sortIndex = e.detail.value;
        this.sortReqests();
      },
      sortReqests() {
        const sortType = this.sortOptions[this.sortIndex];
        let sortedList = [...this.listBlockItems];
        switch (sortType) {
          case "按时间排序":
            sortedList.sort((a, b) => new Date(a.startAt) - new Date(b.startAt));
            break;
          case "按顺路度由高到低排序":
            sortedList.sort((a, b) => b.convenientRate - a.convenientRate);
            break;
          case "按价格由低到高排序":
            sortedList.sort((a, b) => a.price - b.price);
            break;
          case "按价格由高到低排序":
            sortedList.sort((a, b) => b.price - a.price);
            break;
        }
        this.listBlockItems = sortedList;
      },
      toggleFilter(filter) {
        if (filter === "highway") {
          this.highwayFilter = !this.highwayFilter;
        } else if (filter === "exclusive") {
          this.exclusiveFilter = !this.exclusiveFilter;
        } else if (filter === "time") {
          this.timeFilter = !this.timeFilter;
        } else if (filter === "offset") {
          this.offsetFilter = !this.offsetFilter;
        }
      },
      grabbing() {
        uni.showToast({
          title: "功能开发中",
          icon: "none"
        });
      }
    }
  };
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_PageHeader = vue.resolveComponent("PageHeader");
    const _component_MatchedRequestBlock = vue.resolveComponent("MatchedRequestBlock");
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createVNode(_component_PageHeader, {
          backText: "顺路订单",
          backUrl: "/pages/driver/driver_search"
        }),
        vue.createElementVNode("view", { class: "page-container" }, [
          vue.createElementVNode("view", { class: "trip-info" }, [
            vue.createElementVNode("view", { class: "trip-details" }, [
              vue.createElementVNode("view", { class: "route" }, [
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString($data.invitationInfo.start_loc) + " → " + vue.toDisplayString($data.invitationInfo.end_loc),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($options.formatDateTime($data.invitationInfo.start_at)) + " | 可载" + vue.toDisplayString($data.invitationInfo.seats) + "人",
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "buttons" }, [
              vue.createElementVNode("view", { class: "button" }, [
                vue.createElementVNode("image", {
                  src: _imports_0$4,
                  class: "image",
                  onClick: _cache[0] || (_cache[0] = (...args) => $options.grabbing && $options.grabbing(...args))
                }),
                vue.createElementVNode("view", { style: { "font-size": "14px" } }, "自动抢单")
              ]),
              vue.createElementVNode("view", { class: "button" }, [
                vue.createElementVNode("image", {
                  src: _imports_1$1,
                  class: "image",
                  onClick: _cache[1] || (_cache[1] = (...args) => $options.grabbing && $options.grabbing(...args))
                }),
                vue.createElementVNode("view", { style: { "font-size": "14px" } }, "修改行程")
              ]),
              vue.createElementVNode("view", { class: "button" }, [
                vue.createElementVNode("image", {
                  src: _imports_2,
                  class: "image",
                  onClick: _cache[2] || (_cache[2] = (...args) => $options.grabbing && $options.grabbing(...args))
                }),
                vue.createElementVNode("view", { style: { "font-size": "14px" } }, "取消行程")
              ])
            ])
          ]),
          vue.createCommentVNode(" 下拉列表 "),
          vue.createElementVNode("view", { class: "filter-options" }, [
            vue.createElementVNode("picker", {
              onChange: _cache[3] || (_cache[3] = (...args) => $options.sortChange && $options.sortChange(...args)),
              value: $data.sortIndex,
              range: $data.sortOptions,
              class: "button"
            }, [
              vue.createElementVNode(
                "view",
                { class: "picker" },
                vue.toDisplayString($data.sortOptions[$data.sortIndex]),
                1
                /* TEXT */
              ),
              vue.createElementVNode("image", {
                src: _imports_3,
                style: { "padding-top": "4px", "padding-left": "8px", "height": "16px", "width": "16px" }
              })
            ], 40, ["value", "range"])
          ]),
          vue.createCommentVNode(" 筛选条件 "),
          vue.createElementVNode("view", { class: "conditions" }, [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["condition", { active: $data.highwayFilter }]),
                onClick: _cache[4] || (_cache[4] = ($event) => $options.toggleFilter("highway"))
              },
              "愿摊高速费",
              2
              /* CLASS */
            ),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["condition", { active: $data.exclusiveFilter }]),
                onClick: _cache[5] || (_cache[5] = ($event) => $options.toggleFilter("exclusive"))
              },
              "独享",
              2
              /* CLASS */
            ),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["condition", { active: $data.timeFilter }]),
                onClick: _cache[6] || (_cache[6] = ($event) => $options.toggleFilter("time"))
              },
              "前后一小时内",
              2
              /* CLASS */
            ),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["condition", { active: $data.offsetFilter }]),
                onClick: _cache[7] || (_cache[7] = ($event) => $options.toggleFilter("offset"))
              },
              "起点5公里内",
              2
              /* CLASS */
            )
          ]),
          vue.createCommentVNode(" 匹配订单列表 "),
          $options.filteredItems.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($options.filteredItems, (item, index) => {
                return vue.openBlock(), vue.createBlock(_component_MatchedRequestBlock, {
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
            vue.createElementVNode("text", null, "暂时没有与您行程匹配的乘客"),
            vue.createElementVNode("text", null, "已将您的邀请发布"),
            vue.createElementVNode("text", null, "请耐心等待~")
          ]))
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesDriverSearchResult = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$q], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/driver/search-result.vue"]]);
  const _sfc_main$q = {
    data() {
      return {
        statusBarHeight: uni.getSystemInfoSync().statusBarHeight
      };
    },
    methods: {}
  };
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$p], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/index/index.vue"]]);
  const _sfc_main$p = {
    data() {
      return {
        username: "未知用户",
        total_mileage: 0,
        avatar: "/static/default_avatar.png",
        // 默认头像
        statusBarHeight: uni.getSystemInfoSync().statusBarHeight || 0,
        menuItems: [
          { icon: "🕒", text: "我的行程" },
          { icon: "🎟️", text: "优惠券" },
          { icon: "📝", text: "修改个人信息" },
          { icon: "🛡️", text: "账号与安全" },
          { icon: "🎧", text: "联系客服" },
          { icon: "⚙️", text: "设置" }
        ]
      };
    },
    computed: {
      ...mapState(["userID"])
    },
    watch: {
      userID(newVal) {
        if (newVal && newVal !== "未登录用户") {
          this.fetchUserInfo();
        }
      }
    },
    onLoad() {
      if (this.userID && this.userID !== "未登录用户") {
        this.fetchUserInfo();
      }
    },
    methods: {
      fetchUserInfo() {
        uni.request({
          url: `http://10.0.2.2:8083/carsharing/my?userId=${this.userID}`,
          // 修改为你的接口
          method: "GET",
          success: (res) => {
            if (res.data.status === "success" && res.data) {
              formatAppLog("log", "at pages/my/my.vue:66", res);
              this.total_mileage = res.data.userInfo.total_mileage || 0;
              this.avatar = res.data.userInfo.avatar || "/static/c1.pn11g";
              this.username = res.data.userInfo.username;
            } else {
              uni.showToast({ title: "用户信息加载失败", icon: "none" });
            }
          },
          fail: () => {
            uni.showToast({ title: "网络错误", icon: "none" });
          }
        });
      },
      handleMenuClick(index) {
        const pages = [
          "/pages/my/trip",
          "/pages/my/coupon",
          "/pages/my/change/change",
          "/pages/my/account",
          "/pages/my/support",
          "/pages/my/setting"
        ];
        uni.navigateTo({
          url: pages[index]
        });
      }
    }
  };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "mine-page",
        style: vue.normalizeStyle({ paddingTop: $data.statusBarHeight + "px" })
      },
      [
        vue.createCommentVNode(" 用户信息栏 "),
        vue.createElementVNode("view", { class: "profile" }, [
          vue.createElementVNode("image", {
            class: "avatar",
            src: $data.avatar,
            mode: "aspectFill"
          }, null, 8, ["src"]),
          vue.createElementVNode("view", { class: "info" }, [
            vue.createElementVNode(
              "text",
              { class: "username" },
              vue.toDisplayString($data.username),
              1
              /* TEXT */
            ),
            vue.createElementVNode("text", { class: "mileage" }, [
              vue.createTextVNode("里程值 "),
              vue.createElementVNode(
                "text",
                { class: "green" },
                vue.toDisplayString($data.total_mileage),
                1
                /* TEXT */
              ),
              vue.createTextVNode("/60")
            ])
          ])
        ]),
        vue.createCommentVNode(" 菜单项 "),
        vue.createElementVNode("view", { class: "menu-list" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.menuItems, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "menu-item",
                key: index,
                onClick: ($event) => $options.handleMenuClick(index)
              }, [
                vue.createElementVNode("view", { class: "left" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "icon" },
                    vue.toDisplayString(item.icon),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "text" },
                    vue.toDisplayString(item.text),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("text", { class: "arrow" }, "›")
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ],
      4
      /* STYLE */
    );
  }
  const PagesMyMy = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$o], ["__scopeId", "data-v-2f1ef635"], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/my/my.vue"]]);
  const _sfc_main$o = {
    name: "PageHeader_cover",
    props: {
      backText: {
        type: String,
        default: "返回"
      },
      backUrl: {
        type: String,
        default: "/pages/customer/customer"
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
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("cover-view", { class: "floating-buttons" }, [
      vue.createElementVNode("cover-view", { class: "header" }, [
        vue.createElementVNode("cover-view", {
          class: "back-btn",
          onClick: _cache[2] || (_cache[2] = (...args) => $options.handleBack && $options.handleBack(...args))
        }, [
          vue.createElementVNode("cover-image", {
            src: _imports_0$5,
            onClick: _cache[0] || (_cache[0] = (...args) => $options.handleBack && $options.handleBack(...args))
          }),
          vue.createElementVNode(
            "cover-view",
            {
              class: "back-text",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.handleBack && $options.handleBack(...args))
            },
            vue.toDisplayString($props.backText),
            1
            /* TEXT */
          )
        ])
      ])
    ]);
  }
  const ComponentsPageHeaderCover = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$n], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/components/PageHeader_cover.vue"]]);
  const _sfc_main$n = {
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
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["__scopeId", "data-v-5c8fbdf3"], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/uni_modules/uni-rate/components/uni-rate/uni-rate.vue"]]);
  const _sfc_main$m = {
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
    computed: {
      ...mapState(["rideRequest", "userID"])
      // 获取Vuex中的rideRequest
    },
    methods: {
      ...mapActions(["setOrderId"]),
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
        try {
          this.isPressed = true;
          const orderData = {
            offerId: this.item.id,
            // 拼车邀请的id
            requestId: this.$store.state.rideRequest.requestID,
            // 拼车需求的id
            price: this.item.price,
            // 订单费用
            passengerId: this.userID
          };
          const response = await uni.request({
            url: `http://10.0.2.2:8083/carsharing/create-order`,
            method: "POST",
            data: orderData,
            header: {
              "Content-Type": "application/json"
            }
          });
          if (response.data.status === "success") {
            const orderId = response.data.Id;
            this.setOrderId(orderId);
            uni.showToast({
              title: "订单创建成功",
              icon: "success"
            });
            uni.navigateTo({
              url: "/pages/customer/OrderDetail",
              animationType: "slide-in-right",
              animationDuration: 300
            });
          } else {
            throw new Error(response.data.message || "订单创建失败");
          }
        } catch (error) {
          formatAppLog("error", "at components/ListBlock.vue:154", "创建订单失败:", error);
          uni.showToast({
            title: error.message || "创建订单失败",
            icon: "none"
          });
        } finally {
          this.isPressed = false;
        }
      }
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
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
              vue.toDisplayString($options.formatCarPlate($props.item.verificationCarPlate)),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "car_info" }, [
            vue.createElementVNode(
              "text",
              { style: { "margin-right": "5px" } },
              vue.toDisplayString($props.item.verificationColor),
              1
              /* TEXT */
            ),
            vue.createElementVNode("text", null, "|"),
            vue.createElementVNode(
              "text",
              { style: { "margin-left": "5px" } },
              vue.toDisplayString($props.item.verificationCarModel),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "driver_info" }, [
            vue.createElementVNode(
              "text",
              { style: { "margin-right": "8px", "color": "black" } },
              vue.toDisplayString($props.item.realName),
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
        vue.createElementVNode("text", {
          class: vue.normalizeClass(["abutton", { "active": $data.isPressed }]),
          onClick: _cache[0] || (_cache[0] = (...args) => $options.createOrder && $options.createOrder(...args)),
          disabled: $data.isPressed,
          onTouchstart: _cache[1] || (_cache[1] = ($event) => $data.isPressed = true),
          onTouchend: _cache[2] || (_cache[2] = ($event) => $data.isPressed = false)
        }, " 选择 ", 42, ["disabled"])
      ])
    ]);
  }
  const ComponentsListBlock = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/components/ListBlock.vue"]]);
  const _sfc_main$l = {
    components: {
      PageHeader: ComponentsPageHeader,
      ListBlock: ComponentsListBlock
    },
    data() {
      return {
        listBlockItems: [
          // {
          // 	startAt: '2023-05-15 08:30',
          // 	startLoc: '北京市海淀区中关村',
          // 	endLoc: '北京市朝阳区国贸',
          // 	seats: 3,
          // 	realName: '张师傅',
          // 	verificationCarPlate: '京A12345',
          // 	price: 45.00,
          // 	offset:1.2,
          // 	avatar: '/static/logo.png',
          // 	verificationColor:'黑色',
          // 	verificationCarModel:'奥迪A6',
          // 	rating:4.3,
          // },
          // {
          // 	startAt: '2023-05-15 09:15',
          // 	startLoc: '北京市海淀区五道口',
          // 	endLoc: '北京市西城区金融街',
          // 	seats: 2,
          // 	realName: '李师傅',
          // 	verificationCarPlate: '京B67890',
          // 	price: 35.50,
          // 	offset:3.2,
          // 	avatar: '/static/logo.png',
          // 	verificationColor:'白色',
          // 	verificationCarModel:'本田雅阁',
          // 	rating:5.0,
          // },
        ],
        isLoading: false,
        error: null
      };
    },
    computed: {
      ...mapState(["rideRequest"])
    },
    mounted() {
      this.getMatchedOrders();
    },
    methods: {
      // 获取匹配订单
      // getMatchedOrders() {
      // 	uni.request({
      // 		url: '/matched-orders',              // 需替换为实际API地址
      // 		method: 'GET',
      // 		success: (res) => {
      // 			if (res.statusCode === 200) {
      // 				this.listBlockItems = res.data.list_matched.map(item => ({
      // 					startAt: item.start_at,
      // 					startLoc: item.start_loc,
      // 					endLoc: item.end_loc,
      // 					seats: item.seats,
      // 					realName: item.real_name,
      // 					verificationCarPlate: item.verification_car_plate,
      // 					price: item.price,
      // 					offset:item.offset,
      // 					avatar: item.avatar || '/static/logo.png' ,// 后端返回的头像路径
      // 					verificationColor:item.verification_color,
      // 					verificationCarModel:item.verification_car_model,
      // 					rating:item.rating,
      // 				}));
      // 			} else {
      // 				__f__('error','at pages/customer/InvitationMatch.vue:91','请求失败:', res);
      // 			}
      // 		},
      // 		fail: (err) => {
      // 			__f__('error','at pages/customer/InvitationMatch.vue:95','网络请求失败:', err);		
      // 		}
      // 	});
      // },
      async getMatchedOrders() {
        this.isLoading = true;
        this.error = null;
        try {
          if (!this.rideRequest.requestID) {
            throw new Error("缺少拼车需求ID");
          }
          const response = await uni.request({
            url: `http://10.0.2.2:8083/carsharing/matched-orders`,
            // 替换为实际后端路径
            method: "GET",
            data: {
              request_id: this.rideRequest.requestID
              // 传递当前拼车需求的ID
            },
            header: {
              "Content-Type": "application/json"
            }
          });
          if (response.data.status === "success") {
            const res = response.data;
            if (res.matched_orders && res.matched_orders.length > 0) {
              this.listBlockItems = res.matched_orders.map((item) => ({
                id: item.id,
                // 拼车邀请的id
                startAt: item.start_at,
                startLoc: item.start_loc,
                endLoc: item.end_loc,
                seats: item.seats,
                realName: item.real_name,
                verificationCarPlate: item.verification_car_plate,
                price: item.price,
                offset: item.offset,
                avatar: item.avatar || "/static/logo.png",
                verificationColor: item.verification_color,
                verificationCarModel: item.verification_car_model,
                rating: item.rating
              }));
            } else {
              this.listBlockItems = [];
            }
          } else {
            throw new Error("请求失败");
          }
        } catch (error) {
          formatAppLog("error", "at pages/customer/InvitationMatch.vue:146", "获取匹配订单失败:", error);
          this.error = error.message || "获取匹配订单失败";
          uni.showToast({
            title: this.error,
            icon: "none"
          });
        } finally {
          this.isLoading = false;
        }
      }
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_PageHeader = vue.resolveComponent("PageHeader");
    const _component_ListBlock = vue.resolveComponent("ListBlock");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_PageHeader, {
        backText: "行程匹配的私家车邀请",
        backUrl: "/pages/customer/customer_new"
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
  const PagesCustomerInvitationMatch = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/customer/InvitationMatch.vue"]]);
  const _imports_0$3 = "/static/right-arrow-blue.png";
  const _sfc_main$k = {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    name: "RequestBlock",
    data() {
      return {
        isLoading: false,
        error: null
      };
    },
    methods: {
      ...mapActions([
        "setCurrentChangeRequestId"
      ]),
      formatDateTime,
      async deleteRequest() {
        uni.showModal({
          title: "确认删除",
          content: "确定要删除此拼车需求吗？",
          confirmText: "确定",
          cancelText: "取消",
          success: async (res) => {
            if (res.confirm) {
              this.isLoading = true;
              this.error = null;
              try {
                const response = await uni.request({
                  url: `http://10.0.2.2:8083/carsharing/delete-request?id=${this.item.id}`,
                  method: "DELETE",
                  header: {
                    "Content-Type": "application/json"
                  }
                });
                if (response.data.status === "success") {
                  uni.showToast({
                    title: "删除成功",
                    icon: "success",
                    duration: 2e3
                  });
                  this.$emit("request-deleted", this.item.id);
                } else {
                  throw new Error(response.data.message || "删除请求失败");
                }
              } catch (error) {
                formatAppLog("error", "at components/RequestBlock.vue:95", "删除请求失败:", error);
                this.error = error.message || "删除请求失败";
                uni.showToast({
                  title: this.error,
                  icon: "none",
                  duration: 2e3
                });
              } finally {
                this.isLoading = false;
              }
            }
          }
        });
      },
      goToEdit(id) {
        uni.navigateTo({
          url: "/pages/customer/OrderModify",
          animationType: "slide-in-right",
          huntingDuration: 300
        });
      },
      editRequest() {
        this.setCurrentChangeRequestId(this.item.id);
        this.goToEdit(this.item.id);
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
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
          $props.item.status === "PENDING" || $props.item.status === "MATCHED" ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "edit-btn"
          }, [
            vue.createElementVNode("text", {
              class: "delete-text",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.deleteRequest && $options.deleteRequest(...args))
            }, "删除"),
            vue.createElementVNode("text", { class: "edit-text" }, "修改"),
            vue.createElementVNode("image", {
              src: _imports_0$3,
              class: "right-arrow",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.editRequest && $options.editRequest(...args))
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
            vue.toDisplayString($props.item.status === "PENDING" ? "待接单" : $props.item.status === "ONGOING" ? "进行中" : $props.item.status === "COMPLETED" ? "已完成" : $props.item.status === "CANCELLED" ? "已取消" : ""),
            3
            /* TEXT, CLASS */
          )
        ])
      ])
    ]);
  }
  const ComponentsRequestBlock = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/components/RequestBlock.vue"]]);
  const _sfc_main$j = {
    components: {
      PageHeader: ComponentsPageHeader,
      RequestBlock: ComponentsRequestBlock
    },
    data() {
      return {
        requestnumber: 0,
        RequestBlockItems: [],
        isLoading: false,
        error: null
      };
    },
    onShow() {
      this.getRequests();
    },
    computed: {
      ...mapState(["userID", "rideRequest", "current_change_request_id"])
    },
    methods: {
      async getRequests() {
        this.isLoading = true;
        this.error = null;
        try {
          const response = await uni.request({
            url: `http://10.0.2.2:8083/carsharing/get-requests?userId=${this.userID}`,
            method: "GET",
            header: {
              "Content-Type": "application/json"
            }
          });
          if (response.data.status === "success") {
            const res = response.data.history;
            if (res && res.length > 0) {
              this.RequestBlockItems = res.map((item) => ({
                startAt: item.startAt || "未知时间",
                startLoc: item.startLoc || "未知位置",
                endLoc: item.endLoc || "未知位置",
                status: item.status || "未知状态",
                id: item.id
              }));
              this.requestnumber = res.length;
            } else {
              this.RequestBlockItems = [];
              this.requestnumber = 0;
            }
          } else {
            throw new Error(response.data.message || "获取请求列表失败");
          }
        } catch (error) {
          formatAppLog("error", "at pages/customer/RequestList.vue:74", "获取请求列表失败:", error);
          this.error = error.message || "获取请求列表失败";
          this.RequestBlockItems = [];
          this.requestnumber = 0;
          uni.showToast({
            title: this.error,
            icon: "none"
          });
        } finally {
          this.isLoading = false;
        }
      },
      handleRequestDeleted(id) {
        this.getRequests();
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
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
              item,
              onRequestDeleted: $options.handleRequestDeleted
            }, null, 8, ["item", "onRequestDeleted"]);
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
  const PagesCustomerRequestList = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/customer/RequestList.vue"]]);
  const _sfc_main$i = {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    name: "TripList",
    methods: {
      formatDateTime
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "block" }, [
        vue.createElementVNode("view", { class: "left" }, [
          vue.createCommentVNode(" 出发时间 "),
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
          vue.createElementVNode("view", { class: "location-row" }, [
            vue.createCommentVNode(" 起止地点和虚线 "),
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
              vue.createElementVNode("view", { class: "dashed-line" }),
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
          ])
        ]),
        vue.createCommentVNode(" 状态标签 "),
        vue.createElementVNode("view", { class: "right" }, [
          vue.createElementVNode(
            "text",
            {
              class: vue.normalizeClass(["status-text", "status-" + $props.item.status])
            },
            vue.toDisplayString($props.item.status === "ONGOING" ? "进行中" : $props.item.status === "COMPLETED" ? "已完成" : $props.item.status === "CANCELLED" ? "已取消" : ""),
            3
            /* TEXT, CLASS */
          )
        ]),
        vue.createCommentVNode(" 金额显示在右边且垂直居中 "),
        vue.createElementVNode("text", { class: "amount-on-right" }, [
          vue.createElementVNode(
            "text",
            { class: "price-number" },
            vue.toDisplayString($props.item.price.toFixed(2)),
            1
            /* TEXT */
          ),
          vue.createElementVNode("text", { class: "price-unit" }, "元")
        ]),
        vue.createCommentVNode(" 手机尾号独立一行，放置在block底部 "),
        vue.createElementVNode("view", { class: "phone-section" }, [
          vue.createElementVNode(
            "text",
            { class: "phone-text" },
            "尾号 " + vue.toDisplayString($props.item.phone.slice(-4)),
            1
            /* TEXT */
          ),
          vue.createVNode(_component_uni_icons, {
            type: "phone",
            size: "18",
            color: "var(--color-blue)",
            class: "phone-icon"
          })
        ])
      ])
    ]);
  }
  const ComponentsTripList = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/components/TripList.vue"]]);
  const _sfc_main$h = {
    components: {
      PageHeader: ComponentsPageHeader,
      TripList: ComponentsTripList
    },
    data() {
      return {
        requestnumber: 0,
        tripListItems: [
          {
            startAt: "2024-04-22 14:30",
            startLoc: "北京市海淀区",
            endLoc: "北京市朝阳区",
            status: "ONGOING",
            phone: "13812345678",
            price: 20
          },
          {
            startAt: "2024-04-22 14:30",
            startLoc: "北京市海淀区",
            endLoc: "北京市朝阳区",
            status: "CANCELLED",
            phone: "13812345678",
            price: 20.79
          }
        ]
      };
    },
    onLoad() {
      this.getRequests();
    },
    methods: {
      async getRequests() {
        this.isLoading = true;
        this.error = null;
        try {
          formatAppLog("log", "at pages/driver/driverTripList.vue:57", 2);
          const response = await uni.request({
            //url: `http://10.0.2.2:8083/carsharing/get-driver-trip-list?userId=${this.userID}`,
            url: `http://10.0.2.2:8083/carsharing/get-driver-trip-list?userId=2`,
            // 直接拼接参数
            method: "GET",
            header: {
              "Content-Type": "application/json"
            }
          });
          formatAppLog("log", "at pages/driver/driverTripList.vue:72", response);
          if (response.data.status === "success") {
            const res = response.data.history;
            formatAppLog("log", "at pages/driver/driverTripList.vue:76", res);
            if (res && res.length > 0) {
              this.tripListItems = res.map((item) => ({
                startAt: item.startAt || "未知时间",
                startLoc: item.startLoc || ["未知位置"],
                endLoc: item.endLoc || ["未知位置"],
                status: item.status || "未知状态",
                phone: item.phone || "xxxx",
                price: item.price || 0
              }));
              this.requestnumber = res.length;
            } else {
              this.tripListItems = [];
              this.requestnumber = 0;
            }
          } else {
            throw new Error(response.data.message || "获取请求列表失败");
          }
        } catch (error) {
          formatAppLog("error", "at pages/driver/driverTripList.vue:95", "获取请求列表失败:", error);
          this.error = error.message || "获取请求列表失败";
          this.tripListItems = [];
          this.requestnumber = 0;
          uni.showToast({
            title: this.error,
            icon: "none"
          });
        } finally {
          this.isLoading = false;
        }
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_PageHeader = vue.resolveComponent("PageHeader");
    const _component_TripList = vue.resolveComponent("TripList");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_PageHeader, {
        backText: "我的行程",
        backUrl: "/pages/driver/driver_search"
      }),
      $data.tripListItems.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.tripListItems, (item, index) => {
            return vue.openBlock(), vue.createBlock(_component_TripList, {
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
        vue.createElementVNode("text", null, "您暂时还没有过行程哦")
      ]))
    ]);
  }
  const PagesDriverDriverTripList = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/driver/driverTripList.vue"]]);
  const _sfc_main$g = {
    components: {
      PageHeader: ComponentsPageHeader,
      TripList: ComponentsTripList
    },
    data() {
      return {
        tripListItems: [
          {
            startAt: this.todayAt("10:00"),
            startLoc: "同济大学（嘉定校区）",
            endLoc: "静安嘉里中心",
            status: "ONGOING",
            phone: "13900000001",
            price: 0
          },
          {
            startAt: "2024-06-24 10:00",
            startLoc: "同济大学（嘉定校区）",
            endLoc: "静安嘉里中心",
            status: "ONGOING",
            phone: "13900000002",
            price: 0
          },
          {
            startAt: "2024-06-24 10:00",
            startLoc: "同济大学（嘉定校区）",
            endLoc: "静安嘉里中心",
            status: "ONGOING",
            phone: "13900000003",
            price: 0
          }
        ]
      };
    },
    methods: {
      todayAt(timeStr) {
        const today = /* @__PURE__ */ new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd} ${timeStr}`;
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_PageHeader = vue.resolveComponent("PageHeader");
    const _component_TripList = vue.resolveComponent("TripList");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_PageHeader, {
        backText: "我的拼车邀请",
        backUrl: "/pages/driver/driver_search"
      }),
      $data.tripListItems.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.tripListItems, (item, index) => {
            return vue.openBlock(), vue.createBlock(_component_TripList, {
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
        vue.createElementVNode("text", null, "您暂时还没有拼车邀请哦")
      ]))
    ]);
  }
  const PagesDriverInvitations = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-d5f23abd"], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/driver/invitations.vue"]]);
  const _imports_0$2 = "/static/launch/welcome0.png";
  const _imports_1 = "/static/launch/welcome1.png";
  const _sfc_main$f = {
    methods: {
      goToExperience() {
        uni.reLaunch({
          url: "/pages/my/login/passwordLogin"
          // 你想跳转的主页面
        });
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesIndexWelcome = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-c7aac77f"], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/index/welcome.vue"]]);
  const _sfc_main$e = {
    data() {
      return {
        statusBarHeight: uni.getSystemInfoSync().statusBarHeight || 0,
        phone: "",
        code: "",
        isCounting: false,
        countdown: 60
      };
    },
    computed: {
      codeBtnText() {
        return this.isCounting ? `${this.countdown}s后重新获取` : "获取验证码";
      }
    },
    methods: {
      async getCode() {
        if (!this.validatePhone()) {
          uni.showToast({ title: "请输入有效手机号", icon: "none" });
          return;
        }
        this.isCounting = true;
        const timer = setInterval(() => {
          if (this.countdown <= 0) {
            clearInterval(timer);
            this.isCounting = false;
            this.countdown = 60;
            return;
          }
          this.countdown--;
        }, 1e3);
        try {
          const res = await uni.request({
            url: "/api/sendCode",
            method: "POST",
            data: { phone: this.phone }
          });
          uni.showToast({ title: "验证码已发送" });
        } catch (error) {
          uni.showToast({ title: "验证码已发送", icon: "none" });
        }
      },
      validatePhone() {
        return /^1[3-9]\d{9}$/.test(this.phone);
      },
      handleLogin() {
        if (!this.validatePhone() || !this.code) {
          uni.showToast({ title: "请填写完整信息", icon: "none" });
          return;
        }
        uni.switchTab({
          url: "/pages/my/my"
        });
      },
      navigateTo(url) {
        uni.navigateTo({ url });
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "container",
        style: vue.normalizeStyle({ paddingTop: $data.statusBarHeight + "px" })
      },
      [
        vue.createElementVNode("view", { class: "login-content" }, [
          vue.createElementVNode("view", { class: "title" }, "验证码登录"),
          vue.createElementVNode("view", { class: "input-group" }, [
            vue.createElementVNode("view", { class: "input-item" }, [
              vue.createElementVNode("text", { class: "prefix" }, "+86"),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.phone = $event),
                  type: "number",
                  placeholder: "请输入手机号码",
                  maxlength: "11",
                  class: "input"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.phone]
              ])
            ]),
            vue.createElementVNode("view", { class: "input-item" }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.code = $event),
                  type: "number",
                  placeholder: "请输入验证码",
                  maxlength: "6",
                  class: "input"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.code]
              ]),
              vue.createElementVNode("button", {
                class: vue.normalizeClass(["code-btn", $data.isCounting ? "disabled" : ""]),
                disabled: $data.isCounting,
                onClick: _cache[2] || (_cache[2] = (...args) => $options.getCode && $options.getCode(...args))
              }, vue.toDisplayString($options.codeBtnText), 11, ["disabled"])
            ])
          ]),
          vue.createElementVNode("button", {
            class: "login-btn",
            onClick: _cache[3] || (_cache[3] = (...args) => $options.handleLogin && $options.handleLogin(...args))
          }, "登录"),
          vue.createElementVNode("view", { class: "links" }, [
            vue.createElementVNode("text", {
              onClick: _cache[4] || (_cache[4] = ($event) => $options.navigateTo("/pages/my/login/passwordLogin"))
            }, "密码登录"),
            vue.createElementVNode("text", {
              onClick: _cache[5] || (_cache[5] = ($event) => $options.navigateTo("/pages/my/login/forget"))
            }, "忘记密码")
          ]),
          vue.createCommentVNode(" 添加底部容器 "),
          vue.createElementVNode("view", { class: "bottom-container" }, [
            vue.createElementVNode("view", { class: "footer" }, [
              vue.createElementVNode("text", null, "还没有账户？"),
              vue.createElementVNode("text", {
                class: "register",
                onClick: _cache[6] || (_cache[6] = ($event) => $options.navigateTo("/pages/my/login/register"))
              }, "立即注册")
            ]),
            vue.createElementVNode("view", { class: "agreement" }, [
              vue.createTextVNode(" 登录即同意 "),
              vue.createElementVNode("text", {
                class: "link",
                onClick: _cache[7] || (_cache[7] = ($event) => $options.navigateTo("/pages/agreement/user"))
              }, "《用户协议》"),
              vue.createTextVNode(" 和 "),
              vue.createElementVNode("text", {
                class: "link",
                onClick: _cache[8] || (_cache[8] = ($event) => $options.navigateTo("/pages/agreement/privacy"))
              }, "《隐私政策》")
            ])
          ])
        ])
      ],
      4
      /* STYLE */
    );
  }
  const PagesMyLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-dd394eb5"], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/my/login/login.vue"]]);
  const _sfc_main$d = {
    data() {
      return {
        statusBarHeight: uni.getSystemInfoSync().statusBarHeight || 0,
        phone: "",
        code: "",
        newPassword: "",
        confirmPassword: "",
        isCounting: false,
        countdown: 60,
        showPassword: false,
        showConfirmPassword: false
      };
    },
    computed: {
      codeBtnText() {
        return this.isCounting ? `${this.countdown}s后重新获取` : "获取验证码";
      }
    },
    methods: {
      async getCode() {
        if (!this.validatePhone()) {
          uni.showToast({ title: "请输入有效手机号", icon: "none" });
          return;
        }
        this.isCounting = true;
        const timer = setInterval(() => {
          if (this.countdown <= 0) {
            clearInterval(timer);
            this.isCounting = false;
            this.countdown = 60;
            return;
          }
          this.countdown--;
        }, 1e3);
        try {
          const res = await uni.request({
            url: "/api/sendCode",
            method: "POST",
            data: { phone: this.phone }
          });
          uni.showToast({ title: "验证码已发送" });
        } catch (error) {
          uni.showToast({ title: "验证码已发送", icon: "none" });
        }
      },
      // 密码可见切换
      togglePassword() {
        this.showPassword = !this.showPassword;
      },
      toggleConfirmPassword() {
        this.showConfirmPassword = !this.showConfirmPassword;
      },
      // 验证手机号格式
      validatePhone() {
        return /^1[3-9]\d{9}$/.test(this.phone);
      },
      // 验证密码强度
      validatePassword() {
        const reg = /^(?=.*[A-Za-z])(?=.*\d).{8,20}$/;
        if (!reg.test(this.newPassword)) {
          uni.showToast({ title: "需包含字母和数字（8-20位）", icon: "none" });
          return false;
        }
        if (this.newPassword !== this.confirmPassword) {
          uni.showToast({ title: "两次密码输入不一致", icon: "none" });
          return false;
        }
        return true;
      },
      async handleForget() {
        if (!this.validatePhone()) {
          uni.showToast({ title: "手机号格式错误", icon: "none" });
          return;
        }
        if (this.code.length < 4) {
          uni.showToast({ title: "验证码至少4位", icon: "none" });
          return;
        }
        if (!this.validatePassword())
          return;
        uni.showLoading({ title: "修改中..." });
        try {
          const res = await uni.request({
            url: "http://10.0.2.2:8083/carsharing/forget",
            method: "POST",
            data: {
              phone: this.phone,
              // 用户手机号
              password: this.newPassword
              // 用户密码
            }
          });
          if (res.data.status === "success") {
            uni.showToast({ title: "修改成功", icon: "success" });
            setTimeout(() => {
              uni.navigateTo({
                url: "/pages/my/login/passwordLogin"
              });
            }, 1500);
          } else {
            uni.showToast({ title: "修改失败，请重试", icon: "none" });
          }
        } catch (error) {
          uni.showToast({ title: "修改失败，请重试", icon: "none" });
        } finally {
          uni.hideLoading();
        }
      },
      navigateTo(url) {
        uni.navigateTo({ url });
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "container",
        style: vue.normalizeStyle({ paddingTop: $data.statusBarHeight + "px" })
      },
      [
        vue.createElementVNode("view", { class: "login-content" }, [
          vue.createCommentVNode(" 标题 "),
          vue.createElementVNode("view", { class: "title" }, "忘记密码"),
          vue.createCommentVNode(" 手机号输入 "),
          vue.createElementVNode("view", { class: "input-item" }, [
            vue.createElementVNode("text", { class: "prefix" }, "+86"),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.phone = $event),
                type: "number",
                placeholder: "请输入手机号码",
                maxlength: "11",
                class: "input",
                onInput: _cache[1] || (_cache[1] = (...args) => $options.validatePhone && $options.validatePhone(...args))
              },
              null,
              544
              /* NEED_HYDRATION, NEED_PATCH */
            ), [
              [vue.vModelText, $data.phone]
            ])
          ]),
          vue.createCommentVNode(" 验证码输入 "),
          vue.createElementVNode("view", { class: "input-item" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.code = $event),
                type: "number",
                placeholder: "请输入验证码",
                maxlength: "6",
                class: "input"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.code]
            ]),
            vue.createElementVNode("button", {
              class: vue.normalizeClass(["code-btn", $data.isCounting ? "disabled" : ""]),
              disabled: $data.isCounting,
              onClick: _cache[3] || (_cache[3] = (...args) => $options.getCode && $options.getCode(...args))
            }, vue.toDisplayString($options.codeBtnText), 11, ["disabled"])
          ]),
          vue.createCommentVNode(" 新增密码输入部分 "),
          vue.createElementVNode("view", { class: "input-item" }, [
            vue.withDirectives(vue.createElementVNode("input", {
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.newPassword = $event),
              type: $data.showPassword ? "text" : "password",
              placeholder: "请输入新密码（8-20位字母+数字）",
              class: "input",
              maxlength: "20"
            }, null, 8, ["type"]), [
              [vue.vModelDynamic, $data.newPassword]
            ]),
            vue.createElementVNode(
              "text",
              {
                class: vue.normalizeClass(["iconfont", $data.showPassword ? "icon-eye" : "icon-eye-close"]),
                onClick: _cache[5] || (_cache[5] = (...args) => $options.togglePassword && $options.togglePassword(...args))
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createElementVNode("view", { class: "input-item" }, [
            vue.withDirectives(vue.createElementVNode("input", {
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.confirmPassword = $event),
              type: $data.showConfirmPassword ? "text" : "password",
              placeholder: "请确认新密码",
              class: "input",
              maxlength: "20"
            }, null, 8, ["type"]), [
              [vue.vModelDynamic, $data.confirmPassword]
            ]),
            vue.createElementVNode(
              "text",
              {
                class: vue.normalizeClass(["iconfont", $data.showConfirmPassword ? "icon-eye" : "icon-eye-close"]),
                onClick: _cache[7] || (_cache[7] = (...args) => $options.toggleConfirmPassword && $options.toggleConfirmPassword(...args))
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createCommentVNode(" 确认按钮 "),
          vue.createElementVNode("button", {
            class: "confirm-btn",
            onClick: _cache[8] || (_cache[8] = (...args) => $options.handleForget && $options.handleForget(...args))
          }, "确认"),
          vue.createElementVNode("view", { class: "links" }, [
            vue.createElementVNode("text", {
              onClick: _cache[9] || (_cache[9] = ($event) => $options.navigateTo("/pages/my/login/login"))
            }, "验证码登录"),
            vue.createElementVNode("text", {
              onClick: _cache[10] || (_cache[10] = ($event) => $options.navigateTo("/pages/my/login/passwordLogin"))
            }, "密码登录")
          ]),
          vue.createCommentVNode(" 添加底部容器 "),
          vue.createElementVNode("view", { class: "bottom-container" }, [
            vue.createElementVNode("view", { class: "agreement" }, [
              vue.createTextVNode(" 登录即同意 "),
              vue.createElementVNode("text", {
                class: "link",
                onClick: _cache[11] || (_cache[11] = ($event) => $options.navigateTo("/pages/agreement/user"))
              }, "《用户协议》"),
              vue.createTextVNode(" 和 "),
              vue.createElementVNode("text", {
                class: "link",
                onClick: _cache[12] || (_cache[12] = ($event) => $options.navigateTo("/pages/agreement/privacy"))
              }, "《隐私政策》")
            ])
          ])
        ])
      ],
      4
      /* STYLE */
    );
  }
  const PagesMyLoginForget = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-4a450a78"], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/my/login/forget.vue"]]);
  const _sfc_main$c = {
    data() {
      return {
        phone: "",
        code: "",
        newPassword: "",
        confirmPassword: "",
        isCounting: false,
        countdown: 60,
        showPassword: false,
        showConfirmPassword: false
      };
    },
    computed: {
      codeBtnText() {
        return this.isCounting ? `${this.countdown}s后重新获取` : "获取验证码";
      }
    },
    methods: {
      async getCode() {
        if (!this.validatePhone()) {
          uni.showToast({ title: "请输入有效手机号", icon: "none" });
          return;
        }
        this.isCounting = true;
        const timer = setInterval(() => {
          if (this.countdown <= 0) {
            clearInterval(timer);
            this.isCounting = false;
            this.countdown = 60;
            return;
          }
          this.countdown--;
        }, 1e3);
        try {
          const res = await uni.request({
            url: "/api/sendCode",
            method: "POST",
            data: { phone: this.phone }
          });
          uni.showToast({ title: "验证码已发送" });
        } catch (error) {
          uni.showToast({ title: "验证码已发送", icon: "none" });
        }
      },
      // 密码可见切换
      togglePassword() {
        this.showPassword = !this.showPassword;
      },
      toggleConfirmPassword() {
        this.showConfirmPassword = !this.showConfirmPassword;
      },
      // 验证手机号格式
      validatePhone() {
        return /^1[3-9]\d{9}$/.test(this.phone);
      },
      // 验证密码强度
      validatePassword() {
        const reg = /^(?=.*[A-Za-z])(?=.*\d).{8,20}$/;
        if (!reg.test(this.newPassword)) {
          uni.showToast({ title: "需包含字母和数字（8-20位）", icon: "none" });
          return false;
        }
        if (this.newPassword !== this.confirmPassword) {
          uni.showToast({ title: "两次密码输入不一致", icon: "none" });
          return false;
        }
        return true;
      },
      async handleRegister() {
        if (!this.validatePhone()) {
          uni.showToast({ title: "手机号格式错误", icon: "none" });
          return;
        }
        if (this.code.length < 4) {
          uni.showToast({ title: "验证码至少4位", icon: "none" });
          return;
        }
        if (!this.validatePassword())
          return;
        uni.showLoading({ title: "注册中..." });
        try {
          const res = await uni.request({
            url: "http://10.0.2.2:8083/carsharing/register",
            method: "POST",
            data: {
              phone: this.phone,
              // 用户手机号
              password: this.newPassword
              // 用户密码
            }
          });
          if (res.data.status === "success") {
            uni.showToast({ title: "注册成功", icon: "success" });
            setTimeout(() => {
              uni.navigateTo({
                url: "/pages/my/login/passwordLogin"
              });
            }, 1500);
          } else {
            uni.showToast({ title: "注册失败，请重试", icon: "none" });
          }
        } catch (error) {
          uni.showToast({ title: "注册失败，请重试", icon: "none" });
        } finally {
          uni.hideLoading();
        }
      },
      navigateTo(url) {
        uni.navigateTo({ url });
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "container",
        style: vue.normalizeStyle({ paddingTop: _ctx.statusBarHeight + "px" })
      },
      [
        vue.createElementVNode("view", { class: "login-content" }, [
          vue.createCommentVNode(" 标题 "),
          vue.createElementVNode("view", { class: "title" }, "注册账户"),
          vue.createCommentVNode(" 手机号输入 "),
          vue.createElementVNode("view", { class: "input-item" }, [
            vue.createElementVNode("text", { class: "prefix" }, "+86"),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.phone = $event),
                type: "number",
                placeholder: "请输入手机号码",
                maxlength: "11",
                class: "input",
                onInput: _cache[1] || (_cache[1] = (...args) => $options.validatePhone && $options.validatePhone(...args))
              },
              null,
              544
              /* NEED_HYDRATION, NEED_PATCH */
            ), [
              [vue.vModelText, $data.phone]
            ])
          ]),
          vue.createCommentVNode(" 验证码输入 "),
          vue.createElementVNode("view", { class: "input-item" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.code = $event),
                type: "number",
                placeholder: "请输入验证码",
                maxlength: "6",
                class: "input"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.code]
            ]),
            vue.createElementVNode("button", {
              class: vue.normalizeClass(["code-btn", $data.isCounting ? "disabled" : ""]),
              disabled: $data.isCounting,
              onClick: _cache[3] || (_cache[3] = (...args) => $options.getCode && $options.getCode(...args))
            }, vue.toDisplayString($options.codeBtnText), 11, ["disabled"])
          ]),
          vue.createCommentVNode(" 新增密码输入部分 "),
          vue.createElementVNode("view", { class: "input-item" }, [
            vue.withDirectives(vue.createElementVNode("input", {
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.newPassword = $event),
              type: $data.showPassword ? "text" : "password",
              placeholder: "请输入密码（8-20位字母+数字）",
              class: "input",
              maxlength: "20"
            }, null, 8, ["type"]), [
              [vue.vModelDynamic, $data.newPassword]
            ]),
            vue.createElementVNode(
              "text",
              {
                class: vue.normalizeClass(["iconfont", $data.showPassword ? "icon-eye" : "icon-eye-close"]),
                onClick: _cache[5] || (_cache[5] = (...args) => $options.togglePassword && $options.togglePassword(...args))
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createElementVNode("view", { class: "input-item" }, [
            vue.withDirectives(vue.createElementVNode("input", {
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.confirmPassword = $event),
              type: $data.showConfirmPassword ? "text" : "password",
              placeholder: "请确认密码",
              class: "input",
              maxlength: "20"
            }, null, 8, ["type"]), [
              [vue.vModelDynamic, $data.confirmPassword]
            ]),
            vue.createElementVNode(
              "text",
              {
                class: vue.normalizeClass(["iconfont", $data.showConfirmPassword ? "icon-eye" : "icon-eye-close"]),
                onClick: _cache[7] || (_cache[7] = (...args) => $options.toggleConfirmPassword && $options.toggleConfirmPassword(...args))
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createCommentVNode(" 确认按钮 "),
          vue.createElementVNode("button", {
            class: "confirm-btn",
            onClick: _cache[8] || (_cache[8] = (...args) => $options.handleRegister && $options.handleRegister(...args))
          }, "确认"),
          vue.createElementVNode("view", { class: "links" }, [
            vue.createElementVNode("text", {
              onClick: _cache[9] || (_cache[9] = ($event) => $options.navigateTo("/pages/my/login/login"))
            }, "验证码登录"),
            vue.createElementVNode("text", {
              onClick: _cache[10] || (_cache[10] = ($event) => $options.navigateTo("/pages/my/login/passwordLogin"))
            }, "密码登录")
          ]),
          vue.createElementVNode("view", { class: "bottom-container" }, [
            vue.createElementVNode("view", { class: "agreement" }, [
              vue.createTextVNode(" 登录即同意 "),
              vue.createElementVNode("text", {
                class: "link",
                onClick: _cache[11] || (_cache[11] = ($event) => $options.navigateTo("/pages/agreement/user"))
              }, "《用户协议》"),
              vue.createTextVNode(" 和 "),
              vue.createElementVNode("text", {
                class: "link",
                onClick: _cache[12] || (_cache[12] = ($event) => $options.navigateTo("/pages/agreement/privacy"))
              }, "《隐私政策》")
            ])
          ])
        ])
      ],
      4
      /* STYLE */
    );
  }
  const PagesMyLoginRegister = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-013d98be"], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/my/login/register.vue"]]);
  const _sfc_main$b = {
    props: {
      title: String,
      locations: Array,
      start: {
        type: Boolean,
        default: true
        // 默认绿色
      }
    },
    methods: {
      selectLocation(locationName) {
        this.$emit("location-selected", locationName);
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("div", { class: "location-list" }, [
      vue.createElementVNode("view", { class: "title" }, [
        vue.createVNode(_component_uni_icons, {
          type: "list",
          size: "16",
          style: { "margin-right": "10px" }
        }),
        vue.createTextVNode(
          " " + vue.toDisplayString($props.title),
          1
          /* TEXT */
        )
      ]),
      $props.locations.length === 0 ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 0,
        class: "no-record"
      }, " 暂无地址记录 ")) : vue.createCommentVNode("v-if", true),
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($props.locations, (loc, index) => {
          return vue.openBlock(), vue.createElementBlock("div", {
            key: index,
            class: "location",
            onClick: ($event) => $options.selectLocation(loc.name)
          }, [
            vue.createVNode(_component_uni_icons, {
              type: "map-pin-ellipse",
              size: "18",
              color: $props.start ? "var(--color-green)" : "var(--color-orange)",
              style: { "margin-right": "8px" }
            }, null, 8, ["color"]),
            vue.createElementVNode("div", { class: "loc-info" }, [
              vue.createElementVNode(
                "span",
                { class: "loc-name" },
                vue.toDisplayString(loc.name),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "span",
                { class: "loc-address" },
                vue.toDisplayString(loc.address),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode(
              "span",
              { class: "distance" },
              vue.toDisplayString(loc.distance) + " km",
              1
              /* TEXT */
            )
          ], 8, ["onClick"]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const LocationList = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-ba39095f"], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/components/LocationList.vue"]]);
  const _sfc_main$a = {
    components: {
      LocationList,
      PageHeader: ComponentsPageHeader
    },
    computed: {
      ...mapState(["userID", "rideRequest", "current_change_request_id"])
    },
    data() {
      return {
        homeAddress: null,
        companyAddress: null,
        start_loc: "",
        history: [],
        suggestions: [],
        showSuggestions: false,
        // ak: 'qUvnqoxw0awJluKPaBmcvUam4wQYOHF7',
        // ak:'EtqTJ1MT40bg44IsZf2fFe2eJmCD2l2e',
        // ak: 'b2gVyjseS5Wx4a1STxi6PDdNRGWakAP9',
        ak: "YylCDEyDLCtKCqASXVz7mXtoXLTHsn6D",
        hot_start_loc: []
      };
    },
    onLoad() {
      this.fetchAddresses();
      this.fetchHistory();
      this.fetchHot();
      if (this.current_change_request_id == this.rideRequest.requestID) {
        if (this.rideRequest.startLoc) {
          this.start_loc = this.rideRequest.startLoc;
        }
      }
    },
    methods: {
      showNoAddressToast() {
        uni.showToast({
          title: "当前未设置",
          icon: "none",
          duration: 2e3
        });
      },
      clearInput() {
        this.start_loc = "";
        this.suggestions = [];
        this.showSuggestions = false;
      },
      async fetchAddresses() {
        try {
          const response = await uni.request({
            url: `http://10.0.2.2:8083/carsharing/get-user-addresses?userId=${this.userID}`,
            // 直接拼接参数
            method: "GET",
            header: {
              "Content-Type": "application/json"
            }
          });
          this.homeAddress = response.data.homeAddress;
          this.companyAddress = response.data.companyAddress;
        } catch (error) {
          formatAppLog("error", "at pages/customer/StartLoc.vue:141", "获取地址失败:", error);
        }
      },
      setHomeCompanyStartLocation(type) {
        if (type === "home" && this.homeAddress) {
          this.start_loc = this.homeAddress;
          this.setStartLoc(this.start_loc);
          uni.navigateBack({
            delta: 1
            // 返回上一页
          });
        } else if (type === "company" && this.companyAddress) {
          this.start_loc = this.companyAddress;
          this.setStartLoc(this.start_loc);
          uni.navigateBack({
            delta: 1
            // 返回上一页
          });
        } else {
          uni.showToast({
            title: `没有${type === "home" ? "家庭" : "公司"}地址`,
            icon: "none"
          });
        }
      },
      navigateToAddressSetting() {
        uni.switchTab({ url: "/pages/my/my" });
      },
      async fetchHistory() {
        try {
          const response = await uni.request({
            url: `http://10.0.2.2:8083/carsharing/get-start-loc-history?userId=${this.userID}`,
            method: "GET",
            header: {
              "Content-Type": "application/json"
            }
          });
          if (response.data.status === "success") {
            let historyNames = [...new Set(response.data.history)].slice(0, 5);
            let records = [];
            for (let i = 0; i < historyNames.length; i++) {
              let name = historyNames[i];
              let { address, lat, lng } = await this.getAddressAndCoordinatesByName(name);
              const currentLocation = await this.getCurrentLocation();
              let distance = await this.calculateDistance(currentLocation[0], currentLocation[1], lat, lng);
              if (address !== "地址获取失败") {
                records.push({
                  name,
                  address,
                  distance
                });
              }
            }
            this.history = records;
          } else {
            formatAppLog("warn", "at pages/customer/StartLoc.vue:205", "没有历史记录");
          }
        } catch (error) {
          formatAppLog("error", "at pages/customer/StartLoc.vue:208", "获取历史记录失败:", error);
        }
      },
      // 根据名称获取详细地址和经纬度
      async getAddressAndCoordinatesByName(name) {
        try {
          const encodedAddress = encodeURIComponent(name);
          const geoResp = await uni.request({
            url: `https://api.map.baidu.com/geocoding/v3/?ak=${this.ak}&address=${encodeURIComponent(name)}&output=json`
          });
          const { lat, lng } = geoResp.data.result.location;
          const reverseResp = await uni.request({
            url: `https://api.map.baidu.com/reverse_geocoding/v3/?ak=${this.ak}&location=${lat},${lng}&output=json`
          });
          const address = reverseResp.data.result.formatted_address;
          return { address, lat, lng };
        } catch (error) {
          formatAppLog("error", "at pages/customer/StartLoc.vue:227", "获取地址和坐标失败:", error);
          return { address: "地址获取失败", lat: 0, lng: 0 };
        }
      },
      async fetchHot() {
        try {
          const response = await uni.request({
            url: `http://10.0.2.2:8083/carsharing/get-start-loc-hot`,
            method: "GET",
            header: {
              "Content-Type": "application/json"
            }
          });
          if (response.data.status === "success") {
            let hotLocNames = [...new Set(response.data.hotLoc)].slice(0, 10);
            let records = [];
            for (let i = 0; i < hotLocNames.length; i++) {
              let name = hotLocNames[i];
              let { address, lat, lng } = await this.getAddressAndCoordinatesByName(name);
              const currentLocation = await this.getCurrentLocation();
              let distance = await this.calculateDistance(currentLocation[0], currentLocation[1], lat, lng);
              if (address !== "地址获取失败") {
                records.push({
                  name,
                  address,
                  distance
                });
              }
            }
            this.hot_start_loc = records;
          } else {
            formatAppLog("warn", "at pages/customer/StartLoc.vue:268", "没有热门出发地");
          }
        } catch (error) {
          formatAppLog("error", "at pages/customer/StartLoc.vue:271", "获取热门出发地失败:", error);
        }
      },
      // 获取当前定位
      getCurrentLocation() {
        return new Promise((resolve) => {
          uni.getLocation({
            type: "wgs84",
            geocode: true,
            success(res) {
              resolve([res.latitude, res.longitude]);
            },
            fail(err) {
              formatAppLog("log", "at pages/customer/StartLoc.vue:284", "定位失败:", err);
              uni.showToast({
                title: "获取当前地址失败，将导致部分功能不可用",
                icon: "none",
                duration: 2e3
              });
              resolve([0, 0]);
            }
          });
        });
      },
      // 计算两点之间的距离（使用 Haversine 公式）
      async calculateDistance(lat1, lng1, lat2, lng2) {
        const toRad = (angle) => angle * (Math.PI / 180);
        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLng = toRad(lng2 - lng1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return parseFloat(distance.toFixed(3));
      },
      async getLocationInfoByName(name) {
        try {
          const target = await this.getAddressAndCoordinatesByName(name);
          const current = await this.getCurrentLocation();
          const distance = await this.calculateDistance(
            current.lat,
            current.lng,
            target.lat,
            target.lng
          );
          return {
            name,
            address: target.address,
            distance: Math.round(distance)
            // 四舍五入到整数公里
          };
        } catch (error) {
          formatAppLog("error", "at pages/customer/StartLoc.vue:330", "处理地点信息失败:", error);
          return {
            name,
            address: "获取失败",
            distance: 0
          };
        }
      },
      ...mapActions(["setStartLoc"]),
      // sendStartLoc(location) {
      // 	__f__('log','at pages/customer/StartLoc.vue:340',location);
      // 	this.setStartLoc(location);
      // 	uni.navigateBack({
      // 	  delta: 1 // 返回上一页
      // 	});
      // },
      sendStartLoc() {
        if (this.start_loc) {
          this.setStartLoc(this.start_loc);
          uni.navigateBack({
            delta: 1
            // 返回上一页
          });
        } else {
          uni.showToast({
            title: "请输入出发地",
            icon: "none",
            duration: 2e3
          });
        }
      },
      handleLocationSelect(location) {
        this.start_loc = location;
        this.sendStartLoc();
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_PageHeader = vue.resolveComponent("PageHeader");
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    const _component_LocationList = vue.resolveComponent("LocationList");
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createVNode(_component_PageHeader, {
          backText: "选择行程起点",
          backUrl: "/pages/customer/customer_new"
        }),
        vue.createElementVNode("div", null, [
          vue.createElementVNode("view", { class: "block input-place" }, [
            vue.createElementVNode("view", { class: "input-wrapper" }, [
              vue.createCommentVNode(" 包裹 start-icon 和 input "),
              vue.createElementVNode("view", { class: "input-container" }, [
                vue.createElementVNode("view", { class: "icon start-icon" }),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.start_loc = $event),
                    placeholder: "您从哪儿出发",
                    class: "start-loc-input",
                    "confirm-type": "done",
                    onConfirm: _cache[1] || (_cache[1] = (...args) => $options.sendStartLoc && $options.sendStartLoc(...args))
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [vue.vModelText, $data.start_loc]
                ])
              ]),
              vue.createVNode(_component_uni_icons, {
                type: "clear",
                size: "20",
                class: "clear-icon",
                onClick: $options.clearInput
              }, null, 8, ["onClick"])
            ]),
            vue.createElementVNode("view", { class: "address" }, [
              vue.createElementVNode("view", {
                class: "address-unit",
                onClick: _cache[3] || (_cache[3] = ($event) => $data.homeAddress ? $options.setHomeCompanyStartLocation("home") : $options.showNoAddressToast())
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "home",
                  size: "24",
                  color: "var(--color-darkgrey)"
                }),
                vue.createElementVNode("view", { class: "address-option" }, [
                  vue.createElementVNode("view", { style: { "display": "flex", "flex-direction": "column", "gap": "2px" } }, [
                    vue.createElementVNode("text", { style: { "font-size": "16px", "font-weight": "bold" } }, "家"),
                    $data.homeAddress ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 0,
                        class: "small-text"
                      },
                      vue.toDisplayString($data.homeAddress),
                      1
                      /* TEXT */
                    )) : (vue.openBlock(), vue.createElementBlock("text", {
                      key: 1,
                      class: "small-text",
                      onClick: _cache[2] || (_cache[2] = ($event) => $options.navigateToAddressSetting())
                    }, "设置家的地址"))
                  ])
                ])
              ]),
              vue.createElementVNode("view", { class: "vertical-divider" }),
              vue.createElementVNode("view", {
                class: "address-unit",
                onClick: _cache[5] || (_cache[5] = ($event) => $data.companyAddress ? $options.setHomeCompanyStartLocation("company") : $options.showNoAddressToast())
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "shop",
                  size: "24",
                  color: "var(--color-darkgrey)"
                }),
                vue.createElementVNode("view", { class: "address-option" }, [
                  vue.createElementVNode("view", { style: { "display": "flex", "flex-direction": "column", "gap": "2px" } }, [
                    vue.createElementVNode("text", { style: { "font-size": "16px", "font-weight": "bold" } }, "公司"),
                    $data.companyAddress ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 0,
                        class: "small-text"
                      },
                      vue.toDisplayString($data.companyAddress),
                      1
                      /* TEXT */
                    )) : (vue.openBlock(), vue.createElementBlock("text", {
                      key: 1,
                      class: "small-text",
                      onClick: _cache[4] || (_cache[4] = ($event) => $options.navigateToAddressSetting())
                    }, "设置公司地址"))
                  ])
                ])
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "block location-list" }, [
            vue.createVNode(_component_LocationList, {
              title: "历史记录",
              locations: $data.history,
              start: true,
              onLocationSelected: $options.handleLocationSelect
            }, null, 8, ["locations", "onLocationSelected"])
          ]),
          vue.createElementVNode("view", { class: "block location-list" }, [
            vue.createVNode(_component_LocationList, {
              title: "热门出发地",
              locations: $data.hot_start_loc,
              start: false,
              onLocationSelected: $options.handleLocationSelect
            }, null, 8, ["locations", "onLocationSelected"])
          ]),
          vue.createCommentVNode(" 建议地址列表 "),
          vue.createCommentVNode(' 		<view\r\n		  v-if="suggestions.length > 0"\r\n		  class="suggestion-list"\r\n		>\r\n		  <view\r\n			v-for="(item, index) in suggestions.slice(0, 7)"\r\n			:key="index"\r\n			class="suggestion-item"\r\n			@click="selectSuggestion(item)"\r\n		  >\r\n			<div class="sug-info">\r\n			  <span class="sug-name">{{ item.name }}</span>\r\n			  <span class="sug-address">{{ item.address }}</span>\r\n			</div>\r\n			<span class="sug-distance">{{ item.distance }} km</span>\r\n		  </view>\r\n		</view> '),
          vue.createCommentVNode(" 复用 LocationList 组件 ")
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesCustomerStartLoc = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-6cc13438"], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/customer/StartLoc.vue"]]);
  const _sfc_main$9 = {
    components: {
      LocationList,
      PageHeader: ComponentsPageHeader
    },
    computed: {
      ...mapState(["userID", "rideRequest", "current_change_request_id"])
    },
    data() {
      return {
        homeAddress: null,
        companyAddress: null,
        end_loc: "",
        history: [],
        suggestions: [],
        showSuggestions: false,
        // ak: 'qUvnqoxw0awJluKPaBmcvUam4wQYOHF7',
        // ak:'EtqTJ1MT40bg44IsZf2fFe2eJmCD2l2e',
        // ak: 'b2gVyjseS5Wx4a1STxi6PDdNRGWakAP9',
        ak: "YylCDEyDLCtKCqASXVz7mXtoXLTHsn6D",
        hot_end_loc: []
      };
    },
    onLoad() {
      this.fetchAddresses();
      this.fetchHistory();
      this.fetchHot();
      if (this.current_change_request_id == this.rideRequest.requestID) {
        if (this.rideRequest.endLoc) {
          this.end_loc = this.rideRequest.endLoc;
        }
      }
    },
    methods: {
      showNoAddressToast() {
        uni.showToast({
          title: "当前未设置",
          icon: "none",
          duration: 2e3
        });
      },
      async getAddressAndCoordinatesByName(name) {
        try {
          const encodedAddress = encodeURIComponent(name);
          const geoResp = await uni.request({
            url: `https://api.map.baidu.com/geocoding/v3/?ak=${this.ak}&address=${encodeURIComponent(name)}&output=json`
          });
          const { lat, lng } = geoResp.data.result.location;
          const reverseResp = await uni.request({
            url: `https://api.map.baidu.com/reverse_geocoding/v3/?ak=${this.ak}&location=${lat},${lng}&output=json`
          });
          const address = reverseResp.data.result.formatted_address;
          return { address, lat, lng };
        } catch (error) {
          formatAppLog("error", "at pages/customer/EndLoc.vue:112", "获取地址和坐标失败:", error);
          return { address: "地址获取失败", lat: 0, lng: 0 };
        }
      },
      clearInput() {
        this.end_loc = "";
        this.suggestions = [];
        this.showSuggestions = false;
      },
      async fetchAddresses() {
        try {
          const response = await uni.request({
            url: `http://10.0.2.2:8083/carsharing/get-user-addresses?userId=${this.userID}`,
            method: "GET",
            header: {
              "Content-Type": "application/json"
            }
          });
          this.homeAddress = response.data.homeAddress;
          this.companyAddress = response.data.companyAddress;
        } catch (error) {
          formatAppLog("error", "at pages/customer/EndLoc.vue:133", "获取地址失败:", error);
        }
      },
      setHomeCompanyEndLocation(type) {
        if (type === "home" && this.homeAddress) {
          this.end_loc = this.homeAddress;
          this.setEndLoc(this.end_loc);
          uni.navigateBack({
            delta: 1
            // 返回上一页
          });
        } else if (type === "company" && this.companyAddress) {
          this.end_loc = this.companyAddress;
          this.setEndLoc(this.end_loc);
          uni.navigateBack({
            delta: 1
            // 返回上一页
          });
        } else {
          uni.showToast({
            title: `没有${type === "home" ? "家庭" : "公司"}地址`,
            icon: "none"
          });
        }
      },
      navigateToAddressSetting() {
        uni.switchTab({ url: "/pages/my/my" });
      },
      async fetchHistory() {
        try {
          const response = await uni.request({
            url: `http://10.0.2.2:8083/carsharing/get-end-loc-history?userId=${this.userID}`,
            method: "GET",
            header: {
              "Content-Type": "application/json"
            }
          });
          if (response.data.status === "success") {
            let historyNames = [...new Set(response.data.history)].slice(0, 5);
            let records = [];
            for (let i = 0; i < historyNames.length; i++) {
              let name = historyNames[i];
              let { address, lat, lng } = await this.getAddressAndCoordinatesByName(name);
              const currentLocation = await this.getCurrentLocation();
              let distance = await this.calculateDistance(currentLocation[0], currentLocation[1], lat, lng);
              if (address !== "地址获取失败") {
                records.push({
                  name,
                  address,
                  distance
                });
              }
            }
            this.history = records;
          } else {
            formatAppLog("warn", "at pages/customer/EndLoc.vue:188", "没有历史记录");
          }
        } catch (error) {
          formatAppLog("error", "at pages/customer/EndLoc.vue:191", "获取历史记录失败:", error);
        }
      },
      async fetchHot() {
        try {
          const response = await uni.request({
            url: `http://10.0.2.2:8083/carsharing/get-end-loc-hot`,
            method: "GET",
            header: {
              "Content-Type": "application/json"
            }
          });
          if (response.data.status === "success") {
            let hotLocNames = [...new Set(response.data.hotLoc)].slice(0, 10);
            let records = [];
            for (let i = 0; i < hotLocNames.length; i++) {
              let name = hotLocNames[i];
              let { address, lat, lng } = await this.getAddressAndCoordinatesByName(name);
              const currentLocation = await this.getCurrentLocation();
              let distance = await this.calculateDistance(currentLocation[0], currentLocation[1], lat, lng);
              if (address !== "地址获取失败") {
                records.push({
                  name,
                  address,
                  distance
                });
              }
            }
            this.hot_end_loc = records;
          } else {
            formatAppLog("warn", "at pages/customer/EndLoc.vue:223", "没有热门目的地");
          }
        } catch (error) {
          formatAppLog("error", "at pages/customer/EndLoc.vue:226", "获取热门目的地失败:", error);
        }
      },
      getCurrentLocation() {
        return new Promise((resolve) => {
          uni.getLocation({
            type: "wgs84",
            geocode: true,
            success(res) {
              resolve([res.latitude, res.longitude]);
            },
            fail(err) {
              formatAppLog("log", "at pages/customer/EndLoc.vue:238", "定位失败:", err);
              uni.showToast({
                title: "获取当前地址失败，将导致部分功能不可用",
                icon: "none",
                duration: 2e3
              });
              resolve([0, 0]);
            }
          });
        });
      },
      async calculateDistance(lat1, lng1, lat2, lng2) {
        const toRad = (angle) => angle * (Math.PI / 180);
        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLng = toRad(lng2 - lng1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return parseFloat(distance.toFixed(3));
      },
      ...mapActions(["setEndLoc"]),
      // sendEndLoc(location) {
      // 	this.setEndLoc(location);
      // 	uni.navigateBack({
      // 		delta: 1 // 返回上一页
      // 	});
      // },
      sendEndLoc() {
        if (this.end_loc) {
          this.setEndLoc(this.end_loc);
          uni.navigateBack({
            delta: 1
            // 返回上一页
          });
        } else {
          uni.showToast({
            title: "请输入目的地",
            icon: "none",
            duration: 2e3
          });
        }
      },
      handleLocationSelect(location) {
        this.end_loc = location;
        this.sendEndLoc(location);
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_PageHeader = vue.resolveComponent("PageHeader");
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    const _component_LocationList = vue.resolveComponent("LocationList");
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createVNode(_component_PageHeader, {
          backText: "选择行程终点",
          backUrl: "/pages/customer/customer_new"
        }),
        vue.createElementVNode("div", null, [
          vue.createElementVNode("view", { class: "block input-place" }, [
            vue.createElementVNode("view", { class: "input-wrapper" }, [
              vue.createCommentVNode(" 包裹 end-icon 和 input "),
              vue.createElementVNode("view", { class: "input-container" }, [
                vue.createElementVNode("view", { class: "icon end-icon" }),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.end_loc = $event),
                    placeholder: "您要到哪儿去",
                    class: "start-loc-input",
                    "confirm-type": "done",
                    onConfirm: _cache[1] || (_cache[1] = (...args) => $options.sendEndLoc && $options.sendEndLoc(...args))
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [vue.vModelText, $data.end_loc]
                ])
              ]),
              vue.createVNode(_component_uni_icons, {
                type: "clear",
                size: "20",
                class: "clear-icon",
                onClick: $options.clearInput
              }, null, 8, ["onClick"])
            ]),
            vue.createElementVNode("view", { class: "address" }, [
              vue.createElementVNode("view", {
                class: "address-unit",
                onClick: _cache[3] || (_cache[3] = ($event) => $data.homeAddress ? $options.setHomeCompanyEndLocation("home") : $options.showNoAddressToast())
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "home",
                  size: "24",
                  color: "var(--color-darkgrey)"
                }),
                vue.createElementVNode("view", { class: "address-option" }, [
                  vue.createElementVNode("view", { style: { "display": "flex", "flex-direction": "column", "gap": "2px" } }, [
                    vue.createElementVNode("text", { style: { "font-size": "16px", "font-weight": "bold" } }, "家"),
                    $data.homeAddress ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 0,
                        class: "small-text"
                      },
                      vue.toDisplayString($data.homeAddress),
                      1
                      /* TEXT */
                    )) : (vue.openBlock(), vue.createElementBlock("text", {
                      key: 1,
                      class: "small-text",
                      onClick: _cache[2] || (_cache[2] = ($event) => $options.navigateToAddressSetting())
                    }, "设置家的地址"))
                  ])
                ])
              ]),
              vue.createElementVNode("view", { class: "vertical-divider" }),
              vue.createElementVNode("view", {
                class: "address-unit",
                onClick: _cache[5] || (_cache[5] = ($event) => $data.companyAddress ? $options.setHomeCompanyEndLocation("company") : $options.showNoAddressToast())
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "shop",
                  size: "24",
                  color: "var(--color-darkgrey)"
                }),
                vue.createElementVNode("view", { class: "address-option" }, [
                  vue.createElementVNode("view", { style: { "display": "flex", "flex-direction": "column", "gap": "2px" } }, [
                    vue.createElementVNode("text", { style: { "font-size": "16px", "font-weight": "bold" } }, "公司"),
                    $data.companyAddress ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 0,
                        class: "small-text"
                      },
                      vue.toDisplayString($data.companyAddress),
                      1
                      /* TEXT */
                    )) : (vue.openBlock(), vue.createElementBlock("text", {
                      key: 1,
                      class: "small-text",
                      onClick: _cache[4] || (_cache[4] = ($event) => $options.navigateToAddressSetting())
                    }, "设置公司地址"))
                  ])
                ])
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "block location-list" }, [
            vue.createVNode(_component_LocationList, {
              title: "历史记录",
              locations: $data.history,
              start: true,
              onLocationSelected: $options.handleLocationSelect
            }, null, 8, ["locations", "onLocationSelected"])
          ]),
          vue.createElementVNode("view", { class: "block location-list" }, [
            vue.createVNode(_component_LocationList, {
              title: "热门目的地",
              locations: $data.hot_end_loc,
              start: false,
              onLocationSelected: $options.handleLocationSelect
            }, null, 8, ["locations", "onLocationSelected"])
          ])
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesCustomerEndLoc = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-d057533e"], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/customer/EndLoc.vue"]]);
  const _imports_0$1 = "/static/report-icon.png";
  const _sfc_main$8 = {
    components: {
      PageHeader: ComponentsPageHeader
    },
    data() {
      const app = getApp();
      return {
        orderInfo: {
          avatar: "/static/default-avatar.png",
          // 司机头像
          verificationCarPlate: "京A·D2345",
          // 车牌号
          verificationCarModel: "特斯拉 Model 3",
          // 车型
          realName: "张师傅",
          // 司机姓名
          rating: null,
          // 评分（初始为null，等待后端数据）
          distance: "10.3",
          // 距离
          price: 38.5,
          // 预估价格
          startLoc: "北京市海淀区中关村大街1号",
          // 起点
          endLoc: "北京市朝阳区建国路88号",
          // 终点
          carColor: "黑色"
          // 车辆颜色（需映射到carColor）
        },
        countdown: 45,
        // 取消倒计时
        countdownTimer: null,
        // 倒计时定时器
        carColor: "黑色",
        // 默认车辆颜色
        isLoading: false,
        // 加载状态
        error: null,
        // 错误信息
        longitude: app.globalData.my_location_longitude,
        latitude: app.globalData.my_location_latitude,
        api_key: app.globalData.api_key,
        scale: 16,
        markers: [],
        polyline: [],
        mapContext: null,
        startPoint: null,
        endPoint: null,
        currentLocation: null
        // 存储当前位置
      };
    },
    computed: {
      ...mapState(["userID", "rideRequest", "rideOrder"])
    },
    created() {
      this.fetchOrderInfo();
      this.startCountdown();
    },
    beforeDestroy() {
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer);
      }
    },
    methods: {
      ...mapActions(["setOrderId"]),
      async fetchOrderInfo() {
        this.isLoading = true;
        this.error = null;
        try {
          if (!this.rideOrder.orderID) {
            throw new Error("未获取到订单ID");
          }
          const response = await uni.request({
            url: `http://10.0.2.2:8083/carsharing/get-certain-order?orderId=${this.rideOrder.orderID}`,
            method: "GET",
            header: {
              "Content-Type": "application/json"
            }
          });
          formatAppLog("log", "at pages/customer/OrderDetail.vue:154", response);
          if (response.data.status === "success") {
            this.orderInfo = {
              ...response.data.history,
              rating: response.data.history.rating != null ? Number(response.data.history.rating) : null
            };
            formatAppLog("log", "at pages/customer/OrderDetail.vue:162", "Updated orderInfo.rating:", this.orderInfo.rating);
            this.rideOrder.startLoc = this.orderInfo.startLoc;
            this.rideOrder.endLoc = this.orderInfo.endLoc;
            this.rideOrder.startAt = this.orderInfo.startAt;
            await this.initializeMapRoute();
          } else {
            throw new Error(response.data.message || "获取订单信息失败");
          }
        } catch (error) {
          formatAppLog("error", "at pages/customer/OrderDetail.vue:172", "获取订单信息失败:", error);
          this.error = error.message || "获取订单信息失败";
          uni.showToast({
            title: this.error,
            icon: "none"
          });
        } finally {
          this.isLoading = false;
        }
      },
      async initializeMapRoute() {
        try {
          if (this.orderInfo.startLoc && this.orderInfo.endLoc) {
            this.startPoint = await this.geocodeAddress(this.orderInfo.startLoc);
            this.endPoint = await this.geocodeAddress(this.orderInfo.endLoc);
            await this.getDrivingRoute(this.startPoint, this.endPoint);
          } else {
            throw new Error("起点或终点地址缺失");
          }
        } catch (error) {
          formatAppLog("error", "at pages/customer/OrderDetail.vue:193", "初始化地图路线失败:", error);
          uni.showToast({
            title: "加载路线失败，请检查地址",
            icon: "none",
            duration: 2e3
          });
          this.markers = [];
          this.polyline = [];
          this.getCurrentLocation();
        }
      },
      onMapReady() {
        this.mapContext = uni.createMapContext("map", this);
        if (this.startPoint && this.endPoint) {
          this.getDrivingRoute(this.startPoint, this.endPoint);
        }
      },
      async geocodeAddress(address) {
        return new Promise((resolve, reject) => {
          const geocodeUrl = `https://restapi.amap.com/v3/geocode/geo?address=${encodeURIComponent(address)}&output=json&key=${this.api_key}`;
          uni.request({
            url: geocodeUrl,
            method: "GET",
            success: (res) => {
              if (res.data.status === "1" && res.data.geocodes && res.data.geocodes.length > 0) {
                const location = res.data.geocodes[0].location.split(",");
                const lngLat = [parseFloat(location[0]), parseFloat(location[1])];
                resolve(lngLat);
              } else {
                reject("地理编码失败：未找到该地点");
              }
            },
            fail: (error) => {
              reject(`地理编码请求失败：${error}`);
            }
          });
        });
      },
      async getDrivingRoute(startLngLat, endLngLat) {
        if (!startLngLat || !endLngLat)
          return;
        try {
          const url = `https://restapi.amap.com/v3/direction/driving?key=${this.api_key}&origin=${startLngLat[0]},${startLngLat[1]}&destination=${endLngLat[0]},${endLngLat[1]}&strategy=0`;
          const response = await uni.request({
            url,
            method: "GET"
          });
          if (response.data.status === "1" && response.data.route) {
            const pathSteps = response.data.route.paths[0].steps;
            this.markers = [
              {
                id: 1,
                longitude: startLngLat[0],
                latitude: startLngLat[1],
                title: this.orderInfo.startLoc,
                iconPath: "/static/point_start.png",
                width: 24,
                height: 24
              },
              {
                id: 2,
                longitude: endLngLat[0],
                latitude: endLngLat[1],
                title: this.orderInfo.endLoc,
                iconPath: "/static/point_end.png",
                width: 24,
                height: 24
              }
            ];
            this.polyline = pathSteps.map((step) => ({
              points: step.polyline.split(";").map((coord) => {
                const [lng, lat] = coord.split(",").map(Number);
                return {
                  longitude: lng,
                  latitude: lat
                };
              }),
              color: "#517aff",
              width: 10,
              dottedLine: false
            }));
            this.adjustMapView();
          } else {
            throw new Error("路径规划失败");
          }
        } catch (error) {
          formatAppLog("error", "at pages/customer/OrderDetail.vue:289", "路线规划错误:", error);
          uni.showToast({
            title: "路线规划失败",
            icon: "none"
          });
        }
      },
      adjustMapView() {
        let allPoints = [];
        this.markers.forEach((marker) => {
          allPoints.push({
            longitude: marker.longitude,
            latitude: marker.latitude
          });
        });
        this.polyline.forEach((line) => {
          line.points.forEach((point) => {
            allPoints.push(point);
          });
        });
        const bounds = this.calculateBounds(allPoints);
        const centerLng = (bounds.minLng + bounds.maxLng) / 2;
        const centerLat = (bounds.minLat + bounds.maxLat) / 2;
        this.longitude = centerLng;
        this.latitude = centerLat;
        this.scale = this.calculateScale(bounds);
      },
      calculateBounds(points) {
        let minLng = Infinity;
        let maxLng = -Infinity;
        let minLat = Infinity;
        let maxLat = -Infinity;
        points.forEach((p) => {
          minLng = Math.min(minLng, p.longitude);
          maxLng = Math.max(maxLng, p.longitude);
          minLat = Math.min(minLat, p.latitude);
          maxLat = Math.max(maxLat, p.latitude);
        });
        return {
          minLng,
          maxLng,
          minLat,
          maxLat
        };
      },
      calculateScale(bounds) {
        const systemInfo = uni.getSystemInfoSync();
        const widthInPx = systemInfo.windowWidth;
        const deltaLng = bounds.maxLng - bounds.minLng;
        const deltaLat = bounds.maxLat - bounds.minLat;
        const padding = 0.2;
        const paddedDeltaLng = deltaLng * (1 + padding);
        const paddedDeltaLat = deltaLat * (1 + padding);
        const metersPerPixel = (paddedDeltaLng * 111319 + paddedDeltaLat * 110574) / widthInPx;
        const baseZoomLevel = 17;
        let scale = baseZoomLevel - Math.log(metersPerPixel) / Math.LN2;
        return Math.max(3, Math.min(18, Math.floor(scale)));
      },
      getCurrentLocation() {
        const that = this;
        uni.getLocation({
          type: "wgs84",
          geocode: true,
          success: function(res) {
            that.currentLocation = res;
            that.longitude = res.longitude;
            that.latitude = res.latitude;
            that.scale = 16;
            that.markers = [
              ...that.markers.filter((marker) => marker.id !== 3),
              // 移除旧的当前位置标记
              {
                id: 3,
                latitude: res.latitude,
                longitude: res.longitude,
                width: 24,
                height: 24,
                iconPath: "/static/current_location.png"
              }
            ];
            if (that.mapContext) {
              that.mapContext.moveToLocation({
                longitude: res.longitude,
                latitude: res.latitude
              });
            }
          },
          fail: function(err) {
            formatAppLog("log", "at pages/customer/OrderDetail.vue:399", "定位失败:", err);
            uni.showToast({
              title: "获取位置失败",
              icon: "none",
              duration: 2e3
            });
          }
        });
      },
      async cancelOrder() {
        this.isLoading = true;
        this.error = null;
        try {
          formatAppLog("log", "at pages/customer/OrderDetail.vue:413", this.rideOrder.orderID);
          if (!this.rideOrder.orderID) {
            throw new Error("未获取到订单ID");
          }
          const response = await uni.request({
            url: `http://10.0.2.2:8083/carsharing/cancel-order?id=${this.rideOrder.orderID}`,
            method: "DELETE",
            header: {
              "Content-Type": "application/json"
            }
          });
          if (response.data.status === "success") {
            uni.showToast({
              title: "订单已取消",
              icon: "success"
            });
            uni.navigateTo({
              url: "./OrderCancel",
              animationType: "slide-in-right",
              huntingDuration: 300
            });
          } else {
            throw new Error(response.data.message || "取消订单失败");
          }
        } catch (error) {
          formatAppLog("error", "at pages/customer/OrderDetail.vue:442", "取消订单出错:", error);
          this.error = error.message || "取消订单失败";
          uni.showToast({
            title: this.error,
            icon: "none"
          });
        } finally {
          this.isLoading = false;
        }
      },
      handleMapMessage(e) {
      },
      formatRating(rating) {
        if (rating == null || isNaN(Number(rating))) {
          return "暂无评分";
        }
        const numRating = Number(rating);
        const stars = "★".repeat(Math.floor(numRating)) + "☆".repeat(5 - Math.floor(numRating));
        return `${stars} ${numRating.toFixed(1)}分`;
      },
      startCountdown() {
        this.countdownTimer = setInterval(() => {
          if (this.countdown > 0) {
            this.countdown--;
          } else {
            clearInterval(this.countdownTimer);
          }
        }, 1e3);
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_PageHeader = vue.resolveComponent("PageHeader");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 悬浮头部 "),
      vue.createVNode(_component_PageHeader, {
        backText: "当前订单",
        backUrl: "/pages/customer/customer_new"
      }),
      vue.createCommentVNode(" 地图容器 "),
      vue.createElementVNode("map", {
        id: "map",
        class: "map-area",
        style: vue.normalizeStyle({ height: $data.countdown > 0 ? "64%" : "70%" }),
        longitude: $data.longitude,
        latitude: $data.latitude,
        markers: $data.markers,
        polyline: $data.polyline,
        scale: $data.scale,
        "show-location": "",
        onReady: _cache[0] || (_cache[0] = (...args) => $options.onMapReady && $options.onMapReady(...args))
      }, null, 44, ["longitude", "latitude", "markers", "polyline", "scale"]),
      vue.createCommentVNode(" 定位按钮 "),
      vue.createElementVNode("cover-view", {
        class: "locate-button1",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.getCurrentLocation && $options.getCurrentLocation(...args))
      }),
      vue.createElementVNode("cover-view", {
        class: "locate-button2",
        onClick: _cache[2] || (_cache[2] = (...args) => $options.getCurrentLocation && $options.getCurrentLocation(...args))
      }),
      vue.createElementVNode("view", { class: "floating-details" }, [
        vue.createElementVNode("view", { class: "detail-card" }, [
          vue.createElementVNode("view", { class: "first-row" }, [
            vue.createElementVNode("view", { class: "first-item" }, [
              vue.createElementVNode("image", {
                src: $data.orderInfo.avatar || "/static/default-avatar.png",
                class: "avatar-icon"
              }, null, 8, ["src"])
            ]),
            vue.createElementVNode("view", {
              class: "second-item",
              style: { "display": "flex", "align-items": "flex-start", "flex-direction": "column" }
            }, [
              vue.createElementVNode("view", {
                class: "car-info",
                style: { "display": "flex", "align-items": "flex-start", "gap": "3px", "flex-direction": "column" }
              }, [
                vue.createElementVNode(
                  "view",
                  { class: "car-plate" },
                  vue.toDisplayString($data.orderInfo.verificationCarPlate),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "car-detail" },
                  vue.toDisplayString($data.carColor) + " | " + vue.toDisplayString($data.orderInfo.verificationCarModel),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "driver-info" }, [
                vue.createElementVNode(
                  "view",
                  { class: "driver-name" },
                  vue.toDisplayString($data.orderInfo.realName),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "driver-rating" },
                  vue.toDisplayString($options.formatRating($data.orderInfo.rating)),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("view", {
              class: "third-item",
              style: { "display": "flex", "gap": "20px", "align-items": "flex-end", "flex-direction": "column", "margin-left": "20px" }
            }, [
              vue.createElementVNode("view", { class: "report-btn" }, [
                vue.createElementVNode("image", {
                  src: _imports_0$1,
                  class: "report-icon"
                }),
                vue.createElementVNode("view", { class: "report-text" }, "举报投诉")
              ]),
              vue.createElementVNode("view", {
                class: "distance-info",
                style: { "display": "flex", "align-items": "flex-end", "flex-direction": "column" }
              }, [
                vue.createElementVNode("view", { style: { "font-size": "14px", "color": "var(--color-darkgrey)" } }, "总距离"),
                vue.createElementVNode(
                  "view",
                  { style: { "font-size": "32px", "color": "var(--color-red)", "font-weight": "bold" } },
                  vue.toDisplayString($data.orderInfo.distance) + "km",
                  1
                  /* TEXT */
                )
              ])
            ])
          ]),
          vue.createCommentVNode(" 路线信息 "),
          vue.createElementVNode("view", { class: "route-info" }, [
            vue.createElementVNode("view", { class: "icon start-icon" }),
            vue.createElementVNode("view", { class: "route-text-container" }, [
              vue.createElementVNode(
                "view",
                { class: "route-from" },
                vue.toDisplayString($data.orderInfo.startLoc),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "route-separator" }, "----------"),
            vue.createElementVNode("view", { class: "icon end-icon" }),
            vue.createElementVNode("view", { class: "route-text-container" }, [
              vue.createElementVNode(
                "view",
                { class: "route-to" },
                vue.toDisplayString($data.orderInfo.endLoc),
                1
                /* TEXT */
              )
            ])
          ]),
          vue.createCommentVNode(" 取消按钮 - 添加v-if条件 "),
          vue.createElementVNode("view", {
            style: { "display": "flex", "justify-content": "center" },
            onClick: _cache[3] || (_cache[3] = (...args) => $options.cancelOrder && $options.cancelOrder(...args))
          }, [
            $data.countdown > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "cancel-btn"
            }, [
              vue.createElementVNode(
                "view",
                { class: "cancel-text" },
                "取消订单（" + vue.toDisplayString($data.countdown) + "s）",
                1
                /* TEXT */
              )
            ])) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(' 			  <view class="deleted-btn" v-else>\r\n				  <view class="cancel-text" >已取消</view>\r\n			  </view> ')
          ])
        ])
      ])
    ]);
  }
  const PagesCustomerOrderDetail = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/customer/OrderDetail.vue"]]);
  const _sfc_main$7 = {
    components: {
      PageHeader: ComponentsPageHeader
    },
    data() {
      const app = getApp();
      return {
        orderInfo: {
          startLoc: "",
          endLoc: "",
          startAt: null
        },
        isLoading: false,
        error: null,
        longitude: app.globalData.my_location_longitude,
        latitude: app.globalData.my_location_latitude,
        api_key: app.globalData.api_key,
        scale: 16,
        markers: [],
        polyline: [],
        mapContext: null,
        startPoint: null,
        endPoint: null,
        currentLocation: null
      };
    },
    computed: {
      ...mapState(["userID", "rideRequest", "rideOrder"]),
      formattedTime() {
        const date = this.orderInfo.startAt ? new Date(this.orderInfo.startAt) : /* @__PURE__ */ new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}年${month}月${day}日 ${hours}:${minutes}`;
      }
    },
    created() {
      this.orderInfo.startLoc = this.rideOrder.startLoc || "";
      this.orderInfo.endLoc = this.rideOrder.endLoc || "";
      this.orderInfo.startAt = this.rideOrder.startAt || null;
      this.initializeMapRoute();
    },
    methods: {
      ...mapActions(["setOrderId"]),
      async initializeMapRoute() {
        try {
          if (this.orderInfo.startLoc && this.orderInfo.endLoc) {
            this.startPoint = await this.geocodeAddress(this.orderInfo.startLoc);
            this.endPoint = await this.geocodeAddress(this.orderInfo.endLoc);
            await this.getDrivingRoute(this.startPoint, this.endPoint);
          } else {
            throw new Error("起点或终点地址缺失");
          }
        } catch (error) {
          formatAppLog("error", "at pages/customer/OrderCancel.vue:116", "初始化地图路线失败:", error);
          uni.showToast({
            title: "加载路线失败，请检查地址",
            icon: "none",
            duration: 2e3
          });
          this.markers = [];
          this.polyline = [];
          this.getCurrentLocation();
        }
      },
      onMapReady() {
        this.mapContext = uni.createMapContext("map", this);
        if (this.startPoint && this.endPoint) {
          this.getDrivingRoute(this.startPoint, this.endPoint);
        }
      },
      async geocodeAddress(address) {
        return new Promise((resolve, reject) => {
          const geocodeUrl = `https://restapi.amap.com/v3/geocode/geo?address=${encodeURIComponent(address)}&output=json&key=${this.api_key}`;
          uni.request({
            url: geocodeUrl,
            method: "GET",
            success: (res) => {
              if (res.data.status === "1" && res.data.geocodes && res.data.geocodes.length > 0) {
                const location = res.data.geocodes[0].location.split(",");
                const lngLat = [parseFloat(location[0]), parseFloat(location[1])];
                resolve(lngLat);
              } else {
                reject("地理编码失败：未找到该地点");
              }
            },
            fail: (error) => {
              reject(`地理编码请求失败：${error}`);
            }
          });
        });
      },
      async getDrivingRoute(startLngLat, endLngLat) {
        if (!startLngLat || !endLngLat)
          return;
        try {
          const url = `https://restapi.amap.com/v3/direction/driving?key=${this.api_key}&origin=${startLngLat[0]},${startLngLat[1]}&destination=${endLngLat[0]},${endLngLat[1]}&strategy=0`;
          const response = await uni.request({
            url,
            method: "GET"
          });
          if (response.data.status === "1" && response.data.route) {
            const pathSteps = response.data.route.paths[0].steps;
            this.markers = [
              {
                id: 1,
                longitude: startLngLat[0],
                latitude: startLngLat[1],
                title: this.orderInfo.startLoc,
                iconPath: "/static/point_start.png",
                width: 24,
                height: 24
              },
              {
                id: 2,
                longitude: endLngLat[0],
                latitude: endLngLat[1],
                title: this.orderInfo.endLoc,
                iconPath: "/static/point_end.png",
                width: 24,
                height: 24
              }
            ];
            this.polyline = pathSteps.map((step) => ({
              points: step.polyline.split(";").map((coord) => {
                const [lng, lat] = coord.split(",").map(Number);
                return {
                  longitude: lng,
                  latitude: lat
                };
              }),
              color: "#517aff",
              width: 10,
              dottedLine: false
            }));
            this.adjustMapView();
          } else {
            throw new Error("路径规划失败");
          }
        } catch (error) {
          formatAppLog("error", "at pages/customer/OrderCancel.vue:207", "路线规划错误:", error);
          uni.showToast({
            title: "路线规划失败",
            icon: "none"
          });
        }
      },
      adjustMapView() {
        let allPoints = [];
        this.markers.forEach((marker) => {
          allPoints.push({
            longitude: marker.longitude,
            latitude: marker.latitude
          });
        });
        this.polyline.forEach((line) => {
          line.points.forEach((point) => {
            allPoints.push(point);
          });
        });
        const bounds = this.calculateBounds(allPoints);
        const centerLng = (bounds.minLng + bounds.maxLng) / 2;
        const centerLat = (bounds.minLat + bounds.maxLat) / 2;
        this.longitude = centerLng;
        this.latitude = centerLat;
        this.scale = this.calculateScale(bounds);
      },
      calculateBounds(points) {
        let minLng = Infinity;
        let maxLng = -Infinity;
        let minLat = Infinity;
        let maxLat = -Infinity;
        points.forEach((p) => {
          minLng = Math.min(minLng, p.longitude);
          maxLng = Math.max(maxLng, p.longitude);
          minLat = Math.min(minLat, p.latitude);
          maxLat = Math.max(maxLat, p.latitude);
        });
        return {
          minLng,
          maxLng,
          minLat,
          maxLat
        };
      },
      calculateScale(bounds) {
        const systemInfo = uni.getSystemInfoSync();
        const widthInPx = systemInfo.windowWidth;
        const deltaLng = bounds.maxLng - bounds.minLng;
        const deltaLat = bounds.maxLat - bounds.minLat;
        const padding = 0.2;
        const paddedDeltaLng = deltaLng * (1 + padding);
        const paddedDeltaLat = deltaLat * (1 + padding);
        const metersPerPixel = (paddedDeltaLng * 111319 + paddedDeltaLat * 110574) / widthInPx;
        const baseZoomLevel = 17;
        let scale = baseZoomLevel - Math.log(metersPerPixel) / Math.LN2;
        return Math.max(3, Math.min(18, Math.floor(scale)));
      },
      getCurrentLocation() {
        const that = this;
        uni.getLocation({
          type: "wgs84",
          geocode: true,
          success: function(res) {
            that.currentLocation = res;
            that.longitude = res.longitude;
            that.latitude = res.latitude;
            that.scale = 16;
            that.markers = [
              ...that.markers.filter((marker) => marker.id !== 3),
              {
                id: 3,
                latitude: res.latitude,
                longitude: res.longitude,
                width: 24,
                height: 24,
                iconPath: "/static/current_location.png"
              }
            ];
            if (that.mapContext) {
              that.mapContext.moveToLocation({
                longitude: res.longitude,
                latitude: res.latitude
              });
            }
          },
          fail: function(err) {
            formatAppLog("log", "at pages/customer/OrderCancel.vue:298", "定位失败:", err);
            uni.showToast({
              title: "获取位置失败",
              icon: "none",
              duration: 2e3
            });
          }
        });
      },
      async cancelOrder() {
        this.isLoading = true;
        this.error = null;
        try {
          formatAppLog("log", "at pages/customer/OrderCancel.vue:312", this.rideOrder.orderID);
          if (!this.rideOrder.orderID) {
            throw new Error("未获取到订单ID");
          }
          const response = await uni.request({
            url: `http://10.0.2.2:8083/carsharing/cancel-order?id=${this.rideOrder.orderID}`,
            method: "DELETE",
            header: {
              "Content-Type": "application/json"
            }
          });
          if (response.data.status === "success") {
            uni.showToast({
              title: "订单已取消",
              icon: "success"
            });
            uni.navigateTo({
              url: "./OrderCancel",
              animationType: "slide-in-right",
              huntingDuration: 300
            });
          } else {
            throw new Error(response.data.message || "取消订单失败");
          }
        } catch (error) {
          formatAppLog("error", "at pages/customer/OrderCancel.vue:340", "取消订单出错:", error);
          this.error = error.message || "取消订单失败";
          uni.showToast({
            title: this.error,
            icon: "none"
          });
        } finally {
          this.isLoading = false;
        }
      },
      handleMapMessage(e) {
      },
      formatRating(rating) {
        if (rating == null || isNaN(Number(rating))) {
          return "暂无评分";
        }
        const numRating = Number(rating);
        const stars = "★".repeat(Math.floor(numRating)) + "☆".repeat(5 - Math.floor(numRating));
        return `${stars} ${numRating.toFixed(1)}分`;
      },
      startCountdown() {
        this.countdownTimer = setInterval(() => {
          if (this.countdown > 0) {
            this.countdown--;
          } else {
            clearInterval(this.countdownTimer);
          }
        }, 1e3);
      },
      goToCustomer() {
        uni.switchTab({
          url: "./customer_new"
        });
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_PageHeader = vue.resolveComponent("PageHeader");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 悬浮头部 "),
      vue.createVNode(_component_PageHeader, {
        backText: "当前订单",
        backUrl: "/pages/customer/customer_new"
      }),
      vue.createCommentVNode(" 地图容器 "),
      vue.createElementVNode("map", {
        id: "map",
        class: "map-area",
        style: { height: "70%" },
        longitude: $data.longitude,
        latitude: $data.latitude,
        markers: $data.markers,
        polyline: $data.polyline,
        scale: $data.scale,
        "show-location": "",
        onReady: _cache[0] || (_cache[0] = (...args) => $options.onMapReady && $options.onMapReady(...args))
      }, null, 40, ["longitude", "latitude", "markers", "polyline", "scale"]),
      vue.createCommentVNode(" 定位按钮 "),
      vue.createElementVNode("cover-view", {
        class: "locate-button1",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.getCurrentLocation && $options.getCurrentLocation(...args))
      }),
      vue.createElementVNode("cover-view", {
        class: "locate-button2",
        onClick: _cache[2] || (_cache[2] = (...args) => $options.getCurrentLocation && $options.getCurrentLocation(...args))
      }),
      vue.createCommentVNode(" 订单取消详情 "),
      vue.createElementVNode("view", { class: "floating-details" }, [
        vue.createElementVNode("view", { class: "detail-card" }, [
          vue.createElementVNode("view", { class: "title-section" }, [
            vue.createElementVNode("view", { class: "title" }, "订单取消成功"),
            vue.createElementVNode("view", { class: "fee-note" }, "无需支付手续费")
          ]),
          vue.createElementVNode("view", { class: "subtitle" }, "订单已取消，您可以重新拼车。"),
          vue.createElementVNode("view", { class: "time-section" }, [
            vue.createElementVNode("view", { style: { "font-size": "14px", "margin-right": "10px" } }, "🕒"),
            vue.createElementVNode(
              "view",
              { class: "time" },
              vue.toDisplayString($options.formattedTime),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "location-section" }, [
            vue.createElementVNode("view", { class: "location-item" }, [
              vue.createElementVNode("view", { class: "dot green" }),
              vue.createElementVNode(
                "view",
                {
                  class: "location-text",
                  style: { "margin-bottom": "10px" }
                },
                vue.toDisplayString($data.orderInfo.startLoc),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "location-item" }, [
              vue.createElementVNode("view", { class: "dot red" }),
              vue.createElementVNode(
                "view",
                {
                  class: "location-text",
                  style: { "margin-bottom": "5px" }
                },
                vue.toDisplayString($data.orderInfo.endLoc),
                1
                /* TEXT */
              )
            ])
          ]),
          vue.createElementVNode("view", {
            class: "btn",
            onClick: _cache[3] || (_cache[3] = (...args) => $options.goToCustomer && $options.goToCustomer(...args))
          }, "重新拼车")
        ])
      ])
    ]);
  }
  const PagesCustomerOrderCancel = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/customer/OrderCancel.vue"]]);
  const _sfc_main$6 = {
    components: {
      PageHeader: ComponentsPageHeader,
      ShareOption: ComponentsShareOption
    },
    data() {
      const app = getApp();
      const now = /* @__PURE__ */ new Date();
      const currentTime = `${now.getFullYear()}年${(now.getMonth() + 1).toString().padStart(2, "0")}月${now.getDate().toString().padStart(2, "0")}日 ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      return {
        statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
        longitude: app.globalData.my_location_longitude,
        latitude: app.globalData.my_location_latitude,
        api_key: app.globalData.api_key,
        scale: 16,
        markers: [],
        polyline: [],
        mapContext: null,
        currentLocation: null,
        startPoint: null,
        endPoint: null,
        selectedTime: currentTime,
        currentTime: now,
        selectedSeats: 1,
        selectedType: null,
        highway: null,
        id: 0
      };
    },
    computed: {
      ...mapState(["rideRequest", "rideOrder", "current_change_request_id"])
    },
    async onShow() {
      formatAppLog("log", "at pages/customer/OrderModify.vue:117", "接收到的id:", this.current_change_request_id);
      this.id = this.current_change_request_id;
      await this.fetchRideData();
      await this.resetGlobal();
    },
    methods: {
      ...mapActions([
        "login",
        "logout",
        "setRequestId",
        "setStartLoc",
        "setEndLoc",
        "setStartAt",
        "setExclusive",
        "toggleHighway",
        "resetRequest",
        "setOrderId",
        "setHighway",
        "setCurrentChangeRequestId"
      ]),
      async fetchRideData() {
        if (this.id != this.rideRequest.requestID) {
          try {
            const response = await uni.request({
              url: `http://10.0.2.2:8083/carsharing/get-certain-request?requestId=${this.id}`,
              method: "GET",
              header: {
                "Content-Type": "application/json"
              }
            });
            if (response.data.status === "success") {
              const data = response.data.data[0];
              const string = data.startAt;
              const normalizedDateStr = `${string}Z`;
              const startAt = new Date(normalizedDateStr);
              formatAppLog("log", "at pages/customer/OrderModify.vue:156", normalizedDateStr);
              startAt.setHours(startAt.getHours() - 8);
              const year = startAt.getFullYear();
              const month = (startAt.getMonth() + 1).toString().padStart(2, "0");
              const day = startAt.getDate().toString().padStart(2, "0");
              const hours = startAt.getHours().toString().padStart(2, "0");
              const minutes = startAt.getMinutes().toString().padStart(2, "0");
              this.selectedTime = `${year}年${month}月${day}日 ${hours}:${minutes}`;
              startAt.setHours(startAt.getHours() + 8);
              this.setRequestId(this.id);
              this.setStartLoc(data.startLoc);
              this.setEndLoc(data.endLoc);
              this.setStartAt(startAt.toISOString());
              this.setExclusive(data.exclusive);
              this.setHighway(data.highway);
              this.highway = data.highway;
              this.selectedType = data.exclusive ? "exclusive" : "shared";
              this.selectedSeats = 1;
            } else {
              throw new Error("获取行程数据失败");
            }
          } catch (error) {
            formatAppLog("error", "at pages/customer/OrderModify.vue:181", "获取行程数据失败:", error);
            uni.showToast({
              title: "获取行程数据失败",
              icon: "none"
            });
          }
        }
      },
      onMapReady() {
        this.mapContext = uni.createMapContext("map", this);
        this.getCurrentLocation();
      },
      async resetGlobal() {
        if (this.rideRequest.requestID != this.current_change_request_id) {
          this.resetRequest(this.current_change_request_id);
          const now = /* @__PURE__ */ new Date();
          const currentTime = `${now.getFullYear()}年${(now.getMonth() + 1).toString().padStart(2, "0")}月${now.getDate().toString().padStart(2, "0")}日 ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
          this.selectedTime = currentTime;
          this.currentTime = now;
          this.selectedSeats = 1;
        } else {
          try {
            const hasStart = this.rideRequest.startLoc;
            const hasEnd = this.rideRequest.endLoc;
            if (hasStart && !hasEnd) {
              this.startPoint = await this.geocodeAddress(this.rideRequest.startLoc);
              this.longitude = this.startPoint[0];
              this.latitude = this.startPoint[1];
              this.scale = 16;
              this.markers = [{
                id: 1,
                latitude: this.startPoint[1],
                longitude: this.startPoint[0],
                width: 24,
                height: 24,
                iconPath: "/static/point_start.png"
              }];
              this.polyline = [];
              if (this.mapContext) {
                this.mapContext.moveToLocation({
                  longitude: this.startPoint[0],
                  latitude: this.startPoint[1]
                });
              }
            } else if (!hasStart && hasEnd) {
              this.endPoint = await this.geocodeAddress(this.rideRequest.endLoc);
              this.longitude = this.endPoint[0];
              this.latitude = this.endPoint[1];
              this.scale = 16;
              this.markers = [{
                id: 2,
                latitude: this.endPoint[1],
                longitude: this.endPoint[0],
                width: 24,
                height: 24,
                iconPath: "/static/point_end.png"
              }];
              this.polyline = [];
              if (this.mapContext) {
                this.mapContext.moveToLocation({
                  longitude: this.endPoint[0],
                  latitude: this.endPoint[1]
                });
              }
            } else if (hasStart && hasEnd) {
              this.startPoint = await this.geocodeAddress(this.rideRequest.startLoc);
              this.endPoint = await this.geocodeAddress(this.rideRequest.endLoc);
              await this.getDrivingRoute(this.startPoint, this.endPoint);
            } else {
              this.markers = [];
              this.polyline = [];
              this.getCurrentLocation();
            }
          } catch (error) {
            formatAppLog("error", "at pages/customer/OrderModify.vue:258", "地址解析失败:", error);
            uni.showToast({
              title: "地址解析失败，请检查地址",
              icon: "none",
              duration: 2e3
            });
            this.markers = [];
            this.polyline = [];
            this.getCurrentLocation();
          }
        }
      },
      async geocodeAddress(address) {
        return new Promise((resolve, reject) => {
          const geocodeUrl = `https://restapi.amap.com/v3/geocode/geo?address=${encodeURIComponent(address)}&output=json&key=${this.api_key}`;
          uni.request({
            url: geocodeUrl,
            method: "GET",
            success: (res) => {
              if (res.data.status === "1" && res.data.geocodes && res.data.geocodes.length > 0) {
                const location = res.data.geocodes[0].location.split(",");
                const lngLat = [parseFloat(location[0]), parseFloat(location[1])];
                resolve(lngLat);
              } else {
                reject("地理编码失败：未找到该地点");
              }
            },
            fail: (error) => {
              reject(`地理编码请求失败：${error}`);
            }
          });
        });
      },
      async getDrivingRoute(startLngLat, endLngLat) {
        if (!startLngLat || !endLngLat)
          return;
        try {
          const url = `https://restapi.amap.com/v3/direction/driving?key=${this.api_key}&origin=${startLngLat[0]},${startLngLat[1]}&destination=${endLngLat[0]},${endLngLat[1]}&strategy=0`;
          const response = await uni.request({
            url,
            method: "GET"
          });
          if (response.data.status === "1" && response.data.route) {
            const pathSteps = response.data.route.paths[0].steps;
            this.markers = [
              {
                id: 1,
                longitude: startLngLat[0],
                latitude: startLngLat[1],
                title: this.rideRequest.startLoc,
                iconPath: "/static/point_start.png",
                width: 24,
                height: 24
              },
              {
                id: 2,
                longitude: endLngLat[0],
                latitude: endLngLat[1],
                title: this.rideRequest.endLoc,
                iconPath: "/static/point_end.png",
                width: 24,
                height: 24
              }
            ];
            this.polyline = pathSteps.map((step) => ({
              points: step.polyline.split(";").map((coord) => {
                const [lng, lat] = coord.split(",").map(Number);
                return {
                  longitude: lng,
                  latitude: lat
                };
              }),
              color: "#517aff",
              width: 10,
              dottedLine: false
            }));
            this.adjustMapView();
          } else {
            throw new Error("路径规划失败");
          }
        } catch (error) {
          formatAppLog("error", "at pages/customer/OrderModify.vue:344", "路线规划错误:", error);
          uni.showToast({
            title: "路线规划失败",
            icon: "none"
          });
        }
      },
      adjustMapView() {
        let allPoints = [];
        this.markers.forEach((marker) => {
          allPoints.push({
            longitude: marker.longitude,
            latitude: marker.latitude
          });
        });
        this.polyline.forEach((line) => {
          line.points.forEach((point) => {
            allPoints.push(point);
          });
        });
        const bounds = this.calculateBounds(allPoints);
        const centerLng = (bounds.minLng + bounds.maxLng) / 2;
        const centerLat = (bounds.minLat + bounds.maxLat) / 2;
        this.longitude = centerLng;
        this.latitude = centerLat;
        this.scale = this.calculateScale(bounds);
      },
      calculateBounds(points) {
        let minLng = Infinity;
        let maxLng = -Infinity;
        let minLat = Infinity;
        let maxLat = -Infinity;
        points.forEach((p) => {
          minLng = Math.min(minLng, p.longitude);
          maxLng = Math.max(maxLng, p.longitude);
          minLat = Math.min(minLat, p.latitude);
          maxLat = Math.max(maxLat, p.latitude);
        });
        return {
          minLng,
          maxLng,
          minLat,
          maxLat
        };
      },
      calculateScale(bounds) {
        const systemInfo = uni.getSystemInfoSync();
        const widthInPx = systemInfo.windowWidth;
        const deltaLng = bounds.maxLng - bounds.minLng;
        const deltaLat = bounds.maxLat - bounds.minLat;
        const padding = 0.2;
        const paddedDeltaLng = deltaLng * (1 + padding);
        const paddedDeltaLat = deltaLat * (1 + padding);
        const metersPerPixel = (paddedDeltaLng * 111319 + paddedDeltaLat * 110574) / widthInPx;
        const baseZoomLevel = 17;
        let scale = baseZoomLevel - Math.log(metersPerPixel) / Math.LN2;
        return Math.max(3, Math.min(18, Math.floor(scale)));
      },
      getCurrentLocation() {
        uni.getLocation({
          type: "wgs84",
          geocode: true,
          success: (res) => {
            formatAppLog("log", "at pages/customer/OrderModify.vue:419", "定位成功:", res);
            this.currentLocation = res;
            this.longitude = res.longitude;
            this.latitude = res.latitude;
            this.scale = 16;
            this.markers = [{
              id: 1,
              latitude: res.latitude,
              longitude: res.longitude,
              width: 24,
              height: 24,
              iconPath: "/static/current_location.png"
            }];
            if (this.mapContext) {
              this.mapContext.moveToLocation({
                longitude: res.longitude,
                latitude: res.latitude
              });
            }
          },
          fail: (err) => {
            formatAppLog("log", "at pages/customer/OrderModify.vue:440", "定位失败:", err);
            uni.showToast({
              title: "获取地址失败，将导致部分功能不可用",
              icon: "none",
              duration: 2e3
            });
          }
        });
      },
      ToStartLoc() {
        this.setCurrentChangeRequestId(this.id);
        uni.navigateTo({
          url: "/pages/customer/StartLoc",
          animationType: "slide-in-right",
          animationDuration: 300
        });
      },
      ToEndLoc() {
        this.setCurrentChangeRequestId(this.id);
        uni.navigateTo({
          url: "/pages/customer/EndLoc",
          animationType: "slide-in-right",
          animationDuration: 300
        });
      },
      handleSelect(type) {
        this.selectedType = type;
        if (type === "shared") {
          this.setExclusive(false);
        } else {
          this.setExclusive(true);
        }
      },
      showTimePicker() {
        uni.showActionSheet({
          itemList: ["当前时间", "15分钟后", "30分钟后", "1小时后", "自定义时间"],
          success: (res) => {
            if (res.tapIndex === 4) {
              this.showDateTimeInput();
            } else {
              const times = [0, 15, 30, 60];
              this.selectTime(times[res.tapIndex]);
            }
          }
        });
      },
      showDateTimeInput() {
        const now = /* @__PURE__ */ new Date();
        const currentDateTime = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
        uni.showModal({
          title: "自定义出发时间",
          content: `当前时间: ${currentDateTime}
请输入出发时间(YYYY-MM-DD HH:MM)`,
          editable: true,
          placeholderText: "例如: " + this.getTomorrowDate(),
          showCancel: false,
          confirmButtonText: "确定",
          confirmButtonColor: "#007AFF",
          success: (res) => {
            if (res.confirm) {
              this.validateAndSetDateTime(res.content);
            }
          }
        });
      },
      getTomorrowDate() {
        const tomorrow = /* @__PURE__ */ new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return `${tomorrow.getFullYear()}-${(tomorrow.getMonth() + 1).toString().padStart(2, "0")}-${tomorrow.getDate().toString().padStart(2, "0")} 09:00`;
      },
      validateAndSetDateTime(dateTimeStr) {
        const dateTimeRegex = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/;
        if (!dateTimeRegex.test(dateTimeStr)) {
          uni.showToast({
            title: "格式不正确，请使用YYYY-MM-DD HH:MM格式",
            icon: "none"
          });
          return;
        }
        const [_, year, month, day, hours, minutes] = dateTimeStr.match(dateTimeRegex);
        const targetTime = new Date(year, month - 1, day, hours, minutes);
        const now = /* @__PURE__ */ new Date();
        if (isNaN(targetTime.getTime())) {
          uni.showToast({
            title: "日期时间无效",
            icon: "none"
          });
          return;
        }
        if (targetTime < now) {
          uni.showToast({
            title: "时间已过，请选择未来的时间",
            icon: "none"
          });
          return;
        }
        const formattedDate = `${year}年${month}月${day}日 ${hours}:${minutes}`;
        this.selectedTime = formattedDate;
        this.setStartAt(targetTime.toISOString());
        uni.showToast({
          title: `已设置: ${formattedDate}`,
          icon: "success"
        });
      },
      selectTime(minutesLater) {
        this.currentTime.setHours(this.currentTime.getHours() + 8);
        const targetTime1 = new Date(this.currentTime.getTime() + minutesLater * 6e4);
        this.currentTime.setHours(this.currentTime.getHours() - 8);
        const targetTime2 = new Date(this.currentTime.getTime() + minutesLater * 6e4);
        const hours = targetTime2.getHours().toString().padStart(2, "0");
        const minutes = targetTime2.getMinutes().toString().padStart(2, "0");
        if (minutesLater === 0) {
          this.selectedTime = `${this.currentTime.getFullYear()}年${(this.currentTime.getMonth() + 1).toString().padStart(2, "0")}月${this.currentTime.getDate().toString().padStart(2, "0")}日 ${hours}:${minutes}`;
        } else {
          this.selectedTime = `${minutesLater}分钟后 (${hours}:${minutes})`;
        }
        this.setStartAt(targetTime1.toISOString());
      },
      showSeatsInput() {
        uni.showModal({
          title: "选择座位人数",
          content: "请输入需要的座位数（1-7）",
          editable: true,
          placeholderText: "例如: 2",
          showCancel: false,
          confirmButtonText: "确定",
          confirmButtonColor: "#007AFF",
          success: (res) => {
            if (res.confirm) {
              this.validateAndSetSeats(res.content);
            }
          }
        });
      },
      validateAndSetSeats(seatsStr) {
        const seats = parseInt(seatsStr);
        if (isNaN(seats) || seats < 1 || seats > 7) {
          uni.showToast({
            title: "请输入1-7之间的有效人数",
            icon: "none"
          });
          return;
        }
        this.selectedSeats = seats;
        uni.showToast({
          title: `已设置: ${seats}人`,
          icon: "success"
        });
      },
      async publishDemand() {
        try {
          const requestData = {
            startLoc: this.rideRequest.startLoc,
            endLoc: this.rideRequest.endLoc,
            startAt: this.rideRequest.startAt,
            requestId: this.id,
            exclusive: this.rideRequest.exclusive,
            highway: this.rideRequest.highway
          };
          formatAppLog("log", "at pages/customer/OrderModify.vue:606", requestData);
          const response = await uni.request({
            url: `http://10.0.2.2:8083/carsharing/modify-request`,
            method: "POST",
            data: requestData,
            header: {
              "Content-Type": "application/json"
            }
          });
          if (response.data.status === "success") {
            uni.showToast({
              title: "修改成功",
              icon: "success"
            });
            uni.navigateBack({
              delta: 1
            });
          } else {
          }
        } catch (error) {
          formatAppLog("error", "at pages/customer/OrderModify.vue:627", "修改失败:", error);
          uni.showToast({
            title: "修改失败",
            icon: "none"
          });
        }
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_PageHeader = vue.resolveComponent("PageHeader");
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    const _component_ShareOption = vue.resolveComponent("ShareOption");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 悬浮头部 "),
      vue.createVNode(_component_PageHeader, {
        backText: "修改拼车需求",
        backUrl: "/pages/customer/RequestList"
      }),
      vue.createCommentVNode(" 地图部分 "),
      vue.createElementVNode("map", {
        id: "map",
        class: "map-area",
        longitude: $data.longitude,
        latitude: $data.latitude,
        markers: $data.markers,
        polyline: $data.polyline,
        scale: $data.scale,
        "show-location": "",
        onReady: _cache[0] || (_cache[0] = (...args) => $options.onMapReady && $options.onMapReady(...args))
      }, null, 40, ["longitude", "latitude", "markers", "polyline", "scale"]),
      vue.createCommentVNode(" 定位按钮 "),
      vue.createElementVNode("cover-view", {
        class: "locate-button1",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.getCurrentLocation && $options.getCurrentLocation(...args))
      }),
      vue.createElementVNode("cover-view", {
        class: "locate-button2",
        onClick: _cache[2] || (_cache[2] = (...args) => $options.getCurrentLocation && $options.getCurrentLocation(...args))
      }),
      vue.createCommentVNode(" 浮动详情部分 "),
      vue.createElementVNode("view", { class: "floating-details" }, [
        vue.createElementVNode("view", { class: "start_end_loc" }, [
          vue.createElementVNode("view", { class: "first-row" }, [
            vue.createElementVNode("view", {
              class: "location-select",
              style: { "display": "flex", "flex-direction": "column", "width": "65%" }
            }, [
              vue.createElementVNode("view", {
                class: "location-row start",
                onClick: _cache[3] || (_cache[3] = (...args) => $options.ToStartLoc && $options.ToStartLoc(...args))
              }, [
                vue.createElementVNode("view", { class: "icon start-icon" }),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["location-text", { "selected": this.rideRequest.startLoc }])
                  },
                  vue.toDisplayString(this.rideRequest.startLoc ? this.rideRequest.startLoc : "您从哪儿上车"),
                  3
                  /* TEXT, CLASS */
                )
              ]),
              vue.createElementVNode("view", {
                class: "location-row end",
                onClick: _cache[4] || (_cache[4] = (...args) => $options.ToEndLoc && $options.ToEndLoc(...args))
              }, [
                vue.createElementVNode("view", { class: "icon end-icon" }),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["location-text", { "selected": this.rideRequest.endLoc }])
                  },
                  vue.toDisplayString(this.rideRequest.endLoc ? this.rideRequest.endLoc : "您要到哪儿去"),
                  3
                  /* TEXT, CLASS */
                )
              ])
            ]),
            vue.createElementVNode("view", {
              class: "time-seats-select",
              style: { "display": "flex", "flex-direction": "column", "width": "35%" }
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["time-selector", { "has-time": $data.selectedTime }]),
                  onClick: _cache[6] || (_cache[6] = (...args) => $options.showTimePicker && $options.showTimePicker(...args))
                },
                [
                  vue.createElementVNode("view", { style: { "color": "var(--color-blue)", "font-size": "11px", "font-weight": "bold", "display": "flex", "flex-direction": "row" } }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "compose",
                      color: "var(--color-blue);",
                      style: { "margin-right": "3px" },
                      size: "16"
                    }),
                    vue.createTextVNode(" 出发时间 "),
                    vue.createElementVNode("view", {
                      class: "modify-text",
                      onClick: _cache[5] || (_cache[5] = (...args) => $options.showTimePicker && $options.showTimePicker(...args))
                    }, "(修改时间)")
                  ]),
                  vue.createElementVNode(
                    "view",
                    { class: "time-text" },
                    vue.toDisplayString($data.selectedTime),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["seats-selector", { "has-seats": $data.selectedSeats }]),
                  onClick: _cache[8] || (_cache[8] = (...args) => $options.showSeatsInput && $options.showSeatsInput(...args))
                },
                [
                  vue.createElementVNode("view", { style: { "color": "var(--color-blue)", "font-size": "11px", "font-weight": "bold", "display": "flex", "flex-direction": "row" } }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "person",
                      color: "var(--color-blue);",
                      style: { "margin-right": "3px" },
                      size: "16"
                    }),
                    vue.createTextVNode(" 座位人数 "),
                    vue.createElementVNode("view", {
                      class: "modify-text",
                      onClick: _cache[7] || (_cache[7] = (...args) => $options.showSeatsInput && $options.showSeatsInput(...args))
                    }, "(修改人数)")
                  ]),
                  vue.createElementVNode(
                    "view",
                    { class: "seats-text" },
                    vue.toDisplayString($data.selectedSeats + "人"),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["highway-selector", { "has-highway": $data.highway }])
                },
                [
                  vue.createElementVNode("view", { style: { "color": "var(--color-blue)", "font-size": "11px", "font-weight": "bold", "display": "flex", "flex-direction": "row", "align-items": "center" } }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "flag",
                      color: "var(--color-blue);",
                      style: { "margin-right": "3px" },
                      size: "16"
                    }),
                    vue.createTextVNode(" 愿意协商高速费 "),
                    vue.createElementVNode("checkbox", {
                      checked: $data.highway,
                      onClick: _cache[9] || (_cache[9] = ($event) => this.toggleHighway()),
                      style: { "margin-left": "4px" }
                    }, null, 8, ["checked"])
                  ])
                ],
                2
                /* CLASS */
              )
            ])
          ]),
          vue.createElementVNode("view", { class: "second-row" }, [
            vue.createElementVNode("view", { class: "share-option" }, [
              vue.createVNode(_component_ShareOption, {
                type: "shared",
                isSelected: $data.selectedType === "shared",
                onSelect: $options.handleSelect
              }, null, 8, ["isSelected", "onSelect"]),
              vue.createVNode(_component_ShareOption, {
                type: "exclusive",
                isSelected: $data.selectedType === "exclusive",
                onSelect: $options.handleSelect
              }, null, 8, ["isSelected", "onSelect"])
            ]),
            vue.createElementVNode("view", {
              class: "publish-button",
              onClick: _cache[10] || (_cache[10] = (...args) => $options.publishDemand && $options.publishDemand(...args))
            }, "修 改")
          ])
        ])
      ])
    ]);
  }
  const PagesCustomerOrderModify = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-8acb5000"], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/customer/OrderModify.vue"]]);
  const _sfc_main$5 = {
    name: "OrderCancelSuccess",
    props: {
      time: String,
      start: String,
      end: String
    },
    methods: {
      goToCustomer() {
        uni.switchTab({
          url: "/pages/customer/customer",
          // 注意开头斜杠
          fail: (err) => {
            formatAppLog("error", "at components/OrderCancelSuccess.vue:43", "跳转失败：", err);
          }
        });
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("cover-view", { class: "container" }, [
      vue.createElementVNode("cover-view", { class: "title-section" }, [
        vue.createElementVNode("cover-view", { class: "title" }, "订单取消成功"),
        vue.createElementVNode("cover-view", { class: "fee-note" }, "无需支付手续费")
      ]),
      vue.createElementVNode("cover-view", { class: "subtitle" }, "订单已取消，您可以重新拼车。"),
      vue.createElementVNode("cover-view", { class: "time-section" }, [
        vue.createElementVNode("cover-view", { class: "icon" }, "🕒"),
        vue.createElementVNode(
          "cover-view",
          { class: "time" },
          vue.toDisplayString($props.time),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("cover-view", { class: "location-section" }, [
        vue.createElementVNode("cover-view", { class: "location-item" }, [
          vue.createElementVNode("cover-view", { class: "dot green" }),
          vue.createElementVNode(
            "cover-view",
            { class: "location-text" },
            vue.toDisplayString($props.start),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("cover-view", { class: "location-item" }, [
          vue.createElementVNode("cover-view", { class: "dot red" }),
          vue.createElementVNode(
            "cover-view",
            { class: "location-text" },
            vue.toDisplayString($props.end),
            1
            /* TEXT */
          )
        ])
      ]),
      vue.createElementVNode("cover-view", {
        class: "btn",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.goToCustomer && $options.goToCustomer(...args))
      }, "重新拼车")
    ]);
  }
  const ComponentsOrderCancelSuccess = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-99c7da38"], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/components/OrderCancelSuccess.vue"]]);
  const _sfc_main$4 = {
    name: "OrderCompleteCard",
    props: {
      income: {
        type: [String, Number],
        default: "0.0"
      },
      avatarUrl: {
        type: String,
        default: "/static/default_avatar.png"
      },
      phoneTail: {
        type: String,
        default: "0000"
      },
      orderTime: {
        type: String,
        default: "今天 00:00 - 00:00"
      },
      startLocation: {
        type: String,
        default: "起点"
      },
      endLocation: {
        type: String,
        default: "终点"
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "order-complete-card-cover" }, [
      vue.createElementVNode("view", { class: "order-complete-card" }, [
        vue.createElementVNode("view", { class: "header" }, [
          vue.createElementVNode("view", { class: "status" }, "拼车订单已完成"),
          vue.createElementVNode("view", { class: "income" }, [
            vue.createElementVNode("view", null, "收入"),
            vue.createElementVNode(
              "view",
              { class: "amount" },
              vue.toDisplayString($props.income),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", null, "元")
          ])
        ]),
        vue.createElementVNode("view", { class: "passenger-info" }, [
          vue.createElementVNode("cover-image", {
            class: "avatar",
            src: $props.avatarUrl,
            mode: "aspectFill"
          }, null, 8, ["src"]),
          vue.createElementVNode("view", { class: "details" }, [
            vue.createElementVNode("view", { class: "name-rating" }, [
              vue.createElementVNode(
                "view",
                { class: "name" },
                "尾号" + vue.toDisplayString($props.phoneTail),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode(
              "view",
              { class: "time" },
              vue.toDisplayString($props.orderTime),
              1
              /* TEXT */
            )
          ])
        ]),
        vue.createElementVNode("view", { class: "trip-details" }, [
          vue.createElementVNode("view", { class: "location-item" }, [
            vue.createElementVNode("view", { class: "dot green" }),
            vue.createElementVNode(
              "view",
              { class: "location-text" },
              vue.toDisplayString($props.startLocation),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "line-connector" }),
          vue.createElementVNode("view", { class: "location-item" }, [
            vue.createElementVNode("view", { class: "dot red" }),
            vue.createElementVNode(
              "view",
              { class: "location-text" },
              vue.toDisplayString($props.endLocation),
              1
              /* TEXT */
            )
          ])
        ])
      ])
    ]);
  }
  const OrderCompleteCard = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-5f958676"], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/components/OrderCompleteCard.vue"]]);
  const _sfc_main$3 = {
    components: {
      OrderCompleteCard,
      PageHeader: ComponentsPageHeader
    },
    data() {
      const app = getApp();
      return {
        orderInfo: {
          income: "0",
          avatarUrl: "/static/default-avatar.png",
          phoneTail: "0000",
          rating: null,
          orderTime: "未知时间",
          startLocation: "未知地点",
          startDistance: "0",
          endLocation: "未知地点",
          endDistance: "0"
        },
        longitude: app.globalData.my_location_longitude || 116.397428,
        latitude: app.globalData.my_location_latitude || 39.90923,
        api_key: app.globalData.api_key,
        scale: 16,
        markers: [],
        polyline: [],
        mapContext: null,
        startPoint: null,
        endPoint: null,
        currentLocation: null
      };
    },
    methods: {
      onMapReady() {
        this.mapContext = uni.createMapContext("map", this);
        if (this.startPoint && this.endPoint) {
          this.getDrivingRoute(this.startPoint, this.endPoint);
        }
      },
      async geocodeAddress(address) {
        return new Promise((resolve, reject) => {
          const geocodeUrl = `https://restapi.amap.com/v3/geocode/geo?address=${encodeURIComponent(address)}&output=json&key=${this.api_key}`;
          uni.request({
            url: geocodeUrl,
            method: "GET",
            success: (res) => {
              if (res.data.status === "1" && res.data.geocodes && res.data.geocodes.length > 0) {
                const location = res.data.geocodes[0].location.split(",");
                const lngLat = [parseFloat(location[0]), parseFloat(location[1])];
                resolve(lngLat);
              } else {
                reject("地理编码失败：未找到该地点");
              }
            },
            fail: (error) => {
              reject(`地理编码请求失败：${error}`);
            }
          });
        });
      },
      async getDrivingRoute(startLngLat, endLngLat) {
        if (!startLngLat || !endLngLat)
          return;
        try {
          const url = `https://restapi.amap.com/v3/direction/driving?key=${this.api_key}&origin=${startLngLat[0]},${startLngLat[1]}&destination=${endLngLat[0]},${endLngLat[1]}&strategy=0`;
          const response = await uni.request({
            url,
            method: "GET"
          });
          if (response.data.status === "1" && response.data.route) {
            const pathSteps = response.data.route.paths[0].steps;
            this.markers = [
              {
                id: 1,
                longitude: startLngLat[0],
                latitude: startLngLat[1],
                title: this.orderInfo.startLocation,
                iconPath: "/static/point_start.png",
                width: 24,
                height: 24
              },
              {
                id: 2,
                longitude: endLngLat[0],
                latitude: endLngLat[1],
                title: this.orderInfo.endLocation,
                iconPath: "/static/point_end.png",
                width: 24,
                height: 24
              }
            ];
            this.polyline = pathSteps.map((step) => ({
              points: step.polyline.split(";").map((coord) => {
                const [lng, lat] = coord.split(",").map(Number);
                return {
                  longitude: lng,
                  latitude: lat
                };
              }),
              color: "#517aff",
              width: 10,
              dottedLine: false
            }));
            this.adjustMapView();
          } else {
            throw new Error("路径规划失败");
          }
        } catch (error) {
          formatAppLog("error", "at pages/driver/OrderCompleteDisplayPage.vue:156", "路线规划错误:", error);
          uni.showToast({
            title: "路线规划失败",
            icon: "none"
          });
        }
      },
      adjustMapView() {
        let allPoints = [];
        this.markers.forEach((marker) => {
          allPoints.push({
            longitude: marker.longitude,
            latitude: marker.latitude
          });
        });
        this.polyline.forEach((line) => {
          line.points.forEach((point) => {
            allPoints.push(point);
          });
        });
        const bounds = this.calculateBounds(allPoints);
        const centerLng = (bounds.minLng + bounds.maxLng) / 2;
        const centerLat = (bounds.minLat + bounds.maxLat) / 2;
        this.longitude = centerLng;
        this.latitude = centerLat;
        this.scale = this.calculateScale(bounds);
      },
      calculateBounds(points) {
        let minLng = Infinity;
        let maxLng = -Infinity;
        let minLat = Infinity;
        let maxLat = -Infinity;
        points.forEach((p) => {
          minLng = Math.min(minLng, p.longitude);
          maxLng = Math.max(maxLng, p.longitude);
          minLat = Math.min(minLat, p.latitude);
          maxLat = Math.max(maxLat, p.latitude);
        });
        return {
          minLng,
          maxLng,
          minLat,
          maxLat
        };
      },
      calculateScale(bounds) {
        const systemInfo = uni.getSystemInfoSync();
        const widthInPx = systemInfo.windowWidth;
        const deltaLng = bounds.maxLng - bounds.minLng;
        const deltaLat = bounds.maxLat - bounds.minLat;
        const padding = 0.2;
        const paddedDeltaLng = deltaLng * (1 + padding);
        const paddedDeltaLat = deltaLat * (1 + padding);
        const metersPerPixel = (paddedDeltaLng * 111319 + paddedDeltaLat * 110574) / widthInPx;
        const baseZoomLevel = 17;
        let scale = baseZoomLevel - Math.log(metersPerPixel) / Math.LN2;
        return Math.max(3, Math.min(18, Math.floor(scale)));
      },
      getCurrentLocation() {
        const that = this;
        uni.getLocation({
          type: "wgs84",
          geocode: true,
          success: function(res) {
            that.currentLocation = res;
            that.longitude = res.longitude;
            that.latitude = res.latitude;
            that.scale = 16;
            that.markers = [
              ...that.markers.filter((marker) => marker.id !== 3),
              {
                id: 3,
                latitude: res.latitude,
                longitude: res.longitude,
                width: 24,
                height: 24,
                iconPath: "/static/current_location.png"
              }
            ];
            if (that.mapContext) {
              that.mapContext.moveToLocation({
                longitude: res.longitude,
                latitude: res.latitude
              });
            }
          },
          fail: function(err) {
            formatAppLog("log", "at pages/driver/OrderCompleteDisplayPage.vue:251", "定位失败:", err);
            uni.showToast({
              title: "获取位置失败",
              icon: "none",
              duration: 2e3
            });
          }
        });
      },
      async initializeMapRoute() {
        try {
          if (this.orderInfo.startLocation && this.orderInfo.endLocation) {
            this.startPoint = await this.geocodeAddress(this.orderInfo.startLocation);
            this.endPoint = await this.geocodeAddress(this.orderInfo.endLocation);
            await this.getDrivingRoute(this.startPoint, this.endPoint);
          } else {
            throw new Error("起点或终点地址缺失");
          }
        } catch (error) {
          formatAppLog("error", "at pages/driver/OrderCompleteDisplayPage.vue:270", "初始化地图路线失败:", error);
          uni.showToast({
            title: "加载路线失败，请检查地址",
            icon: "none",
            duration: 2e3
          });
          this.markers = [];
          this.polyline = [];
          this.getCurrentLocation();
        }
      },
      handleMapMessage(e) {
        formatAppLog("log", "at pages/driver/OrderCompleteDisplayPage.vue:282", "Map message from OrderCompleteDisplayPage:", e);
      }
    },
    onLoad() {
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.on("acceptOrderData", (data) => {
        this.orderInfo = {
          income: data.income || "0",
          avatarUrl: data.avatarUrl || "/static/default-avatar.png",
          phoneTail: data.phoneTail || "0000",
          rating: data.rating != null ? Number(data.rating) : null,
          orderTime: data.orderTime || "未知时间",
          startLocation: data.startLocation || "未知地点",
          startDistance: data.startDistance || "0",
          endLocation: data.endLocation || "未知地点",
          endDistance: data.endDistance || "0"
        };
        this.initializeMapRoute();
      });
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_PageHeader = vue.resolveComponent("PageHeader");
    const _component_OrderCompleteCard = vue.resolveComponent("OrderCompleteCard");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 悬浮头部 "),
      vue.createVNode(_component_PageHeader, {
        backText: "订单已完成",
        backUrl: "/pages/driver/driver_search"
      }),
      vue.createCommentVNode(" 地图容器 "),
      vue.createElementVNode("map", {
        id: "map",
        class: "map-area",
        longitude: $data.longitude,
        latitude: $data.latitude,
        markers: $data.markers,
        polyline: $data.polyline,
        scale: $data.scale,
        "show-location": "",
        onReady: _cache[0] || (_cache[0] = (...args) => $options.onMapReady && $options.onMapReady(...args))
      }, null, 40, ["longitude", "latitude", "markers", "polyline", "scale"]),
      vue.createCommentVNode(" 定位按钮 "),
      vue.createElementVNode("cover-view", {
        class: "locate-button1",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.getCurrentLocation && $options.getCurrentLocation(...args))
      }),
      vue.createElementVNode("cover-view", {
        class: "locate-button2",
        onClick: _cache[2] || (_cache[2] = (...args) => $options.getCurrentLocation && $options.getCurrentLocation(...args))
      }),
      vue.createCommentVNode(" 浮动详情 "),
      vue.createElementVNode("view", { class: "floating-details" }, [
        vue.createVNode(_component_OrderCompleteCard, {
          income: $data.orderInfo.income,
          avatarUrl: $data.orderInfo.avatarUrl,
          phoneTail: $data.orderInfo.phoneTail,
          rating: $data.orderInfo.rating,
          orderTime: $data.orderInfo.orderTime,
          startLocation: $data.orderInfo.startLocation,
          startDistance: $data.orderInfo.startDistance,
          endLocation: $data.orderInfo.endLocation,
          endDistance: $data.orderInfo.endDistance
        }, null, 8, ["income", "avatarUrl", "phoneTail", "rating", "orderTime", "startLocation", "startDistance", "endLocation", "endDistance"])
      ])
    ]);
  }
  const PagesDriverOrderCompleteDisplayPage = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-ecb2c404"], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/driver/OrderCompleteDisplayPage.vue"]]);
  const _imports_0 = "/static/phone-icon.png";
  const _sfc_main$2 = {
    name: "RideInfoCard",
    props: {
      detourPercentage: {
        type: [String, Number]
      },
      extraDistance: {
        type: [String, Number],
        default: "0"
      },
      extraTime: {
        type: [String, Number],
        default: "0"
      },
      avatarUrl: {
        type: String,
        default: "/static/default-avatar.png"
      },
      phoneTail: {
        type: String,
        default: "0000"
      },
      orderTime: {
        type: String,
        default: "时间未提供"
      },
      startLocation: {
        type: String,
        default: "起点未提供"
      },
      endLocation: {
        type: String,
        default: "终点未提供"
      }
    },
    methods: {
      makePhoneCall() {
        formatAppLog("log", "at components/RideInfoCard.vue:90", "Phone call action triggered for driver " + this.phoneTail);
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "ride-info-card" }, [
      vue.createCommentVNode(" Top Section: Detour Info "),
      vue.createElementVNode("view", { class: "top-section" }, [
        $props.detourPercentage ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "detour-info"
        }, [
          vue.createElementVNode(
            "view",
            { class: "percentage" },
            vue.toDisplayString($props.detourPercentage) + "%",
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "detour-text" }, "顺路")
        ])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "extra-info" }, [
          vue.createElementVNode("view", null, "起点距离您目前约"),
          vue.createElementVNode(
            "view",
            { class: "value" },
            vue.toDisplayString($props.extraDistance) + "公里",
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", null, ",需"),
          vue.createElementVNode(
            "view",
            { class: "value" },
            vue.toDisplayString($props.extraTime) + "分钟",
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", null, "到达")
        ])
      ]),
      vue.createCommentVNode(" Middle Section: Driver Info "),
      vue.createElementVNode("view", { class: "middle-section" }, [
        vue.createElementVNode("view", { class: "driver-main-info" }, [
          vue.createElementVNode("cover-image", {
            src: $props.avatarUrl,
            class: "avatar"
          }, null, 8, ["src"]),
          vue.createElementVNode("view", { class: "driver-text-details" }, [
            vue.createElementVNode("view", { class: "driver-name-rating-line" }, [
              vue.createElementVNode(
                "view",
                { class: "driver-name" },
                "尾号" + vue.toDisplayString($props.phoneTail),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode(
              "view",
              { class: "order-time" },
              vue.toDisplayString($props.orderTime),
              1
              /* TEXT */
            )
          ])
        ]),
        vue.createElementVNode("view", {
          class: "phone-action",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.makePhoneCall && $options.makePhoneCall(...args))
        }, [
          vue.createElementVNode("cover-image", {
            src: _imports_0,
            class: "phone-icon"
          })
        ])
      ]),
      vue.createCommentVNode(" Trip Details Section "),
      vue.createElementVNode("view", { class: "trip-details-section" }, [
        vue.createElementVNode("view", { class: "location-item" }, [
          vue.createElementVNode("view", { class: "dot green" }),
          vue.createElementVNode("view", { class: "location-text-group" }, [
            vue.createElementVNode(
              "view",
              { class: "location-name" },
              vue.toDisplayString($props.startLocation),
              1
              /* TEXT */
            )
          ])
        ]),
        vue.createElementVNode("view", { class: "location-separator" }),
        vue.createElementVNode("view", { class: "location-item" }, [
          vue.createElementVNode("view", { class: "dot red" }),
          vue.createElementVNode("view", { class: "location-text-group" }, [
            vue.createElementVNode(
              "view",
              { class: "location-name" },
              vue.toDisplayString($props.endLocation),
              1
              /* TEXT */
            )
          ])
        ])
      ])
    ]);
  }
  const RideInfoCard = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-ba2aed4b"], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/components/RideInfoCard.vue"]]);
  const _sfc_main$1 = {
    components: {
      RideInfoCard,
      PageHeader: ComponentsPageHeader
    },
    data() {
      const app = getApp();
      return {
        requestId: null,
        countdown: 10,
        isAccepting: false,
        rideData: {
          detourPercentage: null,
          extraDistance: null,
          extraTime: null,
          avatarUrl: null,
          phoneTail: null,
          rating: null,
          orderTime: null,
          startLocation: null,
          startDistance: null,
          endLocation: null,
          endDistance: null,
          price: null
        },
        longitude: app.globalData.my_location_longitude || 116.397428,
        latitude: app.globalData.my_location_latitude || 39.90923,
        api_key: "YylCDEyDLCtKCqASXVz7mXtoXLTHsn6D",
        scale: 16,
        markers: [],
        polyline: [],
        mapContext: null,
        startPoint: null,
        endPoint: null,
        currentLocation: null
      };
    },
    methods: {
      onMapReady() {
        this.mapContext = uni.createMapContext("map", this);
        if (this.startPoint && this.endPoint) {
          this.getDrivingRoute(this.startPoint, this.endPoint);
        }
      },
      async geocodeAddress(address) {
        return new Promise((resolve, reject) => {
          const geocodeUrl = `https://restapi.amap.com/v3/geocode/geo?address=${encodeURIComponent(address)}&output=json&key=${this.api_key}`;
          uni.request({
            url: geocodeUrl,
            method: "GET",
            success: (res) => {
              if (res.data.status === "1" && res.data.geocodes && res.data.geocodes.length > 0) {
                const location = res.data.geocodes[0].location.split(",");
                const lngLat = [parseFloat(location[0]), parseFloat(location[1])];
                resolve(lngLat);
              } else {
                reject("地理编码失败：未找到该地点");
              }
            },
            fail: (error) => {
              reject(`地理编码请求失败：${error}`);
            }
          });
        });
      },
      async getDrivingRoute(startLngLat, endLngLat) {
        if (!startLngLat || !endLngLat)
          return;
        try {
          const url = `https://restapi.amap.com/v3/direction/driving?key=${this.api_key}&origin=${startLngLat[0]},${startLngLat[1]}&destination=${endLngLat[0]},${endLngLat[1]}&strategy=0`;
          const response = await uni.request({
            url,
            method: "GET"
          });
          if (response.data.status === "1" && response.data.route) {
            const pathSteps = response.data.route.paths[0].steps;
            this.markers = [
              {
                id: 1,
                longitude: startLngLat[0],
                latitude: startLngLat[1],
                title: this.rideData.startLocation,
                iconPath: "/static/point_start.png",
                width: 24,
                height: 24
              },
              {
                id: 2,
                longitude: endLngLat[0],
                latitude: endLngLat[1],
                title: this.rideData.endLocation,
                iconPath: "/static/point_end.png",
                width: 24,
                height: 24
              }
            ];
            this.polyline = pathSteps.map((step) => ({
              points: step.polyline.split(";").map((coord) => {
                const [lng, lat] = coord.split(",").map(Number);
                return {
                  longitude: lng,
                  latitude: lat
                };
              }),
              color: "#517aff",
              width: 10,
              dottedLine: false
            }));
            this.adjustMapView();
          } else {
            throw new Error("路径规划失败");
          }
        } catch (error) {
          formatAppLog("error", "at pages/driver/RideInfoDisplayPage.vue:183", "路线规划错误:", error);
          uni.showToast({
            title: "路线规划失败",
            icon: "none"
          });
        }
      },
      adjustMapView() {
        let allPoints = [];
        this.markers.forEach((marker) => {
          allPoints.push({
            longitude: marker.longitude,
            latitude: marker.latitude
          });
        });
        this.polyline.forEach((line) => {
          line.points.forEach((point) => {
            allPoints.push(point);
          });
        });
        const bounds = this.calculateBounds(allPoints);
        const centerLng = (bounds.minLng + bounds.maxLng) / 2;
        const centerLat = (bounds.minLat + bounds.maxLat) / 2;
        this.longitude = centerLng;
        this.latitude = centerLat;
        this.scale = this.calculateScale(bounds);
      },
      calculateBounds(points) {
        let minLng = Infinity;
        let maxLng = -Infinity;
        let minLat = Infinity;
        let maxLat = -Infinity;
        points.forEach((p) => {
          minLng = Math.min(minLng, p.longitude);
          maxLng = Math.max(maxLng, p.longitude);
          minLat = Math.min(minLat, p.latitude);
          maxLat = Math.max(maxLat, p.latitude);
        });
        return {
          minLng,
          maxLng,
          minLat,
          maxLat
        };
      },
      calculateScale(bounds) {
        const systemInfo = uni.getSystemInfoSync();
        const widthInPx = systemInfo.windowWidth;
        const deltaLng = bounds.maxLng - bounds.minLng;
        const deltaLat = bounds.maxLat - bounds.minLat;
        const padding = 0.2;
        const paddedDeltaLng = deltaLng * (1 + padding);
        const paddedDeltaLat = deltaLat * (1 + padding);
        const metersPerPixel = (paddedDeltaLng * 111319 + paddedDeltaLat * 110574) / widthInPx;
        const baseZoomLevel = 17;
        let scale = baseZoomLevel - Math.log(metersPerPixel) / Math.LN2;
        return Math.max(3, Math.min(18, Math.floor(scale)));
      },
      getCurrentLocation() {
        return new Promise((resolve, reject) => {
          uni.getLocation({
            type: "wgs84",
            geocode: true,
            success: (res) => {
              this.currentLocation = res;
              this.longitude = res.longitude;
              this.latitude = res.latitude;
              this.scale = 16;
              this.markers = [
                ...this.markers.filter((marker) => marker.id !== 3),
                {
                  id: 3,
                  latitude: res.latitude,
                  longitude: res.longitude,
                  width: 24,
                  height: 24,
                  iconPath: "/static/current_location.png"
                }
              ];
              if (this.mapContext) {
                this.mapContext.moveToLocation({
                  longitude: res.longitude,
                  latitude: res.latitude
                });
              }
              resolve([res.latitude, res.longitude]);
            },
            fail: (err) => {
              formatAppLog("log", "at pages/driver/RideInfoDisplayPage.vue:279", "定位失败:", err);
              uni.showToast({
                title: "获取位置失败",
                icon: "none",
                duration: 2e3
              });
              reject(err);
            }
          });
        });
      },
      async calculateDistance(lat1, lng1, lat2, lng2) {
        const toRad = (angle) => angle * (Math.PI / 180);
        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLng = toRad(lng2 - lng1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return parseFloat(distance.toFixed(3));
      },
      async initializeMapRoute() {
        try {
          if (this.rideData.startLocation && this.rideData.endLocation) {
            this.startPoint = await this.geocodeAddress(this.rideData.startLocation);
            this.endPoint = await this.geocodeAddress(this.rideData.endLocation);
            await this.getDrivingRoute(this.startPoint, this.endPoint);
          } else {
            throw new Error("起点或终点地址缺失");
          }
        } catch (error) {
          formatAppLog("error", "at pages/driver/RideInfoDisplayPage.vue:312", "初始化地图路线失败:", error);
          uni.showToast({
            title: "加载路线失败，请检查地址",
            icon: "none",
            duration: 2e3
          });
          this.markers = [];
          this.polyline = [];
          this.getCurrentLocation();
        }
      },
      handleAcceptOrder() {
        if (this.isAccepting)
          return;
        this.isAccepting = true;
        this.countdown = 10;
        const timer = setInterval(() => {
          this.countdown--;
          if (this.countdown <= 0) {
            clearInterval(timer);
            uni.navigateTo({
              url: "/pages/driver/OrderCompleteDisplayPage",
              success: (res) => {
                res.eventChannel.emit("acceptOrderData", {
                  startLocation: this.rideData.startLocation,
                  endLocation: this.rideData.endLocation,
                  orderTime: this.rideData.orderTime,
                  phoneTail: this.rideData.phoneTail,
                  avatarUrl: this.rideData.avatarUrl,
                  income: this.rideData.price
                });
              }
            });
          }
        }, 1e3);
      },
      async fetchOrderDetails() {
        try {
          const response = await uni.request({
            url: `http://10.0.2.2:8083/carsharing/get-certain-request?requestId=${this.requestId}`,
            method: "GET",
            header: {
              "Content-Type": "application/json"
            }
          });
          const responseData = response.data;
          formatAppLog("log", "at pages/driver/RideInfoDisplayPage.vue:360", responseData);
          if (responseData && responseData.data && responseData.data.length > 0) {
            let extraDistance = null;
            if (responseData.data[0].startLoc) {
              try {
                const startCoords = await this.geocodeAddress(responseData.data[0].startLoc);
                const currentLocation = await this.getCurrentLocation();
                extraDistance = await this.calculateDistance(
                  currentLocation[0],
                  currentLocation[1],
                  // Current lat, lng
                  startCoords[1],
                  startCoords[0]
                  // Start location lat, lng
                );
              } catch (error) {
                formatAppLog("error", "at pages/driver/RideInfoDisplayPage.vue:373", "计算额外距离失败:", error);
                extraDistance = "未知";
              }
            }
            this.rideData = {
              detourPercentage: responseData.data[0].detourPercentage || null,
              extraDistance,
              extraTime: responseData.data[0].extraTime || null,
              avatarUrl: responseData.data[0].avatar || "/static/default-avatar.png",
              phoneTail: responseData.data[0].phone ? responseData.data[0].phone.slice(-4) : "0000",
              rating: responseData.data[0].rating != null ? Number(responseData.data[0].rating) : null,
              orderTime: responseData.data[0].startAt || "未知时间",
              startLocation: responseData.data[0].startLoc || "未知地点",
              startDistance: responseData.data[0].startDistance || null,
              endLocation: responseData.data[0].endLoc || "未知地点",
              endDistance: responseData.data[0].endDistance || null,
              price: responseData.data[0].price || "0",
              exclusive: responseData.data[0].exclusive,
              highway: responseData.data[0].highway
            };
            await this.initializeMapRoute();
          } else {
            uni.showToast({
              title: "获取订单详情失败",
              icon: "none"
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/driver/RideInfoDisplayPage.vue:402", "获取订单详情失败:", error);
          uni.showToast({
            title: "获取订单详情失败",
            icon: "none"
          });
        }
      },
      handleMapMessage(e) {
        formatAppLog("log", "at pages/driver/RideInfoDisplayPage.vue:410", "Map message from RideInfoDisplayPage.vue:", e);
      }
    },
    onLoad(options) {
      if (options.id) {
        this.requestId = options.id;
        formatAppLog("log", "at pages/driver/RideInfoDisplayPage.vue:416", this.requestId);
        this.fetchOrderDetails();
      } else {
        uni.showToast({
          title: "订单ID不存在",
          icon: "none"
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_PageHeader = vue.resolveComponent("PageHeader");
    const _component_RideInfoCard = vue.resolveComponent("RideInfoCard");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 悬浮头部 "),
      vue.createVNode(_component_PageHeader, {
        backText: "需求详情",
        backUrl: "/pages/driver/driver_search"
      }),
      vue.createCommentVNode(" 地图容器 "),
      vue.createElementVNode("map", {
        id: "map",
        class: "map-area",
        longitude: $data.longitude,
        latitude: $data.latitude,
        markers: $data.markers,
        polyline: $data.polyline,
        scale: $data.scale,
        "show-location": "",
        onReady: _cache[0] || (_cache[0] = (...args) => $options.onMapReady && $options.onMapReady(...args))
      }, null, 40, ["longitude", "latitude", "markers", "polyline", "scale"]),
      vue.createCommentVNode(" 定位按钮 "),
      vue.createElementVNode("cover-view", {
        class: "locate-button1",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.getCurrentLocation && $options.getCurrentLocation(...args))
      }),
      vue.createElementVNode("cover-view", {
        class: "locate-button2",
        onClick: _cache[2] || (_cache[2] = (...args) => $options.getCurrentLocation && $options.getCurrentLocation(...args))
      }),
      vue.createCommentVNode(" 浮动详情 "),
      vue.createElementVNode("view", { class: "floating-details" }, [
        vue.createCommentVNode(" RideInfoCard "),
        vue.createElementVNode("view", { class: "ride-info-card-shell" }, [
          vue.createVNode(_component_RideInfoCard, {
            detourPercentage: $data.rideData.detourPercentage,
            extraDistance: $data.rideData.extraDistance,
            extraTime: $data.rideData.extraTime,
            avatarUrl: $data.rideData.avatarUrl,
            phoneTail: $data.rideData.phoneTail,
            rating: $data.rideData.rating,
            orderTime: $data.rideData.orderTime,
            startLocation: $data.rideData.startLocation,
            startDistance: $data.rideData.startDistance,
            endLocation: $data.rideData.endLocation,
            endDistance: $data.rideData.endDistance
          }, null, 8, ["detourPercentage", "extraDistance", "extraTime", "avatarUrl", "phoneTail", "rating", "orderTime", "startLocation", "startDistance", "endLocation", "endDistance"])
        ]),
        vue.createCommentVNode(" 底部操作栏 "),
        vue.createElementVNode("view", { class: "bottom-action-bar" }, [
          vue.createElementVNode("view", { class: "action-income-display" }, [
            vue.createElementVNode("view", null, "收入"),
            vue.createElementVNode(
              "view",
              { class: "income-amount" },
              vue.toDisplayString($data.rideData.price),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", null, "元")
          ]),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["action-button", { "accepting": $data.isAccepting }]),
              onClick: _cache[3] || (_cache[3] = (...args) => $options.handleAcceptOrder && $options.handleAcceptOrder(...args))
            },
            vue.toDisplayString($data.isAccepting ? `订单进行中(${$data.countdown}s)` : "接单"),
            3
            /* TEXT, CLASS */
          )
        ])
      ])
    ]);
  }
  const PagesDriverRideInfoDisplayPage = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-7bce6222"], ["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/pages/driver/RideInfoDisplayPage.vue"]]);
  __definePage("pages/customer/customer_new", PagesCustomerCustomerNew);
  __definePage("pages/customer/customer", PagesCustomerCustomer);
  __definePage("pages/my/login/passwordLogin", PagesMyLoginPasswordLogin);
  __definePage("pages/driver/driver", PagesDriverDriver);
  __definePage("pages/my/change/change", PagesMyChangeChange);
  __definePage("pages/driver/car-owner", PagesDriverCarOwner);
  __definePage("pages/driver/driver_search", PagesDriverDriverSearch);
  __definePage("pages/driver/search-result", PagesDriverSearchResult);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/my/my", PagesMyMy);
  __definePage("components/PageHeader", ComponentsPageHeader);
  __definePage("components/PageHeader_cover", ComponentsPageHeaderCover);
  __definePage("pages/customer/InvitationMatch", PagesCustomerInvitationMatch);
  __definePage("components/ListBlock", ComponentsListBlock);
  __definePage("pages/customer/RequestList", PagesCustomerRequestList);
  __definePage("components/RequestBlock", ComponentsRequestBlock);
  __definePage("components/TripList", ComponentsTripList);
  __definePage("components/InvitationList", ComponentsInvitationList);
  __definePage("pages/driver/driverTripList", PagesDriverDriverTripList);
  __definePage("pages/driver/invitations", PagesDriverInvitations);
  __definePage("pages/index/welcome", PagesIndexWelcome);
  __definePage("pages/my/login/login", PagesMyLoginLogin);
  __definePage("pages/my/login/forget", PagesMyLoginForget);
  __definePage("pages/my/login/register", PagesMyLoginRegister);
  __definePage("pages/customer/StartLoc", PagesCustomerStartLoc);
  __definePage("pages/customer/EndLoc", PagesCustomerEndLoc);
  __definePage("components/ShareOption", ComponentsShareOption);
  __definePage("pages/customer/OrderDetail", PagesCustomerOrderDetail);
  __definePage("components/MatchedRequestBlock", ComponentsMatchedRequestBlock);
  __definePage("pages/customer/OrderCancel", PagesCustomerOrderCancel);
  __definePage("pages/customer/OrderModify", PagesCustomerOrderModify);
  __definePage("components/OrderCancelSuccess", ComponentsOrderCancelSuccess);
  __definePage("pages/driver/OrderCompleteDisplayPage", PagesDriverOrderCompleteDisplayPage);
  __definePage("pages/driver/RideInfoDisplayPage", PagesDriverRideInfoDisplayPage);
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
    },
    globalData: {
      api_key: "82cf2479ddcf7f456d7edf241abd5ab6",
      my_location_longitude: 121.215252,
      my_location_latitude: 31.286054
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/大三下/软工课设/new_code/Mobile-Carpooling-System/ridesharing/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(store);
    return {
      app,
      store
      // 返回store供SSR使用
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
