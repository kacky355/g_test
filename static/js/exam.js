q_list = JSON.parse(q_list);
let last_question = q_list.list_size -1;
let q_place = document.getElementById('question_place_holder');
let answer_list = q_list.ans_list;
let check_list = q_list.like_list;

function setCheck(){
    let check_btn = document.getElementById("check_btn");
    check_list[current_id] = 1;
    check_btn.innerHTML = `<i class="fa-solid fa-star fa-2x unlikeBtn" onclick=setUnCheck() style="theme-colors:warning" ></i>`;
}

function setUnCheck(){
    let check_btn = document.getElementById("check_btn");
    check_list[current_id] = 0;
    check_btn.innerHTML = `<i class="fa-regular fa-star my-gray fa-2x" onclick=setCheck()></i>`;
}

function getQuestion(q_list,id){
    let question = q_list.questions_list[id];
    return question;
}

function makeOptionHasAnswer(opts,ans){
    let option_html = "";
    for(i = 0; i<opts.length; i++){
        if(i == ans-1){
            option_html += `<button class="btn btn-primary" type="button" id="correctAnswerBtn">${opts[i]}</button>
            `;
        }else{
            option_html +=`<button class="btn btn-primary" type="button" id="incorrectAnswerBtn${i}">${opts[i]}</button>
            `;
        }
    }

    return option_html;

}

function makeOptionNoAnswer(opts){
    let option_html = "";
    for(i = 1; i<=opts.length; i++){
        option_html += `<button class="btn ${answer_list[current_id] === i?"checked btn-success": "btn-primary"}" type="button" onclick = setAnswer(current_id,${i}) id="optBtn${i}">${opts[i-1]}</button>
        `;

    }

    return option_html;

}

function makeQuestion(question,hasAns){
    let q_text = question.q_text;
    let q_number = question.q_number;
    let opts = question.opts;
    let ans = question.ans;
    let explanation = question.explanation;

    if(hasAns){
        option_html =makeOptionHasAnswer(opts,ans);
    }else{
        option_html = makeOptionNoAnswer(opts)
    }

    question_html=`<div class = "row">
    <div class="d-grid gap-2">
        <div class = "row">
            <div class="col">
                <p class="fs-5 text-body-secondary">問題${q_number}</p>
            </div>
            <div class="col gap-5 offset-md-6 d-flex align-items-center justify-content-around" id="check_btn">
                <i class="fa-regular fa-star my-gray fa-2x" onclick=setCheck()></i>
            </div>
        </div>
        <p class="fs-5 text-body-secondary">${q_text}</p>

        <div id="liveAlertPlaceholder"></div>
        
        <div class="row gap-1 justify-content-evenly">
        ${option_html}
        </div>
        <p class="fs-5 text-body-secondary" id="explanation">${explanation}</p>

    </div>
</div>
<!-- 問題の移動ボタン-->
<div class="container">
    <div class="row gap-4 mt-4">
        <div class = "col d-flex align-items-center justify-content-center">
            <button type="button" class = "btn btn-outline-secondary" onclick = beforeQuestion(current_id) id="before_question_btn">前の問題</button>
        </div>
        <div class="col d-flex align-items-center justify-content-center">
            <!-- 前後の問題番号並べるやつ-->
            <button class ="btn btn-outline-secondary" onclick = seeQuestionList() id="next_question_btn">すべての問題を確認</button>
        </div>
        <div class = "col d-flex align-items-center justify-content-center">
            <button class ="btn btn-outline-secondary" onclick = nextQuestion(current_id) id="next_question_btn">次の問題</button>
        </div>
    </div>
</div>

`;
    return question_html;
} 

function addQuestion(id){
    current_id = id;
    let question = getQuestion(q_list,id);
    q_place.innerHTML = makeQuestion(question,has_answer);
    if(check_list[id] === 1){
        setCheck();
    }
    return current_id;

}

function setAnswer(current_id,opt){
    if(answer_list[current_id] != 0){
        let checked = `optBtn${answer_list[current_id]}`
        let checked_option = document.getElementById(checked);
        checked_option.classList.remove('checked','btn-success');
        checked_option.classList.add('btn-primary');
    }
    let selecter =`optBtn${opt}`;
    let selected_option = document.getElementById(selecter);
    selected_option.classList.remove('btn-primary');
    selected_option.classList.add('checked','btn-success');

    answer_list[current_id] = opt;

    return;

}

function seeQuestionList(){
    let q_list_html=""
    for(i=0;i <q_list.list_size;i++){
        let question_state;
        let btn_state;
        let question_number = i +1;
        
        if(answer_list[i] === 0){
            question_state = '未回答';
            btn_state = 'btn-outline-secondary';
        }else{
            question_state = '回答済';
            btn_state = 'btn-primary';
        }

        if(check_list[i] === 1){
            btn_state = 'btn-warning'
        }

        let question_card = `<div class="col mt-1">
        <button type="button" class="btn ${btn_state} d-flex align-items-center justify-content-center" onclick=addQuestion(${i})>問題${question_number}<br>  [[${question_state}]]  </button>
        </div>
        `;

        q_list_html += question_card;
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

function checkEnd(){
    q_place.innerHTML = '<h1>終わり</h1>';
}

function nextQuestion(current_id){
    if(current_id === last_question){
        current_id = 'end';
        return checkEnd();
    }

    let next_id =current_id +1;

    return addQuestion(next_id);
}

function beforeQuestion(current_id){
    if(current_id === 0){
        return seeQuestionList();
    }

    let before_id = current_id -1;

    return addQuestion(before_id);
}

function getResult(){
    if(checkUnAnswered()){
        let points = checkResult();
        showResults(points);
    }
}

function checkUnAnswered(){
    let un_answered = 0;
    for(i=0;i<q_list.list_size;i++){
        if(answer_list[i] === 0){
            un_answered++;
        }
    }
    let verify_text = `未回答の問題が${un_answered}問あります。\n試験を終了しますか？`;
    return confirm(verify_text);
}

function checkResult(){
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

function isSuccess(points){
    return is_success = points > q_list.list_size*0.6;
}

function showResults(points){
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
}