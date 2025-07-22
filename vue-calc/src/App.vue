<script>
export default {
  data() {
    return {
      output: null, // 화면에 표시되어 사용자에게 노출되는 값
      prev: null, // 이전에 입력된 값
      cur: null, // 현재 입력된 값
      operator: null, // 연산자
      history: [], // 계산 이력 저장 배열
      expression: '',
      isDark: false,
      operatorActions: {
        // 사칙 연산을 수행하는 함수를 각각의 객체로 정의
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
      },
      advancedActions: {
        'x²': a => a ** 2,
        '√': a => Math.sqrt(a),
        'log': a => Math.log10(a),
      },
    };
  },
  methods: {
    clear() {
      // 초기화 로직을 초기화 함수로 분리
      this.output = null;
      this.prev = null;
      this.cur = null;
      this.operator = null;
    },
    calculate(n) {
      if (!this.cur && !this.prev) {
        alert('숫자를 먼저 입력하세요.');
        return;
      }

      if (this.operator !== '' && !this.cur) {
        alert('사칙연산 기호를 연달아 누를 수 없습니다.');
        return;
      }

      // 현재 입력을 숫자로 변환
      this.cur = Number(this.cur);

      // ✅ expression 업데이트 (수식 기록)
      this.expression += `${this.cur}`;

      if (this.operator !== null) {
        const result = this.operatorActions[this.operator](this.prev, this.cur);

        if (n === '=') {
          this.output = result;

          // ✅ 결과 저장: 입력 수식을 기반으로 저장
          this.expression += ` ${this.cur}`;  // 마지막 숫자까지 누적
          const expression = `${this.expression} = ${result}`;
          this.history.unshift(expression); // 가장 앞에 저장

          // 다음 연산을 위한 초기화
          this.prev = result;
          this.cur = result;
          this.operator = null;
          this.expression = '';  // 다음 수식을 위해 초기화
        } else {
          this.output = null;
          this.operator = n;

          this.prev = result;
          this.cur = null;

          // ✅ 연산자도 기록에 포함
          this.expression += ` ${n} `;
        }
      } else {
        this.output = null;
        this.operator = n;
        this.prev = this.cur;
        this.cur = null;

        // ✅ 연산자 기록
        this.expression += ` ${n} `;
      }
    },
    advancedCalculate(op) {
      if (this.cur === null && this.prev === null) {
        alert("숫자를 먼저 입력하세요.");
        return;
      }

      const target = this.cur !== null ? Number(this.cur) : Number(this.prev);

      let result;

      try {
        result = this.advancedActions[op](target);

        if (isNaN(result) || !isFinite(result)) {
          alert("계산할 수 없는 값입니다.");
          return;
        }
      } catch (e) {
        alert("계산 중 오류가 발생했습니다.");
        return;
      }

      // ✅ 결과 표현 문자열 구성
      const expr = `${op}(${target}) = ${result}`;
      this.history.unshift(expr); // ✅ 기록 저장

      // ✅ 상태 반영
      this.output = result;
      this.cur = result;
      this.prev = null;
      this.operator = null;
    },
    userInput(n) {
      // 사용자가 입력한 숫자를 저장하는 로직을 함수로 분리
      // 사용자가 입력한 숫자(실제 문자열) 저장
      this.cur = this.cur === null ? n : (this.cur += n);
      // 입력한 값이 화면에 표시되도록 ouput 데이터에 저장
      this.output = this.cur;
    },
    operation(e) {
      // 연산 로직 분리
      // 클릭한 버튼 값 가져오기
      const n = e.currentTarget.value;
      if (n === 'C') {
        this.clear(); // 초기화 함수 호출
      } else if (['+', '-', '*', '/', '='].includes(n)) {
        this.calculate(n); // 연산 흐름 제어 함수 호출
      } else if (['x²', '√', 'log'].includes(n)) {
        this.advancedCalculate(n); // 고급 연산 함수 호출
      } else {
        this.userInput(n); // 사용자가 입력한 숫자 저장 함수 호출
      }
    },
    toggleDarkMode() {
    this.isDark = !this.isDark;
    },
    handleKey(e) {
      const key = e.key;

      // 숫자 키 (0~9)
      if (/^[0-9]$/.test(key)) {
        this.userInput(key);
      }
      // 연산자 키
      else if (['+', '-', '*', '/'].includes(key)) {
        this.calculate(key);
      }
      // 엔터 또는 등호
      else if (key === 'Enter' || key === '=') {
        this.calculate('=');
      }
      // 초기화 (C 또는 Backspace)
      else if (key.toUpperCase() === 'C' || key === 'Backspace') {
        this.clear();
      }
      // 소수점
      else if (key === '.') {
        this.userInput('.');
      }
    },
    loadHistory(expression) {
      // 예: "3 + 5 = 8" 형식에서 숫자와 연산자 추출
      const parts = expression.split(' '); // [3, '+', 5, '=', 8]
      if (parts.length >= 3) {
        this.prev = Number(parts[0]);
        this.operator = parts[1];
        this.cur = Number(parts[2]);
        this.output = this.operatorActions[this.operator](this.prev, this.cur);
      }
    },
    append(char) {
      this.cur += char;
      this.output = this.cur;
      this.expression += char;   // 입력 기록
    },
    setOperator(op) {
      if (this.cur === '') return;
      if (this.prev === null) {
        this.prev = Number(this.cur);
      } else {
        this.prev = this.operatorActions[this.operator](this.prev, Number(this.cur));
      }
      this.cur = '';
      this.operator = op;
      this.output = this.prev;
      this.expression += ` ${op} `;  // 입력 기록
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleKey);
  },
  unmounted() {
    window.removeEventListener('keydown', this.handleKey);
  },
  watch: {
    isDark(newVal) {
      if (newVal) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  },
};
</script>

<template>
  <div class="history-box">
    <h4>이전 계산</h4>
    <ul>
      <li v-for="(item, index) in history" :key="index" @click="loadHistory(item)">
        {{ item }}
      </li>
    </ul>
  </div>

  <div :class="['calculator', { dark: isDark }]">
    
    <!-- ✅ 다크모드 토글 버튼 -->
    <button @click="toggleDarkMode" style="margin-bottom: 10px">
      {{ isDark ? '라이트 모드' : '다크 모드' }}
    </button>
    
    <form name="forms">
      <input v-model="output" type="text" name="output" readonly />
      <input type="button" class="clear" value="C" @click="operation" />
      <input type="button" class="advanced" value="x²" @click="operation" />
      <input type="button" class="advanced" value="√" @click="operation" />
      <input type="button" class="advanced" value="log" @click="operation" />
      <input type="button" class="operator" value="/" @click="operation" />
      <input type="button" value="1" @click="operation" />
      <input type="button" value="2" @click="operation" />
      <input type="button" value="3" @click="operation" />
      <input type="button" class="operator" value="*" @click="operation" />
      <input type="button" value="4" @click="operation" />
      <input type="button" value="5" @click="operation" />
      <input type="button" value="6" @click="operation" />
      <input type="button" class="operator" value="+" @click="operation" />
      <input type="button" value="7" @click="operation" />
      <input type="button" value="8" @click="operation" />
      <input type="button" value="9" @click="operation" />
      <input type="button" class="operator" value="-" @click="operation" />
      <input type="button" class="dot" value="." @click="operation" />
      <input type="button" value="0" @click="operation" />
      <input type="button" class="operator result" value="=" @click="operation" />
    </form>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #ffffff	;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.calculator {
  width: 287px;
  border: 1px solid #333;
  background-color: #ccc;
  padding: 5px;
}

