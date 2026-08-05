// =====================================================
// KONFIGURASI TERMINAL (Xterm.js)
// =====================================================
const term = new Terminal({
    cursorBlink: true,
    fontSize: 14,
    fontFamily: 'Consolas, "Courier New", monospace', // Font monospace rapi
    letterSpacing: 0,
    lineHeight: 1.2,
    theme: {
        background: '#0d1117',
        foreground: '#c9d1d9',
        cursor: '#58a6ff',
        black: '#484f58',
        red: '#ff7b72',
        green: '#3fb950',
        yellow: '#d29922',
        blue: '#58a6ff',
        magenta: '#bc8cff',
        cyan: '#39c5cf',
        white: '#b1bac4'
    }
});

const fitAddon = new FitAddon.FitAddon();
term.loadAddon(fitAddon);

const terminalContainer = document.getElementById('terminal');
term.open(terminalContainer);

// Penyesuaian Ukuran Container
setTimeout(() => {
    fitAddon.fit();
}, 100);

window.addEventListener('resize', () => {
    fitAddon.fit();
});

// =====================================================
// DATABASE & PENYIMPANAN LOCALSTORAGE
// =====================================================
const STORAGE_KEY = "DATA_SISWA_TERMINAL";

// Ambil data dari LocalStorage, jika belum ada pakai data default
let dataSiswa = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
    { nis: "1001", nama: "Bill Gates", kelas: "XII RPL", jk: "L", alamat: "Wonosobo" },
    { nis: "1002", nama: "Elon Musk", kelas: "XII RPL", jk: "L", alamat: "Wonosobo" }
];

// Fungsi Helper untuk Simpan Data Permanen di Browser
function simpanKeStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataSiswa));
}

// =====================================================
// STATE & VARIABEL SIMULATOR
// =====================================================
let inputBuffer = "";
let currentMode = "shell"; // State mode: 'shell', 'menu', 'tambah', 'cari', 'edit', 'hapus'
let stepState = ""; 
let tempSiswa = {};

// Banner Pembuka Singkat
term.writeln("\x1b[32mSystem Ready.\x1b[0m Ketik \x1b[33m'y'\x1b[0m untuk menjalankan program (atau \x1b[33m'ls'\x1b[0m).");
promptShell();

function promptShell() {
    term.write("\r\n\x1b[34muser@web-terminal\x1b[0m:\x1b[32m~\x1b[0m$ ");
}

// =====================================================
// EVENT LISTENER KEYBOARD
// =====================================================
term.onData(e => {
    switch (e) {
        case '\r': // Enter
            term.write('\r\n');
            handleInput(inputBuffer.trim());
            inputBuffer = "";
            break;
        case '\u007F': // Backspace
            if (inputBuffer.length > 0) {
                inputBuffer = inputBuffer.substr(0, inputBuffer.length - 1);
                term.write('\b \b');
            }
            break;
        default:
            if (e >= ' ' || e === '\t') {
                inputBuffer += e;
                term.write(e);
            }
    }
});

// =====================================================
// LOGIKA UTAMA ROUTING INPUT
// =====================================================
function handleInput(input) {
    let cmd = input.toLowerCase();

    if (currentMode === "shell") {
        // Cukup ketik 'y' (atau '1' / nama script) untuk me-run program
        if (cmd === "y" || cmd === "1" || cmd === "python manajemen_siswa.py" || cmd === "python3 manajemen_siswa.py") {
            currentMode = "menu";
            tampilkanMenu();
        } else if (cmd === "ls") {
            term.writeln("manajemen_siswa.py   data_siswa.json");
            promptShell();
        } else if (cmd === "clear") {
            term.clear();
            promptShell();
        } else if (cmd !== "") {
            term.writeln(`Command not found: ${input}`);
            promptShell();
        } else {
            promptShell();
        }
    } else if (currentMode === "menu") {
        handleMenuSelection(input);
    } else if (currentMode === "tambah") {
        handleTambahProcess(input);
    } else if (currentMode === "cari") {
        handleCariProcess(input);
    } else if (currentMode === "edit") {
        handleEditProcess(input);
    } else if (currentMode === "hapus") {
        handleHapusProcess(input);
    }
}

// =====================================================
// MENU UTAMA
// =====================================================
function tampilkanMenu() {
    term.writeln("\r\n=============================================");
    term.writeln("     APLIKASI MANAJEMEN SISWA (CRUD)");
    term.writeln("=============================================");
    term.writeln("1. Tambah Data Siswa");
    term.writeln("2. Lihat Semua Data Siswa");
    term.writeln("3. Cari Data Siswa");
    term.writeln("4. Edit Data Siswa");
    term.writeln("5. Hapus Data Siswa");
    term.writeln("0. Keluar");
    term.writeln("=============================================");
    term.write("Pilih menu (0-5): ");
}

