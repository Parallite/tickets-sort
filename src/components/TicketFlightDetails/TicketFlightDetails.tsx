import { FC } from 'react'
import style from './TicketFlightDetails.module.scss'
import moment from 'moment';
import { LuClock } from "react-icons/lu";
import { LegsFlightInfo } from '../../types';

interface TicketFlightDetailsProps {
    legInfo: LegsFlightInfo
}

export const TicketFlightDetails: FC<TicketFlightDetailsProps> = ({
    legInfo
}) => {
    const { segments } = legInfo;

    const getTimeFromMins = (duration: number) => {
        let hours = Math.trunc(duration / 60);
        let minutes = duration % 60;
        return hours + 'ч. ' + minutes + 'м.';
    };

    const convertDepartureDate = (time: string) => {
        return moment(time).format('HH:MM, DD MMM ddd')
    }

    const convertArrivalDate = (time: string) => {
        return moment(time).format('DD MMM ddd, HH:MM')
    }

    return (
        <div className={style.container}>
            {
                (segments.length >= 2) ? (
                    <div className={style.wrapper}>
                        <div className={style.details_box}>
                            <div className={style.details_date}>
                                {convertDepartureDate(segments[0].departureDate)}
                            </div>
                            <div className={style.details_clock_container}>
                                <div className={style.details_clock}>
                                    <LuClock />
                                    {getTimeFromMins(legInfo.duration)}
                                </div>
                            </div>
                            <div className={style.details_date}>
                                {convertArrivalDate(segments[segments.length - 1].arrivalDate)}
                            </div>
                        </div>
                        <div className={style.transfer}>
                            <div className={style.transfer_line_box}>
                                <div className={style.transfer_line} />
                            </div>
                            <div className={style.transfer_content}>
                                {segments.length - 1} пересадка
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={style.wrapper}>
                        <div className={style.details_box}>
                            <div className={style.details_date}>
                                {convertDepartureDate(segments[0].departureDate)}
                            </div>
                            <div className={style.details_clock_container}>
                                <div className={style.details_clock}>
                                    <LuClock />
                                    {getTimeFromMins(legInfo.duration)}
                                </div>
                            </div>
                            <div className={style.details_date}>
                                {convertArrivalDate(segments[0].arrivalDate)}
                            </div>
                        </div>
                        <div className={style.transfer}>
                            <div className={style.transfer_line_box}>
                                <div className={style.transfer_line} />
                            </div>
                            <div className={style.transfer_content}>
                                Прямой рейс
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
