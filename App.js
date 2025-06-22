// import React, { useEffect, useState } from 'react';
// import { View, ScrollView, TextInput, Button } from 'react-native';
// import { Card, Title, Paragraph } from 'react-native-paper';
// import axios from 'axios';

// const API_URL = 'http://localhost:3000/books'; // Ganti sesuai backend

// export default function App() {
//   const [books, setBooks] = useState([]);
//   const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');
//   const [desc, setDesc] = useState('');

//   const fetchBooks = async () => {
//     const res = await axios.get(API_URL);
//     setBooks(res.data);
//   };

//   const addBook = async () => {
//     if (title && author && desc) {
//       await axios.post(API_URL, { title, author, description: desc });
//       setTitle('');
//       setAuthor('');
//       setDesc('');
//       fetchBooks();
//     }
//   };
//   const editBook = async (id, newTitle, newAuthor, newDesc) => {
//     if (newTitle && newAuthor && newDesc) {
//       await axios.put(`${API_URL}/${id}`, {
//         title: newTitle,
//         author: newAuthor,
//         description: newDesc,
//       });
//       fetchBooks();
//     }
//   };

//   const deleteBook = async (id) => {
//     await axios.delete(`${API_URL}/${id}`);
//     fetchBooks();
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const [editingBook, setEditingBook] = useState(null);
//   const [editTitle, setEditTitle] = useState('');
//   const [editAuthor, setEditAuthor] = useState('');
//   const [editDesc, setEditDesc] = useState('');

//   const startEdit = (book) => {
//     setEditingBook(book);
//     setEditTitle(book.title);
//     setEditAuthor(book.author);
//     setEditDesc(book.description);
//   };

//   const cancelEdit = () => {
//     setEditingBook(null);
//     setEditTitle('');
//     setEditAuthor('');
//     setEditDesc('');
//   };

//   const saveEdit = async () => {
//     if (editingBook && editTitle && editAuthor && editDesc) {
//       await editBook(editingBook._id, editTitle, editAuthor, editDesc);
//       cancelEdit();
//     }
//   };

//   return (
//     <ScrollView style={{ padding: 20, marginTop: 40 }}>
//       {/* Add Book Form */}
//       <Card style={{ padding: 15, marginBottom: 20 }}>
//         <Card.Title title="Add New Book" />
//         <Card.Content>
//           <TextInput
//             placeholder="Title"
//             value={title}
//             onChangeText={setTitle}
//             style={{
//               marginBottom: 10,
//               backgroundColor: '#e3f2fd',
//               borderRadius: 5,
//               padding: 8,
//             }}
//           />
//           <TextInput
//             placeholder="Author"
//             value={author}
//             onChangeText={setAuthor}
//             style={{
//               marginBottom: 10,
//               backgroundColor: '#fff9c4',
//               borderRadius: 5,
//               padding: 8,
//             }}
//           />
//           <TextInput
//             placeholder="Description"
//             value={desc}
//             onChangeText={setDesc}
//             style={{
//               marginBottom: 10,
//               backgroundColor: '#c8e6c9',
//               borderRadius: 5,
//               padding: 8,
//             }}
//           />
//           <Button title="Add Book" onPress={addBook} />
//         </Card.Content>
//       </Card>

//       {/* Edit Book Form */}
//       {editingBook && (
//         <Card style={{ padding: 15, marginBottom: 20, backgroundColor: '#fce4ec' }}>
//           <Card.Title title="Edit Book" />
//           <Card.Content>
//             <TextInput
//               placeholder="Title"
//               value={editTitle}
//               onChangeText={setEditTitle}
//               style={{
//                 marginBottom: 10,
//                 backgroundColor: '#e3f2fd',
//                 borderRadius: 5,
//                 padding: 8,
//               }}
//             />
//             <TextInput
//               placeholder="Author"
//               value={editAuthor}
//               onChangeText={setEditAuthor}
//               style={{
//                 marginBottom: 10,
//                 backgroundColor: '#fff9c4',
//                 borderRadius: 5,
//                 padding: 8,
//               }}
//             />
//             <TextInput
//               placeholder="Description"
//               value={editDesc}
//               onChangeText={setEditDesc}
//               style={{
//                 marginBottom: 10,
//                 backgroundColor: '#c8e6c9',
//                 borderRadius: 5,
//                 padding: 8,
//               }}
//             />
//             <Button title="Save" onPress={saveEdit} />
//             <View style={{ height: 10 }} />
//             <Button title="Cancel" color="grey" onPress={cancelEdit} />
//           </Card.Content>
//         </Card>
//       )}

