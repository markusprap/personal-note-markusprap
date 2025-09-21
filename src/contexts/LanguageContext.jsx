import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navbar & General Navigation
    personalNotes: 'Personal Notes',
    allNotes: 'All Notes',
    archives: 'Archives',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    
    // Login Page
    signInToAccount: 'Sign In to Your Account',
    welcomeBack: 'Welcome back! Please sign in to access your personal notes.',
    emailAddress: 'Email Address',
    password: 'Password',
    signIn: 'Sign In',
    signingIn: 'Signing in...',
    dontHaveAccount: "Don't have an account yet?",
    createNewAccount: 'Create New Account',
    
    // Register Page
    createYourAccount: 'Create Your Account',
    joinToday: 'Join us today and start organizing your thoughts with personal notes.',
    dataSecureEncrypted: 'Your data is encrypted and secure.',
    fullName: 'Full Name',
    createAccount: 'Create Account',
    creatingAccount: 'Creating Account...',
    alreadyHaveAccount: 'Already have an account?',
    signInToYourAccount: 'Sign In to Your Account',
    
    // Add Note Page
    addNewNote: 'Add New Note',
    noteTitle: 'Note Title',
    noteContent: 'Note Content',
    createNote: 'Create Note',
    creating: 'Creating...',
    cancel: 'Cancel',
    
    // Note Item Actions
    readMore: 'Read more',
    archive: 'Archive',
    unarchive: 'Unarchive',
    delete: 'Delete',
    edit: 'Edit',
    processing: 'Processing...',
    
    // Status & Categories
    active: 'Active',
    archived: 'Archived',
    
    // Empty States & Messages
    noNotesFound: 'No notes found',
    noActiveNotes: "You don't have any active notes yet. Create your first note!",
    noArchivedNotes: "You don't have any archived notes yet. Archive notes to organize your workspace!",
    useAddButton: 'Use the + button to create your first note',
    showingActiveNotes: 'Showing {{count}} active note{{plural}}',
    noActiveNotesFound: 'No active notes found',
    archiveEmpty: 'Archive is empty',
    
    // Confirmation Dialogs
    confirmCancelAddNote: 'Are you sure you want to cancel? Your changes will be lost.',
    confirmDeleteNote: 'This action cannot be undone. Are you sure you want to delete this note?',
    confirmArchiveNote: 'Are you sure you want to {{action}} this note?',
    discardChanges: 'Discard Changes',
    deleteNote: 'Delete Note',
    noNotesMatchSearch: 'No notes match "{{keyword}}". Try a different search term.',
    noArchivedNotesMatchSearch: 'No archived notes match "{{keyword}}". Try a different search term.',
    viewActiveNotes: 'View Active Notes',
    aboutArchivesDesc: 'Archived notes are hidden from your main workspace but still accessible here. You can:',
    searchArchivedNotes: '🔍 Search through archived notes',
    readArchivedNotes: '📖 Read archived note details',
    unarchiveNotes: '📤 Unarchive notes to make them active again',
    deleteNotesPermantly: '🗑️ Permanently delete notes you no longer need',
    
    // Form Controls & Validation
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    minimumCharsRequired: 'Minimum {{count}} characters required',
    charactersRemaining: '{{count}} characters remaining',
    
    nameTooShort: 'Name must be at least 2 characters long',
    passwordTooShort: 'Password must be at least 6 characters long',
    validationError: 'Validation Error',
    loginFailed: 'Login Failed',
    loginFailedMessage: 'Login failed. Please try again.',
    failedToDeleteNote: 'Failed to delete note. Please try again.',
    
    // 404 Not Found Page
    pageNotFound: 'Oops! Page Not Found',
    pageNotFoundDesc: "The page you're looking for doesn't exist or may have been moved.",
    requestedUrl: 'Requested URL:',
    goToHomepage: 'Go to Homepage',
    goBack: 'Go Back',
    
    // UI Tips & Formatting
    formattingTip: 'Tip: You can use <strong>bold</strong>, <em>italic</em>, and other formatting',
    enterTip: 'Press <kbd>Enter</kbd> for new lines, select text to format',
    success: 'Success',
    
    // Loading States
    loading: 'Loading...',
    loadingNotes: 'Loading your notes...',
    loadingArchivedNotes: 'Loading archived notes...',
    checkingAuth: 'Checking authentication...',
    errorLoadingNotes: 'Error Loading Notes',
    errorLoadingArchivedNotes: 'Error Loading Archived Notes',
    tryAgain: 'Try Again',
    
    // Search & Filter Controls
    searchNotes: 'Search notes by title...',
    searchArchived: 'Search archived notes by title...',
    filterByDate: 'Filter by Date',
    fromDate: 'From Date:',
    toDate: 'To Date:',
    applyFilter: 'Apply Filter',
    reset: 'Reset',
    sortNewest: 'Newest First',
    sortOldest: 'Oldest First',
    
    // Form Placeholders
    enterEmailAddress: 'Enter your email address',
    enterPassword: 'Enter your password',
    enterFullName: 'Enter your full name',
    createStrongPassword: 'Create a strong password',
    confirmPassword: 'Confirm your password',
    enterNoteTitle: 'Enter note title...',
    startWritingNote: 'Start writing your note here... You can use formatting like bold, italic, and line breaks!',
    
    // Button Tooltips
    createNewNote: 'Create new note',
    deleteNotePermanently: 'Delete note permanently',
    clearSearch: 'Clear search',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    
    // Sort Options
    sortByNewest: 'Sort by newest first',
    sortByOldest: 'Sort by oldest first',
    newestFirst: 'Newest First',
    oldestFirst: 'Oldest First',
    
    // Form Validation Messages
    required: 'required',
    pleaseEnterEmail: 'Please enter your email address',
    pleaseEnterPassword: 'Please enter your password',
    pleaseEnterName: 'Please enter your full name',
    pleaseEnterTitle: 'Please enter a note title',
    pleaseEnterContent: 'Please enter note content',
    
    // Success Messages
    welcomeBackUser: 'Welcome back',
    loginSuccessful: 'Login Successful',
    noteCreated: 'Note created successfully!',
    noteDeleted: 'Note deleted successfully!',
    noteArchived: 'Note archived successfully!',
    noteUnarchived: 'Note unarchived successfully!',
    
    // Navigation Actions
    back: 'Back',
    backToNotes: 'Back to Notes',
    viewAllNotes: 'View All Notes',
    viewAllArchives: 'View All Archives',
    quickActions: 'Quick Actions',
    aboutArchives: 'About Archives',
  },
  
  id: {
    // Navbar & Navigasi Umum
    personalNotes: 'Catatan Pribadi',
    allNotes: 'Semua Catatan',
    archives: 'Arsip',
    login: 'Masuk',
    register: 'Daftar',
    logout: 'Keluar',
    
    // Login Page
    signInToAccount: 'Masuk ke Akun Anda',
    welcomeBack: 'Selamat datang kembali! Silakan masuk untuk mengakses catatan pribadi Anda.',
    emailAddress: 'Alamat Email',
    password: 'Kata Sandi',
    signIn: 'Masuk',
    signingIn: 'Sedang masuk...',
    dontHaveAccount: 'Belum punya akun?',
    createNewAccount: 'Buat Akun Baru',
    
    // Register Page
    createYourAccount: 'Buat Akun Anda',
    joinToday: 'Bergabunglah dengan kami hari ini dan mulai mengatur pikiran Anda dengan catatan pribadi.',
    dataSecureEncrypted: 'Data Anda terenkripsi dan aman.',
    fullName: 'Nama Lengkap',
    createAccount: 'Buat Akun',
    creatingAccount: 'Membuat Akun...',
    alreadyHaveAccount: 'Sudah punya akun?',
    signInToYourAccount: 'Masuk ke Akun Anda',
    
    // Add Note Page
    addNewNote: 'Tambah Catatan Baru',
    noteTitle: 'Judul Catatan',
    noteContent: 'Isi Catatan',
    createNote: 'Buat Catatan',
    creating: 'Membuat...',
    cancel: 'Batal',
    
    // Note Item Actions
    readMore: 'Baca selengkapnya',
    archive: 'Arsipkan',
    unarchive: 'Batalkan Arsip',
    delete: 'Hapus',
    edit: 'Edit',
    processing: 'Memproses...',
    
    // Status & Categories
    active: 'Aktif',
    archived: 'Diarsipkan',
    
    // Empty States & Messages
    noNotesFound: 'Tidak ada catatan ditemukan',
    noActiveNotes: 'Anda belum memiliki catatan aktif. Buat catatan pertama Anda!',
    noArchivedNotes: 'Anda belum memiliki catatan yang diarsipkan. Arsipkan catatan untuk mengatur ruang kerja Anda!',
    useAddButton: 'Gunakan tombol + untuk membuat catatan pertama Anda',
    showingActiveNotes: 'Menampilkan {{count}} catatan aktif',
    noActiveNotesFound: 'Tidak ada catatan aktif ditemukan',
    archiveEmpty: 'Arsip kosong',
    
    // Confirmation Dialogs
    confirmCancelAddNote: 'Apakah Anda yakin ingin membatalkan? Perubahan Anda akan hilang.',
    confirmDeleteNote: 'Tindakan ini tidak dapat dibatalkan. Apakah Anda yakin ingin menghapus catatan ini?',
    confirmArchiveNote: 'Apakah Anda yakin ingin {{action}} catatan ini?',
    discardChanges: 'Buang Perubahan',
    deleteNote: 'Hapus Catatan',
    noNotesMatchSearch: 'Tidak ada catatan yang cocok dengan "{{keyword}}". Coba kata kunci lain.',
    noArchivedNotesMatchSearch: 'Tidak ada catatan arsip yang cocok dengan "{{keyword}}". Coba kata kunci lain.',
    viewActiveNotes: 'Lihat Catatan Aktif',
    aboutArchivesDesc: 'Catatan yang diarsipkan disembunyikan dari ruang kerja utama Anda tetapi masih dapat diakses di sini. Anda dapat:',
    searchArchivedNotes: '🔍 Mencari catatan yang diarsipkan',
    readArchivedNotes: '📖 Membaca detail catatan yang diarsipkan',
    unarchiveNotes: '📤 Membatalkan arsip catatan untuk mengaktifkannya kembali',
    deleteNotesPermantly: '🗑️ Menghapus catatan secara permanen yang tidak lagi diperlukan',
    
    // Form Controls & Validation
    showPassword: 'Tampilkan kata sandi',
    hidePassword: 'Sembunyikan kata sandi',
    minimumCharsRequired: 'Minimum {{count}} karakter diperlukan',
    charactersRemaining: '{{count}} karakter tersisa',
    
    nameTooShort: 'Nama harus minimal 2 karakter',
    passwordTooShort: 'Kata sandi harus minimal 6 karakter',
    validationError: 'Kesalahan Validasi',
    loginFailed: 'Login Gagal',
    loginFailedMessage: 'Login gagal. Silakan coba lagi.',
    failedToDeleteNote: 'Gagal menghapus catatan. Silakan coba lagi.',
    
    // 404 Not Found Page
    pageNotFound: 'Ups! Halaman Tidak Ditemukan',
    pageNotFoundDesc: 'Halaman yang Anda cari tidak ada atau mungkin telah dipindahkan.',
    requestedUrl: 'URL yang Diminta:',
    goToHomepage: 'Ke Beranda',
    goBack: 'Kembali',
    
    // UI Tips & Formatting
    formattingTip: 'Tips: Anda dapat menggunakan <strong>tebal</strong>, <em>miring</em>, dan format lainnya',
    enterTip: 'Tekan <kbd>Enter</kbd> untuk baris baru, pilih teks untuk memformat',
    success: 'Berhasil',
    
    // Loading States
    loading: 'Memuat...',
    loadingNotes: 'Memuat catatan Anda...',
    loadingArchivedNotes: 'Memuat catatan yang diarsipkan...',
    checkingAuth: 'Memeriksa autentikasi...',
    errorLoadingNotes: 'Error Memuat Catatan',
    errorLoadingArchivedNotes: 'Error Memuat Catatan Arsip',
    tryAgain: 'Coba Lagi',
    
    // Search & Filter Controls
    searchNotes: 'Cari catatan berdasarkan judul...',
    searchArchived: 'Cari catatan arsip berdasarkan judul...',
    filterByDate: 'Filter berdasarkan Tanggal',
    fromDate: 'Dari Tanggal:',
    toDate: 'Sampai Tanggal:',
    applyFilter: 'Terapkan Filter',
    reset: 'Reset',
    sortNewest: 'Terbaru Dulu',
    sortOldest: 'Terlama Dulu',
    
    // Form Placeholders
    enterEmailAddress: 'Masukkan alamat email Anda',
    enterPassword: 'Masukkan kata sandi Anda',
    enterFullName: 'Masukkan nama lengkap Anda',
    createStrongPassword: 'Buat kata sandi yang kuat',
    confirmPassword: 'Konfirmasi kata sandi Anda',
    enterNoteTitle: 'Masukkan judul catatan...',
    startWritingNote: 'Mulai menulis catatan Anda di sini... Anda dapat menggunakan format seperti tebal, miring, dan baris baru!',
    
    // Button Tooltips
    createNewNote: 'Buat catatan baru',
    deleteNotePermanently: 'Hapus catatan secara permanen',
    clearSearch: 'Hapus pencarian',
    switchToLight: 'Ganti ke mode terang',
    switchToDark: 'Ganti ke mode gelap',
    
    // Sort Options
    sortByNewest: 'Urutkan berdasarkan terbaru',
    sortByOldest: 'Urutkan berdasarkan terlama',
    newestFirst: 'Terbaru Dulu',
    oldestFirst: 'Terlama Dulu',
    
    // Form Validation Messages
    required: 'wajib',
    pleaseEnterEmail: 'Silakan masukkan alamat email Anda',
    pleaseEnterPassword: 'Silakan masukkan kata sandi Anda',
    pleaseEnterName: 'Silakan masukkan nama lengkap Anda',
    pleaseEnterTitle: 'Silakan masukkan judul catatan',
    pleaseEnterContent: 'Silakan masukkan isi catatan',
    
    // Success Messages
    welcomeBackUser: 'Selamat datang kembali',
    loginSuccessful: 'Login Berhasil',
    noteCreated: 'Catatan berhasil dibuat!',
    noteDeleted: 'Catatan berhasil dihapus!',
    noteArchived: 'Catatan berhasil diarsipkan!',
    noteUnarchived: 'Catatan berhasil dibatalkan dari arsip!',
    
    // Navigation Actions
    back: 'Kembali',
    backToNotes: 'Kembali ke Catatan',
    viewAllNotes: 'Lihat Semua Catatan',
    viewAllArchives: 'Lihat Semua Arsip',
    quickActions: 'Aksi Cepat',
    aboutArchives: 'Tentang Arsip',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'id')) {
      return savedLanguage;
    }
    
    return 'id';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'id' ? 'en' : 'id');
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    toggleLanguage,
    t,
    isIndonesian: language === 'id',
    isEnglish: language === 'en',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};