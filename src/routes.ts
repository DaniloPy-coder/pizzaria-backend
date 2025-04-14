import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";

import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";

import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import uploadConfig from "./config/multer";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//-- ROTAS USER --
const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const detailUserController = new DetailUserController();

router.post("/users", createUserController.handle.bind(createUserController));

router.post("/session", authUserController.handle.bind(authUserController));

router.get(
  "/me",
  isAuthenticated,
  detailUserController.handle.bind(detailUserController)
);

//-- ROTAS CATEGORY --
const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();

router.post(
  "/category",
  isAuthenticated,
  createCategoryController.handle.bind(createCategoryController)
);

router.get(
  "/category",
  isAuthenticated,
  listCategoryController.handle.bind(listCategoryController)
);

// -- ROTAS MENU --
// router.post(
//   "/product",
//   isAuthenticated,
//   upload.single("file"),
//   new CreateProductController().handle
// );
const createProductController = new CreateProductController();
const listByCategoryController = new ListByCategoryController();

router.post(
  "/product",
  isAuthenticated,
  createProductController.handle.bind(createProductController)
);

router.get(
  "/category/product",
  isAuthenticated,
  listByCategoryController.handle.bind(listByCategoryController)
);

//-- ROTAS ORDER --
const createOrderController = new CreateOrderController();
const removeOrderController = new RemoveOrderController();
const addItemController = new AddItemController();
const removeItemController = new RemoveItemController();
const sendOrderController = new SendOrderController();
const listOrdersController = new ListOrdersController();
const detailOrderController = new DetailOrderController();
const finishOrderController = new FinishOrderController();

router.post(
  "/order",
  isAuthenticated,
  createOrderController.handle.bind(createOrderController)
);
router.delete(
  "/order",
  isAuthenticated,
  removeOrderController.handle.bind(removeOrderController)
);

router.post(
  "/order/add",
  isAuthenticated,
  addItemController.handle.bind(addItemController)
);
router.delete(
  "/order/remove",
  isAuthenticated,
  removeItemController.handle.bind(removeItemController)
);

router.put(
  "/order/send",
  isAuthenticated,
  sendOrderController.handle.bind(sendOrderController)
);

router.get(
  "/orders",
  isAuthenticated,
  listOrdersController.handle.bind(listOrdersController)
);
router.get(
  "/order/detail",
  isAuthenticated,
  detailOrderController.handle.bind(detailOrderController)
);

router.put(
  "/order/finish",
  isAuthenticated,
  finishOrderController.handle.bind(finishOrderController)
);

export { router };
