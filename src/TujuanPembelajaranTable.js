let tableData = [];

function loadData() {
  const data = localStorage.getItem("tableData");
  if (data) {
    tableData = JSON.parse(data);
  }
}

function saveData() {
  localStorage.setItem("tableData", JSON.stringify(tableData));
}

function renderTable() {
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = "";

  tableData.forEach((row, index) => {
    const tr = document.createElement("tr");

    const noTd = document.createElement("td");
    noTd.textContent = index + 1;

    const tingkatTd = document.createElement("td");
    tingkatTd.textContent = row.tingkat;

    const tujuanTd = document.createElement("td");
    tujuanTd.textContent = row.tujuan;

    const aksiTd = document.createElement("td");

    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-warning me-2";
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editBtn.addEventListener("click", () => editRow(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger";
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.addEventListener("click", () => deleteRow(index));

    aksiTd.appendChild(editBtn);
    aksiTd.appendChild(deleteBtn);

    tr.appendChild(noTd);
    tr.appendChild(tingkatTd);
    tr.appendChild(tujuanTd);
    tr.appendChild(aksiTd);

    tbody.appendChild(tr);
  });
}

function showAlert(message, type = "danger") {
  const alertContainer = document.getElementById("alertContainer");
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.role = "alert";
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
  alertContainer.appendChild(alertDiv);
  setTimeout(() => {
    alertDiv.classList.remove("show");
    alertDiv.remove();
  }, 3000);
}

function addRow() {
  const tingkat = prompt("Masukkan Tingkat:");
  const tujuan = prompt("Masukkan Tujuan Pembelajaran:");

  if (tingkat && tujuan) {
    tableData.push({ tingkat: tingkat, tujuan: tujuan });
    saveData();
    renderTable();
    showAlert("Data berhasil ditambahkan!", "success");
  } else {
    showAlert("Data tidak boleh kosong!", "danger");
  }
}

function editRow(index) {
  const row = tableData[index];
  const newTingkat = prompt("Edit Tingkat:", row.tingkat);
  const newTujuan = prompt("Edit Tujuan Pembelajaran:", row.tujuan);

  if (newTingkat && newTujuan) {
    tableData[index] = { tingkat: newTingkat, tujuan: newTujuan };
    saveData();
    renderTable();
    showAlert("Data berhasil diubah!", "success");
  } else {
    showAlert("Data tidak boleh kosong!", "danger");
  }
}

function deleteRow(index) {
  if (confirm("Yakin ingin menghapus data ini?")) {
    tableData.splice(index, 1);
    saveData();
    renderTable();
    showAlert("Data berhasil dihapus!", "success");
  }
}

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
