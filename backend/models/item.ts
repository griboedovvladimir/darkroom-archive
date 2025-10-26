import mongoose from 'mongoose';

interface CounterDoc extends mongoose.Document {
  _id: string;
  sequence_value: number;
}

interface ItemDoc extends mongoose.Document {
  code?: number;
  [key: string]: any;
}

// Counter schema used to generate incremental `code` values
const CounterSchema = new mongoose.Schema<CounterDoc>(
  {
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 0 },
  },
  { timestamps: false },
);

// Use existing model if it was already registered (prevents OverwriteModelError in hot-reload)
const Counter = (mongoose.models.Counter as mongoose.Model<CounterDoc>) ||
  mongoose.model<CounterDoc>('Counter', CounterSchema);

// Item schema: flexible (strict: false) to accept arbitrary fields stored in your collection
const ItemSchema = new mongoose.Schema<ItemDoc>(
  {
    code: { type: Number, unique: true },
    // other fields are intentionally not declared so documents can be flexible
  },
  { strict: false, timestamps: true },
);

// Pre-save hook to auto-increment `code` for new documents
ItemSchema.pre('save', async function (next) {
  // `this` can be a document with arbitrary shape — use `any` to avoid strict typing here
  const doc: any = this;
  if (!doc.isNew) {
    return next();
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { _id: 'film_code' },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true },
    );

    // assign the generated sequence to the code field
    doc.code = counter.sequence_value;
    return next();
  } catch (err) {
    return next(err as Error);
  }
});

// Export model (re-use existing if already registered)
const Item = (mongoose.models.films as mongoose.Model<ItemDoc>) ||
  mongoose.model<ItemDoc>('films', ItemSchema, 'films');

export default Item;
