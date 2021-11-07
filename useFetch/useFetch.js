import { useEffect, useRef, useState } from "react"

export const useFetch = ( url ) => {

    const isMounted = useRef(true); 
    const [state, setState] = useState({ loading: true, error: null, data: null });

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {

        setState({ data: null, loading: true, error: null })

        fetch( url )
            .then( resp => resp.json() )
            .then( data => {
                                    
                if ( isMounted.current ) {
                    setState({
                        loading: false, 
                        error: null,
                        data
                    })
                } else {
                    console.log('setState not called')
                }

            })
            .catch( () => {
                setState({
                    data: null,
                    loading: false,
                    error: 'Info could not be downloaded'
                })
            })

    }, [url])

    return state

}
