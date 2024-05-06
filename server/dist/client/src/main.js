"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("react-dom/client"));
const App_tsx_1 = __importDefault(require("./App.tsx"));
require("./index.css");
const react_router_dom_1 = require("react-router-dom");
const store_ts_1 = require("./redux/store.ts");
const react_redux_1 = require("react-redux");
const store_ts_2 = require("./redux/store.ts");
const react_1 = require("redux-persist/integration/react");
client_1.default.createRoot(document.getElementById('root')).render(React.createElement(react_1.PersistGate, { persistor: store_ts_2.persistor },
    React.createElement(react_redux_1.Provider, { store: store_ts_1.store },
        React.createElement(react_router_dom_1.BrowserRouter, null,
            React.createElement(App_tsx_1.default, null)))));
