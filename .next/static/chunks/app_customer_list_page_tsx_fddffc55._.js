(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/app/customer/list/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>CustomerList
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$data$2d$table$2d$component$2f$dist$2f$index$2e$cjs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-data-table-component/dist/index.cjs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/xlsx/xlsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$file$2d$saver$2f$dist$2f$FileSaver$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/file-saver/dist/FileSaver.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.mjs [app-client] (ecmascript)");
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
function CustomerList() {
    _s();
    const [customers, setCustomers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filtered, setFiltered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomerList.useEffect": ()=>{
            async function fetchCustomers() {
                try {
                    const res = await fetch("/api/customer/list");
                    if (!res.ok) throw new Error("Failed to fetch customers");
                    const data = await res.json();
                    setCustomers(data.customers);
                    setFiltered(data.customers);
                } catch (err) {
                    setError(err.message);
                }
            }
            fetchCustomers();
        }
    }["CustomerList.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomerList.useEffect": ()=>{
            const filteredData = customers.filter({
                "CustomerList.useEffect.filteredData": (c)=>"".concat(c.customer_name, " ").concat(c.customer_contact_person, " ").concat(c.customer_mail_id).toLowerCase().includes(search.toLowerCase())
            }["CustomerList.useEffect.filteredData"]);
            setFiltered(filteredData);
        }
    }["CustomerList.useEffect"], [
        search,
        customers
    ]);
    const handleDelete = async (customer)=>{
        const confirmDelete = confirm("Are you sure you want to delete ".concat(customer.customer_name, "?"));
        if (!confirmDelete) return;
        try {
            const res = await fetch("/api/customer/".concat(customer.customer_id), {
                method: "DELETE"
            });
            const result = await res.json();
            if (res.ok) {
                alert("Customer deleted successfully");
                setCustomers((prev)=>prev.filter((c)=>c.customer_id !== customer.customer_id));
            } else {
                alert(result.message || "Failed to delete customer");
            }
        } catch (err) {
            console.error("Delete error:", err);
            alert("Error deleting customer");
        }
    };
    const exportToExcel = ()=>{
        const worksheet = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].json_to_sheet(filtered);
        const workbook = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].book_new();
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].book_append_sheet(workbook, worksheet, "Customers");
        const excelBuffer = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["write"](workbook, {
            bookType: "xlsx",
            type: "array"
        });
        const blob = new Blob([
            excelBuffer
        ], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$file$2d$saver$2f$dist$2f$FileSaver$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveAs"])(blob, "customers.xlsx");
    };
    const exportToCSV = ()=>{
        const worksheet = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].json_to_sheet(filtered);
        const csv = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].sheet_to_csv(worksheet);
        const blob = new Blob([
            csv
        ], {
            type: "text/csv;charset=utf-8;"
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$file$2d$saver$2f$dist$2f$FileSaver$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveAs"])(blob, "customers.csv");
    };
    const exportToPDF = ()=>{
        const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
        const tableColumn = [
            "Name",
            "Short Name",
            "Contact Person",
            "Address",
            "Email",
            "Phone",
            "GSTIN",
            "Country",
            "Active"
        ];
        const tableRows = filtered.map((c)=>[
                c.customer_name,
                c.customer_short_name,
                c.customer_contact_person,
                c.customer_address,
                c.customer_mail_id,
                c.customer_contact_number,
                c.customer_gst_num,
                c.customer_country,
                c.customer_active ? "Yes" : "No"
            ]);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(doc, {
            head: [
                tableColumn
            ],
            body: tableRows,
            styles: {
                fontSize: 8
            },
            startY: 20
        });
        doc.save("customers.pdf");
    };
    const handlePrint = ()=>{
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;
        const tableRows = filtered.map((c)=>"\n      <tr>\n        <td>".concat(c.customer_name, "</td>\n        <td>").concat(c.customer_short_name, "</td>\n        <td>").concat(c.customer_contact_person, "</td>\n        <td>").concat(c.customer_address, "</td>\n        <td>").concat(c.customer_mail_id, "</td>\n        <td>").concat(c.customer_contact_number, "</td>\n        <td>").concat(c.customer_gst_num, "</td>\n        <td>").concat(c.customer_country, "</td>\n        <td>").concat(c.customer_active ? "Yes" : "No", "</td>\n      </tr>\n    ")).join("");
        const html = "\n      <html>\n        <head>\n          <title>Customer List</title>\n          <style>\n            table { width: 100%; border-collapse: collapse; }\n            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 12px; }\n          </style>\n        </head>\n        <body>\n          <h2>Customer List</h2>\n          <table>\n            <thead>\n              <tr>\n                <th>Name</th>\n                <th>Short Name</th>\n                <th>Contact Person</th>\n                <th>Address</th>\n                <th>Email</th>\n                <th>Phone</th>\n                <th>GSTIN</th>\n                <th>Country</th>\n                <th>Active</th>\n              </tr>\n            </thead>\n            <tbody>\n              ".concat(tableRows, "\n            </tbody>\n          </table>\n        </body>\n      </html>\n    ");
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.print();
    };
    const columns = [
        {
            name: "Name",
            selector: (row)=>row.customer_name,
            sortable: true
        },
        {
            name: "Short Name",
            selector: (row)=>row.customer_short_name
        },
        {
            name: "Contact Person",
            selector: (row)=>row.customer_contact_person
        },
        {
            name: "Address",
            selector: (row)=>row.customer_address
        },
        {
            name: "Email",
            selector: (row)=>row.customer_mail_id
        },
        {
            name: "Phone",
            selector: (row)=>row.customer_contact_number
        },
        {
            name: "GSTIN",
            selector: (row)=>row.customer_gst_num
        },
        {
            name: "Country",
            selector: (row)=>row.customer_country
        },
        {
            name: "Active",
            selector: (row)=>row.customer_active ? "Yes" : "No"
        },
        {
            name: "Actions",
            cell: (row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex space-x-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/customer/view/".concat(row.customer_id),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEye"], {
                                className: "text-blue-600 hover:text-blue-800 cursor-pointer",
                                title: "View"
                            }, void 0, false, {
                                fileName: "[project]/app/customer/list/page.tsx",
                                lineNumber: 193,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/customer/list/page.tsx",
                            lineNumber: 192,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/customer/edit/".concat(row.customer_id),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEdit"], {
                                className: "text-green-600 hover:text-green-800 cursor-pointer",
                                title: "Edit"
                            }, void 0, false, {
                                fileName: "[project]/app/customer/list/page.tsx",
                                lineNumber: 196,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/customer/list/page.tsx",
                            lineNumber: 195,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleDelete(row),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaTrash"], {
                                className: "text-red-600 hover:text-red-800 cursor-pointer",
                                title: "Delete"
                            }, void 0, false, {
                                fileName: "[project]/app/customer/list/page.tsx",
                                lineNumber: 199,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/customer/list/page.tsx",
                            lineNumber: 198,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/customer/list/page.tsx",
                    lineNumber: 191,
                    columnNumber: 9
                }, this),
            ignoreRowClick: true
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-black dark:text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold",
                        children: "Customer List"
                    }, void 0, false, {
                        fileName: "[project]/app/customer/list/page.tsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/customer",
                        className: "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors",
                        children: "+ Add"
                    }, void 0, false, {
                        fileName: "[project]/app/customer/list/page.tsx",
                        lineNumber: 211,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/customer/list/page.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-red-600 mb-4",
                children: error
            }, void 0, false, {
                fileName: "[project]/app/customer/list/page.tsx",
                lineNumber: 219,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                placeholder: "Search...",
                className: "mb-4 px-3 py-2 border rounded w-full max-w-md",
                value: search,
                onChange: (e)=>setSearch(e.target.value)
            }, void 0, false, {
                fileName: "[project]/app/customer/list/page.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-2 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: exportToExcel,
                        className: "bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700",
                        children: "Export Excel"
                    }, void 0, false, {
                        fileName: "[project]/app/customer/list/page.tsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: exportToCSV,
                        className: "bg-yellow-600 text-white px-4 py-1 rounded hover:bg-yellow-700",
                        children: "Export CSV"
                    }, void 0, false, {
                        fileName: "[project]/app/customer/list/page.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: exportToPDF,
                        className: "bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700",
                        children: "Export PDF"
                    }, void 0, false, {
                        fileName: "[project]/app/customer/list/page.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handlePrint,
                        className: "bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700",
                        children: "Print"
                    }, void 0, false, {
                        fileName: "[project]/app/customer/list/page.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/customer/list/page.tsx",
                lineNumber: 230,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$data$2d$table$2d$component$2f$dist$2f$index$2e$cjs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                columns: columns,
                data: filtered,
                pagination: true,
                highlightOnHover: true,
                responsive: true,
                striped: true,
                dense: true,
                customStyles: {
                    rows: {
                        style: {
                            fontSize: '0.875rem',
                            paddingTop: '0.5rem',
                            paddingBottom: '0.5rem'
                        }
                    },
                    headCells: {
                        style: {
                            fontSize: '0.875rem',
                            fontWeight: '600'
                        }
                    },
                    cells: {
                        style: {
                            fontSize: '0.875rem'
                        }
                    }
                }
            }, void 0, false, {
                fileName: "[project]/app/customer/list/page.tsx",
                lineNumber: 245,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/customer/list/page.tsx",
        lineNumber: 208,
        columnNumber: 5
    }, this);
}
_s(CustomerList, "3EZH36AoiBP4kQCu0bU/mVPL7lE=");
_c = CustomerList;
var _c;
__turbopack_context__.k.register(_c, "CustomerList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_customer_list_page_tsx_fddffc55._.js.map