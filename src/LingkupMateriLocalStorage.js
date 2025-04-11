let tpData2 = [];

// Ambil elemen
const tableBody = document.getElementById("tableBody");
const buttonTambah = document.getElementById("ButtonTambah");
const alertContainer = document.getElementById("alertContainer");

// Fungsi menampilkan alert bootstrap
function showAlert(message, type = "success") {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.role = "alert";
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
  alertContainer.appendChild(alertDiv);

  // Otomatis hilang setelah 3 detik
  setTimeout(() => {
    alertDiv.classList.remove("show");
    alertDiv.remove();
  }, 3000);
}

// Fungsi load data dari localStorage
function loadData() {
  const data = localStorage.getItem("tpData2");
  if (data) {
    tpData2 = JSON.parse(data);
  }
}

// Fungsi simpan data ke localStorage
function saveData() {
  localStorage.setItem("tpData2", JSON.stringify(tpData2));
}

// Fungsi render tabel
function renderTable() {
  tableBody.innerHTML = "";
  tpData2.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${item.nama}</td>
          <td>${item.tp1Kktp}</td>
          <td>${item.tp1Tampil}</td>
          <td>${item.tp2Kktp}</td>
          <td>${item.tp2Tampil}</td>
          <td>${item.tp3Kktp}</td>
          <td>${item.tp3Tampil}</td>
          <td>${item.capaianTertinggi}</td>
          <td>${item.capaianTerendah}</td>
          <td class="action-icons">
            <i class="fa-solid fa-pen-to-square text-warning" onclick="editData(${index})"></i>
            <i class="fa-solid fa-trash text-danger" onclick="deleteData(${index})"></i>
          </td>
        `;
    tableBody.appendChild(tr);
  });
}

// Fungsi tambah data
function tambahData() {
  // Minta input dari user via prompt
  const nama = prompt("Masukkan Nama Siswa:");
  if (!nama) return; // Jika user cancel/ kosong, batal tambah data

  // Prompt untuk setiap sub-kolom
  const tp1Kktp = prompt("TP 1 - KKTP:") || "";
  const tp1Tampil = prompt("TP 1 - Tampil/Tidak:") || "";
  const tp2Kktp = prompt("TP 2 - KKTP:") || "";
  const tp2Tampil = prompt("TP 2 - Tampil/Tidak:") || "";
  const tp3Kktp = prompt("TP 3 - KKTP:") || "";
  const tp3Tampil = prompt("TP 3 - Tampil/Tidak:") || "";
  const capaianTertinggi =
    prompt("Deskripsi Capaian Tertinggi dalam Rapor:") || "";
  const capaianTerendah =
    prompt("Deskripsi Capaian Terendah dalam Rapor:") || "";

  // Buat objek data baru
  const newItem = {
    nama,
    tp1Kktp,
    tp1Tampil,
    tp2Kktp,
    tp2Tampil,
    tp3Kktp,
    tp3Tampil,
    capaianTertinggi,
    capaianTerendah,
  };

  // Masukkan ke array, lalu simpan
  tpData2.push(newItem);
  saveData();
  renderTable();
  showAlert("Data berhasil ditambahkan!", "success");
}

// Fungsi edit data
window.editData = function (index) {
  const item = tpData2[index];

  const newNama = prompt("Nama Siswa:", item.nama);
  if (newNama !== null) item.nama = newNama;

  const newTp1Kktp = prompt("TP 1 - KKTP:", item.tp1Kktp);
  if (newTp1Kktp !== null) item.tp1Kktp = newTp1Kktp;

  const newTp1Tampil = prompt("TP 1 - Tampil/Tidak:", item.tp1Tampil);
  if (newTp1Tampil !== null) item.tp1Tampil = newTp1Tampil;

  const newTp2Kktp = prompt("TP 2 - KKTP:", item.tp2Kktp);
  if (newTp2Kktp !== null) item.tp2Kktp = newTp2Kktp;

  const newTp2Tampil = prompt("TP 2 - Tampil/Tidak:", item.tp2Tampil);
  if (newTp2Tampil !== null) item.tp2Tampil = newTp2Tampil;

  const newTp3Kktp = prompt("TP 3 - KKTP:", item.tp3Kktp);
  if (newTp3Kktp !== null) item.tp3Kktp = newTp3Kktp;

  const newTp3Tampil = prompt("TP 3 - Tampil/Tidak:", item.tp3Tampil);
  if (newTp3Tampil !== null) item.tp3Tampil = newTp3Tampil;

  const newCapaianTertinggi = prompt(
    "Deskripsi Capaian Tertinggi dalam Rapor:",
    item.capaianTertinggi
  );
  if (newCapaianTertinggi !== null) item.capaianTertinggi = newCapaianTertinggi;

  const newCapaianTerendah = prompt(
    "Deskripsi Capaian Terendah dalam Rapor:",
    item.capaianTerendah
  );
  if (newCapaianTerendah !== null) item.capaianTerendah = newCapaianTerendah;

  saveData();
  renderTable();
  showAlert("Data berhasil diubah!", "success");
};

// Fungsi delete data
window.deleteData = function (index) {
  if (confirm("Yakin ingin menghapus data ini?")) {
    tpData2.splice(index, 1);
    saveData();
    renderTable();
    showAlert("Data berhasil dihapus!", "danger");
  }
};

// Saat halaman dimuat
loadData();
renderTable();

// Event listener tombol tambah
buttonTambah.addEventListener("click", tambahData);

document.addEventListener("DOMContentLoaded", function () {
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("closed");

    // Ubah ikon toggle
    const icon = toggleBtn.querySelector("i");
    if (sidebar.classList.contains("closed")) {
      icon.classList.remove("fa-chevron-left");
      icon.classList.add("fa-chevron-right");
    } else {
      icon.classList.remove("fa-chevron-right");
      icon.classList.add("fa-chevron-left");
    }
  });
});
