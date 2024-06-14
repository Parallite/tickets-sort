import { Filter } from '../Filter'
import { TicketList } from '../TicketList'
import style from './BookingResult.module.scss'
import { useFetchData } from '../../hook/useFetchData'
import { FilterOptionResult, Flights, Offers, ResponseData } from '../../types'
import { Empty } from '../Empty'
import { useEffect, useState } from 'react'

export const BookingResult = () => {
    const { data, loading } = useFetchData<ResponseData>('./db/flights.json');
    const [lowestPrices, setLowestPrices] = useState<Offers>([]);
    const [filterOptionResult, setFilterOptionResult] = useState<FilterOptionResult>({
        minPrice: '0',
        maxPrice: '1000000',
        sort: 'increase',
        transfer: 'with-transfer',
        checkedListCompany: []
    });

    const getFilterOptionsData = (key: keyof FilterOptionResult, value: string) => {
        if (key in filterOptionResult && key !== 'checkedListCompany') {
            setFilterOptionResult((prevState) => ({
                ...prevState,
                [key]: value
            }))
        }
        if (key === 'checkedListCompany' && !filterOptionResult.checkedListCompany.includes(value)) {
            setFilterOptionResult((prevState) => ({
                ...prevState,
                [key]: [
                    ...prevState.checkedListCompany,
                    value
                ]
            }))
        }
        if (key === 'checkedListCompany' && filterOptionResult.checkedListCompany.includes(value)) {
            setFilterOptionResult((prevState) => ({
                ...prevState,
                [key]: [
                    ...prevState.checkedListCompany.filter((item) => item !== value)
                ]
            }))
        }
    }

    const getLowestOffers = (flights: Flights): Offers => {
        // получение наименьших цен на авиабилеты и информации по авиакомпаниям
        const hash = new Map();
        for (let i = 0; i < flights.length; i++) {
            const { airlineCode } = flights[i].flight.carrier;
            const { caption } = flights[i].flight.carrier;
            const key = `${airlineCode}, ${caption}`
            if (hash.has(key)) {
                const oldPrice = hash.get(key);
                const newPrice = parseInt(flights[i].flight.price.total.amount);
                if (newPrice < oldPrice) {
                    hash.set(key, newPrice);
                }
            } else {
                hash.set(key, parseInt(flights[i].flight.price.total.amount));
            }
        }

        // преобразование результата hashMap в массив объектов
        const offers: Offers = [];
        hash.forEach((value, key) => {
            const [code, name] = key.split(',');
            const offer = {
                code: code,
                name: name,
                price: value,
            };
            offers.push(offer);
        })
        return offers
    }

    useEffect(() => {
        if (data) {
            const { flights } = data.result;
            const lowestOffers = getLowestOffers(flights);
            setLowestPrices(lowestOffers);
        }
    }, [data]);

    return (
        <section className={style.container}>
            <Filter
                getFilterOptionsData={getFilterOptionsData}
                initialValues={filterOptionResult}
                lowestPrices={lowestPrices}
            />
            {
                data && <TicketList
                    flights={data.result.flights}
                    filterOptionResult={filterOptionResult}
                />
            }
            {
                (!data && loading) && <Empty text={'Подождите... Обрабатываем поиск'} />
            }
            {
                (!data && !loading) && <Empty text={'Билетов не найдено. Попробуйте изменить параметры поиска'} />
            }
        </section>
    )
}