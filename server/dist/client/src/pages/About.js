"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function About() {
    return (React.createElement("section", { className: "bg-gray-100" },
        React.createElement("div", { className: "container mx-auto py-16 px-4 sm:px-6 lg:px-8" },
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 items-center gap-8" },
                React.createElement("div", { className: "max-w-lg" },
                    React.createElement("h2", { className: "text-3xl font-extrabold text-gray-900 sm:text-4xl" }, "About Us"),
                    React.createElement("p", { className: "mt-4 text-gray-600 text-lg" }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis eros at lacus feugiat hendrerit sed ut tortor. Suspendisse et magna quis elit efficitur consequat. Mauris eleifend velit a pretium iaculis. Donec sagittis velit et magna euismod, vel aliquet nulla malesuada. Nunc pharetra massa lectus, a fermentum arcu volutpat vel."),
                    React.createElement("div", { className: "mt-8" },
                        React.createElement("a", { href: "#", className: "text-blue-500 hover:text-blue-600 font-medium" },
                            "Learn more about us",
                            React.createElement("span", { className: "ml-2" }, "\u2192")))),
                React.createElement("div", { className: "mt-12 md:mt-0" },
                    React.createElement("img", { src: "https://images.unsplash.com/photo-1531973576160-7125cd663d86", alt: "About Us Image", className: "object-cover rounded-lg shadow-md" }))))));
}
exports.default = About;
