exports.weekText = function(dt) {
  // 날짜 변환 계산기
  var sTemp;
  switch (dt % 7) {
    case 0:
      sTemp = '일';
      break;
    case 1:
      sTemp = '월';
      break;
    case 2:
      sTemp = '화';
      break;
    case 3:
      sTemp = '수';
      break;
    case 4:
      sTemp = '목';
      break;
    case 5:
      sTemp = '금';
      break;
    case 6:
      sTemp = '토';
      break;
  }
  return sTemp;
};
exports.getInputDayLabel = dataValue => {
  // 요일 구하기
  var week = ['일', '월', '화', '수', '목', '금', '토'];
  var today = new Date(dataValue).getDay();
  var todayLabel = week[today];
  return todayLabel;
};
exports.isNumber = function(s) {
  s += ''; // 문자열로 변환
  s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
  if (s == '' || isNaN(s)) return false;
  return true;
};
exports.numberWithCommas = x => {
  if (x !== undefined) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return '전화문의';
  }
};
exports.changeDateType = function(date) {
  var arrDate = date.split('-');
  changedDate = new Date(arrDate[0], arrDate[1] - 1, arrDate[2]);
  return changedDate;
};
exports.today = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  dd = dd < 10 ? '0' + dd : dd;
  mm = mm < 10 ? '0' + mm : mm;
  nextDay = yyyy + '-' + mm + '-' + dd;

  return new Date(nextDay);
};
exports.today2 = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  dd = dd < 10 ? '0' + dd : dd;
  mm = mm < 10 ? '0' + mm : mm;

  // 요일 구하기
  var week = ['일', '월', '화', '수', '목', '금', '토'];
  var todayDetDay = new Date(today).getDay();
  var todayDetDayLabel = week[todayDetDay];

  // 시간 구하기
  const getHours = today.getHours();
  const getMinutes = today.getMinutes();
  const getSeconds = today.getSeconds();

  let time = `${getHours}:${getMinutes}:${getSeconds}`;
  time = time < 10 ? '0' + time : time;

  const nextDay = `${yyyy}-${mm}-${dd}(${todayDetDayLabel}) ${time}`;

  return nextDay;
};
exports.today3 = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  dd = dd < 10 ? '0' + dd : dd;
  mm = mm < 10 ? '0' + mm : mm;

  // 요일 구하기
  var week = ['일', '월', '화', '수', '목', '금', '토'];
  var todayDetDay = new Date(today).getDay();
  var todayDetDayLabel = week[todayDetDay];

  // 시간 구하기
  const getHours = today.getHours();
  const getMinutes = today.getMinutes();
  const getSeconds = today.getSeconds();

  let time = `${getHours}:${getMinutes}:${getSeconds}`;
  time = time < 10 ? '0' + time : time;

  const nextDay = `${yyyy}-${mm}-${dd}(${todayDetDayLabel}) ${time}`;

  return nextDay;
};

exports.changeDateType6 = date => {
  // 몽고 DB 데이트 값을 "yyyy-mm-dd Time 요일" 텍스트로 전환
  if (date === '') {
    return '';
  }
  console.log(date);

  var arrDate = date.split('-');
  var lastDate = arrDate[2].split('T');

  const today = new Date(arrDate[0], arrDate[1] - 1, lastDate[0]);
  today.setDate(today.getDate());
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  dd = dd < 10 ? '0' + dd : dd;
  mm = mm < 10 ? '0' + mm : mm;

  // 시간 구하기
  var time = lastDate[1].substring(0, 5);

  // 요일 구하기
  var week = ['일', '월', '화', '수', '목', '금', '토'];
  var todayDetDay = new Date(date).getDay();
  var todayDetDayLabel = week[todayDetDay];

  const result = `${yyyy}-${mm}-${dd}(${todayDetDayLabel}) ${time}`;

  return result;
};
exports.dateLastTime = today => {
  var today = new Date(today);
  var nextDay = new Date(today);
  nextDay.setDate(nextDay.getDate());
  var dd = nextDay.getDate();
  var mm = nextDay.getMonth() + 1;
  var yyyy = nextDay.getFullYear();
  dd = dd < 10 ? '0' + dd : dd;
  mm = mm < 10 ? '0' + mm : mm;
  nextDay = yyyy + '-' + mm + '-' + dd + 'T' + '23:59';
  return nextDay;
};

