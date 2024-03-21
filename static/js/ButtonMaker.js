export class ButtonMaker{
    constructor(){

    }

    //チェックボタン
    set_check(current_id){
        let check_btn = document.getElementById("check_btn");
        check_list[current_id] = 1;
        check_btn.innerHTML = `<i class="fa-solid fa-star fa-2x unlikeBtn" onclick=setUnCheck() style="theme-colors:warning" ></i>`;
    }
    
    set_un_check(current_id){
        let check_btn = document.getElementById("check_btn");
        check_list[current_id] = 0;
        check_btn.innerHTML = `<i class="fa-regular fa-star my-gray fa-2x" onclick=setCheck()></i>`;
    }
    
    make_change_button(){
        const buttons_place_holder = document.getElementById("buttons_place_holder");
        buttons_place_holder.innerHTML=`
        <!-- 問題の移動ボタン-->
        <div class="container">
            <div class="row gap-4 mt-4">
                <div class = "col d-flex align-items-center justify-content-center">
                    <button type="button" class = "btn btn-outline-secondary" onclick = contents_maker.button_maker.next_question(current_id,true,contents_maker.add_question_page,contents_maker.make_question_list_page) id="before_question_btn">前の問題</button>
                </div>
                <div class="col d-flex align-items-center justify-content-center">
                    <!-- 前後の問題番号並べるやつ-->
                    <button class ="btn btn-outline-secondary" onclick = contents_maker.make_question_list_page() id="next_question_btn">すべての問題を確認</button>
                </div>
                <div class = "col d-flex align-items-center justify-content-center">
                    <button class ="btn btn-outline-secondary" onclick = contents_maker.button_maker.next_question(current_id,false,contents_maker.add_question_page,contents_maker.make_question_list_page) id="next_question_btn">次の問題</button>
                </div>
            </div>
        </div>
        `
    }

    make_result_button(){
        const result_button_place_holder = document.getElementById("result_button_place_holder")
        result_button_place_holder.innerHTML=`
        <div class ="row">
            <div class="col mt-4">
                <button type="button" class="btn btn-danger" onclick=contents_maker.make_result_page()>試験を終了する</button>
            </div>
        </div>
    
        `

    }

    // #ボタン類
    // 問題遷移ボタン
    change_question(current_id,to_next,add_question_page,make_question_list_page){
        if(current_id === last_question || current_id === 0){
            return make_question_list_page();
        }

        let next_id =to_next ? current_id +1 : current_id -1;

        return add_question_page(next_id);
    }


}