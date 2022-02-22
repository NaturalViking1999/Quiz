import React, { Component } from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
  state = {
    results: {}, // {[id]: success error}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // { [id]: 'success' 'error' }
    quiz: [
      {
        question: 'Who the fuck is that guy?',
        rightAnswerId: 3,
        id: 1,
        answers: [
          { text: 'Jose Aldo', id: 1 },
          { text: 'Mister Bean', id: 2 },
          { text: 'Jeremy Stewens', id: 3 },
          { text: 'I dont give a fuck!', id: 4 }
        ]
      },
      {
        question: 'Is Sterling an actor?',
        rightAnswerId: 3,
        id: 2,
        answers: [
          { text: 'Yes', id: 1 },
          { text: 'No', id: 2 },
          { text: 'No, he is a peace of shit!', id: 3 },
          { text: 'I dont give a fuck!', id: 4 }
        ]
      },
      {
        question: 'Where is Petr Yan from?',
        rightAnswerId: 1,
        id: 2,
        answers: [
          { text: 'Russia', id: 1 },
          { text: 'China', id: 2 },
          { text: 'Thailand', id: 3 },
          { text: 'Ha-ha, shiiiiiit!))', id: 4 }
        ]
      },
      {
        question: 'Could Conor McGregor beat the old man in the bar?',
        rightAnswerId: 2,
        id: 2,
        answers: [
          { text: 'Yes', id: 1 },
          { text: 'Almost could', id: 2 },
          { text: 'No', id: 3 },
          { text: 'No, old man beat Conor!', id: 4 }
        ]
      },
      {
        question: 'Who is the Dolphine?',
        rightAnswerId: 4,
        id: 2,
        answers: [
          { text: 'Fish', id: 1 },
          { text: 'Animal', id: 2 },
          { text: 'Cristiano Ronaldo', id: 3 },
          { text: 'Ali Abdel Badel Suck this, fucking name!', id: 4 }
        ]
      }
    ]
  }

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      this.setState({
        answerState: { [answerId]: 'success' },
        results
      })

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'error'
      this.setState({
        answerState: { [answerId]: 'error' },
        results
      })
    }
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    })
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answer All Questions</h1>

          {
            this.state.isFinished
              ? <FinishedQuiz
                results={this.state.results}
                quiz={this.state.quiz}
                onRetry={this.retryHandler}
              />
              : <ActiveQuiz
                answers={this.state.quiz[this.state.activeQuestion].answers}
                question={this.state.quiz[this.state.activeQuestion].question}
                onAnswerClick={this.onAnswerClickHandler}
                quizLength={this.state.quiz.length}
                answerNumber={this.state.activeQuestion + 1}
                state={this.state.answerState}
              />
          }
        </div>
      </div>
    )
  }
}


export default Quiz