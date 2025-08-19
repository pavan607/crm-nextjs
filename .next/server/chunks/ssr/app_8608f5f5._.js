module.exports = {

"[project]/app/hooks/useEmployeeSession.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// hooks/useEmployeeSession.ts
__turbopack_context__.s({
    "useEmployeeSession": ()=>useEmployeeSession
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
const useEmployeeSession = ()=>{
    const [employee, setEmployee] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadEmployee = ()=>{
            try {
                const employeeData = sessionStorage.getItem('loggedInEmployee');
                if (employeeData) {
                    setEmployee(JSON.parse(employeeData));
                }
            } catch (error) {
                console.error('Error loading employee session:', error);
            } finally{
                setLoading(false);
            }
        };
        loadEmployee();
    }, []);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        sessionStorage.removeItem('loggedInEmployee');
        setEmployee(null);
        router.push('/login');
    }, [
        router
    ]);
    const requireAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!loading && !employee) {
            router.push('/login');
            return false;
        }
        return true;
    }, [
        loading,
        employee,
        router
    ]);
    return {
        employee,
        loading,
        logout,
        requireAuth,
        isLoggedIn: !!employee
    };
};
}),
"[project]/app/enquiry/edit/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

//app/leads/[leadId]/edit/page.tsx
__turbopack_context__.s({
    "default": ()=>LeadEditPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$PencilIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PencilIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/PencilIcon.js [app-ssr] (ecmascript) <export default as PencilIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useEmployeeSession$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/useEmployeeSession.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const InlineField = ({ label, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 flex-1 min-w-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "whitespace-nowrap w-40 font-medium",
                children: [
                    label,
                    ":"
                ]
            }, void 0, true, {
                fileName: "[project]/app/enquiry/edit/page.tsx",
                lineNumber: 152,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-grow min-w-0",
                children: children
            }, void 0, false, {
                fileName: "[project]/app/enquiry/edit/page.tsx",
                lineNumber: 153,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/enquiry/edit/page.tsx",
        lineNumber: 151,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const ProductModal = ({ isOpen, onClose, onSave, products, editingProduct })=>{
    const [selectedProductId, setSelectedProductId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [quantity, setQuantity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [price, setPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [selectedProduct, setSelectedProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isOpen) {
            if (editingProduct) {
                setSelectedProductId(editingProduct.crmtf_product_id.toString());
                setQuantity(editingProduct.crm_quantity);
                setPrice(editingProduct.crm_price);
                const product = products.find((p)=>p.crmtf_product_id === editingProduct.crmtf_product_id);
                setSelectedProduct(product || null);
            } else {
                setSelectedProductId('');
                setQuantity(1);
                setPrice(0);
                setSelectedProduct(null);
            }
        }
    }, [
        isOpen,
        editingProduct,
        products
    ]);
    const handleProductSelect = (productId)=>{
        setSelectedProductId(productId);
        const product = products.find((p)=>p.crmtf_product_id.toString() === productId);
        setSelectedProduct(product || null);
    };
    const handleSave = ()=>{
        if (!selectedProduct || quantity <= 0 || price <= 0) {
            alert('Please fill in all required fields with valid values');
            return;
        }
        const enquiryProduct = {
            id: editingProduct?.id || Date.now().toString(),
            crmtf_product_id: selectedProduct.crmtf_product_id,
            product_name: selectedProduct.crmtf_product_name,
            product_code: selectedProduct.crmtf_product_code || '',
            product_type: selectedProduct.crmtf_product_type || '',
            product_model_number: selectedProduct.crmtf_product_model_number || '',
            product_uom: selectedProduct.crmtf_product_uom || '',
            crm_quantity: quantity,
            crm_price: price
        };
        onSave(enquiryProduct);
        handleClose();
    };
    const handleClose = ()=>{
        setSelectedProductId('');
        setQuantity(1);
        setPrice(0);
        setSelectedProduct(null);
        onClose();
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg p-4 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-semibold",
                            children: editingProduct ? 'Edit Product' : 'Product List'
                        }, void 0, false, {
                            fileName: "[project]/app/enquiry/edit/page.tsx",
                            lineNumber: 233,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleClose,
                            className: "text-gray-500 hover:text-gray-700 text-xl leading-none",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/app/enquiry/edit/page.tsx",
                            lineNumber: 234,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/enquiry/edit/page.tsx",
                    lineNumber: 232,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block font-medium mb-1 text-sm",
                                    children: "Product Name*"
                                }, void 0, false, {
                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                    lineNumber: 243,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: selectedProductId,
                                    onChange: (e)=>handleProductSelect(e.target.value),
                                    className: "w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                                    required: true,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "-- Select Product --"
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 250,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        products.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: product.crmtf_product_id,
                                                children: product.crmtf_product_name
                                            }, product.crmtf_product_id, false, {
                                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                                lineNumber: 252,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                    lineNumber: 244,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/enquiry/edit/page.tsx",
                            lineNumber: 242,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block font-medium mb-1 text-sm",
                                            children: "Code"
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 260,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: selectedProduct?.crmtf_product_code || '',
                                            className: "w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-sm",
                                            disabled: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 261,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                    lineNumber: 259,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block font-medium mb-1 text-sm",
                                            children: "Type"
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 269,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: selectedProduct?.crmtf_product_type || '',
                                            className: "w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-sm",
                                            disabled: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 270,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                    lineNumber: 268,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block font-medium mb-1 text-sm",
                                            children: "Model"
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 278,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: selectedProduct?.crmtf_product_model_number || '',
                                            className: "w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-sm",
                                            disabled: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 279,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                    lineNumber: 277,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block font-medium mb-1 text-sm",
                                            children: "UOM"
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 287,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: selectedProduct?.crmtf_product_uom || '',
                                            className: "w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-sm",
                                            disabled: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 288,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                    lineNumber: 286,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block font-medium mb-1 text-sm",
                                            children: "Quantity*"
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 296,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            value: quantity,
                                            onChange: (e)=>setQuantity(parseInt(e.target.value) || 1),
                                            className: "w-full border border-gray-300 rounded-md p-2 text-sm",
                                            min: "1",
                                            required: true,
                                            placeholder: "Quantity"
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 297,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                    lineNumber: 295,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block font-medium mb-1 text-sm",
                                            children: "Price*"
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 308,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            value: price,
                                            onChange: (e)=>setPrice(parseFloat(e.target.value) || 0),
                                            className: "w-full border border-gray-300 rounded-md p-2 text-sm",
                                            min: "0",
                                            step: "0.01",
                                            required: true,
                                            placeholder: "Unit Price"
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 309,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                    lineNumber: 307,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/enquiry/edit/page.tsx",
                            lineNumber: 258,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        quantity > 0 && price > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 text-sm text-blue-700 bg-blue-50 rounded p-2",
                            children: [
                                "Total: Rs ",
                                (quantity * price).toFixed(2)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/enquiry/edit/page.tsx",
                            lineNumber: 322,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/enquiry/edit/page.tsx",
                    lineNumber: 241,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-1 justify-end mt-4 pt-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleSave,
                            disabled: !selectedProduct || quantity <= 0 || price <= 0,
                            className: "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-1.5 rounded text-sm",
                            children: editingProduct ? 'Update Product' : 'Add Product'
                        }, void 0, false, {
                            fileName: "[project]/app/enquiry/edit/page.tsx",
                            lineNumber: 328,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleClose,
                            className: "bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/app/enquiry/edit/page.tsx",
                            lineNumber: 336,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/enquiry/edit/page.tsx",
                    lineNumber: 327,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/app/enquiry/edit/page.tsx",
            lineNumber: 231,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/enquiry/edit/page.tsx",
        lineNumber: 230,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
function LeadEditPage({ params }) {
    // Use React.use() to unwrap the params Promise
    const { leadId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(params);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { employee, requireAuth } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useEmployeeSession$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEmployeeSession"])();
    // Add client-side flag to prevent hydration mismatch
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lead, setLead] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [employees, setEmployees] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [availableProducts, setAvailableProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [enquiryProducts, setEnquiryProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [displayedProducts, setDisplayedProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isProductModalOpen, setIsProductModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingProductIndex, setEditingProductIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deletedAttachmentIds, setDeletedAttachmentIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        crm_enquiry_number: '',
        opportunityName: '',
        contactName: '',
        type: '',
        leadSource: '',
        assignedTo: '',
        campaignSource: '',
        weightedRevenue: '',
        organizationName: '',
        amount: '',
        expectedCloseDate: '',
        actualCloseDate: '',
        hasActualCloseDate: false,
        nextStep: '',
        salesStage: '',
        probability: '',
        description: '',
        attachments: [],
        comment: ''
    });
    // Set client flag after mount to prevent hydration issues
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsClient(true);
    }, []);
    // Helper function to map API response to frontend Lead type
    function mapLead(data) {
        const latestComment = data.comments?.sort((a, b)=>new Date(b.commented_on).getTime() - new Date(a.commented_on).getTime())[0];
        return {
            leadId: data.crm_enquiry_id,
            crm_enquiry_number: data.crm_enquiry_number,
            opportunityName: data.crm_opportunity_name,
            contactName: data.crm_contact_name,
            type: data.crm_type,
            leadSource: data.crm_lead_source,
            assignedToName: data.assignedToName,
            assignedTo: data.crm_assigned_to,
            campaignSource: data.crm_campaign_source,
            weightedRevenue: data.crm_weighted_revenue,
            organizationName: data.crm_organization_name,
            amount: data.crm_amount,
            expectedCloseDate: data.crm_expected_close_date,
            actualCloseDate: data.crm_close_date,
            nextStep: data.crm_next_step,
            salesStage: data.crm_sales_stage,
            probability: data.crm_probability,
            description: data.crm_description,
            attachments: data.attachments,
            comments: data.comments,
            products: data.products,
            employee: data.employee,
            // 👇 Add this line to pre-fill the textarea
            comment: latestComment?.comment_text || ''
        };
    }
    // Convert API products to EnquiryProduct format, enriching from availableProducts
    function convertToEnquiryProducts(products, availableProducts) {
        return products.map((product, index)=>{
            const match = availableProducts.find((p)=>p.crmtf_product_id === product.crmtf_product_id);
            return {
                id: `existing-${index}`,
                crmtf_product_id: product.crmtf_product_id,
                product_name: match?.crmtf_product_name || product.crmtf_product_name,
                product_code: match?.crmtf_product_code || product.crmtf_product_code || '',
                product_type: match?.crmtf_product_type || product.crmtf_product_type || '',
                product_model_number: match?.crmtf_product_model_number || product.crmtf_product_model_number || '',
                product_uom: match?.crmtf_product_uom || product.crmtf_product_uom || '',
                crm_quantity: product.crm_quantity || 0,
                crm_price: product.crm_price || 0,
                session_flag: null
            };
        });
    }
    // Get displayed products helper - filter out deleted products
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getDisplayedProducts = (products)=>{
        return products.filter((product)=>product.session_flag !== 'D');
    };
    // Debug function to log session data (you can call this from browser console)
    const logSessionData = ()=>{
        const sessionProducts = sessionStorage.getItem(`enquiryProducts_${leadId}`);
        if (sessionProducts) {
            const products = JSON.parse(sessionProducts);
            console.log('=== SESSION PRODUCT DATA ===');
            console.log(`Total products in session: ${products.length}`);
            const categorized = products.reduce((acc, product)=>{
                const flag = product.session_flag || 'null';
                if (!acc[flag]) acc[flag] = [];
                acc[flag].push(product);
                return acc;
            }, {});
            Object.keys(categorized).forEach((flag)=>{
                console.log(`${flag} products (${categorized[flag].length}):`, categorized[flag]);
            });
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (lead) {
            // Sort comments by date descending
            const latestComment = lead.comments?.slice().sort((a, b)=>new Date(b.commented_on).getTime() - new Date(a.commented_on).getTime())[0];
            setFormData((prev)=>({
                    ...prev,
                    // Initialize comment field with latest comment text
                    comment: latestComment?.comment_text || ''
                }));
        }
    }, [
        lead
    ]);
    // Make logSessionData available globally for debugging
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    });
    // Fetch lead and support data - only run on client
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isClient) return;
        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                // Check if data exists in session storage first
                const cachedProducts = sessionStorage.getItem('availableProducts');
                const cachedEmployees = sessionStorage.getItem('employees');
                const cachedLeadData = sessionStorage.getItem(`leadData_${leadId}`);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const cachedEnquiryProducts = sessionStorage.getItem(`enquiryProducts_${leadId}`);
                let loadedAvailableProducts = [];
                let loadedEmployees = [];
                // Use cached data or fetch new data for products and employees
                if (cachedProducts && cachedEmployees) {
                    loadedAvailableProducts = JSON.parse(cachedProducts);
                    loadedEmployees = JSON.parse(cachedEmployees);
                    setAvailableProducts(loadedAvailableProducts);
                    setEmployees(loadedEmployees);
                } else {
                    // Always fetch fresh data
                    const [productsRes, employeesRes] = await Promise.all([
                        fetch('/api/products'),
                        fetch('/api/employees')
                    ]);
                    if (productsRes.ok) {
                        loadedAvailableProducts = await productsRes.json();
                        sessionStorage.setItem('availableProducts', JSON.stringify(loadedAvailableProducts));
                    }
                    setAvailableProducts(loadedAvailableProducts);
                    if (employeesRes.ok) {
                        loadedEmployees = await employeesRes.json();
                        sessionStorage.setItem('employees', JSON.stringify(loadedEmployees));
                    }
                    setEmployees(loadedEmployees);
                }
                // Handle lead data - use cached if available
                let leadData;
                if (cachedLeadData) {
                    leadData = JSON.parse(cachedLeadData);
                    console.log("Using cached lead data:", leadData);
                } else {
                    console.log("Frontend calling API with leadId:", leadId);
                    // Always fetch lead data
                    const leadRes = await fetch(`/api/leads/${leadId}/edit_old`);
                    if (!leadRes.ok) {
                        const errorData = await leadRes.json();
                        throw new Error(errorData.message || 'Lead not found.');
                    }
                    leadData = await leadRes.json();
                    sessionStorage.setItem(`leadData_${leadId}/edit_old`, JSON.stringify(leadData));
                }
                const mappedLead = mapLead(leadData);
                setLead(mappedLead);
                // Create new formData object
                const newFormData = {
                    crm_enquiry_number: mappedLead.crm_enquiry_number || '',
                    opportunityName: mappedLead.opportunityName || '',
                    contactName: mappedLead.contactName || '',
                    type: mappedLead.type || '',
                    leadSource: mappedLead.leadSource || '',
                    assignedTo: mappedLead.assignedTo?.toString() || '',
                    campaignSource: mappedLead.campaignSource || '',
                    weightedRevenue: mappedLead.weightedRevenue?.toString() || '',
                    organizationName: mappedLead.organizationName || '',
                    amount: mappedLead.amount?.toString() || '',
                    expectedCloseDate: mappedLead.expectedCloseDate ? mappedLead.expectedCloseDate.split('T')[0] : '',
                    actualCloseDate: mappedLead.actualCloseDate ? mappedLead.actualCloseDate.split('T')[0] : '',
                    hasActualCloseDate: !!mappedLead.actualCloseDate,
                    nextStep: mappedLead.nextStep || '',
                    salesStage: mappedLead.salesStage || '',
                    probability: mappedLead.probability?.toString() || '',
                    description: mappedLead.description || '',
                    attachments: [],
                    comment: ''
                };
                setFormData(newFormData);
                // Handle enquiry products - prioritize session data over API data
                let finalEnquiryProducts = [];
                if (mappedLead.products) {
                    finalEnquiryProducts = convertToEnquiryProducts(mappedLead.products, loadedAvailableProducts);
                    sessionStorage.setItem(`enquiryProducts_${leadId}`, JSON.stringify(finalEnquiryProducts));
                }
                setEnquiryProducts(finalEnquiryProducts);
                // Filter out deleted products for display (session_flag !== 'D')
                const filteredProducts = finalEnquiryProducts.filter((product)=>product.session_flag !== 'D');
                setDisplayedProducts(filteredProducts);
                console.log(`Displaying ${filteredProducts.length} products (filtered out deleted)`);
            } catch (err) {
                setError(err.message || 'An unexpected error occurred while loading data.');
            } finally{
                setLoading(false);
            }
        }
        fetchData();
    }, [
        leadId,
        isClient
    ]); // Depend on both leadId and isClient
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   if (e.target.files) {
    //     setFormData({ ...formData, attachments: Array.from(e.target.files) });
    //   }
    // };
    // Move these handler functions OUTSIDE of the ProductModal component
    // and place them in the main LeadEditPage component, after the state declarations
    // Handler for deleting existing attachments
    // Updated handler for deleting existing attachments
    // Add this enhanced debugging to your handleDeleteExistingAttachment function
    // Enhanced handleDeleteExistingAttachment with better debugging
    const handleDeleteExistingAttachment = (indexToRemove)=>{
        console.log('🗑️ === STARTING ATTACHMENT DELETION ===');
        console.log('Index to remove:', indexToRemove);
        console.log('Current attachments:', lead?.attachments);
        console.log('Current deletedAttachmentIds before:', deletedAttachmentIds);
        if (lead?.attachments) {
            const attachmentToDelete = lead.attachments[indexToRemove];
            console.log('Attachment to delete:', attachmentToDelete);
            // Only add to deleted list if it has an ID (exists in database)
            if (attachmentToDelete.crm_attachment_id) {
                console.log('✅ Adding to deletion list:', attachmentToDelete.crm_attachment_id);
                // Update the deletedAttachmentIds state
                setDeletedAttachmentIds((prev)=>{
                    const newList = [
                        ...prev,
                        attachmentToDelete.crm_attachment_id
                    ];
                    console.log('📝 Updated deletion list:', newList);
                    return newList;
                });
                console.log('✅ Marked attachment for deletion:', {
                    id: attachmentToDelete.crm_attachment_id,
                    name: attachmentToDelete.file_name
                });
            } else {
                console.warn('⚠️ Attachment has no crm_attachment_id, cannot mark for deletion:', attachmentToDelete);
            }
            // Remove from display immediately
            const updatedAttachments = lead.attachments.filter((_, index)=>index !== indexToRemove);
            console.log('📋 Updated attachments list (for display):', updatedAttachments);
            setLead((prev)=>{
                if (!prev) return null;
                const newLead = {
                    ...prev,
                    attachments: updatedAttachments
                };
                console.log('💾 Updated lead state with new attachments');
                return newLead;
            });
            console.log('✅ Attachment removal from UI completed');
        } else {
            console.warn('⚠️ No attachments found in lead object');
        }
        console.log('🗑️ === ATTACHMENT DELETION FINISHED ===');
        // Add a small delay to check the state update
        setTimeout(()=>{
            console.log('🔍 Checking state after 100ms:');
            console.log('deletedAttachmentIds after state update:', deletedAttachmentIds);
        }, 100);
    };
    // Handler for deleting new attachments (before upload)
    const handleDeleteNewAttachment = (indexToRemove)=>{
        setFormData((prev)=>({
                ...prev,
                attachments: prev.attachments.filter((_, index)=>index !== indexToRemove)
            }));
    };
    // Update the existing handleFileChange function
    const handleFileChange = (e)=>{
        if (e.target.files) {
            const fileArray = Array.from(e.target.files);
            setFormData((prev)=>({
                    ...prev,
                    attachments: [
                        ...prev.attachments,
                        ...fileArray
                    ]
                }));
        }
    };
    const handleAddProduct = ()=>{
        setEditingProductIndex(null);
        setIsProductModalOpen(true);
    };
    const handleEditProduct = (displayIndex)=>{
        const productToEdit = displayedProducts[displayIndex];
        const actualIndex = enquiryProducts.findIndex((p)=>p.id === productToEdit.id);
        setEditingProductIndex(actualIndex);
        setIsProductModalOpen(true);
    };
    const handleSaveProduct = (product)=>{
        // const leadId = router.query.leadId; // ✅ Add this line to fix the error
        let updatedProducts;
        if (editingProductIndex !== null) {
            // Editing existing product
            updatedProducts = [
                ...enquiryProducts
            ];
            updatedProducts[editingProductIndex] = {
                ...product,
                session_flag: updatedProducts[editingProductIndex].session_flag === null ? 'E' : updatedProducts[editingProductIndex].session_flag
            };
        } else {
            // Adding new product
            const newProduct = {
                ...product,
                session_flag: 'A'
            };
            updatedProducts = [
                ...enquiryProducts,
                newProduct
            ];
        }
        setEnquiryProducts(updatedProducts);
        // Filter and set displayed products (exclude deleted ones)
        const filteredProducts = updatedProducts.filter((p)=>p.session_flag !== 'D');
        setDisplayedProducts(filteredProducts);
        console.log('💾 Saving product:', product);
        console.log('🛠️ Editing index:', editingProductIndex);
        console.log('📋 Updated product list:', updatedProducts);
        console.log('🧮 Displayed products count:', filteredProducts.length);
        // Update session storage
        sessionStorage.setItem(`enquiryProducts_${leadId}`, JSON.stringify(updatedProducts));
        sessionStorage.setItem(`enquiryProducts_lastUpdated_${leadId}`, new Date().toISOString());
        console.log(`Updated session: ${updatedProducts.length} total products, ${filteredProducts.length} displayed`);
    };
    const handleProductChange = (index, field, value)=>{
        const actualIndex = enquiryProducts.findIndex((p)=>p.id === displayedProducts[index].id);
        const updatedProducts = [
            ...enquiryProducts
        ];
        updatedProducts[actualIndex] = {
            ...updatedProducts[actualIndex],
            [field]: value,
            session_flag: updatedProducts[actualIndex].session_flag === null ? 'E' : updatedProducts[actualIndex].session_flag
        };
        setEnquiryProducts(updatedProducts);
        console.log(`✏️ Changing product [${index}] field "${field}" to`, value);
        console.log('📦 Updated product object:', updatedProducts[actualIndex]);
        // Filter and set displayed products (exclude deleted ones)
        const filteredProducts = updatedProducts.filter((p)=>p.session_flag !== 'D');
        setDisplayedProducts(filteredProducts);
        // Update session storage
        sessionStorage.setItem(`enquiryProducts_${leadId}`, JSON.stringify(updatedProducts));
        sessionStorage.setItem(`enquiryProducts_lastUpdated_${leadId}`, new Date().toISOString());
    };
    const handleRemoveProduct = (id)=>{
        const updatedProducts = enquiryProducts.map((product)=>product.id === id ? {
                ...product,
                session_flag: 'D'
            } : product);
        setEnquiryProducts(updatedProducts);
        // Filter and set displayed products (exclude deleted ones)
        const filteredProducts = updatedProducts.filter((p)=>p.session_flag !== 'D');
        setDisplayedProducts(filteredProducts);
        // Update session storage
        sessionStorage.setItem(`enquiryProducts_${leadId}`, JSON.stringify(updatedProducts));
        sessionStorage.setItem(`enquiryProducts_lastUpdated_${leadId}`, new Date().toISOString());
        console.log(`Marked product ${id} as deleted. ${filteredProducts.length} products remaining`);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!requireAuth()) return;
        setIsClient(true);
    }, [
        requireAuth
    ]);
    // Fixed handleSubmit function in your LeadEditPage component
    // Complete fixed handleSubmit function - remove the old payload declaration completely
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setSaving(true);
        setError(null);
        // Debug: Log session data BEFORE starting submission
        console.log('=== BEFORE SUBMISSION ===');
        console.log('Current enquiryProducts state:', enquiryProducts);
        console.log('Deleted attachment IDs:', deletedAttachmentIds);
        // Declare variables outside try block to fix scope issues
        let productsToAdd = [];
        let productsToEdit = [];
        let productsToDelete = [];
        let unchangedProducts = [];
        try {
            // Create FormData payload
            const payload = new FormData();
            // Add form fields to payload
            Object.entries(formData).forEach(([key, value])=>{
                if (key !== 'attachments') {
                    // Handle actualCloseDate based on checkbox state
                    if (key === 'actualCloseDate') {
                        if (formData.hasActualCloseDate && typeof value === 'string' && value.trim() !== '') {
                            payload.append(key, value);
                        } else {
                            // FIXED: Always append the field, but with empty string when disabled
                            payload.append(key, ''); // Backend will convert empty string to null
                        }
                    } else if (key !== 'hasActualCloseDate') {
                        payload.append(key, value);
                    }
                }
            });
            if (employee?.employee_id) {
                payload.append('modified_by', employee.employee_id.toString());
            }
            // Add new file attachments
            formData.attachments.forEach((file)=>{
                payload.append('attachments', file);
            });
            // Add deleted attachment IDs to payload
            if (deletedAttachmentIds.length > 0) {
                payload.append('deletedAttachmentIds', JSON.stringify(deletedAttachmentIds));
                console.log('Sending deleted attachment IDs:', deletedAttachmentIds);
            }
            // Process products based on session_flag
            const sessionProducts = enquiryProducts;
            // Separate products by their session_flag
            productsToAdd = sessionProducts.filter((p)=>p.session_flag === 'A');
            productsToEdit = sessionProducts.filter((p)=>p.session_flag === 'E');
            productsToDelete = sessionProducts.filter((p)=>p.session_flag === 'D');
            unchangedProducts = sessionProducts.filter((p)=>p.session_flag === null);
            // Create the payload for different operations
            const productOperations = {
                add: productsToAdd,
                edit: productsToEdit,
                delete: productsToDelete,
                unchanged: unchangedProducts
            };
            console.log('Product operations to send:', {
                toAdd: productsToAdd.length,
                toEdit: productsToEdit.length,
                toDelete: productsToDelete.length,
                unchanged: unchangedProducts.length
            });
            payload.append('productOperations', JSON.stringify(productOperations));
            // Debug payload contents
            console.log('=== FINAL PAYLOAD CHECK ===');
            for (const [key, value] of payload.entries()){
                if (key === 'deletedAttachmentIds') {
                    console.log(`${key}:`, value);
                }
            }
            console.log('Making API call to:', `/api/leads/${leadId}/edit_old`);
            const response = await fetch(`/api/leads/${leadId}/edit_old`, {
                method: 'PUT',
                body: payload
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.log('API Error:', errorData);
                alert(`Failed to update lead: ${errorData.error}`);
                return;
            }
            console.log('Processing response data...');
            const responseData = await response.json();
            console.log('Update response:', responseData);
            // Show success message
            alert('Lead updated successfully!');
            // Clear session storage only after confirmed success
            try {
                sessionStorage.removeItem(`enquiryProducts_${leadId}`);
                sessionStorage.removeItem(`enquiryProducts_lastUpdated_${leadId}`);
                sessionStorage.removeItem(`leadData_${leadId}`);
                console.log('✅ Session storage cleared successfully');
            } catch (storageError) {
                console.warn('❌ Error clearing session storage:', storageError);
            }
            // Navigate back to lead details
            setTimeout(()=>{
                router.push(`/leads/${leadId}`);
            }, 100);
        } catch (error) {
            console.error('❌ SUBMIT ERROR:', error);
            setError('An error occurred while updating the lead. Your changes have been preserved.');
            alert('An error occurred while updating the lead. Please try again.');
        } finally{
            setSaving(false);
        }
    };
    const handleCancel = ()=>{
        router.push(`/leads/${leadId}`);
    };
    // Show loading state while client is initializing or data is loading
    if (!isClient || loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-8 text-center text-lg",
            children: "Loading lead details..."
        }, void 0, false, {
            fileName: "[project]/app/enquiry/edit/page.tsx",
            lineNumber: 954,
            columnNumber: 12
        }, this);
    }
    if (error) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-8 text-center text-red-600 text-lg",
        children: [
            "Error: ",
            error
        ]
    }, void 0, true, {
        fileName: "[project]/app/enquiry/edit/page.tsx",
        lineNumber: 957,
        columnNumber: 21
    }, this);
    if (!lead) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-8 text-center text-gray-600 text-lg",
        children: "Lead not found."
    }, void 0, false, {
        fileName: "[project]/app/enquiry/edit/page.tsx",
        lineNumber: 958,
        columnNumber: 21
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 ml-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/leads/leadlist",
                            className: "text-blue-600 hover:underline",
                            children: "All"
                        }, void 0, false, {
                            fileName: "[project]/app/enquiry/edit/page.tsx",
                            lineNumber: 965,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "mx-2 text-gray-500",
                            children: "→"
                        }, void 0, false, {
                            fileName: "[project]/app/enquiry/edit/page.tsx",
                            lineNumber: 969,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-gray-700",
                            children: "Edit"
                        }, void 0, false, {
                            fileName: "[project]/app/enquiry/edit/page.tsx",
                            lineNumber: 970,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/enquiry/edit/page.tsx",
                    lineNumber: 964,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/enquiry/edit/page.tsx",
                lineNumber: 963,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-4xl mx-auto text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold",
                                children: [
                                    "Edit Enquiry: ",
                                    lead.opportunityName
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                lineNumber: 976,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm",
                                onClick: ()=>router.push(`/leads/leadlist`),
                                children: "Back to List"
                            }, void 0, false, {
                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                lineNumber: 977,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/enquiry/edit/page.tsx",
                        lineNumber: 975,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit,
                        className: "space-y-4",
                        encType: "multipart/form-data",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InlineField, {
                                        label: "Enquiry Number",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            name: "crm_enquiry_number",
                                            value: formData.crm_enquiry_number,
                                            readOnly: true,
                                            className: "w-full border rounded p-1 min-w-0 text-sm bg-gray-100 cursor-not-allowed"
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 989,
                                            columnNumber: 13
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 988,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InlineField, {
                                        label: "Enquiry Name",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            name: "opportunityName",
                                            value: formData.opportunityName,
                                            onChange: handleChange,
                                            className: "w-full border rounded p-1 min-w-0 text-sm",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 998,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 997,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InlineField, {
                                        label: "Contact Name",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            name: "contactName",
                                            value: formData.contactName,
                                            onChange: handleChange,
                                            className: "w-full border rounded p-1 min-w-0 text-sm",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 1009,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1008,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                lineNumber: 987,
                                columnNumber: 10
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InlineField, {
                                        label: "Type",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            name: "type",
                                            value: formData.type,
                                            onChange: handleChange,
                                            className: "w-full border rounded p-1 min-w-0 text-sm",
                                            required: true,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "-- Select Type --"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1029,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "New Business",
                                                    children: "New Business"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1030,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Existing Business",
                                                    children: "Existing Business"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1031,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 1023,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1022,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InlineField, {
                                        label: "Lead Source",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            name: "leadSource",
                                            value: formData.leadSource,
                                            onChange: handleChange,
                                            className: "w-full border rounded p-1 min-w-0 text-sm",
                                            required: true,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "-- Select Source --"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1042,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Cold Call",
                                                    children: "Cold Call"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1043,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Existing Customer",
                                                    children: "Existing Customer"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1044,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Self Generated",
                                                    children: "Self Generated"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1045,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Employee",
                                                    children: "Employee"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1046,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Partner",
                                                    children: "Partner"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1047,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Public Relations",
                                                    children: "Public Relations"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1048,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Direct Mail",
                                                    children: "Direct Mail"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1049,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Conference",
                                                    children: "Conference"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1050,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Trade Show",
                                                    children: "Trade Show"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1051,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Web Site",
                                                    children: "Web Site"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1052,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Word Of Mouth",
                                                    children: "Word Of Mouth"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1053,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Other",
                                                    children: "Other"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1054,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 1036,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1035,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                lineNumber: 1021,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InlineField, {
                                        label: "Assigned To",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            name: "assignedTo",
                                            value: formData.assignedTo,
                                            onChange: handleChange,
                                            className: "w-full border rounded p-1 min-w-0 text-sm",
                                            required: true,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "-- Select Employee --"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1068,
                                                    columnNumber: 17
                                                }, this),
                                                employees.map((emp)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: emp.employee_id,
                                                        children: [
                                                            emp.employee_first_name,
                                                            " ",
                                                            emp.employee_last_name
                                                        ]
                                                    }, emp.employee_id, true, {
                                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                                        lineNumber: 1070,
                                                        columnNumber: 19
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 1062,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1061,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InlineField, {
                                        label: "Campaign Source",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            name: "campaignSource",
                                            value: formData.campaignSource,
                                            onChange: handleChange,
                                            className: "w-full border rounded p-1 min-w-0 text-sm",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 1078,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1077,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                lineNumber: 1060,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InlineField, {
                                        label: "Weighted Revenue",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            name: "weightedRevenue",
                                            value: formData.weightedRevenue,
                                            onChange: handleChange,
                                            className: "w-full border rounded p-1 min-w-0 text-sm",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 1091,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1090,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InlineField, {
                                        label: "Organization Name",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            name: "organizationName",
                                            value: formData.organizationName,
                                            onChange: handleChange,
                                            className: "w-full border rounded p-1 min-w-0 text-sm",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 1101,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1100,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                lineNumber: 1089,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InlineField, {
                                        label: "Amount",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            name: "amount",
                                            value: formData.amount,
                                            onChange: handleChange,
                                            className: "w-full border rounded p-1 min-w-0 text-sm",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 1114,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1113,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InlineField, {
                                        label: "Expected Close Date",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            name: "expectedCloseDate",
                                            value: formData.expectedCloseDate,
                                            onChange: handleChange,
                                            className: "w-full border rounded p-1 min-w-0 text-sm",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 1124,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1123,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InlineField, {
                                        label: "Actual Close Date",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    id: "hasActualCloseDate",
                                                    checked: formData.hasActualCloseDate,
                                                    onChange: (e)=>setFormData((prev)=>({
                                                                ...prev,
                                                                hasActualCloseDate: e.target.checked,
                                                                actualCloseDate: e.target.checked ? prev.actualCloseDate : ''
                                                            })),
                                                    className: "rounded"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1135,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "date",
                                                    name: "actualCloseDate",
                                                    value: formData.actualCloseDate,
                                                    onChange: handleChange,
                                                    disabled: !formData.hasActualCloseDate,
                                                    className: `flex-1 border rounded p-1 min-w-0 text-sm ${!formData.hasActualCloseDate ? 'bg-gray-100 cursor-not-allowed text-gray-400' : ''}`
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1148,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 1134,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1133,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                lineNumber: 1112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InlineField, {
                                        label: "Next Step",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            name: "nextStep",
                                            value: formData.nextStep,
                                            onChange: handleChange,
                                            className: "w-full border rounded p-1 min-w-0 text-sm",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 1167,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1166,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InlineField, {
                                        label: "Sales Stage",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            name: "salesStage",
                                            value: formData.salesStage,
                                            onChange: handleChange,
                                            className: "w-full border rounded p-1 min-w-0 text-sm",
                                            required: true,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "-- Select Stage --"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1183,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Prospecting",
                                                    children: "Prospecting"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1184,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Qualification",
                                                    children: "Qualification"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1185,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Needs Analysis",
                                                    children: "Needs Analysis"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1186,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Proposal",
                                                    children: "Proposal or Price Quote"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1187,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Revised Quote",
                                                    children: "Revised Quote"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1188,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Sales Order",
                                                    children: "Sales Order(Client Purchase)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1189,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Invoice",
                                                    children: "Invoice"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1190,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Payment Due",
                                                    children: "Payment Due"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1191,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Closed Won",
                                                    children: "Closed Won"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1192,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Closed Lost",
                                                    children: "Closed Lost"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1193,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 1177,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1176,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                lineNumber: 1165,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InlineField, {
                                        label: "Probability (%)",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            name: "probability",
                                            value: formData.probability,
                                            onChange: handleChange,
                                            className: "w-full border rounded p-1 min-w-0 text-sm",
                                            required: true,
                                            min: "0",
                                            max: "100"
                                        }, void 0, false, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 1201,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1200,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1211,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                lineNumber: 1199,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block font-medium mb-1",
                                        children: "Description"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1216,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        name: "description",
                                        value: formData.description,
                                        onChange: handleChange,
                                        className: "w-full border rounded p-1 h-20 resize-none",
                                        placeholder: "Enter additional details about the lead...",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1217,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block font-medium",
                                        children: "Comments"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1225,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        name: "comment",
                                        value: formData.comment,
                                        onChange: handleChange,
                                        className: "w-full border rounded p-1 h-20 resize-none",
                                        required: true,
                                        placeholder: "Enter your comment..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1226,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                lineNumber: 1215,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block font-medium mb-1",
                                        children: "Add Attachments"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1239,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "file",
                                        multiple: true,
                                        onChange: handleFileChange,
                                        className: "border rounded p-1 text-sm w-full"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1242,
                                        columnNumber: 13
                                    }, this),
                                    lead.attachments && lead.attachments.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "text-sm text-gray-700 space-y-1 mt-2",
                                        children: lead.attachments.map((attachment, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-center justify-between border p-2 rounded",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: attachment.file_path,
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        className: "text-blue-600 hover:underline",
                                                        children: attachment.file_name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                                        lineNumber: 1254,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>{
                                                            if (window.confirm("Are you sure you want to remove this attachment?")) {
                                                                handleDeleteExistingAttachment(idx);
                                                            }
                                                        },
                                                        className: "bg-red-500 text-white p-1 rounded hover:bg-red-600",
                                                        title: "Remove",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                                            lineNumber: 1272,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                                        lineNumber: 1262,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, `existing-${idx}`, true, {
                                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                                lineNumber: 1253,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1251,
                                        columnNumber: 15
                                    }, this),
                                    formData.attachments.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "text-sm text-gray-700 space-y-1 mt-2",
                                        children: formData.attachments.map((file, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-center justify-between border p-2 rounded",
                                                children: [
                                                    file.name,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>{
                                                            if (window.confirm("Are you sure you want to remove this new file?")) {
                                                                handleDeleteNewAttachment(idx);
                                                            }
                                                        },
                                                        className: "bg-red-500 text-white p-1 rounded hover:bg-red-600",
                                                        title: "Remove",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                                            lineNumber: 1295,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                                        lineNumber: 1285,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, `new-${idx}`, true, {
                                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                                lineNumber: 1283,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1281,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                lineNumber: 1238,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: handleAddProduct,
                                    className: "bg-green-600 text-white px-2 py-2 rounded hover:bg-green-700 text-sm",
                                    children: "+ Add Product"
                                }, void 0, false, {
                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                    lineNumber: 1307,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                lineNumber: 1306,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-medium mb-2",
                                        children: "Product List"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1318,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-x-auto",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "w-full border-collapse border border-gray-300 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "bg-gray-100",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "border border-gray-300 p-2 text-left",
                                                                children: "Product Name"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                lineNumber: 1323,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "border border-gray-300 p-2 text-left",
                                                                children: "Code"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                lineNumber: 1324,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "border border-gray-300 p-2 text-left",
                                                                children: "Type"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                lineNumber: 1325,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "border border-gray-300 p-2 text-left",
                                                                children: "Model"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                lineNumber: 1326,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "border border-gray-300 p-2 text-left",
                                                                children: "UOM"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                lineNumber: 1327,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "border border-gray-300 p-2 text-left",
                                                                children: "Quantity"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                lineNumber: 1328,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "border border-gray-300 p-2 text-left",
                                                                children: "Price"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                lineNumber: 1329,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "border border-gray-300 p-2 text-left",
                                                                children: "Total"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                lineNumber: 1330,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "border border-gray-300 p-2 text-left",
                                                                children: "Action"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                lineNumber: 1331,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                                        lineNumber: 1322,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1321,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    children: displayedProducts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            colSpan: 9,
                                                            className: "border border-gray-300 p-2 text-center text-gray-500",
                                                            children: "No products added yet."
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                                            lineNumber: 1337,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                                        lineNumber: 1336,
                                                        columnNumber: 21
                                                    }, this) : displayedProducts.map((product, index)=>{
                                                        // fallback enrichment per row
                                                        const baseProduct = availableProducts.find((p)=>p.crmtf_product_id === product.crmtf_product_id);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "border border-gray-300 p-2",
                                                                    children: product.product_name || baseProduct?.crmtf_product_name || ''
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                    lineNumber: 1349,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "border border-gray-300 p-2",
                                                                    children: product.product_code || baseProduct?.crmtf_product_code || ''
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                    lineNumber: 1352,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "border border-gray-300 p-2",
                                                                    children: product.product_type || baseProduct?.crmtf_product_type || ''
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                    lineNumber: 1355,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "border border-gray-300 p-2",
                                                                    children: product.product_model_number || baseProduct?.crmtf_product_model_number || ''
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                    lineNumber: 1358,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "border border-gray-300 p-2",
                                                                    children: product.product_uom || baseProduct?.crmtf_product_uom || ''
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                    lineNumber: 1361,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "border border-gray-300 p-2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        value: product.crm_quantity ?? '',
                                                                        min: "0",
                                                                        onChange: (e)=>handleProductChange(index, 'crm_quantity', parseInt(e.target.value, 10) || 0),
                                                                        className: "w-20 border rounded p-1 text-sm"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                        lineNumber: 1365,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                    lineNumber: 1364,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "border border-gray-300 p-2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        step: "0.01",
                                                                        value: product.crm_price ?? '',
                                                                        onChange: (e)=>handleProductChange(index, 'crm_price', parseFloat(e.target.value) || 0),
                                                                        className: "w-24 border rounded p-1 text-sm"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                        lineNumber: 1380,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                    lineNumber: 1379,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "border border-gray-300 p-2 text-right font-medium",
                                                                    children: [
                                                                        "Rs ",
                                                                        (product.crm_quantity * product.crm_price).toFixed(2)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                    lineNumber: 1394,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "border border-gray-300 p-2 flex gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            onClick: ()=>handleEditProduct(index),
                                                                            className: "flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium px-2 py-1 rounded hover:bg-blue-50",
                                                                            title: "Edit",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$PencilIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PencilIcon$3e$__["PencilIcon"], {
                                                                                className: "h-4 w-4 mr-1"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                                lineNumber: 1404,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                            lineNumber: 1398,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            onClick: ()=>{
                                                                                if (window.confirm("Are you sure you want to remove this product?")) {
                                                                                    handleRemoveProduct(product.id);
                                                                                }
                                                                            },
                                                                            className: "bg-red-500 text-white p-1 rounded hover:bg-red-600",
                                                                            title: "Remove",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                                size: 16
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                                lineNumber: 1416,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                            lineNumber: 1406,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                                    lineNumber: 1397,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, product.id, true, {
                                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                                            lineNumber: 1348,
                                                            columnNumber: 25
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                                    lineNumber: 1334,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/enquiry/edit/page.tsx",
                                            lineNumber: 1320,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1319,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                lineNumber: 1317,
                                columnNumber: 11
                            }, this),
                            lead.comments && lead.comments.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block font-medium",
                                        children: "Previous Comments"
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1431,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full space-y-2",
                                        children: lead.comments.map((comment, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border-l-4 border-blue-500 pl-3 py-1 bg-blue-50 rounded-r text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-800",
                                                        children: comment.comment_text
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                                        lineNumber: 1435,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-600 mt-1",
                                                        children: [
                                                            "— ",
                                                            comment.commented_by_name,
                                                            " on ",
                                                            new Date(comment.commented_on).toLocaleString()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                                        lineNumber: 1436,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                                lineNumber: 1434,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1432,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                lineNumber: 1430,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "fixed bottom-6 left-[240px] right-0 z-5",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-4 py-3",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 justify-center max-w-5xl mx-auto",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                disabled: saving,
                                                className: "bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition text-sm font-medium disabled:bg-blue-400 disabled:cursor-not-allowed",
                                                children: saving ? 'Updating...' : 'Update'
                                            }, void 0, false, {
                                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                                lineNumber: 1448,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition text-sm font-medium",
                                                onClick: handleCancel,
                                                children: "Cancel"
                                            }, void 0, false, {
                                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                                lineNumber: 1455,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/enquiry/edit/page.tsx",
                                        lineNumber: 1447,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/enquiry/edit/page.tsx",
                                    lineNumber: 1446,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/enquiry/edit/page.tsx",
                                lineNumber: 1445,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/enquiry/edit/page.tsx",
                        lineNumber: 986,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/enquiry/edit/page.tsx",
                lineNumber: 974,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductModal, {
                isOpen: isProductModalOpen,
                onClose: ()=>setIsProductModalOpen(false),
                onSave: handleSaveProduct,
                products: availableProducts,
                editingProduct: editingProductIndex !== null ? enquiryProducts[editingProductIndex] : null
            }, void 0, false, {
                fileName: "[project]/app/enquiry/edit/page.tsx",
                lineNumber: 1469,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/enquiry/edit/page.tsx",
        lineNumber: 961,
        columnNumber: 5
    }, this);
}
}),

};

//# sourceMappingURL=app_8608f5f5._.js.map