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
  var import_react = __toESM(__require("react"));
  var import_ui = __toESM(require_ui());
  var import_jsx_runtime = __require("react/jsx-runtime");
  var BACKEND_URL = "https://bridge-production-ad61.up.railway.app";
  var App = () => {
    const [view, setView] = import_react.default.useState("welcome");
    const [error, setError] = import_react.default.useState(null);
    const [apiKey, setApiKey] = import_react.default.useState("");
    const [name, setName] = import_react.default.useState("");
    const [sk, setSk] = import_react.default.useState("");
    const [pc, setPc] = import_react.default.useState("");
    const [ps, setPs] = import_react.default.useState("");
    import_react.default.useEffect(() => {
      const k = localStorage.getItem("bk");
      if (k) {
        setApiKey(k);
        setView("done");
      }
    }, []);
    const register = async () => {
      try {
        const r = await fetch(`${BACKEND_URL}/api/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ displayName: name || "User" })
        });
        const d = await r.json();
        if (!r.ok)
          throw new Error(d.error || "fail");
        localStorage.setItem("bk", d.apiKey);
        setApiKey(d.apiKey);
        setView("config");
      } catch (e) {
        setError(e.message);
      }
    };
    const configure = async () => {
      try {
        const body = {};
        if (sk)
          body.stripeKey = sk;
        if (pc)
          body.paypalClientId = pc;
        if (ps)
          body.paypalClientSecret = ps;
        const r = await fetch(`${BACKEND_URL}/api/configure`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
          body: JSON.stringify(body)
        });
        const d = await r.json();
        if (!r.ok)
          throw new Error(d.error || "fail");
        setView("done");
      } catch (e) {
        setError(e.message);
      }
    };
    const sync = async () => {
      try {
        const r = await fetch(`${BACKEND_URL}/api/sync`, {
          method: "POST",
          headers: { "Authorization": `Bearer ${apiKey}` }
        });
        const d = await r.json();
        if (!r.ok)
          throw new Error(d.error || "fail");
        alert(`Synced: ${d.pushed} pushed, ${d.skipped} skipped`);
      } catch (e) {
        alert(e.message);
      }
    };
    if (view === "welcome")
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
        css: { padding: "large" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Heading, {
            size: "xlarge",
            children: "Bridge"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
            children: "PayPal \u2192 Stripe Revenue Recognition"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
            css: { marginTop: "medium" },
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Button, {
              type: "primary",
              onPress: () => setView("register"),
              children: "Get Started"
            })
          })
        ]
      });
    if (view === "register")
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
        css: { padding: "large" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Heading, {
            size: "large",
            children: "Bridge Setup"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Card, {
            css: { marginTop: "medium" },
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
              css: { padding: "medium" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.TextField, {
                  label: "Display Name",
                  placeholder: "Your business",
                  value: name,
                  onChange: (e) => setName(e.target.value)
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
                  css: { marginTop: "medium" },
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Button, {
                    type: "primary",
                    onPress: register,
                    children: "Register"
                  })
                }),
                error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Banner, {
                  type: "critical",
                  css: { marginTop: "medium" },
                  children: error
                })
              ]
            })
          })
        ]
      });
    if (view === "config")
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
        css: { padding: "large" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Heading, {
            size: "large",
            children: "Connect Accounts"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Card, {
            css: { marginTop: "medium" },
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
              css: { padding: "medium" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.TextField, {
                  label: "Stripe Secret Key",
                  type: "password",
                  placeholder: "sk_live_...",
                  value: sk,
                  onChange: (e) => setSk(e.target.value)
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
                  css: { marginTop: "small" },
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.TextField, {
                    label: "PayPal Client ID",
                    placeholder: "A...",
                    value: pc,
                    onChange: (e) => setPc(e.target.value)
                  })
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
                  css: { marginTop: "small" },
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.TextField, {
                    label: "PayPal Client Secret",
                    type: "password",
                    placeholder: "E...",
                    value: ps,
                    onChange: (e) => setPs(e.target.value)
                  })
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
                  css: { marginTop: "medium" },
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Button, {
                    type: "primary",
                    onPress: configure,
                    children: "Save"
                  })
                }),
                error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Banner, {
                  type: "critical",
                  css: { marginTop: "medium" },
                  children: error
                })
              ]
            })
          })
        ]
      });
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
      css: { padding: "large" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Heading, {
          size: "large",
          children: "Bridge"
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Card, {
          css: { marginTop: "medium" },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
            css: { padding: "medium" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Heading, {
                size: "small",
                children: "Sync Status"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Divider, {}),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
                children: "\u2705 Connected"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
                css: { marginTop: "medium" },
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Button, {
                  onPress: sync,
                  children: "Sync Now"
                })
              })
            ]
          })
        })
      ]
    });
  };
  var App_default = App;

  // .build/manifest.js
  __reExport(manifest_exports, __toESM(require_version()));
  var BUILD_TIME = "2026-06-04 22:46:32.733512 +0530 IST m=+1.724075126";
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
          "viewport": "settings"
        }
      ]
    },
    "version": "0.2.1"
  };
  return __toCommonJS(manifest_exports);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvc3JjL3ZlcnNpb24udHMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvc3JjL3VpL2luZGV4LnRzeCIsICJtYW5pZmVzdC5qcyIsICIuLi9zcmMvdmlld3MvQXBwLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFtudWxsLCBudWxsLCAiLy8gQVVUT0dFTkVSQVRFRCAtIERPIE5PVCBNT0RJRllcblxuLy8gVmlldyBjb21wb25lbnQgaW1wb3J0cyBcdTIwMTQgb25lIHBlciB2aWV3cG9ydCBkZWNsYXJlZCBpbiB1aV9leHRlbnNpb24udmlld3NcbmltcG9ydCBBcHAgZnJvbSAnLi4vc3JjL3ZpZXdzL0FwcCc7XG5cbi8vIEV4cG9zZXMgdGhlIFNESyB2ZXJzaW9uIHNvIHRoZSBEYXNoYm9hcmQgY2FuIHZlcmlmeSBjb21wYXRpYmlsaXR5XG5leHBvcnQgKiBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdmVyc2lvbic7XG5cbi8vIE5hbWVkIGV4cG9ydHMgbWFrZSBlYWNoIHZpZXcgY29tcG9uZW50IGFjY2Vzc2libGUgdG8gdGhlIERhc2hib2FyZCBydW50aW1lXG5cbmV4cG9ydCB7IFxuICBBcHBcbiB9O1xuXG4vLyBUaW1lc3RhbXAgY2hhbmdlcyBvbiBldmVyeSBleHBvcnQsIGVuc3VyaW5nIHRoZSBkZXYgc2VydmVyIGRldGVjdHMgYSByZWJ1aWxkXG5leHBvcnQgY29uc3QgQlVJTERfVElNRSA9ICcyMDI2LTA2LTA0IDIyOjQ2OjMyLjczMzUxMiArMDUzMCBJU1QgbT0rMS43MjQwNzUxMjYnO1xuXG4vLyBBcHAgbWFuaWZlc3QgXHUyMDE0IGNvbnN1bWVkIGJ5IHRoZSBEYXNoYm9hcmQgdG8gY29uZmlndXJlIHRoZSBhcHBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgXCIkc2NoZW1hXCI6IFwiaHR0cHM6Ly9zdHJpcGUuY29tL3N0cmlwZS1hcHAuc2NoZW1hLmpzb25cIixcbiAgXCJkaXN0cmlidXRpb25fdHlwZVwiOiBcInByaXZhdGVcIixcbiAgXCJpY29uXCI6IFwiLi9icmlkZ2VfaWNvbl8zMi5wbmdcIixcbiAgXCJpZFwiOiBcImNvbS5icmlkZ2UucGF5bWVudC1zeW5jXCIsXG4gIFwibmFtZVwiOiBcIkJyaWRnZVwiLFxuICBcInBlcm1pc3Npb25zXCI6IFtcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJwYXltZW50X3JlY29yZHNfd3JpdGVcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlN5bmMgUGF5UGFsIChhbmQgb3RoZXIgcHJvY2Vzc29yKSB0cmFuc2FjdGlvbnMgaW50byBTdHJpcGUgUGF5bWVudCBSZWNvcmRzIEFQSSBzbyBhbGwgcmV2ZW51ZSBhcHBlYXJzIGluIFN0cmlwZS5cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwicGF5bWVudF9yZWNvcmRzX3JlYWRcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlJlYWQgZXhpc3RpbmcgcGF5bWVudCByZWNvcmRzIHRvIHZlcmlmeSBzeW5jIHN0YXR1cyBhbmQgYXZvaWQgZHVwbGljYXRlIHB1c2hlcy5cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwiYmFsYW5jZV9yZWFkXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJEaXNwbGF5IHN5bmNlZCB0cmFuc2FjdGlvbiBzdW1tYXJpZXMgaW4gdGhlIEJyaWRnZSBkYXNoYm9hcmQgcGFuZWwuXCJcbiAgICB9XG4gIF0sXG4gIFwic2FuZGJveF9pbnN0YWxsX2NvbXBhdGlibGVcIjogdHJ1ZSxcbiAgXCJzdHJpcGVfYXBpX2FjY2Vzc190eXBlXCI6IFwicGxhdGZvcm1cIixcbiAgXCJ1aV9leHRlbnNpb25cIjoge1xuICAgIFwiY29udGVudF9zZWN1cml0eV9wb2xpY3lcIjoge1xuICAgICAgXCJjb25uZWN0LXNyY1wiOiBbXG4gICAgICAgIFwiaHR0cHM6Ly9icmlkZ2UtcHJvZHVjdGlvbi1hZDYxLnVwLnJhaWx3YXkuYXBwL2FwaS9cIixcbiAgICAgICAgXCJodHRwczovL2FwaS1tLnNhbmRib3gucGF5cGFsLmNvbS92Mi9cIixcbiAgICAgICAgXCJodHRwczovL2FwaS1tLnBheXBhbC5jb20vdjIvXCJcbiAgICAgIF0sXG4gICAgICBcInB1cnBvc2VcIjogXCJBbGxvdyBCcmlkZ2UgdG8gY29ubmVjdCB0byBpdHMgYmFja2VuZCBzZXJ2ZXIgYW5kIFBheVBhbCBBUEkuXCJcbiAgICB9LFxuICAgIFwidmlld3NcIjogW1xuICAgICAge1xuICAgICAgICBcImNvbXBvbmVudFwiOiBcIkFwcFwiLFxuICAgICAgICBcInZpZXdwb3J0XCI6IFwic2V0dGluZ3NcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4yLjFcIlxufTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgQm94LFxuICBCdXR0b24sXG4gIENhcmQsXG4gIEhlYWRpbmcsXG4gIFRleHQsXG4gIEJhZGdlLFxuICBEaXZpZGVyLFxuICBJbmxpbmUsXG4gIFRleHRGaWVsZCxcbiAgQmFubmVyLFxufSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuXG5jb25zdCBCQUNLRU5EX1VSTCA9ICdodHRwczovL2JyaWRnZS1wcm9kdWN0aW9uLWFkNjEudXAucmFpbHdheS5hcHAnO1xuXG5jb25zdCBBcHAgPSAoKSA9PiB7XG4gIGNvbnN0IFt2aWV3LCBzZXRWaWV3XSA9IFJlYWN0LnVzZVN0YXRlPCd3ZWxjb21lJyB8ICdyZWdpc3RlcicgfCAnY29uZmlnJyB8ICdkb25lJz4oJ3dlbGNvbWUnKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2FwaUtleSwgc2V0QXBpS2V5XSA9IFJlYWN0LnVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW25hbWUsIHNldE5hbWVdID0gUmVhY3QudXNlU3RhdGUoJycpO1xuICBjb25zdCBbc2ssIHNldFNrXSA9IFJlYWN0LnVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3BjLCBzZXRQY10gPSBSZWFjdC51c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtwcywgc2V0UHNdID0gUmVhY3QudXNlU3RhdGUoJycpO1xuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgayA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiaycpO1xuICAgIGlmIChrKSB7IHNldEFwaUtleShrKTsgc2V0VmlldygnZG9uZScpOyB9XG4gIH0sIFtdKTtcblxuICBjb25zdCByZWdpc3RlciA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgciA9IGF3YWl0IGZldGNoKGAke0JBQ0tFTkRfVVJMfS9hcGkvcmVnaXN0ZXJgLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBkaXNwbGF5TmFtZTogbmFtZSB8fCAnVXNlcicgfSksXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGQgPSBhd2FpdCByLmpzb24oKTtcbiAgICAgIGlmICghci5vaykgdGhyb3cgbmV3IEVycm9yKGQuZXJyb3IgfHwgJ2ZhaWwnKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdiaycsIGQuYXBpS2V5KTtcbiAgICAgIHNldEFwaUtleShkLmFwaUtleSk7XG4gICAgICBzZXRWaWV3KCdjb25maWcnKTtcbiAgICB9IGNhdGNoIChlOiBhbnkpIHsgc2V0RXJyb3IoZS5tZXNzYWdlKTsgfVxuICB9O1xuXG4gIGNvbnN0IGNvbmZpZ3VyZSA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYm9keTogYW55ID0ge307XG4gICAgICBpZiAoc2spIGJvZHkuc3RyaXBlS2V5ID0gc2s7XG4gICAgICBpZiAocGMpIGJvZHkucGF5cGFsQ2xpZW50SWQgPSBwYztcbiAgICAgIGlmIChwcykgYm9keS5wYXlwYWxDbGllbnRTZWNyZXQgPSBwcztcbiAgICAgIGNvbnN0IHIgPSBhd2FpdCBmZXRjaChgJHtCQUNLRU5EX1VSTH0vYXBpL2NvbmZpZ3VyZWAsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7YXBpS2V5fWAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGQgPSBhd2FpdCByLmpzb24oKTtcbiAgICAgIGlmICghci5vaykgdGhyb3cgbmV3IEVycm9yKGQuZXJyb3IgfHwgJ2ZhaWwnKTtcbiAgICAgIHNldFZpZXcoJ2RvbmUnKTtcbiAgICB9IGNhdGNoIChlOiBhbnkpIHsgc2V0RXJyb3IoZS5tZXNzYWdlKTsgfVxuICB9O1xuXG4gIGNvbnN0IHN5bmMgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHIgPSBhd2FpdCBmZXRjaChgJHtCQUNLRU5EX1VSTH0vYXBpL3N5bmNgLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7ICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2FwaUtleX1gIH0sXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGQgPSBhd2FpdCByLmpzb24oKTtcbiAgICAgIGlmICghci5vaykgdGhyb3cgbmV3IEVycm9yKGQuZXJyb3IgfHwgJ2ZhaWwnKTtcbiAgICAgIGFsZXJ0KGBTeW5jZWQ6ICR7ZC5wdXNoZWR9IHB1c2hlZCwgJHtkLnNraXBwZWR9IHNraXBwZWRgKTtcbiAgICB9IGNhdGNoIChlOiBhbnkpIHsgYWxlcnQoZS5tZXNzYWdlKTsgfVxuICB9O1xuXG4gIGlmICh2aWV3ID09PSAnd2VsY29tZScpIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ2xhcmdlJyB9fT5cbiAgICAgIDxIZWFkaW5nIHNpemU9XCJ4bGFyZ2VcIj5CcmlkZ2U8L0hlYWRpbmc+XG4gICAgICA8VGV4dD5QYXlQYWwgXHUyMTkyIFN0cmlwZSBSZXZlbnVlIFJlY29nbml0aW9uPC9UZXh0PlxuICAgICAgPEJveCBjc3M9e3sgbWFyZ2luVG9wOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgPEJ1dHRvbiB0eXBlPVwicHJpbWFyeVwiIG9uUHJlc3M9eygpID0+IHNldFZpZXcoJ3JlZ2lzdGVyJyl9PkdldCBTdGFydGVkPC9CdXR0b24+XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcblxuICBpZiAodmlldyA9PT0gJ3JlZ2lzdGVyJykgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbGFyZ2UnIH19PlxuICAgICAgPEhlYWRpbmcgc2l6ZT1cImxhcmdlXCI+QnJpZGdlIFNldHVwPC9IZWFkaW5nPlxuICAgICAgPENhcmQgY3NzPXt7IG1hcmdpblRvcDogJ21lZGl1bScgfX0+XG4gICAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nIH19PlxuICAgICAgICAgIDxUZXh0RmllbGQgbGFiZWw9XCJEaXNwbGF5IE5hbWVcIiBwbGFjZWhvbGRlcj1cIllvdXIgYnVzaW5lc3NcIiB2YWx1ZT17bmFtZX0gb25DaGFuZ2U9eyhlOiBhbnkpID0+IHNldE5hbWUoZS50YXJnZXQudmFsdWUpfSAvPlxuICAgICAgICAgIDxCb3ggY3NzPXt7IG1hcmdpblRvcDogJ21lZGl1bScgfX0+XG4gICAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgb25QcmVzcz17cmVnaXN0ZXJ9PlJlZ2lzdGVyPC9CdXR0b24+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAge2Vycm9yICYmIDxCYW5uZXIgdHlwZT1cImNyaXRpY2FsXCIgY3NzPXt7IG1hcmdpblRvcDogJ21lZGl1bScgfX0+e2Vycm9yfTwvQmFubmVyPn1cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0NhcmQ+XG4gICAgPC9Cb3g+XG4gICk7XG5cbiAgaWYgKHZpZXcgPT09ICdjb25maWcnKSByZXR1cm4gKFxuICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdsYXJnZScgfX0+XG4gICAgICA8SGVhZGluZyBzaXplPVwibGFyZ2VcIj5Db25uZWN0IEFjY291bnRzPC9IZWFkaW5nPlxuICAgICAgPENhcmQgY3NzPXt7IG1hcmdpblRvcDogJ21lZGl1bScgfX0+XG4gICAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nIH19PlxuICAgICAgICAgIDxUZXh0RmllbGQgbGFiZWw9XCJTdHJpcGUgU2VjcmV0IEtleVwiIHR5cGU9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwic2tfbGl2ZV8uLi5cIiB2YWx1ZT17c2t9IG9uQ2hhbmdlPXsoZTogYW55KSA9PiBzZXRTayhlLnRhcmdldC52YWx1ZSl9IC8+XG4gICAgICAgICAgPEJveCBjc3M9e3sgbWFyZ2luVG9wOiAnc21hbGwnIH19PlxuICAgICAgICAgICAgPFRleHRGaWVsZCBsYWJlbD1cIlBheVBhbCBDbGllbnQgSURcIiBwbGFjZWhvbGRlcj1cIkEuLi5cIiB2YWx1ZT17cGN9IG9uQ2hhbmdlPXsoZTogYW55KSA9PiBzZXRQYyhlLnRhcmdldC52YWx1ZSl9IC8+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgPEJveCBjc3M9e3sgbWFyZ2luVG9wOiAnc21hbGwnIH19PlxuICAgICAgICAgICAgPFRleHRGaWVsZCBsYWJlbD1cIlBheVBhbCBDbGllbnQgU2VjcmV0XCIgdHlwZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJFLi4uXCIgdmFsdWU9e3BzfSBvbkNoYW5nZT17KGU6IGFueSkgPT4gc2V0UHMoZS50YXJnZXQudmFsdWUpfSAvPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIDxCb3ggY3NzPXt7IG1hcmdpblRvcDogJ21lZGl1bScgfX0+XG4gICAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgb25QcmVzcz17Y29uZmlndXJlfT5TYXZlPC9CdXR0b24+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAge2Vycm9yICYmIDxCYW5uZXIgdHlwZT1cImNyaXRpY2FsXCIgY3NzPXt7IG1hcmdpblRvcDogJ21lZGl1bScgfX0+e2Vycm9yfTwvQmFubmVyPn1cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0NhcmQ+XG4gICAgPC9Cb3g+XG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbGFyZ2UnIH19PlxuICAgICAgPEhlYWRpbmcgc2l6ZT1cImxhcmdlXCI+QnJpZGdlPC9IZWFkaW5nPlxuICAgICAgPENhcmQgY3NzPXt7IG1hcmdpblRvcDogJ21lZGl1bScgfX0+XG4gICAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nIH19PlxuICAgICAgICAgIDxIZWFkaW5nIHNpemU9XCJzbWFsbFwiPlN5bmMgU3RhdHVzPC9IZWFkaW5nPlxuICAgICAgICAgIDxEaXZpZGVyIC8+XG4gICAgICAgICAgPFRleHQ+XHUyNzA1IENvbm5lY3RlZDwvVGV4dD5cbiAgICAgICAgICA8Qm94IGNzcz17eyBtYXJnaW5Ub3A6ICdtZWRpdW0nIH19PlxuICAgICAgICAgICAgPEJ1dHRvbiBvblByZXNzPXtzeW5jfT5TeW5jIE5vdzwvQnV0dG9uPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQ2FyZD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBYSxjQUFBLGNBQWM7Ozs7Ozs7Ozs7O0FDVTNCLFVBQUEsVUFBQSxVQUFBO0FBQ0EsVUFBQSxZQUFBO0FBRUEsVUFBTSxlQUFlLENBQ25CLGNBQ0U7QUFDRixjQUFNLHVCQUF1QixVQUFVLGVBQWUsVUFBVSxTQUFRO0FBQ3hFLGNBQU0sZUFFRixDQUFDLFdBQ0gsR0FBQSxjQUFBLEtBQUMsV0FBUyxPQUFBLE9BQUEsQ0FBQSxHQUNKLE9BQUssRUFDVCxzQkFDQSxZQUFZLFVBQUEsYUFDWixlQUFjLEtBQUksQ0FBQSxDQUFBO0FBSXRCLHFCQUFhLHVCQUF1QjtBQUVwQyxlQUFPO01BQ1Q7QUFFQSxVQUFNLGtCQUFrQixDQUl0QixNQUNBLGVBQ0EscUJBQ0U7QUFDRixjQUFNLG1CQUFrQixHQUFBLFFBQUEsNEJBQWlDLE1BQU07VUFDN0Q7U0FDRDtBQUVELFlBQUksQ0FBQyxrQkFBa0I7QUFDckIsaUJBQU87UUFDVDtBQUVBLGVBQU8sYUFBYSxlQUFlO01BR3JDO0FBb1dhLGNBQUEsZ0JBQWdCLGdCQUczQixpQkFBaUIsQ0FBQyxTQUFTLFdBQVcsU0FBUyxVQUFVLEdBQUcsSUFBSTtBQVVyRCxjQUFBLFlBQVksZ0JBQ3ZCLGFBQ0EsQ0FBQSxHQUNBLElBQUk7QUFXTyxjQUFBLFFBQVEsZ0JBQXFDLFNBQVMsQ0FBQSxHQUFJLElBQUk7QUFVOUQsY0FBQSxTQUFTLGdCQUNwQixVQUNBLENBQUMsV0FBVyxlQUFlLE9BQU8sR0FDbEMsSUFBSTtBQTBCTyxjQUFBLFdBQVcsZ0JBQ3RCLFlBQ0EsQ0FBQSxHQUNBLElBQUk7QUF3M0JPLGNBQUEsTUFBTSxnQkFBaUMsT0FBTyxDQUFBLEdBQUksSUFBSTtBQWF0RCxjQUFBLGNBQWMsZ0JBQ3pCLGVBQ0EsQ0FBQyxhQUFhLEdBQ2QsSUFBSTtBQWlFTyxjQUFBLFNBQVMsZ0JBQ3BCLFVBQ0EsQ0FBQSxHQUNBLElBQUk7QUF3Q08sY0FBQSxXQUFXLGdCQUN0QixZQUNBLENBQUMsT0FBTyxHQUNSLElBQUk7QUFTTyxjQUFBLFdBQVcsZ0JBQ3RCLFlBQ0EsQ0FBQSxHQUNBLElBQUk7QUFnQk8sY0FBQSxPQUFPLGdCQUFtQyxRQUFRLENBQUEsR0FBSSxJQUFJO0FBZ0MxRCxjQUFBLGNBQWMsZ0JBQ3pCLGVBQ0EsQ0FBQyxXQUFXLFVBQVUsaUJBQWlCLGlCQUFpQixpQkFBaUIsR0FDekUsSUFBSTtBQWlDTyxjQUFBLFlBQVksZ0JBQ3ZCLGFBQ0EsQ0FBQyxPQUFPLEdBQ1IsSUFBSTtBQUtPLGNBQUEsVUFBVSxnQkFDckIsV0FDQSxDQUFBLEdBQ0EsSUFBSTtBQTJCTyxjQUFBLFlBQVksZ0JBQ3ZCLGFBQ0EsQ0FBQyxpQkFBaUIsaUJBQWlCLGlCQUFpQixHQUNwRCxJQUFJO0FBb0JPLGNBQUEsaUJBQWlCLGdCQUc1QixrQkFBa0IsQ0FBQSxHQUFJLElBQUk7QUErUWYsY0FBQSxPQUFPLGdCQUFtQyxRQUFRLENBQUEsR0FBSSxJQUFJO0FBbUIxRCxjQUFBLE1BQU0sZ0JBQWlDLE9BQU8sQ0FBQSxHQUFJLElBQUk7QUF1M0J0RCxjQUFBLFNBQVMsZ0JBQ3BCLFVBQ0EsQ0FBQSxHQUNBLElBQUk7QUEwQk8sY0FBQSxZQUFZLGdCQUN2QixhQUNBLENBQUEsR0FDQSxJQUFJO0FBcUVPLGNBQUEsT0FBTyxnQkFBbUMsUUFBUSxDQUFBLEdBQUksSUFBSTtBQW1CMUQsY0FBQSxXQUFXLGdCQUN0QixZQUNBLENBQUMsUUFBUSxTQUFTLGtCQUFrQixTQUFTLE9BQU8sR0FDcEQsSUFBSTtBQVVPLGNBQUEsT0FBTyxnQkFBbUMsUUFBUSxDQUFBLEdBQUksSUFBSTtBQVExRCxjQUFBLFlBQVksZ0JBQ3ZCLGFBQ0EsQ0FBQyxPQUFPLEdBQ1IsSUFBSTtBQWNPLGNBQUEsV0FBVyxnQkFDdEIsWUFDQSxDQUFBLEdBQ0EsSUFBSTtBQVlPLGNBQUEsT0FBTyxnQkFDbEIsUUFDQSxDQUFDLFNBQVMsR0FDVixJQUFJO0FBZ0RPLGNBQUEsUUFBUSxnQkFDbkIsU0FDQSxDQUFDLE9BQU8sR0FDUixJQUFJO0FBbUZPLGNBQUEsU0FBUyxnQkFDcEIsVUFDQSxDQUFDLE9BQU8sR0FDUixJQUFJO0FBYU8sY0FBQSxlQUFlLGdCQUMxQixnQkFDQSxDQUFBLEdBQ0EsSUFBSTtBQTJCTyxjQUFBLGFBQWEsZ0JBQ3hCLGNBQ0EsQ0FBQyw2QkFBNkIsZUFBZSxHQUM3QyxJQUFJO0FBb0JPLGNBQUEsWUFBWSxnQkFDdkIsYUFDQSxDQUFBLEdBQ0EsSUFBSTtBQVVPLGNBQUEsVUFBVSxnQkFDckIsV0FDQSxDQUFBLEdBQ0EsSUFBSTtBQTJDTyxjQUFBLHFCQUFxQixnQkFHaEMsc0JBQXNCLENBQUEsR0FBSSxJQUFJO0FBd0NuQixjQUFBLFNBQVMsZ0JBQ3BCLFVBQ0EsQ0FBQyxPQUFPLEdBQ1IsSUFBSTtBQVFPLGNBQUEsVUFBVSxnQkFDckIsV0FDQSxDQUFBLEdBQ0EsSUFBSTtBQWNPLGNBQUEsV0FBVyxnQkFDdEIsWUFDQSxDQUFBLEdBQ0EsSUFBSTtBQVFPLGNBQUEsWUFBWSxnQkFDdkIsYUFDQSxDQUFBLEdBQ0EsSUFBSTtBQWdCTyxjQUFBLE1BQU0sZ0JBQWlDLE9BQU8sQ0FBQSxHQUFJLElBQUk7QUFPdEQsY0FBQSxZQUFZLGdCQUN2QixhQUNBLENBQUEsR0FDQSxJQUFJO0FBZ0JPLGNBQUEsWUFBWSxnQkFDdkIsYUFDQSxDQUFBLEdBQ0EsSUFBSTtBQVFPLGNBQUEsY0FBYyxnQkFDekIsZUFDQSxDQUFBLEdBQ0EsSUFBSTtBQVFPLGNBQUEsWUFBWSxnQkFDdkIsYUFDQSxDQUFBLEdBQ0EsSUFBSTtBQWdCTyxjQUFBLGtCQUFrQixnQkFHN0IsbUJBQW1CLENBQUEsR0FBSSxJQUFJO0FBVWhCLGNBQUEsUUFBUSxnQkFBcUMsU0FBUyxDQUFBLEdBQUksSUFBSTtBQU85RCxjQUFBLFdBQVcsZ0JBQ3RCLFlBQ0EsQ0FBQSxHQUNBLElBQUk7QUFnQk8sY0FBQSxPQUFPLGdCQUFtQyxRQUFRLENBQUEsR0FBSSxJQUFJO0FBd0cxRCxjQUFBLFdBQVcsZ0JBQ3RCLFlBQ0EsQ0FBQyxPQUFPLEdBQ1IsSUFBSTtBQXlHTyxjQUFBLFlBQVksZ0JBQ3ZCLGFBQ0EsQ0FBQyxPQUFPLEdBQ1IsSUFBSTtBQXlDTyxjQUFBLFVBQVUsZ0JBQ3JCLFdBQ0EsQ0FBQyxTQUFTLEdBQ1YsSUFBSTs7Ozs7QUNycEhOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQUEscUJBQWtCO0FBQ2xCLGtCQVdPO0FBK0RIO0FBN0RKLE1BQU0sY0FBYztBQUVwQixNQUFNLE1BQU0sTUFBTTtBQUNoQixVQUFNLENBQUMsTUFBTSxPQUFPLElBQUksYUFBQUEsUUFBTSxTQUFxRCxTQUFTO0FBQzVGLFVBQU0sQ0FBQyxPQUFPLFFBQVEsSUFBSSxhQUFBQSxRQUFNLFNBQXdCLElBQUk7QUFDNUQsVUFBTSxDQUFDLFFBQVEsU0FBUyxJQUFJLGFBQUFBLFFBQU0sU0FBUyxFQUFFO0FBQzdDLFVBQU0sQ0FBQyxNQUFNLE9BQU8sSUFBSSxhQUFBQSxRQUFNLFNBQVMsRUFBRTtBQUN6QyxVQUFNLENBQUMsSUFBSSxLQUFLLElBQUksYUFBQUEsUUFBTSxTQUFTLEVBQUU7QUFDckMsVUFBTSxDQUFDLElBQUksS0FBSyxJQUFJLGFBQUFBLFFBQU0sU0FBUyxFQUFFO0FBQ3JDLFVBQU0sQ0FBQyxJQUFJLEtBQUssSUFBSSxhQUFBQSxRQUFNLFNBQVMsRUFBRTtBQUVyQyxpQkFBQUEsUUFBTSxVQUFVLE1BQU07QUFDcEIsWUFBTSxJQUFJLGFBQWEsUUFBUSxJQUFJO0FBQ25DLFVBQUksR0FBRztBQUFFLGtCQUFVLENBQUM7QUFBRyxnQkFBUSxNQUFNO0FBQUEsTUFBRztBQUFBLElBQzFDLEdBQUcsQ0FBQyxDQUFDO0FBRUwsVUFBTSxXQUFXLFlBQVk7QUFDM0IsVUFBSTtBQUNGLGNBQU0sSUFBSSxNQUFNLE1BQU0sR0FBRyw0QkFBNEI7QUFBQSxVQUNuRCxRQUFRO0FBQUEsVUFDUixTQUFTLEVBQUUsZ0JBQWdCLG1CQUFtQjtBQUFBLFVBQzlDLE1BQU0sS0FBSyxVQUFVLEVBQUUsYUFBYSxRQUFRLE9BQU8sQ0FBQztBQUFBLFFBQ3RELENBQUM7QUFDRCxjQUFNLElBQUksTUFBTSxFQUFFLEtBQUs7QUFDdkIsWUFBSSxDQUFDLEVBQUU7QUFBSSxnQkFBTSxJQUFJLE1BQU0sRUFBRSxTQUFTLE1BQU07QUFDNUMscUJBQWEsUUFBUSxNQUFNLEVBQUUsTUFBTTtBQUNuQyxrQkFBVSxFQUFFLE1BQU07QUFDbEIsZ0JBQVEsUUFBUTtBQUFBLE1BQ2xCLFNBQVMsR0FBUDtBQUFpQixpQkFBUyxFQUFFLE9BQU87QUFBQSxNQUFHO0FBQUEsSUFDMUM7QUFFQSxVQUFNLFlBQVksWUFBWTtBQUM1QixVQUFJO0FBQ0YsY0FBTSxPQUFZLENBQUM7QUFDbkIsWUFBSTtBQUFJLGVBQUssWUFBWTtBQUN6QixZQUFJO0FBQUksZUFBSyxpQkFBaUI7QUFDOUIsWUFBSTtBQUFJLGVBQUsscUJBQXFCO0FBQ2xDLGNBQU0sSUFBSSxNQUFNLE1BQU0sR0FBRyw2QkFBNkI7QUFBQSxVQUNwRCxRQUFRO0FBQUEsVUFDUixTQUFTLEVBQUUsZ0JBQWdCLG9CQUFvQixpQkFBaUIsVUFBVSxTQUFTO0FBQUEsVUFDbkYsTUFBTSxLQUFLLFVBQVUsSUFBSTtBQUFBLFFBQzNCLENBQUM7QUFDRCxjQUFNLElBQUksTUFBTSxFQUFFLEtBQUs7QUFDdkIsWUFBSSxDQUFDLEVBQUU7QUFBSSxnQkFBTSxJQUFJLE1BQU0sRUFBRSxTQUFTLE1BQU07QUFDNUMsZ0JBQVEsTUFBTTtBQUFBLE1BQ2hCLFNBQVMsR0FBUDtBQUFpQixpQkFBUyxFQUFFLE9BQU87QUFBQSxNQUFHO0FBQUEsSUFDMUM7QUFFQSxVQUFNLE9BQU8sWUFBWTtBQUN2QixVQUFJO0FBQ0YsY0FBTSxJQUFJLE1BQU0sTUFBTSxHQUFHLHdCQUF3QjtBQUFBLFVBQy9DLFFBQVE7QUFBQSxVQUNSLFNBQVMsRUFBRSxpQkFBaUIsVUFBVSxTQUFTO0FBQUEsUUFDakQsQ0FBQztBQUNELGNBQU0sSUFBSSxNQUFNLEVBQUUsS0FBSztBQUN2QixZQUFJLENBQUMsRUFBRTtBQUFJLGdCQUFNLElBQUksTUFBTSxFQUFFLFNBQVMsTUFBTTtBQUM1QyxjQUFNLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxpQkFBaUI7QUFBQSxNQUMxRCxTQUFTLEdBQVA7QUFBaUIsY0FBTSxFQUFFLE9BQU87QUFBQSxNQUFHO0FBQUEsSUFDdkM7QUFFQSxRQUFJLFNBQVM7QUFBVyxhQUN0Qiw2Q0FBQztBQUFBLFFBQUksS0FBSyxFQUFFLFNBQVMsUUFBUTtBQUFBLFFBQzNCO0FBQUEsc0RBQUM7QUFBQSxZQUFRLE1BQUs7QUFBQSxZQUFTO0FBQUEsV0FBTTtBQUFBLFVBQzdCLDRDQUFDO0FBQUEsWUFBSztBQUFBLFdBQW1DO0FBQUEsVUFDekMsNENBQUM7QUFBQSxZQUFJLEtBQUssRUFBRSxXQUFXLFNBQVM7QUFBQSxZQUM5QixzREFBQztBQUFBLGNBQU8sTUFBSztBQUFBLGNBQVUsU0FBUyxNQUFNLFFBQVEsVUFBVTtBQUFBLGNBQUc7QUFBQSxhQUFXO0FBQUEsV0FDeEU7QUFBQTtBQUFBLE9BQ0Y7QUFHRixRQUFJLFNBQVM7QUFBWSxhQUN2Qiw2Q0FBQztBQUFBLFFBQUksS0FBSyxFQUFFLFNBQVMsUUFBUTtBQUFBLFFBQzNCO0FBQUEsc0RBQUM7QUFBQSxZQUFRLE1BQUs7QUFBQSxZQUFRO0FBQUEsV0FBWTtBQUFBLFVBQ2xDLDRDQUFDO0FBQUEsWUFBSyxLQUFLLEVBQUUsV0FBVyxTQUFTO0FBQUEsWUFDL0IsdURBQUM7QUFBQSxjQUFJLEtBQUssRUFBRSxTQUFTLFNBQVM7QUFBQSxjQUM1QjtBQUFBLDREQUFDO0FBQUEsa0JBQVUsT0FBTTtBQUFBLGtCQUFlLGFBQVk7QUFBQSxrQkFBZ0IsT0FBTztBQUFBLGtCQUFNLFVBQVUsQ0FBQyxNQUFXLFFBQVEsRUFBRSxPQUFPLEtBQUs7QUFBQSxpQkFBRztBQUFBLGdCQUN4SCw0Q0FBQztBQUFBLGtCQUFJLEtBQUssRUFBRSxXQUFXLFNBQVM7QUFBQSxrQkFDOUIsc0RBQUM7QUFBQSxvQkFBTyxNQUFLO0FBQUEsb0JBQVUsU0FBUztBQUFBLG9CQUFVO0FBQUEsbUJBQVE7QUFBQSxpQkFDcEQ7QUFBQSxnQkFDQyxTQUFTLDRDQUFDO0FBQUEsa0JBQU8sTUFBSztBQUFBLGtCQUFXLEtBQUssRUFBRSxXQUFXLFNBQVM7QUFBQSxrQkFBSTtBQUFBLGlCQUFNO0FBQUE7QUFBQSxhQUN6RTtBQUFBLFdBQ0Y7QUFBQTtBQUFBLE9BQ0Y7QUFHRixRQUFJLFNBQVM7QUFBVSxhQUNyQiw2Q0FBQztBQUFBLFFBQUksS0FBSyxFQUFFLFNBQVMsUUFBUTtBQUFBLFFBQzNCO0FBQUEsc0RBQUM7QUFBQSxZQUFRLE1BQUs7QUFBQSxZQUFRO0FBQUEsV0FBZ0I7QUFBQSxVQUN0Qyw0Q0FBQztBQUFBLFlBQUssS0FBSyxFQUFFLFdBQVcsU0FBUztBQUFBLFlBQy9CLHVEQUFDO0FBQUEsY0FBSSxLQUFLLEVBQUUsU0FBUyxTQUFTO0FBQUEsY0FDNUI7QUFBQSw0REFBQztBQUFBLGtCQUFVLE9BQU07QUFBQSxrQkFBb0IsTUFBSztBQUFBLGtCQUFXLGFBQVk7QUFBQSxrQkFBYyxPQUFPO0FBQUEsa0JBQUksVUFBVSxDQUFDLE1BQVcsTUFBTSxFQUFFLE9BQU8sS0FBSztBQUFBLGlCQUFHO0FBQUEsZ0JBQ3ZJLDRDQUFDO0FBQUEsa0JBQUksS0FBSyxFQUFFLFdBQVcsUUFBUTtBQUFBLGtCQUM3QixzREFBQztBQUFBLG9CQUFVLE9BQU07QUFBQSxvQkFBbUIsYUFBWTtBQUFBLG9CQUFPLE9BQU87QUFBQSxvQkFBSSxVQUFVLENBQUMsTUFBVyxNQUFNLEVBQUUsT0FBTyxLQUFLO0FBQUEsbUJBQUc7QUFBQSxpQkFDakg7QUFBQSxnQkFDQSw0Q0FBQztBQUFBLGtCQUFJLEtBQUssRUFBRSxXQUFXLFFBQVE7QUFBQSxrQkFDN0Isc0RBQUM7QUFBQSxvQkFBVSxPQUFNO0FBQUEsb0JBQXVCLE1BQUs7QUFBQSxvQkFBVyxhQUFZO0FBQUEsb0JBQU8sT0FBTztBQUFBLG9CQUFJLFVBQVUsQ0FBQyxNQUFXLE1BQU0sRUFBRSxPQUFPLEtBQUs7QUFBQSxtQkFBRztBQUFBLGlCQUNySTtBQUFBLGdCQUNBLDRDQUFDO0FBQUEsa0JBQUksS0FBSyxFQUFFLFdBQVcsU0FBUztBQUFBLGtCQUM5QixzREFBQztBQUFBLG9CQUFPLE1BQUs7QUFBQSxvQkFBVSxTQUFTO0FBQUEsb0JBQVc7QUFBQSxtQkFBSTtBQUFBLGlCQUNqRDtBQUFBLGdCQUNDLFNBQVMsNENBQUM7QUFBQSxrQkFBTyxNQUFLO0FBQUEsa0JBQVcsS0FBSyxFQUFFLFdBQVcsU0FBUztBQUFBLGtCQUFJO0FBQUEsaUJBQU07QUFBQTtBQUFBLGFBQ3pFO0FBQUEsV0FDRjtBQUFBO0FBQUEsT0FDRjtBQUdGLFdBQ0UsNkNBQUM7QUFBQSxNQUFJLEtBQUssRUFBRSxTQUFTLFFBQVE7QUFBQSxNQUMzQjtBQUFBLG9EQUFDO0FBQUEsVUFBUSxNQUFLO0FBQUEsVUFBUTtBQUFBLFNBQU07QUFBQSxRQUM1Qiw0Q0FBQztBQUFBLFVBQUssS0FBSyxFQUFFLFdBQVcsU0FBUztBQUFBLFVBQy9CLHVEQUFDO0FBQUEsWUFBSSxLQUFLLEVBQUUsU0FBUyxTQUFTO0FBQUEsWUFDNUI7QUFBQSwwREFBQztBQUFBLGdCQUFRLE1BQUs7QUFBQSxnQkFBUTtBQUFBLGVBQVc7QUFBQSxjQUNqQyw0Q0FBQyxxQkFBUTtBQUFBLGNBQ1QsNENBQUM7QUFBQSxnQkFBSztBQUFBLGVBQVc7QUFBQSxjQUNqQiw0Q0FBQztBQUFBLGdCQUFJLEtBQUssRUFBRSxXQUFXLFNBQVM7QUFBQSxnQkFDOUIsc0RBQUM7QUFBQSxrQkFBTyxTQUFTO0FBQUEsa0JBQU07QUFBQSxpQkFBUTtBQUFBLGVBQ2pDO0FBQUE7QUFBQSxXQUNGO0FBQUEsU0FDRjtBQUFBO0FBQUEsS0FDRjtBQUFBLEVBRUo7QUFFQSxNQUFPLGNBQVE7OztBRG5JZiwrQkFBYztBQVNQLE1BQU0sYUFBYTtBQUcxQixNQUFPLG1CQUFRO0FBQUEsSUFDYixXQUFXO0FBQUEsSUFDWCxxQkFBcUI7QUFBQSxJQUNyQixRQUFRO0FBQUEsSUFDUixNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYjtBQUFBLFFBQ0UsY0FBYztBQUFBLFFBQ2QsV0FBVztBQUFBLE1BQ2I7QUFBQSxNQUNBO0FBQUEsUUFDRSxjQUFjO0FBQUEsUUFDZCxXQUFXO0FBQUEsTUFDYjtBQUFBLE1BQ0E7QUFBQSxRQUNFLGNBQWM7QUFBQSxRQUNkLFdBQVc7QUFBQSxNQUNiO0FBQUEsSUFDRjtBQUFBLElBQ0EsOEJBQThCO0FBQUEsSUFDOUIsMEJBQTBCO0FBQUEsSUFDMUIsZ0JBQWdCO0FBQUEsTUFDZCwyQkFBMkI7QUFBQSxRQUN6QixlQUFlO0FBQUEsVUFDYjtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLFFBQ0EsV0FBVztBQUFBLE1BQ2I7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQO0FBQUEsVUFDRSxhQUFhO0FBQUEsVUFDYixZQUFZO0FBQUEsUUFDZDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxXQUFXO0FBQUEsRUFDYjsiLAogICJuYW1lcyI6IFsiUmVhY3QiXQp9Cg==
