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
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
      css: { padding: "large" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Heading, {
          size: "xlarge",
          children: "Bridge"
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
          css: { marginTop: "medium" },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
            children: "Sync PayPal transactions into Stripe Payment Records."
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
          css: { marginTop: "xlarge" },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Link, {
            href: BRIDGE_URL,
            target: "_blank",
            children: "Open Bridge Dashboard"
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
          css: { marginTop: "xlarge" },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Text, {
            size: "small",
            css: { color: "secondary" },
            children: "Bridge automatically syncs PayPal transactions to Stripe daily. Configure your credentials in the web dashboard."
          })
        })
      ]
    });
  };
  var App_default = App;

  // .build/manifest.js
  __reExport(manifest_exports, __toESM(require_version()));
  var BUILD_TIME = "2026-06-05 01:24:55.296607 +0530 IST m=+1.700470876";
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
    "version": "0.3.1"
  };
  return __toCommonJS(manifest_exports);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvc3JjL3ZlcnNpb24udHMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvc3JjL3VpL2luZGV4LnRzeCIsICJtYW5pZmVzdC5qcyIsICIuLi9zcmMvdmlld3MvQXBwLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFtudWxsLCBudWxsLCAiLy8gQVVUT0dFTkVSQVRFRCAtIERPIE5PVCBNT0RJRllcblxuLy8gVmlldyBjb21wb25lbnQgaW1wb3J0cyBcdTIwMTQgb25lIHBlciB2aWV3cG9ydCBkZWNsYXJlZCBpbiB1aV9leHRlbnNpb24udmlld3NcbmltcG9ydCBBcHAgZnJvbSAnLi4vc3JjL3ZpZXdzL0FwcCc7XG5cbi8vIEV4cG9zZXMgdGhlIFNESyB2ZXJzaW9uIHNvIHRoZSBEYXNoYm9hcmQgY2FuIHZlcmlmeSBjb21wYXRpYmlsaXR5XG5leHBvcnQgKiBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdmVyc2lvbic7XG5cbi8vIE5hbWVkIGV4cG9ydHMgbWFrZSBlYWNoIHZpZXcgY29tcG9uZW50IGFjY2Vzc2libGUgdG8gdGhlIERhc2hib2FyZCBydW50aW1lXG5cbmV4cG9ydCB7IFxuICBBcHBcbiB9O1xuXG4vLyBUaW1lc3RhbXAgY2hhbmdlcyBvbiBldmVyeSBleHBvcnQsIGVuc3VyaW5nIHRoZSBkZXYgc2VydmVyIGRldGVjdHMgYSByZWJ1aWxkXG5leHBvcnQgY29uc3QgQlVJTERfVElNRSA9ICcyMDI2LTA2LTA1IDAxOjI0OjU1LjI5NjYwNyArMDUzMCBJU1QgbT0rMS43MDA0NzA4NzYnO1xuXG4vLyBBcHAgbWFuaWZlc3QgXHUyMDE0IGNvbnN1bWVkIGJ5IHRoZSBEYXNoYm9hcmQgdG8gY29uZmlndXJlIHRoZSBhcHBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgXCIkc2NoZW1hXCI6IFwiaHR0cHM6Ly9zdHJpcGUuY29tL3N0cmlwZS1hcHAuc2NoZW1hLmpzb25cIixcbiAgXCJkaXN0cmlidXRpb25fdHlwZVwiOiBcInByaXZhdGVcIixcbiAgXCJpY29uXCI6IFwiLi9icmlkZ2VfaWNvbl8zMi5wbmdcIixcbiAgXCJpZFwiOiBcImNvbS5icmlkZ2UucGF5bWVudC1zeW5jXCIsXG4gIFwibmFtZVwiOiBcIkJyaWRnZVwiLFxuICBcInBlcm1pc3Npb25zXCI6IFtcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJwYXltZW50X3JlY29yZHNfd3JpdGVcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlN5bmMgUGF5UGFsIHRyYW5zYWN0aW9ucyBpbnRvIFN0cmlwZSBQYXltZW50IFJlY29yZHMgQVBJIHNvIGFsbCByZXZlbnVlIGFwcGVhcnMgaW4gU3RyaXBlLlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJwYXltZW50X3JlY29yZHNfcmVhZFwiLFxuICAgICAgXCJwdXJwb3NlXCI6IFwiUmVhZCBleGlzdGluZyBwYXltZW50IHJlY29yZHMgdG8gdmVyaWZ5IHN5bmMgc3RhdHVzIGFuZCBhdm9pZCBkdXBsaWNhdGUgcHVzaGVzLlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJiYWxhbmNlX3JlYWRcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIkRpc3BsYXkgc3luY2VkIHRyYW5zYWN0aW9uIHN1bW1hcmllcyBpbiB0aGUgQnJpZGdlIGRhc2hib2FyZC5cIlxuICAgIH1cbiAgXSxcbiAgXCJzYW5kYm94X2luc3RhbGxfY29tcGF0aWJsZVwiOiB0cnVlLFxuICBcInN0cmlwZV9hcGlfYWNjZXNzX3R5cGVcIjogXCJwbGF0Zm9ybVwiLFxuICBcInVpX2V4dGVuc2lvblwiOiB7XG4gICAgXCJjb250ZW50X3NlY3VyaXR5X3BvbGljeVwiOiB7XG4gICAgICBcImNvbm5lY3Qtc3JjXCI6IFtcbiAgICAgICAgXCJodHRwczovL2JyaWRnZS1wcm9kdWN0aW9uLWFkNjEudXAucmFpbHdheS5hcHAvYXBpL1wiLFxuICAgICAgICBcImh0dHBzOi8vYnJpZGdlLXByb2R1Y3Rpb24tYWQ2MS51cC5yYWlsd2F5LmFwcC9hcHBcIlxuICAgICAgXSxcbiAgICAgIFwicHVycG9zZVwiOiBcIkFsbG93IEJyaWRnZSB0byBjb25uZWN0IHRvIGl0cyBiYWNrZW5kIHNlcnZlciBmb3Igc3luYyBvcGVyYXRpb25zLlwiXG4gICAgfSxcbiAgICBcInZpZXdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJjb21wb25lbnRcIjogXCJBcHBcIixcbiAgICAgICAgXCJ2aWV3cG9ydFwiOiBcInN0cmlwZS5kYXNoYm9hcmQuZHJhd2VyLmRlZmF1bHRcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4zLjFcIlxufTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgQm94LFxuICBIZWFkaW5nLFxuICBUZXh0LFxuICBMaW5rLFxufSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuXG5jb25zdCBCUklER0VfVVJMID0gJ2h0dHBzOi8vYnJpZGdlLXByb2R1Y3Rpb24tYWQ2MS51cC5yYWlsd2F5LmFwcC9hcHAnO1xuXG4vKipcbiAqIEJyaWRnZSBTdHJpcGUgQXBwIFx1MjAxNCBMYXVuY2hlci5cbiAqIFJlbmRlcnMgYSBsaW5rIHRvIHRoZSBmdWxsIEJyaWRnZSB3ZWIgYXBwLlxuICogTm8gd2luZG93Lm9wZW4oKSBcdTIwMTQganVzdCB1c2VzIFN0cmlwZSdzIExpbmsgY29tcG9uZW50IChzYWZlIGluIGlmcmFtZSkuXG4gKi9cbmNvbnN0IEFwcCA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbGFyZ2UnIH19PlxuICAgICAgPEhlYWRpbmcgc2l6ZT1cInhsYXJnZVwiPkJyaWRnZTwvSGVhZGluZz5cbiAgICAgIDxCb3ggY3NzPXt7IG1hcmdpblRvcDogJ21lZGl1bScgfX0+XG4gICAgICAgIDxUZXh0PlN5bmMgUGF5UGFsIHRyYW5zYWN0aW9ucyBpbnRvIFN0cmlwZSBQYXltZW50IFJlY29yZHMuPC9UZXh0PlxuICAgICAgPC9Cb3g+XG4gICAgICA8Qm94IGNzcz17eyBtYXJnaW5Ub3A6ICd4bGFyZ2UnIH19PlxuICAgICAgICA8TGluayBocmVmPXtCUklER0VfVVJMfSB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgICAgICBPcGVuIEJyaWRnZSBEYXNoYm9hcmRcbiAgICAgICAgPC9MaW5rPlxuICAgICAgPC9Cb3g+XG4gICAgICA8Qm94IGNzcz17eyBtYXJnaW5Ub3A6ICd4bGFyZ2UnIH19PlxuICAgICAgICA8VGV4dCBzaXplPVwic21hbGxcIiBjc3M9e3sgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgIEJyaWRnZSBhdXRvbWF0aWNhbGx5IHN5bmNzIFBheVBhbCB0cmFuc2FjdGlvbnMgdG8gU3RyaXBlIGRhaWx5LlxuICAgICAgICAgIENvbmZpZ3VyZSB5b3VyIGNyZWRlbnRpYWxzIGluIHRoZSB3ZWIgZGFzaGJvYXJkLlxuICAgICAgICA8L1RleHQ+XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBYSxjQUFBLGNBQWM7Ozs7Ozs7Ozs7O0FDVTNCLFVBQUEsVUFBQSxVQUFBO0FBQ0EsVUFBQSxZQUFBO0FBRUEsVUFBTSxlQUFlLENBQ25CLGNBQ0U7QUFDRixjQUFNLHVCQUF1QixVQUFVLGVBQWUsVUFBVSxTQUFRO0FBQ3hFLGNBQU0sZUFFRixDQUFDLFdBQ0gsR0FBQSxjQUFBLEtBQUMsV0FBUyxPQUFBLE9BQUEsQ0FBQSxHQUNKLE9BQUssRUFDVCxzQkFDQSxZQUFZLFVBQUEsYUFDWixlQUFjLEtBQUksQ0FBQSxDQUFBO0FBSXRCLHFCQUFhLHVCQUF1QjtBQUVwQyxlQUFPO01BQ1Q7QUFFQSxVQUFNLGtCQUFrQixDQUl0QixNQUNBLGVB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
