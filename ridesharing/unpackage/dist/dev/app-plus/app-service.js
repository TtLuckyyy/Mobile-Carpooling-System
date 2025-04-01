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
  const _imports_0$3 = "/static/launch/start.png";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$k = {
    onShow() {
      setTimeout(() => {
        uni.reLaunch({
          url: "/pages/index/welcome"
          // 你想跳转的主页面
        });
      }, 2e3);
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesIndexLaunch = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-8d8376b8"], ["__file", "C:/Users/Lenovo/Desktop/Code/upload/ridesharing/pages/index/launch.vue"]]);
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
  const _sfc_main$j = {
    data() {
      return {
        statusBarHeight: uni.getSystemInfoSync().statusBarHeight
      };
    },
    computed: {
      // 映射 Vuex state
      ...mapState(["userID", "rideRequest"])
    },
    methods: {
      // 映射 Vuex actions
      ...mapActions([
        "login",
        "logout",
        "setRequestId",
        "setStartLoc",
        "setEndLoc",
        "setStartAt",
        "toggleExclusive",
        "toggleHighway",
        "resetRideRequest"
      ]),
      async publishDemand() {
        try {
          const requestData = {
            passenger_id: this.userID,
            start_loc: this.rideRequest.startLoc,
            end_loc: this.rideRequest.endLoc,
            status: "pending",
            start_at: this.rideRequest.startAt,
            exclusive: this.rideRequest.exclusive,
            highway: this.rideRequest.highway
          };
          const response = await uni.request({
            url: "/post-request",
            method: "POST",
            data: requestData,
            header: {
              "Content-Type": "application/json"
            }
          });
          if (response.statusCode === 200 || response.statusCode === 201) {
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
          formatAppLog("error", "at pages/customer/customer.vue:81", "发布失败:", error);
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
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
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
          onClick: _cache[1] || (_cache[1] = (...args) => $options.publishDemand && $options.publishDemand(...args))
        }, "这个按钮用于后端测试发布需求和跳转"),
        vue.createElementVNode("button", {
          onClick: _cache[2] || (_cache[2] = (...args) => $options.ToDetailRequest && $options.ToDetailRequest(...args))
        }, "拼车需求"),
        vue.createElementVNode("button", {
          onClick: _cache[3] || (_cache[3] = (...args) => $options.ToStartLoc && $options.ToStartLoc(...args))
        }, "你从哪上车"),
        vue.createElementVNode("button", {
          onClick: _cache[4] || (_cache[4] = (...args) => $options.ToEndLoc && $options.ToEndLoc(...args))
        }, "你要到哪去"),
        vue.createElementVNode(
          "view",
          null,
          vue.toDisplayString(_ctx.userID),
          1
          /* TEXT */
        )
      ],
      4
      /* STYLE */
    );
  }
  const PagesCustomerCustomer = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__file", "C:/Users/Lenovo/Desktop/Code/upload/ridesharing/pages/customer/customer.vue"]]);
  const _sfc_main$i = {
    data() {
      return {
        statusBarHeight: uni.getSystemInfoSync().statusBarHeight
      };
    },
    methods: {}
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesDriverDriver = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__file", "C:/Users/Lenovo/Desktop/Code/upload/ridesharing/pages/driver/driver.vue"]]);
  const _sfc_main$h = {
    data() {
      return {
        statusBarHeight: uni.getSystemInfoSync().statusBarHeight
      };
    },
    methods: {}
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__file", "C:/Users/Lenovo/Desktop/Code/upload/ridesharing/pages/index/index.vue"]]);
  const _sfc_main$g = {
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
      },
      goToLoginPage() {
        uni.navigateTo({
          url: "/pages/my/login/login"
        });
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
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
        vue.createCommentVNode(" 登录按钮 "),
        vue.createElementVNode("view", {
          class: "login-button",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.goToLoginPage && $options.goToLoginPage(...args))
        }, [
          vue.createElementVNode("text", null, "登录")
        ]),
        vue.createElementVNode("view", { class: "content" }, " 我的个人页面 ")
      ],
      4
      /* STYLE */
    );
  }
  const PagesMyMy = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__file", "C:/Users/Lenovo/Desktop/Code/upload/ridesharing/pages/my/my.vue"]]);
  const _imports_0$2 = "/static/left-arrow.png";
  const _sfc_main$f = {
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
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "all" }, [
      vue.createElementVNode("view", { class: "head-content" }, [
        vue.createElementVNode("view", null, [
          vue.createElementVNode("view", { class: "back-btn" }, [
            vue.createElementVNode("image", {
              src: _imports_0$2,
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
  const ComponentsPageHeader = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__file", "C:/Users/Lenovo/Desktop/Code/upload/ridesharing/components/PageHeader.vue"]]);
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
  const _sfc_main$e = {
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
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-d31e1c47"], ["__file", "C:/Users/Lenovo/Desktop/Code/upload/ridesharing/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  const _sfc_main$d = {
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
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-5c8fbdf3"], ["__file", "C:/Users/Lenovo/Desktop/Code/upload/ridesharing/uni_modules/uni-rate/components/uni-rate/uni-rate.vue"]]);
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
  const _sfc_main$c = {
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
      ...mapState(["rideRequest"])
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
            offer_id: this.item.id,
            // 拼车邀请的id
            request_id: this.$store.state.rideRequest.requestID,
            // 拼车需求的id
            price: this.item.price
            // 订单费用
          };
          const response = await uni.request({
            url: `/create-order`,
            method: "POST",
            data: orderData,
            header: {
              "Content-Type": "application/json"
            }
          });
          if (response[0] && response[0].statusCode === 200) {
            const orderId = response[0].data.order_id;
            this.setOrderId(orderId);
            uni.showToast({
              title: "订单创建成功",
              icon: "success"
            });
          } else {
            throw new Error(response[0].data.message || "订单创建失败");
          }
        } catch (error) {
          formatAppLog("error", "at components/ListBlock.vue:149", "创建订单失败:", error);
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
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
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
  const ComponentsListBlock = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__file", "C:/Users/Lenovo/Desktop/Code/upload/ridesharing/components/ListBlock.vue"]]);
  const _sfc_main$b = {
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
            realName: "张师傅",
            verificationCarPlate: "京A12345",
            price: 45,
            offset: 1.2,
            avatar: "/static/logo.png",
            verificationColor: "黑色",
            verificationCarModel: "奥迪A6",
            rating: 4.3
          },
          {
            startAt: "2023-05-15 09:15",
            startLoc: "北京市海淀区五道口",
            endLoc: "北京市西城区金融街",
            seats: 2,
            realName: "李师傅",
            verificationCarPlate: "京B67890",
            price: 35.5,
            offset: 3.2,
            avatar: "/static/logo.png",
            verificationColor: "白色",
            verificationCarModel: "本田雅阁",
            rating: 5
          }
        ],
        isLoading: false,
        error: null
      };
    },
    computed: {
      ...mapState(["rideRequest"])
    },
    mounted() {
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
            url: `/matched-orders`,
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
          if (response[0] && response[0].statusCode === 200) {
            const res = response[0].data;
            if (res.list_matched && res.list_matched.length > 0) {
              this.listBlockItems = res.list_matched.map((item) => ({
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
          formatAppLog("error", "at pages/customer/InvitationMatch.vue:147", "获取匹配订单失败:", error);
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
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesCustomerInvitationMatch = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__file", "C:/Users/Lenovo/Desktop/Code/upload/ridesharing/pages/customer/InvitationMatch.vue"]]);
  const _imports_0$1 = "/static/right-arrow-blue.png";
  const _sfc_main$a = {
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
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
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
              src: _imports_0$1,
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
  const ComponentsRequestBlock = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__file", "C:/Users/Lenovo/Desktop/Code/upload/ridesharing/components/RequestBlock.vue"]]);
  const _sfc_main$9 = {
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
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesCustomerRequestList = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__file", "C:/Users/Lenovo/Desktop/Code/upload/ridesharing/pages/customer/RequestList.vue"]]);
  const _imports_0 = "/static/launch/welcome0.png";
  const _imports_1 = "/static/launch/welcome1.png";
  const _sfc_main$8 = {
    methods: {
      goToExperience() {
        uni.reLaunch({
          url: "/pages/customer/customer"
          // 你想跳转的主页面
        });
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
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
              src: _imports_0
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
  const PagesIndexWelcome = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-c7aac77f"], ["__file", "C:/Users/Lenovo/Desktop/Code/upload/ridesharing/pages/index/welcome.vue"]]);
  const _sfc_main$7 = {
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
          uni.showToast({ title: "发送失败", icon: "none" });
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
        uni.navigateTo({
          url: "/pages/home/home"
        });
      },
      navigateTo(url) {
        uni.navigateTo({ url });
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesMyLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-dd394eb5"], ["__file", "C:/Users/Lenovo/Desktop/Code/upload/ridesharing/pages/my/login/login.vue"]]);
  const _sfc_main$6 = {
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
          const res = await uni.request({
            url: "/api/login",
            method: "POST",
            data: {
              phone: this.phone,
              password: this.password
            }
          });
          uni.hideLoading();
          if (res.data.code === 200) {
            uni.switchTab({ url: "/pages/home/home" });
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
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesMyLoginPasswordLogin = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-ac03f4cd"], ["__file", "C:/Users/Lenovo/Desktop/Code/upload/ridesharing/pages/my/login/passwordLogin.vue"]]);
  const _sfc_main$5 = {
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
            url: "{后端路径}/forget",
            method: "POST",
            data: {
              phone: this.phone,
              // 用户手机号
              password: this.password
              // 用户密码
            }
          });
          if (res.data === 1) {
            uni.showToast({ title: "修改成功", icon: "success" });
            setTimeout(() => {
              uni.navigateTo("/pages/my/login/passwordLogin");
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
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
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
              onClick: _cache[3] || (_cache[3] = (...args) => _ctx.getVerifyCode && _ctx.getVerifyCode(...args))
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
            onClick: _cache[8] || (_cache[8] = (...args) => _ctx.handleConfirm && _ctx.handleConfirm(...args))
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
  const PagesMyLoginForget = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-4a450a78"], ["__file", "C:/Users/Lenovo/Desktop/Code/upload/ridesharing/pages/my/login/forget.vue"]]);
  const _sfc_main$4 = {
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
            url: "{后端路径}/register",
            method: "POST",
            data: {
              phone: this.phone,
              // 用户手机号
              password: this.password
              // 用户密码
            }
          });
          if (res.data === 1) {
            uni.showToast({ title: "注册成功", icon: "success" });
            setTimeout(() => {
              uni.navigateTo("/pages/customer/customer");
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
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
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
              onClick: _cache[3] || (_cache[3] = (...args) => _ctx.getVerifyCode && _ctx.getVerifyCode(...args))
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
  const PagesMyLoginRegister = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-013d98be"], ["__file", "C:/Users/Lenovo/Desktop/Code/upload/ridesharing/pages/my/login/register.vue"]]);
  const _sfc_main$3 = {
    props: {
      title: String,
      locations: Array
    },
    methods: {
      selectLocation(locationName) {
        this.$emit("location-selected", locationName);
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", { class: "location-list" }, [
      vue.createElementVNode(
        "h3",
        null,
        vue.toDisplayString($props.title),
        1
        /* TEXT */
      ),
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($props.locations, (loc, index) => {
          return vue.openBlock(), vue.createElementBlock("div", {
            key: index,
            class: "location",
            onClick: ($event) => $options.selectLocation(loc.name)
          }, [
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
            ),
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
  const LocationList = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-ba39095f"], ["__file", "C:/Users/Lenovo/Desktop/Code/upload/ridesharing/components/LocationList.vue"]]);
  const _sfc_main$2 = {
    components: { LocationList },
    data() {
      return {
        start_loc: "",
        history: [
          { name: "北京南站", address: "北京南站的详细地址", distance: 10 }
        ],
        cities: [
          {
            name: "辽阳市",
            stations: [
              { name: "辽阳站", address: "辽阳站的地址", distance: 12 },
              { name: "灯塔站", address: "灯塔站的地址", distance: 18 }
            ]
          },
          {
            name: "沈阳市",
            stations: [
              { name: "沈阳站", address: "沈阳站的地址", distance: 10 },
              { name: "沈阳北站", address: "沈阳北站的地址", distance: 13 },
              { name: "沈阳南站", address: "沈阳南站的地址", distance: 20 }
            ]
          }
        ]
      };
    },
    methods: {
      ...mapActions(["setStartLoc"]),
      sendStartLoc(location) {
        const loc = location || this.start_loc;
        this.setStartLoc(loc);
      },
      handleLocationSelect(location) {
        this.start_loc = location;
        this.sendStartLoc(location);
      },
      goBack() {
        uni.navigateBack();
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    const _component_LocationList = vue.resolveComponent("LocationList");
    return vue.openBlock(), vue.createElementBlock("div", { class: "container" }, [
      vue.createElementVNode("header", null, [
        vue.createVNode(_component_uni_icons, {
          type: "back",
          size: "24",
          class: "back-icon",
          onClick: $options.goBack
        }, null, 8, ["onClick"]),
        vue.createElementVNode("span", { class: "status-dot" }),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.start_loc = $event),
            placeholder: "您从哪上车",
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
      vue.createElementVNode("div", { class: "address-settings" }, [
        vue.createElementVNode("div", { class: "address-option" }, [
          vue.createElementVNode("i", { class: "el-icon-house" }),
          vue.createTextVNode(" 家 "),
          vue.createElementVNode("span", { class: "desc" }, "设置家的地址")
        ]),
        vue.createElementVNode("div", { class: "address-option" }, [
          vue.createElementVNode("i", { class: "el-icon-office-building" }),
          vue.createTextVNode(" 公司 "),
          vue.createElementVNode("span", { class: "desc" }, "设置公司地址")
        ])
      ]),
      vue.createCommentVNode(" 复用 LocationList 组件 "),
      vue.createVNode(_component_LocationList, {
        title: "历史记录",
        locations: $data.history,
        onLocationSelected: $options.handleLocationSelect
      }, null, 8, ["locations", "onLocationSelected"]),
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($data.cities, (city, index) => {
          return vue.openBlock(), vue.createBlock(_component_LocationList, {
            key: index,
            title: city.name,
            locations: city.stations,
            onLocationSelected: $options.handleLocationSelect
          }, null, 8, ["title", "locations", "onLocationSelected"]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const PagesCustomerStartLoc = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-6cc13438"], ["__file", "C:/Users/Lenovo/Desktop/Code/upload/ridesharing/pages/customer/StartLoc.vue"]]);
  const _sfc_main$1 = {
    components: { LocationList },
    data() {
      return {
        endLoc: "",
        history: [
          { name: "上海虹桥站", address: "上海虹桥站的地址地址地址", distance: 15 },
          { name: "北京南站", address: "北京南站的详细地址", distance: 10 }
        ],
        cities: [
          {
            name: "辽阳市",
            stations: [
              { name: "辽阳站", address: "辽阳站的地址", distance: 12 },
              { name: "灯塔站", address: "灯塔站的地址", distance: 18 }
            ]
          },
          {
            name: "沈阳市",
            stations: [
              { name: "沈阳站", address: "沈阳站的地址", distance: 10 },
              { name: "沈阳北站", address: "沈阳北站的地址", distance: 13 },
              { name: "沈阳南站", address: "沈阳南站的地址", distance: 20 }
            ]
          }
        ]
      };
    },
    methods: {
      ...mapActions(["setEndLoc"]),
      sendEndLoc(location) {
        const loc = location || this.endLoc;
        this.setEndLoc(loc);
      },
      handleLocationSelect(location) {
        this.endLoc = location;
        this.sendEndLoc(location);
      },
      goBack() {
        uni.navigateBack();
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    const _component_LocationList = vue.resolveComponent("LocationList");
    return vue.openBlock(), vue.createElementBlock("div", { class: "container" }, [
      vue.createElementVNode("header", null, [
        vue.createVNode(_component_uni_icons, {
          type: "back",
          size: "24",
          class: "back-icon",
          onClick: $options.goBack
        }, null, 8, ["onClick"]),
        vue.createElementVNode("span", { class: "status-dot" }),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.endLoc = $event),
            placeholder: "您要到哪去",
            class: "end-loc-input",
            "confirm-type": "done",
            onConfirm: _cache[1] || (_cache[1] = (...args) => $options.sendEndLoc && $options.sendEndLoc(...args))
          },
          null,
          544
          /* NEED_HYDRATION, NEED_PATCH */
        ), [
          [vue.vModelText, $data.endLoc]
        ])
      ]),
      vue.createElementVNode("div", { class: "address-settings" }, [
        vue.createElementVNode("div", { class: "address-option" }, [
          vue.createElementVNode("i", { class: "el-icon-house" }),
          vue.createTextVNode(" 家 "),
          vue.createElementVNode("span", { class: "desc" }, "设置家的地址")
        ]),
        vue.createElementVNode("div", { class: "address-option" }, [
          vue.createElementVNode("i", { class: "el-icon-office-building" }),
          vue.createTextVNode(" 公司 "),
          vue.createElementVNode("span", { class: "desc" }, "设置公司地址")
        ])
      ]),
      vue.createCommentVNode(" 复用 LocationList 组件 "),
      vue.createVNode(_component_LocationList, {
        title: "历史记录",
        locations: $data.history,
        onLocationSelected: $options.handleLocationSelect
      }, null, 8, ["locations", "onLocationSelected"]),
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($data.cities, (city, index) => {
          return vue.openBlock(), vue.createBlock(_component_LocationList, {
            key: index,
            title: city.name,
            locations: city.stations,
            onLocationSelected: $options.handleLocationSelect
          }, null, 8, ["title", "locations", "onLocationSelected"]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const PagesCustomerEndLoc = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-d057533e"], ["__file", "C:/Users/Lenovo/Desktop/Code/upload/ridesharing/pages/customer/EndLoc.vue"]]);
  __definePage("pages/index/launch", PagesIndexLaunch);
  __definePage("pages/customer/customer", PagesCustomerCustomer);
  __definePage("pages/driver/driver", PagesDriverDriver);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/my/my", PagesMyMy);
  __definePage("components/PageHeader", ComponentsPageHeader);
  __definePage("pages/customer/InvitationMatch", PagesCustomerInvitationMatch);
  __definePage("components/ListBlock", ComponentsListBlock);
  __definePage("pages/customer/RequestList", PagesCustomerRequestList);
  __definePage("components/RequestBlock", ComponentsRequestBlock);
  __definePage("pages/index/welcome", PagesIndexWelcome);
  __definePage("pages/my/login/login", PagesMyLoginLogin);
  __definePage("pages/my/login/passwordLogin", PagesMyLoginPasswordLogin);
  __definePage("pages/my/login/forget", PagesMyLoginForget);
  __definePage("pages/my/login/register", PagesMyLoginRegister);
  __definePage("pages/customer/StartLoc", PagesCustomerStartLoc);
  __definePage("pages/customer/EndLoc", PagesCustomerEndLoc);
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
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/Users/Lenovo/Desktop/Code/upload/ridesharing/App.vue"]]);
  const store = createStore({
    state() {
      return {
        userID: "未登录用户",
        rideRequest: {
          // 拼车需求数据
          startLoc: "",
          endLoc: "",
          startAt: "",
          exclusive: false,
          highway: false,
          requestID: null
        },
        orderID: null
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
      TOGGLE_EXCLUSIVE(state) {
        state.rideRequest.exclusive = !state.rideRequest.exclusive;
      },
      TOGGLE_HIGHWAY(state) {
        state.rideRequest.highway = !state.rideRequest.highway;
      },
      SET_REQUEST_ID(state, id) {
        state.rideRequest.requestID = id;
      },
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
      SET_ORDER_ID(state, orderID) {
        state.orderID = orderID;
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
      toggleExclusive({ commit }) {
        commit("TOGGLE_EXCLUSIVE");
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
      setOrderId({ commit }, orderID) {
        commit("SET_ORDER_ID", orderID);
      }
    }
  });
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
