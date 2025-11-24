import express, { Express } from "express";
import dotenv from "dotenv";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import { loginRouter } from "./routes/LoginRouters";
import { appLoginRouter } from "./routes/AppLoginRouters";
import { rolesRouter } from "./routes/RolesRouters";
import { dropdownRouter } from "./routes/DropdownRouters";
import { organizationsRouter } from "./routes/OrganizationsRouters";

import { routeTypesRouter } from "./routes/RouteTypesRouters";
import { routeMasterRouter } from "./routes/RouteMasterRouters";
import { routeStopsRouter } from "./routes/RouteStopsRouters";

import { statesRouter } from "./routes/StatesRouters";
import { districtRouter } from "./routes/DistrictRouters";
import { talukasRouter } from "./routes/TalukasRouters";

import { rateMasterRouter } from "./routes/RateMasterRouters";
import { rateAppliedRouter } from "./routes/RateAppliedRouters";

import { milkCollectionsRouter } from "./routes/MilkCollectionsRouters";
import { milkCollectionDetailsRouter } from "./routes/MilkCollectionDetailsRouters";
import { milkDispatchRouter } from "./routes/MilkDispatchRouters";

import { entityRouter } from "./routes/EntityRouters";
import { permissionsRouter } from "./routes/PermissionsRouters";
import { roleHasPermissionsRouter } from "./routes/RoleHasPermissionsRouters";
import { transportersRouter } from "./routes/TransportersRouter";
import { vehiclesRouter } from "./routes/VehiclesRouter"
import { userRouter } from "./routes/UserRouter";
import { contractsRouter } from "./routes/ContractRouters";
import { financialYearRouter } from "./routes/FinancialYearRouters";
import { cycleMasterRouter } from "./routes/BillingCycleMasterRouters";
import { incentiveRouter } from "./routes/IncentiveMasterRouters";
import { slabRouter } from "./routes/IncentiveSlabsRouter";
import { bankRouter } from "./routes/BankRouters";
import { bankBranchRouter } from "./routes/BankBranchRouters";

import { productCategoryRouter } from "./routes/ProductCategoryRouter";
import { productMasterRouter } from "./routes/ProductMasterRouters";
import { productPurchaseQtyRouter } from "./routes/ProductPurchaseQtyRouters";
import { productSupplyRouter } from "./routes/ProductSupplyRouters";
import { productSupplyIndentRouter } from "./routes/ProductSupplyIndent";

import { weighBridgeRouter } from "./routes/WeighBridgeRouters";
import { compositeSampleTestControllerRouter } from "./routes/CompositeSampleTestRouters";

import { dashboardRouter } from "./routes/DashboardRouters";
import { nonPaginationRouter } from "./routes/NonPaginationRouters";
import { manualEntryRouter } from "./routes/ManualEntryRouter";
import { autoWeighBridgeRouter } from "./routes/AutoWeighbridgeRouter";
import { allowManualEntryRouter } from "./routes/AllowManualEntry";

import { indentProductsRouter } from "./routes/IndentProductsRouters";
import { indentProductsApproveRouter } from "./routes/IndentProductsApproveRouter";
import { weighBridgeDataRouter } from "./routes/WeighbridgeDataRouter";
import { getDcNumbers } from "./routes/GetDCNumbersRouter";
import { productSalesToAgentRouter } from "./routes/ProductSalesToAgentRouter";
import { productSoldToAgentRouter } from "./routes/ProductsSoldToAgentRouter";
import { inwardTransportationRouter } from "./routes/InwardTransportationRouter";
import { complaintsRouter } from "./routes/ComplaintRouters";
import { farmerRouter } from "./routes/AllFarmersRouter";
import { productStockRouter } from "./routes/ProductStockRouters";
import { farmerMilkCollectionsRouter } from "./routes/FarmerMilkCollectionsRouters";
import { farmerMilkCollectionDetailsRouter } from "./routes/FarmerMilkCollectionDetailsRouters";
import { productSoldTofarmerRouter } from "./routes/ProductsSoldToFarmerRouter";
import { productSalesToFarmerRouter } from "./routes/ProductSalesToFarmerRouter";
import { nonAgentsRouter } from "./routes/NonAgentsRouter";
import { productSoldToNonAgentsRouter } from "./routes/ProductsSoldToNonAgentsRouter";
import { productSalesToNonAgentsRouter } from "./routes/ProductSalesToNonAgentsRouter";
import { collectionEntryRouter } from "./routes/CollectionEntryRouter";

const path = require('path');

const cors = require('cors');

const app: Express = express();
dotenv.config();

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

const specs = swaggerJsdoc(swaggerOptions);

//integrate static react build in node
const buildPath = path.join(__dirname, 'build');

app.use(express.static(buildPath));

// Serve the index.html for all routes
app.get(/^\/(?!api).*/, function (req, res) {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

app.use(cors({
  origin: ['http://localhost:7000', 'http://localhost:4000', 'https://localhost:4000', 'http://202.149.207.58:4000', 'http://202.149.207.58']
}));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
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
  })
);


app.use(express.json());