function handleMenuSelection(choice) {
    switch (choice) {
        case "1":
            currentMode = "tambah";
            stepState = "nis";
            tempSiswa = {};
            term.writeln("\r\n--- TAMBAH DATA SISWA ---");
            term.write("NIS            : ");
            break;

        case "2":
            term.writeln("\r\n--- DAFTAR SEMUA SISWA ---");
            if (dataSiswa.length === 0) {
                term.writeln("(Belum ada data siswa)");
            } else {
                term.writeln("NIS       Nama                Kelas     JK   Alamat");
                term.writeln("------------------------------------------------------------------");
                dataSiswa.forEach(s => {
                    term.writeln(`${s.nis.padEnd(10)}${s.nama.padEnd(20)}${s.kelas.padEnd(10)}${s.jk.padEnd(5)}${s.alamat}`);
                });
            }
            tampilkanMenu();
            break;

        case "3":
            currentMode = "cari";
            term.writeln("\r\n--- CARI SISWA ---");
            term.write("Masukkan NIS atau Nama siswa: ");
            break;

        case "4":
            currentMode = "edit";
            stepState = "minta_nis";
            term.writeln("\r\n--- EDIT DATA SISWA ---");
            term.write("Masukkan NIS siswa yang akan diedit: ");
            break;

        case "5":
            currentMode = "hapus";
            stepState = "minta_nis";
            term.writeln("\r\n--- HAPUS DATA SISWA ---");
            term.write("Masukkan NIS siswa yang akan dihapus: ");
            break;

        case "0":
            term.writeln("Terima kasih, sampai jumpa! 👋");
            currentMode = "shell";
            promptShell();
            break;

        default:
            term.writeln("\x1b[31m❌ Pilihan tidak valid, silakan coba lagi.\x1b[0m");
            tampilkanMenu();
    }
}

// =====================================================
// FUNGSI CRUD (TAMBAH, CARI, EDIT, HAPUS)
// =====================================================

// 1. TAMBAH SISWA
function handleTambahProcess(val) {
    if (stepState === "nis") {
        if (dataSiswa.some(s => s.nis === val)) {
            term.writeln(`\x1b[31m❌ NIS '${val}' sudah terdaftar!\x1b[0m`);
            currentMode = "menu";
            tampilkanMenu();
            return;
        }
        tempSiswa.nis = val;
        stepState = "nama";
        term.write("Nama Lengkap   : ");
    } else if (stepState === "nama") {
        tempSiswa.nama = val;
        stepState = "kelas";
        term.write("Kelas          : ");
    } else if (stepState === "kelas") {
        tempSiswa.kelas = val;
        stepState = "jk";
        term.write("Jenis Kelamin (L/P): ");
    } else if (stepState === "jk") {
        tempSiswa.jk = val.toUpperCase();
        stepState = "alamat";
        term.write("Alamat         : ");
    } else if (stepState === "alamat") {
        tempSiswa.alamat = val;
        dataSiswa.push(tempSiswa);
        simpanKeStorage(); // Simpan ke LocalStorage
        term.writeln("\x1b[32m✅ Data siswa berhasil ditambahkan!\x1b[0m");
        currentMode = "menu";
        tampilkanMenu();
    }
}

// 2. CARI SISWA
function handleCariProcess(kw) {
    let kwLower = kw.toLowerCase();
    let hasil = dataSiswa.filter(s => s.nis.toLowerCase().includes(kwLower) || s.nama.toLowerCase().includes(kwLower));

    if (hasil.length === 0) {
        term.writeln("\x1b[31m❌ Data siswa tidak ditemukan.\x1b[0m");
    } else {
        term.writeln(`\r\nDitemukan ${hasil.length} data:`);
        hasil.forEach(s => {
            term.writeln(`- NIS: ${s.nis} | Nama: ${s.nama} | Kelas: ${s.kelas} | JK: ${s.jk} | Alamat: ${s.alamat}`);
        });
    }
    currentMode = "menu";
    tampilkanMenu();
}

// 3. EDIT SISWA
function handleEditProcess(val) {
    if (stepState === "minta_nis") {
        let index = dataSiswa.findIndex(s => s.nis === val);
        if (index === -1) {
            term.writeln(`\x1b[31m❌ Siswa dengan NIS '${val}' tidak ditemukan.\x1b[0m`);
            currentMode = "menu";
            tampilkanMenu();
            return;
        }
        tempSiswa = dataSiswa[index];
        stepState = "nama_baru";
        term.writeln("Kosongkan input jika tidak ingin mengubah data tsb.");
        term.write(`Nama baru [${tempSiswa.nama}]: `);
    } else if (stepState === "nama_baru") {
        if (val) tempSiswa.nama = val;
        stepState = "kelas_baru";
        term.write(`Kelas baru [${tempSiswa.kelas}]: `);
    } else if (stepState === "kelas_baru") {
        if (val) tempSiswa.kelas = val;
        stepState = "jk_baru";
        term.write(`Jenis Kelamin baru [${tempSiswa.jk}]: `);
    } else if (stepState === "jk_baru") {
        if (val) tempSiswa.jk = val.toUpperCase();
        stepState = "alamat_baru";
        term.write(`Alamat baru [${tempSiswa.alamat}]: `);
    } else if (stepState === "alamat_baru") {
        if (val) tempSiswa.alamat = val;
        simpanKeStorage(); // Simpan perubahan ke LocalStorage
        term.writeln("\x1b[32m✅ Data siswa berhasil diperbarui!\x1b[0m");
        currentMode = "menu";
        tampilkanMenu();
    }
}

// 4. HAPUS SISWA
function handleHapusProcess(val) {
    if (stepState === "minta_nis") {
        let index = dataSiswa.findIndex(s => s.nis === val);
        if (index === -1) {
            term.writeln(`\x1b[31m❌ Siswa dengan NIS '${val}' tidak ditemukan.\x1b[0m`);
            currentMode = "menu";
            tampilkanMenu();
            return;
        }
        tempSiswa = { index: index, nama: dataSiswa[index].nama };
        stepState = "konfirmasi";
        term.write(`Yakin hapus data '${tempSiswa.nama}'? (y/n): `);
    } else if (stepState === "konfirmasi") {
        if (val.toLowerCase() === "y") {
            dataSiswa.splice(tempSiswa.index, 1);
            simpanKeStorage(); // Simpan perubahan ke LocalStorage
            term.writeln("\x1b[32m✅ Data siswa berhasil dihapus!\x1b[0m");
        } else {
            term.writeln("Dibatalkan.");
        }
        currentMode = "menu";
        tampilkanMenu();
    }
}