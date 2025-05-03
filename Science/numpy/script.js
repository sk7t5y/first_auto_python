let editingIndex = null;

const memoInput = document.getElementById("memoInput");
const memoList = document.getElementById("memoList");
const searchInput = document.getElementById("searchInput");

window.onload = function () {
  renderMemos();
};

function saveMemo() {
  const text = memoInput.value.trim();
  if (text === "") return;

  let memos = JSON.parse(localStorage.getItem("memos")) || [];

  if (editingIndex !== null) {
    memos[editingIndex] = text;
    editingIndex = null;
  } else {
    memos.push(text);
  }

  localStorage.setItem("memos", JSON.stringify(memos));
  memoInput.value = "";
  renderMemos();
}

function renderMemos(filter = "") {
  const memos = JSON.parse(localStorage.getItem("memos")) || [];
  memoList.innerHTML = "";

  memos.forEach((memo, index) => {
    if (memo.toLowerCase().includes(filter.toLowerCase())) {
      const note = document.createElement("div");
      note.className = "note";

      note.innerHTML = `
        <div>${memo}</div>
        <div style="margin-top: 10px;">
          <button class="edit-btn" onclick="editMemo(${index})">편집</button>
          <button class="delete-btn" onclick="deleteMemo(${index})">삭제</button>
        </div>
      `;
      memoList.appendChild(note);
    }
  });
}

function deleteMemo(index) {
  let memos = JSON.parse(localStorage.getItem("memos")) || [];
  memos.splice(index, 1);
  localStorage.setItem("memos", JSON.stringify(memos));
  renderMemos(searchInput.value);
}

function editMemo(index) {
  const memos = JSON.parse(localStorage.getItem("memos")) || [];
  memoInput.value = memos[index];
  editingIndex = index;
}

function searchMemos() {
  const filter = searchInput.value;
  renderMemos(filter);
}