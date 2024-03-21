export class ResultChecker{
    constructor(){

    }

    // 結果表示
    getResult(){
        if(checkUnAnswered()){
            let points = checkResult();
            showResults(points);
        }
    }

    // 未回答問題ありの確認
    checkUnAnswered(){
        let un_answered = 0;
        for(i=0;i<q_list.list_size;i++){
            if(answer_list[i] === 0){
                un_answered++;
            }
        }

        let verify_text ='';
        if(un_answered >0){
            verify_text +=`未回答の問題が${un_answered}問あります。\n`;
        }
        verify_text += `試験を終了しますか？`;
        return confirm(verify_text);
    }


    // 得点計算
    checkResult(){
        let points = 0;
        for(i=0;i<q_list.list_size;i++){
            let ans = getQuestion(q_list,i).ans;
            if(answer_list[i] === ans){
                points++;
            }
        }

        q_list.ans_list=answer_list;
        q_list.like_list = check_list;

        return points;
    }

    // 合否判定
    isSuccess(points){
        return is_success = points > q_list.list_size*0.6;
    }

    // 結果画面の描画
    showResults(points,interval_timer,timeout_timer){
        clearInterval(interval_timer);

        let result;
        let result_text;
        if(isSuccess(points)){
            result = '合格';
            result_text=`おめでとうございます！<br>
            あなたは<br>
            全${q_list.list_size}問中、${points}問正解で<br>合格です！！`;
        }else{
            result = '不合格...';
            result_text=`ざんねん...<br>全${q_list.list_size}問中、${points}問正解でした...`;
        }

        result_html=`<div class="row">
            <div class="col">
                <h1>試験結果</h1>
            </div>
        </div>
        <div class="row">
            <div class="col d-flex align-items-center justify-content-center">
                <h1>${result}</h1>
            </div>
        </div>
        <div class="row">
            <div class="col d-flex align-items-center justify-content-center">
                <p>${result_text}</p>
            </div>
        </div>
        <div class="row">
            <div class="col d-flex align-items-center justify-content-center">
                <button type="button" class="btn btn-secondary">
                    <a href={{ url_for('exam_result',q_list=q_list) }}>解答・解説</a>
                </button>
            </div>
        </div>
        `;

        let result_place = document.getElementById('results_place_holder');
        result_place.innerHTML = result_html;
        clearTimeout(timeout_timer);
    }

}