app.use("/api/v1/login", loginRouter);
app.use("/api/v1/app_login", appLoginRouter);
app.use("/api/v1/roles", rolesRouter);
app.use("/api/v1/dropdown", dropdownRouter);
app.use("/api/v1/entities", entityRouter);
app.use("/api/v1/permissions", permissionsRouter);
app.use("/api/v1/role_has_permissions", roleHasPermissionsRouter);
app.use("/api/v1/transporters", transportersRouter);
app.use("/api/v1/organizations", organizationsRouter);
app.use("/api/v1/all_organizations", nonPaginationRouter);
app.use("/api/v1/routes", routeTypesRouter);
app.use("/api/v1/route_master", routeMasterRouter);
app.use("/api/v1/route_stops", routeStopsRouter);
app.use("/api/v1/states", statesRouter);
app.use("/api/v1/district", districtRouter);
app.use("/api/v1/talukas", talukasRouter);
app.use("/api/v1/rate_master", rateMasterRouter);
app.use("/api/v1/rate_applied", rateAppliedRouter);
app.use("/api/v1/milk_collections", milkCollectionsRouter);
app.use("/api/v1/milk_collection_details", milkCollectionDetailsRouter);
app.use("/api/v1/milk_dispatch", milkDispatchRouter);
app.use("/api/v1/transporters/vehicles", vehiclesRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/manual_entry", manualEntryRouter);
app.use("/api/v1/transporters/contracts", contractsRouter);
app.use("/api/v1/financial_year", financialYearRouter);
app.use("/api/v1/cycle_master", cycleMasterRouter);
app.use("/api/v1/incentive_master", incentiveRouter);
app.use("/api/v1/incentive_slab", slabRouter);
app.use("/api/v1/banks", bankRouter);
app.use("/api/v1/bank/branches", bankBranchRouter);
app.use("/api/v1/product_category", productCategoryRouter);
app.use("/api/v1/product_master", productMasterRouter);
app.use("/api/v1/product_purchase", productPurchaseQtyRouter);
app.use("/api/v1/product_supply", productSupplyRouter);
app.use("/api/v1/product_supply_indent", productSupplyRouter);
app.use("/api/v1/weigh_bridge", weighBridgeRouter);
app.use("/api/v1/composite_sample", compositeSampleTestControllerRouter);
app.use("/api/v1/get_milk_details_weight", dashboardRouter);
app.use("/api/v1/weighbridge_data", autoWeighBridgeRouter);
app.use("/api/v1/allow_manual_entry", allowManualEntryRouter);
app.use("/api/v1/indent_products", indentProductsRouter);
app.use("/api/v1/indent_products_approve", indentProductsApproveRouter);
app.use("/api/v1/update_weighbridge_data", weighBridgeDataRouter);
app.use("/api/v1/get_weighbridge_data", weighBridgeDataRouter);
app.use("/api/v1/get_dc_numbers", getDcNumbers);
app.use("/api/v1/product_sales_to_agent", productSalesToAgentRouter);
app.use("/api/v1/product_sold_to_agent", productSoldToAgentRouter);
app.use("/api/v1/get_rate_chart", cycleMasterRouter);
app.use("/api/v1/get_bank_advice", cycleMasterRouter);
app.use("/api/v1/get_agent_milk_colletion", cycleMasterRouter);
app.use("/api/v1/get_agent_snf_reconcillation", cycleMasterRouter);
app.use("/api/v1/get_bmc_wise_milk_collection", cycleMasterRouter);
app.use("/api/v1/get_date_bmc_wise_milk_collection", cycleMasterRouter);
app.use("/api/v1/get_route_wise_bmc_milk_collection", cycleMasterRouter);
app.use("/api/v1/get_bmc_wise_payment", cycleMasterRouter);
app.use("/api/v1/get_payout_check_list", cycleMasterRouter);
app.use("/api/v1/get_agent_ledger", cycleMasterRouter);
app.use("/api/v1/inward_transportation", inwardTransportationRouter);
app.use("/api/v1/krishibazar_report", cycleMasterRouter);
app.use("/api/v1/complaints", complaintsRouter);
app.use("/api/v1/farmers", farmerRouter);
app.use("/api/v1/product_stock", productStockRouter);
app.use("/api/v1/farmer_milk_collections", farmerMilkCollectionsRouter);
app.use("/api/v1/farmer_milk_collection_details", farmerMilkCollectionDetailsRouter);
app.use("/api/v1/product_sold_to_farmer", productSoldTofarmerRouter);
app.use("/api/v1/product_sales_to_farmer", productSalesToFarmerRouter);
app.use("/api/v1/non-agents", nonAgentsRouter);
app.use("/api/v1/product_sold_to_nonagents", productSoldToNonAgentsRouter);
app.use("/api/v1/product_sales_to_nonagents", productSalesToNonAgentsRouter);
app.use("/api/v1/collection_entry", collectionEntryRouter);
app.use("/api/v1/inward_transportation/vehicle_attendance", inwardTransportationRouter);

console.log(process.env.PORT);
app.listen(port);