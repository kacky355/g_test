from dataclasses import dataclass
import numpy as np
import pandas as pd

@dataclass
class Question():
    q_id:int
    q_number:int
    genre:str
    q_text:str
    opts:list[str]
    ans:int
    explanation:str
    
@dataclass
class QuestionList():
    list_size : int
    questions_list : list[Question]
    like_list : list[int]
    ans_list : list[int]

class QuestionMaker():
    def __init__(self) -> None:
        pass
    
    def make_question(self,df_questions:pd.DataFrame,q_id:int) ->Question:
        question_data = df_questions.loc[q_id].to_list()
        q_number= q_id+1
        opts = question_data[3:7]

        question = Question(q_id=q_id,
                            q_number=q_number,
                            genre=question_data[1],
                            q_text=question_data[2],
                            opts=opts,
                            ans=question_data[7],
                            explanation=question_data[8])
        
        return question
    
    def make_questions_list(self, df_questions:pd.DataFrame) -> QuestionList:
        question_list = []
        list_size=len(question_list)
        for id in range(df_questions.shape[0]):
            q_number = id+1
            question = self.make_question(df_questions,id)
            question_list.append(question)
        
        q_list = QuestionList(list_size=list_size,
                     questions_list=question_list,
                     like_list=[0]*list_size,
                     ans_list=[0]*list_size)
        return q_list
        
    
    
