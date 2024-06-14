import { FC } from 'react'
import style from './Empty.module.scss'

interface EmptyProps {
    text: string
}

export const Empty: FC<EmptyProps> = ({
    text
}) => {
    return (
        <div className={style.container}>
            <div>
                {text}
            </div>
        </div>
    )
}
