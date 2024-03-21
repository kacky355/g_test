import { ButtonMaker } from './ButtonMaker.js';
import { ContentsMaker } from './ContentsMaker.js';
import { QuestionListMaker } from './QuestionListMaker.js';
import { QuestionMaker } from './QuestionMaker.js';
import { ResultChecker } from './ResultChecker.js';
import { StartPageMaker } from './StartPageMaker.js';
(()=>{
    class ExamContentsMaker extends ContentsMaker{
        constructor(q_list,title,time_limit_minutes){
            super(q_list,title);
            this.answer_list = q_list.ans_list;
            this.check_list = q_list.like_list;
            this.result_checker = new ResultChecker();
            this.question_maker = new QuestionMaker(q_list);
            this.question_list_maker = new QuestionListMaker();
            this.button_maker = new ButtonMaker();
        }

        make_start_page(){
            const start_page_maker = new StartPageMaker(this.contents_place_holder,this.time_limit_minutes,this.result_checker);
            this.time_maker = start_page_maker.make_start_page();
        }

        start_exam(){
            this.set_default_contents();
            this.time_maker.set_due_time();
            this.time_maker.make_time_bar();
            this.question_maker.addQuestion(0);
            this.interval_timer = setInterval(
                this.time_maker.setRestTimebar,
                1000,
                this.time_maker.due_time,
                this.time_maker.time_limit_minutes);
        }

        make_question_page(id){
            this.set_default_contents();
            this.time_maker.make_time_bar();
            this.add_question_page(id);
            this.button_maker.make_change_button();
            this.button_maker.make_result_button();
        }

        add_question_page(id){
            this.current_id = id;
            const question = this.question_maker.getQuestion(id);
            this.question_maker.makeQuestion(question,false);
            if(this.check_list[id] === 1){
                this.button_maker.setCheck();
            }
            return current_id;
        }

        make_question_list_page(){

        }

        make_result_page(){

        }

    }

    const contents_maker = new ExamContentsMaker(q_list,title,time_limit_minutes);
    contents_maker.make_start_page();
})();