exports.handleDateTimeChange = (today, c, time, type) => {
  var today = new Date(today);
  var nextDay = new Date(today);
  if (type) {
    nextDay.setDate(nextDay.getDate() + c);
  } else {
    nextDay.setDate(nextDay.getDate() - c);
  }
  var dd = nextDay.getDate();
  var mm = nextDay.getMonth() + 1;
  var yyyy = nextDay.getFullYear();
  dd = dd < 10 ? '0' + dd : dd;
  mm = mm < 10 ? '0' + mm : mm;
  nextDay = yyyy + '-' + mm + '-' + dd + 'T' + time;
  return nextDay;
};
exports.Dday = (today, c) => {
  var today = new Date(today);
  var nextDay = new Date(today);
  nextDay.setDate(nextDay.getDate() - c);
  var dd = nextDay.getDate();
  var mm = nextDay.getMonth() + 1;
  var yyyy = nextDay.getFullYear();
  dd = dd < 10 ? '0' + dd : dd;
  mm = mm < 10 ? '0' + mm : mm;
  nextDay = yyyy + '-' + mm + '-' + dd;
  return nextDay;
};
exports.plusDay = (today, c) => {
  var today = new Date(today);
  var nextDay = new Date(today);
  nextDay.setDate(nextDay.getDate() + c);
  var dd = nextDay.getDate();
  var mm = nextDay.getMonth() + 1;
  var yyyy = nextDay.getFullYear();
  dd = dd < 10 ? '0' + dd : dd;
  mm = mm < 10 ? '0' + mm : mm;
  nextDay = yyyy + '-' + mm + '-' + dd;
  return nextDay;
};
exports.dateTlTime = minute => {
  var today = new Date(
    new Date().getTime() -
      new Date().getTimezoneOffset() * 60000 +
      minute * 60 * 1000
  );
  return new Date(today);
};
exports.Exchange = type => {
  // 날짜 변환 계산기
  return type === '한화 KRW'
    ? 1
    : type === '미국 USD'
    ? 1250
    : type === '필리핀 PHP'
    ? 25
    : type === '태국 THB'
    ? 42
    : type === '일본 JPY (100엔)' && 11;
};
exports.calculateByOperator = (a, b, o) => {
  if (o === 'MINUS' || o === 'minus') {
    return b - a;
  } else {
    return b + a;
  }
};
exports.caculateFee = (fee, elem) => {
  switch (elem.curruncyAdult) {
    case '한화 KRW':
      fee.adultK = this.calculateByOperator(
        elem.adult,
        fee.adultK,
        elem.operator
      );
      break;
    case '미국 USD':
      fee.adultDollor = this.calculateByOperator(
        elem.adult,
        fee.adultDollor,
        elem.operator
      );
      break;
    default:
      fee.adultTheOther = this.calculateByOperator(
        elem.adult,
        fee.adultTheOther,
        elem.operator
      );
      fee.curruncyAdultTheOther = elem.curruncyAdult;
      break;
  }
  switch (elem.curruncyChild) {
    case '한화 KRW':
      fee.childK = this.calculateByOperator(
        elem.child,
        fee.childK,
        elem.operator
      );
      break;
    case '미국 USD':
      fee.childDollor = this.calculateByOperator(
        elem.child,
        fee.childDollor,
        elem.operator
      );
      break;
    default:
      fee.childTheOther = this.calculateByOperator(
        elem.child,
        fee.childTheOther,
        elem.operator
      );
      fee.curruncyChildTheOther = elem.curruncyChild;
      break;
  }
  switch (elem.curruncyInfant) {
    case '한화 KRW':
      fee.infantK = this.calculateByOperator(
        elem.infant,
        fee.infantK,
        elem.operator
      );
      break;
    case '미국 USD':
      fee.infantDollor = this.calculateByOperator(
        elem.infant,
        fee.infantDollor,
        elem.operator
      );
      break;
    default:
      fee.infantTheOther = this.calculateByOperator(
        elem.infant,
        fee.infantTheOther,
        elem.operator
      );
      fee.curruncyInfantTheOther = elem.curruncyInfant;
      break;
  }
  fee.estimatedAdult =
    fee.adultK +
    1250 * fee.adultDollor +
    this.Exchange(fee.curruncyAdultTheOther) * fee.adultTheOther;
  fee.estimatedChild =
    fee.childK +
    1250 * fee.childDollor +
    this.Exchange(fee.curruncyChildTheOther) * fee.childTheOther;
  fee.estimatedInfant =
    fee.infantK +
    1250 * fee.infantDollor +
    this.Exchange(fee.curruncyInfantTheOther) * fee.infantTheOther;
  return fee;
};

