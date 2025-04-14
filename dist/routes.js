"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/category/ListCategoryController");
const CreateProductController_1 = require("./controllers/product/CreateProductController");
const ListByCategoryController_1 = require("./controllers/product/ListByCategoryController");
const CreateOrderController_1 = require("./controllers/order/CreateOrderController");
const RemoveOrderController_1 = require("./controllers/order/RemoveOrderController");
const AddItemController_1 = require("./controllers/order/AddItemController");
const RemoveItemController_1 = require("./controllers/order/RemoveItemController");
const SendOrderController_1 = require("./controllers/order/SendOrderController");
const ListOrdersController_1 = require("./controllers/order/ListOrdersController");
const DetailOrderController_1 = require("./controllers/order/DetailOrderController");
const FinishOrderController_1 = require("./controllers/order/FinishOrderController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const multer_2 = __importDefault(require("./config/multer"));
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
//-- ROTAS USER --
const createUserController = new CreateUserController_1.CreateUserController();
const authUserController = new AuthUserController_1.AuthUserController();
const detailUserController = new DetailUserController_1.DetailUserController();
router.post("/users", createUserController.handle.bind(createUserController));
router.post("/session", authUserController.handle.bind(authUserController));
router.get("/me", isAuthenticated_1.isAuthenticated, detailUserController.handle.bind(detailUserController));
//-- ROTAS CATEGORY --
const createCategoryController = new CreateCategoryController_1.CreateCategoryController();
const listCategoryController = new ListCategoryController_1.ListCategoryController();
router.post("/category", isAuthenticated_1.isAuthenticated, createCategoryController.handle.bind(createCategoryController));
router.get("/category", isAuthenticated_1.isAuthenticated, listCategoryController.handle.bind(listCategoryController));
// -- ROTAS MENU --
// router.post(
//   "/product",
//   isAuthenticated,
//   upload.single("file"),
//   new CreateProductController().handle
// );
const createProductController = new CreateProductController_1.CreateProductController();
const listByCategoryController = new ListByCategoryController_1.ListByCategoryController();
router.post("/product", isAuthenticated_1.isAuthenticated, createProductController.handle.bind(createProductController));
router.get("/category/product", isAuthenticated_1.isAuthenticated, listByCategoryController.handle.bind(listByCategoryController));
//-- ROTAS ORDER --
const createOrderController = new CreateOrderController_1.CreateOrderController();
const removeOrderController = new RemoveOrderController_1.RemoveOrderController();
const addItemController = new AddItemController_1.AddItemController();
const removeItemController = new RemoveItemController_1.RemoveItemController();
const sendOrderController = new SendOrderController_1.SendOrderController();
const listOrdersController = new ListOrdersController_1.ListOrdersController();
const detailOrderController = new DetailOrderController_1.DetailOrderController();
const finishOrderController = new FinishOrderController_1.FinishOrderController();
router.post("/order", isAuthenticated_1.isAuthenticated, createOrderController.handle.bind(createOrderController));
router.delete("/order", isAuthenticated_1.isAuthenticated, removeOrderController.handle.bind(removeOrderController));
router.post("/order/add", isAuthenticated_1.isAuthenticated, addItemController.handle.bind(addItemController));
router.delete("/order/remove", isAuthenticated_1.isAuthenticated, removeItemController.handle.bind(removeItemController));
router.put("/order/send", isAuthenticated_1.isAuthenticated, sendOrderController.handle.bind(sendOrderController));
router.get("/orders", isAuthenticated_1.isAuthenticated, listOrdersController.handle.bind(listOrdersController));
router.get("/order/detail", isAuthenticated_1.isAuthenticated, detailOrderController.handle.bind(detailOrderController));
router.put("/order/finish", isAuthenticated_1.isAuthenticated, finishOrderController.handle.bind(finishOrderController));
