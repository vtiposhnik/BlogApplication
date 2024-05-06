"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Home() {
    return (React.createElement("section", { className: "min-h-[100vh]" },
        React.createElement("div", { className: "max-w-5xl mx-auto mt-12 px-4 text-center" },
            React.createElement("div", { className: "w-full max-w-3xl mx-auto" },
                React.createElement("h1", { className: "text-4xl font-bold mt-2 mb-6" },
                    "Helping you find your new home;",
                    React.createElement("br", null),
                    "by simplifying the search."),
                React.createElement("p", { className: "px-4 leading-relaxed" },
                    "Propiti provides you with a quick, simple way to reach multiple estate agents.",
                    React.createElement("br", null),
                    "Allowing you to spend less time trawling through property portals,",
                    React.createElement("br", null),
                    "giving you more time on the other things you enjoy."),
                React.createElement("p", { className: "mb-8 mt-4 px-4 leading-relaxed" },
                    "Oh, and the best bit...",
                    React.createElement("span", { className: "text-pink-600 font-bold" }, "It's free!")),
                React.createElement("div", null,
                    React.createElement("a", { className: "inline-block py-4 px-8 leading-none text-white bg-slate-800 hover:bg-pink-600 rounded shadow text-sm font-bold", href: "/sign-up" }, "Sign-up for free"))))));
}
exports.default = Home;