exports.caculateSingleFee = (singleFee, elem) => {
  switch (elem.curruncy) {
    case '한화 KRW':
      singleFee.feeK = this.calculateByOperator(
        elem.fee,
        singleFee.feeK,
        elem.operator
      );
      break;
    case '미국 USD':
      singleFee.feeDollor = this.calculateByOperator(
        elem.fee,
        singleFee.feeDollor,
        elem.operator
      );
      break;
    default:
      singleFee.feeTheOther = this.calculateByOperator(
        elem.fee,
        singleFee.feeTheOther,
        elem.operator
      );
      singleFee.curruncyTheOther = elem.curruncy;
      break;
  }
  return (singleFee = {
    ...singleFee,
    guestNum: elem.guestNum,
    fee: this.calculateByOperator(singleFee.fee, elem.fee, elem.operator),
    note: singleFee.note + elem.note + ', '
  });
};

exports.caculateFee2 = (fee, elem) => {
  switch (elem.curruncyAdult) {
    case '한화 KRW':
      fee.adultK = this.calculateByOperator(
        elem.adult,
        fee.adultK,
        elem.calcType
      );
      break;
    case '미국 USD':
      fee.adultDollor = this.calculateByOperator(
        elem.adult,
        fee.adultDollor,
        elem.calcType
      );
      break;
    default:
      fee.adultTheOther = this.calculateByOperator(
        elem.adult,
        fee.adultTheOther,
        elem.calcType
      );
      fee.curruncyAdultTheOther = elem.curruncyAdult;
      break;
  }
  switch (elem.curruncyChild) {
    case '한화 KRW':
      fee.childK = this.calculateByOperator(
        elem.child,
        fee.childK,
        elem.calcType
      );
      break;
    case '미국 USD':
      fee.childDollor = this.calculateByOperator(
        elem.child,
        fee.childDollor,
        elem.calcType
      );
      break;
    default:
      fee.childTheOther = this.calculateByOperator(
        elem.child,
        fee.childTheOther,
        elem.calcType
      );
      fee.curruncyChildTheOther = elem.curruncyChild;
      break;
  }
  switch (elem.curruncyInfant) {
    case '한화 KRW':
      fee.infantK = this.calculateByOperator(
        elem.infant,
        fee.infantK,
        elem.calcType
      );
      break;
    case '미국 USD':
      fee.infantDollor = this.calculateByOperator(
        elem.infant,
        fee.infantDollor,
        elem.calcType
      );
      break;
    default:
      fee.infantTheOther = this.calculateByOperator(
        elem.infant,
        fee.infantTheOther,
        elem.calcType
      );
      fee.curruncyInfantTheOther = elem.curruncyInfant;
      break;
  }

  let adultCurruncyAdultTheOther = this.Exchange(fee.curruncyAdultTheOther)
    ? this.Exchange(fee.curruncyAdultTheOther) * fee.adultTheOther
    : 0;
  let childCurruncyAdultTheOther = this.Exchange(fee.curruncyChildTheOther)
    ? this.Exchange(fee.curruncyChildTheOther) * fee.childTheOther
    : 0;
  let infantCurruncyAdultTheOther = this.Exchange(fee.curruncyInfantTheOther)
    ? this.Exchange(fee.curruncyInfantTheOther) * fee.infantTheOther
    : 0;
  fee.estimatedAdult =
    fee.adultK +
    this.Exchange('미국 USD') * fee.adultDollor +
    adultCurruncyAdultTheOther;
  fee.estimatedChild =
    fee.childK +
    this.Exchange('미국 USD') * fee.childDollor +
    childCurruncyAdultTheOther;
  fee.estimatedInfant =
    fee.infantK +
    this.Exchange('미국 USD') * fee.infantDollor +
    infantCurruncyAdultTheOther;
  return fee;
};

