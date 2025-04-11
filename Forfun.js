document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("dataTable");
  const rows = table.querySelectorAll("tbody tr");
  const labels = []; // Untuk 'Mata Pelajaran'
  const pesertaDidik = []; // Untuk 'Jmi Peserta Didik'
  const pesertaDinilai = []; // Untuk 'Jmi Peserta Didik Dinilai'

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

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    labels.push(cells[1].innerText); // Kolom Mata Pelajaran (index 1)
    pesertaDidik.push(parseInt(cells[4].innerText, 10)); // Kolom Jmi Peserta Didik (index 4)
    pesertaDinilai.push(parseInt(cells[5].innerText, 10)); // Kolom Jmi Peserta Didik Dinilai (index 5)
  });

  // Buat chart dengan Chart.js
  const ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Jmi Peserta Didik",
          data: pesertaDidik,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Jmi Peserta Didik Dinilai",
          data: pesertaDinilai,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
