import { FC } from 'react'
import style from './TicketItemTitle.module.scss'

interface TicketItemTitleProps {
    price: {
        amount: string,
        currency: string,
        currencyCode: string
    };
}

export const TicketItemTitle: FC<TicketItemTitleProps> = ({
    price,
}) => {
    return (
        <>
            <div className={style.container}>
                <div>AK Label</div>
                <div className={style.price_container}>
                    <div className={style.price}>{price.amount} {price.currencyCode}</div>
                    <div>Стоимость для одного взрослого пассажира</div>
                </div>
            </div>
        </>
    )
}
