"use strict";
var __StripeExtExports = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/@stripe/ui-extension-sdk/version.js
  var require_version = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/version.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SDK_VERSION = void 0;
      exports.SDK_VERSION = "8.10.0";
    }
  });

  // node_modules/@stripe/ui-extension-sdk/ui/index.js
  var require_ui = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/ui/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Tooltip = exports.TextField = exports.TextArea = exports.Tabs = exports.TableRow = exports.Table = exports.TableHeaderCell = exports.TableHead = exports.TableFooter = exports.TableCell = exports.TableBody = exports.Tab = exports.TabPanels = exports.TabPanel = exports.TabList = exports.Switch = exports.StripeFileUploader = exports.Spinner = exports.Sparkline = exports.SignInView = exports.SettingsView = exports.Select = exports.Radio = exports.Menu = exports.MenuItem = exports.MenuGroup = exports.List = exports.ListItem = exports.Link = exports.LineChart = exports.Inline = exports.Img = exports.Icon = exports.FormFieldGroup = exports.FocusView = exports.Divider = exports.DateField = exports.ContextView = exports.Chip = exports.ChipList = exports.Checkbox = exports.Button = exports.ButtonGroup = exports.Box = exports.BarChart = exports.Banner = exports.Badge = exports.Accordion = exports.AccordionItem = void 0;
      var jsx_runtime_1 = __require("react/jsx-runtime");
      var react_1 = __require("@remote-ui/react");
      var version_1 = require_version();
      var withSdkProps = (Component) => {
        const wrappedComponentName = Component.displayName || Component.toString();
        const WithSdkProps = (props) => (0, jsx_runtime_1.jsx)(Component, Object.assign({}, props, { wrappedComponentName, sdkVersion: version_1.SDK_VERSION, schemaVersion: "v8" }));
        WithSdkProps.wrappedComponentName = wrappedComponentName;
        return WithSdkProps;
      };
      var defineComponent = (name, fragmentProps, wrapWithSdkProps) => {
        const remoteComponent = (0, react_1.createRemoteReactComponent)(name, {
          fragmentProps
        });
        if (!wrapWithSdkProps) {
          return remoteComponent;
        }
        return withSdkProps(remoteComponent);
      };
      exports.AccordionItem = defineComponent("AccordionItem", ["title", "actions", "media", "subtitle"], true);
      exports.Accordion = defineComponent("Accordion", [], true);
      exports.Badge = defineComponent("Badge", [], true);
      exports.Banner = defineComponent("Banner", ["actions", "description", "title"], true);
      exports.BarChart = defineComponent("BarChart", [], true);
      exports.Box = defineComponent("Box", [], true);
      exports.ButtonGroup = defineComponent("ButtonGroup", ["menuTrigger"], true);
      exports.Button = defineComponent("Button", [], true);
      exports.Checkbox = defineComponent("Checkbox", ["label"], true);
      exports.ChipList = defineComponent("ChipList", [], true);
      exports.Chip = defineComponent("Chip", [], true);
      exports.ContextView = defineComponent("ContextView", ["actions", "banner", "footerContent", "primaryAction", "secondaryAction"], true);
      exports.DateField = defineComponent("DateField", ["label"], true);
      exports.Divider = defineComponent("Divider", [], true);
      exports.FocusView = defineComponent("FocusView", ["footerContent", "primaryAction", "secondaryAction"], true);
      exports.FormFieldGroup = defineComponent("FormFieldGroup", [], true);
      exports.Icon = defineComponent("Icon", [], true);
      exports.Img = defineComponent("Img", [], true);
      exports.Inline = defineComponent("Inline", [], true);
      exports.LineChart = defineComponent("LineChart", [], true);
      exports.Link = defineComponent("Link", [], true);
      exports.ListItem = defineComponent("ListItem", ["icon", "image", "secondaryTitle", "title", "value"], true);
      exports.List = defineComponent("List", [], true);
      exports.MenuGroup = defineComponent("MenuGroup", ["title"], true);
      exports.MenuItem = defineComponent("MenuItem", [], true);
      exports.Menu = defineComponent("Menu", ["trigger"], true);
      exports.Radio = defineComponent("Radio", ["label"], true);
      exports.Select = defineComponent("Select", ["label"], true);
      exports.SettingsView = defineComponent("SettingsView", [], true);
      exports.SignInView = defineComponent("SignInView", ["descriptionActionContents", "footerContent"], true);
      exports.Sparkline = defineComponent("Sparkline", [], true);
      exports.Spinner = defineComponent("Spinner", [], true);
      exports.StripeFileUploader = defineComponent("StripeFileUploader", [], true);
      exports.Switch = defineComponent("Switch", ["label"], true);
      exports.TabList = defineComponent("TabList", [], true);
      exports.TabPanel = defineComponent("TabPanel", [], true);
      exports.TabPanels = defineComponent("TabPanels", [], true);
      exports.Tab = defineComponent("Tab", [], true);
      exports.TableBody = defineComponent("TableBody", [], true);
      exports.TableCell = defineComponent("TableCell", [], true);
      exports.TableFooter = defineComponent("TableFooter", [], true);
      exports.TableHead = defineComponent("TableHead", [], true);
      exports.TableHeaderCell = defineComponent("TableHeaderCell", [], true);
      exports.Table = defineComponent("Table", [], true);
      exports.TableRow = defineComponent("TableRow", [], true);
      exports.Tabs = defineComponent("Tabs", [], true);
      exports.TextArea = defineComponent("TextArea", ["label"], true);
      exports.TextField = defineComponent("TextField", ["label"], true);
      exports.Tooltip = defineComponent("Tooltip", ["trigger"], true);
    }
  });

  // .build/manifest.js
  var manifest_exports = {};
  __export(manifest_exports, {
    App: () => App_default,
    BUILD_TIME: () => BUILD_TIME,
    default: () => manifest_default
  });

  // src/views/App.tsx
  var import_react = __require("react");
  var import_ui = __toESM(require_ui());
  var import_jsx_runtime = __require("react/jsx-runtime");
  var BACKEND_URL = "https://bridge-production-ad61.up.railway.app";
  var App = () => {
    const [step, setStep] = (0, import_react.useState)("register");
    const [loading, setLoading] = (0, import_react.useState)(false);
    const [error, setError] = (0, import_react.useState)(null);
    const [success, setSuccess] = (0, import_react.useState)(null);
    const [apiKey, setApiKey] = (0, import_react.useState)("");
    const [displayName, setDisplayName] = (0, import_react.useState)("");
    const [config, setConfig] = (0, import_react.useState)(null);
    const [stripeKey, setStripeKey] = (0, import_react.useState)("");
    const [paypalClientId, setPaypalClientId] = (0, import_react.useState)("");
    const [paypalClientSecret, setPaypalClientSecret] = (0, import_react.useState)("");
    const [paypalEnv, setPaypalEnv] = (0, import_react.useState)("sandbox");
    const [status, setStatus] = (0, import_react.useState)(null);
    (0, import_react.useEffect)(() => {
      const stored = localStorage.getItem("bridge_api_key");
      if (stored) {
        setApiKey(stored);
        setStep("dashboard");
        fetchStatus(stored);
        fetchConfig(stored);
      }
    }, []);
    const handleRegister = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BACKEND_URL}/api/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ displayName: displayName || "Stripe App User" })
        });
        if (!res.ok) {
          const data2 = await res.json();
          throw new Error(data2.error || `Registration failed: ${res.status}`);
        }
        const data = await res.json();
        localStorage.setItem("bridge_api_key", data.apiKey);
        setApiKey(data.apiKey);
        setSuccess(`Registered! Your API key is saved. Now configure your payment accounts.`);
        setStep("configure");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchConfig = async (key) => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/configure`, {
          headers: { Authorization: `Bearer ${key}` }
        });
        if (!res.ok)
          throw new Error("Failed to load config");
        const data = await res.json();
        setConfig(data);
        if (data.stripeConfigured)
          setStripeKey("\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022");
        if (data.paypalConfigured) {
          setPaypalClientId("\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022");
          setPaypalClientSecret("\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022");
        }
        if (data.paypalEnvironment)
          setPaypalEnv(data.paypalEnvironment);
        if (data.stripeConfigured && data.paypalConfigured) {
          setStep("dashboard");
        } else {
          setStep("configure");
        }
      } catch (err) {
        console.error("fetchConfig error:", err);
      }
    };
    const handleConfigure = async () => {
      setLoading(true);
      setError(null);
      setSuccess(null);
      try {
        const body = {};
        if (stripeKey && stripeKey !== "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022")
          body.stripeKey = stripeKey;
        if (paypalClientId && paypalClientId !== "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022")
          body.paypalClientId = paypalClientId;
        if (paypalClientSecret && paypalClientSecret !== "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022")
          body.paypalClientSecret = paypalClientSecret;
        body.paypalEnvironment = paypalEnv;
        const res = await fetch(`${BACKEND_URL}/api/configure`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
          },
          body: JSON.stringify(body)
        });
        if (!res.ok) {
          const data2 = await res.json();
          throw new Error(data2.error || "Configuration failed");
        }
        const data = await res.json();
        setConfig(data);
        setSuccess("Credentials saved and verified!");
        setStep("dashboard");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchStatus = async (key) => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/status`, {
          headers: { Authorization: `Bearer ${key}` }
        });
        if (!res.ok)
          throw new Error("Status check failed");
        const data = await res.json();
        setStatus(data);
      } catch (err) {
        console.error("Status error:", err);
      }
    };
    const handleSyncNow = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BACKEND_URL}/api/sync`, {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}` }
        });
        if (!res.ok) {
          const data2 = await res.json();
          throw new Error(data2.error || "Sync failed");
        }
        const data = await res.json();
        setSuccess(`Synced! ${data.pushed} transactions pushed, ${data.skipped} skipped.`);
        fetchStatus(apiKey);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const handleLogout = () => {
      localStorage.removeItem("bridge_api_key");
      setApiKey("");
      setStep("register");
      setConfig(null);
      setStatus(null);
      setError(null);
      setSuccess(null);
    };
    if (step === "register") {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
        css: { padding: "large" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
            css: { marginBottom: "large" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Heading, {
                size: "large",
                children: "Bridge"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
                children: "Sync your PayPal transactions into Stripe Revenue Recognition"
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Card, {
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
              css: { padding: "medium" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Heading, {
                  size: "small",
                  children: "Get Started"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Divider, {}),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
                  css: { marginTop: "medium" },
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
                    children: "Register to get your API key. You will use this key to authenticate Bridge with your Stripe account."
                  })
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
                  css: { marginTop: "medium" },
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.TextField, {
                    label: "Display name (optional)",
                    placeholder: "My Business",
                    value: displayName,
                    onChange: (e) => setDisplayName(e.target.value)
                  })
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
                  css: { marginTop: "medium" },
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Button, {
                    onPress: handleRegister,
                    type: "primary",
                    disabled: loading,
                    children: loading ? "Registering..." : "Register & Get API Key"
                  })
                })
              ]
            })
          }),
          error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
            css: { marginTop: "medium" },
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Banner, {
              type: "critical",
              children: error
            })
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
            css: { marginTop: "large" },
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
              size: "small",
              css: { color: "secondary" },
              children: "Already have an API key? Refresh the page or clear storage to re-register."
            })
          })
        ]
      });
    }
    if (step === "configure") {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
        css: { padding: "large" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
            css: { marginBottom: "large" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Heading, {
                size: "large",
                children: "Bridge"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
                children: "Connect your payment accounts"
              })
            ]
          }),
          success && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
            css: { marginBottom: "medium" },
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Banner, {
              type: "default",
              children: success
            })
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Card, {
            css: { marginBottom: "medium" },
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
              css: { padding: "medium" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Heading, {
                  size: "small",
                  children: "Stripe"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Divider, {}),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
                  css: { marginTop: "medium" },
                  children: config?.stripeConfigured ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Inline, {
                    css: { gap: "medium", alignItems: "center" },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Badge, {
                        type: "positive",
                        children: "Connected"
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
                        size: "small",
                        css: { color: "secondary" },
                        children: "Key saved"
                      })
                    ]
                  }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
                        children: "Enter your Stripe secret key (starts with sk_live_ or sk_test_)"
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
                        css: { marginTop: "small" },
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.TextField, {
                          label: "Stripe Secret Key",
                          placeholder: "sk_live_...",
                          type: "password",
                          value: stripeKey,
                          onChange: (e) => setStripeKey(e.target.value)
                        })
                      })
                    ]
                  })
                })
              ]
            })
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Card, {
            css: { marginBottom: "medium" },
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
              css: { padding: "medium" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Heading, {
                  size: "small",
                  children: "PayPal"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Divider, {}),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
                  css: { marginTop: "medium" },
                  children: config?.paypalConfigured ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Inline, {
                    css: { gap: "medium", alignItems: "center" },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Badge, {
                        type: "positive",
                        children: "Connected"
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
                        size: "small",
                        css: { color: "secondary" },
                        children: "Keys saved"
                      })
                    ]
                  }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
                        children: "Enter your PayPal API credentials (from the PayPal Developer Dashboard)"
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
                        css: { marginTop: "small" },
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.TextField, {
                          label: "PayPal Client ID",
                          placeholder: "A...",
                          value: paypalClientId,
                          onChange: (e) => setPaypalClientId(e.target.value)
                        })
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
                        css: { marginTop: "small" },
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.TextField, {
                          label: "PayPal Client Secret",
                          placeholder: "E...",
                          type: "password",
                          value: paypalClientSecret,
                          onChange: (e) => setPaypalClientSecret(e.target.value)
                        })
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
                        css: { marginTop: "small" },
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.TextField, {
                          label: "PayPal Environment",
                          value: paypalEnv,
                          onChange: (e) => setPaypalEnv(e.target.value)
                        })
                      })
                    ]
                  })
                })
              ]
            })
          }),
          error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
            css: { marginBottom: "medium" },
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Banner, {
              type: "critical",
              children: error
            })
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Button, {
            onPress: handleConfigure,
            type: "primary",
            disabled: loading,
            children: loading ? "Saving..." : "Save & Continue"
          }),
          apiKey && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
            css: { marginTop: "medium" },
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Button, {
              onPress: handleLogout,
              type: "secondary",
              children: "Reset (start over)"
            })
          })
        ]
      });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
      css: { padding: "large" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
          css: { marginBottom: "large" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Inline, {
              css: { gap: "medium", alignItems: "center" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Heading, {
                  size: "large",
                  children: "Bridge"
                }),
                config && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
                  size: "small",
                  css: { color: "secondary" },
                  children: config.displayName
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
              children: "PayPal \u2192 Stripe Payment Records sync"
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Card, {
          css: { marginBottom: "medium" },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
            css: { padding: "medium" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Heading, {
                size: "small",
                children: "Connections"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Divider, {}),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Inline, {
                css: { marginTop: "medium", gap: "medium", alignItems: "center" },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
                    children: "Stripe"
                  }),
                  status?.stripe?.connected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Badge, {
                    type: "positive",
                    children: "Connected"
                  }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Badge, {
                    type: "warning",
                    children: "No key configured"
                  })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Inline, {
                css: { marginTop: "small", gap: "medium", alignItems: "center" },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
                    children: "PayPal"
                  }),
                  status?.paypal?.connected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Badge, {
                    type: "positive",
                    children: "Connected"
                  }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Badge, {
                    type: "warning",
                    children: "No key configured"
                  })
                ]
              }),
              (!config?.stripeConfigured || !config?.paypalConfigured) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
                css: { marginTop: "medium" },
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Button, {
                  onPress: () => setStep("configure"),
                  type: "secondary",
                  children: "Configure Accounts"
                })
              })
            ]
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Card, {
          css: { marginBottom: "medium" },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
            css: { padding: "medium" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Heading, {
                size: "small",
                children: "Sync Status"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Divider, {}),
              status ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Inline, {
                    css: { marginTop: "medium", gap: "medium" },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
                        children: "Transactions synced:"
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
                        children: status.sync.totalSynced
                      })
                    ]
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Inline, {
                    css: { marginTop: "small", gap: "medium" },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
                        children: "Last sync:"
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
                        children: status.sync.lastSyncAt ? new Date(status.sync.lastSyncAt).toLocaleString() : "Never"
                      })
                    ]
                  }),
                  status.sync.errors.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
                    css: { marginTop: "small" },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Text, {
                        css: { color: "critical" },
                        children: [
                          status.sync.errors.length,
                          " recent error(s)"
                        ]
                      }),
                      status.sync.errors.slice(0, 3).map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
                        size: "small",
                        css: { color: "critical" },
                        children: e.error
                      }, i))
                    ]
                  })
                ]
              }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
                css: { marginTop: "medium" },
                children: "Loading status..."
              }),
              config?.stripeConfigured && config?.paypalConfigured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
                css: { marginTop: "medium" },
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Button, {
                  onPress: handleSyncNow,
                  disabled: loading,
                  children: loading ? "Syncing..." : "Sync Now"
                })
              })
            ]
          })
        }),
        success && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
          css: { marginBottom: "medium" },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Banner, {
            type: "default",
            children: success
          })
        }),
        error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
          css: { marginBottom: "medium" },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Banner, {
            type: "critical",
            children: error
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
          css: { marginTop: "large" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Inline, {
              css: { gap: "medium", alignItems: "center" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Button, {
                  onPress: () => {
                    fetchStatus(apiKey);
                    fetchConfig(apiKey);
                  },
                  type: "secondary",
                  disabled: loading,
                  children: "Refresh"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Button, {
                  onPress: handleLogout,
                  type: "secondary",
                  children: "Disconnect"
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
              css: { marginTop: "medium" },
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
                size: "small",
                css: { color: "secondary" },
                children: "Bridge syncs your PayPal transactions to Stripe daily. Data appears in Stripe Sigma and Revenue Recognition."
              })
            })
          ]
        })
      ]
    });
  };
  var App_default = App;

  // .build/manifest.js
  __reExport(manifest_exports, __toESM(require_version()));
  var BUILD_TIME = "2026-06-04 19:39:15.574835 +0530 IST m=+2.110192001";
  var manifest_default = {
    "$schema": "https://stripe.com/stripe-app.schema.json",
    "distribution_type": "private",
    "icon": "./bridge_icon_32.png",
    "id": "com.bridge.payment-sync",
    "name": "Bridge",
    "permissions": [
      {
        "permission": "payment_records_write",
        "purpose": "Sync PayPal (and other processor) transactions into Stripe Payment Records API so all revenue appears in Stripe."
      },
      {
        "permission": "payment_records_read",
        "purpose": "Read existing payment records to verify sync status and avoid duplicate pushes."
      },
      {
        "permission": "balance_read",
        "purpose": "Display synced transaction summaries in the Bridge dashboard panel."
      }
    ],
    "sandbox_install_compatible": true,
    "stripe_api_access_type": "platform",
    "ui_extension": {
      "content_security_policy": {
        "connect-src": [
          "https://bridge-production-ad61.up.railway.app/api/",
          "https://api-m.sandbox.paypal.com/v2/",
          "https://api-m.paypal.com/v2/"
        ],
        "purpose": "Allow Bridge to connect to its backend server and PayPal API."
      },
      "views": [
        {
          "component": "App",
          "viewport": "stripe.dashboard.home.overview"
        }
      ]
    },
    "version": "0.2.0"
  };
  return __toCommonJS(manifest_exports);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvc3JjL3ZlcnNpb24udHMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvc3JjL3VpL2luZGV4LnRzeCIsICJtYW5pZmVzdC5qcyIsICIuLi9zcmMvdmlld3MvQXBwLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFtudWxsLCBudWxsLCAiLy8gQVVUT0dFTkVSQVRFRCAtIERPIE5PVCBNT0RJRllcblxuLy8gVmlldyBjb21wb25lbnQgaW1wb3J0cyBcdTIwMTQgb25lIHBlciB2aWV3cG9ydCBkZWNsYXJlZCBpbiB1aV9leHRlbnNpb24udmlld3NcbmltcG9ydCBBcHAgZnJvbSAnLi4vc3JjL3ZpZXdzL0FwcCc7XG5cbi8vIEV4cG9zZXMgdGhlIFNESyB2ZXJzaW9uIHNvIHRoZSBEYXNoYm9hcmQgY2FuIHZlcmlmeSBjb21wYXRpYmlsaXR5XG5leHBvcnQgKiBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdmVyc2lvbic7XG5cbi8vIE5hbWVkIGV4cG9ydHMgbWFrZSBlYWNoIHZpZXcgY29tcG9uZW50IGFjY2Vzc2libGUgdG8gdGhlIERhc2hib2FyZCBydW50aW1lXG5cbmV4cG9ydCB7IFxuICBBcHBcbiB9O1xuXG4vLyBUaW1lc3RhbXAgY2hhbmdlcyBvbiBldmVyeSBleHBvcnQsIGVuc3VyaW5nIHRoZSBkZXYgc2VydmVyIGRldGVjdHMgYSByZWJ1aWxkXG5leHBvcnQgY29uc3QgQlVJTERfVElNRSA9ICcyMDI2LTA2LTA0IDE5OjM5OjE1LjU3NDgzNSArMDUzMCBJU1QgbT0rMi4xMTAxOTIwMDEnO1xuXG4vLyBBcHAgbWFuaWZlc3QgXHUyMDE0IGNvbnN1bWVkIGJ5IHRoZSBEYXNoYm9hcmQgdG8gY29uZmlndXJlIHRoZSBhcHBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgXCIkc2NoZW1hXCI6IFwiaHR0cHM6Ly9zdHJpcGUuY29tL3N0cmlwZS1hcHAuc2NoZW1hLmpzb25cIixcbiAgXCJkaXN0cmlidXRpb25fdHlwZVwiOiBcInByaXZhdGVcIixcbiAgXCJpY29uXCI6IFwiLi9icmlkZ2VfaWNvbl8zMi5wbmdcIixcbiAgXCJpZFwiOiBcImNvbS5icmlkZ2UucGF5bWVudC1zeW5jXCIsXG4gIFwibmFtZVwiOiBcIkJyaWRnZVwiLFxuICBcInBlcm1pc3Npb25zXCI6IFtcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJwYXltZW50X3JlY29yZHNfd3JpdGVcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlN5bmMgUGF5UGFsIChhbmQgb3RoZXIgcHJvY2Vzc29yKSB0cmFuc2FjdGlvbnMgaW50byBTdHJpcGUgUGF5bWVudCBSZWNvcmRzIEFQSSBzbyBhbGwgcmV2ZW51ZSBhcHBlYXJzIGluIFN0cmlwZS5cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwicGF5bWVudF9yZWNvcmRzX3JlYWRcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlJlYWQgZXhpc3RpbmcgcGF5bWVudCByZWNvcmRzIHRvIHZlcmlmeSBzeW5jIHN0YXR1cyBhbmQgYXZvaWQgZHVwbGljYXRlIHB1c2hlcy5cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwiYmFsYW5jZV9yZWFkXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJEaXNwbGF5IHN5bmNlZCB0cmFuc2FjdGlvbiBzdW1tYXJpZXMgaW4gdGhlIEJyaWRnZSBkYXNoYm9hcmQgcGFuZWwuXCJcbiAgICB9XG4gIF0sXG4gIFwic2FuZGJveF9pbnN0YWxsX2NvbXBhdGlibGVcIjogdHJ1ZSxcbiAgXCJzdHJpcGVfYXBpX2FjY2Vzc190eXBlXCI6IFwicGxhdGZvcm1cIixcbiAgXCJ1aV9leHRlbnNpb25cIjoge1xuICAgIFwiY29udGVudF9zZWN1cml0eV9wb2xpY3lcIjoge1xuICAgICAgXCJjb25uZWN0LXNyY1wiOiBbXG4gICAgICAgIFwiaHR0cHM6Ly9icmlkZ2UtcHJvZHVjdGlvbi1hZDYxLnVwLnJhaWx3YXkuYXBwL2FwaS9cIixcbiAgICAgICAgXCJodHRwczovL2FwaS1tLnNhbmRib3gucGF5cGFsLmNvbS92Mi9cIixcbiAgICAgICAgXCJodHRwczovL2FwaS1tLnBheXBhbC5jb20vdjIvXCJcbiAgICAgIF0sXG4gICAgICBcInB1cnBvc2VcIjogXCJBbGxvdyBCcmlkZ2UgdG8gY29ubmVjdCB0byBpdHMgYmFja2VuZCBzZXJ2ZXIgYW5kIFBheVBhbCBBUEkuXCJcbiAgICB9LFxuICAgIFwidmlld3NcIjogW1xuICAgICAge1xuICAgICAgICBcImNvbXBvbmVudFwiOiBcIkFwcFwiLFxuICAgICAgICBcInZpZXdwb3J0XCI6IFwic3RyaXBlLmRhc2hib2FyZC5ob21lLm92ZXJ2aWV3XCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwidmVyc2lvblwiOiBcIjAuMi4wXCJcbn07XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBCb3gsXG4gIEJ1dHRvbixcbiAgQ2FyZCxcbiAgSGVhZGluZyxcbiAgVGV4dCxcbiAgQmFkZ2UsXG4gIExpbmssXG4gIFNwaW5uZXIsXG4gIERpdmlkZXIsXG4gIElubGluZSxcbiAgVGV4dEZpZWxkLFxuICBCYW5uZXIsXG59IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5cbmNvbnN0IEJBQ0tFTkRfVVJMID0gJ2h0dHBzOi8vYnJpZGdlLXByb2R1Y3Rpb24tYWQ2MS51cC5yYWlsd2F5LmFwcCc7XG5cbnR5cGUgU3RlcCA9ICdyZWdpc3RlcicgfCAnY29uZmlndXJlJyB8ICdkYXNoYm9hcmQnO1xuXG5pbnRlcmZhY2UgTWVyY2hhbnRDb25maWcge1xuICBtZXJjaGFudElkOiBzdHJpbmc7XG4gIGRpc3BsYXlOYW1lOiBzdHJpbmc7XG4gIHN0cmlwZUNvbmZpZ3VyZWQ6IGJvb2xlYW47XG4gIHBheXBhbENvbmZpZ3VyZWQ6IGJvb2xlYW47XG4gIHBheXBhbEVudmlyb25tZW50OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBTeW5jU3RhdHVzIHtcbiAgc3RyaXBlOiB7IGNvbm5lY3RlZDogYm9vbGVhbjsgYWNjb3VudElkPzogc3RyaW5nIH07XG4gIHBheXBhbDogeyBjb25uZWN0ZWQ6IGJvb2xlYW47IGVtYWlsPzogc3RyaW5nIH07XG4gIHN5bmM6IHsgbGFzdFN5bmNBdDogc3RyaW5nIHwgbnVsbDsgdG90YWxTeW5jZWQ6IG51bWJlcjsgZXJyb3JzOiBhbnlbXSB9O1xufVxuXG4vKipcbiAqIEJyaWRnZSBTdHJpcGUgQXBwIFx1MjAxNCBTZXR1cCB3aXphcmQgKyBkYXNoYm9hcmQuXG4gKi9cbmNvbnN0IEFwcCA9ICgpID0+IHtcbiAgY29uc3QgW3N0ZXAsIHNldFN0ZXBdID0gdXNlU3RhdGU8U3RlcD4oJ3JlZ2lzdGVyJyk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3N1Y2Nlc3MsIHNldFN1Y2Nlc3NdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gUmVnaXN0cmF0aW9uXG4gIGNvbnN0IFthcGlLZXksIHNldEFwaUtleV0gPSB1c2VTdGF0ZTxzdHJpbmc+KCcnKTtcbiAgY29uc3QgW2Rpc3BsYXlOYW1lLCBzZXREaXNwbGF5TmFtZV0gPSB1c2VTdGF0ZSgnJyk7XG5cbiAgLy8gQ29uZmlndXJhdGlvblxuICBjb25zdCBbY29uZmlnLCBzZXRDb25maWddID0gdXNlU3RhdGU8TWVyY2hhbnRDb25maWcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3N0cmlwZUtleSwgc2V0U3RyaXBlS2V5XSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3BheXBhbENsaWVudElkLCBzZXRQYXlwYWxDbGllbnRJZF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtwYXlwYWxDbGllbnRTZWNyZXQsIHNldFBheXBhbENsaWVudFNlY3JldF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtwYXlwYWxFbnYsIHNldFBheXBhbEVudl0gPSB1c2VTdGF0ZSgnc2FuZGJveCcpO1xuXG4gIC8vIERhc2hib2FyZFxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGU8U3luY1N0YXR1cyB8IG51bGw+KG51bGwpO1xuXG4gIC8vIE9uIG1vdW50LCBjaGVjayBmb3Igc3RvcmVkIEFQSSBrZXlcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBzdG9yZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYnJpZGdlX2FwaV9rZXknKTtcbiAgICBpZiAoc3RvcmVkKSB7XG4gICAgICBzZXRBcGlLZXkoc3RvcmVkKTtcbiAgICAgIHNldFN0ZXAoJ2Rhc2hib2FyZCcpO1xuICAgICAgZmV0Y2hTdGF0dXMoc3RvcmVkKTtcbiAgICAgIGZldGNoQ29uZmlnKHN0b3JlZCk7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgLy8gXHUyNTAwXHUyNTAwIFJlZ2lzdHJhdGlvbiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcblxuICBjb25zdCBoYW5kbGVSZWdpc3RlciA9IGFzeW5jICgpID0+IHtcbiAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgIHNldEVycm9yKG51bGwpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtCQUNLRU5EX1VSTH0vYXBpL3JlZ2lzdGVyYCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZGlzcGxheU5hbWU6IGRpc3BsYXlOYW1lIHx8ICdTdHJpcGUgQXBwIFVzZXInIH0pLFxuICAgICAgfSk7XG4gICAgICBpZiAoIXJlcy5vaykge1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRhdGEuZXJyb3IgfHwgYFJlZ2lzdHJhdGlvbiBmYWlsZWQ6ICR7cmVzLnN0YXR1c31gKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2JyaWRnZV9hcGlfa2V5JywgZGF0YS5hcGlLZXkpO1xuICAgICAgc2V0QXBpS2V5KGRhdGEuYXBpS2V5KTtcbiAgICAgIHNldFN1Y2Nlc3MoYFJlZ2lzdGVyZWQhIFlvdXIgQVBJIGtleSBpcyBzYXZlZC4gTm93IGNvbmZpZ3VyZSB5b3VyIHBheW1lbnQgYWNjb3VudHMuYCk7XG4gICAgICBzZXRTdGVwKCdjb25maWd1cmUnKTtcbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgc2V0RXJyb3IoZXJyLm1lc3NhZ2UpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gXHUyNTAwXHUyNTAwIENvbmZpZ3VyYXRpb24gXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG5cbiAgY29uc3QgZmV0Y2hDb25maWcgPSBhc3luYyAoa2V5OiBzdHJpbmcpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7QkFDS0VORF9VUkx9L2FwaS9jb25maWd1cmVgLCB7XG4gICAgICAgIGhlYWRlcnM6IHsgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2tleX1gIH0sXG4gICAgICB9KTtcbiAgICAgIGlmICghcmVzLm9rKSB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBsb2FkIGNvbmZpZycpO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG4gICAgICBzZXRDb25maWcoZGF0YSk7XG4gICAgICBpZiAoZGF0YS5zdHJpcGVDb25maWd1cmVkKSBzZXRTdHJpcGVLZXkoJ1x1MjAyMlx1MjAyMlx1MjAyMlx1MjAyMlx1MjAyMlx1MjAyMlx1MjAyMlx1MjAyMicpO1xuICAgICAgaWYgKGRhdGEucGF5cGFsQ29uZmlndXJlZCkge1xuICAgICAgICBzZXRQYXlwYWxDbGllbnRJZCgnXHUyMDIyXHUyMDIyXHUyMDIyXHUyMDIyXHUyMDIyXHUyMDIyXHUyMDIyXHUyMDIyJyk7XG4gICAgICAgIHNldFBheXBhbENsaWVudFNlY3JldCgnXHUyMDIyXHUyMDIyXHUyMDIyXHUyMDIyXHUyMDIyXHUyMDIyXHUyMDIyXHUyMDIyJyk7XG4gICAgICB9XG4gICAgICBpZiAoZGF0YS5wYXlwYWxFbnZpcm9ubWVudCkgc2V0UGF5cGFsRW52KGRhdGEucGF5cGFsRW52aXJvbm1lbnQpO1xuICAgICAgaWYgKGRhdGEuc3RyaXBlQ29uZmlndXJlZCAmJiBkYXRhLnBheXBhbENvbmZpZ3VyZWQpIHtcbiAgICAgICAgc2V0U3RlcCgnZGFzaGJvYXJkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRTdGVwKCdjb25maWd1cmUnKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgY29uc29sZS5lcnJvcignZmV0Y2hDb25maWcgZXJyb3I6JywgZXJyKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ29uZmlndXJlID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgc2V0RXJyb3IobnVsbCk7XG4gICAgc2V0U3VjY2VzcyhudWxsKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYm9keTogYW55ID0ge307XG4gICAgICBpZiAoc3RyaXBlS2V5ICYmIHN0cmlwZUtleSAhPT0gJ1x1MjAyMlx1MjAyMlx1MjAyMlx1MjAyMlx1MjAyMlx1MjAyMlx1MjAyMlx1MjAyMicpIGJvZHkuc3RyaXBlS2V5ID0gc3RyaXBlS2V5O1xuICAgICAgaWYgKHBheXBhbENsaWVudElkICYmIHBheXBhbENsaWVudElkICE9PSAnXHUyMDIyXHUyMDIyXHUyMDIyXHUyMDIyXHUyMDIyXHUyMDIyXHUyMDIyXHUyMDIyJykgYm9keS5wYXlwYWxDbGllbnRJZCA9IHBheXBhbENsaWVudElkO1xuICAgICAgaWYgKHBheXBhbENsaWVudFNlY3JldCAmJiBwYXlwYWxDbGllbnRTZWNyZXQgIT09ICdcdTIwMjJcdTIwMjJcdTIwMjJcdTIwMjJcdTIwMjJcdTIwMjJcdTIwMjJcdTIwMjInKSBib2R5LnBheXBhbENsaWVudFNlY3JldCA9IHBheXBhbENsaWVudFNlY3JldDtcbiAgICAgIGJvZHkucGF5cGFsRW52aXJvbm1lbnQgPSBwYXlwYWxFbnY7XG5cbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBQ0tFTkRfVVJMfS9hcGkvY29uZmlndXJlYCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2FwaUtleX1gLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgICAgIH0pO1xuICAgICAgaWYgKCFyZXMub2spIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihkYXRhLmVycm9yIHx8ICdDb25maWd1cmF0aW9uIGZhaWxlZCcpO1xuICAgICAgfVxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG4gICAgICBzZXRDb25maWcoZGF0YSk7XG4gICAgICBzZXRTdWNjZXNzKCdDcmVkZW50aWFscyBzYXZlZCBhbmQgdmVyaWZpZWQhJyk7XG4gICAgICBzZXRTdGVwKCdkYXNoYm9hcmQnKTtcbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgc2V0RXJyb3IoZXJyLm1lc3NhZ2UpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gXHUyNTAwXHUyNTAwIFN5bmMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG5cbiAgY29uc3QgZmV0Y2hTdGF0dXMgPSBhc3luYyAoa2V5OiBzdHJpbmcpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7QkFDS0VORF9VUkx9L2FwaS9zdGF0dXNgLCB7XG4gICAgICAgIGhlYWRlcnM6IHsgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2tleX1gIH0sXG4gICAgICB9KTtcbiAgICAgIGlmICghcmVzLm9rKSB0aHJvdyBuZXcgRXJyb3IoJ1N0YXR1cyBjaGVjayBmYWlsZWQnKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuICAgICAgc2V0U3RhdHVzKGRhdGEpO1xuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdTdGF0dXMgZXJyb3I6JywgZXJyKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU3luY05vdyA9IGFzeW5jICgpID0+IHtcbiAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgIHNldEVycm9yKG51bGwpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtCQUNLRU5EX1VSTH0vYXBpL3N5bmNgLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7IEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHthcGlLZXl9YCB9LFxuICAgICAgfSk7XG4gICAgICBpZiAoIXJlcy5vaykge1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRhdGEuZXJyb3IgfHwgJ1N5bmMgZmFpbGVkJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgIHNldFN1Y2Nlc3MoYFN5bmNlZCEgJHtkYXRhLnB1c2hlZH0gdHJhbnNhY3Rpb25zIHB1c2hlZCwgJHtkYXRhLnNraXBwZWR9IHNraXBwZWQuYCk7XG4gICAgICBmZXRjaFN0YXR1cyhhcGlLZXkpO1xuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICBzZXRFcnJvcihlcnIubWVzc2FnZSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVMb2dvdXQgPSAoKSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2JyaWRnZV9hcGlfa2V5Jyk7XG4gICAgc2V0QXBpS2V5KCcnKTtcbiAgICBzZXRTdGVwKCdyZWdpc3RlcicpO1xuICAgIHNldENvbmZpZyhudWxsKTtcbiAgICBzZXRTdGF0dXMobnVsbCk7XG4gICAgc2V0RXJyb3IobnVsbCk7XG4gICAgc2V0U3VjY2VzcyhudWxsKTtcbiAgfTtcblxuICAvLyBcdTI1MDBcdTI1MDAgUmVuZGVyIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuXG4gIC8vIFN0ZXAgMTogUmVnaXN0cmF0aW9uXG4gIGlmIChzdGVwID09PSAncmVnaXN0ZXInKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdsYXJnZScgfX0+XG4gICAgICAgIDxCb3ggY3NzPXt7IG1hcmdpbkJvdHRvbTogJ2xhcmdlJyB9fT5cbiAgICAgICAgICA8SGVhZGluZyBzaXplPVwibGFyZ2VcIj5CcmlkZ2U8L0hlYWRpbmc+XG4gICAgICAgICAgPFRleHQ+U3luYyB5b3VyIFBheVBhbCB0cmFuc2FjdGlvbnMgaW50byBTdHJpcGUgUmV2ZW51ZSBSZWNvZ25pdGlvbjwvVGV4dD5cbiAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgPENhcmQ+XG4gICAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScgfX0+XG4gICAgICAgICAgICA8SGVhZGluZyBzaXplPVwic21hbGxcIj5HZXQgU3RhcnRlZDwvSGVhZGluZz5cbiAgICAgICAgICAgIDxEaXZpZGVyIC8+XG4gICAgICAgICAgICA8Qm94IGNzcz17eyBtYXJnaW5Ub3A6ICdtZWRpdW0nIH19PlxuICAgICAgICAgICAgICA8VGV4dD5cbiAgICAgICAgICAgICAgICBSZWdpc3RlciB0byBnZXQgeW91ciBBUEkga2V5LiBZb3Ugd2lsbCB1c2UgdGhpcyBrZXlcbiAgICAgICAgICAgICAgICB0byBhdXRoZW50aWNhdGUgQnJpZGdlIHdpdGggeW91ciBTdHJpcGUgYWNjb3VudC5cbiAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICA8Qm94IGNzcz17eyBtYXJnaW5Ub3A6ICdtZWRpdW0nIH19PlxuICAgICAgICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJEaXNwbGF5IG5hbWUgKG9wdGlvbmFsKVwiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJNeSBCdXNpbmVzc1wiXG4gICAgICAgICAgICAgICAgdmFsdWU9e2Rpc3BsYXlOYW1lfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RGlzcGxheU5hbWUoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICA8Qm94IGNzcz17eyBtYXJnaW5Ub3A6ICdtZWRpdW0nIH19PlxuICAgICAgICAgICAgICA8QnV0dG9uIG9uUHJlc3M9e2hhbmRsZVJlZ2lzdGVyfSB0eXBlPVwicHJpbWFyeVwiIGRpc2FibGVkPXtsb2FkaW5nfT5cbiAgICAgICAgICAgICAgICB7bG9hZGluZyA/ICdSZWdpc3RlcmluZy4uLicgOiAnUmVnaXN0ZXIgJiBHZXQgQVBJIEtleSd9XG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvQ2FyZD5cblxuICAgICAgICB7ZXJyb3IgJiYgKFxuICAgICAgICAgIDxCb3ggY3NzPXt7IG1hcmdpblRvcDogJ21lZGl1bScgfX0+XG4gICAgICAgICAgICA8QmFubmVyIHR5cGU9XCJjcml0aWNhbFwiPntlcnJvcn08L0Jhbm5lcj5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgKX1cblxuICAgICAgICA8Qm94IGNzcz17eyBtYXJnaW5Ub3A6ICdsYXJnZScgfX0+XG4gICAgICAgICAgPFRleHQgc2l6ZT1cInNtYWxsXCIgY3NzPXt7IGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIEFscmVhZHkgaGF2ZSBhbiBBUEkga2V5PyBSZWZyZXNoIHRoZSBwYWdlIG9yIGNsZWFyIHN0b3JhZ2UgdG8gcmUtcmVnaXN0ZXIuXG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuICAgICk7XG4gIH1cblxuICAvLyBTdGVwIDI6IENvbmZpZ3VyZSBjcmVkZW50aWFsc1xuICBpZiAoc3RlcCA9PT0gJ2NvbmZpZ3VyZScpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ2xhcmdlJyB9fT5cbiAgICAgICAgPEJveCBjc3M9e3sgbWFyZ2luQm90dG9tOiAnbGFyZ2UnIH19PlxuICAgICAgICAgIDxIZWFkaW5nIHNpemU9XCJsYXJnZVwiPkJyaWRnZTwvSGVhZGluZz5cbiAgICAgICAgICA8VGV4dD5Db25uZWN0IHlvdXIgcGF5bWVudCBhY2NvdW50czwvVGV4dD5cbiAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAge3N1Y2Nlc3MgJiYgKFxuICAgICAgICAgIDxCb3ggY3NzPXt7IG1hcmdpbkJvdHRvbTogJ21lZGl1bScgfX0+XG4gICAgICAgICAgICA8QmFubmVyIHR5cGU9XCJkZWZhdWx0XCI+e3N1Y2Nlc3N9PC9CYW5uZXI+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICl9XG5cbiAgICAgICAgey8qIFN0cmlwZSAqL31cbiAgICAgICAgPENhcmQgY3NzPXt7IG1hcmdpbkJvdHRvbTogJ21lZGl1bScgfX0+XG4gICAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScgfX0+XG4gICAgICAgICAgICA8SGVhZGluZyBzaXplPVwic21hbGxcIj5TdHJpcGU8L0hlYWRpbmc+XG4gICAgICAgICAgICA8RGl2aWRlciAvPlxuICAgICAgICAgICAgPEJveCBjc3M9e3sgbWFyZ2luVG9wOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICAgICAge2NvbmZpZz8uc3RyaXBlQ29uZmlndXJlZCA/IChcbiAgICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBnYXA6ICdtZWRpdW0nLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgICAgIDxCYWRnZSB0eXBlPVwicG9zaXRpdmVcIj5Db25uZWN0ZWQ8L0JhZGdlPlxuICAgICAgICAgICAgICAgICAgPFRleHQgc2l6ZT1cInNtYWxsXCIgY3NzPXt7IGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5LZXkgc2F2ZWQ8L1RleHQ+XG4gICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxUZXh0PkVudGVyIHlvdXIgU3RyaXBlIHNlY3JldCBrZXkgKHN0YXJ0cyB3aXRoIHNrX2xpdmVfIG9yIHNrX3Rlc3RfKTwvVGV4dD5cbiAgICAgICAgICAgICAgICAgIDxCb3ggY3NzPXt7IG1hcmdpblRvcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiU3RyaXBlIFNlY3JldCBLZXlcIlxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwic2tfbGl2ZV8uLi5cIlxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3N0cmlwZUtleX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFN0cmlwZUtleShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0NhcmQ+XG5cbiAgICAgICAgey8qIFBheVBhbCAqL31cbiAgICAgICAgPENhcmQgY3NzPXt7IG1hcmdpbkJvdHRvbTogJ21lZGl1bScgfX0+XG4gICAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScgfX0+XG4gICAgICAgICAgICA8SGVhZGluZyBzaXplPVwic21hbGxcIj5QYXlQYWw8L0hlYWRpbmc+XG4gICAgICAgICAgICA8RGl2aWRlciAvPlxuICAgICAgICAgICAgPEJveCBjc3M9e3sgbWFyZ2luVG9wOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICAgICAge2NvbmZpZz8ucGF5cGFsQ29uZmlndXJlZCA/IChcbiAgICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBnYXA6ICdtZWRpdW0nLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgICAgIDxCYWRnZSB0eXBlPVwicG9zaXRpdmVcIj5Db25uZWN0ZWQ8L0JhZGdlPlxuICAgICAgICAgICAgICAgICAgPFRleHQgc2l6ZT1cInNtYWxsXCIgY3NzPXt7IGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5LZXlzIHNhdmVkPC9UZXh0PlxuICAgICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8VGV4dD5FbnRlciB5b3VyIFBheVBhbCBBUEkgY3JlZGVudGlhbHMgKGZyb20gdGhlIFBheVBhbCBEZXZlbG9wZXIgRGFzaGJvYXJkKTwvVGV4dD5cbiAgICAgICAgICAgICAgICAgIDxCb3ggY3NzPXt7IG1hcmdpblRvcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiUGF5UGFsIENsaWVudCBJRFwiXG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJBLi4uXCJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cGF5cGFsQ2xpZW50SWR9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRQYXlwYWxDbGllbnRJZChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICAgIDxCb3ggY3NzPXt7IG1hcmdpblRvcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiUGF5UGFsIENsaWVudCBTZWNyZXRcIlxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRS4uLlwiXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cGF5cGFsQ2xpZW50U2VjcmV0fVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UGF5cGFsQ2xpZW50U2VjcmV0KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICAgICAgPEJveCBjc3M9e3sgbWFyZ2luVG9wOiAnc21hbGwnIH19PlxuICAgICAgICAgICAgICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJQYXlQYWwgRW52aXJvbm1lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwYXlwYWxFbnZ9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRQYXlwYWxFbnYoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9DYXJkPlxuXG4gICAgICAgIHtlcnJvciAmJiAoXG4gICAgICAgICAgPEJveCBjc3M9e3sgbWFyZ2luQm90dG9tOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICAgIDxCYW5uZXIgdHlwZT1cImNyaXRpY2FsXCI+e2Vycm9yfTwvQmFubmVyPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICApfVxuXG4gICAgICAgIDxCdXR0b24gb25QcmVzcz17aGFuZGxlQ29uZmlndXJlfSB0eXBlPVwicHJpbWFyeVwiIGRpc2FibGVkPXtsb2FkaW5nfT5cbiAgICAgICAgICB7bG9hZGluZyA/ICdTYXZpbmcuLi4nIDogJ1NhdmUgJiBDb250aW51ZSd9XG4gICAgICAgIDwvQnV0dG9uPlxuXG4gICAgICAgIHthcGlLZXkgJiYgKFxuICAgICAgICAgIDxCb3ggY3NzPXt7IG1hcmdpblRvcDogJ21lZGl1bScgfX0+XG4gICAgICAgICAgICA8QnV0dG9uIG9uUHJlc3M9e2hhbmRsZUxvZ291dH0gdHlwZT1cInNlY29uZGFyeVwiPlxuICAgICAgICAgICAgICBSZXNldCAoc3RhcnQgb3ZlcilcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICApfVxuICAgICAgPC9Cb3g+XG4gICAgKTtcbiAgfVxuXG4gIC8vIFN0ZXAgMzogRGFzaGJvYXJkXG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ2xhcmdlJyB9fT5cbiAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICA8Qm94IGNzcz17eyBtYXJnaW5Cb3R0b206ICdsYXJnZScgfX0+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGdhcDogJ21lZGl1bScsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxuICAgICAgICAgIDxIZWFkaW5nIHNpemU9XCJsYXJnZVwiPkJyaWRnZTwvSGVhZGluZz5cbiAgICAgICAgICB7Y29uZmlnICYmIChcbiAgICAgICAgICAgIDxUZXh0IHNpemU9XCJzbWFsbFwiIGNzcz17eyBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgIHtjb25maWcuZGlzcGxheU5hbWV9XG4gICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDxUZXh0PlBheVBhbCBcdTIxOTIgU3RyaXBlIFBheW1lbnQgUmVjb3JkcyBzeW5jPC9UZXh0PlxuICAgICAgPC9Cb3g+XG5cbiAgICAgIHsvKiBDb25uZWN0aW9uIHN0YXR1cyAqL31cbiAgICAgIDxDYXJkIGNzcz17eyBtYXJnaW5Cb3R0b206ICdtZWRpdW0nIH19PlxuICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICA8SGVhZGluZyBzaXplPVwic21hbGxcIj5Db25uZWN0aW9uczwvSGVhZGluZz5cbiAgICAgICAgICA8RGl2aWRlciAvPlxuXG4gICAgICAgICAgPElubGluZSBjc3M9e3sgbWFyZ2luVG9wOiAnbWVkaXVtJywgZ2FwOiAnbWVkaXVtJywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICA8VGV4dD5TdHJpcGU8L1RleHQ+XG4gICAgICAgICAgICB7c3RhdHVzPy5zdHJpcGU/LmNvbm5lY3RlZCA/IChcbiAgICAgICAgICAgICAgPEJhZGdlIHR5cGU9XCJwb3NpdGl2ZVwiPkNvbm5lY3RlZDwvQmFkZ2U+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8QmFkZ2UgdHlwZT1cIndhcm5pbmdcIj5ObyBrZXkgY29uZmlndXJlZDwvQmFkZ2U+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvSW5saW5lPlxuXG4gICAgICAgICAgPElubGluZSBjc3M9e3sgbWFyZ2luVG9wOiAnc21hbGwnLCBnYXA6ICdtZWRpdW0nLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgIDxUZXh0PlBheVBhbDwvVGV4dD5cbiAgICAgICAgICAgIHtzdGF0dXM/LnBheXBhbD8uY29ubmVjdGVkID8gKFxuICAgICAgICAgICAgICA8QmFkZ2UgdHlwZT1cInBvc2l0aXZlXCI+Q29ubmVjdGVkPC9CYWRnZT5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxCYWRnZSB0eXBlPVwid2FybmluZ1wiPk5vIGtleSBjb25maWd1cmVkPC9CYWRnZT5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9JbmxpbmU+XG5cbiAgICAgICAgICB7KCFjb25maWc/LnN0cmlwZUNvbmZpZ3VyZWQgfHwgIWNvbmZpZz8ucGF5cGFsQ29uZmlndXJlZCkgJiYgKFxuICAgICAgICAgICAgPEJveCBjc3M9e3sgbWFyZ2luVG9wOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICAgICAgPEJ1dHRvbiBvblByZXNzPXsoKSA9PiBzZXRTdGVwKCdjb25maWd1cmUnKX0gdHlwZT1cInNlY29uZGFyeVwiPlxuICAgICAgICAgICAgICAgIENvbmZpZ3VyZSBBY2NvdW50c1xuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9DYXJkPlxuXG4gICAgICB7LyogU3luYyBzdGF0dXMgKi99XG4gICAgICA8Q2FyZCBjc3M9e3sgbWFyZ2luQm90dG9tOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScgfX0+XG4gICAgICAgICAgPEhlYWRpbmcgc2l6ZT1cInNtYWxsXCI+U3luYyBTdGF0dXM8L0hlYWRpbmc+XG4gICAgICAgICAgPERpdmlkZXIgLz5cblxuICAgICAgICAgIHtzdGF0dXMgPyAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBtYXJnaW5Ub3A6ICdtZWRpdW0nLCBnYXA6ICdtZWRpdW0nIH19PlxuICAgICAgICAgICAgICAgIDxUZXh0PlRyYW5zYWN0aW9ucyBzeW5jZWQ6PC9UZXh0PlxuICAgICAgICAgICAgICAgIDxUZXh0PntzdGF0dXMuc3luYy50b3RhbFN5bmNlZH08L1RleHQ+XG4gICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBtYXJnaW5Ub3A6ICdzbWFsbCcsIGdhcDogJ21lZGl1bScgfX0+XG4gICAgICAgICAgICAgICAgPFRleHQ+TGFzdCBzeW5jOjwvVGV4dD5cbiAgICAgICAgICAgICAgICA8VGV4dD5cbiAgICAgICAgICAgICAgICAgIHtzdGF0dXMuc3luYy5sYXN0U3luY0F0XG4gICAgICAgICAgICAgICAgICAgID8gbmV3IERhdGUoc3RhdHVzLnN5bmMubGFzdFN5bmNBdCkudG9Mb2NhbGVTdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICA6ICdOZXZlcid9XG4gICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgICAge3N0YXR1cy5zeW5jLmVycm9ycy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8Qm94IGNzcz17eyBtYXJnaW5Ub3A6ICdzbWFsbCcgfX0+XG4gICAgICAgICAgICAgICAgICA8VGV4dCBjc3M9e3sgY29sb3I6ICdjcml0aWNhbCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIHtzdGF0dXMuc3luYy5lcnJvcnMubGVuZ3RofSByZWNlbnQgZXJyb3IocylcbiAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICAgIHtzdGF0dXMuc3luYy5lcnJvcnMuc2xpY2UoMCwgMykubWFwKChlOiBhbnksIGk6IG51bWJlcikgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8VGV4dCBrZXk9e2l9IHNpemU9XCJzbWFsbFwiIGNzcz17eyBjb2xvcjogJ2NyaXRpY2FsJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICB7ZS5lcnJvcn1cbiAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPFRleHQgY3NzPXt7IG1hcmdpblRvcDogJ21lZGl1bScgfX0+TG9hZGluZyBzdGF0dXMuLi48L1RleHQ+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHtjb25maWc/LnN0cmlwZUNvbmZpZ3VyZWQgJiYgY29uZmlnPy5wYXlwYWxDb25maWd1cmVkICYmIChcbiAgICAgICAgICAgIDxCb3ggY3NzPXt7IG1hcmdpblRvcDogJ21lZGl1bScgfX0+XG4gICAgICAgICAgICAgIDxCdXR0b24gb25QcmVzcz17aGFuZGxlU3luY05vd30gZGlzYWJsZWQ9e2xvYWRpbmd9PlxuICAgICAgICAgICAgICAgIHtsb2FkaW5nID8gJ1N5bmNpbmcuLi4nIDogJ1N5bmMgTm93J31cbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICApfVxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQ2FyZD5cblxuICAgICAge3N1Y2Nlc3MgJiYgKFxuICAgICAgICA8Qm94IGNzcz17eyBtYXJnaW5Cb3R0b206ICdtZWRpdW0nIH19PlxuICAgICAgICAgIDxCYW5uZXIgdHlwZT1cImRlZmF1bHRcIj57c3VjY2Vzc308L0Jhbm5lcj5cbiAgICAgICAgPC9Cb3g+XG4gICAgICApfVxuXG4gICAgICB7ZXJyb3IgJiYgKFxuICAgICAgICA8Qm94IGNzcz17eyBtYXJnaW5Cb3R0b206ICdtZWRpdW0nIH19PlxuICAgICAgICAgIDxCYW5uZXIgdHlwZT1cImNyaXRpY2FsXCI+e2Vycm9yfTwvQmFubmVyPlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBGb290ZXIgKi99XG4gICAgICA8Qm94IGNzcz17eyBtYXJnaW5Ub3A6ICdsYXJnZScgfX0+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGdhcDogJ21lZGl1bScsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxuICAgICAgICAgIDxCdXR0b24gb25QcmVzcz17KCkgPT4geyBmZXRjaFN0YXR1cyhhcGlLZXkpOyBmZXRjaENvbmZpZyhhcGlLZXkpOyB9fSB0eXBlPVwic2Vjb25kYXJ5XCIgZGlzYWJsZWQ9e2xvYWRpbmd9PlxuICAgICAgICAgICAgUmVmcmVzaFxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b24gb25QcmVzcz17aGFuZGxlTG9nb3V0fSB0eXBlPVwic2Vjb25kYXJ5XCI+XG4gICAgICAgICAgICBEaXNjb25uZWN0XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8Qm94IGNzcz17eyBtYXJnaW5Ub3A6ICdtZWRpdW0nIH19PlxuICAgICAgICAgIDxUZXh0IHNpemU9XCJzbWFsbFwiIGNzcz17eyBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICBCcmlkZ2Ugc3luY3MgeW91ciBQYXlQYWwgdHJhbnNhY3Rpb25zIHRvIFN0cmlwZSBkYWlseS5cbiAgICAgICAgICAgIERhdGEgYXBwZWFycyBpbiBTdHJpcGUgU2lnbWEgYW5kIFJldmVudWUgUmVjb2duaXRpb24uXG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFhLGNBQUEsY0FBYzs7Ozs7Ozs7Ozs7QUNVM0IsVUFBQSxVQUFBLFVBQUE7QUFDQSxVQUFBLFlBQUE7QUFFQSxVQUFNLGVBQWUsQ0FDbkIsY0FDRTtBQUNGLGNBQU0sdUJBQXVCLFVBQVUsZUFBZSxVQUFVLFNBQVE7QUFDeEUsY0FBTSxlQUVGLENBQUMsV0FDSCxHQUFBLGNBQUEsS0FBQyxXQUFTLE9BQUEsT0FBQSxDQUFBLEdBQ0osT0FBSyxFQUNULHNCQUNBLFlBQVksVUFBQSxhQUNaLGVBQWMsS0FBSSxDQUFBLENBQUE7QUFJdEIscUJBQWEsdUJBQXVCO0FBRXBDLGVBQU87TUFDVDtBQUVBLFVBQU0sa0JBQWtCLENBSXRCLE1BQ0EsZUFDQSxxQkFDRTtBQUNGLGNBQU0sbUJBQWtCLEdBQUEsUUFBQSw0QkFBaUMsTUFBTTtVQUM3RDtTQUNEO0FBRUQsWUFBSSxDQUFDLGtCQUFrQjtBQUNyQixpQkFBTztRQUNUO0FBRUEsZUFBTyxhQUFhLGVBQWU7TUFHckM7QUFvV2EsY0FBQSxnQkFBZ0IsZ0JBRzNCLGlCQUFpQixDQUFDLFNBQVMsV0FBVyxTQUFTLFVBQVUsR0FBRyxJQUFJO0FBVXJELGNBQUEsWUFBWSxnQkFDdkIsYUFDQSxDQUFBLEdBQ0EsSUFBSTtBQVdPLGNBQUEsUUFBUSxnQkFBcUMsU0FBUyxDQUFBLEdBQUksSUFBSTtBQVU5RCxjQUFBLFNBQVMsZ0JBQ3BCLFVBQ0EsQ0FBQyxXQUFXLGVBQWUsT0FBTyxHQUNsQyxJQUFJO0FBMEJPLGNBQUEsV0FBVyxnQkFDdEIsWUFDQSxDQUFBLEdBQ0EsSUFBSTtBQXczQk8sY0FBQSxNQUFNLGdCQUFpQyxPQUFPLENBQUEsR0FBSSxJQUFJO0FBYXRELGNBQUEsY0FBYyxn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
