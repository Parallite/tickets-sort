import { FC } from 'react'
import style from './TicketItemPath.module.scss'
import { LuMoveRight } from 'react-icons/lu';
import { LegsFlightInfo } from '../../types';

interface TicketItemTitleProps {
    path: LegsFlightInfo;
}

export const TicketItemPath: FC<TicketItemTitleProps> = ({
    path
}) => {
    const { segments } = path;
    return (
        <div className={style.container}>
            {
                (segments.length >= 2) ? (
                    <>
                        <div className={style.airport_container}>
                            <div>
                                {`${segments[0].departureCity?.caption}, ${segments[0].departureAirport.caption}`}
                            </div>
                            <span>({segments[0].departureAirport.uid})</span>
                        </div>
                        <LuMoveRight />
                        <div className={style.airport_container}>
                            <div>
                                {`${segments[segments.length - 1].arrivalCity?.caption}, ${segments[segments.length - 1].arrivalAirport?.caption}`}
                            </div>
                            <span>({segments[segments.length - 1].arrivalAirport?.uid})</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={style.airport_container}>
                            <div>
                                {`${segments[0].departureCity.caption}, ${segments[0].departureAirport.caption}`}
                            </div>
                            <span>({segments[0].departureAirport.uid})</span>
                        </div>
                        <LuMoveRight />
                        <div className={style.airport_container}>
                            <div>
                                {`${segments[0].departureCity.caption}, ${segments[0].departureAirport.caption}`}
                            </div>
                            <span>({segments[0].departureAirport.uid})</span>
                        </div>
                    </>
                )
            }
        </div >
    )
}
