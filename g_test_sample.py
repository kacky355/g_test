from dataclasses import asdict
import json
from flask import Flask, redirect, render_template, request, url_for
from glob import glob
import pandas as pd
import random
from question_maker import QuestionMaker,QuestionList
app = Flask(__name__)

csvs = glob('./static/csv/gmoshi*.csv')
df_questions = pd.DataFrame()
for csv in csvs:
    df_questions = pd.concat([df_questions,pd.read_csv(csv,index_col=0)])
df_questions.reset_index(drop=True,inplace=True)
question_size = df_questions.shape[0]

q_maker = QuestionMaker()


@app.route('/')
def index():
    title = 'home'
    return render_template('index.html',title=title)

@app.route('/question')
def method_name():
    id = random.randint(0,question_size-1)
    return redirect(f'/question/{id}')
    

@app.route('/question/<int:id>')
def question(id):
    title = '一問一答'
    from_url = request.referrer

    if '/question/' in from_url:
        past_id = from_url.split('/question/')[-1]
    else:
        past_id = random.randint(0,question_size-1)
        
    question = q_maker.make_question(df_questions,id)
    next_id = random.randint(0,question_size-1)
    
    
    
    return render_template('question.html',title=title,question=question,past_id=past_id,next_id=next_id)

@app.route('/error')
def error(e):
    return render_template('error.html',e=e)

@app.route('/exam/<int:exam_id>')
def exam(exam_id):
    exam_id = int(exam_id)
    exam = pd.read_csv(f'static/csv/gmoshi{exam_id}.csv',index_col=0)
    qusetions_list =q_maker.make_questions_list(exam)
    qusetions_list = json.dumps(asdict(qusetions_list))
    title = "mosi"
    
    # print(qusetions_list)
    return render_template('exam.html',questions_list=qusetions_list,title=title)

@app.route('/choose_exam')
def choose_exam():
    exams = [x.split('/')[-1].split('.csv')[0] for x in csvs]
    return render_template('choose_exam.html',exams=exams)

@app.route('/exam_result/', methods=['POST'])
def exam_result():
    q_list = request.form.get('answer_data')
    q_list = json.loads(q_list)
    q_list= json.dumps(q_list)
    return render_template('exam_result.html',questions_list=q_list)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)