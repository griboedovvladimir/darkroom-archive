import pkg from "express";
const { Router } = pkg;
import type { Request, Response } from "express";
import Item from "../models/item.ts";

const router = Router();

/**
 * GET /items
 * Return all items
 */
router.get("/", async (_req: Request, res: Response) => {
  try {
    const items = await Item.find().select("-frames").lean();
    return res.json(items);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: message });
  }
});

/**
 * GET /items/:id
 * NOTE: by convention in this project this route returns an item by its `code` field (numeric),
 * not by Mongo _id. If you need lookup by Mongo _id, use /items/id/:id (see below).
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const codeParam = req.params.id;
    const code = Number(codeParam);

    if (Number.isNaN(code)) {
      return res.status(400).json({ error: "Code must be a number" });
    }

    const item = await Item.findOne({ code });
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    return res.json(item);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: message });
  }
});

/**
 * Optional: GET /items/id/:id
 * Lookup by MongoDB _id (ObjectId). Useful if you need the original behaviour.
 */
router.get("/id/:id", async (req: Request, res: Response) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    return res.json(item);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: message });
  }
});

/**
 * POST /items
 * Create a new item. Body is stored as-is (schema is flexible).
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    return res.status(201).json(savedItem);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: message });
  }
});

/**
 * PUT /items/:id
 * Update an item by MongoDB _id. Body should contain the fields to update.
 * (We keep update/delete by _id to avoid ambiguity between code and _id.)
 */
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: false,
    });

    if (!updated) {
      return res.status(404).json({ error: "Item not found" });
    }

    return res.json(updated);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: message });
  }
});

/**
 * DELETE /items/:id
 * Delete by MongoDB _id.
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Item not found" });
    }
    return res.status(204).send();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: message });
  }
});

export default router;
