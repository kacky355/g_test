from flask import Flask, redirect, render_template, request, url_for
from glob import glob
import pandas as pd
import random

app = Flask(__name__)

csvs = glob('./static/csv/gmoshi*.csv')
df_questions = pd.DataFrame()
for csv in csvs:
    df_questions = pd.concat([df_questions,pd.read_csv(csv,index_col=0)])
df_questions.reset_index(drop=True,inplace=True)
question_size = df_questions.shape[0]

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
    try:
        if '/question/' in from_url:
            past_id = from_url.split('/question/')[-1]
        else:
            past_id = random.randint(0,question_size-1)
            
        question = df_questions.loc[id].to_list()
        opts = question[2:6]
        next_id = random.randint(0,question_size-1)
        
        
        return render_template('question.html',title=title,question=question,opts=opts,id=id+1,past_id=past_id,next_id=next_id)
    except Exception as e:
        return redirect(url_for('error',e=e))

@app.route('/error')
def error(e):
    return render_template('error.html',e=e)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)