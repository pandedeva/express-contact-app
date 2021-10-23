const fs = require("fs");

// membuat folder data jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// ambil semua data di contact.json
const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  // ubah data dari string ke object
  const contacts = JSON.parse(file);
  return contacts;
};

// cari contact berdasarkan nama
const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
  return contact;
};

// menuliskan / menimpa file contacts.json dengan data yang baru
const saveContacts = (contacts) => {
  // ubah data dari object ke string
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts, null, 4));
};

// menambahkan data contact baru
const addContact = (contact) => {
  // panggil data contacts yang sudah berbentuk object
  const contacts = loadContact();
  // tambahkan object baru yang tadi dikirim
  contacts.push(contact);
  // lalu timpa dengan saveContact
  saveContacts(contacts);
};

// cek noHp yang duplikat
const cekDuplikatNoHp = (noHp) => {
  // panggil data contacts yang sudah berbentuk object
  const contacts = loadContact();

  // lalu cari contact yang noHpnya sama
  return contacts.find((contact) => contact.noHp === noHp);
};

const cekDuplikatNama = (nama) => {
  // panggil data contacts yang sudah berbentuk object
  const contacts = loadContact();

  // lalu cari contact yang noHpnya sama
  return contacts.find((contact) => contact.nama === nama);
};

const cekDuplikatEmail = (email) => {
  // panggil data contacts yang sudah berbentuk object
  const contacts = loadContact();

  // lalu cari contact yang noHpnya sama
  return contacts.find((contact) => contact.email === email);
};

// hapus contact
const deleteContact = (nama) => {
  const contacts = loadContact();

  const filteredContacts = contacts.filter((contact) => contact.nama !== nama);

  saveContacts(filteredContacts);
};

// mengubah contacts
const updateContacts = (contactBaru) => {
  const contacts = loadContact();

  // hilangkan contact lama yang namanya sama dengan oldNama
  const filteredContacts = contacts.filter((contact) => contact.nama !== contactBaru.oldNama);

  // hapus old nama
  delete contactBaru.oldNama;
  // lalu push ke filteredContacts
  filteredContacts.push(contactBaru);
  // dan save ke json
  saveContacts(filteredContacts);
};

module.exports = { loadContact, findContact, addContact, cekDuplikatNoHp, cekDuplikatEmail, deleteContact, cekDuplikatNama, updateContacts };
