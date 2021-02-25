"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relu = exports.linear = exports.tanh = exports.sigmoid = void 0;
exports.sigmoid = {
    func: (x) => 1 / (1 + Math.exp(-x)),
    derivative: (y) => y * (1 - y)
};
exports.tanh = {
    func: (x) => Math.tanh(x),
    derivative: (y) => 1 - y * y
};
exports.linear = {
    func: (x) => x,
    derivative: (_) => 1
};
exports.relu = {
    func: (x) => Math.max(0, x),
    derivative: (y) => (y > 0 ? 1 : 0)
};
//# sourceMappingURL=activation.js.map