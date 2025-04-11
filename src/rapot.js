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

function printDiv(divId) {
  // Ambil elemen div yang akan dicetak
  const content = document.getElementById(divId);

  // Clone konten untuk dimanipulasi tanpa mengubah aslinya
  const printContent = content.cloneNode(true);

  // Ganti semua elemen select dengan span yang berisi teks pilihan
  const selects = printContent.querySelectorAll("select");
  selects.forEach((select) => {
    const span = document.createElement("span");
    // Pastikan ada opsi yang dipilih; jika tidak, tampilkan placeholder
    const selectedText = select.options[select.selectedIndex]
      ? select.options[select.selectedIndex].text
      : "";
    span.textContent = selectedText;
    // Ganti select dengan span
    select.parentNode.replaceChild(span, select);
  });

  // Simpan isi body asli
  const originalContents = document.body.innerHTML;
  // Ganti body dengan konten yang ingin dicetak
  document.body.innerHTML = printContent.innerHTML;

  // Panggil print
  window.print();

  // Kembalikan isi body ke semula
  document.body.innerHTML = originalContents;
}
