import className from './Heading.module.css'

export default function Heading({ heading, rightAction }){
  return <div className={className.heading}>
    <h2>{heading}</h2>
    {rightAction}
  </div>
}
