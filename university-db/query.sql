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

ALTER TABLE mahasiswa ADD COLUMN umur INTEGER;

INSERT INTO mahasiswa (nim, nama, alamat, jurusan_id, umur) VALUES
    ('TI001', 'Andi Saputra', 'Jl. Merdeka No. 1', 101, 19),
    ('SI002', 'Budi Santoso', 'Jl. Kenangan No. 5', 102, 20),
    ('TE003', 'Citra Dewi', 'Jl. Melati No. 10', 103, 21);

    UPDATE mahasiswa SET umur = 19 WHERE nim = 'TI001';
    UPDATE mahasiswa SET umur = 20 WHERE nim = 'SI002';
    UPDATE mahasiswa SET umur = 18 WHERE nim = 'TE003';

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

    UPDATE matakuliah SET sks = 4 WHERE matakuliah_id = 301;  
    UPDATE matakuliah SET sks = 5 WHERE matakuliah_id = 302; 
    UPDATE matakuliah SET sks = 6 WHERE matakuliah_id = 303;  
    UPDATE matakuliah SET sks = 2 WHERE matakuliah_id = 304;  
    UPDATE matakuliah SET sks = 3 WHERE matakuliah_id = 305;

    UPDATE matakuliah
    SET nama = 'Data Mining'
    WHERE matakuliah_id = 305;

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
    nilai           TEXT,
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY (matakuliah_id) REFERENCES matakuliah(matakuliah_id)
);

INSERT INTO nilai (nilai_id, nim, matakuliah_id, nilai) VALUES
    (501, 'TI001', 301, 'A'),
    (502, 'TI001', 302, 'B'),
    (503, 'SI002', 301, 'C'),
    (504, 'TE003', 303, 'B'),
    (505, 'TE003', 304, 'A');

    UPDATE nilai
    SET matakuliah_id = 305
    WHERE nilai_id = 502;

    UPDATE nilai
    SET nilai = 'D'
    WHERE nilai_id = 503;

    UPDATE nilai 
    SET nilai = 'E' 
    WHERE nilai_id = 502;
    

    -- 1. data mahasiswa beserta jurusan mereka
    SELECT m.nim, m.nama, j.namajurusan
    FROM mahasiswa m
    JOIN jurusan j ON m.jurusan_id = j.jurusan_id;

    --- 2. data mahasiswa yang berumur kurang dari 20 tahun
    SELECT * FROM mahasiswa
    WHERE umur < 20;

    -- 3. data mahasiswa beserta nilai mereka yang mendapatkan nilai A atau B
    SELECT m.nim, m.nama, n.nilai
    FROM mahasiswa m
    JOIN nilai n ON m.nim = n.nim
    WHERE n.nilai IN ('A', 'B');

    -- 4. data mahasiswa yang mengambil matakuliah dengan total SKS kurang dari 10
    SELECT m.nim, m.nama, SUM(k.sks) AS total_sks
    FROM mahasiswa m
    JOIN nilai n ON m.nim = n.nim
    JOIN matakuliah k ON n.matakuliah_id = k.matakuliah_id
    GROUP BY m.nim, m.nama
    HAVING total_sks < 10;

    -- 5. data mahasiswa yang mengambil matakuliah 'Data Mining'
    SELECT m.nim, m.nama
    FROM mahasiswa m
    JOIN nilai n ON m.nim = n.nim
    JOIN matakuliah k ON n.matakuliah_id = k.matakuliah_id
    WHERE k.nama = 'Data Mining';

    -- 6. jumalah mahasiswa yang diajar masing-masing dosen
    SELECT d.nama AS dosen, COUNT(DISTINCT n.nim) AS jumlah_mahasiswa
    FROM dosen d
    JOIN studi s ON d.dosen_id = s.dosen_id
    JOIN matakuliah k ON s.matakuliah_id = k.matakuliah_id
    JOIN nilai n ON k.matakuliah_id = n.matakuliah_id
    GROUP BY d.dosen_id, d.nama;

    -- 7. urutan mahasiswa berdasarkan umur
    SELECT * from mahasiswa
    GROUP BY umur;

    -- 8. data mahasiswa yang mendapatkan nilai D atau E, serta data mahasiswa jurusan dan dosen
    SELECT 
    m.nim, m.nama AS nama_mahasiswa, j.namajurusan,
    mk.nama AS nama_matakuliah, n.nilai,
    d.nama AS nama_dosen
    FROM nilai n
    JOIN mahasiswa m ON n.nim = m.nim
    JOIN jurusan j ON m.jurusan_id = j.jurusan_id
    JOIN matakuliah mk ON n.matakuliah_id = mk.matakuliah_id
    JOIN studi s ON mk.matakuliah_id = s.matakuliah_id
    JOIN dosen d ON s.dosen_id = d.dosen_id
    WHERE n.nilai IN ('D', 'E');