exports.caculateSingleFee2 = (singleFee, elem) => {
  switch (elem.curruncy) {
    case '한화 KRW':
      singleFee.feeK = this.calculateByOperator(
        elem.fee,
        singleFee.feeK,
        elem.calcType
      );
      break;
    case '미국 USD':
      singleFee.feeDollor = this.calculateByOperator(
        elem.fee,
        singleFee.feeDollor,
        elem.calcType
      );
      break;
    default:
      singleFee.feeTheOther = this.calculateByOperator(
        elem.fee,
        singleFee.feeTheOther,
        elem.calcType
      );
      singleFee.curruncyTheOther = elem.curruncy;
      break;
  }

  return (singleFee = {
    ...singleFee,
    guestNum: elem.personal,
    fee: this.calculateByOperator(elem.fee, singleFee.fee, elem.calcType),
    note: singleFee.note + elem.note + ', '
  });
};

exports.createCount = list => {
  countList = list.filter(item => item.code !== undefined);
  let resultList = this.upSort(countList, 'code');
  let a = resultList.findIndex((item, index) => {
    return parseInt(item.code, 10) !== parseInt(index, 10) + 1;
  });

  let count =
    resultList.length === 0 ? 1 : a === -1 ? resultList.length + 1 : a + 1;
  return count;
};
exports.createNumber = (list, target) => {
  countList = list.filter(item => item.id !== undefined);
  let resultList = this.upSort(countList, target);
  let a = resultList.findIndex((item, index) => {
    return parseInt(item[target], 10) !== parseInt(index, 10) + 1;
  });

  let number =
    resultList.length === 0 ? 1 : a === -1 ? resultList.length + 1 : a + 1;
  return number;
};
exports.upSort = (list, name) => {
  let result = list.sort(function(a, b) {
    // 오름차순
    return a[name] < b[name] ? -1 : a[name] > b[name] ? 1 : 0;
    // 광희, 명수, 재석, 형돈
  });
  return result;
};
exports.downSort = (list, name) => {
  let result = list.sort(function(a, b) {
    // 내림차순
    return a[name] > b[name] ? -1 : a[name] < b[name] ? 1 : 0;
    // 형돈, 재석, 명수, 광희
  });
  return result;
};
exports.changeDatePenaltyTL = date => {
  if (date !== '') {
    var arrDate = date.split('-');
    var lastDate = arrDate[2].split('T');
    var time = lastDate[1].substring(0, 5);

    const today = new Date(arrDate[0], arrDate[1] - 1, lastDate[0]);
    today.setDate(today.getDate());
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    dd = dd < 10 ? '0' + dd : dd;
    mm = mm < 10 ? '0' + mm : mm;
    const result = yyyy + '-' + mm + '-' + dd + 'T' + time;
    return result;
  } else {
    return;
  }
};
exports.Accommodation = (today, c) => {
  var nextDay = new Date(today);
  nextDay.setDate(nextDay.getDate() + c);
  var dd = nextDay.getDate();
  var mm = nextDay.getMonth() + 1;
  var yyyy = nextDay.getFullYear();
  dd = dd < 10 ? '0' + dd : dd;
  mm = mm < 10 ? '0' + mm : mm;
  nextDay = yyyy + '-' + mm + '-' + dd;

  return nextDay;
};
exports.Accommodation2 = (today, c) => {
  var nextDay = new Date(today);
  nextDay.setDate(nextDay.getDate() + c);
  var dd = nextDay.getDate();
  var mm = nextDay.getMonth() + 1;
  var yyyy = nextDay.getFullYear();
  dd = dd < 10 ? '0' + dd : dd;
  mm = mm < 10 ? '0' + mm : mm;
  nextDay = `${yyyy}년 ${mm}월 ${dd}일`;

  return nextDay;
};
exports.Accommodation3 = today => {
  var nextDay = new Date(today);
  nextDay.setDate(nextDay.getDate());
  var dd = nextDay.getDate();
  var mm = nextDay.getMonth() + 1;
  var yyyy = nextDay.getFullYear();
  dd = dd < 10 ? '0' + dd : dd;
  mm = mm < 10 ? '0' + mm : mm;
  nextDay = `${yyyy}년 ${mm}월 ${dd}일`;

  return nextDay;
};
exports.replaceAll = (str, searchStr, replaceStr) => {
  return str.split(searchStr).join(replaceStr);
};

