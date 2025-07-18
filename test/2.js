// file-read-write.js
const fs = require("fs");

const filePath = "./message.txt";
const message = "Node.js 파일 시스템 예제입니다.\n";

// 파일 쓰기
fs.writeFile(filePath, message, (err) => {
  if (err) return console.error("쓰기 실패:", err);

  // 파일 읽기
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) return console.error("읽기 실패:", err);
    console.log("파일 내용:", data);
  });
});
