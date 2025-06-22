// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const port = 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Atlas connection
// mongoose.connect('mongodb://localhost:27017/bookstore')
//     .then(() => console.log('Connected to MongoDB Atlas'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Model
// const Book = mongoose.model('Book', {
//     title: String,
//     author: String,
//     description: String
// });

// // Routes
// app.get('/books', async (_req, res) => {
//     try {
//         const books = await Book.find();
//         res.json(books);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Get book by ID
// app.get('/books/:id', async (req, res) => {
//     try {
//         const book = await Book.findById(req.params.id);
//         if (!book) {
//             return res.status(404).json({ error: 'Book not found' });
//         }
//         res.json(book);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Add book
// app.post('/books', async (req, res) => {
//     try {
//         const newBook = new Book(req.body);
//         const saved = await newBook.save();
//         res.json(saved);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Update book
// app.put('/books/:id', async (req, res) => {
//     const updated = await Book.findByIdAndUpdate(req.params.id, req.body,
//          { new: true });
//     res.json(updated);
// });

// // Delete book
// app.delete('/books/:id', async (req, res) => {
//     await Book.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Deleted' });
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

// TUGAS
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect('mongodb://localhost:27017/personData')
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));

// Model
const Profile = mongoose.model('Profile', {
    nama: String,
    tempatLahir: String,
    tanggalLahir: String, // Ubah dari Date ke String
    alamat: String,
    golonganDarah: String,
    nomorHP: String
});

// Routes
app.get('/profiles', async (_req, res) => {
    try {
        const profiles = await Profile.find();
        res.json(profiles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/profiles/:id', async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/profiles', async (req, res) => {
    try {
        console.log('Received payload:', req.body); // Log payload yang diterima

        const { nama, tempatLahir, tanggalLahir, alamat, golonganDarah, nomorHP } = req.body;
        if (!nama || !tempatLahir || !tanggalLahir || !alamat || !golonganDarah || !nomorHP) {
            return res.status(400).json({ error: 'Semua field wajib diisi!' });
        }

        // Pastikan tanggalLahir dalam format YYYY-MM-DD
        const date = new Date(tanggalLahir);
        if (isNaN(date.getTime())) {
            return res.status(400).json({ error: 'Format tanggalLahir tidak valid!' });
        }

        // Format tanggalLahir tanpa waktu
        const formattedDate = date.toISOString().split('T')[0];

        const newProfile = new Profile({ 
            nama, 
            tempatLahir, 
            tanggalLahir: formattedDate, // Simpan sebagai string tanpa waktu
            alamat, 
            golonganDarah, 
            nomorHP 
        });
        const saved = await newProfile.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error('Error saat menyimpan profile:', err); // Log error
        res.status(500).json({ error: 'Gagal menyimpan profile' });
    }
});

app.put('/profiles/:id', async (req, res) => {
    const updated = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

app.delete('/profiles/:id', async (req, res) => {
    await Profile.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
