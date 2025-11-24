"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const body_parser_1 = __importDefault(require("body-parser"));
const LoginRouters_1 = require("./routes/LoginRouters");
const AppLoginRouters_1 = require("./routes/AppLoginRouters");
const RolesRouters_1 = require("./routes/RolesRouters");
const DropdownRouters_1 = require("./routes/DropdownRouters");
const OrganizationsRouters_1 = require("./routes/OrganizationsRouters");
const RouteTypesRouters_1 = require("./routes/RouteTypesRouters");
const RouteMasterRouters_1 = require("./routes/RouteMasterRouters");
const RouteStopsRouters_1 = require("./routes/RouteStopsRouters");
const StatesRouters_1 = require("./routes/StatesRouters");
const DistrictRouters_1 = require("./routes/DistrictRouters");
const TalukasRouters_1 = require("./routes/TalukasRouters");
const RateMasterRouters_1 = require("./routes/RateMasterRouters");
const RateAppliedRouters_1 = require("./routes/RateAppliedRouters");
const MilkCollectionsRouters_1 = require("./routes/MilkCollectionsRouters");
const MilkCollectionDetailsRouters_1 = require("./routes/MilkCollectionDetailsRouters");
const MilkDispatchRouters_1 = require("./routes/MilkDispatchRouters");
const EntityRouters_1 = require("./routes/EntityRouters");
const PermissionsRouters_1 = require("./routes/PermissionsRouters");
const RoleHasPermissionsRouters_1 = require("./routes/RoleHasPermissionsRouters");
const TransportersRouter_1 = require("./routes/TransportersRouter");
const VehiclesRouter_1 = require("./routes/VehiclesRouter");
const UserRouter_1 = require("./routes/UserRouter");
const ContractRouters_1 = require("./routes/ContractRouters");
const FinancialYearRouters_1 = require("./routes/FinancialYearRouters");
const BillingCycleMasterRouters_1 = require("./routes/BillingCycleMasterRouters");
const IncentiveMasterRouters_1 = require("./routes/IncentiveMasterRouters");
const IncentiveSlabsRouter_1 = require("./routes/IncentiveSlabsRouter");
const BankRouters_1 = require("./routes/BankRouters");
const BankBranchRouters_1 = require("./routes/BankBranchRouters");
const ProductCategoryRouter_1 = require("./routes/ProductCategoryRouter");
const ProductMasterRouters_1 = require("./routes/ProductMasterRouters");
const ProductPurchaseQtyRouters_1 = require("./routes/ProductPurchaseQtyRouters");
const ProductSupplyRouters_1 = require("./routes/ProductSupplyRouters");
const WeighBridgeRouters_1 = require("./routes/WeighBridgeRouters");
const CompositeSampleTestRouters_1 = require("./routes/CompositeSampleTestRouters");
const DashboardRouters_1 = require("./routes/DashboardRouters");
const NonPaginationRouters_1 = require("./routes/NonPaginationRouters");
const ManualEntryRouter_1 = require("./routes/ManualEntryRouter");
const AutoWeighbridgeRouter_1 = require("./routes/AutoWeighbridgeRouter");
const AllowManualEntry_1 = require("./routes/AllowManualEntry");
const IndentProductsRouters_1 = require("./routes/IndentProductsRouters");
const IndentProductsApproveRouter_1 = require("./routes/IndentProductsApproveRouter");
const WeighbridgeDataRouter_1 = require("./routes/WeighbridgeDataRouter");
const GetDCNumbersRouter_1 = require("./routes/GetDCNumbersRouter");
const ProductSalesToAgentRouter_1 = require("./routes/ProductSalesToAgentRouter");
const ProductsSoldToAgentRouter_1 = require("./routes/ProductsSoldToAgentRouter");
const InwardTransportationRouter_1 = require("./routes/InwardTransportationRouter");
const ComplaintRouters_1 = require("./routes/ComplaintRouters");
const AllFarmersRouter_1 = require("./routes/AllFarmersRouter");
const ProductStockRouters_1 = require("./routes/ProductStockRouters");
const FarmerMilkCollectionsRouters_1 = require("./routes/FarmerMilkCollectionsRouters");
const FarmerMilkCollectionDetailsRouters_1 = require("./routes/FarmerMilkCollectionDetailsRouters");
const ProductsSoldToFarmerRouter_1 = require("./routes/ProductsSoldToFarmerRouter");
const ProductSalesToFarmerRouter_1 = require("./routes/ProductSalesToFarmerRouter");
const NonAgentsRouter_1 = require("./routes/NonAgentsRouter");
const ProductsSoldToNonAgentsRouter_1 = require("./routes/ProductsSoldToNonAgentsRouter");
const ProductSalesToNonAgentsRouter_1 = require("./routes/ProductSalesToNonAgentsRouter");
const CollectionEntryRouter_1 = require("./routes/CollectionEntryRouter");
const path = require('path');
const cors = require('cors');
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT;
const swaggerOptions = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "GDPL-WEB-PORTAL",
            version: "0.0.1",
            description: "GDPL-WEB-PORTAL",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ["./routes/*.ts"],
};
const specs = (0, swagger_jsdoc_1.default)(swaggerOptions);
//integrate static react build in node
const buildPath = path.join(__dirname, 'build');
app.use(express_1.default.static(buildPath));
// Serve the index.html for all routes
app.get(/^\/(?!api).*/, function (req, res) {
    res.sendFile(path.join(buildPath, 'index.html'));
});
app.use(body_parser_1.default.json({ limit: "30mb" }));
app.use(body_parser_1.default.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors({
    origin: ['http://localhost:7000', 'http://localhost:4000', 'https://localhost:4000', 'http://202.149.207.58:4000', 'http://202.149.207.58']
}));
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs, {
    swaggerOptions: {
        authActions: {
            bearerAuth: {
                name: "Authorization",
                schema: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization",
                    description: "",
                },
                value: "Bearer <JWT token>",
            },
        },
    },
}));
app.use(express_1.default.json());
app.use("/api/v1/login", LoginRouters_1.loginRouter);
app.use("/api/v1/app_login", AppLoginRouters_1.appLoginRouter);
app.use("/api/v1/roles", RolesRouters_1.rolesRouter);
app.use("/api/v1/dropdown", DropdownRouters_1.dropdownRouter);
app.use("/api/v1/entities", EntityRouters_1.entityRouter);
app.use("/api/v1/permissions", PermissionsRouters_1.permissionsRouter);
app.use("/api/v1/role_has_permissions", RoleHasPermissionsRouters_1.roleHasPermissionsRouter);
app.use("/api/v1/transporters", TransportersRouter_1.transportersRouter);
app.use("/api/v1/organizations", OrganizationsRouters_1.organizationsRouter);
app.use("/api/v1/all_organizations", NonPaginationRouters_1.nonPaginationRouter);
app.use("/api/v1/routes", RouteTypesRouters_1.routeTypesRouter);
app.use("/api/v1/route_master", RouteMasterRouters_1.routeMasterRouter);
app.use("/api/v1/route_stops", RouteStopsRouters_1.routeStopsRouter);
app.use("/api/v1/states", StatesRouters_1.statesRouter);
app.use("/api/v1/district", DistrictRouters_1.districtRouter);
app.use("/api/v1/talukas", TalukasRouters_1.talukasRouter);
app.use("/api/v1/rate_master", RateMasterRouters_1.rateMasterRouter);
app.use("/api/v1/rate_applied", RateAppliedRouters_1.rateAppliedRouter);
app.use("/api/v1/milk_collections", MilkCollectionsRouters_1.milkCollectionsRouter);
app.use("/api/v1/milk_collection_details", MilkCollectionDetailsRouters_1.milkCollectionDetailsRouter);
app.use("/api/v1/milk_dispatch", MilkDispatchRouters_1.milkDispatchRouter);
app.use("/api/v1/transporters/vehicles", VehiclesRouter_1.vehiclesRouter);
app.use("/api/v1/user", UserRouter_1.userRouter);
app.use("/api/v1/manual_entry", ManualEntryRouter_1.manualEntryRouter);
app.use("/api/v1/transporters/contracts", ContractRouters_1.contractsRouter);
app.use("/api/v1/financial_year", FinancialYearRouters_1.financialYearRouter);
app.use("/api/v1/cycle_master", BillingCycleMasterRouters_1.cycleMasterRouter);
app.use("/api/v1/incentive_master", IncentiveMasterRouters_1.incentiveRouter);
app.use("/api/v1/incentive_slab", IncentiveSlabsRouter_1.slabRouter);
app.use("/api/v1/banks", BankRouters_1.bankRouter);
app.use("/api/v1/bank/branches", BankBranchRouters_1.bankBranchRouter);
app.use("/api/v1/product_category", ProductCategoryRouter_1.productCategoryRouter);
app.use("/api/v1/product_master", ProductMasterRouters_1.productMasterRouter);
app.use("/api/v1/product_purchase", ProductPurchaseQtyRouters_1.productPurchaseQtyRouter);
app.use("/api/v1/product_supply", ProductSupplyRouters_1.productSupplyRouter);
app.use("/api/v1/product_supply_indent", ProductSupplyRouters_1.productSupplyRouter);
app.use("/api/v1/weigh_bridge", WeighBridgeRouters_1.weighBridgeRouter);
app.use("/api/v1/composite_sample", CompositeSampleTestRouters_1.compositeSampleTestControllerRouter);
app.use("/api/v1/get_milk_details_weight", DashboardRouters_1.dashboardRouter);
app.use("/api/v1/weighbridge_data", AutoWeighbridgeRouter_1.autoWeighBridgeRouter);
app.use("/api/v1/allow_manual_entry", AllowManualEntry_1.allowManualEntryRouter);
app.use("/api/v1/indent_products", IndentProductsRouters_1.indentProductsRouter);
app.use("/api/v1/indent_products_approve", IndentProductsApproveRouter_1.indentProductsApproveRouter);
app.use("/api/v1/update_weighbridge_data", WeighbridgeDataRouter_1.weighBridgeDataRouter);
app.use("/api/v1/get_weighbridge_data", WeighbridgeDataRouter_1.weighBridgeDataRouter);
app.use("/api/v1/get_dc_numbers", GetDCNumbersRouter_1.getDcNumbers);
app.use("/api/v1/product_sales_to_agent", ProductSalesToAgentRouter_1.productSalesToAgentRouter);
app.use("/api/v1/product_sold_to_agent", ProductsSoldToAgentRouter_1.productSoldToAgentRouter);
app.use("/api/v1/get_rate_chart", BillingCycleMasterRouters_1.cycleMasterRouter);
app.use("/api/v1/get_bank_advice", BillingCycleMasterRouters_1.cycleMasterRouter);
app.use("/api/v1/get_agent_milk_colletion", BillingCycleMasterRouters_1.cycleMasterRouter);
app.use("/api/v1/get_agent_snf_reconcillation", BillingCycleMasterRouters_1.cycleMasterRouter);
app.use("/api/v1/get_bmc_wise_milk_collection", BillingCycleMasterRouters_1.cycleMasterRouter);
app.use("/api/v1/get_date_bmc_wise_milk_collection", BillingCycleMasterRouters_1.cycleMasterRouter);
app.use("/api/v1/get_route_wise_bmc_milk_collection", BillingCycleMasterRouters_1.cycleMasterRouter);
app.use("/api/v1/get_bmc_wise_payment", BillingCycleMasterRouters_1.cycleMasterRouter);
app.use("/api/v1/get_payout_check_list", BillingCycleMasterRouters_1.cycleMasterRouter);
app.use("/api/v1/get_agent_ledger", BillingCycleMasterRouters_1.cycleMasterRouter);
app.use("/api/v1/inward_transportation", InwardTransportationRouter_1.inwardTransportationRouter);
app.use("/api/v1/krishibazar_report", BillingCycleMasterRouters_1.cycleMasterRouter);
app.use("/api/v1/complaints", ComplaintRouters_1.complaintsRouter);
app.use("/api/v1/farmers", AllFarmersRouter_1.farmerRouter);
app.use("/api/v1/product_stock", ProductStockRouters_1.productStockRouter);
app.use("/api/v1/farmer_milk_collections", FarmerMilkCollectionsRouters_1.farmerMilkCollectionsRouter);
app.use("/api/v1/farmer_milk_collection_details", FarmerMilkCollectionDetailsRouters_1.farmerMilkCollectionDetailsRouter);
app.use("/api/v1/product_sold_to_farmer", ProductsSoldToFarmerRouter_1.productSoldTofarmerRouter);
app.use("/api/v1/product_sales_to_farmer", ProductSalesToFarmerRouter_1.productSalesToFarmerRouter);
app.use("/api/v1/non-agents", NonAgentsRouter_1.nonAgentsRouter);
app.use("/api/v1/product_sold_to_nonagents", ProductsSoldToNonAgentsRouter_1.productSoldToNonAgentsRouter);
app.use("/api/v1/product_sales_to_nonagents", ProductSalesToNonAgentsRouter_1.productSalesToNonAgentsRouter);
app.use("/api/v1/collection_entry", CollectionEntryRouter_1.collectionEntryRouter);
app.use("/api/v1/inward_transportation/vehicle_attendance", InwardTransportationRouter_1.inwardTransportationRouter);
console.log(process.env.PORT);
app.listen(port);
