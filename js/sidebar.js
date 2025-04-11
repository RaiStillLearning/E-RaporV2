// Fungsi untuk mengambil data dari localStorage
function getStoredData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// Fungsi untuk menghitung nilai akhir
function hitungNilaiAkhir() {
  const formatifData = getStoredData("nilaiFormatif") || [];
  const sumatifData = getStoredData("nilaiSumatif") || [];

  // Object untuk menyimpan nilai per mapel
  const nilaiPerMapel = {};

  // Kelompokkan nilai formatif per siswa per mapel (40%)
  formatifData.forEach((nilai) => {
    const key = `${nilai.mapel}_${nilai.namaSiswa}`;
    if (!nilaiPerMapel[key]) {
      nilaiPerMapel[key] = {
        mapel: nilai.mapel,
        guru: nilai.guru,
        namaSiswa: nilai.namaSiswa,
        nilaiFormatif: 0,
        nilaiSumatif: 0,
      };
    }
    nilaiPerMapel[key].nilaiFormatif = nilai.nilai * 0.4;
  });

  // Kelompokkan nilai sumatif per siswa per mapel (60%)
  sumatifData.forEach((nilai) => {
    const key = `${nilai.mapel}_${nilai.namaSiswa}`;
    if (!nilaiPerMapel[key]) {
      nilaiPerMapel[key] = {
        mapel: nilai.mapel,
        guru: nilai.guru,
        namaSiswa: nilai.namaSiswa,
        nilaiFormatif: 0,
        nilaiSumatif: 0,
      };
    }
    nilaiPerMapel[key].nilaiSumatif = nilai.nilai * 0.6;
  });

  // Hitung nilai akhir per siswa
  const nilaiAkhirSiswa = Object.values(nilaiPerMapel).map((data) => ({
    mapel: data.mapel,
    guru: data.guru,
    namaSiswa: data.namaSiswa,
    nilaiAkhir: data.nilaiFormatif + data.nilaiSumatif,
  }));

  // Kelompokkan per mapel untuk statistik
  const statistikMapel = {};
  nilaiAkhirSiswa.forEach((nilai) => {
    if (!statistikMapel[nilai.mapel]) {
      statistikMapel[nilai.mapel] = {
        mapel: nilai.mapel,
        guru: nilai.guru,
        nilai: [],
      };
    }
    statistikMapel[nilai.mapel].nilai.push(nilai.nilaiAkhir);
  });

  // Hitung statistik per mapel
  const hasilAkhir = Object.values(statistikMapel).map((data) => ({
    mapel: data.mapel,
    guru: data.guru,
    rataRata: (
      data.nilai.reduce((a, b) => a + b, 0) / data.nilai.length
    ).toFixed(1),
    tertinggi: Math.max(...data.nilai).toFixed(1),
    terendah: Math.min(...data.nilai).toFixed(1),
  }));

  // Simpan hasil perhitungan
  localStorage.setItem("nilaiAkhir", JSON.stringify(hasilAkhir));
  return hasilAkhir;
}

// Fungsi untuk memperbarui tampilan
function updateTampilan() {
  const nilaiAkhir = hitungNilaiAkhir();

  // Update tabel
  const tbody = document.querySelector("#dataTable tbody");
  if (tbody) {
    tbody.innerHTML = "";
    nilaiAkhir.forEach((nilai, index) => {
      tbody.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${nilai.mapel}</td>
          <td>X</td>
          <td>${nilai.guru}</td>
          <td>${nilai.rataRata}</td>
          <td>${nilai.tertinggi}</td>
          <td>${nilai.terendah}</td>
        </tr>
      `;
    });
  }

  // Update chart jika ada
  const nilaiChart = Chart.getChart("nilaiChart");
  if (nilaiChart) {
    nilaiChart.data.labels = nilaiAkhir.map((n) => n.mapel);
    nilaiChart.data.datasets[0].data = nilaiAkhir.map((n) => n.rataRata);
    nilaiChart.data.datasets[1].data = nilaiAkhir.map((n) => n.tertinggi);
    nilaiChart.data.datasets[2].data = nilaiAkhir.map((n) => n.terendah);
    nilaiChart.update();
  }
}

// Fungsi untuk menambahkan data test
function tambahDataTest() {
  // Data formatif contoh
  const dataFormatif = [
    { mapel: "PPLG", namaSiswa: "Siswa 1", nilai: 85, guru: "Pak Dimas" },
    { mapel: "PPLG", namaSiswa: "Siswa 2", nilai: 90, guru: "Pak Dimas" },
    { mapel: "Matematika", namaSiswa: "Siswa 1", nilai: 75, guru: "Bu Suci" },
    { mapel: "Matematika", namaSiswa: "Siswa 2", nilai: 80, guru: "Bu Suci" },
    {
      mapel: "B.Indonesia",
      namaSiswa: "Siswa 1",
      nilai: 88,
      guru: "Pak Finthar",
    },
    {
      mapel: "B.Indonesia",
      namaSiswa: "Siswa 2",
      nilai: 85,
      guru: "Pak Finthar",
    },
  ];

  // Data sumatif contoh
  const dataSumatif = [
    { mapel: "PPLG", namaSiswa: "Siswa 1", nilai: 88, guru: "Pak Dimas" },
    { mapel: "PPLG", namaSiswa: "Siswa 2", nilai: 95, guru: "Pak Dimas" },
    { mapel: "Matematika", namaSiswa: "Siswa 1", nilai: 78, guru: "Bu Suci" },
    { mapel: "Matematika", namaSiswa: "Siswa 2", nilai: 85, guru: "Bu Suci" },
    {
      mapel: "B.Indonesia",
      namaSiswa: "Siswa 1",
      nilai: 90,
      guru: "Pak Finthar",
    },
    {
      mapel: "B.Indonesia",
      namaSiswa: "Siswa 2",
      nilai: 87,
      guru: "Pak Finthar",
    },
  ];

  // Simpan ke localStorage
  localStorage.setItem("nilaiFormatif", JSON.stringify(dataFormatif));
  localStorage.setItem("nilaiSumatif", JSON.stringify(dataSumatif));

  // Update tampilan
  updateTampilan();

  // Tampilkan hasil perhitungan di console untuk pengecekan
  console.log("Data Formatif:", dataFormatif);
  console.log("Data Sumatif:", dataSumatif);
  console.log("Hasil Perhitungan:", hitungNilaiAkhir());
}

// Tambahkan tombol test di beranda
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".action-buttons");
  if (container) {
    const btnTest = document.createElement("button");
    btnTest.className = "btn btn-secondary ms-2";
    btnTest.textContent = "Test Data";
    btnTest.onclick = tambahDataTest;
    container.appendChild(btnTest);
  }
  updateTampilan();
});
