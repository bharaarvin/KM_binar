const express = require("express");
const dotenv = require("dotenv");
const formidable = require("express-formidable");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();

const userController = require("./controllers/user.controller.js");
const categoryController = require("./controllers/category.controller.js");
const productController = require("./controllers/product.controller.js");
const negotiationController = require("./controllers/negotiation.controller.js");
const promoController = require("./controllers/promo.controller.js");
const wishlistController = require("./controllers/wishlist.controller.js");
const { Validate, Authorize } = require("./middleware");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(formidable());
app.use(Validate);

// Auth Routes
app.post("/login", userController.login);
app.post("/register", userController.register);
app.get("/", (req, res) => {
  res.json({ message: "Index running" });
});
app.post("/validate-auth", userController.validateAuth);

// User Routes

// Product Routes
app.post("/product", Authorize, productController.createProduct);
app.get("/product", productController.findAllProductsApi);
app.get("/product/:id", productController.findProductsByIdApi);
app.put("/product/:id", Authorize, productController.UpdateProductsApi);
app.delete("/product/:id", Authorize, productController.deleteProductsApi);
app.get("/product/category/:category", productController.findProductsByCategoryApi);

// Category Routes
app.get("/category", categoryController.findAllCategorysApi);
app.get("/category/:id", categoryController.findCategoryByIdApi);
app.post("/category", Authorize, categoryController.createCategoryApi);
app.put("/category/:id", Authorize, categoryController.updateCategoryApi);
app.delete("/category/:id", Authorize, categoryController.deleteCategoryByIdApi);

// Negotiation Routes
app.get("/negotiation", Authorize, negotiationController.findAllNegotiationsApi);
app.get("/negotiation/:id", Authorize, negotiationController.findNegotiationByIdApi);
app.post("/negotiation", Authorize, negotiationController.createNegotiationApi);
app.put("/negotiation/:id", Authorize, negotiationController.updateNegotiationApi);
app.delete("/negotiation/:id", Authorize, negotiationController.deleteNegotiationByIdApi);

// Promo Routes
app.get("/promo", promoController.findAllPromosApi);
app.post("/promo", promoController.createPromo);
app.get("/promo/:id", promoController.findPromosByIdApi);
app.put("/promo/:id", promoController.UpdatePromosApi);
app.delete("/promo/:id", promoController.deletePromosApi);

// Wishlist Routes
app.get("/wishlist", wishlistController.findAllWishlistsApi);
app.get("/wishlistByUserId", wishlistController.findWishlistByUserIdApi);
app.post("/wishlist", Authorize, wishlistController.createWishlistApi);

app.listen(PORT, () => {
  console.info(`Server running at http://localhost:${PORT}`);
});
