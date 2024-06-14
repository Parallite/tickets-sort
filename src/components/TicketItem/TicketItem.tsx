import React, { FC } from 'react'
import { TicketItemTitle } from '../TicketItemTitle'
import { TicketItemPath } from '../TicketItemPath'
import { TicketFlightDetails } from '../TicketFlightDetails'
import { Flight } from '../../types'
import style from './Ticket.module.scss'

interface TicketItemProps {
    item: Flight
}

export const TicketItem: FC<TicketItemProps> = ({
    item
}) => {
    const { flight } = item;
    return (
        <>
            <TicketItemTitle price={flight.price.total} />
            <div className={style.ticket_details_container}>
                <TicketItemPath path={flight.legs[0]} />
                <TicketFlightDetails legInfo={flight.legs[0]} />
                <div className={style.ticket_details_aircompany}>Рейс выполняет: {flight.carrier.airlineCode} {flight.carrier.caption}</div>
                <div className={style.ticket_details_gap} />
                <TicketItemPath path={flight.legs[1]} />
                <TicketFlightDetails legInfo={flight.legs[1]} />
                <div className={style.ticket_details_aircompany}>Рейс выполняет: {flight.carrier.airlineCode} {flight.carrier.caption}</div>
            </div>
            <button
                className={style.ticket_button}
                onClick={() => { }}
            >Выбрать</button>
        </>
    )
}
