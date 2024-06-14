import { FC, useEffect, useState } from 'react'
import style from './TicketList.module.scss'
import { FilterOptionResult, Flight, Flights } from '../../types'
import { LuChevronsDown, LuChevronsUp } from "react-icons/lu";
import { Empty } from '../Empty';
import { TicketItem } from '../TicketItem';

interface TicketListProps {
    flights: Flights;
    filterOptionResult: FilterOptionResult;
}

export const TicketList: FC<TicketListProps> = ({
    flights,
    filterOptionResult,
}) => {
    const [showMaxTickets, setShowMaxTickets] = useState<number>(2);
    const [sortedFlights, setSortedFlights] = useState<Flights>();

    const handleShowMaxTickets = () => {
        if (sortedFlights && sortedFlights.length > showMaxTickets) {
            setShowMaxTickets((prev) => prev + 2);
        }
    }

    const handleResetShowMaxTickets = () => {
        setShowMaxTickets(2)
    }

    const getSortedFlights = () => {
        const sorted = [...flights]
            .sort(handleSort)
            .filter(handleFilterByTransfer)
            .filter(handleFilterByPrice)
            .filter(handleFilterByLowestOffers)
        setSortedFlights(sorted);
    }

    const handleSort = (firstFlight: Flight, secondFlight: Flight) => {
        const { sort: sortOption } = filterOptionResult;
        const { amount: firstPrice } = firstFlight.flight.price.total;
        const { amount: secondPrice } = secondFlight.flight.price.total;

        if (sortOption === 'increase') {
            return +firstPrice - +secondPrice
        } else if (sortOption === 'descending') {
            return +secondPrice - +firstPrice;
        } else {
            const { legs: firstLegs } = firstFlight.flight;
            const { legs: secondLegs } = secondFlight.flight;
            const firstDuration = firstLegs.reduce((acc, cur) => acc + cur.duration, 0);
            const secondDuration = secondLegs.reduce((acc, cur) => acc + cur.duration, 0);
            return firstDuration - secondDuration
        }
    }

    const handleFilterByTransfer = (flight: Flight) => {
        const { transfer: option } = filterOptionResult;
        const { segments: firstSegments } = flight.flight.legs[0];
        const { segments: lastSegments } = flight.flight.legs[flight.flight.legs.length - 1];

        if (option === 'without-transfer') {
            return (firstSegments.length === 1 && lastSegments.length === 1)
        } else if (option === 'with-transfer') {
            return (firstSegments.length > 1 || lastSegments.length > 1)
        } else {
            return true
        }
    }

    const handleFilterByPrice = (flight: Flight) => {
        const { minPrice } = filterOptionResult;
        const { maxPrice } = filterOptionResult;
        const { amount: curFlightPrice } = flight.flight.price.total;

        return (+minPrice <= +curFlightPrice && +curFlightPrice <= +maxPrice)
    }

    const handleFilterByLowestOffers = (flight: Flight) => {
        const { checkedListCompany } = filterOptionResult;
        const { airlineCode } = flight.flight.carrier;

        if (checkedListCompany.length === 0) return true
        if (checkedListCompany.includes(airlineCode)) return true
    }

    useEffect(() => {
        getSortedFlights();
        handleResetShowMaxTickets();
    }, [filterOptionResult, flights]);

    return (
        <div className={style.container}>
            <div className={style.tickets_container}>
                {
                    sortedFlights &&
                    [...sortedFlights]
                        .splice(0, showMaxTickets)
                        .map((item, index) => (
                            <div key={index} className={style.ticket_container}>
                                <TicketItem item={item} />
                            </div>
                        ))
                }
                {
                    sortedFlights?.length === 0 && <Empty text={'Билетов не найдено. Попробуйте изменить параметры поиска'} />
                }
            </div>
            {
                sortedFlights?.length !== 0 &&
                <button onClick={handleShowMaxTickets} className={style.tickets_button}>
                    {
                        sortedFlights && showMaxTickets >= sortedFlights.length ? (
                            <>
                                <LuChevronsUp />Больше нет<LuChevronsUp />
                            </>
                        ) : (
                            <>
                                <LuChevronsDown />Показать больше<LuChevronsDown />
                            </>
                        )
                    }
                </button>
            }
        </div>
    )
}
