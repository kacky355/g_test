import {TimerMaker} from "./TimerMaker.js";

export class StartPageMaker{
    constructor(place_holder,time_limit_minutes,result_checker){
        this.place_holder = place_holder;
        this.time_makar = new TimerMaker(time_limit_minutes,result_checker);
    }

    make_start_page(){
        this.place_holder.innerHTML=`
        <div class="row">
        <div class = "" id="question_place_holder">
            <div class="row">
                <h1>試験画面</h1>
                <h2>試験タイトル</h2>
                <p>制限時間120分</p>
                <p>ブラウザバックをするとそこまでの内容が消えます。ご注意を</p>
            </div>

            <div class="row">
                <button type="button" class="btn btn-bd-primary" onclick="(function(){contents_maker.start_exam()})()" id="start_btn">試験開始</button>
            </div>

        </div>
    </div>
`;
        return this.time_makar;
    }
}