//getCSV();

//CSVの内容をHTMLで表示させます
function view_CSV(result){


//TABLEIDを取得
var elm_table           = document.getElementById('table');
//elm_table.style.cssText = 'width:200;height:100';

//HTMLFormElement FormIDを取得
var form = document.getElementById("id_form2");



// HTMLInputElement オブジェクトを作成する
var input = new Array(4);

for (var i = 0; i < input.length; i++){
        input[i] = new Array(4);
}

for (var i = 0; i < input.length;i++){
	for(var j = 0;j < 4;j++){
		input[i][j] = document.createElement("input");
		input[i][j].type = "number";
		input[i][j].size = 2;
		//input[i][j].max = 2;
		input[i][j].name = "data" + String(i) + String(j);
		input[i][j].valueAsNumber = result[i+1][j+1];
	}
}


while( elm_table.rows[ 0 ] ) elm_table.deleteRow( 0 );
var o_row = [];
o_row[0] = elm_table.insertRow();

for(var i = 0;i < result[0].length;i++){
  var header = o_row[0].insertCell();
  header.innerText = result[0][i];
  header.style.border = '1 solid #000';
}
alert(result);

for(var i = 0; i < input.length; i ++) {
  o_row[i+1] = elm_table.insertRow();

	var lesson = o_row[i+1].insertCell();
	lesson.innerText = (i+1 + "時間目");
	lesson.style.border = '1 solid #000';


  var start_cell          = o_row[i+1].insertCell();
	start_cell.innerText    = ("時間");
	start_cell.append(input[i][0]);
	start_cell.append("時");
	start_cell.append(input[i][1]);
	start_cell.append('分');
 	start_cell.style.border = '1 solid #000';

	var end_cell          = o_row[i+1].insertCell();
	end_cell.innerText    = ("時間");
	end_cell.append(input[i][2]);
	end_cell.append("時");
	end_cell.append(input[i][3]);
	end_cell.append('分');
  	end_cell.style.border = '1 solid #000';
}

  alert("セル作成終了");
}




//CSVファイルを読み込む関数getCSV()の定義
function getCSV(){
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRre$
    req.open("get", "data.csv", true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行



    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ

    req.onload = function(){
          convertCSVtoArray(req.responseText); // 渡されるのは読 $
    }
}

// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str){ // 読み込んだCSVデータが文字列として渡される
    var result = []; // 最終的な二次元配列を入れるための配列
    var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成

    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for(var i=0;i<tmp.length;++i){
        result[i] = tmp[i].split(',');
    }


    view_CSV(result);
}

function onButtonClick() {
    alert("呼び出し完了です");
    getCSV();
}

function appendButton(){

}
