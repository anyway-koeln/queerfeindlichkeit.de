import { useCallback, useEffect, useState, useRef } from 'react'
import useKeyPress from '../hooks/useKeyPress.js'

import { IonButton } from '@ionic/react'

import classes from './Question.module.css'

let abc = 'abcdefghijklmnopqrstuvwxyz'
const ABC = abc.toUpperCase().split('')
abc = abc.split('')
const keys2listen = ['Escape', 'Enter', ...abc, ...ABC]

function Question({ _id, question, description, input, defaultValue: defaultValueObject, onSubmit }) {
  const inputRef = useRef()

  const defaultValue = !!defaultValueObject ? defaultValueObject.value : null
  const writeInValue = !!defaultValueObject ? defaultValueObject.write_in : null

  const [value, setValue] = useState(defaultValue)
  const [writeInIsActive, setWriteInIsActive] = useState(false)

  let hasValue = false
  if ((typeof value === 'string' || value instanceof String) && value.length > 0) {
    hasValue = true
  } else if (typeof value === 'number' && !isNaN(value)) {
    hasValue = true
  }

  useKeyPress(keys2listen, event => {
    if (event.key === 'Escape') {
      if (!!inputRef && !!inputRef.current) {
        inputRef.current.blur()
      }
    } else if (
      input.type === 'number'
      || input.type === 'short_text'
      || (input.type === 'long_text' && !writeInIsActive)
      || (input.type === 'choice' && input.write_in === true && hasValue)
    ) {
      if (
        event.key === 'Enter'
        && (!input.required || (input.required && hasValue))
      ) {
        onSubmit({
          _id,
          value: 'write_in',
          write_in: value
        })
      }
    } else if (input.type === 'choice') {
      let index = abc.indexOf(event.key)
      if (index <= -1) {
        index = ABC.indexOf(event.key)
      }
      if (index >= 0 && input.options[index] && !!onSubmit) {
        onSubmit({ _id, value: input.options[index]._id })
      }
    }
  })

  const handleWriteInFocus = useCallback(() => {
    setWriteInIsActive(true)
  }, [setWriteInIsActive])

  const handleWriteInBlur = useCallback(() => {
    setWriteInIsActive(false)
  }, [setWriteInIsActive])

  const storeValue = useCallback(event => {
    let value = event.target.value

    if (input.type === 'number') {
      value = parseFloat(value)
      if (isNaN(value)) {
        value = null
      }
    }

    setValue(value)
  }, [setValue, input.type])

  const handleClick = useCallback(option => {
    onSubmit({ _id, value: option })
  }, [onSubmit, _id])

  const handleSubmit = useCallback(() => {
    if (!!onSubmit && (!input.required || (input.required && hasValue))) {
      onSubmit({ _id, value })
    }
  }, [input, hasValue, onSubmit, _id, value])

  useEffect(() => {
    if (input.type !== 'choice' && !!inputRef && !!inputRef.current && !hasValue) {
      inputRef.current.focus()
    }
  }, [input.type, inputRef, hasValue])

  if (!(!!_id)) {
    return null
  }

  let input_component = null
  if (input.type === 'number') {
    input_component = <input ref={inputRef} type="number" placeholder="Enter a number…" min={0} onChange={storeValue} defaultValue={writeInValue} />
  } else if (input.type === 'short_text') {
    input_component = <input ref={inputRef} type="text" placeholder="Enter a short text…" onChange={storeValue} defaultValue={writeInValue} />
  } else if (input.type === 'long_text') {
    input_component = <textarea
      ref={inputRef}
      onChange={storeValue}
      onFocus={handleWriteInFocus}
      onBlur={handleWriteInBlur}
      defaultValue={writeInValue}
      placeholder="Enter a text…"
    />
  } else if (input.type === 'choice') {
    input_component = <>
      {
        !!input.options
          ? input.options.map((option, index) => <div
              key={option._id}
              className="body2"
              style={{ whiteSpace: 'nowrap' }}
            >
            <span style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              width: '26px',
              textAlign: 'center',
              color: '#3880ff',
              fontWeight: 'bold',
              margin: '0 2px 0 8px'
            }}>
              {ABC[index]}
            </span>
            <IonButton
              style={{ verticalAlign: 'middle' }}
              fill={value === option._id ? 'solid' : 'outline'}
              size="small"
              onClick={() => handleClick(option._id)}
            >
              {option.de}
            </IonButton>
          </div>)
        : null
      }
      {
        !!input.write_in
          ? <div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter a short text as your own answer…"
              onChange={storeValue}
              onFocus={handleWriteInFocus}
              onBlur={handleWriteInBlur}
              defaultValue={writeInValue}
            />
          </div>
        : null
      }
    </>
  }

  return (
    <div className={classes.question}>
      <h3 className="subtitle1">{question.de}</h3>
      {!!description ? <p>{description.de}</p> : null}
      {input.required ? <p style={{ color: 'darkred', fontWeight: 'bold' }}>Required!</p> : null}
      {input_component}
      {
        (hasValue || !input.required)
        && (input.type !== 'choice' || input.write_in === true)
          ? <p>
            <IonButton style={{ verticalAlign: 'middle', margin: '0 16px 0 0' }} size="default" onClick={handleSubmit}>OK</IonButton>
            {
              (
                input.type === 'number'
                || input.type === 'short_text'
                || (input.type === 'long_text' && !writeInIsActive)
                || (input.type === 'choice' && input.write_in === true && hasValue)
              )
              && (!input.required || (input.required && hasValue))
              ? <span style={{ verticalAlign: 'middle' }}>or press <strong>Enter ↵</strong></span>
              : null
            }
          </p>
          : null
      }
    </div>
  )
}

export default Question
