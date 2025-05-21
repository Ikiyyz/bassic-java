-- TABEL JURUSAN
CREATE TABLE jurusan (
    jurusan_id   INTEGER PRIMARY KEY,
    namajurusan  TEXT
);

INSERT INTO jurusan (jurusan_id, namajurusan) VALUES
    (101, 'Teknik Informatika'),
    (102, 'Sistem Informasi'),
    (103, 'Teknik Elektro');

-- TABEL MAHASISWA
CREATE TABLE mahasiswa (
    nim         TEXT PRIMARY KEY,
    nama        TEXT,
    alamat      TEXT,
    jurusan_id  INTEGER,
    FOREIGN KEY (jurusan_id) REFERENCES jurusan(jurusan_id)
);

INSERT INTO mahasiswa (nim, nama, alamat, jurusan_id) VALUES
    ('TI001', 'Andi Saputra', 'Jl. Merdeka No. 1', 101),
    ('SI002', 'Budi Santoso', 'Jl. Kenangan No. 5', 102),
    ('TE003', 'Citra Dewi', 'Jl. Melati No. 10', 103);

-- TABEL DOSEN
CREATE TABLE dosen (
    dosen_id  INTEGER PRIMARY KEY,
    nama      TEXT
);

INSERT INTO dosen (dosen_id, nama) VALUES
    (201, 'Dr. Ahmad Fauzi'),
    (202, 'Prof. Siti Aminah'),
    (203, 'Ir. Budi Hartono');

-- TABEL MATAKULIAH
CREATE TABLE matakuliah (
    matakuliah_id  INTEGER PRIMARY KEY,
    nama           TEXT,
    sks            INTEGER
);

INSERT INTO matakuliah (matakuliah_id, nama, sks) VALUES
    (301, 'Pemrograman Dasar', 3),
    (302, 'Basis Data', 3),
    (303, 'Jaringan Komputer', 3),
    (304, 'Sistem Operasi', 3),
    (305, 'Analisis dan Perancangan Sistem', 3);

-- TABEL STUDI (relasi dosen - matakuliah) many-to-many
CREATE TABLE studi (
    studi_id        INTEGER PRIMARY KEY,
    dosen_id        INTEGER,
    matakuliah_id   INTEGER,
    FOREIGN KEY (dosen_id) REFERENCES dosen(dosen_id),
    FOREIGN KEY (matakuliah_id) REFERENCES matakuliah(matakuliah_id)
);

INSERT INTO studi (studi_id, dosen_id, matakuliah_id) VALUES
    (401, 201, 301),
    (402, 202, 302),
    (403, 203, 303),
    (404, 201, 304),
    (405, 202, 305);

-- TABEL NILAI (relasi mahasiswa - matakuliah) many-to-many
CREATE TABLE nilai (
    nilai_id        INTEGER PRIMARY KEY,
    nim             TEXT,
    matakuliah_id   INTEGER,
    nilai           INTEGER,
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY (matakuliah_id) REFERENCES matakuliah(matakuliah_id)
);

INSERT INTO nilai (nilai_id, nim, matakuliah_id, nilai) VALUES
    (501, 'TI001', 301, 85),
    (502, 'TI001', 302, 90),
    (503, 'SI002', 301, 78),
    (504, 'SI002', 303, 88),
    (505, 'TE003', 302, 92),
    (506, 'TE003', 304, 80);