exports.DdayCaculator = dday => {
  var Dday = new Date(dday); // D-day(2017년 8월 30일)를 셋팅한다.
  var now = new Date(); // 현재(오늘) 날짜를 받아온다.

  var gap = now.getTime() - Dday.getTime(); // 현재 날짜에서 D-day의 차이를 구한다.
  var result = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1; // gap을 일(밀리초 * 초 * 분 * 시간)로 나눈다. 이 때 -1 을 곱해야 날짜차이가 맞게 나온다.

  return result;
};
exports.penaltyCalulator = (date, totalPrice, term) => {
  const today = new Date();
  let todayGetHours = today.getHours();
  let Dday = this.DdayCaculator(date);

  if (this.getInputDayLabel(today) === '월') {
    Dday = todayGetHours < 17 ? Dday : Dday - 1 <= 0 ? 0 : Dday - 1;
  }
  if (
    this.getInputDayLabel(today) === '화' ||
    this.getInputDayLabel(today) === '수' ||
    this.getInputDayLabel(today) === '목'
  ) {
    Dday =
      todayGetHours > 8 && todayGetHours < 17
        ? Dday
        : Dday - 1 <= 0
        ? 0
        : Dday - 1;
  }
  if (this.getInputDayLabel(today) === '금') {
    Dday =
      todayGetHours > 8 && todayGetHours < 17
        ? Dday
        : Dday - 3 <= 0
        ? 0
        : Dday - 3;
  }
  if (this.getInputDayLabel(today) === '토') {
    Dday = Dday - 2 <= 0 ? 0 : Dday - 2;
  }
  if (this.getInputDayLabel(today) === '일') {
    Dday = Dday - 1 <= 0 ? 0 : Dday - 1;
  }
  const Ddate = this.Dday(date, Dday);

  let resultTerm;
  if (Dday <= 0) {
    resultTerm = term.filter(item => item.sday === 'none');
  }
  if (Dday >= term[0].sday) {
    resultTerm = term.filter(item => item.bday === 'all');
  }
  if (Dday > 0 && Dday < term[0].sday) {
    resultTerm = term.filter(item => item.bday >= Dday && item.sday <= Dday);
  }

  let penaltyPrice = 0;

  if (resultTerm) {
    if (resultTerm[0].penaltyUnit === '%') {
      penaltyPrice = totalPrice * (resultTerm[0].penalty / 100);
    }
  }

  return {
    date: date,
    dDay: Dday,
    dDate: Ddate,
    penalty: resultTerm && resultTerm[0].penalty,
    penaltyUnit: resultTerm && resultTerm[0].penaltyUnit,
    penaltyPrice: penaltyPrice
  };
};
