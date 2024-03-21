export class TimerMaker{
    constructor(time_limit_minutes){
        this.time_limit_minutes = time_limit_minutes;
    }

    countdown(due_time,time_limit_minutes){
        const now = new Date();
        const rest = due_time.getTime() - now.getTime();
        const rest_rate = Math.floor(rest/10/60/time_limit_minutes);
        const sec = Math.floor(rest/1000) % 60;
        const min = Math.floor(rest/1000/60) % 60;
        const hours = Math.floor(rest/1000/60/60) % 24;
        const count = [hours, min, sec,rest_rate];
        return count;
    }

    set_due_time(time_limit_minutes,ResultChecker){
        const today = new Date();
        const due_time = new Date()
        due_time.setMinutes(today.getMinutes() + time_limit_minutes);
        const limit = time_limit_minutes *60 *1000;
        this.timeout_timer = setTimeout(function(){
            let points = ResultChecker.checkResult();
            ResultChecker.showResults(points);
            },limit);
        this.due_time = due_time;
        return;
    }
    
    make_time_bar(){
        let time_bar_place_holder = document.getElementById('time_bar_place_holder');
        time_bar_place_holder.innerHTML=`
    <div class="row">
        <div class="col">
            <p>残り時間: <a id="rest_time">00:00:00</a></p>
            <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 0%" id="time_bar"></div>
            </div>
        </div>
    </div>
        `;
        this.setRestTimebar(this.due_time);
    }

    setRestTimebar(due_time){
        const time_bar = document.getElementById('time_bar');
        const rest_time = document.getElementById('rest_time');
        const count = countdown(due_time,time_limit_minutes);
        const hours = count[0] <10 ? "0"+ count[0]  : count[0];
        const minutes = count[1]<10 ? "0"+ count[1]  : count[1];
        const seconds = count[2]<10 ? "0"+ count[2]  : count[2];
    
        rest_time.innerHTML = `${hours}:${minutes}:${seconds}`;
        time_bar.setAttribute('style',`width: ${count[3]}%`);
    }
    
}