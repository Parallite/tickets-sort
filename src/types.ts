export type SortOption = 'increase' | 'descending' | 'travel-time';
export type TransferOption = 'with-transfer' | 'without-transfer';

export interface Offer {
    name: string;
    code: string;
    price: string;
}

export type Offers = Offer[]

export interface FilterOptionResult {
    minPrice: string;
    maxPrice: string;
    sort: SortOption;
    transfer: TransferOption;
    checkedListCompany: string[];
}

export interface ResponseData {
    result: {
        bestPrices: {
            DIRECT: {
                bestFlights: [
                    {
                        carrier: {
                            uuid: string,
                            caption: string,
                            airlineCode: string
                        },
                        price: {
                            amount: string,
                            currency: string,
                            currencyCode: string
                        }
                    }
                ]
            },
            ONE_CONNECTION: {
                bestFlights: [
                    {
                        carrier: {
                            uuid: string,
                            caption: string,
                            airlineCode: string
                        },
                        price: {
                            amount: string,
                            currency: string,
                            currencyCode: string
                        }
                    }
                ]
            }
        },
        flights: Flights
    }
}

interface LegsSegment {
    aircraft: { uid: string, caption: string },
    airline: { uid: string, caption: string, airlineCode: string },
    arrivalAirport: { uid: string, caption: string },
    arrivalCity: { uid: string, caption: string },
    arrivalDate: string,
    classOfService: { uid: string, caption: string },
    classOfServiceCode: string,
    departureAirport: { uid: string, caption: string },
    departureCity: { uid: string, caption: string },
    departureDate: string,
    flightNumber: string,
    servicesDetails: {
        fareBasis: { ADULT: string },
        freeCabinLuggage: object,
        freeLuggage: {
            ADULT: { pieces: number, nil: boolean, unit: string }
        },
        paidCabinLuggage: object,
        paidLuggage: object,
        tariffName: string
    },
    starting: boolean,
    stops: number,
    techStopInfos: [],
    travelDuration: number
}

export type LegsSegments = LegsSegment[]

export interface LegsFlightInfo {
    duration: number,
    segments: LegsSegments
}

export type Flights = Flight[]

export interface Flight {
    flight: {
        carrier: {
            uuid: string,
            caption: string,
            airlineCode: string
        },
        exchange: {
            ADULT: {
                exchangeAfterDeparture: {
                    amount: string,
                    currency: string,
                    currencyCode: string
                },
                exchangeBeforeDeparture: {
                    amount: string,
                    currency: string,
                    currencyCode: string
                },
                exchangeableAfterDeparture: boolean,
                exchangeableBeforeDeparture: boolean
            }
        },
        international: boolean,
        isTripartiteContractDiscountApplied: boolean,
        legs: LegsFlightInfo[],
        price: {
            passengerPrices: [
                {
                    feeAndTaxes: { amount: string, currency: string, currencyCode: string },
                    passengerCount: number,
                    passengerType: { uid: string, caption: string },
                    singlePassengerTotal: { amount: string, currency: string, currencyCode: string },
                    tariff: { amount: string, currency: string, currencyCode: string },
                    total: { amount: string, currency: string, currencyCode: string }
                }
            ],
            rates: [{
                totalEur: { amount: string, currencyCode: string },
                totalUsd: { amount: string, currencyCode: string }
            }],
            total: { amount: string, currency: string, currencyCode: string },
            totalFeeAndTaxes: { amount: string, currency: string, currencyCode: string },
        },
        refund: {
            ADULT: { refundableBeforeDeparture: false, refundableAfterDeparture: false }
        },
        seats: [
            {
                count: number,
                type: { uid: string, caption: string }
            }
        ],
        servicesStatuses: [
            {
                baggage: { uid: string, caption: string },
                exchange: { uid: string, caption: string },
                refund: { uid: string, caption: string },
            }
        ],
        flightToken: string,
        hasExtendedFare: boolean
    }
}
