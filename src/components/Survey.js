import { useEffect, useState, useCallback } from 'react'
import yaml from 'js-yaml'

import { IonButton } from '@ionic/react'

import classes from './Survey.module.css'
import Question from './Question.js'
import useKeyPress from '../hooks/useKeyPress.js'

import questions_path from '../questions.yaml'

function Survey() {
  const [questions, setQuestions] = useState([])
  const [questionsById, setQuestionsById] = useState({})
  const [answers, setAnswers] = useState({})
  const [currentQuestionsIndex, setCurrentQuestionsIndex] = useState(0)

  useEffect(() => {
    async function load_data() {
      let response = await fetch(questions_path)
      let text = await response.text() // read response body as text

      const data = yaml.load(text)

      if (!!data && !!data.questions) {
        const dataForArray = JSON.parse(JSON.stringify(data)) // TODO: Please check, why data needs to be cloned!
        const dataForObject = JSON.parse(JSON.stringify(data)) // TODO: Please check, why data needs to be cloned!

        setQuestions( // TODO: Somewhere in the following lines, data is would get overwritten if not cloned.
          Object.entries(dataForArray.questions)
          .map(questionEntry => {
            let thisQuestionData = questionEntry[1]

            if (
              !!thisQuestionData.input
              && !!thisQuestionData.input.options
            ) {
              thisQuestionData.input.options = Object.entries(thisQuestionData.input.options)
                .map(optionsEntry => ({
                  _id: optionsEntry[0],
                  ...optionsEntry[1]
                }))
            }

            return {
              _id: questionEntry[0],
              ...thisQuestionData
            }
          })
        )

        setQuestionsById(
          Object.entries(dataForObject.questions)
          .reduce((obj, questionEntry) => {
            const _id = questionEntry[0]
            let thisQuestionData = questionEntry[1]

            if (!thisQuestionData.input) {
              thisQuestionData.input = {}
            }
            if (!thisQuestionData.input.options) {
              thisQuestionData.input.options = {}
            }

            obj[_id] = {
              _id,
              ...thisQuestionData
            }

            return obj
          }, {})
        )
      } else {
        setQuestionsById({})
        setQuestions([])
      }
    }
    load_data()
  }, [setQuestions, setQuestionsById])

  const handleChange = useCallback(data => {
    if (!!data && !!data._id) {
      answers[data._id] = data
      setAnswers(answers)
    }
    if (currentQuestionsIndex <= questions.length) {
      setCurrentQuestionsIndex(currentQuestionsIndex + 1)
    }
  }, [setAnswers, answers, setCurrentQuestionsIndex, currentQuestionsIndex, questions.length])

  const prevQuestion = useCallback(() => {
    if (currentQuestionsIndex > 0) {
      setCurrentQuestionsIndex(currentQuestionsIndex - 1)
    }
  }, [setCurrentQuestionsIndex, currentQuestionsIndex])

  const nextQuestion = useCallback(() => {
    const currentQuestion = questions[currentQuestionsIndex]
    if (currentQuestionsIndex <= questions.length && !currentQuestion.input.required) {
      setCurrentQuestionsIndex(currentQuestionsIndex + 1)
    }
  }, [setCurrentQuestionsIndex, currentQuestionsIndex, questions])

  useKeyPress(['ArrowRight', 'ArrowLeft'], event => {
    if (event.target.nodeName === 'BODY') {
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        prevQuestion()
      } else {
        nextQuestion()
      }
    }
  })

  if (!(!!questions)) {
    return null
  }

  const currentQuestion = questions[currentQuestionsIndex]

  return (
    <div className={classes.survey}>
      <div className={classes.progress} style={{
        '--width': `${((currentQuestionsIndex) / questions.length) * 100}%`,
        opacity: (currentQuestionsIndex === 0 ? 0 : 1)
      }} />
      <div className={classes.content}>
        <div className={classes.contentWrapper}>
          {
            !!currentQuestion
            ? <>
              <Question
                key={currentQuestion._id}
                onSubmit={handleChange}
                defaultValue={answers[currentQuestion._id] || null}
                {...currentQuestion}
              />
            </>
            : <>
                <p>Show summary and final submit button.</p>
                <pre>{JSON.stringify(answers, null, 2)}</pre>
              </>
          }
        </div>
      </div>
      <div className={classes.actions}>
        <IonButton disabled={currentQuestionsIndex <= 0} fill="outline" size="default" onClick={prevQuestion}>zurück</IonButton>
        <IonButton disabled={currentQuestionsIndex >= questions.length || currentQuestion.input.required} fill="outline" size="default" onClick={nextQuestion}>vor</IonButton>
      </div>
    </div>
  )
}

export default Survey
