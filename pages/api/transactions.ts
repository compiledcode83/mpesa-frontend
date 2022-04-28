import {useEffect, useState} from "react";

export const useBasicTransactionsStat = (userId) => {
    const [isLoading, setLoading] = useState(true);
    const [statData, setStatDate] = useState<any>({});

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_MANAGER_HOST}/file/stats/${userId}?type=basic`)
            .then((res) => res.json())
            .then((data) => {
                console.log('data:', data)
                setStatDate(data)
                setLoading(false)
            })
    }, [])

    return [statData, isLoading];
}

export const useSearchTransactions = (userId) => {
    const [transactions, setTransactions] = useState<any>([]);
    const [search, setSearch] = useState<string>("");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const transactionResponse = await fetch(`${process.env.NEXT_PUBLIC_MANAGER_HOST}/file/stats/${userId}?type=search&search=${search}`)
            const transactionData = await transactionResponse.json()

            setTransactions(transactionData.hits.hits.map(h => h._source));
            setLoading(false);
        }

        if (search.length > 3 && !isLoading) {
            fetchData()
        }
    }, [search])

    return [transactions, setSearch];
}

export const useTransactionRange = (userId) => {
    const [stat, setStat] = useState<any>([]);
    const [dateRange, setDateRange] = useState<any>({ start: '', end: ''})

    useEffect(() => {
        const fetchData = async () => {
            const statData = await fetch(`${process.env.NEXT_PUBLIC_MANAGER_HOST}/file/stats/${userId}?type=range&start=${dateRange.start}&end=${dateRange.end}`);

            setStat(statData);
        }

        fetchData();
    }, [dateRange])

    return [stat, setDateRange];
}