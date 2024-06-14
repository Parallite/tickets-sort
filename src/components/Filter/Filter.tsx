import style from './Filter.module.scss'
import { FilterOptionResult, Offers, SortOption, TransferOption } from '../../types';
import { FC, useEffect, useState } from 'react';

interface FilterProps {
    getFilterOptionsData: (key: keyof FilterOptionResult, value: string) => void;
    initialValues: FilterOptionResult;
    lowestPrices: Offers;
}

export const Filter: FC<FilterProps> = ({
    getFilterOptionsData,
    initialValues,
    lowestPrices
}) => {
    const [minPriceValue, setMinPriceValue] = useState<string>(initialValues.minPrice);
    const [maxPriceValue, setMaxPriceValue] = useState<string>(initialValues.maxPrice);
    const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(initialValues.sort);
    const [selectedTransferOption, setSelectedTransferOption] = useState<TransferOption>(initialValues.transfer);
    const [lowestOffers, setLowestOffers] = useState<Offers>([]);
    const [checkedListCompany, setCheckedListCompany] = useState<string[]>([]);

    const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as { name: keyof FilterOptionResult, value: SortOption };
        setSelectedSortOption(value);
        getFilterOptionsData(name, value);
    };

    const handleTranferChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as { name: keyof FilterOptionResult, value: TransferOption };
        setSelectedTransferOption(value);
        getFilterOptionsData(name, value);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as { name: keyof FilterOptionResult, value: string };
        name === 'minPrice' ? setMinPriceValue(value) : setMaxPriceValue(value);
        getFilterOptionsData(name, value);
    }

    const handleOffersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as { name: keyof FilterOptionResult, value: string };
        if (!checkedListCompany.includes(value)) {
            setCheckedListCompany((prev) => ([
                ...prev,
                value
            ]))
        } else {
            const changedList = checkedListCompany.filter((item) => item !== value);
            setCheckedListCompany(changedList);
        }
        getFilterOptionsData(name, value);
    };

    useEffect(() => {
        setLowestOffers(lowestPrices);
    }, [lowestPrices])

    return (
        <div className={style.container}>
            <fieldset className={style.group_wrapper}>
                <legend className={style.group_title}>Сортировать:</legend>
                <div className={style.field_wrapper}>
                    <input
                        type="radio"
                        name="sort"
                        id='increase'
                        value='increase'
                        checked={selectedSortOption === 'increase'}
                        onChange={handleSortChange}
                        className={style.field_input}
                    />
                    <label htmlFor="increase"
                        className={style.field_label}>- по возрастанию цены</label>
                </div>
                <div className={style.field_wrapper}>
                    <input
                        type="radio"
                        name="sort"
                        id='descending'
                        value="descending"
                        checked={selectedSortOption === 'descending'}
                        onChange={handleSortChange}
                        className={style.field_input} />
                    <label htmlFor="descending"
                        className={style.field_label}>- по убыванию цены</label>
                </div>
                <div className={style.field_wrapper}>
                    <input
                        type="radio"
                        name="sort"
                        id='travel-time'
                        value="travel-time"
                        checked={selectedSortOption === 'travel-time'}
                        onChange={handleSortChange}
                        className={style.field_input} />
                    <label
                        htmlFor="travel-time"
                        className={style.field_label}
                    >- по времени пути</label>
                </div>
            </fieldset>
            <fieldset className={style.group_wrapper}>
                <legend className={style.group_title}>Фильтровать:</legend>
                <div className={style.field_wrapper}>
                    <input
                        type="radio"
                        name="transfer"
                        id='with-transfer'
                        value="with-transfer"
                        checked={selectedTransferOption === 'with-transfer'}
                        onChange={handleTranferChange}
                        className={style.field_input} />
                    <label
                        htmlFor="with-transfer"
                        className={style.field_label}
                    >- 1 пересадка</label>
                </div>
                <div className={style.field_wrapper}>
                    <input
                        type="radio"
                        name="transfer"
                        id='without-transfer'
                        value="without-transfer"
                        checked={selectedTransferOption === 'without-transfer'}
                        onChange={handleTranferChange}
                        className={style.field_input} />
                    <label
                        htmlFor="without-transfer"
                        className={style.field_label}
                    >- без пересадки</label>
                </div>
            </fieldset>
            <fieldset className={style.group_wrapper}>
                <legend className={style.group_title}>Фильтровать:</legend>
                <div className={style.field_wrapper}>
                    <label htmlFor="min-price" className={style.field_label}>От</label>
                    <input
                        type="number"
                        id='min-price'
                        name="minPrice"
                        placeholder='0'
                        value={minPriceValue}
                        onChange={handlePriceChange}
                        className={style.field_price_input} />
                </div>
                <div className={style.field_wrapper}>
                    <label htmlFor="max-price" className={style.field_label}>До</label>
                    <input
                        type="number"
                        id='max-price'
                        name="maxPrice"
                        placeholder='1000000'
                        value={maxPriceValue}
                        onChange={handlePriceChange}
                        className={style.field_price_input} />
                </div>
            </fieldset>
            {
                lowestOffers && (
                    <fieldset className={style.group_wrapper}>
                        <legend className={style.group_title}>Авиакомпании:</legend>
                        {lowestOffers.map((offer) => (
                            <div
                                key={offer.code}
                                className={style.checkbox_container}>
                                <input
                                    type="checkbox"
                                    name="checkedListCompany"
                                    id={offer.code}
                                    value={offer.code}
                                    checked={checkedListCompany.includes(offer.code)}
                                    onChange={handleOffersChange}
                                    className={style.field_input}
                                />
                                <label
                                    htmlFor={offer.code}
                                    className={style.checkbox_label}
                                >
                                    <div className={style.text_container}>
                                        <span>{offer.code}</span>
                                        <span>{`${offer.name.slice(0, 10)}...`}</span>
                                    </div>
                                    <span> - от {offer.price}</span>
                                </label>
                            </div>
                        ))}
                    </fieldset>
                )
            }
        </div>
    )
}