//       {/* List Books */}
//       {books.map((book) => (
//         <Card key={book._id} style={{ marginVertical: 10 }}>
//           <Card.Content>
//             <Title>{book.title}</Title>
//             <Paragraph>{book.author}</Paragraph>
//             <Paragraph>{book.description}</Paragraph>
//             <Button
//               title="Edit"
//               onPress={() => startEdit(book)}
//             />
//             <Button title="Delete" onPress={() => deleteBook(book._id)} />
//           </Card.Content>
//         </Card>
//       ))}
//     </ScrollView>
//   );
// }

//TUGAS
import React, { useState } from 'react';
import { View, ScrollView, TextInput, Button, Platform, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';

const API_URL = 'http://localhost:3000/profiles';

export default function App() {
  const [profiles, setProfiles] = useState([]);
  const [nama, setNama] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const [alamat, setAlamat] = useState('');
  const [golonganDarah, setGolonganDarah] = useState('');
  const [nomorHP, setNomorHP] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Tambahkan state untuk edit profile
  const [editingProfile, setEditingProfile] = useState(null);
  const [editNama, setEditNama] = useState('');
  const [editTempatLahir, setEditTempatLahir] = useState('');
  const [editTanggalLahir, setEditTanggalLahir] = useState('');
  const [editAlamat, setEditAlamat] = useState('');
  const [editGolonganDarah, setEditGolonganDarah] = useState('');
  const [editNomorHP, setEditNomorHP] = useState('');

  const fetchProfiles = async () => {
    const res = await axios.get(API_URL);
    setProfiles(res.data);
  };

  const addProfile = async () => {
    if (nama && tempatLahir && tanggalLahir && alamat && golonganDarah && nomorHP) {
        try {
            const res = await axios.post(API_URL, { 
                nama, 
                tempatLahir, 
                tanggalLahir: tanggalLahir.toISOString().split('T')[0],
                alamat, 
                golonganDarah, 
                nomorHP 
            });
            console.log('Profile added:', res.data);
            setNama('');
            setTempatLahir('');
            setTanggalLahir(new Date());
            setAlamat('');
            setGolonganDarah('');
            setNomorHP('');
            fetchProfiles();
        } catch (err) {
            console.error('Error adding profile:', err);
        }
    }
  };

  const editProfile = async (id, newNama, newTempatLahir, newTanggalLahir, newAlamat, newGolonganDarah, newNomorHP) => {
    if (newNama && newTempatLahir && newTanggalLahir && newAlamat && newGolonganDarah && newNomorHP) {
      try {
        await axios.put(`${API_URL}/${id}`, {
          nama: newNama,
          tempatLahir: newTempatLahir,
          tanggalLahir: newTanggalLahir,
          alamat: newAlamat,
          golonganDarah: newGolonganDarah,
          nomorHP: newNomorHP,
        });
        fetchProfiles(); // Refresh data setelah update
      } catch (err) {
        console.error('Error updating profile:', err);
      }
    }
  };
  
  const deleteProfile = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProfiles(); // Refresh data setelah delete
    } catch (err) {
      console.error('Error deleting profile:', err);
    }
  };

  const startEdit = (profile) => {
    setEditingProfile(profile);
    setEditNama(profile.nama);
    setEditTempatLahir(profile.tempatLahir);
    setEditTanggalLahir(new Date(profile.tanggalLahir).toISOString().split('T')[0]); // Format tanggal
    setEditAlamat(profile.alamat);
    setEditGolonganDarah(profile.golonganDarah);
    setEditNomorHP(profile.nomorHP);
  };
  
  const saveEdit = async () => {
    if (editingProfile && editNama && editTempatLahir && editTanggalLahir && editAlamat && editGolonganDarah && editNomorHP) {
      try {
        await editProfile(
          editingProfile._id,
          editNama,
          editTempatLahir,
          editTanggalLahir,
          editAlamat,
          editGolonganDarah,
          editNomorHP
        );
        cancelEdit(); // Tutup form edit setelah berhasil
      } catch (err) {
        console.error('Error saving edit:', err);
      }
    }
  };

  const cancelEdit = () => {
    setEditingProfile(null);
    setEditNama('');
    setEditTempatLahir('');
    setEditTanggalLahir('');
    setEditAlamat('');
    setEditGolonganDarah('');
    setEditNomorHP('');
  };

  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS === 'web') {
      setTanggalLahir(new Date(event.target.value));
    } else {
      setShowDatePicker(Platform.OS === 'ios');
      if (selectedDate) {
        setTanggalLahir(selectedDate);
      }
    }
  };

  return (
    <ScrollView style={{ padding: 20, marginTop: 40 }}>
      {/* Add Profile Form */}
      <Card style={{ padding: 15, marginBottom: 20 }}>
        <Card.Title title="Add New Profile" />
        <Card.Content>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ marginRight: 10, width: 100 }}>Nama:</Text>
            <TextInput
              placeholder="Nama"
              value={nama}
              onChangeText={setNama}
              style={{
                flex: 1,
                backgroundColor: '#e3f2fd',
                borderRadius: 5,
                padding: 8,
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ marginRight: 10, width: 100 }}>Tempat Lahir:</Text>
            <TextInput
              placeholder="Tempat Lahir"
              value={tempatLahir}
              onChangeText={setTempatLahir}
              style={{
                flex: 1,
                backgroundColor: '#fff9c4',
                borderRadius: 5,
                padding: 8,
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ marginRight: 10, width: 100 }}>Tanggal Lahir:</Text>
            {Platform.OS === 'web' ? (
              <input
                type="date"
                value={tanggalLahir.toISOString().split('T')[0]}
                onChange={onChangeDate}
                style={{
                  flex: 1,
                  padding: 8,
                  borderRadius: 5,
                  border: '1px solid #ccc',
                }}
              />
            ) : (
              <>
                <Button
                  title={`${tanggalLahir.toLocaleDateString()}`}
                  onPress={() => setShowDatePicker(true)}
                />
                {showDatePicker && (
                  <DateTimePicker
                    value={tanggalLahir}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                  />
                )}
              </>
            )}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ marginRight: 10, width: 100 }}>Alamat:</Text>
            <TextInput
              placeholder="Alamat"
              value={alamat}
              onChangeText={setAlamat}
              style={{
                flex: 1,
                backgroundColor: '#ffccbc',
                borderRadius: 5,
                padding: 8,
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ marginRight: 10, width: 100 }}>Golongan Darah:</Text>
            <TextInput
              placeholder="Golongan Darah"
              value={golonganDarah}
              onChangeText={setGolonganDarah}
              style={{
                flex: 1,
                backgroundColor: '#d1c4e9',
                borderRadius: 5,
                padding: 8,
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ marginRight: 10, width: 100 }}>Nomor HP:</Text>
            <TextInput
              placeholder="Nomor HP"
              value={nomorHP}
              onChangeText={setNomorHP}
              style={{
                flex: 1,
                backgroundColor: '#b2dfdb',
                borderRadius: 5,
                padding: 8,
              }}
            />
          </View>
          <Button title="Tambah Profil" onPress={addProfile} />
        </Card.Content>
      </Card>

      {/* Tampilkan daftar profil */}
      {profiles.map((profile) => (
        <Card key={profile._id} style={{ marginBottom: 15, padding: 10 }}>
          <Card.Content>
            {editingProfile && editingProfile._id === profile._id ? (
              <>
                {/* Form edit */}
                <TextInput
                  placeholder="Nama"
                  value={editNama}
                  onChangeText={setEditNama}
                  style={{ marginBottom: 5, backgroundColor: '#e3f2fd', borderRadius: 5, padding: 8 }}
                />
                <TextInput
                  placeholder="Tempat Lahir"
                  value={editTempatLahir}
                  onChangeText={setEditTempatLahir}
                  style={{ marginBottom: 5, backgroundColor: '#fff9c4', borderRadius: 5, padding: 8 }}
                />
                <TextInput
                  placeholder="Tanggal Lahir"
                  value={editTanggalLahir}
                  onChangeText={setEditTanggalLahir}
                  style={{ marginBottom: 5, backgroundColor: '#e1bee7', borderRadius: 5, padding: 8 }}
                />
                <TextInput
                  placeholder="Alamat"
                  value={editAlamat}
                  onChangeText={setEditAlamat}
                  style={{ marginBottom: 5, backgroundColor: '#ffccbc', borderRadius: 5, padding: 8 }}
                />
                <TextInput
                  placeholder="Golongan Darah"
                  value={editGolonganDarah}
                  onChangeText={setEditGolonganDarah}
                  style={{ marginBottom: 5, backgroundColor: '#d1c4e9', borderRadius: 5, padding: 8 }}
                />
                <TextInput
                  placeholder="Nomor HP"
                  value={editNomorHP}
                  onChangeText={setEditNomorHP}
                  style={{ marginBottom: 10, backgroundColor: '#b2dfdb', borderRadius: 5, padding: 8 }}
                />
                <Button title="Simpan" onPress={saveEdit} />
                <View style={{ marginTop: 5 }} />
                <Button title="Batal" color="gray" onPress={cancelEdit} />
              </>
            ) : (
              <>
                <Title>{profile.nama}</Title>
                <Paragraph>Tempat Lahir: {profile.tempatLahir}</Paragraph>
                <Paragraph>Tanggal Lahir: {new Date(profile.tanggalLahir).toLocaleDateString()}</Paragraph>
                <Paragraph>Alamat: {profile.alamat}</Paragraph>
                <Paragraph>Golongan Darah: {profile.golonganDarah}</Paragraph>
                <Paragraph>Nomor HP: {profile.nomorHP}</Paragraph>
                <Button title="Edit" onPress={() => startEdit(profile)} />
                <View style={{ marginTop: 5 }} />
                <Button title="Hapus" color="red" onPress={() => deleteProfile(profile._id)} />
              </>
            )}
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}