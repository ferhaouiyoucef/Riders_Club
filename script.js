const form = document.getElementById("studentForm");
const listContainer = document.getElementById("studentList");
const searchInput = document.getElementById("search");
const exportBtn = document.getElementById("exportExcel");
const photoInput = document.getElementById("photo");
const photoPreview = document.getElementById("photoPreview");

let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;

// Photo preview handler
photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      photoPreview.src = reader.result;
      photoPreview.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  } else {
    photoPreview.classList.add("hidden");
  }
});

// Display students with modern cards
function displayStudents(filter = "") {
  listContainer.innerHTML = "";
  
  const filtered = students.filter(s =>
    Object.values(s).some(value => 
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  );

  if (filtered.length === 0) {
    listContainer.innerHTML = `
      <div class="col-span-full py-12 text-center">
        <i data-feather="users" class="w-12 h-12 mx-auto text-gray-400"></i>
        <h3 class="mt-2 text-lg font-medium text-gray-900">No students found</h3>
        <p class="mt-1 text-sm text-gray-500">Try adding some students or adjusting your search</p>
      </div>
    `;
    feather.replace();
    return;
  }

  filtered.forEach((s, index) => {
    const card = document.createElement("div");
    card.className = "student-card bg-white rounded-xl shadow-md overflow-hidden border border-gray-100";
    card.innerHTML = `
      <div class="p-4">
        <div class="flex items-center space-x-4 mb-4">
          <img src="${s.photo || 'https://via.placeholder.com/100?text=No+Photo'}" 
               alt="Profile" class="w-16 h-16 rounded-full object-cover border-2 border-indigo-100">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">${s.prenom} ${s.nom}</h3>
            <p class="text-sm text-gray-500">${s.matricule}</p>
          </div>
        </div>
        
        <div class="space-y-2 text-sm">
          <div class="flex items-center">
            <i data-feather="mail" class="w-4 h-4 text-gray-500 mr-2"></i>
            <span>${s.email}</span>
          </div>
          <div class="flex items-center">
            <i data-feather="home" class="w-4 h-4 text-gray-500 mr-2"></i>
            <span>${s.adresse}</span>
          </div>
          <div class="flex items-center">
            <i data-feather="phone" class="w-4 h-4 text-gray-500 mr-2"></i>
            <span>${s.telephone}</span>
          </div>
        </div>
        
        <div class="mt-4 flex space-x-2">
          <button onclick="editStudent(${index})" class="flex-1 py-2 px-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-sm font-medium rounded-lg transition flex items-center justify-center">
            <i data-feather="edit" class="w-4 h-4 mr-1"></i> Edit
          </button>
          <button onclick="deleteStudent(${index})" class="flex-1 py-2 px-3 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium rounded-lg transition flex items-center justify-center">
            <i data-feather="trash-2" class="w-4 h-4 mr-1"></i> Delete
          </button>
        </div>
      </div>
    `;
    listContainer.appendChild(card);
  });
  
  feather.replace();
}

// Form submission handler
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const student = {
    nom: document.getElementById("nom").value.trim(),
    prenom: document.getElementById("prenom").value.trim(),
    matricule: document.getElementById("matricule").value.trim(),
    email: document.getElementById("email").value.trim(),
    adresse: document.getElementById("adresse").value.trim(),
    telephone: document.getElementById("telephone").value.trim(),
    photo: photoPreview.src || 'https://via.placeholder.com/100?text=No+Photo'
  };

  try {
    if (editIndex !== null) {
      students[editIndex] = student;
      editIndex = null;
      showToast('Student updated successfully!', 'success');
    } else {
      students.push(student);
      showToast('Student added successfully!', 'success');
    }

    localStorage.setItem("students", JSON.stringify(students));
    form.reset();
    photoPreview.classList.add("hidden");
    displayStudents();
  } catch (error) {
    showToast('Error saving student: ' + error.message, 'error');
  }
});

// Edit student function
function editStudent(index) {
  const s = students[index];
  document.getElementById("nom").value = s.nom;
  document.getElementById("prenom").value = s.prenom;
  document.getElementById("matricule").value = s.matricule;
  document.getElementById("email").value = s.email;
  document.getElementById("adresse").value = s.adresse;
  document.getElementById("telephone").value = s.telephone;
  photoPreview.src = s.photo;
  photoPreview.classList.remove("hidden");
  editIndex = index;
  
  showToast(`Editing: ${s.prenom} ${s.nom}`, 'info');
  form.scrollIntoView({ behavior: 'smooth' });
}

// Delete student function
function deleteStudent(index) {
  if (confirm(`Are you sure you want to delete ${students[index].prenom} ${students[index].nom}?`)) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
    showToast('Student deleted!', 'warning');
  }
}

// Search functionality
searchInput.addEventListener("input", (e) => {
  displayStudents(e.target.value);
});

// Excel export functionality
exportBtn.addEventListener("click", () => {
  if (students.length === 0) {
    showToast('No data to export!', 'error');
    return;
  }

  const data = students.map(s => ({
    'First Name': s.prenom,
    'Last Name': s.nom,
    'Student ID': s.matricule,
    'Email': s.email,
    'Address': s.adresse,
    'Phone': s.telephone
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, "Students");
  XLSX.writeFile(wb, "students.xlsx");
  showToast('Export completed!', 'success');
});

// Toast notification function
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  const colors = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700'
  };
  
  toast.className = `${colors[type]} border px-4 py-3 rounded fixed bottom-4 right-4 shadow-lg z-50 transition-all duration-300 transform translate-y-10 opacity-0`;
  toast.innerHTML = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.remove('translate-y-10', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-10', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Initialize display
displayStudents();