.calculator form {
  display: grid;
  grid-template-columns: repeat(4, 65px);
  grid-auto-rows: 65px;
  grid-gap: 5px;
}

.calculator form input {
  border: 2px solid #333;
  cursor: pointer;
  font-size: 19px;
}

.calculator form input:hover {
  box-shadow: 1px 1px 2px #333;
}

.calculator form .clear {
  background-color: #ed4848;
}

.calculator form .operator {
  background-color: orange;
}

.calculator form .dot {
  background-color: green;
}

.calculator form input[type='text'] {
  grid-column: span 4;
  text-align: right;
  padding: 0 10px;
}

.calculator form .clear {
  grid-column: span 4;
}

.calculator form .result {
  grid-column: span 2;
}

.calculator form .advanced {
  background-color: #6c5ce7;
  color: white;
}

/* 다크 모드일 때 전체 배경 변경 */
body.dark-mode {
  background-color: #222;
  color: white;
}

.calculator.dark {
  background-color: #222;
  border-color: #888;
}

.calculator.dark input {
  background-color: #333;
  color: #fff;
  border-color: #888;
}

.calculator.dark input:hover {
  box-shadow: 1px 1px 2px #aaa;
}

.calculator.dark .clear {
  background-color: #a94442;
}

.calculator.dark .operator {
  background-color: #c88d1d;
}

.calculator.dark .advanced {
  background-color: #6514cf;
}

.calculator.dark .dot {
  background-color: #3c8d3c;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
}

.history-box {
  width: 200px;
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #000000;
  background: #666666;
  font-family: monospace;
}

.history-box h4 {
  margin-bottom: 10px;
}

.history-box ul {
  list-style: none;
  padding: 0;
}

.history-box li {
  cursor: pointer;
  padding: 5px;
  margin-bottom: 4px;
  border-bottom: 1px dashed #ccc;
}

.history-box li:hover {
  background-color: #ddd;
}

.calculator.dark + .history-box {
  background-color: #414141;
  color: rgb(255, 255, 255);
}
</style>