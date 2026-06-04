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
  var import_ui = __toESM(require_ui());
  var import_jsx_runtime = __require("react/jsx-runtime");
  var BRIDGE_URL = "https://bridge-production-ad61.up.railway.app/app";
  var App = () => {
    const handleOpen = () => {
      try {
        window.open(BRIDGE_URL, "_blank", "noopener,noreferrer");
      } catch {
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
      css: { padding: "large" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Heading, {
          size: "xlarge",
          children: "Bridge"
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
          children: "Sync PayPal transactions into Stripe Payment Records."
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
          css: { marginTop: "large" },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Button, {
            type: "primary",
            onPress: handleOpen,
            children: "Open Bridge Dashboard"
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
          css: { marginTop: "medium" },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Text, {
            size: "small",
            css: { color: "secondary" },
            children: [
              "Opens at ",
              BRIDGE_URL
            ]
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
          css: { marginTop: "xlarge" },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
            size: "small",
            css: { color: "secondary" },
            children: "Bridge automatically syncs PayPal transactions to Stripe daily. Configure credentials in the web dashboard."
          })
        })
      ]
    });
  };
  var App_default = App;

  // .build/manifest.js
  __reExport(manifest_exports, __toESM(require_version()));
  var BUILD_TIME = "2026-06-05 01:07:32.615648 +0530 IST m=+1.272796793";
  var manifest_default = {
    "$schema": "https://stripe.com/stripe-app.schema.json",
    "distribution_type": "private",
    "icon": "./bridge_icon_32.png",
    "id": "com.bridge.payment-sync",
    "name": "Bridge",
    "permissions": [
      {
        "permission": "payment_records_write",
        "purpose": "Sync PayPal transactions into Stripe Payment Records API so all revenue appears in Stripe."
      },
      {
        "permission": "payment_records_read",
        "purpose": "Read existing payment records to verify sync status and avoid duplicate pushes."
      },
      {
        "permission": "balance_read",
        "purpose": "Display synced transaction summaries in the Bridge dashboard."
      }
    ],
    "sandbox_install_compatible": true,
    "stripe_api_access_type": "platform",
    "ui_extension": {
      "content_security_policy": {
        "connect-src": [
          "https://bridge-production-ad61.up.railway.app/api/",
          "https://bridge-production-ad61.up.railway.app/app"
        ],
        "purpose": "Allow Bridge to connect to its backend server for sync operations."
      },
      "views": [
        {
          "component": "App",
          "viewport": "stripe.dashboard.drawer.default"
        }
      ]
    },
    "version": "0.3.0"
  };
  return __toCommonJS(manifest_exports);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvc3JjL3ZlcnNpb24udHMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvc3JjL3VpL2luZGV4LnRzeCIsICJtYW5pZmVzdC5qcyIsICIuLi9zcmMvdmlld3MvQXBwLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFtudWxsLCBudWxsLCAiLy8gQVVUT0dFTkVSQVRFRCAtIERPIE5PVCBNT0RJRllcblxuLy8gVmlldyBjb21wb25lbnQgaW1wb3J0cyBcdTIwMTQgb25lIHBlciB2aWV3cG9ydCBkZWNsYXJlZCBpbiB1aV9leHRlbnNpb24udmlld3NcbmltcG9ydCBBcHAgZnJvbSAnLi4vc3JjL3ZpZXdzL0FwcCc7XG5cbi8vIEV4cG9zZXMgdGhlIFNESyB2ZXJzaW9uIHNvIHRoZSBEYXNoYm9hcmQgY2FuIHZlcmlmeSBjb21wYXRpYmlsaXR5XG5leHBvcnQgKiBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdmVyc2lvbic7XG5cbi8vIE5hbWVkIGV4cG9ydHMgbWFrZSBlYWNoIHZpZXcgY29tcG9uZW50IGFjY2Vzc2libGUgdG8gdGhlIERhc2hib2FyZCBydW50aW1lXG5cbmV4cG9ydCB7IFxuICBBcHBcbiB9O1xuXG4vLyBUaW1lc3RhbXAgY2hhbmdlcyBvbiBldmVyeSBleHBvcnQsIGVuc3VyaW5nIHRoZSBkZXYgc2VydmVyIGRldGVjdHMgYSByZWJ1aWxkXG5leHBvcnQgY29uc3QgQlVJTERfVElNRSA9ICcyMDI2LTA2LTA1IDAxOjA3OjMyLjYxNTY0OCArMDUzMCBJU1QgbT0rMS4yNzI3OTY3OTMnO1xuXG4vLyBBcHAgbWFuaWZlc3QgXHUyMDE0IGNvbnN1bWVkIGJ5IHRoZSBEYXNoYm9hcmQgdG8gY29uZmlndXJlIHRoZSBhcHBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgXCIkc2NoZW1hXCI6IFwiaHR0cHM6Ly9zdHJpcGUuY29tL3N0cmlwZS1hcHAuc2NoZW1hLmpzb25cIixcbiAgXCJkaXN0cmlidXRpb25fdHlwZVwiOiBcInByaXZhdGVcIixcbiAgXCJpY29uXCI6IFwiLi9icmlkZ2VfaWNvbl8zMi5wbmdcIixcbiAgXCJpZFwiOiBcImNvbS5icmlkZ2UucGF5bWVudC1zeW5jXCIsXG4gIFwibmFtZVwiOiBcIkJyaWRnZVwiLFxuICBcInBlcm1pc3Npb25zXCI6IFtcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJwYXltZW50X3JlY29yZHNfd3JpdGVcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlN5bmMgUGF5UGFsIHRyYW5zYWN0aW9ucyBpbnRvIFN0cmlwZSBQYXltZW50IFJlY29yZHMgQVBJIHNvIGFsbCByZXZlbnVlIGFwcGVhcnMgaW4gU3RyaXBlLlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJwYXltZW50X3JlY29yZHNfcmVhZFwiLFxuICAgICAgXCJwdXJwb3NlXCI6IFwiUmVhZCBleGlzdGluZyBwYXltZW50IHJlY29yZHMgdG8gdmVyaWZ5IHN5bmMgc3RhdHVzIGFuZCBhdm9pZCBkdXBsaWNhdGUgcHVzaGVzLlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJiYWxhbmNlX3JlYWRcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIkRpc3BsYXkgc3luY2VkIHRyYW5zYWN0aW9uIHN1bW1hcmllcyBpbiB0aGUgQnJpZGdlIGRhc2hib2FyZC5cIlxuICAgIH1cbiAgXSxcbiAgXCJzYW5kYm94X2luc3RhbGxfY29tcGF0aWJsZVwiOiB0cnVlLFxuICBcInN0cmlwZV9hcGlfYWNjZXNzX3R5cGVcIjogXCJwbGF0Zm9ybVwiLFxuICBcInVpX2V4dGVuc2lvblwiOiB7XG4gICAgXCJjb250ZW50X3NlY3VyaXR5X3BvbGljeVwiOiB7XG4gICAgICBcImNvbm5lY3Qtc3JjXCI6IFtcbiAgICAgICAgXCJodHRwczovL2JyaWRnZS1wcm9kdWN0aW9uLWFkNjEudXAucmFpbHdheS5hcHAvYXBpL1wiLFxuICAgICAgICBcImh0dHBzOi8vYnJpZGdlLXByb2R1Y3Rpb24tYWQ2MS51cC5yYWlsd2F5LmFwcC9hcHBcIlxuICAgICAgXSxcbiAgICAgIFwicHVycG9zZVwiOiBcIkFsbG93IEJyaWRnZSB0byBjb25uZWN0IHRvIGl0cyBiYWNrZW5kIHNlcnZlciBmb3Igc3luYyBvcGVyYXRpb25zLlwiXG4gICAgfSxcbiAgICBcInZpZXdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJjb21wb25lbnRcIjogXCJBcHBcIixcbiAgICAgICAgXCJ2aWV3cG9ydFwiOiBcInN0cmlwZS5kYXNoYm9hcmQuZHJhd2VyLmRlZmF1bHRcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4zLjBcIlxufTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgQm94LFxuICBCdXR0b24sXG4gIEhlYWRpbmcsXG4gIFRleHQsXG59IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5cbmNvbnN0IEJSSURHRV9VUkwgPSAnaHR0cHM6Ly9icmlkZ2UtcHJvZHVjdGlvbi1hZDYxLnVwLnJhaWx3YXkuYXBwL2FwcCc7XG5cbi8qKlxuICogQnJpZGdlIFN0cmlwZSBBcHAgXHUyMDE0IExhdW5jaGVyLlxuICogT25lIGJ1dHRvbjogb3BlbnMgdGhlIGZ1bGwgQnJpZGdlIHdlYiBhcHAgaW4gYSBuZXcgdGFiLlxuICogVGhlIGFjdHVhbCBhcHAgKHJlZ2lzdGVyLCBjb25maWd1cmUsIHN5bmMpIHJ1bnMgb24gUmFpbHdheSBcdTIwMTQgbm8gaWZyYW1lIGlzc3Vlcy5cbiAqL1xuY29uc3QgQXBwID0gKCkgPT4ge1xuICBjb25zdCBoYW5kbGVPcGVuID0gKCkgPT4ge1xuICAgIC8vIFRyeSBtdWx0aXBsZSBhcHByb2FjaGVzIHRvIG9wZW4gdGhlIFVSTFxuICAgIHRyeSB7XG4gICAgICB3aW5kb3cub3BlbihCUklER0VfVVJMLCAnX2JsYW5rJywgJ25vb3BlbmVyLG5vcmVmZXJyZXInKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIEZhbGxiYWNrOiBpZiB3aW5kb3cub3BlbiBpcyBibG9ja2VkLCBuYXZpZ2F0ZSB0aGUgaWZyYW1lXG4gICAgICAvLyAodXNlciBjYW4gbWFudWFsbHkgb3BlbiBmcm9tIHRoZSBsaW5rIGJlbG93KVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdsYXJnZScgfX0+XG4gICAgICA8SGVhZGluZyBzaXplPVwieGxhcmdlXCI+QnJpZGdlPC9IZWFkaW5nPlxuICAgICAgPFRleHQ+U3luYyBQYXlQYWwgdHJhbnNhY3Rpb25zIGludG8gU3RyaXBlIFBheW1lbnQgUmVjb3Jkcy48L1RleHQ+XG4gICAgICA8Qm94IGNzcz17eyBtYXJnaW5Ub3A6ICdsYXJnZScgfX0+XG4gICAgICAgIDxCdXR0b24gdHlwZT1cInByaW1hcnlcIiBvblByZXNzPXtoYW5kbGVPcGVufT5cbiAgICAgICAgICBPcGVuIEJyaWRnZSBEYXNoYm9hcmRcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L0JveD5cbiAgICAgIDxCb3ggY3NzPXt7IG1hcmdpblRvcDogJ21lZGl1bScgfX0+XG4gICAgICAgIDxUZXh0IHNpemU9XCJzbWFsbFwiIGNzcz17eyBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgT3BlbnMgYXQge0JSSURHRV9VUkx9XG4gICAgICAgIDwvVGV4dD5cbiAgICAgIDwvQm94PlxuICAgICAgPEJveCBjc3M9e3sgbWFyZ2luVG9wOiAneGxhcmdlJyB9fT5cbiAgICAgICAgPFRleHQgc2l6ZT1cInNtYWxsXCIgY3NzPXt7IGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICBCcmlkZ2UgYXV0b21hdGljYWxseSBzeW5jcyBQYXlQYWwgdHJhbnNhY3Rpb25zIHRvIFN0cmlwZSBkYWlseS5cbiAgICAgICAgICBDb25maWd1cmUgY3JlZGVudGlhbHMgaW4gdGhlIHdlYiBkYXNoYm9hcmQuXG4gICAgICAgIDwvVGV4dD5cbiAgICAgIDwvQm94PlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFhLGNBQUEsY0FBYzs7Ozs7Ozs7Ozs7QUNVM0IsVUFBQSxVQUFBLFVBQUE7QUFDQSxVQUFBLFlBQUE7QUFFQSxVQUFNLGVBQWUsQ0FDbkIsY0FDRTtBQUNGLGNBQU0sdUJBQXVCLFVBQVUsZUFBZSxVQUFVLFNBQVE7QUFDeEUsY0FBTSxlQUVGLENBQUMsV0FDSCxHQUFBLGNBQUEsS0FBQyxXQUFTLE9BQUEsT0FBQSxDQUFBLEdBQ0osT0FBSyxFQUNULHNCQUNBLFlBQVksVUFBQSxhQUNaLGVBQWMsS0FBSSxDQUFBLENBQUE7QUFJdEIscUJBQWEsdUJBQXVCO0FBRXBDLGVBQU87TUFDVDtBQUVBLFVBQU0sa0JBQWtCLENBSXRCLE1BQ0EsZUFDQSxxQkFDRTtBQUNGLGNBQU0sbUJBQWtCLEdBQUEsUUFBQSw0QkFBaUMsTUFBTTtVQUM3RDtTQUNEO0FBRUQsWUFBSSxDQUFDLGtCQUFrQjtBQUNyQixpQkFBTztRQUNUO0FBRUEsZUFBTyxhQUFhLGVBQWU7TUFHckM7QUFvV2EsY0FBQSxnQkFBZ0IsZ0JBRzNCLGlCQUFpQixDQUFDLFNBQVMsV0FBVyxTQUFTLFVBQVUsR0FBRyxJQUFJO0FBVXJELGNBQUEsWUFBWSxnQkFDdkIsYUFDQSxDQUFBLEdBQ0EsSUFBSTtBQVdPLGNBQUEsUUFBUSxnQkFBcUMsU0FBUyxDQUFBLEdBQUksSUFBSTtBQVU5RCxjQUFBLFNBQVMsZ0JBQ3BCLFVBQ0EsQ0FBQyxXQUFXLGVBQWUsT0FBTyxHQUNsQyxJQUFJO0FBMEJPLGNBQUEsV0FBVyxnQkFDdEIsWUFDQSxDQUFBLEdBQ0EsSUFBSTtBQXczQk8sY0FBQSxNQUFNLGdCQUFpQyxPQUFPLENBQUEsR0FBSSxJQUFJO0FBYXRELGNBQUEsY0FBYyxnQkFDekIsZUFDQSxDQUFDLGFBQWEsR0FD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
