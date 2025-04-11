document.addEventListener("DOMContentLoaded", function () {
  const table = document.querySelector("table tbody");
  const btnTambah = document.querySelector(".btn-tambah");
  const tfootCells = document.querySelectorAll("tfoot td[colspan='5']");

  // Fungsi untuk menyimpan data ke localStorage
  function saveToLocalStorage() {
    const rows = Array.from(table.querySelectorAll("tr")).map((row) => {
      const cells = Array.from(row.querySelectorAll("td"));
      return {
        no: cells[0].textContent,
        nama: cells[1].textContent,
        nilai1: cells[2].textContent,
        nilai2: cells[3].textContent,
        nilai3: cells[4].textContent,
        nilai4: cells[5].textContent,
        konsentrasi: cells[6].textContent,
      };
    });
    localStorage.setItem("nilaiAkhirData", JSON.stringify(rows));
  }

  // Fungsi untuk memuat data dari localStorage
  function loadFromLocalStorage() {
    const savedData = localStorage.getItem("nilaiAkhirData");
    if (savedData) {
      const rows = JSON.parse(savedData);
      table.innerHTML = ""; // Bersihkan tabel terlebih dahulu
      rows.forEach((row) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td>${row.no}</td>
          <td>${row.nama}</td>
          <td>${row.nilai1}</td>
          <td>${row.nilai2}</td>
          <td>${row.nilai3}</td>
          <td>${row.nilai4}</td>
          <td>${row.konsentrasi}</td>
        `;
        table.appendChild(newRow);
      });
      updateStatistics();
    }
  }

  function updateStatistics() {
    let rows = Array.from(table.querySelectorAll("tr"));
    let columns = rows.map((row) =>
      Array.from(row.querySelectorAll("td"))
        .slice(2, 6)
        .map((td) => Number(td.textContent))
    );

    let averages = columns[0].map((_, i) =>
      (columns.reduce((sum, row) => sum + row[i], 0) / columns.length).toFixed(
        2
      )
    );
    let maxValues = columns[0].map((_, i) =>
      Math.max(...columns.map((row) => row[i]))
    );
    let minValues = columns[0].map((_, i) =>
      Math.min(...columns.map((row) => row[i]))
    );

    tfootCells[0].textContent = averages.join(" | ");
    tfootCells[1].textContent = maxValues.join(" | ");
    tfootCells[2].textContent = minValues.join(" | ");

    // Simpan data setelah update
    saveToLocalStorage();
  }

  btnTambah.addEventListener("click", function () {
    let nama = prompt("Masukkan nama siswa:");
    if (!nama) return;

    let nilai = [];
    for (let i = 0; i < 4; i++) {
      let angka = prompt(`Masukkan nilai untuk mapel ${i + 1} (0-100):`);
      if (!angka || isNaN(angka) || angka < 0 || angka > 100)
        return alert("Input tidak valid!");
      nilai.push(Number(angka));
    }

    let konsentrasi = prompt("Masukkan konsentrasi mapel:") || "-";
    let newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${table.children.length + 1}</td>
      <td>${nama}</td>
      ${nilai.map((n) => `<td>${n}</td>`).join("")}
      <td>${konsentrasi}</td>
    `;
    table.appendChild(newRow);
    updateStatistics();
  });

  // Tambahkan tombol untuk menghapus data
  const btnHapus = document.createElement("button");
  btnHapus.className = "btn btn-danger ms-2";
  btnHapus.textContent = "Hapus Data";
  btnHapus.addEventListener("click", function () {
    if (confirm("Apakah Anda yakin ingin menghapus semua data?")) {
      table.innerHTML = "";
      localStorage.removeItem("nilaiAkhirData");
      updateStatistics();
    }
  });
  btnTambah.parentNode.appendChild(btnHapus);

  // Load data saat halaman dimuat
  loadFromLocalStorage();
});

// Sidebar toggle functionality
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
