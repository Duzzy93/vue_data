// json-crud.js
const fs = require("fs");

const filePath = "./users.json";

// 데이터 생성
const users = [
  { id: 1, name: "홍길동" },
  { id: 2, name: "이몽룡" },
];

// 저장
fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

// 읽기
const data = fs.readFileSync(filePath);
const loadedUsers = JSON.parse(data);
console.log("저장된 사용자:", loadedUsers);

// 사용자 추가
loadedUsers.push({ id: 3, name: "성춘향" });
fs.writeFileSync(filePath, JSON.stringify(loadedUsers, null, 2));
console.log("추가 완료");
