import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Подключение к MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/photo_archive', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const CounterSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	sequence_value: { type: Number, default: 0 }
  });
  
const Counter = mongoose.model('Counter', CounterSchema);

const ItemSchema = new mongoose.Schema({
	code: { type: Number, unique: true },
	// остальные поля идут нестрого, как у тебя
  }, { strict: false });
  
  ItemSchema.pre('save', async function (next) {
	if (this.isNew) {
	  const counter = await Counter.findOneAndUpdate(
		{ _id: 'film_code' },
		{ $inc: { sequence_value: 1 } },
		{ new: true, upsert: true }
	  );
	  this.code = counter.sequence_value;
	}
	next();
  });
  
  const Item = mongoose.model('films', ItemSchema, 'films');

// Создание
app.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Чтение
app.get('/items', async (req, res) => {
	const items = await Item.find();
	res.json(items);
});

// Обновление
app.put('/items/:id', async (req, res) => {
	const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body.data, { new: true });
	res.json(updatedItem);
});

// Удаление
app.delete('/items/:id', async (req, res) => {
	await Item.findByIdAndDelete(req.params.id);
	res.status(204).send();
});

app.listen(3003, () => console.log('Server started on port 3003'));