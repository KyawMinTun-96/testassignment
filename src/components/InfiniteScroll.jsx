import React, {useState, useEffect} from 'react';

const InfiniteScroll = () => {

    const[items, setItems] = useState([]);
    const [page, setPage] = useState(1); 
    const[loading, setLoading] = useState(false);


    const fetchMoreItems = async () => {
        setLoading(true);
        const newItems = Array.from({ length: 10 }, (_, i) => `Item ${i + 1 + items.length}`);
        setTimeout(() => {
            setItems((prevItems) => [...prevItems, ...newItems]);
            setLoading(false);
        }, 1000);
    }

    useEffect(() => {
        fetchMoreItems();
    }, []);

    useEffect(() => {

        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50 && !loading) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    }, [loading]);


    useEffect(() => {
        if (page > 1) {
            fetchMoreItems();
        }
    }, [page]);


    return(
        <div style={{ padding: '20px' }}>
            <h1 className='text-center'>Infinite Scroll Example</h1>
            <ul>
                {
                    items.map((item, index) => (
                        <li className='infinite-list' key={index}>{item}</li>
                    ))
                }

            </ul>

            {
                loading && <p>Load more items...</p>
            }
            
        </div>
    )
}

export default InfiniteScroll;





































