// logger.js
const fs = require("fs");
const path = require("path");

function log(message) {
  const now = new Date().toISOString();
  const line = `[${now}] ${message}\n`;

  fs.appendFileSync(path.join(__dirname, "app.log"), line);
  console.log("로그 기록:", line.trim());
}

// 로그 기록 테스트
log("앱이 시작되었습니다.");
log("사용자 로그인 시도");
log("에러 발생: 로그인 실패");
