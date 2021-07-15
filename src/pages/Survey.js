import { useEffect, useState, useCallback } from 'react'
import yaml from 'js-yaml'

import { IonButton } from '@ionic/react'

import { Localized } from '../components/fluent/Localized.js'

import classes from './Survey.module.css'
import Question from '../components/Question.js'
import useKeyPress from '../hooks/useKeyPress.js'
import computeHasValue from '../functions/computeHasValue.js'

import questions_path from '../questions.yaml'

import { gql, useMutation } from '@apollo/client'

const submit_incident = gql`
  mutation ($text: String, $properties: JSONObject) {
    incident(text: $text, properties: $properties)
  }
`

function saveTextAsFile(textToWrite, fileNameToSaveAs) {
  // source: https://stackoverflow.com/questions/609530/download-textarea-contents-as-a-file-using-only-javascript-no-server-side
  var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' })
  var downloadLink = document.createElement('a')
  downloadLink.download = fileNameToSaveAs
  downloadLink.innerHTML = 'Download File'
  if (window.webkitURL != null) {
    // Chrome allows the link to be clicked
    // without actually adding it to the DOM.
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob)
  }
  else {
    // Firefox requires the link to be added to the DOM
    // before it can be clicked.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob)
    downloadLink.onclick = function () {
      downloadLink.parentNode.removeChild(downloadLink)
    }
    downloadLink.style.display = 'none'
    document.body.appendChild(downloadLink)
  }

  downloadLink.click()
}

const mainTextQuestion = 'what_happened'

function getValueTitle(value, options) {
  const thisOption = !!options && !!options[value] ? options[value].de : value

  let title = null

  if (typeof thisOption === 'string' || thisOption instanceof String) {
    title = thisOption
  } else if (typeof thisOption === 'number' || !isNaN(thisOption)) {
    title = thisOption + ''
  } else {
    if (!!thisOption.title) {
      title = thisOption.title
    }
  }

  return title
}

function getValueTitleElement(value, options) {
  const title = getValueTitle(value, options)

  if (typeof title === 'string') {
    return title.split('\n').map(line => <p key={line}>{line}</p>)
  }

  return title
}

