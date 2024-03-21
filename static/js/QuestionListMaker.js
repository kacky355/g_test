export class QuestionListMaker{
    constructor(){

    }

    // #全問表示周り
    //# 解答状態の設定
    setAnsweringState(q_id){
        let question_state;
        let btn_state;
        let question_number = i +1;
        
        if(answer_list[q_id] === 0){
            question_state = '未回答';
            btn_state = 'btn-outline-secondary';
        }else{
            question_state = '回答済';
            btn_state = 'btn-primary';
        }

        if(check_list[q_id] === 1){
            btn_state = 'btn-warning'
        }

        let question_card = `<div class="col mt-1">
        <button type="button" class="btn ${btn_state} d-flex align-items-center justify-content-center" onclick=addQuestion(${i})>問題${question_number}<br>  [[${question_state}]]  </button>
        </div>
        `;

        return question_card;

    }

    // 全問表示画面の作成
    seeQuestionList(){
        let q_list_html=""
        for(i=0;i <q_list.list_size;i++){

            q_list_html += setAnsweringState(i);
        }

        q_place.innerHTML = `<h1>問題リスト確認</h1>
    <div class="container">
    <div class="row">
        <div class = "col mt-2">
            <button class ="btn btn-primary" onclick = addQuestion(current_id) >元の問題に戻る</button>
        </div>
    </div>
    <div class="row mt-1 row-cols-3 row-cols-sm-4 row-cols-md-6">
        ${q_list_html}
    </div>
    </div>
        `;

    }

}