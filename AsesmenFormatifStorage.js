let tpData = [];

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
  const data = localStorage.getItem("tpData");
  if (data) {
    tpData = JSON.parse(data);
  }
}

// Fungsi simpan data ke localStorage
function saveData() {
  localStorage.setItem("tpData", JSON.stringify(tpData));
}

// Fungsi render tabel
function renderTable() {
  tableBody.innerHTML = "";
  tpData.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${item.nama}</td>
          <td>${item.tp1}</td>
          <td>${item.tp2}</td>
          <td>${item.tp3}</td>
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

  const tp1 = prompt("Tujuan Pembelajaran (TP 1):") || "";
  const tp2 = prompt("Tujuan Pembelajaran (TP 2):") || "";
  const tp3 = prompt("Tujuan Pembelajaran (TP 3):") || "";
  const capaianTertinggi =
    prompt("Deskripsi Capaian Tertinggi dalam Rapor:") || "";
  const capaianTerendah =
    prompt("Deskripsi Capaian Terendah dalam Rapor:") || "";

  // Buat objek data baru
  const newItem = {
    nama: nama,
    tp1: tp1,
    tp2: tp2,
    tp3: tp3,
    capaianTertinggi: capaianTertinggi,
    capaianTerendah: capaianTerendah,
  };

  // Masukkan ke array, lalu simpan
  tpData.push(newItem);
  saveData();
  renderTable();
  showAlert("Data berhasil ditambahkan!", "success");
}

// Fungsi edit data
window.editData = function (index) {
  const item = tpData[index];

  const newNama = prompt("Nama Siswa:", item.nama);
  if (newNama !== null) item.nama = newNama;

  const newTp1 = prompt("Tujuan Pembelajaran (TP 1):", item.tp1);
  if (newTp1 !== null) item.tp1 = newTp1;

  const newTp2 = prompt("Tujuan Pembelajaran (TP 2):", item.tp2);
  if (newTp2 !== null) item.tp2 = newTp2;

  const newTp3 = prompt("Tujuan Pembelajaran (TP 3):", item.tp3);
  if (newTp3 !== null) item.tp3 = newTp3;

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
    tpData.splice(index, 1);
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
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleBtn");

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