function Survey() {
  const [uploaded, setUploaded] = useState(false)
  const [questions, setQuestions] = useState([])
  const [questionsById, setQuestionsById] = useState({})
  const [answers, setAnswers] = useState({})
  const [currentQuestionsIndex, setCurrentQuestionsIndex] = useState(-1)

  const [submitIncident, { loading: mutationLoading, error: mutationError }] = useMutation(submit_incident, {
    onCompleted() {
      setUploaded(true)
    },
    onError(error) {
      if (!!window.umami) {
        window.umami.trackEvent('Error: Submit-Failed')
      }
      console.error(error)
    }
  })

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

            if (!thisQuestionData.input) {
              thisQuestionData.input = {}
            }

            if (!!thisQuestionData.input.options) {
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
      if (computeHasValue(data.value)) {
        answers[data._id] = data
      } else if (!!answers[data._id]){
        delete answers[data._id]
      }
      setAnswers(answers)
    }
    if (currentQuestionsIndex <= questions.length) {
      if (!!window.umami) {
        window.umami.trackEvent('Q-Index: ' + currentQuestionsIndex) // question index
        if (!!data && !!data._id) {
          window.umami.trackEvent('A-ID: ' + data._id) // answer id
        }
      }
      setCurrentQuestionsIndex(currentQuestionsIndex + 1)
    }
  }, [setAnswers, answers, setCurrentQuestionsIndex, currentQuestionsIndex, questions.length])

  const prevQuestion = useCallback(() => {
    if (currentQuestionsIndex > -1) {
      setCurrentQuestionsIndex(currentQuestionsIndex - 1)
    }
  }, [setCurrentQuestionsIndex, currentQuestionsIndex])

  const nextQuestion = useCallback(() => {
    if (currentQuestionsIndex <= questions.length) {
      if (currentQuestionsIndex <= 0) { // if -1 (intro)
        setCurrentQuestionsIndex(currentQuestionsIndex + 1)
      } else { // if between 0 and questions.length
        const currentQuestion = questions[currentQuestionsIndex]
        if (!currentQuestion.input.required) {
          setCurrentQuestionsIndex(currentQuestionsIndex + 1)
        }
      }
    }
  }, [setCurrentQuestionsIndex, currentQuestionsIndex, questions])

  const toTheBeginning = useCallback(() => {
    setCurrentQuestionsIndex(-1)
  }, [setCurrentQuestionsIndex])

  const gotoFirstQuestion = useCallback(() => {
    setCurrentQuestionsIndex(0)
  }, [setCurrentQuestionsIndex])

  useKeyPress(['ArrowRight', 'ArrowLeft'], event => {
    if (event.target.nodeName === 'BODY') {
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        prevQuestion()
      } else {
        nextQuestion()
      }
    }
  })

  const handleSendData = useCallback(() => {
    if (!!window.umami) {
      window.umami.trackEvent('Submitting-Incident')
    }

    let answersForSending = Object.values(answers)
      .filter(answer => answer._id !== null && answer.value !== null)

    if (answersForSending.length === 0) {
      console.warn('⚠️ Keine Angaben. Unnötig abzusenden. But this if shoul\'nt get called anyway.')
    } else {
      answersForSending = answersForSending
        .reduce((obj, answer) => {
          const thisQuestion = questionsById[answer._id]

          const value = [...answer.value]
          if (thisQuestion.input.multiple === true) {
            obj[answer._id] = value
          } else {
            obj[answer._id] = value[0]
          }
          return obj
        }, {})

      const text = answersForSending[mainTextQuestion] || ''
      delete answersForSending[mainTextQuestion]

      submitIncident({
        variables: {
          text,
          properties: answersForSending
        },
        ignoreResults: false
      })
    }
  }, [answers, questionsById, submitIncident])

  const handleDownloadData = useCallback(() => {
    if (!!window.umami) {
      window.umami.trackEvent('Downloading-Incident')
    }

    let answersForDownload = Object.values(answers)
      .filter(answer => answer._id !== null && answer.value !== null)

    if (answersForDownload.length === 0) {
      console.warn('⚠️ Keine Angaben. Unnötig runterzuladen. But this if shoul\'nt get called anyway.')
    } else {
      let now = new Date().toISOString()
      now = now.replace(/T/g, ' ')
      const nowForFilename = now.replace(/(:|\.)/g, '-')

      answersForDownload = `# Dein Vorfall (${now})\n\n${
        answersForDownload.map(answer => {
          const thisQuestion = questionsById[answer._id]
          return `## ${
            thisQuestion.question.de
          }\n\n${
            thisQuestion.input.multiple === true
            ? [...answer.value].map(thisValue => `- ${getValueTitle(thisValue, thisQuestion.input.options)}`).join('\n')
            : getValueTitle([...answer.value][0], thisQuestion.input.options)
          }`
        }).join('\n\n')
      }`

      saveTextAsFile(answersForDownload, `Dein Vorfall ${nowForFilename}.md.txt`)
    }
  }, [answers, questionsById])

  if (!(!!questions)) {
    return null
  }

  const currentQuestion = questions[currentQuestionsIndex]

  const answersArray = Object.values(answers)
    .filter(answer => answer.value !== null)

  return (
    <div className={classes.survey}>
      <div className={classes.progress} style={{
        '--width': `${((currentQuestionsIndex) / questions.length) * 100}%`,
        opacity: (currentQuestionsIndex <= 0 ? 0 : 1)
      }} />
      <div className={classes.content}>
        <div className={classes.contentWrapper}>
          {
            currentQuestionsIndex === -1
            ? <>
                <h3>Vorfall melden</h3>
                <p>Hier kannst du einen queerfeindlichen Vorfall melden.</p>
                <p>Deine Daten dienen lediglich zur statistischen Auswertung. Sie führen nicht zu einer Anzeige bei der Polizei. Wir speichern deine Daten anonymisiert.</p>
                <p>Bei Fragen kannst du dich an <a href="mailto:info@queerfeindlichkeit.de" target="_blank" rel="noreferrer">info@queerfeindlichkeit.de</a> wenden oder uns bei Instagram eine Nachricht schicken: <a href="https://instagram.com/queerfeindlichkeit" target="_blank" rel="noreferrer">@queerfeindlichkeit</a></p>
                <IonButton size="default" onClick={gotoFirstQuestion}><Localized id="start_survey" /></IonButton>
            </>
            : (
              !!currentQuestion
              ? <>
                <Question
                  key={currentQuestion._id}
                  onSubmit={handleChange}
                  defaultValue={answers[currentQuestion._id] || null}
                  {...currentQuestion}
                />
              </>
              : (
                answersArray.length === 0
                ? <>
                  <h3>Hmmm…</h3>
                  <p>Du hast keine Angaben gemacht. Beschreib deinen Vorfall bitte etwas detailierter.</p>
                  <IonButton size="default" onClick={toTheBeginning}><Localized id="back_to_beginning" /></IonButton>
                </>
                : (
                  uploaded
                  ? <>
                    <h3>Vielen Dank!</h3>
                    <p>Dein Vorfall wurde hochgeladen.</p>
                    <p><strong>Vielen Dank, dass Du hilfst Queerfeindlichkeit sichtbar zu machen!</strong></p>
                            <p>Du möchtest wissen, wie es weitergeht? Auf <a href="https://www.instagram.com/queerfeindlichkeit/" target="_blank" rel="noreferrer">Instagram</a> und  <a href="https://twitter.com/anyway_koeln" target="_blank" rel="noreferrer">Twitter</a> veröffentlichen wir Daten und helfen dir gegen Queerfeindlichkeit anzukommen.</p>
                    <hr />
                    <p>Hier kannst du dir noch Deine Daten abspeichern:</p>
                    <IonButton size="default" onClick={handleDownloadData}><Localized id="download_your_incident_data" /></IonButton>
                  </>
                  : <>
                    <h3>Deine Angaben</h3>
                    <p>Hier kannst du nochmal über deine Angaben drüber schauen.<br />Geh gerne zurück, um etwas zu korrigieren.</p>
                    <p>Wenn du zufrieden bist, klick unten auf <strong>„Vorfall eintragen”</strong>.</p>
                    <p>Er wird in den nächsten Tagen von unseren Ehrenamtlichen gesichtet und veröffentlicht.</p>
                    <p>Deine Daten kannst du dir unter <strong>„Daten runterladen”</strong>abspeichern.</p>
                    <hr />
                    {
                      answersArray.map(answer => {
                        const thisQuestion = questionsById[answer._id]

                        return <div key={answer._id}>
                          <div className="subtitle1">{thisQuestion.question.de}</div>
                          {
                            thisQuestion.input.multiple === true
                              ? <div><ul>
                                {[...answer.value].map(thisValue => <li key={thisValue}>{getValueTitleElement(thisValue, thisQuestion.input.options)}</li>)}
                              </ul></div>
                              : getValueTitleElement([...answer.value][0], thisQuestion.input.options)
                          }
                        </div>
                      })
                    }
                    <hr />
                    <IonButton fill="outline" size="default" onClick={handleDownloadData}><Localized id="download_your_incident_data" /></IonButton>
                    <IonButton size="default" onClick={handleSendData}><Localized id="submit_incident" /></IonButton>
                    {mutationLoading && <p><Localized id="uploading" /></p>}
                    {mutationError && <p><Localized id="error_while_uploading" /></p>}
                  </>
                )
              )
            )
          }
        </div>
      </div>
      <div className={classes.actions}>
        <IonButton disabled={currentQuestionsIndex <= -1} fill="outline" size="default" onClick={prevQuestion}>
          <Localized id="prev" />
        </IonButton>
        <IonButton disabled={currentQuestionsIndex >= questions.length || (!!currentQuestion && !!currentQuestion.input && currentQuestion.input.required)} fill="outline" size="default" onClick={nextQuestion}>
          <Localized id="next" />
        </IonButton>
      </div>
    </div>
  )
}

export default Survey
