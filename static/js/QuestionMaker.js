import { OptinoMaker } from "./OptionMaker.js";


export class QuestionMaker{
    constructor(q_list,mode){
        this.q_list = q_list;
        this.option_maker = new OptinoMaker(mode);
    }

    // 問題の取得
    getQuestion(id){
        let question = this.q_list.questions_list[id];
        return question;
    }


    // #問題の内容作成
    makeQuestion(question,hasAns){
        let q_text = question.q_text;
        let q_number = question.q_number;
        let opts = question.opts;
        let ans = question.ans;
        let explanation = question.explanation;
        const question_place_holder = document.getElementById("question_place_holder");

        if(hasAns){
            option_html =this.option_maker.makeOptionHasAnswer(opts,ans);
        }else{
            option_html = this.option_maker.makeOptionNoAnswer(opts)
        }

        let question_html=`<div class = "row">
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
    `;
        question_place_holder.innerHTML = question_html;
    } 

}

