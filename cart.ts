import express from "express";
import { CartItems } from "./cartItems"
const routes = express.Router();

const CartItems: CartItems[] = [
    {id: 1, product:"Papaya", price: 3, quantity: 3},
    {id: 2, product:"Avocado", price: 5, quantity: 5},
    {id: 3, product:"Guava", price: 4, quantity: 8},
    {id: 4, product:"Tamarind", price: 3, quantity: 7},
]

let nextId:number = 5;

routes.get("/CartItems",(req,res) =>{
    res.json(CartItems)
});

routes.get("/CartItems/:id", (req, res) => {
    const id: number = parseInt(req.params.id);
    const item:CartItems|undefined = CartItems.find(item => item.id === id);
    if (item) {
      res.json(item);
    } else {
      res.status(404);
      res.send(`No Products found with ID: ${id}`);
    }
  });

  routes.put("/CartItems/:id", (req, res) => {
    const id: number = parseInt(req.params.id);
    let item: CartItems = req.body;
    item.id = id; // just to be safe, make sure id is correct
    // #1 - find the index (findIndex)
    const index: number = CartItems.findIndex(item => item.id === id);
    // #2 - replace at that index
    if (index !== -1) { // i.e. If it WAS found
      CartItems[index] = item;
      res.json(item);
    } else {
      res.status(404);
      res.send(`No Products found with ID: ${id}`);
    }
  });

  routes.post("/CartItems",(req,res) => {
      let item: CartItems = req.body;
      item.id = nextId;
      nextId++;
      CartItems.push(item)
      res.status(201);
      res.json(item);
  })

  routes.delete("/CartItems/:id", (req, res) => {
    const id: number = parseInt(req.params.id);
    // #1 - find the index (findIndex)
    const index: number = CartItems.findIndex(item => item.id === id);
    // #2 - remove that index (splice)
    if (index !== -1) { // i.e. If it WAS found
      CartItems.splice(index, 1);
    }
    res.status(204);
    res.send();
  });

export default routes;