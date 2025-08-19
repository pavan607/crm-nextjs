(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/app/enquiry/list/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>LeadListPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$data$2d$table$2d$component$2f$dist$2f$index$2e$cjs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-data-table-component/dist/index.cjs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/xlsx/xlsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$file$2d$saver$2f$dist$2f$FileSaver$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/file-saver/dist/FileSaver.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$PencilIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PencilIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/PencilIcon.js [app-client] (ecmascript) <export default as PencilIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$TrashIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrashIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/TrashIcon.js [app-client] (ecmascript) <export default as TrashIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function LeadListPage() {
    _s();
    const [leads, setLeads] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filteredLeads, setFilteredLeads] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [currentPath, setCurrentPath] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [deleteModal, setDeleteModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        enquiryId: null,
        enquiryNumber: ''
    });
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeadListPage.useEffect": ()=>{
            setCurrentPath(window.location.pathname);
        }
    }["LeadListPage.useEffect"], []);
    const renderBreadcrumb = ()=>{
        const isLeadList = currentPath.includes('/enquiry/list');
        const isLeadForm = currentPath === '/enquiry/add/' || currentPath.includes('/enquiry/add/') && !currentPath.includes('/enquiry/list/');
        if (isLeadList) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/enquiry/list",
                    className: "text-blue-600 hover:underline text-sm",
                    children: "All"
                }, void 0, false, {
                    fileName: "[project]/app/enquiry/list/page.tsx",
                    lineNumber: 63,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/enquiry/list/page.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this);
        } else if (isLeadForm) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/enquiry/list",
                        className: "text-blue-600 hover:underline",
                        children: "All"
                    }, void 0, false, {
                        fileName: "[project]/app/enquiry/list/page.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mx-2",
                        children: "→"
                    }, void 0, false, {
                        fileName: "[project]/app/enquiry/list/page.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/enquiry/add",
                        className: "text-blue-600 hover:underline",
                        children: "Form"
                    }, void 0, false, {
                        fileName: "[project]/app/enquiry/list/page.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/enquiry/list/page.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, this);
        }
        return null;
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeadListPage.useEffect": ()=>{
            const fetchLeads = {
                "LeadListPage.useEffect.fetchLeads": async ()=>{
                    try {
                        const res = await fetch('/api/enquiry/list');
                        const data = await res.json();
                        const list = Array.isArray(data) ? data : (data === null || data === void 0 ? void 0 : data.leads) || [];
                        setLeads(list);
                        setFilteredLeads(list);
                    } catch (error) {
                        console.error('Failed to fetch leads:', error);
                    }
                }
            }["LeadListPage.useEffect.fetchLeads"];
            fetchLeads();
        }
    }["LeadListPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeadListPage.useEffect": ()=>{
            const lower = searchTerm.toLowerCase();
            const filtered = leads.filter({
                "LeadListPage.useEffect.filtered": (lead)=>Object.values(lead).some({
                        "LeadListPage.useEffect.filtered": (value)=>value === null || value === void 0 ? void 0 : value.toString().toLowerCase().includes(lower)
                    }["LeadListPage.useEffect.filtered"])
            }["LeadListPage.useEffect.filtered"]);
            setFilteredLeads(filtered);
        }
    }["LeadListPage.useEffect"], [
        searchTerm,
        leads
    ]);
    const handleEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LeadListPage.useCallback[handleEdit]": (enquiryId)=>{
            router.push("/enquiry/edit/".concat(enquiryId));
        }
    }["LeadListPage.useCallback[handleEdit]"], [
        router
    ]);
    const handleDelete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LeadListPage.useCallback[handleDelete]": async (enquiryId)=>{
            try {
                const response = await fetch("/api/enquiry/add/".concat(enquiryId), {
                    method: 'DELETE'
                });
                if (response.ok) {
                    const updatedLeads = leads.filter({
                        "LeadListPage.useCallback[handleDelete].updatedLeads": (lead)=>lead.enquiryId !== enquiryId
                    }["LeadListPage.useCallback[handleDelete].updatedLeads"]);
                    setLeads(updatedLeads);
                    setFilteredLeads(updatedLeads);
                    setDeleteModal({
                        isOpen: false,
                        enquiryId: null,
                        enquiryNumber: ''
                    });
                    // Optional: Show success message
                    console.log('Enquiry deleted successfully');
                } else {
                    console.error('Failed to delete lead');
                // Optional: Show error message to user
                }
            } catch (error) {
                console.error('Error deleting lead:', error);
            // Optional: Show error message to user
            }
        }
    }["LeadListPage.useCallback[handleDelete]"], [
        leads
    ]);
    const handleExportExcel = ()=>{
        const worksheet = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].json_to_sheet(filteredLeads);
        const workbook = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].book_new();
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].book_append_sheet(workbook, worksheet, 'Leads');
        const excelBuffer = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["write"](workbook, {
            bookType: 'xlsx',
            type: 'array'
        });
        const data = new Blob([
            excelBuffer
        ], {
            type: 'application/octet-stream'
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$file$2d$saver$2f$dist$2f$FileSaver$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveAs"])(data, 'leads.xlsx');
    };
    const handleExportPDF = ()=>{
        const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
        const columns = [
            'Enquiry Number',
            'Opportunity',
            'Contact',
            'Type',
            'Lead Source',
            'Assigned To',
            'Campaign',
            'Revenue',
            'Organization',
            'Amount',
            'Expected Close Date',
            'Next Step',
            'Sales Stage',
            'Probability',
            'Description',
            'Comments',
            'Products'
        ];
        const rows = filteredLeads.map((lead)=>{
            var _lead_enquiryNumber, _lead_opportunityName, _lead_contactName, _lead_type, _lead_leadSource, _lead_assignedToName, _lead_campaignSource, _lead_weightedRevenue, _lead_organizationName, _lead_amount, _lead_expectedCloseDate, _lead_nextStep, _lead_salesStage, _lead_probability, _lead_description, _lead_comments, _lead_products;
            return [
                (_lead_enquiryNumber = lead.enquiryNumber) !== null && _lead_enquiryNumber !== void 0 ? _lead_enquiryNumber : '—',
                (_lead_opportunityName = lead.opportunityName) !== null && _lead_opportunityName !== void 0 ? _lead_opportunityName : '—',
                (_lead_contactName = lead.contactName) !== null && _lead_contactName !== void 0 ? _lead_contactName : '—',
                (_lead_type = lead.type) !== null && _lead_type !== void 0 ? _lead_type : '—',
                (_lead_leadSource = lead.leadSource) !== null && _lead_leadSource !== void 0 ? _lead_leadSource : '—',
                (_lead_assignedToName = lead.assignedToName) !== null && _lead_assignedToName !== void 0 ? _lead_assignedToName : '—',
                (_lead_campaignSource = lead.campaignSource) !== null && _lead_campaignSource !== void 0 ? _lead_campaignSource : '—',
                (_lead_weightedRevenue = lead.weightedRevenue) !== null && _lead_weightedRevenue !== void 0 ? _lead_weightedRevenue : '—',
                (_lead_organizationName = lead.organizationName) !== null && _lead_organizationName !== void 0 ? _lead_organizationName : '—',
                (_lead_amount = lead.amount) !== null && _lead_amount !== void 0 ? _lead_amount : '—',
                (_lead_expectedCloseDate = lead.expectedCloseDate) !== null && _lead_expectedCloseDate !== void 0 ? _lead_expectedCloseDate : '—',
                (_lead_nextStep = lead.nextStep) !== null && _lead_nextStep !== void 0 ? _lead_nextStep : '—',
                (_lead_salesStage = lead.salesStage) !== null && _lead_salesStage !== void 0 ? _lead_salesStage : '—',
                (_lead_probability = lead.probability) !== null && _lead_probability !== void 0 ? _lead_probability : '—',
                (_lead_description = lead.description) !== null && _lead_description !== void 0 ? _lead_description : '—',
                (_lead_comments = lead.comments) !== null && _lead_comments !== void 0 ? _lead_comments : '—',
                (_lead_products = lead.products) !== null && _lead_products !== void 0 ? _lead_products : '—'
            ];
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(doc, {
            head: [
                columns
            ],
            body: rows,
            styles: {
                fontSize: 8
            },
            headStyles: {
                fillColor: [
                    200,
                    200,
                    200
                ]
            }
        });
        doc.save('leads.pdf');
    };
    const handlePrint = ()=>{
        var _document_getElementById;
        const printContent = (_document_getElementById = document.getElementById('print-table')) === null || _document_getElementById === void 0 ? void 0 : _document_getElementById.innerHTML;
        const printWindow = window.open('', '_blank');
        if (printWindow && printContent) {
            printWindow.document.write("\n        <html>\n          <head>\n            <title>Print Leads</title>\n            <style>\n              body {\n                font-family: Arial, sans-serif;\n                margin: 20px;\n              }\n              table {\n                width: 100%;\n                border-collapse: collapse;\n                font-size: 12px;\n              }\n              th, td {\n                border: 1px solid #ccc;\n                padding: 6px 8px;\n                text-align: left;\n                vertical-align: top;\n              }\n              th {\n                background-color: #f5f5f5;\n              }\n              div {\n                margin-bottom: 2px;\n              }\n            </style>\n          </head>\n          <body>\n            ".concat(printContent, "\n          </body>\n        </html>\n      "));
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        }
    };
    const DeleteConfirmationModal = ()=>{
        if (!deleteModal.isOpen) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "h-6 w-6 text-red-600",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    strokeWidth: "1.5",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/list/page.tsx",
                                        lineNumber: 259,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/enquiry/list/page.tsx",
                                    lineNumber: 252,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/enquiry/list/page.tsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ml-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-medium text-gray-900",
                                    children: "Delete Enquiry"
                                }, void 0, false, {
                                    fileName: "[project]/app/enquiry/list/page.tsx",
                                    lineNumber: 267,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/enquiry/list/page.tsx",
                                lineNumber: 266,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/enquiry/list/page.tsx",
                        lineNumber: 250,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-500",
                            children: [
                                "Are you sure you want to delete enquiry ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold text-gray-900",
                                    children: [
                                        "#",
                                        deleteModal.enquiryNumber
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/enquiry/list/page.tsx",
                                    lineNumber: 275,
                                    columnNumber: 53
                                }, this),
                                "? This action cannot be undone."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/enquiry/list/page.tsx",
                            lineNumber: 274,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/enquiry/list/page.tsx",
                        lineNumber: 273,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end space-x-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setDeleteModal({
                                        isOpen: false,
                                        enquiryId: null,
                                        enquiryNumber: ''
                                    }),
                                className: "px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                                children: "No, Cancel"
                            }, void 0, false, {
                                fileName: "[project]/app/enquiry/list/page.tsx",
                                lineNumber: 281,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    if (deleteModal.enquiryId) {
                                        handleDelete(deleteModal.enquiryId);
                                    }
                                },
                                className: "px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",
                                children: "Yes, Delete"
                            }, void 0, false, {
                                fileName: "[project]/app/enquiry/list/page.tsx",
                                lineNumber: 287,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/enquiry/list/page.tsx",
                        lineNumber: 280,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/enquiry/list/page.tsx",
                lineNumber: 249,
                columnNumber: 7
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/enquiry/list/page.tsx",
            lineNumber: 248,
            columnNumber: 5
        }, this);
    };
    const columns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LeadListPage.useMemo[columns]": ()=>[
                {
                    name: 'Enquiry Number',
                    selector: {
                        "LeadListPage.useMemo[columns]": (row)=>row.enquiryNumber
                    }["LeadListPage.useMemo[columns]"],
                    sortable: true,
                    width: '150px'
                },
                {
                    name: 'Enquiry',
                    selector: {
                        "LeadListPage.useMemo[columns]": (row)=>row.opportunityName
                    }["LeadListPage.useMemo[columns]"],
                    sortable: true
                },
                {
                    name: 'Contact',
                    selector: {
                        "LeadListPage.useMemo[columns]": (row)=>row.contactName || '—'
                    }["LeadListPage.useMemo[columns]"],
                    sortable: true
                },
                {
                    name: 'Type',
                    selector: {
                        "LeadListPage.useMemo[columns]": (row)=>row.type || '—'
                    }["LeadListPage.useMemo[columns]"],
                    sortable: true
                },
                {
                    name: 'Lead Source',
                    selector: {
                        "LeadListPage.useMemo[columns]": (row)=>row.leadSource || '—'
                    }["LeadListPage.useMemo[columns]"],
                    sortable: true
                },
                {
                    name: 'Assigned To',
                    cell: {
                        "LeadListPage.useMemo[columns]": (row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                onClick: {
                                    "LeadListPage.useMemo[columns]": (e)=>{
                                        e.stopPropagation();
                                        if (row.assignedToName) {
                                            router.push("/employee/".concat(row.assignedToName));
                                        }
                                    }
                                }["LeadListPage.useMemo[columns]"],
                                className: "text-blue-600 hover:underline cursor-pointer",
                                role: "button",
                                tabIndex: 0,
                                onKeyDown: {
                                    "LeadListPage.useMemo[columns]": (e)=>{
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            if (row.assignedToName) {
                                                router.push("/employee/".concat(row.assignedToName));
                                            }
                                        }
                                    }
                                }["LeadListPage.useMemo[columns]"],
                                children: row.assignedToName || '—'
                            }, void 0, false, {
                                fileName: "[project]/app/enquiry/list/page.tsx",
                                lineNumber: 334,
                                columnNumber: 9
                            }, this)
                    }["LeadListPage.useMemo[columns]"],
                    ignoreRowClick: true,
                    sortable: true,
                    selector: {
                        "LeadListPage.useMemo[columns]": (row)=>row.assignedToName || '—'
                    }["LeadListPage.useMemo[columns]"]
                },
                {
                    name: 'Campaign Source',
                    selector: {
                        "LeadListPage.useMemo[columns]": (row)=>row.campaignSource || '—'
                    }["LeadListPage.useMemo[columns]"],
                    sortable: true
                },
                {
                    name: 'Weighted Revenue',
                    selector: {
                        "LeadListPage.useMemo[columns]": (row)=>{
                            var _row_weightedRevenue;
                            return (_row_weightedRevenue = row.weightedRevenue) !== null && _row_weightedRevenue !== void 0 ? _row_weightedRevenue : '—';
                        }
                    }["LeadListPage.useMemo[columns]"],
                    sortable: true
                },
                {
                    name: 'Organization',
                    selector: {
                        "LeadListPage.useMemo[columns]": (row)=>row.organizationName || '—'
                    }["LeadListPage.useMemo[columns]"],
                    sortable: true
                },
                {
                    name: 'Amount',
                    selector: {
                        "LeadListPage.useMemo[columns]": (row)=>{
                            var _row_amount;
                            return (_row_amount = row.amount) !== null && _row_amount !== void 0 ? _row_amount : '—';
                        }
                    }["LeadListPage.useMemo[columns]"],
                    sortable: true
                },
                {
                    name: 'Expected Close Date',
                    selector: {
                        "LeadListPage.useMemo[columns]": (row)=>row.expectedCloseDate || '—'
                    }["LeadListPage.useMemo[columns]"],
                    sortable: true
                },
                {
                    name: 'Next Step',
                    selector: {
                        "LeadListPage.useMemo[columns]": (row)=>row.nextStep || '—'
                    }["LeadListPage.useMemo[columns]"],
                    sortable: true
                },
                {
                    name: 'Sales Stage',
                    selector: {
                        "LeadListPage.useMemo[columns]": (row)=>row.salesStage || '—'
                    }["LeadListPage.useMemo[columns]"],
                    sortable: true
                },
                {
                    name: 'Probability',
                    selector: {
                        "LeadListPage.useMemo[columns]": (row)=>{
                            var _row_probability;
                            return (_row_probability = row.probability) !== null && _row_probability !== void 0 ? _row_probability : '—';
                        }
                    }["LeadListPage.useMemo[columns]"],
                    sortable: true
                },
                {
                    name: 'Description',
                    selector: {
                        "LeadListPage.useMemo[columns]": (row)=>row.description || '—'
                    }["LeadListPage.useMemo[columns]"],
                    sortable: true
                },
                {
                    name: 'Actions',
                    cell: {
                        "LeadListPage.useMemo[columns]": (row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: {
                                            "LeadListPage.useMemo[columns]": (e)=>{
                                                e.stopPropagation();
                                                handleEdit(row.enquiryId);
                                            }
                                        }["LeadListPage.useMemo[columns]"],
                                        className: "flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium px-2 py-1 rounded hover:bg-blue-50",
                                        title: "Edit Enquiry",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$PencilIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PencilIcon$3e$__["PencilIcon"], {
                                            className: "h-4 w-4 mr-1"
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/list/page.tsx",
                                            lineNumber: 418,
                                            columnNumber: 13
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/list/page.tsx",
                                        lineNumber: 410,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: {
                                            "LeadListPage.useMemo[columns]": (e)=>{
                                                e.stopPropagation();
                                                setDeleteModal({
                                                    isOpen: true,
                                                    enquiryId: row.enquiryId,
                                                    enquiryNumber: row.enquiryNumber
                                                });
                                            }
                                        }["LeadListPage.useMemo[columns]"],
                                        className: "flex items-center text-red-600 hover:text-red-800 text-sm font-medium px-2 py-1 rounded hover:bg-red-50",
                                        title: "Delete Enquiry",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$TrashIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrashIcon$3e$__["TrashIcon"], {
                                            className: "h-4 w-4 mr-1"
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/list/page.tsx",
                                            lineNumber: 433,
                                            columnNumber: 13
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/list/page.tsx",
                                        lineNumber: 421,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/enquiry/list/page.tsx",
                                lineNumber: 409,
                                columnNumber: 9
                            }, this)
                    }["LeadListPage.useMemo[columns]"],
                    ignoreRowClick: true,
                    width: '120px'
                }
            ]
    }["LeadListPage.useMemo[columns]"], [
        router,
        handleEdit
    ] // Remove deleteConfirm from dependencies
    );
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-2",
        children: [
            renderBreadcrumb(),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-xl font-semibold",
                        children: "Enquiry"
                    }, void 0, false, {
                        fileName: "[project]/app/enquiry/list/page.tsx",
                        lineNumber: 449,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-sm",
                        onClick: ()=>router.push('/enquiry/add'),
                        children: "+ Add Enquiry"
                    }, void 0, false, {
                        fileName: "[project]/app/enquiry/list/page.tsx",
                        lineNumber: 450,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/enquiry/list/page.tsx",
                lineNumber: 448,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-3 gap-2 flex-wrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "Search leads...",
                        className: "border rounded px-2 py-1 w-full sm:w-auto",
                        value: searchTerm,
                        onChange: (e)=>setSearchTerm(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/app/enquiry/list/page.tsx",
                        lineNumber: 459,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 flex-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1",
                                onClick: handleExportExcel,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "aria-hidden": "true",
                                        children: "📊"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/list/page.tsx",
                                        lineNumber: 472,
                                        columnNumber: 13
                                    }, this),
                                    " Excel"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/enquiry/list/page.tsx",
                                lineNumber: 468,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1",
                                onClick: handleExportPDF,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "aria-hidden": "true",
                                        children: "📄"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/list/page.tsx",
                                        lineNumber: 478,
                                        columnNumber: 13
                                    }, this),
                                    " PDF"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/enquiry/list/page.tsx",
                                lineNumber: 474,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1",
                                onClick: handlePrint,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "aria-hidden": "true",
                                        children: "🖨"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/list/page.tsx",
                                        lineNumber: 484,
                                        columnNumber: 13
                                    }, this),
                                    " Print"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/enquiry/list/page.tsx",
                                lineNumber: 480,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/enquiry/list/page.tsx",
                        lineNumber: 467,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/enquiry/list/page.tsx",
                lineNumber: 458,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$data$2d$table$2d$component$2f$dist$2f$index$2e$cjs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                columns: columns,
                data: filteredLeads,
                pagination: true,
                highlightOnHover: true,
                striped: true,
                responsive: true,
                pointerOnHover: true,
                onRowClicked: (row)=>router.push("/leads/".concat(row.enquiryId)),
                // Note: defaultSortFieldId expects a numeric id of the column, not a string field
                // So either assign an id prop to your column or use defaultSortField="enquiryNumber"
                // defaultSortField="enquiryNumber"
                persistTableHead: true
            }, void 0, false, {
                fileName: "[project]/app/enquiry/list/page.tsx",
                lineNumber: 489,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "print-table",
                style: {
                    display: 'none'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Enquiry Number"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/list/page.tsx",
                                        lineNumber: 508,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Opportunity"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/list/page.tsx",
                                        lineNumber: 509,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Contact"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/list/page.tsx",
                                        lineNumber: 510,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Type"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/list/page.tsx",
                                        lineNumber: 511,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Lead Source"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/list/page.tsx",
                                        lineNumber: 512,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Assigned To"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/list/page.tsx",
                                        lineNumber: 513,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Campaign Source"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/list/page.tsx",
                                        lineNumber: 514,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Weighted Revenue"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/list/page.tsx",
                                        lineNumber: 515,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Organization"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/list/page.tsx",
                                        lineNumber: 516,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Amount"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/list/page.tsx",
                                        lineNumber: 517,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Expected Close Date"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/list/page.tsx",
                                        lineNumber: 518,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Next Step"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/list/page.tsx",
                                        lineNumber: 519,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Sales Stage"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/list/page.tsx",
                                        lineNumber: 520,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Probability"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/list/page.tsx",
                                        lineNumber: 521,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Description"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/list/page.tsx",
                                        lineNumber: 522,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/enquiry/list/page.tsx",
                                lineNumber: 507,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/enquiry/list/page.tsx",
                            lineNumber: 506,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: filteredLeads.map((lead, index)=>{
                                var _lead_weightedRevenue, _lead_amount, _lead_probability;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: lead.enquiryNumber
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/list/page.tsx",
                                            lineNumber: 531,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: lead.opportunityName
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/list/page.tsx",
                                            lineNumber: 532,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: lead.contactName || '—'
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/list/page.tsx",
                                            lineNumber: 533,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: lead.type || '—'
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/list/page.tsx",
                                            lineNumber: 534,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: lead.leadSource || '—'
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/list/page.tsx",
                                            lineNumber: 535,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: lead.assignedToName || '—'
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/list/page.tsx",
                                            lineNumber: 536,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: lead.campaignSource || '—'
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/list/page.tsx",
                                            lineNumber: 537,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: (_lead_weightedRevenue = lead.weightedRevenue) !== null && _lead_weightedRevenue !== void 0 ? _lead_weightedRevenue : '—'
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/list/page.tsx",
                                            lineNumber: 538,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: lead.organizationName || '—'
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/list/page.tsx",
                                            lineNumber: 539,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: (_lead_amount = lead.amount) !== null && _lead_amount !== void 0 ? _lead_amount : '—'
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/list/page.tsx",
                                            lineNumber: 540,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: lead.expectedCloseDate || '—'
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/list/page.tsx",
                                            lineNumber: 541,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: lead.nextStep || '—'
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/list/page.tsx",
                                            lineNumber: 542,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: lead.salesStage || '—'
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/list/page.tsx",
                                            lineNumber: 543,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: (_lead_probability = lead.probability) !== null && _lead_probability !== void 0 ? _lead_probability : '—'
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/list/page.tsx",
                                            lineNumber: 544,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: lead.description || '—'
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/list/page.tsx",
                                            lineNumber: 545,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/app/enquiry/list/page.tsx",
                                    lineNumber: 530,
                                    columnNumber: 15
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/enquiry/list/page.tsx",
                            lineNumber: 528,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/enquiry/list/page.tsx",
                    lineNumber: 505,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/enquiry/list/page.tsx",
                lineNumber: 504,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DeleteConfirmationModal, {}, void 0, false, {
                fileName: "[project]/app/enquiry/list/page.tsx",
                lineNumber: 554,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/enquiry/list/page.tsx",
        lineNumber: 445,
        columnNumber: 5
    }, this);
}
_s(LeadListPage, "1Wc8qf6MWEkVfdBJA0LuwwVOIGk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = LeadListPage;
var _c;
__turbopack_context__.k.register(_c, "LeadListPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_enquiry_list_page_tsx_6c593428._.js.map