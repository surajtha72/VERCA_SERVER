"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagedResponse = void 0;
class PagedResponse {
    constructor(items, count, pageIndex, pageSize) {
        this.pageIndex = pageIndex;
        this.totalPages = Math.ceil(count / pageSize);
        this.totalRecords = count;
        this.data = items;
    }
}
exports.PagedResponse = PagedResponse;
