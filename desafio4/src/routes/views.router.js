import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("realtimeproducts", { products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los productos en tiempo real");
  }
});

/*router.get("/addproduct", (req, res) => {
  res.render("addProduct");
});*/

router.post("/realtimeproducts", async (req, res) => {
  try {
    await productManager.addProduct(req.body);

    //req.context.socketServer.emit("productAdded", req.body);

    //res.redirect("/addproduct");
    const products = await productManager.getProducts();
    res.render("realtimeproducts", { products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al agregar el producto");
  }
});

/*router.get("/delete", (req, res) => {
  res.render("deleteProduct");
});*/

router.delete("/realtimeproducts", async (req, res) => {
  try {
    const productId = parseInt(req.body.productId);

    await productManager.deleteProduct(productId);

    //res.redirect("/delete");
    const products = await productManager.getProducts();
    res.render("realtimeproducts", { products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar el producto");
  }
});

export default router;