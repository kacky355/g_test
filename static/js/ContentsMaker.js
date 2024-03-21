export class ContentsMaker {
    
    constructor(q_list,title){
        this.contents_place_holder = document.getElementById("contents_place_holder")
        this.q_list = q_list;
        this.title = title;
        this.list_size = q_list.list_size;
        this.last_question = this.list_size -1;
    }

    set_default_contents(){
        this.contents_place_holder.innerHTML =`
    <div id="title_place_holder"></div>    
    <div id="time_bar_place_holder"></div>
    <div id="quesstion_list_place_holder"></div>    
    <div id="question_place_holder"></div>
    <div id="buttons_place_holder"></div>
    <div id="result_button_place_holder"></div>
    <div id="explanation_place_holder"></div>
        `;
    }

    set_title(){
        const title_place_holder = document.getElementById('title_place_holder');
        title_place_holder.innerHTML=`
        <h1>${this.title}</h1>
        `;
    }
}

