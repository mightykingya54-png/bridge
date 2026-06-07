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
  var BUILD_TIME = "2026-06-06 17:31:53.671022 +0530 IST m=+1.648607376";
  var manifest_default = {
    "$schema": "https://stripe.com/stripe-app.schema.json",
    "allowed_redirect_uris": [
      "https://bridge-production-ad61.up.railway.app/app"
    ],
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
    "version": "0.5.0"
  };
  return __toCommonJS(manifest_exports);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvc3JjL3ZlcnNpb24udHMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvc3JjL3VpL2luZGV4LnRzeCIsICJtYW5pZmVzdC5qcyIsICIuLi9zcmMvdmlld3MvQXBwLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFtudWxsLCBudWxsLCAiLy8gQVVUT0dFTkVSQVRFRCAtIERPIE5PVCBNT0RJRllcblxuLy8gVmlldyBjb21wb25lbnQgaW1wb3J0cyBcdTIwMTQgb25lIHBlciB2aWV3cG9ydCBkZWNsYXJlZCBpbiB1aV9leHRlbnNpb24udmlld3NcbmltcG9ydCBBcHAgZnJvbSAnLi4vc3JjL3ZpZXdzL0FwcCc7XG5cbi8vIEV4cG9zZXMgdGhlIFNESyB2ZXJzaW9uIHNvIHRoZSBEYXNoYm9hcmQgY2FuIHZlcmlmeSBjb21wYXRpYmlsaXR5XG5leHBvcnQgKiBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdmVyc2lvbic7XG5cbi8vIE5hbWVkIGV4cG9ydHMgbWFrZSBlYWNoIHZpZXcgY29tcG9uZW50IGFjY2Vzc2libGUgdG8gdGhlIERhc2hib2FyZCBydW50aW1lXG5cbmV4cG9ydCB7IFxuICBBcHBcbiB9O1xuXG4vLyBUaW1lc3RhbXAgY2hhbmdlcyBvbiBldmVyeSBleHBvcnQsIGVuc3VyaW5nIHRoZSBkZXYgc2VydmVyIGRldGVjdHMgYSByZWJ1aWxkXG5leHBvcnQgY29uc3QgQlVJTERfVElNRSA9ICcyMDI2LTA2LTA2IDE3OjMxOjUzLjY3MTAyMiArMDUzMCBJU1QgbT0rMS42NDg2MDczNzYnO1xuXG4vLyBBcHAgbWFuaWZlc3QgXHUyMDE0IGNvbnN1bWVkIGJ5IHRoZSBEYXNoYm9hcmQgdG8gY29uZmlndXJlIHRoZSBhcHBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgXCIkc2NoZW1hXCI6IFwiaHR0cHM6Ly9zdHJpcGUuY29tL3N0cmlwZS1hcHAuc2NoZW1hLmpzb25cIixcbiAgXCJhbGxvd2VkX3JlZGlyZWN0X3VyaXNcIjogW1xuICAgIFwiaHR0cHM6Ly9icmlkZ2UtcHJvZHVjdGlvbi1hZDYxLnVwLnJhaWx3YXkuYXBwL2FwcFwiXG4gIF0sXG4gIFwiZGlzdHJpYnV0aW9uX3R5cGVcIjogXCJwcml2YXRlXCIsXG4gIFwiaWNvblwiOiBcIi4vYnJpZGdlX2ljb25fMzIucG5nXCIsXG4gIFwiaWRcIjogXCJjb20uYnJpZGdlLnBheW1lbnQtc3luY1wiLFxuICBcIm5hbWVcIjogXCJCcmlkZ2VcIixcbiAgXCJwZXJtaXNzaW9uc1wiOiBbXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwicGF5bWVudF9yZWNvcmRzX3dyaXRlXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJTeW5jIFBheVBhbCB0cmFuc2FjdGlvbnMgaW50byBTdHJpcGUgUGF5bWVudCBSZWNvcmRzIEFQSSBzbyBhbGwgcmV2ZW51ZSBhcHBlYXJzIGluIFN0cmlwZS5cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwicGF5bWVudF9yZWNvcmRzX3JlYWRcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlJlYWQgZXhpc3RpbmcgcGF5bWVudCByZWNvcmRzIHRvIHZlcmlmeSBzeW5jIHN0YXR1cyBhbmQgYXZvaWQgZHVwbGljYXRlIHB1c2hlcy5cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwiYmFsYW5jZV9yZWFkXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJEaXNwbGF5IHN5bmNlZCB0cmFuc2FjdGlvbiBzdW1tYXJpZXMgaW4gdGhlIEJyaWRnZSBkYXNoYm9hcmQuXCJcbiAgICB9XG4gIF0sXG4gIFwic2FuZGJveF9pbnN0YWxsX2NvbXBhdGlibGVcIjogdHJ1ZSxcbiAgXCJzdHJpcGVfYXBpX2FjY2Vzc190eXBlXCI6IFwicGxhdGZvcm1cIixcbiAgXCJ1aV9leHRlbnNpb25cIjoge1xuICAgIFwiY29udGVudF9zZWN1cml0eV9wb2xpY3lcIjoge1xuICAgICAgXCJjb25uZWN0LXNyY1wiOiBbXG4gICAgICAgIFwiaHR0cHM6Ly9icmlkZ2UtcHJvZHVjdGlvbi1hZDYxLnVwLnJhaWx3YXkuYXBwL2FwaS9cIixcbiAgICAgICAgXCJodHRwczovL2JyaWRnZS1wcm9kdWN0aW9uLWFkNjEudXAucmFpbHdheS5hcHAvYXBwXCJcbiAgICAgIF0sXG4gICAgICBcInB1cnBvc2VcIjogXCJBbGxvdyBCcmlkZ2UgdG8gY29ubmVjdCB0byBpdHMgYmFja2VuZCBzZXJ2ZXIgZm9yIHN5bmMgb3BlcmF0aW9ucy5cIlxuICAgIH0sXG4gICAgXCJ2aWV3c1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiY29tcG9uZW50XCI6IFwiQXBwXCIsXG4gICAgICAgIFwidmlld3BvcnRcIjogXCJzdHJpcGUuZGFzaGJvYXJkLmRyYXdlci5kZWZhdWx0XCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwidmVyc2lvblwiOiBcIjAuNS4wXCJcbn07XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEJveCxcbiAgSGVhZGluZyxcbiAgVGV4dCxcbiAgTGluayxcbn0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcblxuY29uc3QgQlJJREdFX1VSTCA9ICdodHRwczovL2JyaWRnZS1wcm9kdWN0aW9uLWFkNjEudXAucmFpbHdheS5hcHAvYXBwJztcblxuLyoqXG4gKiBCcmlkZ2UgU3RyaXBlIEFwcCBcdTIwMTQgTGF1bmNoZXIuXG4gKiBSZW5kZXJzIGEgbGluayB0byB0aGUgZnVsbCBCcmlkZ2Ugd2ViIGFwcC5cbiAqIE5vIHdpbmRvdy5vcGVuKCkgXHUyMDE0IGp1c3QgdXNlcyBTdHJpcGUncyBMaW5rIGNvbXBvbmVudCAoc2FmZSBpbiBpZnJhbWUpLlxuICovXG5jb25zdCBBcHAgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ2xhcmdlJyB9fT5cbiAgICAgIDxIZWFkaW5nIHNpemU9XCJ4bGFyZ2VcIj5CcmlkZ2U8L0hlYWRpbmc+XG4gICAgICA8Qm94IGNzcz17eyBtYXJnaW5Ub3A6ICdtZWRpdW0nIH19PlxuICAgICAgICA8VGV4dD5TeW5jIFBheVBhbCB0cmFuc2FjdGlvbnMgaW50byBTdHJpcGUgUGF5bWVudCBSZWNvcmRzLjwvVGV4dD5cbiAgICAgIDwvQm94PlxuICAgICAgPEJveCBjc3M9e3sgbWFyZ2luVG9wOiAneGxhcmdlJyB9fT5cbiAgICAgICAgPExpbmsgaHJlZj17QlJJREdFX1VSTH0gdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgICAgT3BlbiBCcmlkZ2UgRGFzaGJvYXJkXG4gICAgICAgIDwvTGluaz5cbiAgICAgIDwvQm94PlxuICAgICAgPEJveCBjc3M9e3sgbWFyZ2luVG9wOiAneGxhcmdlJyB9fT5cbiAgICAgICAgPFRleHQgc2l6ZT1cInNtYWxsXCIgY3NzPXt7IGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICBCcmlkZ2UgYXV0b21hdGljYWxseSBzeW5jcyBQYXlQYWwgdHJhbnNhY3Rpb25zIHRvIFN0cmlwZSBkYWlseS5cbiAgICAgICAgICBDb25maWd1cmUgeW91ciBjcmVkZW50aWFscyBpbiB0aGUgd2ViIGRhc2hib2FyZC5cbiAgICAgICAgPC9UZXh0PlxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWEsY0FBQSxjQUFjOzs7Ozs7Ozs7OztBQ1UzQixVQUFBLFVBQUEsVUFBQTtBQUNBLFVBQUEsWUFBQTtBQUVBLFVBQU0sZUFBZSxDQUNuQixjQUNFO0FBQ0YsY0FBTSx1QkFBdUIsVUFBVSxlQUFlLFVBQVUsU0FBUTtBQUN4RSxjQUFNLGVBRUYsQ0FBQyxXQUNILEdBQUEsY0FBQSxLQUFDLFdBQVMsT0FBQSxPQUFBLENBQUEsR0FDSixPQUFLLEVBQ1Qsc0JBQ0EsWUFBWSxVQUFBLGFBQ1osZUFBYyxLQUFJLENBQUEsQ0FBQTtBQUl0QixxQkFBYSx1QkFBdUI7QUFFcEMsZUFBTztNQUNUO0FBRUEsVUFBTSxrQkFBa0IsQ0FJdEIsTUFDQSxlQUNBLHFCQUNFO0FBQ0YsY0FBTSxtQkFBa0IsR0FBQSxRQUFBLDRCQUFpQyxNQUFNO1VBQzdEO1NBQ0Q7QUFFRCxZQUFJLENBQUMsa0JBQWtCO0FBQ3JCLGlCQUFPO1FBQ1Q7QUFFQSxlQUFPLGFBQWEsZUFBZTtNQUdyQztBQW9XYSxjQUFBLGdCQUFnQixnQkFHM0IsaUJBQWlCLENBQUMsU0FBUyxXQUFXLFNBQVMsVUFBVSxHQUFHLElBQUk7QUFVckQsY0FBQSxZQUFZLGdCQUN2QixhQUNBLENBQUEsR0FDQSxJQUFJO0FBV08sY0FBQSxRQUFRLGdCQUFxQyxTQUFTLENBQUEsR0FBSSxJQUFJO0FBVTlELGNBQUEsU0FBUyxnQkFDcEIsVUFDQSxDQUFDLFdBQVcsZUFBZSxPQUFPLEdBQ2xDLElBQUk7QUEwQk8sY0FBQSxXQUFXLGdCQUN0QixZQUNBLENBQUEsR0FDQSxJQUFJO0FBdzNCTyxjQUFBLE1BQU0sZ0JBQWlDLE9BQU8sQ0FBQSxHQUFJLElBQUk7QUFhdEQsY0FBQSxjQUFjLGdCQUN6QixlQUNBLENBQUMsYUFBYSxHQUNkLElBQUk7QUFpRU8sY0FBQSxTQUFTLGdCQUNwQixVQUNBLENBQUEsR0FDQSxJQUFJO0FBd0NPLGNBQUEsV0FBVyxnQkFDdEIsWUFDQSxDQUFDLE9BQU8sR0FDUixJQUFJO0FBU08sY0FBQSxXQUFXLGdCQUN0QixZQUNBLENBQUEsR0FDQSxJQUFJO0FBZ0JPLGNBQUEsT0FBTyxnQkFBbUMsUUFBUSxDQUFBLEdBQUksSUFBSTtBQWdDMUQsY0FBQSxjQUFjLGdCQUN6QixlQUNBLENBQUMsV0FBVyxVQUFVLGlCQUFpQixpQkFBaUIsaUJBQWlCLEdBQ3pFLElBQUk7QUFpQ08sY0FBQSxZQUFZLGdCQUN2QixhQUNBLENBQUMsT0FBTyxHQUNSLElBQUk7QUFLTyxjQUFBLFVBQVUsZ0JBQ3JCLFdBQ0EsQ0FBQSxHQUNBLElBQUk7QUEyQk8sY0FBQSxZQUFZLGdCQUN2QixhQUNBLENBQUMsaUJBQWlCLGlCQUFpQixpQkFBaUIsR0FDcEQsSUFBSTtBQW9CTyxjQUFBLGlCQUFpQixnQkFHNUIsa0JBQWtCLENBQUEsR0FBSSxJQUFJO0FBK1FmLGNBQUEsT0FBTyxnQkFBbUMsUUFBUSxDQUFBLEdBQUksSUFBSTtBQW1CMUQsY0FBQSxNQUFNLGdCQUFpQyxPQUFPLENBQUEsR0FBSSxJQUFJO0FBdTNCdEQsY0FBQSxTQUFTLGdCQUNwQixVQUNBLENBQUEsR0FDQSxJQUFJO0FBMEJPLGNBQUEsWUFBWSxnQkFDdkIsYUFDQSxDQUFBLEdBQ0EsSUFBSTtBQXFFTyxjQUFBLE9BQU8sZ0JBQW1DLFFBQVEsQ0FBQSxHQUFJLElBQUk7QUFtQjFELGNBQUEsV0FBVyxnQkFDdEIsWUFDQSxDQUFDLFFBQVEsU0FBUyxrQkFBa0IsU0FBUyxPQUFPLEdBQ3BELElBQUk7QUFVTyxjQUFBLE9BQU8sZ0JBQW1DLFFBQVEsQ0FBQSxHQUFJLElBQUk7QUFRMUQsY0FBQSxZQUFZLGdCQUN2QixhQUNBLENBQUMsT0FBTyxHQUNSLElBQUk7QUFjTyxjQUFBLFdBQVcsZ0JBQ3RCLFlBQ0EsQ0FBQSxHQUNBLElBQUk7QUFZTyxjQUFBLE9BQU8sZ0JBQ2xCLFFBQ0EsQ0FBQyxTQUFTLEdBQ1YsSUFBSTtBQWdETyxjQUFBLFFBQVEsZ0JBQ25CLFNBQ0EsQ0FBQyxPQUFPLEdBQ1IsSUFBSTtBQW1GTyxjQUFBLFNBQVMsZ0JBQ3BCLFVBQ0EsQ0FBQyxPQUFPLEdBQ1IsSUFBSTtBQWFPLGNBQUEsZUFBZSxnQkFDMUIsZ0JBQ0EsQ0FBQSxHQUNBLElBQUk7QUEyQk8sY0FBQSxhQUFhLGdCQUN4QixjQUNBLENBQUMsNkJBQTZCLGVBQWUsR0FDN0MsSUFBSTtBQW9CTyxjQUFBLFlBQVksZ0JBQ3ZCLGFBQ0EsQ0FBQSxHQUNBLElBQUk7QUFVTyxjQUFBLFVBQVUsZ0JBQ3JCLFdBQ0EsQ0FBQSxHQUNBLElBQUk7QUEyQ08sY0FBQSxxQkFBcUIsZ0JBR2hDLHNCQUFzQixDQUFBLEdBQUksSUFBSTtBQXdDbkIsY0FBQSxTQUFTLGdCQUNwQixVQUNBLENBQUMsT0FBTyxHQUNSLElBQUk7QUFRTyxjQUFBLFVBQVUsZ0JBQ3JCLFdBQ0EsQ0FBQSxHQUNBLElBQUk7QUFjTyxjQUFBLFdBQVcsZ0JBQ3RCLFlBQ0EsQ0FBQSxHQUNBLElBQUk7QUFRTyxjQUFBLFlBQVksZ0JBQ3ZCLGFBQ0EsQ0FBQSxHQUNBLElBQUk7QUFnQk8sY0FBQSxNQUFNLGdCQUFpQyxPQUFPLENBQUEsR0FBSSxJQUFJO0FBT3RELGNBQUEsWUFBWSxnQkFDdkIsYUFDQSxDQUFBLEdBQ0EsSUFBSTtBQWdCTyxjQUFBLFlBQVksZ0JBQ3ZCLGFBQ0EsQ0FBQSxHQUNBLElBQUk7QUFRTyxjQUFBLGNBQWMsZ0JBQ3pCLGVBQ0EsQ0FBQSxHQUNBLElBQUk7QUFRTyxjQUFBLFlBQVksZ0JBQ3ZCLGFBQ0EsQ0FBQSxHQUNBLElBQUk7QUFnQk8sY0FBQSxrQkFBa0IsZ0JBRzdCLG1CQUFtQixDQUFBLEdBQUksSUFBSTtBQVVoQixjQUFBLFFBQVEsZ0JBQXFDLFNBQVMsQ0FBQSxHQUFJLElBQUk7QUFPOUQsY0FBQSxXQUFXLGdCQUN0QixZQUNBLENBQUEsR0FDQSxJQUFJO0FBZ0JPLGNBQUEsT0FBTyxnQkFBbUMsUUFBUSxDQUFBLEdBQUksSUFBSTtBQXdHMUQsY0FBQSxXQUFXLGdCQUN0QixZQUNBLENBQUMsT0FBTyxHQUNSLElBQUk7QUF5R08sY0FBQSxZQUFZLGdCQUN2QixhQUNBLENBQUMsT0FBTyxHQUNSLElBQUk7QUF5Q08sY0FBQSxVQUFVLGdCQUNyQixXQUNBLENBQUMsU0FBUyxHQUNWLElBQUk7Ozs7O0FDcnBITjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0NBLGtCQUtPO0FBV0g7QUFUSixNQUFNLGFBQWE7QUFPbkIsTUFBTSxNQUFNLE1BQU07QUFDaEIsV0FDRSw2Q0FBQztBQUFBLE1BQUksS0FBSyxFQUFFLFNBQVMsUUFBUTtBQUFBLE1BQzNCO0FBQUEsb0RBQUM7QUFBQSxVQUFRLE1BQUs7QUFBQSxVQUFTO0FBQUEsU0FBTTtBQUFBLFFBQzdCLDRDQUFDO0FBQUEsVUFBSSxLQUFLLEVBQUUsV0FBVyxTQUFTO0FBQUEsVUFDOUIsc0RBQUM7QUFBQSxZQUFLO0FBQUEsV0FBcUQ7QUFBQSxTQUM3RDtBQUFBLFFBQ0EsNENBQUM7QUFBQSxVQUFJLEtBQUssRUFBRSxXQUFXLFNBQVM7QUFBQSxVQUM5QixzREFBQztBQUFBLFlBQUssTUFBTTtBQUFBLFlBQVksUUFBTztBQUFBLFlBQVM7QUFBQSxXQUV4QztBQUFBLFNBQ0Y7QUFBQSxRQUNBLDRDQUFDO0FBQUEsVUFBSSxLQUFLLEVBQUUsV0FBVyxTQUFTO0FBQUEsVUFDOUIsc0RBQUM7QUFBQSxZQUFLLE1BQUs7QUFBQSxZQUFRLEtBQUssRUFBRSxPQUFPLFlBQVk7QUFBQSxZQUFHO0FBQUEsV0FHaEQ7QUFBQSxTQUNGO0FBQUE7QUFBQSxLQUNGO0FBQUEsRUFFSjtBQUVBLE1BQU8sY0FBUTs7O0FEL0JmLCtCQUFjO0FBU1AsTUFBTSxhQUFhO0FBRzFCLE1BQU8sbUJBQVE7QUFBQSxJQUNiLFdBQVc7QUFBQSxJQUNYLHlCQUF5QjtBQUFBLE1BQ3ZCO0FBQUEsSUFDRjtBQUFBLElBQ0EscUJBQXFCO0FBQUEsSUFDckIsUUFBUTtBQUFBLElBQ1IsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2I7QUFBQSxRQUNFLGNBQWM7QUFBQSxRQUNkLFdBQVc7QUFBQSxNQUNiO0FBQUEsTUFDQTtBQUFBLFFBQ0UsY0FBYztBQUFBLFFBQ2QsV0FBVztBQUFBLE1BQ2I7QUFBQSxNQUNBO0FBQUEsUUFDRSxjQUFjO0FBQUEsUUFDZCxXQUFXO0FBQUEsTUFDYjtBQUFBLElBQ0Y7QUFBQSxJQUNBLDhCQUE4QjtBQUFBLElBQzlCLDBCQUEwQjtBQUFBLElBQzFCLGdCQUFnQjtBQUFBLE1BQ2QsMkJBQTJCO0FBQUEsUUFDekIsZUFBZTtBQUFBLFVBQ2I7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLFFBQ0EsV0FBVztBQUFBLE1BQ2I7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQO0FBQUEsVUFDRSxhQUFhO0FBQUEsVUFDYixZQUFZO0FBQUEsUUFDZDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxXQUFXO0FBQUEsRUFDYjsiLAogICJuYW1lcyI6IFtdCn0K
