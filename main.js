
let result = "";//表示させる値
let calc = false;//＝で計算したか判断

window.onload = function () {//HTMLを読み込む（Windowはページ全体）
  result = document.getElementById('result');
};

function ac_click(){
  result.value = "0";
  calc  = false;
}

function num_click(val){
  if(calc)  result.value = "0";//if文１行なら省略できる、一度＝されてたらリセットする
  calc  = false;

  if(result.value =="0" && val == "0"){
    result.value = "0";
  }else if(result.value == "0" && val == "."){
    result.value = "0.";
  }else if(result.value == "0"){
    result.value = val;
  }else if(result.value == "00" && val == "00"){
    result.value = "00";
  }else if(result.value == "00" && val == "."){
    result.value = "0";
  }else if(result.value == "00"){
    result.value = val;
  }else{
    result.value += val;
  }
}

function ope_click(val){
  if(calc)  calc = false;//trueの時があればfalseにしておく
  
  if(ope_last()){//前の入力値が演算子だった時切り替える
    result.value = result.value.slice(0, -1) + val;//前演算子切り取り値を追加
  } else {
    result.value += val;//それ以外は追加していく
  }
}

function equal_click(){
  if(ope_last())  result.value = result.value.slice(0, -1);
  
  //eval()の代替,文字列の置き換え
  let answer = new Function("return " + result.value.replaceAll("×", "*").replaceAll("÷", "/"))();
  
  result.value = answer;
  calc = true;
  
}

function ope_last(){// 演算子であればtrueを返すincludesメソッド
  return ["+","-","×","÷"].includes(result.value.toString().slice(-1));
}
