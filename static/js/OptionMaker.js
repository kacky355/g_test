export class OptinoMaker{
    constructor(){
        
    }

    // #解答の登録
    setAnswer(current_id,opt){
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

    //# 一問一答用
    makeOptionHasAnswer(opts,ans){
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

    // #模試用
    makeOptionNoAnswer(opts){
        let option_html = "";
        for(i = 1; i<=opts.length; i++){
            option_html += `<button class="btn ${answer_list[current_id] === i?"checked btn-success": "btn-primary"}" type="button" onclick = setAnswer(current_id,${i}) id="optBtn${i}">${opts[i-1]}</button>
            `;

        }

        return option_html;

    }


}