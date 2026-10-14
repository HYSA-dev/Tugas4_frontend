// Dataset Produk UMKM (Sesuai Tugas 3)
const localProductList = [
  { id: 1, name: "Keripik Pisang", category: "Makanan", price: 15000, stock: 20 },
  { id: 2, name: "Keripik Singkong", category: "Makanan", price: 12000, stock: 15 },
  { id: 3, name: "Kopi Robusta", category: "Minuman", price: 35000, stock: 10 },
  { id: 4, name: "Teh Celup Herbal", category: "Minuman", price: 20000, stock: 25 },
  { id: 5, name: "Batik Banyuwangi", category: "Pakaian", price: 150000, stock: 5 },
  { id: 6, name: "Kaos Etnik", category: "Pakaian", price: 65000, stock: 12 },
  { id: 7, name: "Gantungan Kunci UD", category: "Aksesori", price: 10000, stock: 50 },
  { id: 8, name: "Tas Anyaman", category: "Aksesori", price: 45000, stock: 8 }
];

// Helper Arrow Function (Slide 3.2 Modul 4)
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
};

// Event Listener Utama
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('product-form');
  const nameInput = document.getElementById('product-name');
  const categoryInput = document.getElementById('product-category');
  const previewText = document.getElementById('preview-text');

  // Event Live Preview saat diketik/pilih
  const updatePreview = () => {
    const nameVal = nameInput.value.trim();
    const catVal = categoryInput.value;
    previewText.textContent = nameVal !== "" ? `${nameVal} (${catVal || 'Kategori belum dipilih'})` : "-";
  };

  nameInput.addEventListener('input', updatePreview);
  categoryInput.addEventListener('change', updatePreview);

  // Event Submit Form (Slide 3.2 Modul 4)
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Mencegah reload peramban

    const nameVal = document.getElementById('product-name').value.trim();
    const categoryVal = document.getElementById('product-category').value;
    const priceVal = parseFloat(document.getElementById('product-price').value);
    const stockVal = parseInt(document.getElementById('product-stock').value);
    const feedback = document.getElementById('form-feedback');

    // Jika ada yang kosong / tidak diisi
    if (!nameVal || !categoryVal || isNaN(priceVal) || priceVal <= 0 || isNaN(stockVal) || stockVal <= 0) {
      feedback.textContent = "Mohon isi semua data produk dengan valid!";
      feedback.className = "feedback-msg error";
      return;
    }

    const newProduct = {
      id: localProductList.length + 1,
      name: nameVal,
      category: categoryVal,
      price: priceVal,
      stock: stockVal
    };

    localProductList.push(newProduct);
    console.log("Data produk berhasil ditambahkan:", newProduct);

    // Tampilkan Feedback Sukses Teks di Bawah (Slide 3.2 Modul 4)
    feedback.textContent = `Sukses! Produk '${newProduct.name}' (${formatRupiah(newProduct.price)}) tersimpan.`;
    feedback.className = "feedback-msg success";

    // Reset Form Input & Live Preview
    form.reset();
    previewText.textContent = "-";
  });
});