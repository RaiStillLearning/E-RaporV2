// Data profil pengguna
let userData = {
  nama: "Dimas Ardianto",
  nip: "198507262019031004",
  jabatan: "Guru Mata Pelajaran PPLG",
  email: "dimas.ardianto@ghamacaraka.sch.id",
  telepon: "+62 812-3456-7890",
  alamat: "Jl. Raya Bandung No. 123, Bandung, Jawa Barat",
  foto: "assets/default-profile.png",
};

// Fungsi untuk menangani perubahan foto profil
function handleProfilePicChange(event) {
  const file = event.target.files[0];
  if (file) {
    // Validasi tipe file
    if (!file.type.startsWith("image/")) {
      showNotification("Mohon upload file gambar yang valid", "danger");
      return;
    }

    // Validasi ukuran file (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showNotification("Ukuran file terlalu besar (maksimal 5MB)", "danger");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("profileImage").src = e.target.result;
      userData.foto = e.target.result;
      showNotification("Foto profil berhasil diubah!", "success");
    };
    reader.readAsDataURL(file);
  }
}

// Fungsi untuk mengubah mode tampilan menjadi mode edit
function enableEditMode() {
  const infoValues = document.querySelectorAll(".info-value");
  const editButton = document.querySelector(".edit-button");

  infoValues.forEach((element, index) => {
    const currentValue = element.textContent.trim();
    const fieldName = Object.keys(userData)[index];

    // Skip jika fieldName adalah 'foto'
    if (fieldName === "foto") return;

    // Buat input sesuai dengan jenis data
    let input;
    if (fieldName === "alamat") {
      input = document.createElement("textarea");
      input.rows = 3;
    } else if (fieldName === "email") {
      input = document.createElement("input");
      input.type = "email";
    } else if (fieldName === "telepon") {
      input = document.createElement("input");
      input.type = "tel";
      input.pattern = "[0-9+()-]*";
    } else if (fieldName === "nip") {
      input = document.createElement("input");
      input.type = "text";
      input.pattern = "[0-9]*";
    } else {
      input = document.createElement("input");
      input.type = "text";
    }

    // Set properti input
    input.className = "form-control";
    input.value = currentValue;
    input.name = fieldName;
    input.required = true;

    // Tambahkan validasi
    if (fieldName === "email") {
      input.addEventListener("input", function () {
        this.setCustomValidity("");
        if (!this.checkValidity()) {
          this.setCustomValidity("Mohon masukkan alamat email yang valid");
        }
      });
    }

    // Ganti teks dengan input
    element.innerHTML = "";
    element.appendChild(input);
  });

  // Ubah tombol Edit menjadi Simpan dan Batal
  const buttonContainer = editButton.parentElement;
  buttonContainer.innerHTML = `
        <button class="edit-button save-button me-2" onclick="saveChanges()">
            <i class="fas fa-save me-2"></i>Simpan
        </button>
        <button class="edit-button cancel-button" onclick="cancelEdit()" style="background-color: #dc3545;">
            <i class="fas fa-times me-2"></i>Batal
        </button>
    `;
}

// Fungsi untuk validasi input
function validateInputs() {
  const inputs = document.querySelectorAll(
    ".info-value input, .info-value textarea"
  );
  let isValid = true;
  let errorMessage = "";

  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      isValid = false;
      errorMessage =
        input.validationMessage || "Mohon isi semua field dengan benar";
    }

    // Validasi khusus untuk email
    if (input.type === "email" && !input.value.includes("@")) {
      isValid = false;
      errorMessage = "Mohon masukkan alamat email yang valid";
    }

    // Validasi khusus untuk NIP
    if (input.name === "nip" && !/^\d+$/.test(input.value)) {
      isValid = false;
      errorMessage = "NIP hanya boleh berisi angka";
    }

    // Validasi nomor telepon
    if (input.name === "telepon" && !/^[0-9+()-\s]*$/.test(input.value)) {
      isValid = false;
      errorMessage = "Format nomor telepon tidak valid";
    }
  });

  return { isValid, errorMessage };
}

// Fungsi untuk menyimpan perubahan
function saveChanges() {
  const validation = validateInputs();
  if (!validation.isValid) {
    showNotification(validation.errorMessage, "danger");
    return;
  }

  const inputs = document.querySelectorAll(
    ".info-value input, .info-value textarea"
  );

  // Update data
  inputs.forEach((input) => {
    const fieldName = input.name;
    if (fieldName !== "foto") {
      userData[fieldName] = input.value;
    }
  });

  // Kembalikan ke mode tampilan
  restoreViewMode();

  // Tampilkan notifikasi
  showNotification("Profil berhasil diperbarui!", "success");
}

// Fungsi untuk membatalkan edit
function cancelEdit() {
  restoreViewMode();
  showNotification("Perubahan dibatalkan", "info");
}

// Fungsi untuk mengembalikan mode tampilan
function restoreViewMode() {
  const infoValues = document.querySelectorAll(".info-value");
  const buttonContainer = document.querySelector(".save-button").parentElement;

  // Kembalikan nilai-nilai ke tampilan teks
  infoValues.forEach((element, index) => {
    const fieldName = Object.keys(userData)[index];
    if (fieldName !== "foto") {
      element.innerHTML = userData[fieldName];
    }
  });

  // Kembalikan tombol edit
  buttonContainer.innerHTML = `
        <button class="edit-button" onclick="enableEditMode()">
            <i class="fas fa-edit me-2"></i>Edit Profil
        </button>
    `;
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message, type) {
  // Buat elemen notifikasi
  const notification = document.createElement("div");
  notification.className = `alert alert-${type} notification`;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        padding: 15px 25px;
        border-radius: 5px;
        animation: slideIn 0.5s ease-out;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
  notification.innerHTML = `
        <div style="display: flex; align-items: center;">
            <i class="fas ${
              type === "success"
                ? "fa-check-circle"
                : type === "danger"
                ? "fa-exclamation-circle"
                : "fa-info-circle"
            } me-2"></i>
            ${message}
        </div>
    `;

  // Tambahkan ke body
  document.body.appendChild(notification);

  // Hilangkan notifikasi setelah 3 detik
  setTimeout(() => {
    notification.style.animation = "slideOut 0.5s ease-out";
    setTimeout(() => {
      notification.remove();
    }, 450);
  }, 3000);
}

// CSS Animations
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Event listener untuk tombol edit
document.addEventListener("DOMContentLoaded", function () {
  const editButton = document.querySelector(".edit-button");
  if (editButton) {
    editButton.addEventListener("click", enableEditMode);
  }
});

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
