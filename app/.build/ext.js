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
    const [status, setStatus] = (0, import_react.useState)(null);
    const [loading, setLoading] = (0, import_react.useState)(true);
    const [error, setError] = (0, import_react.useState)(null);
    const fetchStatus = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${BACKEND_URL}/api/status`);
        if (!res.ok)
          throw new Error(`Status check failed: ${res.status}`);
        const data = await res.json();
        setStatus(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    (0, import_react.useEffect)(() => {
      fetchStatus();
    }, []);
    const handleConnectPayPal = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/paypal/auth-url`);
        if (!res.ok)
          throw new Error("Failed to get auth URL");
        const data = await res.json();
        window.open(data.url, "connect-paypal", "width=600,height=700");
      } catch (err) {
        setError(err.message);
      }
    };
    const handleSyncNow = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/sync`, { method: "POST" });
        if (!res.ok)
          throw new Error("Sync failed");
        await fetchStatus();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
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
              children: "Sync PayPal transactions into Stripe Payment Records"
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
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Badge, {
                    type: "positive",
                    children: "Connected"
                  })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Inline, {
                css: { marginTop: "small", gap: "medium", alignItems: "center" },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
                    children: "PayPal"
                  }),
                  loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Spinner, {}) : status?.connected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Badge, {
                    type: "positive",
                    children: "Connected"
                  }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Badge, {
                    type: "warning",
                    children: "Disconnected"
                  })
                ]
              }),
              !status?.connected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
                css: { marginTop: "medium" },
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Button, {
                  onPress: handleConnectPayPal,
                  type: "primary",
                  children: "Connect PayPal"
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
                        children: status.totalSynced
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
                        children: status.lastSyncAt ? new Date(status.lastSyncAt).toLocaleString() : "Never"
                      })
                    ]
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Inline, {
                    css: { marginTop: "small", gap: "medium" },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
                        children: "Processor:"
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
                        children: status.processor || "None configured"
                      })
                    ]
                  })
                ]
              }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
                css: { marginTop: "medium" },
                children: "No sync data yet."
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
                css: { marginTop: "medium" },
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Button, {
                  onPress: handleSyncNow,
                  disabled: loading || !status?.connected,
                  children: loading ? "Syncing..." : "Sync Now"
                })
              })
            ]
          })
        }),
        error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Card, {
          css: { marginBottom: "medium" },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
            css: { padding: "medium" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Text, {
                css: { color: "critical" },
                children: [
                  "Error: ",
                  error
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Button, {
                onPress: fetchStatus,
                children: "Retry"
              })
            ]
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
          css: { marginTop: "large" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
              size: "small",
              css: { color: "secondary" },
              children: "Bridge syncs your PayPal transactions to Stripe daily. Data appears in Stripe Sigma and Revenue Recognition."
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Link, {
              href: "https://bridgepay.dev",
              target: "_blank",
              children: "bridgepay.dev"
            })
          ]
        })
      ]
    });
  };
  var App_default = App;

  // .build/manifest.js
  __reExport(manifest_exports, __toESM(require_version()));
  var BUILD_TIME = "2026-06-04 18:50:48.271755 +0530 IST m=+3.072281918";
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
    "version": "0.1.0"
  };
  return __toCommonJS(manifest_exports);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvc3JjL3ZlcnNpb24udHMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvc3JjL3VpL2luZGV4LnRzeCIsICJtYW5pZmVzdC5qcyIsICIuLi9zcmMvdmlld3MvQXBwLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFtudWxsLCBudWxsLCAiLy8gQVVUT0dFTkVSQVRFRCAtIERPIE5PVCBNT0RJRllcblxuLy8gVmlldyBjb21wb25lbnQgaW1wb3J0cyBcdTIwMTQgb25lIHBlciB2aWV3cG9ydCBkZWNsYXJlZCBpbiB1aV9leHRlbnNpb24udmlld3NcbmltcG9ydCBBcHAgZnJvbSAnLi4vc3JjL3ZpZXdzL0FwcCc7XG5cbi8vIEV4cG9zZXMgdGhlIFNESyB2ZXJzaW9uIHNvIHRoZSBEYXNoYm9hcmQgY2FuIHZlcmlmeSBjb21wYXRpYmlsaXR5XG5leHBvcnQgKiBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdmVyc2lvbic7XG5cbi8vIE5hbWVkIGV4cG9ydHMgbWFrZSBlYWNoIHZpZXcgY29tcG9uZW50IGFjY2Vzc2libGUgdG8gdGhlIERhc2hib2FyZCBydW50aW1lXG5cbmV4cG9ydCB7IFxuICBBcHBcbiB9O1xuXG4vLyBUaW1lc3RhbXAgY2hhbmdlcyBvbiBldmVyeSBleHBvcnQsIGVuc3VyaW5nIHRoZSBkZXYgc2VydmVyIGRldGVjdHMgYSByZWJ1aWxkXG5leHBvcnQgY29uc3QgQlVJTERfVElNRSA9ICcyMDI2LTA2LTA0IDE4OjUwOjQ4LjI3MTc1NSArMDUzMCBJU1QgbT0rMy4wNzIyODE5MTgnO1xuXG4vLyBBcHAgbWFuaWZlc3QgXHUyMDE0IGNvbnN1bWVkIGJ5IHRoZSBEYXNoYm9hcmQgdG8gY29uZmlndXJlIHRoZSBhcHBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgXCIkc2NoZW1hXCI6IFwiaHR0cHM6Ly9zdHJpcGUuY29tL3N0cmlwZS1hcHAuc2NoZW1hLmpzb25cIixcbiAgXCJkaXN0cmlidXRpb25fdHlwZVwiOiBcInByaXZhdGVcIixcbiAgXCJpY29uXCI6IFwiLi9icmlkZ2VfaWNvbl8zMi5wbmdcIixcbiAgXCJpZFwiOiBcImNvbS5icmlkZ2UucGF5bWVudC1zeW5jXCIsXG4gIFwibmFtZVwiOiBcIkJyaWRnZVwiLFxuICBcInBlcm1pc3Npb25zXCI6IFtcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJwYXltZW50X3JlY29yZHNfd3JpdGVcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlN5bmMgUGF5UGFsIChhbmQgb3RoZXIgcHJvY2Vzc29yKSB0cmFuc2FjdGlvbnMgaW50byBTdHJpcGUgUGF5bWVudCBSZWNvcmRzIEFQSSBzbyBhbGwgcmV2ZW51ZSBhcHBlYXJzIGluIFN0cmlwZS5cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwicGF5bWVudF9yZWNvcmRzX3JlYWRcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlJlYWQgZXhpc3RpbmcgcGF5bWVudCByZWNvcmRzIHRvIHZlcmlmeSBzeW5jIHN0YXR1cyBhbmQgYXZvaWQgZHVwbGljYXRlIHB1c2hlcy5cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwiYmFsYW5jZV9yZWFkXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJEaXNwbGF5IHN5bmNlZCB0cmFuc2FjdGlvbiBzdW1tYXJpZXMgaW4gdGhlIEJyaWRnZSBkYXNoYm9hcmQgcGFuZWwuXCJcbiAgICB9XG4gIF0sXG4gIFwic2FuZGJveF9pbnN0YWxsX2NvbXBhdGlibGVcIjogdHJ1ZSxcbiAgXCJzdHJpcGVfYXBpX2FjY2Vzc190eXBlXCI6IFwicGxhdGZvcm1cIixcbiAgXCJ1aV9leHRlbnNpb25cIjoge1xuICAgIFwiY29udGVudF9zZWN1cml0eV9wb2xpY3lcIjoge1xuICAgICAgXCJjb25uZWN0LXNyY1wiOiBbXG4gICAgICAgIFwiaHR0cHM6Ly9icmlkZ2UtcHJvZHVjdGlvbi1hZDYxLnVwLnJhaWx3YXkuYXBwL2FwaS9cIixcbiAgICAgICAgXCJodHRwczovL2FwaS1tLnNhbmRib3gucGF5cGFsLmNvbS92Mi9cIixcbiAgICAgICAgXCJodHRwczovL2FwaS1tLnBheXBhbC5jb20vdjIvXCJcbiAgICAgIF0sXG4gICAgICBcInB1cnBvc2VcIjogXCJBbGxvdyBCcmlkZ2UgdG8gY29ubmVjdCB0byBpdHMgYmFja2VuZCBzZXJ2ZXIgYW5kIFBheVBhbCBBUEkuXCJcbiAgICB9LFxuICAgIFwidmlld3NcIjogW1xuICAgICAge1xuICAgICAgICBcImNvbXBvbmVudFwiOiBcIkFwcFwiLFxuICAgICAgICBcInZpZXdwb3J0XCI6IFwic3RyaXBlLmRhc2hib2FyZC5ob21lLm92ZXJ2aWV3XCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwidmVyc2lvblwiOiBcIjAuMS4wXCJcbn07XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBCb3gsXG4gIEJ1dHRvbixcbiAgQ2FyZCxcbiAgSGVhZGluZyxcbiAgVGV4dCxcbiAgQmFkZ2UsXG4gIExpbmssXG4gIFNwaW5uZXIsXG4gIERpdmlkZXIsXG4gIElubGluZSxcbn0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcblxuY29uc3QgQkFDS0VORF9VUkwgPSAnaHR0cHM6Ly9icmlkZ2UtcHJvZHVjdGlvbi1hZDYxLnVwLnJhaWx3YXkuYXBwJztcblxuaW50ZXJmYWNlIFN5bmNTdGF0dXMge1xuICBjb25uZWN0ZWQ6IGJvb2xlYW47XG4gIGxhc3RTeW5jQXQ6IHN0cmluZyB8IG51bGw7XG4gIHRvdGFsU3luY2VkOiBudW1iZXI7XG4gIHByb2Nlc3Nvcjogc3RyaW5nO1xufVxuXG4vKipcbiAqIE1haW4gdmlldyBmb3IgdGhlIEJyaWRnZSBTdHJpcGUgQXBwLlxuICogU2hvd3MgY29ubmVjdGlvbiBzdGF0dXMsIGFsbG93cyBQYXlQYWwgbGlua2luZywgYW5kIHNob3dzIHN5bmMgc3RhdHMuXG4gKi9cbmNvbnN0IEFwcCA9ICgpID0+IHtcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlPFN5bmNTdGF0dXMgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgZmV0Y2hTdGF0dXMgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRFcnJvcihudWxsKTtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBQ0tFTkRfVVJMfS9hcGkvc3RhdHVzYCk7XG4gICAgICBpZiAoIXJlcy5vaykgdGhyb3cgbmV3IEVycm9yKGBTdGF0dXMgY2hlY2sgZmFpbGVkOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgIHNldFN0YXR1cyhkYXRhKTtcbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgc2V0RXJyb3IoZXJyLm1lc3NhZ2UpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBmZXRjaFN0YXR1cygpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlQ29ubmVjdFBheVBhbCA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7QkFDS0VORF9VUkx9L2FwaS9wYXlwYWwvYXV0aC11cmxgKTtcbiAgICAgIGlmICghcmVzLm9rKSB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBnZXQgYXV0aCBVUkwnKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuICAgICAgLy8gT3BlbiBQYXlQYWwgT0F1dGggaW4gYSBuZXcgd2luZG93XG4gICAgICB3aW5kb3cub3BlbihkYXRhLnVybCwgJ2Nvbm5lY3QtcGF5cGFsJywgJ3dpZHRoPTYwMCxoZWlnaHQ9NzAwJyk7XG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgIHNldEVycm9yKGVyci5tZXNzYWdlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU3luY05vdyA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBQ0tFTkRfVVJMfS9hcGkvc3luY2AsIHsgbWV0aG9kOiAnUE9TVCcgfSk7XG4gICAgICBpZiAoIXJlcy5vaykgdGhyb3cgbmV3IEVycm9yKCdTeW5jIGZhaWxlZCcpO1xuICAgICAgYXdhaXQgZmV0Y2hTdGF0dXMoKTtcbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgc2V0RXJyb3IoZXJyLm1lc3NhZ2UpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbGFyZ2UnIH19PlxuICAgICAgey8qIEhlYWRlciAqL31cbiAgICAgIDxCb3ggY3NzPXt7IG1hcmdpbkJvdHRvbTogJ2xhcmdlJyB9fT5cbiAgICAgICAgPEhlYWRpbmcgc2l6ZT1cImxhcmdlXCI+QnJpZGdlPC9IZWFkaW5nPlxuICAgICAgICA8VGV4dD5TeW5jIFBheVBhbCB0cmFuc2FjdGlvbnMgaW50byBTdHJpcGUgUGF5bWVudCBSZWNvcmRzPC9UZXh0PlxuICAgICAgPC9Cb3g+XG5cbiAgICAgIHsvKiBDb25uZWN0aW9uIFN0YXR1cyAqL31cbiAgICAgIDxDYXJkIGNzcz17eyBtYXJnaW5Cb3R0b206ICdtZWRpdW0nIH19PlxuICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICA8SGVhZGluZyBzaXplPVwic21hbGxcIj5Db25uZWN0aW9uczwvSGVhZGluZz5cbiAgICAgICAgICA8RGl2aWRlciAvPlxuXG4gICAgICAgICAgPElubGluZSBjc3M9e3sgbWFyZ2luVG9wOiAnbWVkaXVtJywgZ2FwOiAnbWVkaXVtJywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICA8VGV4dD5TdHJpcGU8L1RleHQ+XG4gICAgICAgICAgICA8QmFkZ2UgdHlwZT1cInBvc2l0aXZlXCI+Q29ubmVjdGVkPC9CYWRnZT5cbiAgICAgICAgICA8L0lubGluZT5cblxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IG1hcmdpblRvcDogJ3NtYWxsJywgZ2FwOiAnbWVkaXVtJywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICA8VGV4dD5QYXlQYWw8L1RleHQ+XG4gICAgICAgICAgICB7bG9hZGluZyA/IChcbiAgICAgICAgICAgICAgPFNwaW5uZXIgLz5cbiAgICAgICAgICAgICkgOiBzdGF0dXM/LmNvbm5lY3RlZCA/IChcbiAgICAgICAgICAgICAgPEJhZGdlIHR5cGU9XCJwb3NpdGl2ZVwiPkNvbm5lY3RlZDwvQmFkZ2U+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8QmFkZ2UgdHlwZT1cIndhcm5pbmdcIj5EaXNjb25uZWN0ZWQ8L0JhZGdlPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L0lubGluZT5cblxuICAgICAgICAgIHshc3RhdHVzPy5jb25uZWN0ZWQgJiYgKFxuICAgICAgICAgICAgPEJveCBjc3M9e3sgbWFyZ2luVG9wOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICAgICAgPEJ1dHRvbiBvblByZXNzPXtoYW5kbGVDb25uZWN0UGF5UGFsfSB0eXBlPVwicHJpbWFyeVwiPlxuICAgICAgICAgICAgICAgIENvbm5lY3QgUGF5UGFsXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0NhcmQ+XG5cbiAgICAgIHsvKiBTeW5jIFN0YXR1cyAqL31cbiAgICAgIDxDYXJkIGNzcz17eyBtYXJnaW5Cb3R0b206ICdtZWRpdW0nIH19PlxuICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICA8SGVhZGluZyBzaXplPVwic21hbGxcIj5TeW5jIFN0YXR1czwvSGVhZGluZz5cbiAgICAgICAgICA8RGl2aWRlciAvPlxuXG4gICAgICAgICAge3N0YXR1cyA/IChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IG1hcmdpblRvcDogJ21lZGl1bScsIGdhcDogJ21lZGl1bScgfX0+XG4gICAgICAgICAgICAgICAgPFRleHQ+VHJhbnNhY3Rpb25zIHN5bmNlZDo8L1RleHQ+XG4gICAgICAgICAgICAgICAgPFRleHQ+e3N0YXR1cy50b3RhbFN5bmNlZH08L1RleHQ+XG4gICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBtYXJnaW5Ub3A6ICdzbWFsbCcsIGdhcDogJ21lZGl1bScgfX0+XG4gICAgICAgICAgICAgICAgPFRleHQ+TGFzdCBzeW5jOjwvVGV4dD5cbiAgICAgICAgICAgICAgICA8VGV4dD5cbiAgICAgICAgICAgICAgICAgIHtzdGF0dXMubGFzdFN5bmNBdFxuICAgICAgICAgICAgICAgICAgICA/IG5ldyBEYXRlKHN0YXR1cy5sYXN0U3luY0F0KS50b0xvY2FsZVN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgIDogJ05ldmVyJ31cbiAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBtYXJnaW5Ub3A6ICdzbWFsbCcsIGdhcDogJ21lZGl1bScgfX0+XG4gICAgICAgICAgICAgICAgPFRleHQ+UHJvY2Vzc29yOjwvVGV4dD5cbiAgICAgICAgICAgICAgICA8VGV4dD57c3RhdHVzLnByb2Nlc3NvciB8fCAnTm9uZSBjb25maWd1cmVkJ308L1RleHQ+XG4gICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxUZXh0IGNzcz17eyBtYXJnaW5Ub3A6ICdtZWRpdW0nIH19Pk5vIHN5bmMgZGF0YSB5ZXQuPC9UZXh0PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICA8Qm94IGNzcz17eyBtYXJnaW5Ub3A6ICdtZWRpdW0nIH19PlxuICAgICAgICAgICAgPEJ1dHRvbiBvblByZXNzPXtoYW5kbGVTeW5jTm93fSBkaXNhYmxlZD17bG9hZGluZyB8fCAhc3RhdHVzPy5jb25uZWN0ZWR9PlxuICAgICAgICAgICAgICB7bG9hZGluZyA/ICdTeW5jaW5nLi4uJyA6ICdTeW5jIE5vdyd9XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0NhcmQ+XG5cbiAgICAgIHsvKiBFcnJvciAqL31cbiAgICAgIHtlcnJvciAmJiAoXG4gICAgICAgIDxDYXJkIGNzcz17eyBtYXJnaW5Cb3R0b206ICdtZWRpdW0nIH19PlxuICAgICAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nIH19PlxuICAgICAgICAgICAgPFRleHQgY3NzPXt7IGNvbG9yOiAnY3JpdGljYWwnIH19PkVycm9yOiB7ZXJyb3J9PC9UZXh0PlxuICAgICAgICAgICAgPEJ1dHRvbiBvblByZXNzPXtmZXRjaFN0YXR1c30+UmV0cnk8L0J1dHRvbj5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9DYXJkPlxuICAgICAgKX1cblxuICAgICAgey8qIEZvb3RlciAqL31cbiAgICAgIDxCb3ggY3NzPXt7IG1hcmdpblRvcDogJ2xhcmdlJyB9fT5cbiAgICAgICAgPFRleHQgc2l6ZT1cInNtYWxsXCIgY3NzPXt7IGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICBCcmlkZ2Ugc3luY3MgeW91ciBQYXlQYWwgdHJhbnNhY3Rpb25zIHRvIFN0cmlwZSBkYWlseS5cbiAgICAgICAgICBEYXRhIGFwcGVhcnMgaW4gU3RyaXBlIFNpZ21hIGFuZCBSZXZlbnVlIFJlY29nbml0aW9uLlxuICAgICAgICA8L1RleHQ+XG4gICAgICAgIDxMaW5rIGhyZWY9XCJodHRwczovL2JyaWRnZXBheS5kZXZcIiB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgICAgICBicmlkZ2VwYXkuZGV2XG4gICAgICAgIDwvTGluaz5cbiAgICAgIDwvQm94PlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFhLGNBQUEsY0FBYzs7Ozs7Ozs7Ozs7QUNVM0IsVUFBQSxVQUFBLFVBQUE7QUFDQSxVQUFBLFlBQUE7QUFFQSxVQUFNLGVBQWUsQ0FDbkIsY0FDRTtBQUNGLGNBQU0sdUJBQXVCLFVBQVUsZUFBZSxVQUFVLFNBQVE7QUFDeEUsY0FBTSxlQUVGLENBQUMsV0FDSCxHQUFBLGNBQUEsS0FBQyxXQUFTLE9BQUEsT0FBQSxDQUFBLEdBQ0osT0FBSyxFQUNULHNCQUNBLFlBQVksVUFBQSxhQUNaLGVBQWMsS0FBSSxDQUFBLENBQUE7QUFJdEIscUJBQWEsdUJBQXVCO0FBRXBDLGVBQU87TUFDVDtBQUVBLFVBQU0sa0JBQWtCLENBSXRCLE1BQ0EsZUFDQSxxQkFDRTtBQUNGLGNBQU0sbUJBQWtCLEdBQUEsUUFBQSw0QkFBaUMsTUFBTTtVQUM3RDtTQUNEO0FBRUQsWUFBSSxDQUFDLGtCQUFrQjtBQUNyQixpQkFBTztRQUNUO0FBRUEsZUFBTyxhQUFhLGVBQWU7TUFHckM7QUFvV2EsY0FBQSxnQkFBZ0IsZ0JBRzNCLGlCQUFpQixDQUFDLFNBQVMsV0FBVyxTQUFTLFVBQVUsR0FBRyxJQUFJO0FBVXJELGNBQUEsWUFBWSxnQkFDdkIsYUFDQSxDQUFBLEdBQ0EsSUFBSTtBQVdPLGNBQUEsUUFBUSxnQkFBcUMsU0FBUyxDQUFBLEdBQUksSUFBSTtBQVU5RCxjQUFBLFNBQVMsZ0JBQ3BCLFVBQ0EsQ0FBQyxXQUFXLGVBQWUsT0FBTyxHQUNsQyxJQUFJO0FBMEJPLGNBQUEsV0FBVyxnQkFDdEIsWUFDQSxDQUFBLEdBQ0EsSUFBSTtBQXczQk8sY0FBQSxNQUFNLGdCQUFpQyxPQUFPLENBQUEsR0FBSSxJQUFJO0FBYXRELGNBQUEsY0FBYyxnQkFDekIsZUFDQSxDQUFDLGFBQWEsR0FDZCxJQUFJO0FBaUVPLGNBQUEsU0FBUyxnQkFDcEIsVUFDQSxDQUFBLEdBQ0EsSUFBSTtBQXdDTyxjQUFBLFdBQVcsZ0JBQ3RCLFlBQ0EsQ0FBQyxPQUFPLEdBQ1IsSUFBSTtBQVNPLGNBQUEsV0FBVyxnQkFDdEIsWUFDQSxDQUFBLEdBQ0EsSUFBSTtBQWdCTyxjQUFBLE9BQU8sZ0JBQW1DLFFBQVEsQ0FBQSxHQUFJLElBQUk7QUFnQzFELGNBQUEsY0FBYyxnQkFDekIsZUFDQSxDQUFDLFdBQVcsVUFBVSxpQkFBaUIsaUJBQWlCLGlCQUFpQixHQUN6RSxJQUFJO0FBaUNPLGNBQUEsWUFBWSxnQkFDdkIsYUFDQSxDQUFDLE9BQU8sR0FDUixJQUFJO0FBS08sY0FBQSxVQUFVLGdCQUNyQixXQUNBLENBQUEsR0FDQSxJQUFJO0FBMkJPLGNBQUEsWUFBWSxnQkFDdkIsYUFDQSxDQUFDLGlCQUFpQixpQkFBaUIsaUJBQWlCLEdBQ3BELElBQUk7QUFvQk8sY0FBQSxpQkFBaUIsZ0JBRzVCLGtCQUFrQixDQUFBLEdBQUksSUFBSTtBQStRZixjQUFBLE9BQU8sZ0JBQW1DLFFBQVEsQ0FBQSxHQUFJLElBQUk7QUFtQjFELGNBQUEsTUFBTSxnQkFBaUMsT0FBTyxDQUFBLEdBQUksSUFBSTtBQXUzQnRELGNBQUEsU0FBUyxnQkFDcEIsVUFDQSxDQUFBLEdBQ0EsSUFBSTtBQTBCTyxjQUFBLFlBQVksZ0JBQ3ZCLGFBQ0EsQ0FBQSxHQUNBLElBQUk7QUFxRU8sY0FBQSxPQUFPLGdCQUFtQyxRQUFRLENBQUEsR0FBSSxJQUFJO0FBbUIxRCxjQUFBLFdBQVcsZ0JBQ3RCLFlBQ0EsQ0FBQyxRQUFRLFNBQVMsa0JBQWtCLFNBQVMsT0FBTyxHQUNwRCxJQUFJO0FBVU8sY0FBQSxPQUFPLGdCQUFtQyxRQUFRLENBQUEsR0FBSSxJQUFJO0FBUTFELGNBQUEsWUFBWSxnQkFDdkIsYUFDQSxDQUFDLE9BQU8sR0FDUixJQUFJO0FBY08sY0FBQSxXQUFXLGdCQUN0QixZQUNBLENBQUEsR0FDQSxJQUFJO0FBWU8sY0FBQSxPQUFPLGdCQUNsQixRQUNBLENBQUMsU0FBUyxHQUNWLElBQUk7QUFnRE8sY0FBQSxRQUFRLGdCQUNuQixTQUNBLENBQUMsT0FBTyxHQUNSLElBQUk7QUFtRk8sY0FBQSxTQUFTLGdCQUNwQixVQUNBLENBQUMsT0FBTyxHQUNSLElBQUk7QUFhTyxjQUFBLGVBQWUsZ0JBQzFCLGdCQUNBLENBQUEsR0FDQSxJQUFJO0FBMkJPLGNBQUEsYUFBYSxnQkFDeEIsY0FDQSxDQUFDLDZCQUE2QixlQUFlLEdBQzdDLElBQUk7QUFvQk8sY0FBQSxZQUFZLGdCQUN2QixhQUNBLENBQUEsR0FDQSxJQUFJO0FBVU8sY0FBQSxVQUFVLGdCQUNyQixXQUNBLENBQUEsR0FDQSxJQUFJO0FBMkNPLGNBQUEscUJBQXFCLGdCQUdoQyxzQkFBc0IsQ0FBQSxHQUFJLElBQUk7QUF3Q25CLGNBQUEsU0FBUyxnQkFDcEIsVUFDQSxDQUFDLE9BQU8sR0FDUixJQUFJO0FBUU8sY0FBQSxVQUFVLGdCQUNyQixXQUNBLENBQUEsR0FDQSxJQUFJO0FBY08sY0FBQSxXQUFXLGdCQUN0QixZQUNBLENBQUEsR0FDQSxJQUFJO0FBUU8sY0FBQSxZQUFZLGdCQUN2QixhQUNBLENBQUEsR0FDQSxJQUFJO0FBZ0JPLGNBQUEsTUFBTSxnQkFBaUMsT0FBTyxDQUFBLEdBQUksSUFBSTtBQU90RCxjQUFBLFlBQVksZ0JBQ3ZCLGFBQ0EsQ0FBQSxHQUNBLElBQUk7QUFnQk8sY0FBQSxZQUFZLGdCQUN2QixhQUNBLENBQUEsR0FDQSxJQUFJO0FBUU8sY0FBQSxjQUFjLGdCQUN6QixlQUNBLENBQUEsR0FDQSxJQUFJO0FBUU8sY0FBQSxZQUFZLGdCQUN2QixhQUNBLENBQUEsR0FDQSxJQUFJO0FBZ0JPLGNBQUEsa0JBQWtCLGdCQUc3QixtQkFBbUIsQ0FBQSxHQUFJLElBQUk7QUFVaEIsY0FBQSxRQUFRLGdCQUFxQyxTQUFTLENBQUEsR0FBSSxJQUFJO0FBTzlELGNBQUEsV0FBVyxnQkFDdEIsWUFDQSxDQUFBLEdBQ0EsSUFBSTtBQWdCTyxjQUFBLE9BQU8sZ0JBQW1DLFFBQVEsQ0FBQSxHQUFJLElBQUk7QUF3RzFELGNBQUEsV0FBVyxnQkFDdEIsWUFDQSxDQUFDLE9BQU8sR0FDUixJQUFJO0FBeUdPLGNBQUEsWUFBWSxnQkFDdkIsYUFDQSxDQUFDLE9BQU8sR0FDUixJQUFJO0FBeUNPLGNBQUEsVUFBVSxnQkFDckIsV0FDQSxDQUFDLFNBQVMsR0FDVixJQUFJOzs7OztBQ3JwSE47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBQSxxQkFBMkM7QUFDM0Msa0JBV087QUFtRUQ7QUFqRU4sTUFBTSxjQUFjO0FBYXBCLE1BQU0sTUFBTSxNQUFNO0FBQ2hCLFVBQU0sQ0FBQyxRQUFRLFNBQVMsUUFBSSx1QkFBNEIsSUFBSTtBQUM1RCxVQUFNLENBQUMsU0FBUyxVQUFVLFFBQUksdUJBQVMsSUFBSTtBQUMzQyxVQUFNLENBQUMsT0FBTyxRQUFRLFFBQUksdUJBQXdCLElBQUk7QUFFdEQsVUFBTSxjQUFjLFlBQVk7QUFDOUIsVUFBSTtBQUNGLG1CQUFXLElBQUk7QUFDZixpQkFBUyxJQUFJO0FBQ2IsY0FBTSxNQUFNLE1BQU0sTUFBTSxHQUFHLHdCQUF3QjtBQUNuRCxZQUFJLENBQUMsSUFBSTtBQUFJLGdCQUFNLElBQUksTUFBTSx3QkFBd0IsSUFBSSxRQUFRO0FBQ2pFLGNBQU0sT0FBTyxNQUFNLElBQUksS0FBSztBQUM1QixrQkFBVSxJQUFJO0FBQUEsTUFDaEIsU0FBUyxLQUFQO0FBQ0EsaUJBQVMsSUFBSSxPQUFPO0FBQUEsTUFDdEIsVUFBRTtBQUNBLG1CQUFXLEtBQUs7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFFQSxnQ0FBVSxNQUFNO0FBQ2Qsa0JBQVk7QUFBQSxJQUNkLEdBQUcsQ0FBQyxDQUFDO0FBRUwsVUFBTSxzQkFBc0IsWUFBWTtBQUN0QyxVQUFJO0FBQ0YsY0FBTSxNQUFNLE1BQU0sTUFBTSxHQUFHLGlDQUFpQztBQUM1RCxZQUFJLENBQUMsSUFBSTtBQUFJLGdCQUFNLElBQUksTUFBTSx3QkFBd0I7QUFDckQsY0FBTSxPQUFPLE1BQU0sSUFBSSxLQUFLO0FBRTVCLGVBQU8sS0FBSyxLQUFLLEtBQUssa0JBQWtCLHNCQUFzQjtBQUFBLE1BQ2hFLFNBQVMsS0FBUDtBQUNBLGlCQUFTLElBQUksT0FBTztBQUFBLE1BQ3RCO0FBQUEsSUFDRjtBQUVBLFVBQU0sZ0JBQWdCLFlBQVk7QUFDaEMsVUFBSTtBQUNGLG1CQUFXLElBQUk7QUFDZixjQUFNLE1BQU0sTUFBTSxNQUFNLEdBQUcsd0JBQXdCLEVBQUUsUUFBUSxPQUFPLENBQUM7QUFDckUsWUFBSSxDQUFDLElBQUk7QUFBSSxnQkFBTSxJQUFJLE1BQU0sYUFBYTtBQUMxQyxjQUFNLFlBQVk7QUFBQSxNQUNwQixTQUFTLEtBQVA7QUFDQSxpQkFBUyxJQUFJLE9BQU87QUFBQSxNQUN0QixVQUFFO0FBQ0EsbUJBQVcsS0FBSztBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUVBLFdBQ0UsNkNBQUM7QUFBQSxNQUFJLEtBQUssRUFBRSxTQUFTLFFBQVE7QUFBQSxNQUUzQjtBQUFBLHFEQUFDO0FBQUEsVUFBSSxLQUFLLEVBQUUsY0FBYyxRQUFRO0FBQUEsVUFDaEM7QUFBQSx3REFBQztBQUFBLGNBQVEsTUFBSztBQUFBLGNBQVE7QUFBQSxhQUFNO0FBQUEsWUFDNUIsNENBQUM7QUFBQSxjQUFLO0FBQUEsYUFBb0Q7QUFBQTtBQUFBLFNBQzVEO0FBQUEsUUFHQSw0Q0FBQztBQUFBLFVBQUssS0FBSyxFQUFFLGNBQWMsU0FBUztBQUFBLFVBQ2xDLHVEQUFDO0FBQUEsWUFBSSxLQUFLLEVBQUUsU0FBUyxTQUFTO0FBQUEsWUFDNUI7QUFBQSwwREFBQztBQUFBLGdCQUFRLE1BQUs7QUFBQSxnQkFBUTtBQUFBLGVBQVc7QUFBQSxjQUNqQyw0Q0FBQyxxQkFBUTtBQUFBLGNBRVQsNkNBQUM7QUFBQSxnQkFBTyxLQUFLLEVBQUUsV0FBVyxVQUFVLEtBQUssVUFBVSxZQUFZLFNBQVM7QUFBQSxnQkFDdEU7QUFBQSw4REFBQztBQUFBLG9CQUFLO0FBQUEsbUJBQU07QUFBQSxrQkFDWiw0Q0FBQztBQUFBLG9CQUFNLE1BQUs7QUFBQSxvQkFBVztBQUFBLG1CQUFTO0FBQUE7QUFBQSxlQUNsQztBQUFBLGNBRUEsNkNBQUM7QUFBQSxnQkFBTyxLQUFLLEVBQUUsV0FBVyxTQUFTLEtBQUssVUFBVSxZQUFZLFNBQVM7QUFBQSxnQkFDckU7QUFBQSw4REFBQztBQUFBLG9CQUFLO0FBQUEsbUJBQU07QUFBQSxrQkFDWCxVQUNDLDRDQUFDLHFCQUFRLElBQ1AsUUFBUSxZQUNWLDRDQUFDO0FBQUEsb0JBQU0sTUFBSztBQUFBLG9CQUFXO0FBQUEsbUJBQVMsSUFFaEMsNENBQUM7QUFBQSxvQkFBTSxNQUFLO0FBQUEsb0JBQVU7QUFBQSxtQkFBWTtBQUFBO0FBQUEsZUFFdEM7QUFBQSxjQUVDLENBQUMsUUFBUSxhQUNSLDRDQUFDO0FBQUEsZ0JBQUksS0FBSyxFQUFFLFdBQVcsU0FBUztBQUFBLGdCQUM5QixzREFBQztBQUFBLGtCQUFPLFNBQVM7QUFBQSxrQkFBcUIsTUFBSztBQUFBLGtCQUFVO0FBQUEsaUJBRXJEO0FBQUEsZUFDRjtBQUFBO0FBQUEsV0FFSjtBQUFBLFNBQ0Y7QUFBQSxRQUdBLDRDQUFDO0FBQUEsVUFBSyxLQUFLLEVBQUUsY0FBYyxTQUFTO0FBQUEsVUFDbEMsdURBQUM7QUFBQSxZQUFJLEtBQUssRUFBRSxTQUFTLFNBQVM7QUFBQSxZQUM1QjtBQUFBLDBEQUFDO0FBQUEsZ0JBQVEsTUFBSztBQUFBLGdCQUFRO0FBQUEsZUFBVztBQUFBLGNBQ2pDLDRDQUFDLHFCQUFRO0FBQUEsY0FFUixTQUNDO0FBQUEsZ0JBQ0U7QUFBQSwrREFBQztBQUFBLG9CQUFPLEtBQUssRUFBRSxXQUFXLFVBQVUsS0FBSyxTQUFTO0FBQUEsb0JBQ2hEO0FBQUEsa0VBQUM7QUFBQSx3QkFBSztBQUFBLHVCQUFvQjtBQUFBLHNCQUMxQiw0Q0FBQztBQUFBLHdCQUFNLGlCQUFPO0FBQUEsdUJBQVk7QUFBQTtBQUFBLG1CQUM1QjtBQUFBLGtCQUNBLDZDQUFDO0FBQUEsb0JBQU8sS0FBSyxFQUFFLFdBQVcsU0FBUyxLQUFLLFNBQVM7QUFBQSxvQkFDL0M7QUFBQSxrRUFBQztBQUFBLHdCQUFLO0FBQUEsdUJBQVU7QUFBQSxzQkFDaEIsNENBQUM7QUFBQSx3QkFDRSxpQkFBTyxhQUNKLElBQUksS0FBSyxPQUFPLFVBQVUsRUFBRSxlQUFlLElBQzNDO0FBQUEsdUJBQ047QUFBQTtBQUFBLG1CQUNGO0FBQUEsa0JBQ0EsNkNBQUM7QUFBQSxvQkFBTyxLQUFLLEVBQUUsV0FBVyxTQUFTLEtBQUssU0FBUztBQUFBLG9CQUMvQztBQUFBLGtFQUFDO0FBQUEsd0JBQUs7QUFBQSx1QkFBVTtBQUFBLHNCQUNoQiw0Q0FBQztBQUFBLHdCQUFNLGlCQUFPLGFBQWE7QUFBQSx1QkFBa0I7QUFBQTtBQUFBLG1CQUMvQztBQUFBO0FBQUEsZUFDRixJQUVBLDRDQUFDO0FBQUEsZ0JBQUssS0FBSyxFQUFFLFdBQVcsU0FBUztBQUFBLGdCQUFHO0FBQUEsZUFBaUI7QUFBQSxjQUd2RCw0Q0FBQztBQUFBLGdCQUFJLEtBQUssRUFBRSxXQUFXLFNBQVM7QUFBQSxnQkFDOUIsc0RBQUM7QUFBQSxrQkFBTyxTQUFTO0FBQUEsa0JBQWUsVUFBVSxXQUFXLENBQUMsUUFBUTtBQUFBLGtCQUMzRCxvQkFBVSxlQUFlO0FBQUEsaUJBQzVCO0FBQUEsZUFDRjtBQUFBO0FBQUEsV0FDRjtBQUFBLFNBQ0Y7QUFBQSxRQUdDLFNBQ0MsNENBQUM7QUFBQSxVQUFLLEtBQUssRUFBRSxjQUFjLFNBQVM7QUFBQSxVQUNsQyx1REFBQztBQUFBLFlBQUksS0FBSyxFQUFFLFNBQVMsU0FBUztBQUFBLFlBQzVCO0FBQUEsMkRBQUM7QUFBQSxnQkFBSyxLQUFLLEVBQUUsT0FBTyxXQUFXO0FBQUEsZ0JBQUc7QUFBQTtBQUFBLGtCQUFRO0FBQUE7QUFBQSxlQUFNO0FBQUEsY0FDaEQsNENBQUM7QUFBQSxnQkFBTyxTQUFTO0FBQUEsZ0JBQWE7QUFBQSxlQUFLO0FBQUE7QUFBQSxXQUNyQztBQUFBLFNBQ0Y7QUFBQSxRQUlGLDZDQUFDO0FBQUEsVUFBSSxLQUFLLEVBQUUsV0FBVyxRQUFRO0FBQUEsVUFDN0I7QUFBQSx3REFBQztBQUFBLGNBQUssTUFBSztBQUFBLGNBQVEsS0FBSyxFQUFFLE9BQU8sWUFBWTtBQUFBLGNBQUc7QUFBQSxhQUdoRDtBQUFBLFlBQ0EsNENBQUM7QUFBQSxjQUFLLE1BQUs7QUFBQSxjQUF3QixRQUFPO0FBQUEsY0FBUztBQUFBLGFBRW5EO0FBQUE7QUFBQSxTQUNGO0FBQUE7QUFBQSxLQUNGO0FBQUEsRUFFSjtBQUVBLE1BQU8sY0FBUTs7O0FEM0tmLCtCQUFjO0FBU1AsTUFBTSxhQUFhO0FBRzFCLE1BQU8sbUJBQVE7QUFBQSxJQUNiLFdBQVc7QUFBQSxJQUNYLHFCQUFxQjtBQUFBLElBQ3JCLFFBQVE7QUFBQSxJQUNSLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiO0FBQUEsUUFDRSxjQUFjO0FBQUEsUUFDZCxXQUFXO0FBQUEsTUFDYjtBQUFBLE1BQ0E7QUFBQSxRQUNFLGNBQWM7QUFBQSxRQUNkLFdBQVc7QUFBQSxNQUNiO0FBQUEsTUFDQTtBQUFBLFFBQ0UsY0FBYztBQUFBLFFBQ2QsV0FBVztBQUFBLE1BQ2I7QUFBQSxJQUNGO0FBQUEsSUFDQSw4QkFBOEI7QUFBQSxJQUM5QiwwQkFBMEI7QUFBQSxJQUMxQixnQkFBZ0I7QUFBQSxNQUNkLDJCQUEyQjtBQUFBLFFBQ3pCLGVBQWU7QUFBQSxVQUNiO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsUUFDQSxXQUFXO0FBQUEsTUFDYjtBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ1A7QUFBQSxVQUNFLGFBQWE7QUFBQSxVQUNiLFlBQVk7QUFBQSxRQUNkO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFdBQVc7QUFBQSxFQUNiOyIsCiAgIm5hbWVzIjogW10KfQo=
