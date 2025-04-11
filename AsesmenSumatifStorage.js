let siswaData = [];

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
  const data = localStorage.getItem("siswaData");
  if (data) {
    siswaData = JSON.parse(data);
  }
}

// Fungsi simpan data ke localStorage
function saveData() {
  localStorage.setItem("siswaData", JSON.stringify(siswaData));
}

// Fungsi render tabel
function renderTable() {
  tableBody.innerHTML = "";
  siswaData.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${item.nama}</td>
          <td>${item.sumatif1}</td>
          <td>${item.sumatif2}</td>
          <td>${item.sumatif3}</td>
          <td>${item.naSumatif}</td>
          <td>${item.pts}</td>
          <td>${item.pas}</td>
          <td>${item.jmlPtsPas}</td>
          <td>${item.nilaiRapor}</td>
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

  const sum1 = prompt("Sumatif 1:");
  const sum2 = prompt("Sumatif 2:");
  const sum3 = prompt("Sumatif 3:");
  const naSum = prompt("NA Sumatif Lingkup Materi (70%):");
  const pts = prompt("PTS (10%):");
  const pas = prompt("PAS (20%):");
  const jmlPtsPas = prompt("JML PTS-PAS:");
  const nilaiRapor = prompt("Nilai Rapor:");

  // Buat objek data baru
  const newItem = {
    nama: nama || "",
    sumatif1: sum1 || "",
    sumatif2: sum2 || "",
    sumatif3: sum3 || "",
    naSumatif: naSum || "",
    pts: pts || "",
    pas: pas || "",
    jmlPtsPas: jmlPtsPas || "",
    nilaiRapor: nilaiRapor || "",
  };

  // Masukkan ke array, lalu simpan
  siswaData.push(newItem);
  saveData();
  renderTable();
  showAlert("Data berhasil ditambahkan!", "success");
}

// Fungsi edit data
window.editData = function (index) {
  const item = siswaData[index];

  // Muncul prompt berisi nilai lama, kalau dikosongkan, tidak diubah
  const newNama = prompt("Nama Siswa:", item.nama);
  const newSum1 = prompt("Sumatif 1:", item.sumatif1);
  const newSum2 = prompt("Sumatif 2:", item.sumatif2);
  const newSum3 = prompt("Sumatif 3:", item.sumatif3);
  const newNaSum = prompt("NA Sumatif Lingkup Materi (70%):", item.naSumatif);
  const newPts = prompt("PTS (10%):", item.pts);
  const newPas = prompt("PAS (20%):", item.pas);
  const newJmlPtsPas = prompt("JML PTS-PAS:", item.jmlPtsPas);
  const newNilaiRapor = prompt("Nilai Rapor:", item.nilaiRapor);

  // Jika prompt di-cancel, maka hasilnya null → jangan ubah data
  if (newNama !== null) item.nama = newNama;
  if (newSum1 !== null) item.sumatif1 = newSum1;
  if (newSum2 !== null) item.sumatif2 = newSum2;
  if (newSum3 !== null) item.sumatif3 = newSum3;
  if (newNaSum !== null) item.naSumatif = newNaSum;
  if (newPts !== null) item.pts = newPts;
  if (newPas !== null) item.pas = newPas;
  if (newJmlPtsPas !== null) item.jmlPtsPas = newJmlPtsPas;
  if (newNilaiRapor !== null) item.nilaiRapor = newNilaiRapor;

  saveData();
  renderTable();
  showAlert("Data berhasil diubah!", "success");
};

// Fungsi delete data
window.deleteData = function (index) {
  if (confirm("Yakin ingin menghapus data ini?")) {
    siswaData.splice(index, 1);
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

document.addEventListener("DOMContentLoaded", () => {
  loadData();
  renderTable();

  document.getElementById("ButtonTambah").addEventListener("click", addRow);
});

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
